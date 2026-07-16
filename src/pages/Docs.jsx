import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CodeBlock from "../components/CodeBlock.jsx";
import { EASE_OUT } from "../lib/motion.js";

const SECTIONS = [
  { id: "quick-start", label: "Quick start" },
  { id: "blocks", label: "Theme block reference" },
  { id: "shortcodes", label: "Shortcodes" },
  { id: "plans", label: "Plans & block access" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "css", label: "CSS reference" },
  { id: "api", label: "Developer & API reference" },
  { id: "changelog", label: "Changelog" },
  { id: "privacy", label: "Privacy & terms" },
];

// One block per Standard Field, matching the real {% schema %} "name" in
// each block's .liquid file, plus Advanced for anything outside the
// standard set. (Three older blocks, Multiline, JSON, and Star Rating,
// still exist in the extension but are being retired before launch since
// Advanced already covers plain text and JSON, and Star Rating isn't a
// MetaVariant feature. They're intentionally left off this list.)
const BLOCK_REFERENCE = [
  {
    name: "Product Label",
    plan: "Free",
    description:
      "Shows a short badge for the selected variant, like “New” or “Limited Stock”, from the Product Label field. 14 badge shapes to choose from, with configurable colors, padding, and alignment.",
  },
  {
    name: "Variant Description",
    plan: "Free",
    description:
      "Renders the Variant Description field's rich text formatting (paragraphs, bold/italic, links, lists) as real HTML for the selected variant.",
  },
  {
    name: "Shipping/Stock Alert",
    plan: "Advanced",
    description:
      "Shows a warning badge for the selected variant from the Shipping & Stock Alert field, for example “Made to Order, 3 Week Lead Time”. Nothing shows on variants left blank.",
  },
  {
    name: "Specifications Table",
    plan: "Advanced",
    description:
      "Turns the Variant Specifications field into a technical spec table on the storefront. Add one “Label: Value” line per spec on the Add Content page, for example “Weight: 200g” or “Storage: 256GB”, and each line becomes a row.",
  },
  {
    name: "Image or File",
    plan: "Advanced",
    description:
      "Shows an image or file for the selected variant from the Variant Image or File field. The first image now renders server-side and the metafield response is cached, for a faster Largest Contentful Paint.",
  },
  {
    name: "Link",
    plan: "Advanced",
    description:
      "Shows a clickable link for the selected variant, for example a size guide or spec sheet, from the Variant Link field.",
  },
  {
    name: "B2B / Case-Pack Pricing",
    plan: "Advanced",
    description:
      "Shows a wholesale pricing breakdown for the selected variant: pack size, cost per unit, and the computed total. Create the Pack Quantity and Price Per Unit standard fields once, set both on a variant sold by the case, and the block does the math. It hides itself if either field is missing.",
  },
  {
    name: "Material Card",
    plan: "Unlimited",
    description:
      "An expanded material breakdown for the selected variant: a color or pattern swatch, a close-up texture photo, and descriptive details like fabric composition or care instructions. Use the Swatch Image field instead of Material Color for prints and patterns; if both are set, the image wins.",
  },
  {
    name: "Document & Download",
    plan: "Unlimited",
    description:
      "A download button linking to the Download File standard field for the selected variant, for example a manual or a safety certification. The file is selected directly from Shopify Files, no URL to paste, and the button is hidden on variants with nothing set.",
  },
  {
    name: "Advanced (Custom Field)",
    plan: "Unlimited",
    description:
      "For your own custom variant metafields, outside the 9 dedicated blocks above. Pick a Render Type (Plain Text, HTML, Rich Text, JSON, URL, or Image) and type the namespace and key yourself.",
  },
];

