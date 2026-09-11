# Site de assessoria patrimonial

Site institucional com blog, 14 calculadoras patrimoniais e uma landing page que
recebe e qualifica quem chega. Feito em [Astro](https://astro.build), publicado
na Netlify.

Vive na pasta `site/` deste repositório, **separado** do projeto da Oficina de
Artigos do IFL-BH que está na raiz. Os dois não compartilham nada e são
publicados como sites Netlify diferentes.

---

## Antes de publicar: o que é obrigatório preencher

Abra `src/lib/site.js` e substitua tudo que está marcado com `[REVISAR]`. São
exigências regulatórias, não enfeite:

- **Nome fantasia** com a expressão "Assessor de Investimento" ou "AI"
  (Res. CVM 178).
- **Instituição** à qual você é vinculado, razão social, CNPJ do escritório e
  canal de ouvidoria.
- **Certificações** — só as que você efetivamente detém.

Depois revise, também, estas duas páginas, que saem do forno com texto de
exemplo e **não devem ir ao ar como estão**:

- `src/pages/remuneracao.astro` — descreva seus arranjos reais de remuneração
  (Res. CVM 179) e submeta ao compliance da instituição.
- `src/pages/privacidade.astro` — valide com o jurídico e ajuste os prazos de
  retenção.

---

## Rodando na sua máquina

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm test         # 20 testes do motor financeiro
```

Para testar as calculadoras liberadas/bloqueadas e o formulário de diagnóstico,
é preciso rodar as functions:

```bash
npm install -g netlify-cli
netlify dev
```

---

## Publicando na Netlify

1. **Add new site → Import an existing project → GitHub**, escolha este
   repositório.
2. Em **Build settings**, defina **Base directory** como `site`. O resto o
   `site/netlify.toml` já resolve.
3. Em **Site configuration → Environment variables**, adicione:
   - `ADMIN_PIN` — o PIN do painel. Use algo que não seja aniversário.
4. Deploy.

> O projeto do IFL-BH na raiz continua em outro site Netlify, com a própria
> configuração. Um não interfere no outro.

---

## As calculadoras e o sistema de liberação

São 14, listadas em `src/lib/calculadoras.js`. Todas rodam **inteiramente no
navegador**: nada do que o visitante digita é enviado, armazenado ou chega até
você.

### Quem decide o que fica aberto

Você, pelo painel em `/admin`, com o `ADMIN_PIN`. A mudança vale **na hora**,
sem novo deploy.

- **Aberta** — qualquer visitante usa.
- **Bloqueada** — continua aparecendo na grade e nas páginas de nicho, com o
  resultado de amostra borrado e um convite para o diagnóstico. É isso que gera
  a vontade.

O estado inicial (antes de você mexer no painel) é o campo `liberadaPorPadrao`
de cada calculadora no catálogo. Hoje vêm abertas: aposentadoria, comprar x
alugar e carro.

### Código de acesso dos clientes

No painel você define um código. Quem digitar esse código em `/calculadoras`
libera todas as 14 naquele navegador. Trocar o código invalida o anterior na
hora.

> **Sobre o que esse bloqueio é e o que não é.** Ele existe para criar desejo e
> qualificar, não para proteger segredo. O borrão é visual e o código é uma
> trava de conveniência — alguém tecnicamente determinado consegue contornar.
> Como são ferramentas educacionais, isso é aceitável. Não use esse mecanismo
> para nada sensível.

### Acrescentando uma calculadora

1. Adicione a entrada em `src/lib/calculadoras.js` (slug, dimensão, pergunta,
   resumo e o resultado de amostra que aparece borrado).
2. Crie `src/pages/calculadoras/<slug>.astro` usando o layout `Calculadora`.
3. Use as funções de `src/lib/financas.js`. Se precisar de matemática nova,
   escreva lá e **cubra com teste** — é o arquivo que sustenta todas as contas.

### Tabelas fiscais

Ficam isoladas em `src/lib/tabelas.js`, cada bloco com a própria vigência
declarada, que aparece na tela. ITCMD, IRPF, tributação de dividendos e estate
tax mudam por lei: quando mudarem, atualize **só esse arquivo**.

Toda alíquota ali é apenas o **valor padrão de um campo editável** pelo
visitante — o site não afirma qual é a legislação vigente, e cada calculadora
diz isso explicitamente.

---

## A landing page de qualificação

`/diagnostico` é uma **página de captação isolada**: usa um layout próprio, sem
menu e sem links de saída além da política de privacidade. Cada item de navegação
numa landing é uma porta pela qual o visitante sai antes de preencher — por isso
ela não tem nenhum.

Serve como fonte de lead por si só: pode ir na bio da rede social, em anúncio, em
assinatura de e-mail ou numa mensagem de WhatsApp, sem depender do resto do site.

**Links curtos** (configurados em `netlify.toml`):

- `/d` → o mais curto, para bio e WhatsApp
- `/diagnostico-patrimonial` → para quando o contexto pede clareza

**Medição de origem.** A página captura automaticamente `utm_source`,
`utm_medium`, `utm_campaign`, `utm_content` e o referenciador, e guarda tudo
junto do lead. No painel isso vira a coluna "Origem", combinada com o que a
pessoa digitou em "Como você chegou até aqui?". Use assim:

```
/d?utm_source=instagram&utm_medium=bio&utm_campaign=diagnostico-set
/d?utm_source=whatsapp&utm_medium=mensagem&utm_campaign=carteira-atual
```

Sem esses parâmetros, a origem aparece como o domínio de onde a pessoa veio, ou
"direto".

`/diagnostico` recebe quem chega e pontua o lead por patrimônio, perfil,
urgência e complexidade (a lógica está em `netlify/functions/leads.mjs`, com os
pesos abertos e fáceis de ajustar). Três faixas:

| Faixa | O que o visitante vê |
|---|---|
| **Prioritário** | Convite direto para agendar a conversa de descoberta |
| **Acompanhar** | Convite para começar pelo diagnóstico |
| **Conteúdo** | Agradecimento e caminho para calculadoras e artigos |

Os leads ficam nos Netlify Blobs e aparecem no painel `/admin`, do mais recente
para o mais antigo. Para o botão "escolher um horário" aparecer, preencha
`contato.agenda` em `src/lib/site.js` com seu link do Cal.com ou Calendly.

---

## Editando os textos sem passar por deploy

O painel `/admin` tem a seção **Textos da landing do diagnóstico**, com dezessete
campos: título, parágrafos, texto do botão, títulos de bloco, o rodapé do
formulário e a descrição que aparece no Google.

O que você salvar ali **vale na hora**. Não precisa de novo deploy, não gasta
minuto de build. Campo em branco volta ao texto padrão, e o botão "Restaurar
tudo ao padrão" limpa de uma vez.

Isso funciona porque a landing é a única página do site renderizada no servidor:
a cada visita ela lê os textos salvos antes de montar o HTML. O resto do site
continua estático. Os padrões de fábrica ficam em `src/lib/textos.js`, e mexer
neles exige deploy; mexer no painel, não.

### A sua foto

No mesmo painel, em **Sua foto**, cole o endereço de uma imagem. Duas formas:

- **Arquivo no projeto:** suba a imagem para `site/public/img/` (dá para fazer
  pelo próprio GitHub, em *Add file → Upload files*) e use o caminho
  `/img/nome-do-arquivo.jpg`. Exige um deploy, mas só uma vez.
- **Endereço externo:** qualquer URL pública de imagem funciona, sem deploy
  nenhum.

Campo em branco não mostra foto, e nada quebra. A foto aparece junto ao
formulário, com seu nome e certificação, identificando quem vai responder.

## O blog

Artigos em Markdown, em `src/content/artigos/`. Um arquivo por artigo, com este
cabeçalho:

```yaml
---
titulo: "..."
resumo: "..."
data: 2026-09-05
dimensao: tributaria     # as oito dimensões do diagnóstico
calculadora: come-cotas  # opcional: põe a calculadora no fim do artigo
revisadoEm: 2026-10-01   # opcional, importante em conteúdo tributário
rascunho: false          # true esconde do site e do RSS
---
```

As categorias são as oito dimensões do diagnóstico (`fluxo`, `investimentos`,
`tributaria`, `protecao`, `empresarial`, `sucessoria`, `internacional`,
`humana`), de propósito: o blog vira a versão editorial do método.

RSS em `/rss.xml`, sitemap gerado no build.

---

## Estrutura

```
site/
├── src/
│   ├── lib/
│   │   ├── site.js           → identidade e compliance   ← comece por aqui
│   │   ├── financas.js       → motor financeiro (testado)
│   │   ├── tabelas.js        → tabelas fiscais, com vigência
│   │   ├── calculadoras.js   → catálogo das 14
│   │   ├── nichos.js         → páginas "para quem"
│   │   ├── acesso.js         → liberação no navegador
│   │   └── ui.js             → helpers de tela
│   ├── layouts/              → Base e Calculadora
│   ├── components/           → cabeçalho, rodapé, cartões, avisos
│   ├── content/artigos/      → os artigos, em Markdown
│   ├── pages/                → todas as rotas
│   └── styles/global.css     → design system, claro e escuro
├── netlify/functions/
│   ├── calculadoras.mjs      → o que está liberado  (/api/calculadoras)
│   ├── admin.mjs             → painel                (/api/admin)
│   └── leads.mjs             → qualificação          (/api/leads)
└── test/                     → testes do motor e do parsing
```

---

## Compliance, resumido

O que está embutido no código:

- Disclaimer em **cada** calculadora, dizendo que é simulação ilustrativa, que
  não é recomendação e que nada é enviado a servidor.
- Rodapé com vínculo institucional, CNPJ, certificações, ouvidoria e o aviso de
  que rentabilidade passada não garante futura.
- Nenhuma calculadora sugere produto específico.
- Nenhum texto promete ou sugere rentabilidade.
- Formulário com consentimento LGPD explícito e política de privacidade.
- `/admin` fora do `robots.txt`.

O que **você** precisa fazer:

- Preencher os `[REVISAR]` de `src/lib/site.js`.
- Escrever de verdade a página de remuneração.
- Submeter as páginas ao compliance da instituição antes de publicar.
- Guardar as aprovações e os vetos — vira jurisprudência interna e acelera as
  próximas peças.
