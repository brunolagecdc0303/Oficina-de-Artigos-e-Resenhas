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
  etapa1Titulo: "Descoberta",
  etapa1Texto:
    "Noventa minutos. Eu pergunto e escuto, sobre a família, a empresa e o que te tira o sono. Em 48 horas você recebe por escrito o resumo do que eu entendi.",
  etapa2Titulo: "Coleta e análise",
  etapa2Texto:
    "Você me manda os documentos de uma lista objetiva. Eu mapeio cada frente e consolido tudo em um mapa patrimonial único.",
  etapa3Titulo: "Diagnóstico",
  etapa3Texto:
    "Sessenta minutos. Eu apresento o retrato atual com os riscos priorizados. Você sai sabendo exatamente onde está.",
  etapa4Titulo: "Plano",
  etapa4Texto:
    "Noventa minutos. Recomendações priorizadas e sequenciadas, com responsável e prazo, em uma página. Inclusive o que não vamos fazer, e por quê.",
  etapa5Titulo: "Decisão",
  etapa5Texto:
    "É aqui que você decide. Com o diagnóstico e o plano na mão, eu apresento a proposta: o que eu executo, como funciona o acompanhamento e quanto custa. Fechando, as primeiras ações saem com data na mesma semana.",

  frenteFluxo: "A renda sobe, o padrão sobe junto. Organizar é o que faz gastar certo.",
  frenteInvestimentos: "A famosa carteira colcha de retalhos: vários ativos, nenhum com objetivo definido.",
  frenteTributaria: "Não aproveita as poucas concessões que o governo dá.",
  frenteProtecao: "Quase ninguém pensa nisso. É uma ponta solta barata demais para ficar solta.",
  frenteSucessoria: "Sem organização e sem instrumento formal, vira briga de família.",
  frenteInternacional: "Ou não tem, ou está feito errado: sem estrutura fiscal e sem proteção.",

  perguntaFluxo:
    "Se a distribuição de lucros parasse amanhã e permanentemente, por quanto tempo o seu padrão de vida se sustentaria?",
  perguntaInvestimentos:
    "Pegue os cinco maiores ativos da sua carteira. Você consegue dizer, de cada um, qual objetivo ele serve e em que prazo?",
  perguntaTributaria:
    "Quanto você pagou de imposto sobre investimentos no último ano, e quanto disso seria evitável com o mesmo ativo em outro veículo?",
  perguntaProtecao:
    "Se você não estivesse aqui amanhã, sua família teria dinheiro em conta para os próximos doze meses sem precisar vender nada?",
  perguntaSucessoria:
    "De onde sairia o dinheiro do ITCMD? Ele vence antes de a família ter acesso ao patrimônio que está sendo inventariado.",
  perguntaInternacional:
    "Seus ativos nos Estados Unidos estão em conta direta? Acima de US$ 60 mil, isso expõe a família a imposto americano que chega a 40%.",

  fotoUrl: "/img/bruno-lage.jpg",
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
      "Funciona melhor com foto em pé. Use o caminho de um arquivo em site/public/img (exemplo: /img/bruno-lage.jpg) ou o endereço de uma imagem pública. Link do Google Drive não funciona: o Drive devolve uma página, não a imagem. Deixe em branco para não mostrar foto nenhuma.",
  },
  { chave: "fotoLegenda", rotulo: "Legenda abaixo da foto", linhas: 2 },

  { grupo: "Bloco das frentes" },
  { chave: "custoTitulo", rotulo: "Título", linhas: 1 },
  { chave: "custoParagrafo", rotulo: "Parágrafo", linhas: 4 },

  { grupo: "Bloco do método" },
  { chave: "metodoTitulo", rotulo: "Título", linhas: 1 },
  { chave: "metodoParagrafo", rotulo: "Parágrafo de abertura", linhas: 4 },
  { chave: "metodoFecho", rotulo: "Parágrafo de fechamento", linhas: 4 },

  { grupo: "As cinco etapas do método" },
  { chave: "etapa1Titulo", rotulo: "1. Título", linhas: 1 },
  { chave: "etapa1Texto", rotulo: "1. Descrição", linhas: 4 },
  { chave: "etapa2Titulo", rotulo: "2. Título", linhas: 1 },
  { chave: "etapa2Texto", rotulo: "2. Descrição", linhas: 4 },
  { chave: "etapa3Titulo", rotulo: "3. Título", linhas: 1 },
  { chave: "etapa3Texto", rotulo: "3. Descrição", linhas: 4 },
  { chave: "etapa4Titulo", rotulo: "4. Título", linhas: 1 },
  { chave: "etapa4Texto", rotulo: "4. Descrição", linhas: 4 },
  { chave: "etapa5Titulo", rotulo: "5. Título", linhas: 1 },
  { chave: "etapa5Texto", rotulo: "5. Descrição", linhas: 4 },

  {
    grupo: "As seis frentes",
    nota: "Aparecem duas vezes: nos cartões do meio da página e nas caixas de seleção do formulário.",
  },
  { chave: "frenteFluxo", rotulo: "Fluxo e liquidez", linhas: 3 },
  { chave: "frenteInvestimentos", rotulo: "Investimentos", linhas: 3 },
  { chave: "frenteTributaria", rotulo: "Tributária", linhas: 3 },
  { chave: "frenteProtecao", rotulo: "Proteção", linhas: 3 },
  { chave: "frenteSucessoria", rotulo: "Sucessória", linhas: 3 },
  { chave: "frenteInternacional", rotulo: "Internacional", linhas: 3 },

  {
    grupo: "Perguntas devolvidas depois do envio",
    nota: "Cada pessoa vê apenas as perguntas das frentes que marcou.",
  },
  { chave: "perguntaFluxo", rotulo: "Fluxo e liquidez", linhas: 3 },
  { chave: "perguntaInvestimentos", rotulo: "Investimentos", linhas: 3 },
  { chave: "perguntaTributaria", rotulo: "Tributária", linhas: 3 },
  { chave: "perguntaProtecao", rotulo: "Proteção", linhas: 3 },
  { chave: "perguntaSucessoria", rotulo: "Sucessória", linhas: 3 },
  { chave: "perguntaInternacional", rotulo: "Internacional", linhas: 3 },

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
