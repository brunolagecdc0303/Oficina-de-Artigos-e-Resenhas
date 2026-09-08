// ---------------------------------------------------------------------------
// Controle de acesso às calculadoras, lado do navegador.
// O painel do administrador define quais estão liberadas; um código de acesso
// (entregue a clientes) libera todas. O cache em sessionStorage evita que a
// página pisque de bloqueada para liberada a cada navegação.
// ---------------------------------------------------------------------------

const CHAVE_TOKEN = "acesso-calc-token";
const CHAVE_CACHE = "acesso-calc-cache";

const seguro = (fn, padrao = null) => {
  try {
    return fn();
  } catch {
    return padrao;
  }
};

export const tokenSalvo = () => seguro(() => localStorage.getItem(CHAVE_TOKEN));

export const cacheLiberadas = () =>
  seguro(() => {
    const bruto = sessionStorage.getItem(CHAVE_CACHE);
    if (!bruto) return null;
    const dados = JSON.parse(bruto);
    return Array.isArray(dados?.liberadas) ? dados : null;
  });

const gravarCache = (dados) =>
  seguro(() => sessionStorage.setItem(CHAVE_CACHE, JSON.stringify(dados)));

/**
 * Busca no servidor a lista de calculadoras liberadas.
 * @param {string[]} padrao usado se a API não responder (site continua útil)
 */
export async function carregarLiberadas(padrao = []) {
  const token = tokenSalvo();
  try {
    const resposta = await fetch("/api/calculadoras", {
      headers: token ? { "x-acesso": token } : {},
    });
    if (!resposta.ok) throw new Error("resposta inválida");
    const dados = await resposta.json();
    const normalizado = {
      liberadas: Array.isArray(dados.liberadas) ? dados.liberadas : padrao,
      acesso: Boolean(dados.acesso),
    };
    gravarCache(normalizado);
    return normalizado;
  } catch {
    return cacheLiberadas() ?? { liberadas: padrao, acesso: false, offline: true };
  }
}

/** Troca um código de acesso por um token e libera tudo. */
export async function usarCodigo(codigo) {
  const resposta = await fetch("/api/calculadoras", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ codigo }),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || "Não foi possível validar o código.");
  seguro(() => localStorage.setItem(CHAVE_TOKEN, dados.token));
  gravarCache({ liberadas: dados.liberadas, acesso: true });
  return dados;
}

export function esquecerAcesso() {
  seguro(() => localStorage.removeItem(CHAVE_TOKEN));
  seguro(() => sessionStorage.removeItem(CHAVE_CACHE));
}
