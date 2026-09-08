// ---------------------------------------------------------------------------
// IDENTIDADE E COMPLIANCE
// Este é o único arquivo que você precisa editar para o site sair do ar de
// "modelo" e virar o seu. Tudo marcado com [REVISAR] é obrigatório preencher
// antes de publicar — são exigências de Res. CVM 178/179 e dos códigos ANBIMA.
// ---------------------------------------------------------------------------

export const SITE = {
  url: "https://exemplo.netlify.app", // [REVISAR] domínio final

  // Nome fantasia. A Res. CVM 178 exige a expressão "Assessor de Investimento"
  // ou "AI" na denominação social / nome fantasia e veda expressões que induzam
  // o investidor a erro quanto ao objeto social.
  marca: "[REVISAR: Nome] — Assessor de Investimento",
  marcaCurta: "[REVISAR: Nome]",

  profissional: {
    nome: "[REVISAR: seu nome completo]",
    cargo: "Assessor de Investimento",
    // Liste SOMENTE certificações que você efetivamente detém e que o
    // compliance já validou. Não invente título profissional.
    certificacoes: ["[REVISAR: ex. CEA]", "[REVISAR: ex. CFP]"],
    cidade: "Belo Horizonte, MG",
    foto: "/img/perfil.jpg", // [REVISAR] coloque o arquivo em site/public/img/
    bio: "[REVISAR: 2 a 3 frases. Quem você atende, há quanto tempo, e a decisão que te trouxe até aqui.]",
  },

  // Vínculo institucional — obrigatório estar visível no site.
  instituicao: {
    nome: "[REVISAR: corretora / distribuidora à qual você é vinculado]",
    cnpjEscritorio: "[REVISAR: CNPJ do escritório de assessoria]",
    razaoSocial: "[REVISAR: razão social do escritório]",
    ouvidoria: "[REVISAR: canal de ouvidoria da instituição]",
    enderecoCompliance: "[REVISAR: e-mail do compliance da instituição]",
  },

  contato: {
    email: "[REVISAR: e-mail público]",
    whatsapp: "", // [REVISAR] só dígitos, ex. "5531999999999". Vazio esconde o botão.
    linkedin: "",
    instagram: "",
    // Link de agendamento (Cal.com, Calendly...). Vazio faz o CTA cair no formulário.
    agenda: "",
  },

  // Data da última revisão de conteúdo tributário. Aparece nas calculadoras.
  revisadoEm: "2026-09",
};

export const DISCLAIMER_CURTO =
  "Conteúdo educacional. Não é recomendação de investimento, nem promessa ou " +
  "sugestão de rentabilidade.";

export const DISCLAIMER_CALCULADORA =
  "Simulação ilustrativa construída a partir de premissas informadas por você e " +
  "editáveis nesta tela. Não constitui recomendação de investimento, consultoria, " +
  "análise, planejamento tributário ou parecer jurídico, e não representa promessa " +
  "ou sugestão de rentabilidade. Alíquotas, tabelas e regras mudam — confirme a " +
  "legislação vigente e converse com seu contador e seu advogado antes de decidir. " +
  "Nenhum dado digitado aqui é enviado para servidor: o cálculo roda inteiramente " +
  "no seu navegador.";
