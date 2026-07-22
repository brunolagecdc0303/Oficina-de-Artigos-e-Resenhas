import { getStore } from "@netlify/blobs";

// PIN de administrador — diferente do PIN dos associados.
// Configure em: Netlify → Site configuration → Environment variables → ADMIN_PIN
const ADMIN_PIN = process.env.ADMIN_PIN;

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Método não permitido", { status: 405 });
  }

  if (!ADMIN_PIN) {
    return Response.json(
      {
        erro:
          "Painel administrativo ainda não configurado. Defina a variável de ambiente ADMIN_PIN no Netlify e faça um novo deploy.",
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  if (body.adminPin !== ADMIN_PIN) {
    return Response.json({ erro: "PIN de administrador incorreto." }, { status: 401 });
  }

  const store = getStore("config-ifl-bh");
  const atual = (await store.get("servico", { type: "json" })) || { ativo: true };

  if (body.action === "status") {
    return Response.json({ ativo: atual.ativo !== false });
  }

  if (body.action === "set") {
    const novo = { ativo: !!body.ativo, atualizadoEm: new Date().toISOString() };
    await store.setJSON("servico", novo);
    return Response.json({ ok: true, ativo: novo.ativo });
  }

  return Response.json({ erro: "Ação desconhecida." }, { status: 400 });
};

export const config = { path: "/api/admin" };
