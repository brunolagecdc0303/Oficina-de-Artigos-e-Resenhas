// ---------------------------------------------------------------------------
// Motor financeiro compartilhado por todas as calculadoras.
// Funções puras, sem DOM, sem dependência externa, testadas em test/.
// Convenção: taxas sempre em decimal (0.12 = 12%), nunca em pontos percentuais.
// ---------------------------------------------------------------------------

export const anualParaMensal = (ia) => Math.pow(1 + ia, 1 / 12) - 1;
export const mensalParaAnual = (im) => Math.pow(1 + im, 12) - 1;

/** Taxa real de Fisher: desconta a inflação da taxa nominal. */
export const taxaReal = (nominal, inflacao) => (1 + nominal) / (1 + inflacao) - 1;

/**
 * Valor futuro de um principal com aportes periódicos ao fim de cada período.
 * @param {number} vp principal inicial
 * @param {number} i taxa por período
 * @param {number} n número de períodos
 * @param {number} pmt aporte por período
 */
export function valorFuturo(vp, i, n, pmt = 0) {
  if (n <= 0) return vp;
  if (Math.abs(i) < 1e-12) return vp + pmt * n;
  const f = Math.pow(1 + i, n);
  return vp * f + pmt * ((f - 1) / i);
}

/** Valor presente de um valor futuro. */
export function valorPresente(vf, i, n) {
  if (Math.abs(i) < 1e-12) return vf;
  return vf / Math.pow(1 + i, n);
}

/** Aporte periódico necessário para sair de `vp` e chegar em `meta` em n períodos. */
export function aporteNecessario(vp, meta, i, n) {
  if (n <= 0) return 0;
  if (Math.abs(i) < 1e-12) return (meta - vp) / n;
  const f = Math.pow(1 + i, n);
  return (meta - vp * f) * (i / (f - 1));
}

/**
 * Retirada periódica que esgota exatamente o principal em n períodos
 * (anuidade postecipada). É a conta da fase de desacumulação.
 */
export function retiradaSustentavel(principal, i, n) {
  if (n <= 0) return 0;
  if (Math.abs(i) < 1e-12) return principal / n;
  const f = Math.pow(1 + i, n);
  return (principal * i * f) / (f - 1);
}

/** Retirada perpétua: nunca toca no principal em termos reais. */
export const retiradaPerpetua = (principal, iReal) => principal * iReal;

/**
 * Quantos períodos o dinheiro dura sacando `pmt` por período.
 * Devolve Infinity quando os rendimentos cobrem a retirada.
 */
export function periodosAteEsgotar(principal, pmt, i) {
  if (pmt <= 0) return Infinity;
  if (principal <= 0) return 0;
  if (Math.abs(i) < 1e-12) return principal / pmt;
  if (pmt <= principal * i) return Infinity;
  return Math.log(pmt / (pmt - principal * i)) / Math.log(1 + i);
}

// --------------------------- Financiamento ---------------------------------

/** Parcela fixa do sistema Price. */
export function parcelaPrice(principal, i, n) {
  if (n <= 0) return 0;
  if (Math.abs(i) < 1e-12) return principal / n;
  const f = Math.pow(1 + i, n);
  return (principal * i * f) / (f - 1);
}

/**
 * Tabela de amortização.
 * @param {"price"|"sac"} sistema
 * @returns {{parcelas: Array<{n:number,juros:number,amortizacao:number,parcela:number,saldo:number}>, totalJuros:number, totalPago:number}}
 */
export function tabelaAmortizacao(principal, i, n, sistema = "price") {
  const parcelas = [];
  let saldo = principal;
  let totalJuros = 0;
  let totalPago = 0;
  const amortSac = principal / n;
  const pmtPrice = parcelaPrice(principal, i, n);

  for (let k = 1; k <= n; k++) {
    const juros = saldo * i;
    const amortizacao = sistema === "sac" ? amortSac : pmtPrice - juros;
    const parcela = juros + amortizacao;
    saldo = Math.max(0, saldo - amortizacao);
    totalJuros += juros;
    totalPago += parcela;
    parcelas.push({ n: k, juros, amortizacao, parcela, saldo });
  }
  return { parcelas, totalJuros, totalPago };
}

// ------------------------- Imposto de renda --------------------------------

/** Tabela regressiva de renda fixa e fundos (Lei 11.033/2004), por prazo em dias. */
export function irRegressivoRendaFixa(dias) {
  if (dias <= 180) return 0.225;
  if (dias <= 360) return 0.2;
  if (dias <= 720) return 0.175;
  return 0.15;
}

/** Tabela regressiva da previdência complementar (Lei 11.053/2004), por anos. */
export function irRegressivoPrevidencia(anos) {
  if (anos < 2) return 0.35;
  if (anos < 4) return 0.3;
  if (anos < 6) return 0.25;
  if (anos < 8) return 0.2;
  if (anos < 10) return 0.15;
  return 0.1;
}

