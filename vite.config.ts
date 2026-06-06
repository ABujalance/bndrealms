import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * GitHub Pages is a static host with no SPA rewrite support, so after the build
 * we emit two extra copies of index.html:
 *   - newsletter/index.html → a real 200 for the canonical /newsletter URL
 *   - 404.html              → SPA fallback so any other deep link still boots the
 *                             app and lets the router resolve it
 * Keep the "newsletter" segment in sync with NEWSLETTER_PATH in src/router.tsx.
 */
function staticRoutes(): Plugin {
  let outDir = "dist";
  let root = process.cwd();
  return {
    name: "spa-static-routes",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },
    closeBundle() {
      const dist = resolve(root, outDir);
      const index = resolve(dist, "index.html");
      mkdirSync(resolve(dist, "newsletter"), { recursive: true });
      copyFileSync(index, resolve(dist, "newsletter", "index.html"));
      copyFileSync(index, resolve(dist, "404.html"));
    },
  };
}

// Served from the apex custom domain (bndrealms.com) at the root, so base is "/".
// If you ever deploy to a project page (https://<user>.github.io/<repo>/) instead,
// change this to "/<repo>/".
export default defineConfig({
  base: "/",
  plugins: [react(), staticRoutes()],
});
