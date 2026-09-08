import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const artigos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/artigos" }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    revisadoEm: z.coerce.date().optional(),
    // As categorias são as oito dimensões do diagnóstico.
    dimensao: z.enum([
      "fluxo", "investimentos", "tributaria", "protecao",
      "empresarial", "sucessoria", "internacional", "humana",
    ]),
    serie: z.string().optional(),
    calculadora: z.string().optional(),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { artigos };
