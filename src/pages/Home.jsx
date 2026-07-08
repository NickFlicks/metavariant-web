import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock.jsx";

const CORE_FEATURES = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 3L4 13.5h6L10 21l9-10.5h-6L13 3z"
      />
    ),
    title: "Instant updates",
    body: "Metafield values refresh the moment a shopper picks a new variant — no full page reload. Most themes fire a variant-change event automatically; if yours doesn't, MetaVariant falls back to a short polling window.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h10M4 18h7"
      />
    ),
    title: "Flexible placement",
    body: "Drop a theme editor block wherever your content already lives, or paste a shortcode like [variant_metafield] directly into freeform text such as a product description.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4M4 17l8 4 8-4"
      />
    ),
    title: "Rich metafield types",
    body: "Single line text, rich text, multi-line, image/video, URL, and JSON — every block maps cleanly to the variant a customer currently has selected.",
  },
];

const BLOCKS = [
  {
    name: "MetaVariant",
    desc: "The flexible, all-in-one block. Pick a render type — Plain Text, HTML, Rich Text, JSON, URL, or Image — to match your metafield's data type.",
  },
  {
    name: "Single Line",
    desc: "Renders text as a styled label — pill, rounded, price-tag, bubble, or wave — with configurable colors, padding, and alignment. Great for “New” or “Limited Stock” callouts.",
  },
  {
    name: "Multiline",
    desc: "Plain multi-line text with whitespace preserved, so line breaks render exactly as typed.",
  },
  {
    name: "Rich Text",
    desc: "Renders a Rich Text metafield's formatting — paragraphs, bold/italic, links, lists — as real HTML.",
  },
  {
    name: "Image / Video",
    desc: "Renders an image or file-reference metafield with a configurable aspect ratio and max width.",
  },
  {
    name: "URL",
    desc: "Renders a URL metafield as a clickable link.",
  },
  {
    name: "JSON",
    desc: "Renders a JSON metafield formatted and monospaced — handy for debugging or structured data.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create a metafield definition",
    body: "Add a variant metafield definition — e.g. “Variant subtitle” or “Care instructions” — from the Metafields page, or in Shopify Admin under Settings → Custom data → Variants.",
  },
  {
    n: "02",
    title: "Add content per variant",
    body: "Fill in a value for each product variant from the Add Content page, with support for rich text, images, and every metafield type your plan unlocks.",
  },
  {
    n: "03",
    title: "Add the block to your theme",
    body: "Open the theme editor, add the matching MetaVariant block to your product template, and point it at the same namespace and key. Prefer freeform text? Paste the shortcode instead.",
  },
];

const PLANS = [
  {
    tier: "Free",
    price: "$0",
    period: "/mo",
    blurb: "Try MetaVariant on a small catalog.",
    features: ["Up to 10 products", "Single line text + Rich text", "Theme blocks & shortcodes"],
    cta: "Start free",
    highlighted: false,
  },
  {
    tier: "Lite",
    price: "$4.99",
    period: "/mo",
    blurb: "For growing catalogs that need more room.",
    features: ["Up to 50 products", "Single line text + Rich text", "Theme blocks & shortcodes"],
    cta: "Upgrade to Lite",
    highlighted: true,
  },
  {
    tier: "Unlimited",
    price: "$14.99",
    period: "/mo",
    blurb: "Every metafield type, no product cap.",
    features: [
      "No product limit",
      "All metafield types (text, rich text, multi-line, URL, number, boolean)",
      "Theme blocks & shortcodes",
    ],
    cta: "Upgrade to Unlimited",
    highlighted: false,
  },
];

