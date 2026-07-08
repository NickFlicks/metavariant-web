// Resolves a path inside resources/ to a full asset URL.
//
// - By default (VITE_ASSETS_BASE_URL unset) this returns a root-relative path, e.g.
//   "/images/logo.png". That works out of the box in dev and in a build served from this
//   app's own origin, because resources/ is configured as Vite's publicDir.
// - Once you upload the resources/ folder to Cloudflare (Pages project or R2 bucket with a
//   public URL), set VITE_ASSETS_BASE_URL to that origin, e.g.
//   VITE_ASSETS_BASE_URL=https://assets.metavariantapp.com
//   and every call below will point at Cloudflare instead of bundling/copying the files here.
const BASE_URL = (import.meta.env.VITE_ASSETS_BASE_URL || "").replace(/\/+$/, "");

export function assetUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalized}`;
}
