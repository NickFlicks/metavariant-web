// Cloudflare Pages Function: POST /api/contact
//
// Handles the contact form on /contact. Requires two environment variables,
// set in the Cloudflare Pages project (Settings > Environment variables),
// never committed to the repo:
//   RESEND_API_KEY      - from resend.com, used to actually send the email
//   TURNSTILE_SECRET_KEY - from the Cloudflare dashboard's Turnstile section,
//                          pairs with the public site key used in Contact.jsx
//
// Spam/bot mitigation, in order:
//   1. Honeypot field ("company"): real visitors never see or fill it in.
//   2. Minimum elapsed time between page load and submit: rejects instant
//      (scripted) submissions.
//   3. Cloudflare Turnstile: verified server-side against Cloudflare's API,
//      so a forged client-side token can't fake it.
//   4. Basic field validation: required fields present, plausible email
//      shape, message length capped.

const MIN_SUBMIT_SECONDS = 3;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_FIELD_LENGTH = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO_ADDRESS = "metavariantapp@gmail.com";
const FROM_ADDRESS = "MetaVariant Website <contact@metavariant.net>";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function verifyTurnstile(token, secretKey, ip) {
  if (!secretKey) {
    // No secret configured yet: fail closed so misconfiguration doesn't
    // silently disable spam protection.
    return { success: false, reason: "Turnstile isn't configured on the server." };
  }
  if (!token) {
    return { success: false, reason: "Missing verification token." };
  }

  const body = new URLSearchParams();
  body.append("secret", secretKey);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = await res.json();
  return { success: Boolean(data.success), reason: data["error-codes"]?.join(", ") };
}

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const {
    name = "",
    email = "",
    shop = "",
    message = "",
    company = "",
    turnstileToken = "",
    formStartedAt = 0,
  } = payload;

  // 1. Honeypot. Pretend success so a bot doesn't learn it was caught.
  if (company.trim() !== "") {
    return jsonResponse({ ok: true });
  }

  // 2. Too-fast submission.
  const elapsedSeconds = (Date.now() - Number(formStartedAt)) / 1000;
  if (!formStartedAt || elapsedSeconds < MIN_SUBMIT_SECONDS) {
    return jsonResponse({ ok: true });
  }

  // 3. Field validation.
  if (!name.trim() || !email.trim() || !message.trim()) {
    return jsonResponse({ error: "Name, email, and message are all required." }, 400);
  }
  if (!EMAIL_RE.test(email.trim())) {
    return jsonResponse({ error: "That doesn't look like a valid email address." }, 400);
  }
  if (name.length > MAX_FIELD_LENGTH || shop.length > MAX_FIELD_LENGTH) {
    return jsonResponse({ error: "One of the fields is too long." }, 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` }, 400);
  }

  // 4. Turnstile.
  const ip = request.headers.get("CF-Connecting-IP");
  const verification = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
  if (!verification.success) {
    return jsonResponse({ error: "Verification failed, please try again." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "Email sending isn't configured yet." }, 500);
  }

  const lines = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    shop.trim() ? `Shop: ${shop.trim()}` : null,
    "",
    message.trim(),
  ].filter((line) => line !== null);

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      reply_to: email.trim(),
      subject: `New contact form message from ${name.trim()}`,
      text: lines.join("\n"),
    }),
  });

  if (!resendRes.ok) {
    return jsonResponse({ error: "Couldn't send your message right now, try again shortly." }, 502);
  }

  return jsonResponse({ ok: true });
}