function IconBadge({ children }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        {children}
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="hero-glow absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-content flex-col items-center px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
          <span className="animate-fadeUp inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
            Storefront metafields, per variant
          </span>
          <h1 className="animate-fadeUp mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            Show the right content for every product variant
          </h1>
          <p className="animate-fadeUp mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary">
            MetaVariant connects your product metafields to the exact variant a shopper has
            selected — descriptions, specs, badges, and media stay accurate with zero extra
            page loads.
          </p>
          <div className="animate-fadeUp mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="https://apps.shopify.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-lg bg-ink px-6 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Add to Shopify
            </a>
            <Link
              to="/docs"
              className="inline-flex h-12 items-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-ink transition-colors hover:border-slate-400"
            >
              Read the docs
            </Link>
          </div>
          <p className="mt-5 text-xs font-medium text-ink-muted">
            Free plan available &middot; No credit card required to start
          </p>
        </div>
      </section>

      {/* Core features */}
      <section id="features" className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Built for modern Shopify themes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Everything routes through variant metafields you already control — MetaVariant just
            makes them show up in the right place, at the right moment.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {CORE_FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl2 border border-slate-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-card"
            >
              <IconBadge>{f.icon}</IconBadge>
              <h3 className="mt-5 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-content px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Live on the storefront in three steps
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              The same flow every merchant walks through from a fresh install to their first
              variant-aware product page.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <span className="text-5xl font-extrabold text-brand-100">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block reference showcase */}
      <section id="blocks" className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Seven theme blocks, one namespace &amp; key
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Every block targets the product page from the theme editor. Point it at the same
            namespace and key as your metafield definition and it just works.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b) => (
            <div
              key={b.name}
              className="rounded-xl2 border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200"
            >
              <h3 className="text-sm font-semibold text-ink">MetaVariant &mdash; {b.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl2 border border-dashed border-slate-300 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-ink">
            Theme doesn&apos;t support app blocks where you need one?
          </p>
          <p className="mt-1 text-sm text-ink-secondary">
            Paste a shortcode directly into any text field instead — it&apos;s detected and
            swapped for the live value the same way a block would be.
          </p>
          <CodeBlock className="mt-4">
            {'[variant_metafield namespace="custom" key="variant_subtitle"]'}
          </CodeBlock>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-content items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              A dashboard built around one question
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Which products still need variant content? MetaVariant scans your catalog and
              tells you exactly where you stand, so nothing ships half-configured.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-secondary">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                Search and filter every product with its connection status
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                Jump straight from a row to the Add Content editor for that product
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                Guided 3-step onboarding the first time your shop has no definitions yet
              </li>
            </ul>
          </div>

          <div className="rounded-xl2 border border-slate-200 bg-white p-6 shadow-card">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-ink-muted">Metafield types</p>
                <p className="mt-2 text-2xl font-bold text-ink">4</p>
                <p className="mt-1 text-[11px] text-ink-muted">Kinds of content you can add</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-ink-muted">With content</p>
                <p className="mt-2 text-2xl font-bold text-emerald-600">128</p>
                <p className="mt-1 text-[11px] text-ink-muted">Ready on the storefront</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-ink-muted">Need content</p>
                <p className="mt-2 text-2xl font-bold text-amber-600">17</p>
                <p className="mt-1 text-[11px] text-ink-muted">Quick win</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { name: "Classic Canvas Sneaker", status: "Connected" },
                { name: "Ridgeline Backpack", status: "Connected" },
                { name: "Alpine Wool Beanie", status: "Needs setup" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5"
                >
                  <span className="text-sm font-medium text-ink">{row.name}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      row.status === "Connected"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Plan &amp; billing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Choose the plan that fits how many products you&apos;re customizing with variant
            metafields.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.tier}
              className={`relative flex flex-col rounded-xl2 border p-7 ${
                p.highlighted
                  ? "border-brand-500 bg-white shadow-glow"
                  : "border-slate-200 bg-white shadow-soft"
              }`}
            >
              {p.highlighted ? (
                <span className="absolute -top-3 left-7 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-base font-semibold text-ink">{p.tier}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-ink">{p.price}</span>
                <span className="text-sm font-medium text-ink-muted">{p.period}</span>
              </p>
              <p className="mt-2 text-sm text-ink-secondary">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-ink-secondary">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                      fill="currentColor"
                    >
                      <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="https://apps.shopify.com"
                target="_blank"
                rel="noreferrer"
                className={`mt-7 inline-flex h-11 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  p.highlighted
                    ? "bg-ink text-white hover:bg-brand-700"
                    : "border border-slate-300 text-ink hover:border-slate-400"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-ink">
        <div className="mx-auto max-w-content px-6 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start showing the right content, automatically
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Install MetaVariant, create a metafield definition, and your first variant-aware
            block can be live before your coffee gets cold.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://apps.shopify.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-lg bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-400"
            >
              Add to Shopify
            </a>
            <Link
              to="/docs"
              className="inline-flex h-12 items-center rounded-lg border border-slate-600 px-6 text-sm font-semibold text-white transition-colors hover:border-slate-400"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
