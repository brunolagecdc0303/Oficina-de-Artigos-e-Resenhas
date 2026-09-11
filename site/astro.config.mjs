import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
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
  // O site continua estático. Só a landing do diagnóstico é servida na hora,
  // para ler os textos editados no painel sem precisar de novo deploy.
  adapter: netlify(),
  build: { format: "directory" },
  markdown: { shikiConfig: { theme: "github-light" } },
});
