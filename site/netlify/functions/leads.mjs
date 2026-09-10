import { getStore } from "@netlify/blobs";

// --------------------------------------------------------------------------
// Recebe e qualifica quem chega pela landing page.
// A pontuação é transparente de propósito: você deve conseguir explicar por
// que um lead entrou em cada faixa, e ajustar os pesos sem mexer no resto.
// --------------------------------------------------------------------------

const PESOS = {
  patrimonio: {
    "ate-500k": 0,
    "500k-2mi": 2,
    "2mi-5mi": 4,
    "5mi-20mi": 6,
    "acima-20mi": 7,
    "prefiro-nao-dizer": 1,
  },
  perfil: {
    empresario: 3,
    "medico-pj": 3,
    executivo: 2,
    "profissional-liberal": 2,
    aposentado: 1,
    outro: 0,
  },
  prazo: { agora: 3, "3-meses": 2, "este-ano": 1, pesquisando: 0 },
};

const FAIXAS = [
  {
    minimo: 10,
    faixa: "prioritario",
    titulo: "Vamos marcar a conversa de descoberta",
    mensagem:
      "Pelo que você descreveu, faz sentido conversarmos. Eu respondo " +
      "pessoalmente em até dois dias úteis para combinarmos o melhor horário. " +
      "São noventa minutos, sem proposta e sem apresentação de produto: eu ouço, " +
      "e em 48 horas depois da conversa você recebe por escrito o resumo do que " +
      "eu entendi.",
    proximoPasso: "agenda",
  },
  {
    minimo: 5,
    faixa: "acompanhar",
    titulo: "Comece pelo diagnóstico",
    mensagem:
      "Antes de qualquer conversa, vale você ver o retrato completo. O diagnóstico " +
      "cobre as oito dimensões e devolve os seus riscos priorizados, sem nenhuma " +
      "recomendação junto.",
    proximoPasso: "diagnostico",
  },
  {
    minimo: 0,
    faixa: "conteudo",
    titulo: "Recebido",
    mensagem:
      "Obrigado — anotei. Enquanto isso, as calculadoras são abertas e resolvem " +
      "boa parte das dúvidas que chegam aqui.",
    proximoPasso: "conteudo",
  },
];

function pontuar(dados) {
  const dimensoes = Array.isArray(dados.dimensoes) ? dados.dimensoes : [];
  const detalhe = {
    patrimonio: PESOS.patrimonio[dados.patrimonio] ?? 0,
    perfil: PESOS.perfil[dados.perfil] ?? 0,
    prazo: PESOS.prazo[dados.prazo] ?? 0,
    complexidade: Math.min(3, dimensoes.length),
  };
  const total = Object.values(detalhe).reduce((a, b) => a + b, 0);
  const faixa = FAIXAS.find((f) => total >= f.minimo) ?? FAIXAS[FAIXAS.length - 1];
  return { total, detalhe, ...faixa };
}

const limpa = (v, max = 300) => String(v ?? "").trim().slice(0, max);
const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default async (req) => {
  if (req.method !== "POST") return new Response("Método não permitido", { status: 405 });

  let dados;
  try {
    dados = await req.json();
  } catch {
    return Response.json({ erro: "JSON inválido." }, { status: 400 });
  }

  // Armadilha para robô: campo invisível que humano nunca preenche.
  if (limpa(dados.website)) return Response.json({ ok: true, ignorado: true });

  const nome = limpa(dados.nome, 120);
  const email = limpa(dados.email, 160).toLowerCase();

  if (nome.length < 2) return Response.json({ erro: "Informe seu nome." }, { status: 400 });
  if (!emailValido(email)) return Response.json({ erro: "E-mail inválido." }, { status: 400 });
  if (dados.consentimento !== true) {
    return Response.json(
      { erro: "É preciso concordar com o tratamento dos seus dados para enviar." },
      { status: 400 }
    );
  }

  const resultado = pontuar(dados);

  const registro = {
    nome,
    email,
    telefone: limpa(dados.telefone, 40),
    perfil: limpa(dados.perfil, 40),
    patrimonio: limpa(dados.patrimonio, 40),
    prazo: limpa(dados.prazo, 40),
    dimensoes: (Array.isArray(dados.dimensoes) ? dados.dimensoes : []).slice(0, 8).map((d) => limpa(d, 40)),
    contexto: limpa(dados.contexto, 2000),
    origem: limpa(dados.origem, 120),
    rastreio: {
      utmSource: limpa(dados.rastreio?.utmSource, 80),
      utmMedium: limpa(dados.rastreio?.utmMedium, 80),
      utmCampaign: limpa(dados.rastreio?.utmCampaign, 120),
      utmContent: limpa(dados.rastreio?.utmContent, 120),
      referrer: limpa(dados.rastreio?.referrer, 300),
      pagina: limpa(dados.rastreio?.pagina, 120),
    },
    pontuacao: resultado.total,
    detalhePontuacao: resultado.detalhe,
    faixa: resultado.faixa,
    recebidoEm: new Date().toISOString(),
  };

  try {
    const store = getStore("leads-site");
    const chave = `${registro.recebidoEm}-${Math.random().toString(36).slice(2, 8)}`;
    await store.setJSON(chave, registro);
  } catch (e) {
    // Não perde o lead por falha de armazenamento: registra e segue.
    console.error("Falha ao gravar lead:", e);
  }

  return Response.json({
    ok: true,
    faixa: resultado.faixa,
    titulo: resultado.titulo,
    mensagem: resultado.mensagem,
    proximoPasso: resultado.proximoPasso,
  });
};

export const config = { path: "/api/leads" };
