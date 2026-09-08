import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../lib/site.js";

export async function GET(context) {
  const artigos = (await getCollection("artigos")).filter((a) => !a.data.rascunho);
  return rss({
    title: SITE.marcaCurta,
    description:
      "Artigos sobre planejamento patrimonial, tributação, sucessão, proteção e comportamento.",
    site: context.site,
    items: artigos
      .sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf())
      .map((a) => ({
        title: a.data.titulo,
        description: a.data.resumo,
        pubDate: a.data.data,
        link: `/artigos/${a.id}/`,
      })),
    customData: "<language>pt-br</language>",
  });
}
