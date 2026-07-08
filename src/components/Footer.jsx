import { Link } from "react-router-dom";
import { Store } from "lucide-react";
import { assetUrl } from "../lib/assets.js";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Changelog", href: "/docs#changelog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Theme block reference", href: "/docs#blocks" },
      { label: "Shortcodes", href: "/docs#shortcodes" },
      { label: "Developer & API", href: "/docs#api" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Support", href: "mailto:support@metavariantapp.com" },
      { label: "Privacy policy", href: "/docs#privacy" },
      { label: "Terms of service", href: "/docs#privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-content px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={assetUrl("/images/logo.png")} alt="MetaVariant logo" className="h-8 w-8 rounded-lg" />
              <span className="text-[17px] font-bold tracking-tight text-ink">MetaVariant</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Variant-aware metafield content for Shopify storefronts: theme blocks and
              shortcodes that update the instant a shopper picks a new variant.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-ink-secondary">
              <Store className="h-3.5 w-3.5" strokeWidth={1.8} />
              Built for Shopify
            </span>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-ink">{col.heading}</h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-muted">
            &copy; {new Date().getFullYear()} MetaVariant. A Shopify app for variant-aware
            content.
          </p>
          <p className="text-xs text-ink-muted">Not affiliated with or endorsed by Shopify Inc.</p>
        </div>
      </div>
    </footer>
  );
}
