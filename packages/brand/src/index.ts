export const COLORS = {
  dark:        '#0B0F0D',
  'dark-2':    '#111714',
  lime:        '#c1f148',
  'lime-dark': '#9dc93a',
  'lime-ink':  '#1a2a00',
  accent:      '#2d5a27',
  surface:     '#f8f9f6',
  'surface-alt': '#f0f2ec',
  ink:         '#0d1208',
  'ink-2':     '#3d4a35',
  'ink-3':     '#6b7c60',
} as const

export const URLS = {
  APP_URL:              process.env.NEXT_PUBLIC_APP_URL              ?? 'https://app.mallevo.com.br',
  CONSUMIDOR_URL:       process.env.NEXT_PUBLIC_CONSUMIDOR_URL       ?? 'https://mallevo.com.br',
  PARCEIROS_URL:        process.env.NEXT_PUBLIC_PARCEIROS_URL        ?? 'https://parceiros.mallevo.com.br',
  ENTREGADORES_URL:     process.env.NEXT_PUBLIC_ENTREGADORES_URL     ?? 'https://entregadores.mallevo.com.br',
  CADASTRO_LOJISTA:     process.env.NEXT_PUBLIC_CADASTRO_LOJISTA     ?? 'https://app.mallevo.com.br/cadastro',
  CADASTRO_ENTREGADOR:  process.env.NEXT_PUBLIC_CADASTRO_ENTREGADOR  ?? 'https://app.mallevo.com.br/entregador/cadastro',
} as const

export const SEO = {
  consumidor: {
    title:       'Mallevo — O shopping digital de Divinópolis',
    description: 'Descubra lojas locais, faça pedidos e receba em casa. Mallevo conecta você ao comércio de Divinópolis, MG.',
    siteName:    'Mallevo',
  },
  parceiros: {
    title:       'Mallevo Parceiros — Venda online em Divinópolis',
    description: 'Cadastre sua loja na Mallevo e alcance mais clientes em Divinópolis com entrega rápida e gestão simplificada.',
    siteName:    'Mallevo Parceiros',
  },
  entregadores: {
    title:       'Mallevo Entregadores — Ganhe dinheiro entregando',
    description: 'Seja um entregador parceiro da Mallevo em Divinópolis. Horários flexíveis, ganhos semanais e suporte completo.',
    siteName:    'Mallevo Entregadores',
  },
} as const
