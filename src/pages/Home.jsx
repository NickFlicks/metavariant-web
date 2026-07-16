import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Check,
  Minus,
  ArrowRight,
  Store,
  LayoutTemplate,
  Webhook,
  Puzzle,
  Tag,
  PenLine,
  AlertTriangle,
  ListChecks,
  ImageIcon,
  Link2,
  PackageSearch,
  Palette,
  FileDown,
  Settings2,
} from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import DevCodeBlock from "../components/DevCodeBlock.jsx";
import BlockShowcase from "../components/BlockShowcase.jsx";
import VariantDemo from "../components/VariantDemo.jsx";
import { staggerContainer, staggerItem, tapHover } from "../lib/motion.js";

const CODE_TABS = [
  {
    label: "Request",
    lang: "http",
    code: `GET /apps/metavariant/api/variant-metafield-values
    ?variantId=44987654321
    &shop=your-store.myshopify.com`,
  },
  {
    label: "Response",
    lang: "json",
    code: `{
  "variantId": "44987654321",
  "values": [
    {
      "namespace": "custom",
      "key": "variant_subtitle",
      "type": "single_line_text_field",
      "value": "Hand-poured, Moss canvas"
    },
    {
      "namespace": "custom",
      "key": "shipping_alert",
      "type": "single_line_text_field",
      "value": "Made to order, 3 week lead time"
    }
  ]
}`,
  },
  {
    label: "Shortcode",
    lang: "shortcode",
    code: `[variant_metafield namespace="custom" key="variant_subtitle"]`,
  },
];

const WORKS_WITH = [
  { label: "Shopify", icon: Store },
  { label: "Online Store 2.0", icon: LayoutTemplate },
  { label: "Liquid", icon: Code2 },
  { label: "Metafields API", icon: Webhook },
  { label: "Theme app extensions", icon: Puzzle },
];

// Matches the real {% schema %} "name" in each block's .liquid file: 9
// dedicated Standard Field blocks, plus Advanced for anything outside the
// standard set.
const FEATURES = [
  {
    key: "product_label",
    name: "Product Label",
    icon: Tag,
    plan: "Free",
    description:
      "A short badge for the selected variant, like New or Limited Stock. 14 shapes, configurable color, padding, and alignment.",
  },
  {
    key: "variant_description",
    name: "Variant Description",
    icon: PenLine,
    plan: "Free",
    description:
      "Renders rich text (paragraphs, bold, italic, links, lists) for the selected variant as real HTML, not a plain string.",
  },
  {
    key: "shipping_alert",
    name: "Shipping / Stock Alert",
    icon: AlertTriangle,
    plan: "Advanced",
    description:
      "A warning badge for the selected variant, like Made to Order, 3 Week Lead Time. Stays hidden on variants left blank.",
  },
  {
    key: "specs_table",
    name: "Specifications Table",
    icon: ListChecks,
    plan: "Advanced",
    description:
      "One Label: Value line per spec, entered on the Add Content page, becomes one row in a technical spec table on the storefront.",
  },
  {
    key: "image_file",
    name: "Image or File",
    icon: ImageIcon,
    plan: "Advanced",
    description:
      "An image or file for the selected variant. The first image renders server-side and the response is cached for a faster LCP.",
  },
  {
    key: "link",
    name: "Link",
    icon: Link2,
    plan: "Advanced",
    description:
      "A clickable link for the selected variant, for a size guide, spec sheet, or anywhere else you'd point a shopper.",
  },
  {
    key: "b2b_pricing",
    name: "B2B / Case-Pack Pricing",
    icon: PackageSearch,
    plan: "Advanced",
    description:
      "Pack size, cost per unit, and the computed total for variants sold by the case. Hides itself if either field is missing.",
  },
  {
    key: "material_card",
    name: "Material Card",
    icon: Palette,
    plan: "Unlimited",
    description:
      "A color or pattern swatch, a texture photo, and care details for the selected variant, in one expanded card.",
  },
  {
    key: "document_download",
    name: "Document & Download",
    icon: FileDown,
    plan: "Unlimited",
    description:
      "A download button for the selected variant's file, picked straight from Shopify Files. Hidden when nothing is set.",
  },
  {
    key: "advanced_custom",
    name: "Advanced (Custom Field)",
    icon: Settings2,
    plan: "Unlimited",
    description:
      "For metafields outside the 9 dedicated blocks. Pick a render type (Plain Text, HTML, Rich Text, JSON, URL, Image) and set your own namespace and key.",
  },
];

