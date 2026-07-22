import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

// Cada usuário (nome + PIN) vira uma chave irreversível (hash).
// O PIN nunca é armazenado em texto puro e um usuário não consegue
// listar ou adivinhar os textos de outro.
function userKey(nome, pin) {
  const normalizado = `${(nome || "").trim().toLowerCase()}:${(pin || "").trim()}`;
  return createHash("sha256").update("ifl-bh-v1:" + normalizado).digest("hex");
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Método não permitido", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const { nome, pin, action } = body;
  if (!nome || !pin || !/^\d{4,8}$/.test(String(pin))) {
    return Response.json(
      { erro: "Informe seu nome e um PIN numérico de 4 a 8 dígitos." },
      { status: 400 }
    );
  }

  const store = getStore("artigos-ifl-bh");
  const key = userKey(nome, pin);
  const atuais = (await store.get(key, { type: "json" })) || [];

  if (action === "list") {
    const meta = atuais.map(({ id, titulo, tipo, atualizadoEm }) => ({
      id, titulo, tipo, atualizadoEm,
    }));
    return Response.json({ artigos: meta });
  }

  if (action === "get") {
    const artigo = atuais.find((a) => a.id === body.id);
    if (!artigo) return Response.json({ erro: "Texto não encontrado." }, { status: 404 });
    return Response.json({ artigo });
  }

  if (action === "save") {
    const { artigo } = body;
    if (!artigo || !artigo.conteudo) {
      return Response.json({ erro: "Nada para salvar." }, { status: 400 });
    }
    const id = artigo.id || `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const salvo = {
      id,
      titulo: (artigo.titulo || "Sem título").slice(0, 200),
      tipo: ["resenha", "livre"].includes(artigo.tipo) ? artigo.tipo : "artigo",
      conteudo: String(artigo.conteudo).slice(0, 100000),
      atualizadoEm: new Date().toISOString(),
    };
    const restantes = atuais.filter((a) => a.id !== id);
    restantes.unshift(salvo);
    await store.setJSON(key, restantes.slice(0, 100));
    return Response.json({ ok: true, id });
  }

  if (action === "delete") {
    const restantes = atuais.filter((a) => a.id !== body.id);
    await store.setJSON(key, restantes);
    return Response.json({ ok: true });
  }

  return Response.json({ erro: "Ação desconhecida." }, { status: 400 });
};

export const config = { path: "/api/artigos" };
