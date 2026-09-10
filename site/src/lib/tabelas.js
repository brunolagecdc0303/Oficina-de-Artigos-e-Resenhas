// ---------------------------------------------------------------------------
// TABELAS FISCAIS DE REFERÊNCIA
// Tudo aqui muda por lei. Cada bloco declara a própria vigência, que aparece
// na tela da calculadora. Atualize este arquivo (e só ele) quando a regra virar.
// Toda alíquota aqui é apenas o VALOR PADRÃO de um campo que o usuário edita.
// ---------------------------------------------------------------------------

export const VIGENCIA = {
  irpf: "tabela de referência, confira a vigente antes de decidir",
  itcmd: "alíquotas de referência por estado, ITCMD é lei estadual e muda",
  estateTax: "regra federal dos EUA para não residentes (non-resident alien)",
};

/** IRPF, tabela progressiva mensal. Faixas em R$, dedução em R$. */
export const IRPF_MENSAL = [
  { ate: 2259.2, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: Infinity, aliquota: 0.275, deducao: 896.0 },
];

/** INSS sobre pró-labore: 11% limitado ao teto do salário de contribuição. */
export const INSS = {
  aliquotaProLabore: 0.11,
  teto: 8157.41, // [REVISAR anualmente] teto do salário de contribuição
};

/**
 * Tributação de dividendos distribuídos a pessoa física.
 * A regra mudou com a reforma da tributação da renda, os valores abaixo são
 * PADRÕES EDITÁVEIS na tela, não afirmação sobre a legislação vigente.
 */
export const DIVIDENDOS = {
  aliquotaPadrao: 0.1,
  isencaoMensal: 50000,
  nota:
    "A tributação de dividendos mudou recentemente. Os valores vêm preenchidos " +
    "como referência e são editáveis, confirme a regra vigente com seu contador.",
};

/** Carga tributária típica da PJ, como percentual do faturamento. Editável. */
export const PJ_PRESUMIDO = {
  presuncaoServicos: 0.32,
  irpj: 0.15,
  adicionalIrpj: 0.1, // sobre o que exceder R$ 20 mil/mês de lucro presumido
  limiteAdicionalMensal: 20000,
  csll: 0.09,
  presuncaoCsll: 0.32,
  pis: 0.0065,
  cofins: 0.03,
  issPadrao: 0.05, // varia por município
};

/**
 * ITCMD, alíquotas de referência por estado.
 * A EC 132/2023 tornou a progressividade obrigatória, e vários estados estão
 * revendo as próprias leis. Use como ponto de partida; o campo é editável.
 */
export const ITCMD_ESTADOS = [
  { uf: "AC", nome: "Acre", aliquota: 0.04 },
  { uf: "AL", nome: "Alagoas", aliquota: 0.04 },
  { uf: "AM", nome: "Amazonas", aliquota: 0.02 },
  { uf: "AP", nome: "Amapá", aliquota: 0.04 },
  { uf: "BA", nome: "Bahia", aliquota: 0.08 },
  { uf: "CE", nome: "Ceará", aliquota: 0.08 },
  { uf: "DF", nome: "Distrito Federal", aliquota: 0.06 },
  { uf: "ES", nome: "Espírito Santo", aliquota: 0.04 },
  { uf: "GO", nome: "Goiás", aliquota: 0.08 },
  { uf: "MA", nome: "Maranhão", aliquota: 0.07 },
  { uf: "MG", nome: "Minas Gerais", aliquota: 0.05 },
  { uf: "MS", nome: "Mato Grosso do Sul", aliquota: 0.06 },
  { uf: "MT", nome: "Mato Grosso", aliquota: 0.08 },
  { uf: "PA", nome: "Pará", aliquota: 0.06 },
  { uf: "PB", nome: "Paraíba", aliquota: 0.08 },
  { uf: "PE", nome: "Pernambuco", aliquota: 0.08 },
  { uf: "PI", nome: "Piauí", aliquota: 0.06 },
  { uf: "PR", nome: "Paraná", aliquota: 0.04 },
  { uf: "RJ", nome: "Rio de Janeiro", aliquota: 0.08 },
  { uf: "RN", nome: "Rio Grande do Norte", aliquota: 0.06 },
  { uf: "RO", nome: "Rondônia", aliquota: 0.04 },
  { uf: "RR", nome: "Roraima", aliquota: 0.04 },
  { uf: "RS", nome: "Rio Grande do Sul", aliquota: 0.06 },
  { uf: "SC", nome: "Santa Catarina", aliquota: 0.08 },
  { uf: "SE", nome: "Sergipe", aliquota: 0.08 },
  { uf: "SP", nome: "São Paulo", aliquota: 0.04 },
  { uf: "TO", nome: "Tocantins", aliquota: 0.08 },
];

/** Custos de inventário além do ITCMD, como % do espólio. Padrões editáveis. */
export const CUSTOS_INVENTARIO = {
  honorariosAdvocaticios: 0.06, // costuma variar de 4% a 10%
  custasCartorarias: 0.015,
  mesesJudicial: 30,
  mesesExtrajudicial: 4,
};

/**
 * Estate tax americano, tabela unificada do IRC §2001(c).
 * Não residentes têm isenção de US$ 60 mil (crédito unificado de US$ 13.000).
 * O Brasil não tem tratado com os EUA para evitar bitributação sobre herança.
 */
export const ESTATE_TAX_EUA = {
  isencaoNaoResidente: 60000,
  creditoUnificado: 13000,
  faixas: [
    { ate: 10000, aliquota: 0.18 },
    { ate: 20000, aliquota: 0.2 },
    { ate: 40000, aliquota: 0.22 },
    { ate: 60000, aliquota: 0.24 },
    { ate: 80000, aliquota: 0.26 },
    { ate: 100000, aliquota: 0.28 },
    { ate: 150000, aliquota: 0.3 },
    { ate: 250000, aliquota: 0.32 },
    { ate: 500000, aliquota: 0.34 },
    { ate: 750000, aliquota: 0.37 },
    { ate: 1000000, aliquota: 0.39 },
    { ate: Infinity, aliquota: 0.4 },
  ],
};