const TIER_ORDER = ["Free", "Lite", "Advanced", "Unlimited"];
const PLAN_RANK = { Free: 0, Advanced: 1, Unlimited: 2 };

const PLANS = [
  { tier: "Free", price: "$0", cap: "10 products", support: "Community support" },
  { tier: "Lite", price: "$7.90", cap: "20 products", support: "Email support" },
  { tier: "Advanced", price: "$16.90", cap: "50 products", support: "Priority support" },
  { tier: "Unlimited", price: "$29.90", cap: "No product limit", support: "Priority support" },
];

function unlockedAt(tier, minPlan) {
  // Lite unlocks nothing new over Free: it only raises the product cap.
  const rank = tier === "Lite" ? PLAN_RANK.Free : PLAN_RANK[tier];
  return rank >= PLAN_RANK[minPlan];
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night-950 bg-grid-dark">
        <div className="hero-glow absolute inset-0" aria-hidden="true" />
        <div
          className="blob h-72 w-72 bg-brand-700"
          style={{ top: "-6rem", left: "-3rem", opacity: 0.35 }}
          aria-hidden="true"
        />
        <div
          className="blob h-64 w-64 bg-brand-600"
          style={{ top: "8rem", right: "-4rem", opacity: 0.25 }}
          aria-hidden="true"
        />

        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          animate="visible"
          className="relative mx-auto grid max-w-content items-center gap-12 px-6 pb-20 pt-24 sm:pb-28 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
        >
          <div className="text-center lg:text-left">
            <motion.span
              variants={staggerItem}
              className="inline-flex items-center gap-1.5 rounded-full border border-night-border bg-night-900 px-3.5 py-1.5 text-xs font-semibold text-brand-200"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Built for everyday Shopify store owners
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-night-text sm:text-5xl"
            >
              Show shoppers the right details for{" "}
              <span className="text-brand-200">every color, size, and style</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-night-secondary lg:mx-0"
            >
              MetaVariant updates your product page the instant a shopper picks a different
              variant: a new badge, description, image, or spec sheet, with no page reload. No
              developer needed, just drag a block into the theme editor you already use.
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.a
                href="https://apps.shopify.com"
                target="_blank"
                rel="noreferrer"
                {...tapHover}
                className="inline-flex h-12 items-center rounded-lg bg-brand-100 px-6 text-sm font-semibold text-ink shadow-card"
              >
                Add to Shopify
              </motion.a>
              <motion.div {...tapHover}>
                <a
                  href="#live-preview"
                  className="inline-flex h-12 items-center gap-1.5 rounded-lg border border-night-border bg-night-900 px-6 text-sm font-semibold text-night-text transition-colors hover:border-brand-700"
                >
                  See it in action
                </a>
              </motion.div>
            </motion.div>
            <motion.p variants={staggerItem} className="mt-5 text-xs font-medium text-night-muted">
              Free plan available &middot; No credit card required to start
            </motion.p>
          </div>

          <motion.div variants={staggerItem} className="flex justify-center lg:justify-end">
            <VariantDemo />
          </motion.div>
        </motion.div>
      </section>

      {/* Works with */}
      <section className="border-y border-night-border bg-night-900">
        <div className="mx-auto max-w-content px-6 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-night-muted">
            Works with
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {WORKS_WITH.map((w) => (
              <span key={w.label} className="flex items-center gap-2 text-sm font-medium text-night-secondary">
                <w.icon className="h-4 w-4" strokeWidth={1.8} />
                {w.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Live preview */}
      <section id="live-preview" className="bg-night-950 py-20 sm:py-24">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-night-text sm:text-4xl">
                One block, wired to one field
              </h2>
              <p className="mt-4 text-base leading-relaxed text-night-secondary">
                No namespace or key to type. Pick a block, drag it into the theme editor, and it
                already knows which Standard Field it renders.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="mx-auto mt-12 max-w-2xl">
            <BlockShowcase />
          </Reveal>
        </div>
      </section>

      {/* Features: all predefined blocks */}
      <section id="features" className="border-t border-night-border bg-night-900 py-20 sm:py-24">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-night-text sm:text-4xl">
                Every predefined field
              </h2>
              <p className="mt-4 text-base leading-relaxed text-night-secondary">
                9 Standard Fields cover the common cases. Anything outside them falls back to
                Advanced: your own namespace, key, and render type.
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px" }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.key}
                variants={staggerItem}
                className="glass-dark glass-hover rounded-xl2 p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-900/60 text-brand-200">
                    <f.icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      f.plan === "Unlimited"
                        ? "bg-brand-100 text-ink"
                        : f.plan === "Advanced"
                          ? "bg-brand-300 text-ink"
                          : "bg-night-700 text-night-secondary"
                    }`}
                  >
                    {f.plan}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-night-text">{f.name}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-night-muted">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing / feature comparison */}
      <section id="pricing" className="bg-night-950 py-20 sm:py-24">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-night-text sm:text-4xl">
                Every block, by plan
              </h2>
              <p className="mt-4 text-base leading-relaxed text-night-secondary">
                Blocks unlock cumulatively. Upgrading never removes what you already had.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-night-950 pb-4 pr-4 text-xs font-semibold uppercase tracking-wide text-night-muted">
                    &nbsp;
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.tier} className="px-4 pb-4 text-center">
                      <p className="text-sm font-semibold text-night-text">{p.tier}</p>
                      <p className="mt-0.5 text-lg font-bold text-brand-200">{p.price}</p>
                      <p className="text-[11px] text-night-muted">/mo</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-night-border">
                  <td className="sticky left-0 bg-night-950 py-3 pr-4 font-medium text-night-secondary">
                    Product limit
                  </td>
                  {PLANS.map((p) => (
                    <td key={p.tier} className="px-4 py-3 text-center text-night-text">
                      {p.cap}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-night-border">
                  <td className="sticky left-0 bg-night-950 py-3 pr-4 font-medium text-night-secondary">
                    Support
                  </td>
                  {PLANS.map((p) => (
                    <td key={p.tier} className="px-4 py-3 text-center text-night-text">
                      {p.support}
                    </td>
                  ))}
                </tr>
                {FEATURES.map((f) => (
                  <tr key={f.key} className="border-t border-night-border">
                    <td className="sticky left-0 bg-night-950 py-3 pr-4 font-medium text-night-secondary">
                      {f.name}
                    </td>
                    {TIER_ORDER.map((tier) => (
                      <td key={tier} className="px-4 py-3 text-center">
                        {unlockedAt(tier, f.plan) ? (
                          <Check className="mx-auto h-4 w-4 text-brand-200" strokeWidth={2.5} />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-night-700" strokeWidth={2} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* For developers: optional, secondary to the merchant-facing content above */}
      <section className="border-t border-night-border bg-night-900 py-20 sm:py-24">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-night-border bg-night-950 px-3.5 py-1.5 text-xs font-semibold text-brand-200">
                  <Code2 className="h-3.5 w-3.5" strokeWidth={2} />
                  Have a developer? Even better.
                </span>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-night-text sm:text-3xl">
                  A shortcode and a JSON API sit underneath every block
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-night-secondary">
                  Nobody needs to touch these to use MetaVariant. If your theme doesn&apos;t
                  support blocks somewhere, or someone on your team wants to build something
                  custom, the shortcode and the underlying request are right here.
                </p>
              </div>
              <DevCodeBlock tabs={CODE_TABS} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Documentation CTA */}
      <section className="border-t border-night-border bg-night-900 py-16">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="glass-dark flex flex-col items-center gap-6 rounded-xl2 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-lg font-semibold text-night-text">
                  Quick start, block reference, shortcodes, and the API
                </p>
                <p className="mt-1.5 text-sm text-night-muted">
                  Everything for setting up MetaVariant and customizing the storefront script
                  lives in one page.
                </p>
              </div>
              <Link
                to="/docs"
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-brand-100 px-5 text-sm font-semibold text-ink"
              >
                Open documentation
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-night-950 py-20 sm:py-24">
        <div className="mx-auto max-w-content px-6 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-night-text sm:text-4xl">
              Free to install, ready in three steps
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-night-secondary">
              Create a Standard Field, fill in a value per variant, drag the matching block into
              your theme.
            </p>
            <motion.a
              href="https://apps.shopify.com"
              target="_blank"
              rel="noreferrer"
              {...tapHover}
              className="mt-8 inline-flex h-12 items-center rounded-lg bg-brand-100 px-7 text-sm font-semibold text-ink shadow-card"
            >
              Add to Shopify
            </motion.a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
