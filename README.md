# MetaVariant website

Marketing site for MetaVariant, the Shopify app that shows variant-specific metafield content
on product pages. Built with Vite, React, React Router, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

Requires Node 18+.

## Structure

```
index.html              Vite entry HTML
src/
  main.jsx               React root, router setup
  App.jsx                Layout shell (nav/footer) + route table
  index.css              Tailwind entry + a few custom utilities
  lib/assets.js           Helper for resolving asset URLs (see "Static assets" below)
  components/
    NavBar.jsx
    Footer.jsx
    CodeBlock.jsx
  pages/
    Home.jsx              Hero, feature showcase, how-it-works, block reference,
                           dashboard preview, pricing, final CTA
    Docs.jsx               Full documentation page (quick start, theme blocks,
                           shortcodes, plan limits, troubleshooting, CSS reference,
                           developer/API reference, changelog, privacy placeholder)
resources/                Standalone static-asset folder — see below
```

## Static assets & Cloudflare

`resources/` is intentionally kept separate from `src/`. It's configured as Vite's `publicDir`,
so locally and in a normal build it's served/copied as-is and referenced with root-relative
paths (e.g. `/images/logo.png`) — nothing extra to set up.

The folder is also meant to be uploaded on its own to Cloudflare (a Pages project or a public
R2 bucket) if you'd rather serve images/icons from a CDN origin instead of bundling them with
the app:

1. Upload the contents of `resources/` to Cloudflare.
2. Copy `.env.example` to `.env` and set `VITE_ASSETS_BASE_URL` to that Cloudflare URL.
3. Rebuild (`npm run build`). Every call to `assetUrl(...)` in the code (see
   `src/lib/assets.js`) will now point at Cloudflare instead of this app's own origin.

Leave `VITE_ASSETS_BASE_URL` unset to keep serving assets from this site itself.

## Content source

Copy on this site (feature descriptions, block reference, plan pricing/limits, troubleshooting
steps, API endpoints) was pulled directly from the MetaVariant Shopify app's own source —
mainly `app/routes/app.settings.tsx` (in-app documentation), `app/routes/app.billing.tsx`
(plan tiers) and `app/routes/app._index.tsx` (dashboard). Keep this site in sync when those
change.

## Known gaps

- **Privacy policy / terms of service**: the Docs page has a placeholder section
  (`#privacy`) — Shopify requires a real, publicly hosted privacy policy before an app can go
  live in the App Store. Replace it before launch.
- **"Add to Shopify" links** currently point at `https://apps.shopify.com` — swap in your
  actual App Store listing URL once it's live.
- Support email is a placeholder (`support@metavariantapp.com`) — update to your real address.

## A note on this build

This project was generated in a sandboxed environment without registry access, so
`npm install` / `npm run build` haven't been run here — the code was written and manually
reviewed for correctness (import paths, JSX structure, bracket balance) but not compiled.
Run `npm install && npm run build` as your first step to confirm everything compiles cleanly
in your own environment.
