import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assetUrl } from "../lib/assets.js";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-slate-200 bg-white/85 backdrop-blur-md"
          : "border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={assetUrl("/images/logo.png")} alt="MetaVariant logo" className="h-8 w-8 rounded-lg" />
          <span className="text-[17px] font-bold tracking-tight text-ink">MetaVariant</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/docs") ? (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-brand-600" : "text-ink-secondary hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#pricing"
            className="text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
          >
            Sign in
          </a>
          <a
            href="https://apps.shopify.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-lg bg-ink px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-700"
          >
            Add to Shopify
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/docs") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-ink-secondary"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-ink-secondary"
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href="https://apps.shopify.com"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white"
            >
              Add to Shopify
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
