import { test } from "node:test";
import assert from "node:assert/strict";
import { paraNumero } from "../src/lib/ui.js";

test("input type=number: o ponto é decimal e nunca separador de milhar", () => {
  assert.equal(paraNumero("4.5", true), 4.5);
  assert.equal(paraNumero("0.3", true), 0.3);
  assert.equal(paraNumero("11", true), 11);
  assert.equal(paraNumero("1500000", true), 1500000);
});

test("campo de texto: aceita formato brasileiro com milhar e decimal", () => {
  assert.equal(paraNumero("1.500.000,50"), 1500000.5);
  assert.equal(paraNumero("4,5"), 4.5);
  assert.equal(paraNumero("1 200,25"), 1200.25);
});

test("campo de texto sem vírgula trata o ponto como decimal", () => {
  assert.equal(paraNumero("4.5"), 4.5);
  assert.equal(paraNumero("1500000"), 1500000);
});

test("vazio e lixo devolvem NaN, para o chamador aplicar o padrão", () => {
  assert.ok(Number.isNaN(paraNumero("")));
  assert.ok(Number.isNaN(paraNumero(null)));
  assert.ok(Number.isNaN(paraNumero("abc")));
});
