import { SITE } from "../lib/site.js";

// O robots.txt acompanha a flag SITE.indexavel: enquanto o site está em
// revisão, ele pede aos buscadores que fiquem fora por inteiro.
export function GET({ site }) {
  const corpo = SITE.indexavel
    ? `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`
    : `# Site em revisão — indexação desativada em src/lib/site.js (indexavel: false)\nUser-agent: *\nDisallow: /\n`;
  return new Response(corpo, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
