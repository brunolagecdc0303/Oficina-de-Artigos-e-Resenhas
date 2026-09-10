// Páginas de nicho. Cada uma fala com uma pessoa específica, não com "investidores".
export const NICHOS = [
  {
    slug: "empresario",
    nome: "Empresário",
    chamada: "O seu maior ativo não está na corretora. Está na empresa, e é o único que não tem plano B.",
    resumo:
      "Para quem construiu patrimônio dentro da própria empresa e nunca separou uma coisa da outra.",
    tensao: [
      "Você levou vinte anos construindo a empresa e, no caminho, ela virou quase tudo o que você tem. O que sobra está espalhado: um CDB no banco, um imóvel alugado, uma previdência que alguém vendeu numa reunião que você mal lembra.",
      "O problema não é a concentração: empresário concentrado é o normal, e foi a concentração que construiu o patrimônio. O problema é que quase nenhuma decisão foi tomada em conjunto com as outras. Cada peça foi resolvida isoladamente, por pessoas diferentes, em momentos diferentes, sem ninguém olhando o todo.",
    ],
    sinais: [
      "Pessoa física e jurídica se misturam, e o contador resolve como dá",
      "Não existe acordo de sócios, ou existe um que ninguém releu desde a assinatura",
      "O padrão de vida da família depende integralmente da distribuição de lucros",
      "Se você não estiver aqui amanhã, ninguém sabe quem assina pela empresa",
      "A sucessão nunca foi tratada porque a conversa é desconfortável",
    ],
    muda: [
      "Separação clara entre o patrimônio da empresa e o da família, com número em cima",
      "Uma reserva que sustenta a família sem depender de um real da empresa",
      "Liquidez sucessória dimensionada: de onde sai o dinheiro do inventário",
      "Estrutura societária e sucessória decidida em vida, com advogado e contador na mesa",
    ],
    calculadoras: ["reserva-empresario", "pro-labore-x-dividendos", "liquidez-sucessoria", "inventario"],
  },
  {
    slug: "medico",
    nome: "Médico com PJ",
    chamada: "Renda alta, tempo nenhum, e um patrimônio que cresceu sem projeto.",
    resumo:
      "Para quem fatura muito bem, tem PJ, e nunca teve uma hora livre para organizar o que sobrou.",
    tensao: [
      "Você fatura bem há anos. Mesmo assim, a sensação de que o dinheiro deveria estar rendendo mais, ou pelo menos estar mais organizado, não passa. E toda vez que você senta para resolver, aparece um plantão.",
      "O padrão é sempre o mesmo: renda alta, carga tributária mal otimizada, seguros vendidos avulsos por quem apareceu, investimentos pulverizados em três instituições que não conversam entre si, e nenhuma estrutura sucessória. Não é falta de disciplina. É falta de alguém coordenando.",
    ],
    sinais: [
      "A alíquota efetiva da PJ nunca foi calculada, só aceita",
      "Pró-labore definido no chute, sem conta de otimização",
      "Investimentos espalhados em três ou quatro instituições, sem visão consolidada",
      "Seguro de invalidez inexistente ou muito abaixo da renda que ele deveria substituir",
      "Exposição a responsabilidade civil profissional nunca dimensionada",
    ],
    muda: [
      "Carga tributária da PJ recalculada, com o mix de retirada otimizado",
      "Carteira consolidada em uma visão só, com função definida para cada posição",
      "Proteção dimensionada pela renda que precisa ser substituída, não pelo que foi ofertado",
      "Um calendário anual de decisões, para o assunto parar de depender de sobrar tempo",
    ],
    calculadoras: ["pro-labore-x-dividendos", "pgbl-x-vgbl", "aposentadoria", "come-cotas"],
  },
  {
    slug: "executivo",
    nome: "Executivo",
    chamada: "Stock options, bônus variável e exposição internacional que ninguém dimensionou.",
    resumo:
      "Para quem tem remuneração complexa, patrimônio relevante e uma vida fiscal em mais de um país.",
    tensao: [
      "A sua remuneração não cabe num contracheque: tem salário, bônus, participação, ações restritas, opções com prazo de carência. Cada peça tem uma regra tributária diferente, e uma janela de decisão diferente.",
      "Some a isso a conta lá fora, aberta no celular quando ficou fácil investir nos Estados Unidos, e você tem uma vida patrimonial em dois regimes fiscais sem ninguém coordenando os dois.",
    ],
    sinais: [
      "Concentração relevante em ações da própria empregadora: o mesmo risco no emprego e na carteira",
      "Vesting e janelas de exercício tratados sem planejamento tributário",
      "Ativos nos EUA em conta direta, sem avaliação de exposição a estate tax",
      "Bônus variável tratado como renda recorrente na hora de assumir compromissos",
    ],
    muda: [
      "Mapa de concentração: quanto do seu patrimônio depende do mesmo empregador",
      "Calendário de vesting e exercício com a decisão tributária tomada antes da janela",
      "Exposição internacional dimensionada pelas despesas futuras, não por palpite de câmbio",
      "Estrutura sucessória que cobre os ativos dos dois lados da fronteira",
    ],
    calculadoras: ["estate-tax", "quanto-dolarizar", "aposentadoria", "caixa-parado"],
  },
];

export const nichoPorSlug = (slug) => NICHOS.find((n) => n.slug === slug);
