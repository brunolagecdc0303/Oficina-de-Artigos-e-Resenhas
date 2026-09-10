// ---------------------------------------------------------------------------
// IDENTIDADE E COMPLIANCE
// Este é o único arquivo que você precisa editar para mudar quem o site diz
// que você é. O que ainda está marcado com [REVISAR] é o que falta preencher.
// ---------------------------------------------------------------------------

export const SITE = {
  // Troque para "https://lageinvestimentos.com.br" SOMENTE depois que o domínio
  // estiver respondendo na Netlify. Antes disso, canônicas, sitemap e RSS
  // apontariam para um endereço que ainda não existe.
  url: "https://assessoria-patrimonial-site.netlify.app",

  // Res. CVM 178: a expressão "Assessor de Investimento" acompanha o nome.
  marca: "Bruno Lage, Assessor de Investimento",
  marcaCurta: "Bruno Lage",

  profissional: {
    nome: "Bruno Lage",
    cargo: "Assessor de Investimento",
    // Somente o que é efetivamente detido e validado pelo compliance.
    certificacoes: ["Certificação ANCORD"],
    cidade: "Belo Horizonte, MG",
    bio:
      "Sete anos de mercado e mais de 500 famílias atendidas depois, o padrão se " +
      "repete em quase todas: o faturamento cresce e a estrutura não acompanha. " +
      "Meu trabalho é transformar faturamento em patrimônio organizado e global, " +
      "com estrutura tributária, sucessória e internacional do tamanho que o " +
      "dinheiro já tem. O que o cliente sente não aparece no extrato do mês " +
      "seguinte: é a lista de coisas que param de tirar o sono dele.",
  },

  // Vínculo institucional. Dados do rodapé oficial da InvestSmart.
  instituicao: {
    razaoSocial: "Invest Smart Assessor de Investimento Ltda.",
    cnpjEscritorio: "19.438.577/0001-08",
    nome: "XP Investimentos Corretora de Câmbio, Títulos e Valores Mobiliários S.A.",
    nomeCurto: "XP",
    ouvidoria: "Ouvidoria da XP, 0800 722 3730",
  },

  contato: {
    email: "bruno.lage@investsmart.com.br",
    linkedin: "",
    instagram: "",
    // Link de agendamento (Cal.com, Calendly...). Vazio faz o lead prioritário
    // receber o convite para responder por e-mail, e você agenda no um-a-um.
    agenda: "",
  },

  revisadoEm: "2026-09",

  // ---------------------------------------------------------------------
  // VISIBILIDADE NOS BUSCADORES
  // false = o site funciona normalmente para quem tem o link, mas pede aos
  //         buscadores que não o indexem. É o estado certo enquanto o site
  //         está em revisão pelo compliance.
  // true  = libera a indexação. VIRE PARA true no dia do lançamento de
  //         verdade, senão o site nunca aparece na busca do Google.
  // ---------------------------------------------------------------------
  indexavel: false,

  // Descrição padrão do site: aparece na busca do Google e ao compartilhar link.
  descricao:
    "Transformo faturamento em patrimônio organizado e global. Diagnóstico " +
    "patrimonial em oito dimensões, plano de uma página e transparência sobre " +
    "como sou remunerado.",
};

/**
 * Texto regulatório institucional, reproduzido do rodapé oficial da
 * InvestSmart. Qualquer alteração aqui precisa passar pelo compliance do
 * escritório. Não reescreva por conta própria.
 */
export const DISCLAIMER_INSTITUCIONAL =
  `A ${SITE.instituicao.razaoSocial}, inscrita sob o CNPJ nº ${SITE.instituicao.cnpjEscritorio}, ` +
  `é uma empresa de Assessoria de Investimento devidamente registrada na Comissão de Valores ` +
  `Mobiliários na forma da Resolução CVM 178/23 ("Sociedade"), que mantém contrato de distribuição ` +
  `de produtos financeiros com a ${SITE.instituicao.nome} ("XP") e pode, por conta e ordem dos seus ` +
  `clientes, operar no mercado de capitais segundo a legislação vigente. Na forma da legislação da ` +
  `CVM, o Assessor de Investimento não pode administrar ou gerir o patrimônio de investidores. ` +
  `O investimento em ações é um investimento de risco e rentabilidade passada não é garantia de ` +
  `rentabilidade futura. Na realização de operações com derivativos existe a possibilidade de perdas ` +
  `superiores aos valores investidos, podendo resultar em significativas perdas patrimoniais. ` +
  `A Sociedade poderá exercer atividades complementares relacionadas aos mercados financeiro, ` +
  `securitário, de previdência e capitalização, desde que não conflitem com a atividade de assessoria ` +
  `de investimentos, podendo ser realizada por meio da pessoa jurídica acima descrita ou por meio de ` +
  `pessoa jurídica terceira. Todas as atividades são prestadas mantendo a devida segregação e em ` +
  `cumprimento ao quanto previsto nas regras da CVM ou de outros órgãos reguladores e ` +
  `autorreguladores. Para informações e dúvidas sobre produtos, contate seu assessor de ` +
  `investimentos. Para reclamações, contate a ${SITE.instituicao.ouvidoria}.`;

export const DISCLAIMER_CURTO =
  "Conteúdo educacional. Não é recomendação de investimento, nem promessa ou " +
  "sugestão de rentabilidade.";

export const DISCLAIMER_CALCULADORA =
  "Simulação ilustrativa construída a partir de premissas informadas por você e " +
  "editáveis nesta tela. Não constitui recomendação de investimento, consultoria, " +
  "análise, planejamento tributário ou parecer jurídico, e não representa promessa " +
  "ou sugestão de rentabilidade. Alíquotas, tabelas e regras mudam, então confirme a " +
  "legislação vigente e converse com seu contador e seu advogado antes de decidir. " +
  "Nenhum dado digitado aqui é enviado para servidor: o cálculo roda inteiramente " +
  "no seu navegador.";
