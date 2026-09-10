import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/lib/site.js";

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      // O painel é área interna: fica fora do sitemap, coerente com o
      // noindex da própria página e com o Disallow do robots.txt.
      filter: (pagina) => !pagina.includes("/admin"),
    }),
  ],
  build: { format: "directory" },
  markdown: { shikiConfig: { theme: "github-light" } },
});
