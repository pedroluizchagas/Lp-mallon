import { URLS } from '@mallevo/brand'

const PAINEL = URLS.APP_URL.replace(/\/$/, '')
const SITE_CONSUMIDOR = URLS.CONSUMIDOR_URL.replace(/\/$/, '')

/**
 * Destinos da landing. O cadastro do lojista é o onboarding do painel
 * (apps/web, rota /onboarding) — o mesmo que o app do lojista abre em
 * "Cadastre sua loja". Lojas de apps e redes só aparecem quando a URL
 * existe de verdade (variável de ambiente) — sem botão apontando para "#".
 */
export const LINKS = {
  cadastro: `${PAINEL}/onboarding`,
  entrar: `${PAINEL}/entrar`,
  painel: PAINEL,
  consumidor: SITE_CONSUMIDOR,
  entregadores: URLS.ENTREGADORES_URL,
  email: process.env.NEXT_PUBLIC_CONTATO_EMAIL || 'contato@mallevo.com.br',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  // App "Mallevo Parceiro": sem URL, os botões mostram "Em breve".
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || null,
  playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL || null,
  // Os documentos legais moram no site do consumidor — os mesmos para todos.
  termos: process.env.NEXT_PUBLIC_TERMOS_URL || `${SITE_CONSUMIDOR}/termos`,
  privacidade: process.env.NEXT_PUBLIC_PRIVACIDADE_URL || `${SITE_CONSUMIDOR}/privacidade`,
} as const

/** Seções da página (âncoras do menu e do rodapé). */
export const SECOES = [
  { id: 'vitrine', rotulo: 'Vitrine' },
  { id: 'explorar', rotulo: 'Explorar' },
  { id: 'balcao', rotulo: 'Balcão' },
  { id: 'painel', rotulo: 'Painel' },
  { id: 'precos', rotulo: 'Quanto custa' },
  { id: 'comecar', rotulo: 'Como começar' },
  { id: 'perguntas', rotulo: 'Perguntas' },
] as const
