import { useEffect, useRef, useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/**
 * Loads the Turnstile script once (cached across mounts) and renders the
 * widget imperatively via window.turnstile.render, rather than the
 * script's implicit data-sitekey scan, since that scan only runs once on
 * script load and won't pick up a widget div that mounts later after a
 * client-side route change.
 */
function useTurnstile(containerRef, onToken) {
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    let widgetId;
    let cancelled = false;

    function render() {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    }

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`);
      const script = existing ?? document.createElement("script");
      if (!existing) {
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
      return () => script.removeEventListener("load", render);
    }

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [containerRef, onToken]);
}

const initialForm = { name: "", email: "", shop: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [company, setCompany] = useState(""); // honeypot: real visitors never fill this in
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const turnstileRef = useRef(null);
  const mountedAt = useRef(Date.now());

  useTurnstile(turnstileRef, setTurnstileToken);

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Name, email, and message are all required.");
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the verification checkbox before sending.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          company, // honeypot field, should always be empty
          turnstileToken,
          formStartedAt: mountedAt.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong sending your message.");
      }

      setStatus("sent");
      setForm(initialForm);
      setTurnstileToken("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong sending your message.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
        <Mail className="h-3.5 w-3.5" strokeWidth={2} />
        Contact
      </span>
      <h1 className="mt-4 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-secondary">
        Questions about setup, billing, or a block not behaving the way you expect: send us a
        message and we'll reply from{" "}
        <a href="mailto:support@metavariant.net" className="font-semibold text-brand-600 hover:text-brand-700">
          support@metavariant.net
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        {/* Honeypot: visually hidden from real visitors, but present in the DOM
            and not display:none, so unsophisticated bots that fill in every
            field still trip it. Real users never see or reach it. */}
        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-ink">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={updateField("name")}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={updateField("email")}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="shop" className="text-sm font-semibold text-ink">
            Shopify store URL <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="shop"
            type="text"
            placeholder="your-store.myshopify.com"
            value={form.shop}
            onChange={updateField("shop")}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400"
          />
          <p className="mt-1 text-xs text-ink-muted">
            Helps us look at your specific setup if you're reporting a bug.
          </p>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-semibold text-ink">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={form.message}
            onChange={updateField("message")}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400"
          />
        </div>

        {TURNSTILE_SITE_KEY ? <div ref={turnstileRef} /> : null}

        {status === "error" ? (
          <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
            {errorMessage}
          </div>
        ) : null}

        {status === "sent" ? (
          <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
            Thanks, your message is on its way. We'll get back to you at the email you provided.
          </div>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-12 items-center gap-1.5 rounded-lg bg-ink px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" strokeWidth={2} />
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        )}
      </form>
    </div>
  );
}
