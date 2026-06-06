import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from the apex custom domain (bndrealms.com) at the root, so base is "/".
// If you ever deploy to a project page (https://<user>.github.io/<repo>/) instead,
// change this to "/<repo>/".
export default defineConfig({
  base: "/",
  plugins: [react()],
});
