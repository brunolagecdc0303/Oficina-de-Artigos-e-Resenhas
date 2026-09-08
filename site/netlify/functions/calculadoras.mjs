import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";
import { CALCULADORAS, liberadasPorPadrao } from "../../src/lib/calculadoras.js";

const TODAS = CALCULADORAS.map((c) => c.slug);

export const tokenDoCodigo = (codigo) =>
  createHash("sha256").update(`acesso:${String(codigo).trim().toLowerCase()}`).digest("hex");

export async function lerConfig() {
  const store = getStore("config-site");
  const salvo = await store.get("calculadoras", { type: "json" });
  return {
    liberadas: Array.isArray(salvo?.liberadas) ? salvo.liberadas : liberadasPorPadrao(),
    codigoCliente: salvo?.codigoCliente ?? null,
    atualizadoEm: salvo?.atualizadoEm ?? null,
  };
}

export default async (req) => {
  const url = new URL(req.url);

  // Token do cliente pode vir no header (GET) ou no corpo (POST de troca de código).
  let token = req.headers.get("x-acesso") || url.searchParams.get("acesso") || null;
  let codigo = null;

  if (req.method === "POST") {
    try {
      const body = await req.json();
      codigo = body?.codigo ?? null;
    } catch {
      return Response.json({ erro: "JSON inválido." }, { status: 400 });
    }
  } else if (req.method !== "GET") {
    return new Response("Método não permitido", { status: 405 });
  }

  let config;
  try {
    config = await lerConfig();
  } catch {
    // Blobs indisponível (ex.: rodando sem contexto Netlify): cai no padrão.
    return Response.json({ liberadas: liberadasPorPadrao(), acesso: false, degradado: true });
  }

  const esperado = config.codigoCliente ? tokenDoCodigo(config.codigoCliente) : null;

  if (codigo) {
    const candidato = tokenDoCodigo(codigo);
    if (!esperado || candidato !== esperado) {
      return Response.json({ erro: "Código de acesso inválido." }, { status: 401 });
    }
    return Response.json({ liberadas: TODAS, acesso: true, token: candidato });
  }

  const temAcesso = Boolean(esperado && token && token === esperado);
  return Response.json({
    liberadas: temAcesso ? TODAS : config.liberadas,
    acesso: temAcesso,
  });
};

export const config = { path: "/api/calculadoras" };
