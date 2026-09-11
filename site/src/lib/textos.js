// ---------------------------------------------------------------------------
// TEXTOS EDITÁVEIS DA LANDING
// Os valores aqui são o padrão de fábrica. O que o painel /admin salva tem
// prioridade sobre eles e passa a valer na hora, sem novo deploy.
// Para voltar ao padrão, basta limpar o campo no painel.
// ---------------------------------------------------------------------------

export const TEXTOS_PADRAO = {
  heroOlho: "Diagnóstico patrimonial",
  heroTitulo: "O que você construiu está organizado, ou só acumulado?",
  heroParagrafo1:
    "Quase todo mundo com patrimônio relevante sabe quanto tem. Bem menos gente sabe se cada parte está no lugar certo: o veículo certo para o prazo real, a estrutura certa para o tamanho que o patrimônio já tem, o imposto que está sendo pago sem precisar.",
  heroParagrafo2:
    "Não é descuido. É que patrimônio cresce mais rápido do que a organização em volta dele.",
  heroBotao: "Fazer o diagnóstico",
  heroNota: "Leva três minutos.",
  descricaoPagina:
    "Antes de falar de produto, entender onde o seu patrimônio está hoje. Sete perguntas, três minutos.",
  custoTitulo: "O que costuma estar caro sem aparecer",
  custoParagrafo:
    "Investimento é só uma das frentes de um patrimônio, e raramente é a que mais custa. As outras não aparecem em extrato, não têm rentabilidade mensal e ninguém liga para te avisar sobre elas.",
  metodoTitulo: "Diagnóstico primeiro",
  metodoParagrafo:
    "Quase todo mundo no mercado inverte essa ordem: chega com a solução antes de você ter entendido o problema. Eu separo as duas coisas de propósito, e essa é a decisão de método que mais muda o resultado.",
  metodoFecho:
    "É esse o trabalho, e é assim que ele começa. Do primeiro encontro ao plano na sua mão costumam ser uma a duas semanas. A proposta só aparece na quinta etapa, depois de eu conhecer o seu caso.",
  formTitulo: "Sete perguntas antes da conversa",
  formLead:
    "Servem para eu chegar na nossa conversa já preparado, com hipótese em vez de pergunta genérica.",
  formRodape: "Respondo pessoalmente em até dois dias úteis. Sem robôs por aqui.",
  fotoUrl: "",
  fotoLegenda: "Quem lê e responde o seu formulário.",
};

/**
 * Descrição de cada campo para o painel. `linhas` define a altura da caixa:
 * 1 vira campo simples, mais que isso vira área de texto.
 */
export const CAMPOS_TEXTO = [
  { grupo: "Abertura" },
  { chave: "heroOlho", rotulo: "Etiqueta acima do título", linhas: 1 },
  { chave: "heroTitulo", rotulo: "Título principal", linhas: 2 },
  { chave: "heroParagrafo1", rotulo: "Primeiro parágrafo", linhas: 4 },
  { chave: "heroParagrafo2", rotulo: "Segundo parágrafo", linhas: 3 },
  { chave: "heroBotao", rotulo: "Texto do botão", linhas: 1 },
  { chave: "heroNota", rotulo: "Nota ao lado do botão", linhas: 1 },

  { grupo: "Sua foto" },
  {
    chave: "fotoUrl",
    rotulo: "Endereço da foto",
    linhas: 1,
    ajuda:
      "Cole o endereço de uma imagem pública, ou o caminho de um arquivo que esteja em site/public/img (exemplo: /img/bruno.jpg). Deixe em branco para não mostrar foto nenhuma.",
  },
  { chave: "fotoLegenda", rotulo: "Legenda abaixo da foto", linhas: 2 },

  { grupo: "Bloco das frentes" },
  { chave: "custoTitulo", rotulo: "Título", linhas: 1 },
  { chave: "custoParagrafo", rotulo: "Parágrafo", linhas: 4 },

  { grupo: "Bloco do método" },
  { chave: "metodoTitulo", rotulo: "Título", linhas: 1 },
  { chave: "metodoParagrafo", rotulo: "Parágrafo de abertura", linhas: 4 },
  { chave: "metodoFecho", rotulo: "Parágrafo de fechamento", linhas: 4 },

  { grupo: "Formulário" },
  { chave: "formTitulo", rotulo: "Título", linhas: 1 },
  { chave: "formLead", rotulo: "Parágrafo de apoio", linhas: 3 },
  { chave: "formRodape", rotulo: "Nota abaixo do botão Enviar", linhas: 2 },

  { grupo: "Busca e redes sociais" },
  {
    chave: "descricaoPagina",
    rotulo: "Descrição da página",
    linhas: 3,
    ajuda: "É o trecho que aparece no Google e ao compartilhar o link.",
  },
];

/** Mistura os textos salvos sobre os padrões, ignorando campos vazios. */
export function mesclarTextos(salvos) {
  const saida = { ...TEXTOS_PADRAO };
  if (!salvos || typeof salvos !== "object") return saida;
  for (const [chave, valor] of Object.entries(salvos)) {
    if (chave in TEXTOS_PADRAO && typeof valor === "string" && valor.trim()) {
      saida[chave] = valor.trim();
    }
  }
  return saida;
}
