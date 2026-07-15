import { Link } from "react-router-dom";
import {
  Sparkles,
  Check,
  Tag,
  CheckCircle2,
  AlertCircle,
  Search,
  MousePointerClick,
  ListChecks,
  Wand2,
  Gauge,
  ImageUp,
} from "lucide-react";
import CodeBlock from "../components/CodeBlock.jsx";
import Reveal from "../components/Reveal.jsx";
import CountUp from "../components/CountUp.jsx";
import WaveDivider from "../components/WaveDivider.jsx";
import VariantDemo from "../components/VariantDemo.jsx";
import FeatureShowcase from "../components/FeatureShowcase.jsx";
import BlockAccordion from "../components/BlockAccordion.jsx";
import StandardFieldsDemo from "../components/StandardFieldsDemo.jsx";
import EditorDemo from "../components/EditorDemo.jsx";

const STEPS = [
  {
    n: "01",
    title: "Create a metafield definition",
    body: "Add a variant metafield definition, like “Variant subtitle” or “Care instructions”, from the Metafields page, or in Shopify Admin under Settings → Custom data → Variants.",
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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="hero-glow absolute inset-0" aria-hidden="true" />
        <div
          className="blob h-72 w-72 bg-brand-300 animate-float"
          style={{ top: "-4rem", left: "-3rem" }}
          aria-hidden="true"
        />
        <div
          className="blob h-64 w-64 bg-brand-200 animate-floatSlow"
          style={{ top: "6rem", right: "-4rem" }}
          aria-hidden="true"
        />
        <div className="grain-overlay" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-content items-center gap-12 px-6 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <span className="animate-fadeUp inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Storefront metafields, per variant
            </span>
            <h1 className="animate-fadeUp mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl">
              Show the <em className="italic text-brand-600">right</em> content for every
              product variant
            </h1>
            <p className="animate-fadeUp mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary lg:mx-0">
              MetaVariant connects your product metafields to the exact variant a shopper has
              selected, so descriptions, specs, badges, and media stay accurate with zero extra
              page loads.
            </p>
            <div className="animate-fadeUp mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
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

          <div className="flex justify-center lg:justify-end">
            <VariantDemo />
          </div>
        </div>
      </section>

      {/* Core features: interactive tabs */}
      <section id="features" className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              Built for <em className="italic text-brand-600">modern</em> Shopify themes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Everything routes through variant metafields you already control. MetaVariant just
              makes them show up in the right place, at the right moment. Click a feature to see
              it in action.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <FeatureShowcase />
        </Reveal>
      </section>

      {/* Standard Fields: ready-made metafields, one click */}
      <section id="standard-fields" className="relative overflow-hidden bg-slate-50">
        <div
          className="blob h-64 w-64 bg-brand-200 animate-floatSlow"
          style={{ top: "-2rem", right: "6%" }}
          aria-hidden="true"
        />
        <div
          className="blob h-56 w-56 bg-brand-300 animate-float"
          style={{ bottom: "-3rem", left: "4%" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-content items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 backdrop-blur">
              <Wand2 className="h-3.5 w-3.5" strokeWidth={2} />
              New: Ready-made fields
            </span>
            <h2 className="mt-5 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              13 fields, <em className="italic text-brand-600">pre-wired</em> to a theme block.
              No namespace, no key, no guesswork.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Standard Fields are MetaVariant&apos;s own ready-made metafield definitions: things
              like Product Label, Shipping &amp; Stock Alert, Material Card, and Document &amp;
              Download. Click Create, add your content, and drag the matching block into your
              theme. Still need something custom? The Advanced option underneath falls back to a
              manual namespace and key, the same way it always has.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-secondary">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                One click to create instead of typing a type, namespace, and key by hand
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                Each field already knows which theme block it belongs to
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                Four of the newest fields power the Unlimited-only blocks below
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <StandardFieldsDemo />
          </Reveal>
        </div>
      </section>

      <WaveDivider fillClassName="text-white" />

      {/* Editor upgrades: file upload, rich text, tooltips */}
      <section id="editor" className="mx-auto max-w-content px-6 pb-20 pt-4 sm:pb-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              A content editor that got a <em className="italic text-brand-600">real</em> rewrite
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              The Add Content page now has its own file picker, a proper rich text editor, and
              inline explanations for anything that isn&apos;t obvious at a glance.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <EditorDemo />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Reveal delay={140} className="glass glass-hover rounded-xl2 p-5">
            <ImageUp className="h-5 w-5 text-brand-500" strokeWidth={1.8} />
            <h3 className="mt-3 text-sm font-semibold text-ink">Direct file upload</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
              A self-built picker with search, loading, and error states, plus a straight upload
              path into your Shopify Files library. No more waiting on an unreliable native
              picker.
            </p>
          </Reveal>
          <Reveal delay={200} className="glass glass-hover rounded-xl2 p-5">
            <Wand2 className="h-5 w-5 text-brand-500" strokeWidth={1.8} />
            <h3 className="mt-3 text-sm font-semibold text-ink">Real rich text editing</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
              A proper WYSIWYG editor for Rich Text fields, and it prefills existing content and
              formatting the moment you open a variant that already has some.
            </p>
          </Reveal>
          <Reveal delay={260} className="glass glass-hover rounded-xl2 p-5">
            <Gauge className="h-5 w-5 text-brand-500" strokeWidth={1.8} />
            <h3 className="mt-3 text-sm font-semibold text-ink">Faster storefront loads</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
              The first image for a variant now renders server-side and the metafield API
              response is cached, so there&apos;s no lazy-load delay hurting your Largest
              Contentful Paint.
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider fillClassName="text-slate-50" />

      {/* How it works */}
      <section id="how-it-works" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-content px-6 pb-20 pt-4 sm:pb-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                Live on the storefront in three steps
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                The same flow every merchant walks through from a fresh install to their first
                variant-aware product page.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120} as="div" className="relative">
                <span className="font-serif text-5xl text-brand-200">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fillClassName="text-white" flip />

      {/* Block reference: accordion */}
      <section id="blocks" className="mx-auto max-w-content px-6 pb-20 pt-4 sm:pb-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              Eleven theme blocks, <em className="italic text-brand-600">one</em> namespace &amp;
              key
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Every block targets the product page from the theme editor. Point it at the same
              namespace and key as your metafield definition and it just works. Four are
              Unlimited-only, built specifically around the newest Standard Fields.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <BlockAccordion />
        </Reveal>

        <Reveal delay={150} className="glass mt-8 rounded-xl2 p-6">
          <p className="text-sm font-semibold text-ink">
            Theme doesn&apos;t support app blocks where you need one?
          </p>
          <p className="mt-1 text-sm text-ink-secondary">
            Paste a shortcode directly into any text field instead. It&apos;s detected and
            swapped for the live value the same way a block would be.
          </p>
          <CodeBlock className="mt-4">
            {'[variant_metafield namespace="custom" key="variant_subtitle"]'}
          </CodeBlock>
        </Reveal>
      </section>

      {/* Dashboard preview */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50">
        <div
          className="blob h-72 w-72 bg-brand-200 animate-float"
          style={{ top: "-3rem", right: "-2rem" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-content items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              A dashboard built around <em className="italic text-brand-600">one</em> question
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Which products still need variant content? MetaVariant scans your catalog and
              tells you exactly where you stand, so nothing ships half-configured.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-secondary">
              <li className="flex items-start gap-2.5">
                <Search className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={1.8} />
                Search and filter every product with its connection status
              </li>
              <li className="flex items-start gap-2.5">
                <MousePointerClick className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={1.8} />
                Jump straight from a row to the Add Content editor for that product
              </li>
              <li className="flex items-start gap-2.5">
                <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={1.8} />
                Guided 3-step onboarding the first time your shop has no definitions yet
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120} className="glass glass-hover rounded-xl2 p-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/60 bg-white/60 p-4">
                <Tag className="h-4 w-4 text-brand-500" strokeWidth={1.8} />
                <p className="mt-2 text-xs font-medium text-ink-muted">Metafield types</p>
                <p className="mt-1 text-2xl font-bold text-ink">
                  <CountUp value={4} />
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">Kinds of content you can add</p>
              </div>
              <div className="rounded-xl border border-white/60 bg-white/60 p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={1.8} />
                <p className="mt-2 text-xs font-medium text-ink-muted">With content</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  <CountUp value={128} />
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">Ready on the storefront</p>
              </div>
              <div className="rounded-xl border border-white/60 bg-white/60 p-4">
                <AlertCircle className="h-4 w-4 text-amber-600" strokeWidth={1.8} />
                <p className="mt-2 text-xs font-medium text-ink-muted">Need content</p>
                <p className="mt-1 text-2xl font-bold text-amber-600">
                  <CountUp value={17} />
                </p>
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
                  className="flex items-center justify-between rounded-lg border border-white/40 px-3 py-2.5 transition-colors hover:bg-white/50"
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
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative overflow-hidden">
        <div
          className="blob h-72 w-72 bg-brand-100 animate-floatSlow"
          style={{ top: "2rem", left: "-4rem" }}
          aria-hidden="true"
        />
        <div
          className="blob h-56 w-56 bg-brand-200 animate-float"
          style={{ bottom: "0", right: "-2rem" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-content px-6 py-20 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                Plan &amp; billing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                Choose the plan that fits how many products you&apos;re customizing with variant
                metafields.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PLANS.map((p, i) => (
              <Reveal key={p.tier} delay={i * 100} as="div">
                <div
                  className={`glass glass-hover relative flex h-full flex-col rounded-xl2 p-7 ${
                    p.highlighted ? "glass-tint shadow-glassLg" : ""
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
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
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
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-slate-200 bg-ink">
        <div
          className="blob h-80 w-80 bg-brand-700 animate-floatSlow"
          style={{ bottom: "-6rem", left: "10%" }}
          aria-hidden="true"
        />
        <div className="grain-overlay" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-content px-6 py-20 text-center sm:py-24">
          <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl">
            Start showing the <em className="italic text-brand-300">right</em> content,
            automatically
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
              className="inline-flex h-12 items-center rounded-lg bg-brand-500 px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-400"
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
        </Reveal>
        <WaveDivider fillClassName="text-slate-50" />
      </section>
    </>
  );
}
