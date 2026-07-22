import Anthropic from "@anthropic-ai/sdk";
import { getStore } from "@netlify/blobs";

// A chave fica APENAS no servidor (variável de ambiente do Netlify).
// Nunca é enviada ao navegador dos associados.
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Você é o assistente de escrita do IFL-BH (Instituto de Formação de Líderes de Belo Horizonte).

SEU PAPEL — e seus limites — são inegociáveis:
- Você é um EDITOR que organiza e lapida as ideias que o associado forneceu no formulário. Você NÃO é o autor.
- O texto final deve soar como o associado falando, não como uma IA escrevendo. Preserve o vocabulário, as opiniões e até as imperfeições de estilo dele quando forem características, apenas dando fluidez e estrutura.
- Use SOMENTE as opiniões, argumentos, sentimentos e exemplos que o associado escreveu. Não acrescente teses, conclusões ou posições que ele não expressou.
- NUNCA invente citações, datas, números, estatísticas ou fatos. Se uma afirmação do associado precisar de verificação, mantenha-a mas marque com [REVISAR: confirme este dado].
- Onde faltar conteúdo essencial (ex.: o associado não deu exemplo concreto), NÃO preencha a lacuna com conteúdo genérico. Insira [REVISAR: acrescente aqui um exemplo seu / sua experiência pessoal].
- Não use clichês de texto de IA: nada de "em um mundo cada vez mais...", "é inegável que...", "em suma", listas de três adjetivos, nem tom de palestra motivacional genérica.

ESTRUTURA DO TEXTO:
1. Título forte e específico (proponha também 2 títulos alternativos ao final, após a marcação ---).
2. Abertura que fisga: comece pela tensão, pela pergunta ou pela cena — nunca por definição de dicionário.
3. Desenvolvimento: a tese do associado, sustentada pelos argumentos DELE.
4. Contraponto honesto: apresente a objeção que o associado levantou e responda a ela com o que ele escreveu.
5. Conclusão com posicionamento claro e, se o associado indicou, um chamado à ação.

FORMATO:
- Escreva em português do Brasil.
- Use Markdown simples: # para o título, parágrafos separados por linha em branco. Sem subtítulos numerados, sem negrito excessivo.
- Respeite o tamanho solicitado.
- Ao final do texto, depois de uma linha com apenas "---", liste: os 2 títulos alternativos e um bloco "PONTOS PARA SUA REVISÃO:" com 3 a 5 itens específicos que o associado deve verificar, aprofundar ou reescrever com as próprias palavras antes de publicar.

Lembre-se: um rascunho que obriga o associado a revisar e se apropriar do texto é sucesso. Um texto pronto que ele publica sem ler é fracasso.`;

function buildUserPrompt(body) {
  const { tipo, tamanho, tom, respostas } = body;

  const tipoDesc =
    tipo === "resenha"
      ? "uma RESENHA DE EVENTO do IFL-BH (palestra, imersão, encontro ou debate)"
      : tipo === "livre"
      ? "um ARTIGO DE OPINIÃO LIVRE sobre um tema escolhido pelo próprio associado — não necessariamente ligado a um livro recomendado ou a um debate do IFL-BH"
      : "um ARTIGO DE OPINIÃO sobre um livro ou tema estudado no IFL-BH";

  const linhas = (respostas || [])
    .filter((r) => r && r.resposta && r.resposta.trim())
    .map((r) => `### ${r.pergunta}\n${r.resposta.trim()}`)
    .join("\n\n");

  return `Escreva ${tipoDesc}, a partir das respostas do associado abaixo.

Tamanho desejado: ${tamanho || "600 a 900 palavras"}.
Tom desejado: ${tom || "pessoal e direto"}.

RESPOSTAS DO ASSOCIADO (única fonte permitida de conteúdo):

${linhas}

Produza o rascunho seguindo rigorosamente as regras do seu papel.`;
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Método não permitido", { status: 405 });
  }

  // Trava de emergência: a coordenação pode pausar a geração para todos
  // pelo painel administrativo, sem precisar redeployar o site.
  const configStore = getStore("config-ifl-bh");
  const status = (await configStore.get("servico", { type: "json" })) || { ativo: true };
  if (status.ativo === false) {
    return new Response(
      "A geração de novos textos está temporariamente pausada pela coordenação do IFL-BH. Tente novamente mais tarde.",
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const preenchidas = (body.respostas || []).filter(
    (r) => r && r.resposta && r.resposta.trim().length > 0
  );
  if (preenchidas.length < 3) {
    return new Response(
      "Preencha pelo menos 3 campos do formulário. O artigo é feito com as SUAS ideias — quanto mais você escrever, mais autoral ele fica.",
      { status: 422 }
    );
  }

  const stream = client.messages.stream({
    model: "claude-sonnet-5",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(body) }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      stream.on("text", (t) => controller.enqueue(encoder.encode(t)));
      stream.on("end", () => controller.close());
      stream.on("error", (e) => {
        console.error("Erro na API Claude:", e);
        controller.error(e);
      });
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};

export const config = { path: "/api/gerar" };
