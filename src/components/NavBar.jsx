import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { assetUrl } from "../lib/assets.js";
import { EASE_OUT } from "../lib/motion.js";

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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-night-border bg-night-950/80 shadow-glassDark backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-night-950/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <motion.img
            src={assetUrl("/images/logo.png")}
            alt="MetaVariant logo"
            className="h-8 w-8 rounded-lg"
            whileHover={{ rotate: -6, scale: 1.05 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          />
          <span className="text-[17px] font-bold tracking-tight text-night-text">MetaVariant</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/docs") ? (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors ${
                    isActive ? "text-brand-200" : "text-night-secondary hover:text-night-text"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-night-secondary transition-colors hover:text-night-text"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
              >
                {link.label}
              </motion.a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/docs"
            className="text-sm font-medium text-night-secondary transition-colors hover:text-night-text"
          >
            Documentation
          </Link>
          <motion.a
            href="https://apps.shopify.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-lg bg-brand-100 px-4 text-sm font-semibold text-ink shadow-soft"
            whileHover={{ y: -2, backgroundColor: "#C7D2FE" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            Add to Shopify
          </motion.a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-night-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="flex"
            >
              {open ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden border-t border-night-border bg-night-950 md:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 py-4">
              {NAV_LINKS.map((link, i) =>
                link.href.startsWith("/docs") ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05, ease: EASE_OUT }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-night-secondary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-night-secondary"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05, ease: EASE_OUT }}
                  >
                    {link.label}
                  </motion.a>
                ),
              )}
              <a
                href="https://apps.shopify.com"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-brand-100 px-4 text-sm font-semibold text-ink"
              >
                Add to Shopify
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
