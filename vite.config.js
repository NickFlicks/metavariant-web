import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // `resources/` is a standalone static-asset folder (images, icons, fonts) that can be
  // uploaded as-is to Cloudflare (Pages or an R2 bucket) and served independently of this
  // app. Locally it doubles as Vite's public dir, so paths like `/images/logo.png` resolve
  // during `npm run dev` / `npm run build` without any extra setup. Once the folder is
  // hosted on Cloudflare, set VITE_ASSETS_BASE_URL (see .env.example) to point asset URLs
  // there instead of at this app's own origin.
  publicDir: "resources",
});