const CSS_SNIPPETS = [
  {
    title: "Basic text styling",
    code: `.variant-metafield-container {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 1rem 0;
}`,
  },
  {
    title: "Image styling",
    code: `.variant-metafield-container img {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}`,
  },
  {
    title: "Rich text spacing",
    code: `.variant-metafield-container p {
  margin-bottom: 1rem;
}

.variant-metafield-container h1,
.variant-metafield-container h2,
.variant-metafield-container h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}`,
  },
  {
    title: "Single-line label overrides (shapes/hover)",
    code: `.metavariant-single-line {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.metavariant-single-line:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
}`,
  },
  {
    title: "Responsive / mobile",
    code: `@media (max-width: 480px) {
  .variant-metafield-container {
    font-size: 14px;
  }

  .metavariant-single-line {
    padding: 4px 8px !important;
  }
}`,
  },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0.1 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function DocSection({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-slate-200 py-12 first:pt-0 last:border-b-0">
      <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-ink-secondary">{subtitle}</p> : null}
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-secondary">{children}</div>
    </section>
  );
}

export default function Docs() {
  const activeId = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold text-brand-700 backdrop-blur">
          Documentation
        </span>
        <h1 className="mt-4 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Everything you need to run <em className="italic text-brand-600">MetaVariant</em>
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-secondary">
          Setup, theme blocks, shortcodes, plan limits, troubleshooting, and the API reference
          for developers customizing the storefront script.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="glass sticky top-24 space-y-1 rounded-xl2 p-4">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative block rounded-lg py-1.5 pl-3 text-sm transition-colors ${
                  activeId === s.id ? "font-semibold text-brand-700" : "text-ink-muted hover:text-ink"
                }`}
              >
                {activeId === s.id ? (
                  <motion.span
                    layoutId="docs-active-section"
                    className="absolute inset-0 rounded-lg border-l-2 border-brand-500 bg-white/70"
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  />
                ) : null}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <DocSection
            id="quick-start"
            title="Quick start"
            subtitle="Three steps to get variant content showing on your storefront."
          >
            <ol className="list-decimal space-y-2.5 pl-5">
              <li>
                On the <strong className="text-ink">Metafields Configuration</strong> page, click{" "}
                <strong className="text-ink">Create field</strong> next to a{" "}
                <strong className="text-ink">Standard Field</strong> that matches what you need,
                for example Product Label or Shipping &amp; Stock Alert. It&apos;s already wired
                to a theme block, so there&apos;s no namespace, key, or type to fill in yourself.
              </li>
              <li>
                Fill in a value per product variant on the <strong className="text-ink">Add
                Content</strong> page. Rich text fields open a real WYSIWYG editor, and image or
                file fields open a picker you can search or upload straight into.
              </li>
              <li>
                Open the theme editor and drag the block named on the field&apos;s card into your
                product template. Standard Fields point themselves at the right namespace and
                key automatically.
              </li>
            </ol>
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="font-semibold text-ink">Advanced: custom field</p>
              <p className="mt-1">
                Need something the 13 Standard Fields don&apos;t cover? Create your own
                definition the same way you always could: on the Metafields page, or in Shopify
                Admin under Settings &rarr; Custom data &rarr; Variants. See the block reference
                below for which block matches your metafield type, and use the namespace/key it
                shows you.
              </p>
            </div>
          </DocSection>

          <DocSection
            id="blocks"
            title="Theme block reference"
            subtitle="Every block targets the product page (theme editor → your product template → Add block)."
          >
            <p>
              Each block needs a <strong className="text-ink">Namespace</strong> and{" "}
              <strong className="text-ink">Key</strong> matching a definition from the Metafields
              page. The shortcode shown there (e.g.{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                custom.variant_subtitle
              </code>
              ) is the same namespace.key pair. If you used a Standard Field, this is already
              handled for you: just drag in the block named on that field&apos;s card.
            </p>
            <ul className="space-y-3">
              {BLOCK_REFERENCE.map((b) => (
                <li key={b.name} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink">{b.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        b.plan === "Unlimited"
                          ? "bg-brand-800 text-white"
                          : b.plan === "Advanced"
                            ? "bg-brand-500 text-white"
                            : "bg-slate-100 text-ink-muted"
                      }`}
                    >
                      {b.plan}
                    </span>
                  </div>
                  <p className="mt-1">{b.description}</p>
                </li>
              ))}
            </ul>
          </DocSection>

          <DocSection
            id="shortcodes"
            title="Shortcodes (alternative to blocks)"
            subtitle="If your theme doesn't support app blocks in a particular spot, for example inside a product description, paste a shortcode directly into that text instead."
          >
            <CodeBlock>{'[variant_metafield namespace="custom" key="variant_subtitle"]'}</CodeBlock>
            <p>
              Copy the exact shortcode for each definition from the Metafields page. Shortcodes
              are detected anywhere in the page content and swapped for the live value when the
              customer changes variants: the same behavior as the blocks, just usable in
              freeform text.
            </p>
          </DocSection>

          <DocSection id="plans" title="Plans &amp; block access">
            <p>
              Every plan includes <strong className="text-ink">Product Label</strong> and{" "}
              <strong className="text-ink">Variant Description</strong>.{" "}
              <strong className="text-ink">Advanced</strong> adds Shipping/Stock Alert,
              Specifications Table, Image or File, Link, and B2B / Case-Pack Pricing.{" "}
              <strong className="text-ink">Unlimited</strong> adds Material Card, Document &amp;
              Download, and the Advanced (Custom Field) fallback for anything outside the
              standard set. Product limits scale with plan: 10 on Free, 20 on Lite, 50 on
              Advanced, no cap on Unlimited.
            </p>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Plan</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Product limit</th>
                    <th className="px-4 py-3 font-semibold">Blocks unlocked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">Free</td>
                    <td className="px-4 py-3">$0/mo</td>
                    <td className="px-4 py-3">10 products</td>
                    <td className="px-4 py-3">Product Label, Variant Description</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">Lite</td>
                    <td className="px-4 py-3">$7.90/mo</td>
                    <td className="px-4 py-3">20 products</td>
                    <td className="px-4 py-3">Same as Free, more product headroom</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">Advanced</td>
                    <td className="px-4 py-3">$16.90/mo</td>
                    <td className="px-4 py-3">50 products</td>
                    <td className="px-4 py-3">
                      + Shipping/Stock Alert, Specifications Table, Image or File, Link, B2B /
                      Case-Pack Pricing
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">Unlimited</td>
                    <td className="px-4 py-3">$29.90/mo</td>
                    <td className="px-4 py-3">No product limit</td>
                    <td className="px-4 py-3">
                      + Material Card, Document &amp; Download, Advanced (Custom Field)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DocSection>

          <DocSection id="troubleshooting" title="Troubleshooting">
            <ul className="space-y-3">
              <li>
                <strong className="text-ink">Value not showing on the storefront:</strong>{" "}
                confirm the block&apos;s Namespace/Key match a definition exactly (typos are the
                most common cause), and that a value has been saved for the variant currently
                selected on the Add Content page.
              </li>
              <li>
                <strong className="text-ink">Value doesn&apos;t update on variant change:</strong>{" "}
                most themes fire a standard variant-change event automatically; if yours
                doesn&apos;t, MetaVariant falls back to polling for up to 30 seconds after page
                load, so a short delay on first load is expected.
              </li>
              <li>
                <strong className="text-ink">Still stuck:</strong> open the browser console on
                the product page with{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                  ?mv_debug=1
                </code>{" "}
                added to the URL (e.g.{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                  yourstore.com/products/example?mv_debug=1
                </code>
                ) to see verbose fetch/render logs. See the Developer &amp; API reference
                below.
              </li>
            </ul>
          </DocSection>

          <DocSection
            id="css"
            title="CSS reference"
            subtitle="Ready-made snippets to paste into Settings → Custom CSS in the app."
          >
            <div className="space-y-5">
              {CSS_SNIPPETS.map((s) => (
                <div key={s.title}>
                  <p className="mb-2 font-semibold text-ink">{s.title}</p>
                  <CodeBlock>{s.code}</CodeBlock>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection
            id="api"
            title="Developer & API reference"
            subtitle="For anyone customizing the storefront script or debugging directly."
          >
            <div className="space-y-5">
              <div>
                <p className="font-semibold text-ink">Variant metafield values endpoint</p>
                <p className="mt-1">
                  The storefront script fetches values from{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                    /app/api/variant-metafield-values
                  </code>{" "}
                  (also reachable through the Shopify app proxy at{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                    /apps/metavariant/api/variant-metafield-values
                  </code>
                  ). It accepts a <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">variantId</code>,
                  an optional <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">shop</code> query
                  param, and either an <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">identifiers</code>{" "}
                  array or bare query params in the body to filter which namespace.key pairs come
                  back.
                </p>
                <p className="mt-2">
                  Note: this endpoint doesn&apos;t verify the Shopify app-proxy signature, so it
                  will answer for any shop domain that has the app installed. Since these values
                  are meant to be rendered publicly on your storefront anyway, this is low risk.
                  Just don&apos;t store anything sensitive in a variant metafield you&apos;re
                  exposing this way.
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink">Backend URL / styles endpoint</p>
                <p className="mt-1">
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                    /app/api/backend-url?shop=your-shop.myshopify.com
                  </code>{" "}
                  returns the resolved API base URL (your override in Settings, or the app&apos;s
                  default) and your saved Custom CSS. The storefront script calls this once per
                  page load to inject your CSS and to know which URL to use for the endpoint
                  above.
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink">Debug logging</p>
                <p className="mt-1">
                  The storefront script is silent by default. To see verbose fetch/render logs in
                  the browser console, either run{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                    window.__METAVARIANT_DEBUG__ = true
                  </code>{" "}
                  in the console, or add{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
                    ?mv_debug=1
                  </code>{" "}
                  to any product page URL.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection id="changelog" title="Changelog">
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  Latest: Standard Fields, four new blocks, and a rebuilt editor
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    13 Standard Fields: ready-made metafield definitions you create with one
                    click instead of typing a namespace, key, and type by hand
                  </li>
                  <li>
                    Four new Unlimited-only blocks built around those fields: B2B / Case-Pack
                    Pricing, Specifications Table, Material Card, and Document &amp; Download
                  </li>
                  <li>
                    A self-built file picker on the Add Content page, with search, loading, and
                    error states, plus direct upload straight into Shopify Files
                  </li>
                  <li>
                    A real WYSIWYG rich text editor that prefills existing content and formatting
                    when you reopen a variant
                  </li>
                  <li>
                    Inline tooltips next to Namespace, Key, and Type explaining what each one
                    means
                  </li>
                  <li>
                    Faster storefront loads: the first variant image now renders server-side and
                    the metafield API response is cached, improving Largest Contentful Paint
                  </li>
                  <li>Product Label and Shipping/Stock Alert blocks grew from 9 to 14 badge shapes</li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  v1.0: Initial release
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>Merchant dashboard with per-product connection status</li>
                  <li>
                    Seven theme blocks plus shortcode support for text, rich text, image/video,
                    URL, and JSON metafields
                  </li>
                  <li>Free, Lite, and Unlimited plans with per-plan product and type limits</li>
                  <li>Custom CSS and backend URL overrides in Settings</li>
                </ul>
              </div>
            </div>
          </DocSection>

          <DocSection id="privacy" title="Privacy & terms">
            <p>
              What MetaVariant collects (shop domain, session data for authentication, your plan
              and settings) and doesn&apos;t collect (no customer or order data, ever) is covered
              in full on the{" "}
              <Link to="/privacy" className="font-semibold text-brand-600 hover:text-brand-700">
                Privacy Policy &amp; Terms of Use
              </Link>{" "}
              page.
            </p>
            <p>
              Questions about data handling or anything else can go to{" "}
              <a href="mailto:support@metavariant.net" className="font-semibold text-brand-600 hover:text-brand-700">
                support@metavariant.net
              </a>
              .
            </p>
          </DocSection>
        </div>
      </div>
    </div>
  );
}
