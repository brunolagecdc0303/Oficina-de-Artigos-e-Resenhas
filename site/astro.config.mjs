import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/lib/site.js";

export default defineConfig({
  site: SITE.url,
  integrations: [sitemap()],
  build: { format: "directory" },
  markdown: { shikiConfig: { theme: "github-light" } },
});
