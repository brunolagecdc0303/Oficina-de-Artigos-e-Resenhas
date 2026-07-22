# IFL-BH · Oficina de Artigos e Resenhas

Ferramenta para os associados do IFL-BH transformarem **suas próprias ideias** em artigos de opinião e resenhas de eventos, com ajuda da IA (Claude, da Anthropic) apenas como *editora* — nunca como autora.

## Como funciona

1. O associado entra com **nome + PIN** (os textos dele ficam salvos apenas para ele).
2. Responde a um formulário guiado: *concordou com a tese? qual seu sentimento? qual seu contraponto? como resolveria o problema?* etc.
3. O Claude organiza as respostas em um rascunho estruturado, **sem inventar opiniões, citações ou dados**. Lacunas viram marcações `[REVISAR: ...]`.
4. O associado **é obrigado a revisar**: o botão de salvar/copiar só libera depois do checklist de autoria e da remoção de todas as marcações `[REVISAR]`.

## Estrutura do projeto

```
index.html                     → interface (página única)
netlify/functions/generate.mjs → chama a API do Claude (streaming) — rota /api/gerar
netlify/functions/articles.mjs → salva/lista/exclui textos por PIN — rota /api/artigos
netlify/functions/admin.mjs    → painel administrativo (pausar/reativar geração) — rota /api/admin
netlify.toml                   → configuração do Netlify
package.json                   → dependências das functions
```

## Publicando no Netlify (passo a passo)

> ⚠️ **Não use o "arrastar e soltar"** do Netlify — ele não instala as dependências das functions. Use uma das duas opções abaixo.

### Opção A — via GitHub (recomendada)

1. Crie um repositório no GitHub e envie todos estes arquivos.
2. No [Netlify](https://app.netlify.com): **Add new site → Import an existing project → GitHub** e escolha o repositório.
3. Deixe as configurações de build como estão (o `netlify.toml` já cuida de tudo) e clique em **Deploy**.

### Opção B — via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init      # cria o site
netlify deploy --prod
```

### Configurar a chave da API (obrigatório)

1. Crie uma chave em [platform.claude.com](https://platform.claude.com) (Console da Anthropic → API Keys).
2. No Netlify: **Site configuration → Environment variables → Add a variable**:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (sua chave)
3. Faça um novo deploy (**Deploys → Trigger deploy**) para a variável valer.

A chave fica **somente no servidor** — nunca chega ao navegador dos associados.

### Configurar o PIN de administrador (recomendado)

Dá acesso a um botão de emergência — "Administração", no rodapé do site — para **pausar ou reativar a geração de textos para todos os associados na hora**, sem precisar mexer no Netlify nem esperar um novo deploy. Útil se o uso da API subir mais do que o esperado e você precisar interromper temporariamente.

1. No Netlify: **Site configuration → Environment variables → Add a variable**:
   - Key: `ADMIN_PIN`
   - Value: um PIN **diferente** dos PINs dos associados (ex.: `847293`)
2. Faça um novo deploy para a variável valer.
3. No site, clique em "Administração" no rodapé, entre com esse PIN e use o botão para pausar/reativar.

Sem essa variável configurada, o painel avisa que ainda não foi habilitado — o site continua funcionando normalmente para os associados.

## Onde os textos ficam salvos

Nos **Netlify Blobs** — armazenamento do próprio Netlify, sem custo adicional no plano gratuito e sem nenhuma configuração. Cada usuário (nome + PIN) vira uma chave criptográfica irreversível; um associado não consegue ver os textos de outro.

> **Por que não o Google Drive?** Integrar o Drive exigiria que *cada associado* fizesse login Google e autorizasse o app (fluxo OAuth), além de credenciais do Google Cloud para manter. O Netlify Blobs entrega o mesmo resultado (textos salvos por pessoa, acessíveis de qualquer dispositivo) com zero fricção. Se ainda assim quiser Drive no futuro, dá para adicionar um botão "exportar para o Drive" sem mudar o resto.

## Avisos importantes

- **PIN não é senha forte.** Ele separa os textos entre colegas de boa-fé; não protege contra um atacante determinado. Oriente os membros a não guardar nada sensível ali. O mesmo vale para o `ADMIN_PIN`: é uma trava de conveniência, não segurança de nível bancário.
- **Custo:** cada geração consome a API da Anthropic (modelo Claude Sonnet 5). Um artigo típico custa poucos centavos de dólar. Com ~20 associados usando esporadicamente, a estimativa é de poucos dólares por mês no total. Ainda assim, recomendamos definir um **limite de gastos** no Console da Anthropic (Settings → Limits) como segunda camada de proteção além do botão de pausar.
- **Botão de pausar (painel administrativo):** interrompe apenas a *geração de novos textos* — os textos já salvos continuam acessíveis a todos em "Meus textos". É a forma mais rápida de conter gastos caso o uso fuja do esperado.
- **Quem esquecer o PIN** (ou mudar a grafia do nome) perde o acesso aos textos salvos — eles continuam existindo, mas sob outra chave. Oriente: sempre o mesmo nome, sempre o mesmo PIN.

## Testando localmente

```bash
npm install
netlify dev
```

Abra `http://localhost:8888`. Exporte a chave antes: `set ANTHROPIC_API_KEY=sk-ant-...` (Windows) ou `export ANTHROPIC_API_KEY=sk-ant-...` (Mac/Linux).
