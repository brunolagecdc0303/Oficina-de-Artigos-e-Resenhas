import { test } from "node:test";
import assert from "node:assert/strict";
import * as f from "../src/lib/financas.js";
import { ESTATE_TAX_EUA } from "../src/lib/tabelas.js";

const perto = (a, b, tol = 0.01) =>
  assert.ok(Math.abs(a - b) < tol, `esperava ~${b}, veio ${a}`);

test("conversão de taxas ida e volta", () => {
  perto(f.mensalParaAnual(f.anualParaMensal(0.12)), 0.12, 1e-12);
  perto(f.anualParaMensal(0.126825), 0.01, 1e-6);
});

test("taxa real de Fisher", () => {
  perto(f.taxaReal(0.1, 0.04), 0.0576923, 1e-6);
});

test("valor futuro com e sem aporte", () => {
  perto(f.valorFuturo(1000, 0.01, 12), 1126.825, 0.01);
  perto(f.valorFuturo(0, 0.01, 12, 100), 1268.25, 0.01);
  perto(f.valorFuturo(1000, 0, 12, 100), 2200, 1e-9);
});

test("aporte necessário fecha a meta", () => {
  const pmt = f.aporteNecessario(50000, 1000000, 0.006, 240);
  perto(f.valorFuturo(50000, 0.006, 240, pmt), 1000000, 0.5);
});

test("retirada sustentável esgota o principal no prazo", () => {
  const saque = f.retiradaSustentavel(1000000, 0.004, 360);
  let saldo = 1000000;
  for (let i = 0; i < 360; i++) saldo = saldo * 1.004 - saque;
  perto(saldo, 0, 0.5);
});

test("períodos até esgotar é infinito quando o juro cobre a retirada", () => {
  assert.equal(f.periodosAteEsgotar(1000000, 4000, 0.004), Infinity);
  assert.ok(f.periodosAteEsgotar(1000000, 8000, 0.004) > 0);
});

test("Price: soma das amortizações devolve o principal e parcela é constante", () => {
  const { parcelas, totalPago } = f.tabelaAmortizacao(300000, 0.008, 240, "price");
  perto(parcelas.reduce((s, p) => s + p.amortizacao, 0), 300000, 0.01);
  perto(parcelas[0].parcela, parcelas[239].parcela, 0.01);
  perto(parcelas[239].saldo, 0, 0.01);
  assert.ok(totalPago > 300000);
});

test("SAC: amortização constante e juros menores que o Price", () => {
  const sac = f.tabelaAmortizacao(300000, 0.008, 240, "sac");
  const price = f.tabelaAmortizacao(300000, 0.008, 240, "price");
  perto(sac.parcelas[0].amortizacao, sac.parcelas[100].amortizacao, 1e-6);
  assert.ok(sac.totalJuros < price.totalJuros);
  perto(sac.parcelas[239].saldo, 0, 0.01);
});

test("tabela regressiva de renda fixa", () => {
  assert.equal(f.irRegressivoRendaFixa(100), 0.225);
  assert.equal(f.irRegressivoRendaFixa(360), 0.2);
  assert.equal(f.irRegressivoRendaFixa(721), 0.15);
});

test("regressiva de previdência", () => {
  assert.equal(f.irRegressivoPrevidencia(1), 0.35);
  assert.equal(f.irRegressivoPrevidencia(10), 0.1);
});

test("imposto progressivo por faixas marginais", () => {
  const faixas = [
    { ate: 100, aliquota: 0.1 },
    { ate: 200, aliquota: 0.2 },
    { ate: Infinity, aliquota: 0.3 },
  ];
  perto(f.impostoProgressivo(50, faixas), 5);
  perto(f.impostoProgressivo(150, faixas), 20);
  perto(f.impostoProgressivo(300, faixas), 60);
});

test("estate tax: US$ 1 milhão em ativos nos EUA", () => {
  const bruto = f.impostoProgressivo(1000000, ESTATE_TAX_EUA.faixas);
  perto(bruto, 345800, 1);
  perto(bruto - ESTATE_TAX_EUA.creditoUnificado, 332800, 1);
});

test("estate tax: abaixo da isenção de US$ 60 mil não paga", () => {
  const bruto = f.impostoProgressivo(60000, ESTATE_TAX_EUA.faixas);
  assert.ok(bruto - ESTATE_TAX_EUA.creditoUnificado <= 0.01);
});

test("come-cotas custa dinheiro e o custo cresce com o prazo", () => {
  const curto = f.simularComeCotas({ principal: 1e6, taxaAnual: 0.11, anos: 5 });
  const longo = f.simularComeCotas({ principal: 1e6, taxaAnual: 0.11, anos: 20 });
  assert.ok(curto.diferenca > 0);
  assert.ok(longo.diferenca > curto.diferenca);
  assert.ok(longo.impostoAntecipado > 0);
});

test("come-cotas: sem rendimento não há imposto antecipado", () => {
  const r = f.simularComeCotas({ principal: 1e6, taxaAnual: 0, anos: 10 });
  perto(r.impostoAntecipado, 0, 1e-6);
});

test("formatação", () => {
  assert.equal(f.percentual(0.075, 1), "7,5%");
  assert.equal(f.anosEMeses(0), "0 meses");
  assert.equal(f.anosEMeses(13), "1 ano e 1 mês");
  assert.equal(f.anosEMeses(24), "2 anos");
  assert.equal(f.anosEMeses(Infinity), "para sempre");
});