/**
 * IRPF sobre base mensal a partir de uma tabela progressiva
 * {ate, aliquota, deducao}. A tabela vive em tabelas.js para ser atualizada
 * sem mexer no motor.
 */
export function irpfMensal(base, tabela) {
  const faixa = tabela.find((f) => base <= f.ate) ?? tabela[tabela.length - 1];
  return Math.max(0, base * faixa.aliquota - faixa.deducao);
}

/**
 * Imposto progressivo genérico por faixas marginais.
 * @param {number} base
 * @param {Array<{ate:number, aliquota:number}>} faixas ordenadas, última com ate: Infinity
 */
export function impostoProgressivo(base, faixas) {
  let restante = base;
  let piso = 0;
  let total = 0;
  for (const faixa of faixas) {
    if (restante <= 0) break;
    const teto = faixa.ate === Infinity ? Infinity : faixa.ate;
    const tributavel = Math.min(restante, teto - piso);
    total += tributavel * faixa.aliquota;
    restante -= tributavel;
    piso = teto;
  }
  return total;
}

// ----------------------------- Come-cotas ----------------------------------

/**
 * Simula um fundo aberto sujeito a come-cotas (maio e novembro) contra um
 * veículo sem come-cotas (ETF ou carteira direta), tributado só no resgate.
 *
 * @param {object} p
 * @param {number} p.principal
 * @param {number} p.taxaAnual retorno bruto anual
 * @param {number} p.anos
 * @param {number} p.aliquotaComeCotas 0.15 longo prazo, 0.20 curto prazo
 * @param {number} p.taxaAdmFundo taxa de administração anual do fundo
 * @param {number} p.taxaAdmAlternativa taxa anual do ETF/carteira
 * @returns {{comComeCotas:number, semComeCotas:number, diferenca:number,
 *            impostoAntecipado:number, impostoFinalFundo:number, impostoAlternativa:number}}
 */
export function simularComeCotas({
  principal,
  taxaAnual,
  anos,
  aliquotaComeCotas = 0.15,
  taxaAdmFundo = 0,
  taxaAdmAlternativa = 0,
}) {
  const semestres = Math.round(anos * 2);
  const liquidaFundo = (1 + taxaAnual) / (1 + taxaAdmFundo) - 1;
  const liquidaAlt = (1 + taxaAnual) / (1 + taxaAdmAlternativa) - 1;
  const fatorSemestreFundo = Math.pow(1 + liquidaFundo, 0.5);

  // Fundo: a cada semestre o IR incide sobre o rendimento do período.
  let saldo = principal;
  let custo = principal; // base de custo já tributada
  let impostoAntecipado = 0;
  for (let s = 0; s < semestres; s++) {
    saldo *= fatorSemestreFundo;
    const rendimento = saldo - custo;
    if (rendimento > 0) {
      const imposto = rendimento * aliquotaComeCotas;
      impostoAntecipado += imposto;
      saldo -= imposto;
      custo = saldo;
    }
  }
  // No resgate, complementa da alíquota de come-cotas até a regressiva do prazo.
  const aliquotaFinal = irRegressivoRendaFixa(anos * 365);
  const complemento = Math.max(0, aliquotaFinal - aliquotaComeCotas);
  const impostoFinalFundo = Math.max(0, saldo - custo) * complemento;
  const comComeCotas = saldo - impostoFinalFundo;

  // Alternativa: tributa só no fim, sobre todo o ganho.
  const brutoAlt = principal * Math.pow(1 + liquidaAlt, anos);
  const impostoAlternativa = Math.max(0, brutoAlt - principal) * aliquotaFinal;
  const semComeCotas = brutoAlt - impostoAlternativa;

  return {
    comComeCotas,
    semComeCotas,
    diferenca: semComeCotas - comComeCotas,
    impostoAntecipado,
    impostoFinalFundo,
    impostoAlternativa,
  };
}

// ----------------------------- Formatação ----------------------------------

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const brlCentavos = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const usd = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const moeda = (v) => (Number.isFinite(v) ? brl.format(v) : "—");
export const moedaExata = (v) => (Number.isFinite(v) ? brlCentavos.format(v) : "—");
export const dolar = (v) => (Number.isFinite(v) ? usd.format(v) : "—");
export const percentual = (v, casas = 1) =>
  Number.isFinite(v) ? `${(v * 100).toFixed(casas).replace(".", ",")}%` : "—";

export function anosEMeses(totalMeses) {
  if (!Number.isFinite(totalMeses)) return "para sempre";
  const meses = Math.max(0, Math.round(totalMeses));
  const a = Math.floor(meses / 12);
  const m = meses % 12;
  if (a === 0) return `${m} ${m === 1 ? "mês" : "meses"}`;
  if (m === 0) return `${a} ${a === 1 ? "ano" : "anos"}`;
  return `${a} ${a === 1 ? "ano" : "anos"} e ${m} ${m === 1 ? "mês" : "meses"}`;
}
