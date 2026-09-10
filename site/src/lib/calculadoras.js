// ---------------------------------------------------------------------------
// CATÁLOGO DAS CALCULADORAS
// Fonte única de verdade: alimenta a grade, as rotas, o painel de admin e o
// sitemap. `liberadaPorPadrao` é só o estado inicial; quem manda é o painel.
// ---------------------------------------------------------------------------

export const DIMENSOES = {
  fluxo: { nome: "Fluxo e liquidez", cor: "d1" },
  investimentos: { nome: "Investimentos", cor: "d2" },
  tributaria: { nome: "Tributária", cor: "d3" },
  protecao: { nome: "Proteção", cor: "d4" },
  empresarial: { nome: "Empresarial", cor: "d5" },
  sucessoria: { nome: "Sucessória", cor: "d6" },
  internacional: { nome: "Internacional", cor: "d7" },
  humana: { nome: "Humana e familiar", cor: "d8" },
};

export const CALCULADORAS = [
  {
    slug: "aposentadoria",
    nome: "Aposentadoria",
    subtitulo: "Acumulação e desacumulação",
    dimensao: "fluxo",
    liberadaPorPadrao: true,
    resumo:
      "Quanto falta para você parar e, do outro lado, quanto dá para sacar por ano sem quebrar o patrimônio.",
    pergunta: "Seu dinheiro dura mais que você?",
    amostra: { rotulo: "Sua renda vitalícia estimada", valor: "R$ 27.400 / mês" },
  },
  {
    slug: "comprar-x-alugar",
    nome: "Comprar x alugar",
    subtitulo: "Imóvel residencial",
    dimensao: "investimentos",
    liberadaPorPadrao: true,
    resumo:
      "Com ITBI, cartório, IPTU, condomínio, manutenção e custo de oportunidade do capital. A conta completa, não a de banco.",
    pergunta: "Comprar é mesmo melhor que alugar?",
    amostra: { rotulo: "Diferença em 10 anos", valor: "R$ 318.700 a favor de alugar" },
  },
  {
    slug: "carro",
    nome: "Carro",
    subtitulo: "Comprar, alugar ou assinar",
    dimensao: "fluxo",
    liberadaPorPadrao: true,
    resumo:
      "Depreciação, IPVA, seguro, manutenção e custo de oportunidade: o custo mensal real de cada caminho.",
    pergunta: "Quanto o seu carro custa de verdade por mês?",
    amostra: { rotulo: "Custo real de possuir", valor: "R$ 4.180 / mês" },
  },
  {
    slug: "inventario",
    nome: "Custo do inventário",
    subtitulo: "ITCMD, custas e honorários",
    dimensao: "sucessoria",
    liberadaPorPadrao: false,
    resumo:
      "Quanto sua família precisaria desembolsar para receber o que já é dela, e em quanto tempo.",
    pergunta: "Quanto custa transferir o que você construiu?",
    amostra: { rotulo: "Custo total do inventário", valor: "R$ 641.500" },
  },
  {
    slug: "liquidez-sucessoria",
    nome: "Liquidez sucessória",
    subtitulo: "O caixa dos primeiros 90 dias",
    dimensao: "protecao",
    liberadaPorPadrao: false,
    resumo:
      "ITCMD, custas, dívidas e doze meses de padrão de vida contra o caixa e os seguros que existem hoje.",
    pergunta: "Sua família paga as contas nos próximos 90 dias sem vender nada às pressas?",
    amostra: { rotulo: "Buraco de liquidez", valor: "R$ 412.000" },
  },
  {
    slug: "pro-labore-x-dividendos",
    nome: "Pró-labore x dividendos",
    subtitulo: "PJ x PF",
    dimensao: "empresarial",
    liberadaPorPadrao: false,
    resumo:
      "Carga tributária comparada entre remunerar-se por pró-labore, por distribuição de lucros ou pelo meio-termo.",
    pergunta: "Você está tirando dinheiro da empresa da forma mais cara?",
    amostra: { rotulo: "Economia anual do mix ótimo", valor: "R$ 96.300" },
  },
  {
    slug: "come-cotas",
    nome: "Come-cotas",
    subtitulo: "Fundo x ETF x carteira direta",
    dimensao: "tributaria",
    liberadaPorPadrao: false,
    resumo:
      "O imposto que você paga a cada seis meses sem ter vendido nada, e o que ele custa em 10 e 20 anos.",
    pergunta: "Quanto o come-cotas tira de você em 20 anos?",
    amostra: { rotulo: "Diferença em 20 anos", valor: "R$ 1.067.300" },
  },
  {
    slug: "estate-tax",
    nome: "Estate tax americano",
    subtitulo: "Exposição de ativos nos EUA",
    dimensao: "internacional",
    liberadaPorPadrao: false,
    resumo:
      "Ativos americanos acima de US$ 60 mil em conta direta expõem a família a imposto de até 40%. Veja o seu.",
    pergunta: "Sua conta lá fora tem uma conta escondida?",
    amostra: { rotulo: "Imposto estimado nos EUA", valor: "US$ 332.800" },
  },
  {
    slug: "reserva-empresario",
    nome: "Reserva do empresário",
    subtitulo: "Vida sem distribuição de lucros",
    dimensao: "fluxo",
    liberadaPorPadrao: false,
    resumo:
      "Se a empresa parasse de distribuir lucros amanhã e permanentemente, por quanto tempo seu padrão de vida se sustenta?",
    pergunta: "Quanto tempo você aguenta sem a empresa?",
    amostra: { rotulo: "Autonomia atual", valor: "7 meses" },
  },
  {
    slug: "pgbl-x-vgbl",
    nome: "PGBL x VGBL",
    subtitulo: "E fundo comum",
    dimensao: "tributaria",
    liberadaPorPadrao: false,
    resumo:
      "O benefício dos 12%, a tabela regressiva e o que sobra líquido em cada veículo no fim do prazo.",
    pergunta: "A previdência que te venderam é a certa para você?",
    amostra: { rotulo: "Vantagem líquida do PGBL", valor: "R$ 214.900" },
  },
  {
    slug: "amortizar-x-investir",
    nome: "Amortizar x investir",
    subtitulo: "SAC e Price",
    dimensao: "investimentos",
    liberadaPorPadrao: false,
    resumo:
      "Sobrou dinheiro: abater o financiamento ou investir? A resposta depende de duas taxas e do imposto.",
    pergunta: "Quitar mais cedo é sempre melhor?",
    amostra: { rotulo: "Ganho em amortizar", valor: "R$ 87.400" },
  },
  {
    slug: "quanto-dolarizar",
    nome: "Quanto dolarizar",
    subtitulo: "Exposição internacional",
    dimensao: "internacional",
    liberadaPorPadrao: false,
    resumo:
      "Parte do seu passivo futuro já é em moeda forte. A conta parte das despesas, não do palpite de câmbio.",
    pergunta: "Sua carteira combina com as suas despesas futuras?",
    amostra: { rotulo: "Exposição sugerida", valor: "34% do patrimônio" },
  },
  {
    slug: "imovel-pf-x-holding",
    nome: "Imóvel: PF x holding",
    subtitulo: "Aluguéis e patrimônio",
    dimensao: "sucessoria",
    liberadaPorPadrao: false,
    resumo:
      "Carga tributária sobre aluguéis em pessoa física contra holding, incluindo custo de constituição e manutenção.",
    pergunta: "Sua holding se paga?",
    amostra: { rotulo: "Economia anual líquida", valor: "R$ 43.200" },
  },
  {
    slug: "caixa-parado",
    nome: "Custo do caixa parado",
    subtitulo: "Conta corrente e poupança",
    dimensao: "fluxo",
    liberadaPorPadrao: false,
    resumo:
      "O que o dinheiro sem função definida deixou de render, e quanto disso é reserva legítima.",
    pergunta: "Quanto custa o seu conforto de deixar parado?",
    amostra: { rotulo: "Custo em 12 meses", valor: "R$ 58.400" },
  },
];

export const porSlug = (slug) => CALCULADORAS.find((c) => c.slug === slug);

export const liberadasPorPadrao = () =>
  CALCULADORAS.filter((c) => c.liberadaPorPadrao).map((c) => c.slug);
