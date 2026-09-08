// Utilidades de tela compartilhadas pelas calculadoras.

export const $ = (sel, raiz = document) => raiz.querySelector(sel);
export const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

/** Lê um input numérico, aceitando vírgula decimal e separador de milhar. */
export function num(id, padrao = 0) {
  const el = document.getElementById(id);
  if (!el) return padrao;
  const bruto = String(el.value ?? "").replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  const v = Number.parseFloat(bruto);
  return Number.isFinite(v) ? v : padrao;
}

/** Lê um campo em % e devolve decimal: "12,5" vira 0,125. */
export const pct = (id, padrao = 0) => num(id, padrao * 100) / 100;

export const txt = (id) => document.getElementById(id)?.value?.trim() ?? "";
export const marcado = (id) => Boolean(document.getElementById(id)?.checked);
export const escolhido = (nome) =>
  document.querySelector(`input[name="${nome}"]:checked`)?.value ?? null;

export function definir(id, valor) {
  const el = document.getElementById(id);
  if (el) el.textContent = valor;
}

export function definirHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/** Renderiza uma lista de linhas rótulo/valor dentro de um <dl>. */
export function linhas(id, itens) {
  definirHtml(
    id,
    itens
      .filter(Boolean)
      .map(
        (l) =>
          `<div class="linha ${l.destaque ? "linha-destaque" : ""} ${l.total ? "linha-total" : ""}">` +
          `<dt>${l.rotulo}</dt><dd>${l.valor}</dd></div>`
      )
      .join("")
  );
}

/** Barras comparativas. `itens`: {rotulo, valor, texto, tom}. */
export function barras(id, itens) {
  const maximo = Math.max(...itens.map((i) => Math.abs(i.valor)), 1);
  definirHtml(
    id,
    itens
      .map(
        (i) =>
          `<div class="barra-item" data-tom="${i.tom ?? ""}">` +
          `<div class="barra-topo"><span>${i.rotulo}</span><span class="num">${i.texto}</span></div>` +
          `<div class="barra-trilho"><div class="barra-preench" style="width:${(Math.abs(i.valor) / maximo) * 100}%"></div></div>` +
          `</div>`
      )
      .join("")
  );
}

/**
 * Gráfico de linha em SVG, sem biblioteca. Recebe séries de números anuais.
 * @param {string} id
 * @param {Array<{nome:string, cor:string, pontos:number[]}>} series
 * @param {(v:number)=>string} formata
 */
export function grafico(id, series, formata) {
  const el = document.getElementById(id);
  if (!el) return;
  const L = 560, A = 220, m = { t: 12, d: 8, b: 26, e: 8 };
  const n = Math.max(...series.map((s) => s.pontos.length));
  const max = Math.max(...series.flatMap((s) => s.pontos), 1);
  const x = (i) => m.e + (i / Math.max(1, n - 1)) * (L - m.e - m.d);
  const y = (v) => A - m.b - (v / max) * (A - m.t - m.b);

  const grades = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => `<line class="grade-y" x1="${m.e}" y1="${y(max * f)}" x2="${L - m.d}" y2="${y(max * f)}"/>`)
    .join("");

  const linhasSvg = series
    .map((s) => {
      const d = s.pontos.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
      return `<path d="${d}" fill="none" stroke="${s.cor}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>`;
    })
    .join("");

  const legenda = series
    .map(
      (s, i) =>
        `<g transform="translate(${m.e + i * 150}, ${A - 6})">` +
        `<rect width="9" height="3" y="-4" rx="1.5" fill="${s.cor}"/>` +
        `<text class="rotulo-eixo" x="14" y="0">${s.nome}</text></g>`
    )
    .join("");

  el.innerHTML =
    `<svg class="grafico" viewBox="0 0 ${L} ${A}" role="img" aria-label="Evolução ao longo do tempo">` +
    grades +
    `<text class="rotulo-eixo" x="${m.e}" y="${y(max) - 3}">${formata(max)}</text>` +
    linhasSvg +
    legenda +
    `</svg>`;
}

/** Liga todos os campos de um formulário à função de recálculo. */
export function ligar(formId, recalcular) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("input", recalcular);
  form.addEventListener("change", recalcular);
  form.addEventListener("submit", (e) => e.preventDefault());
  recalcular();
}

/** Mostra/esconde blocos por atributo data-quando="valor". */
export function alternar(nome, raiz = document) {
  const valor = escolhido(nome);
  $$(`[data-quando]`, raiz).forEach((el) => {
    if (el.dataset.grupo && el.dataset.grupo !== nome) return;
    el.classList.toggle("oculto", el.dataset.quando !== valor);
  });
}
