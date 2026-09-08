import { getStore } from "@netlify/blobs";
import { CALCULADORAS, liberadasPorPadrao } from "../../src/lib/calculadoras.js";

const ADMIN_PIN = process.env.ADMIN_PIN;
const TODAS = CALCULADORAS.map((c) => c.slug);

export default async (req) => {
  if (req.method !== "POST") return new Response("Método não permitido", { status: 405 });

  if (!ADMIN_PIN) {
    return Response.json(
      {
        erro:
          "Painel ainda não configurado. Defina a variável de ambiente ADMIN_PIN " +
          "no Netlify (Site configuration → Environment variables) e refaça o deploy.",
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ erro: "JSON inválido." }, { status: 400 });
  }

  // Comparação de tamanho constante evita vazar o PIN por tempo de resposta.
  const informado = String(body.adminPin ?? "");
  const correto = String(ADMIN_PIN);
  let diferenca = informado.length ^ correto.length;
  for (let i = 0; i < Math.max(informado.length, correto.length); i++) {
    diferenca |= (informado.charCodeAt(i) || 0) ^ (correto.charCodeAt(i) || 0);
  }
  if (diferenca !== 0) {
    await new Promise((r) => setTimeout(r, 400));
    return Response.json({ erro: "PIN incorreto." }, { status: 401 });
  }

  const store = getStore("config-site");
  const salvo = (await store.get("calculadoras", { type: "json" })) ?? {};
  const estado = {
    liberadas: Array.isArray(salvo.liberadas) ? salvo.liberadas : liberadasPorPadrao(),
    codigoCliente: salvo.codigoCliente ?? null,
    atualizadoEm: salvo.atualizadoEm ?? null,
  };

  const gravar = async (novo) => {
    const registro = { ...novo, atualizadoEm: new Date().toISOString() };
    await store.setJSON("calculadoras", registro);
    return registro;
  };

  switch (body.action) {
    case "status":
      return Response.json({
        ...estado,
        catalogo: CALCULADORAS.map((c) => ({
          slug: c.slug,
          nome: c.nome,
          subtitulo: c.subtitulo,
          dimensao: c.dimensao,
        })),
      });

    case "liberar": {
      const alvo = String(body.slug ?? "");
      if (!TODAS.includes(alvo)) {
        return Response.json({ erro: "Calculadora desconhecida." }, { status: 400 });
      }
      const set = new Set(estado.liberadas);
      if (body.liberada) set.add(alvo);
      else set.delete(alvo);
      const registro = await gravar({ ...estado, liberadas: TODAS.filter((s) => set.has(s)) });
      return Response.json({ ok: true, ...registro });
    }

    case "liberarTodas": {
      const registro = await gravar({ ...estado, liberadas: body.liberada ? [...TODAS] : [] });
      return Response.json({ ok: true, ...registro });
    }

    case "codigo": {
      const codigo = String(body.codigo ?? "").trim();
      const registro = await gravar({ ...estado, codigoCliente: codigo || null });
      return Response.json({ ok: true, ...registro });
    }

    case "leads": {
      const leads = getStore("leads-site");
      const { blobs } = await leads.list();
      const ordenados = blobs.map((b) => b.key).sort().reverse().slice(0, 200);
      const registros = await Promise.all(
        ordenados.map(async (key) => ({ key, ...(await leads.get(key, { type: "json" })) }))
      );
      return Response.json({ leads: registros });
    }

    default:
      return Response.json({ erro: "Ação desconhecida." }, { status: 400 });
  }
};

export const config = { path: "/api/admin" };
