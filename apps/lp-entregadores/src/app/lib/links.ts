import { URLS } from '@mallevo/brand'

const SITE_CONSUMIDOR = URLS.CONSUMIDOR_URL.replace(/\/$/, '')
const EMAIL = process.env.NEXT_PUBLIC_CONTATO_EMAIL || 'contato@mallevo.com.br'

/**
 * Destinos da landing. O cadastro do entregador existe só dentro do app
 * (Entregadores Mallevo) — não há cadastro pela web. Sem as URLs das lojas
 * de apps, os botões mostram "Em breve" e o convite é um e-mail.
 */
export const LINKS = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || null,
  playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL || null,
  email: EMAIL,
  avisar: `mailto:${EMAIL}?subject=${encodeURIComponent('Quero ser entregador do Mallevo')}`,
  consumidor: SITE_CONSUMIDOR,
  parceiros: URLS.PARCEIROS_URL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  // Os documentos legais moram no site do consumidor — os mesmos para todos.
  termos: process.env.NEXT_PUBLIC_TERMOS_URL || `${SITE_CONSUMIDOR}/termos`,
  privacidade: process.env.NEXT_PUBLIC_PRIVACIDADE_URL || `${SITE_CONSUMIDOR}/privacidade`,
} as const

/** O app já está nas lojas? (sem URL configurada, ainda não) */
export const APP_PUBLICADO = Boolean(LINKS.appStore || LINKS.playStore)

/** Seções da página (âncoras do menu e do rodapé). */
export const SECOES = [
  { id: 'oferta', rotulo: 'A oferta' },
  { id: 'entrega', rotulo: 'A entrega' },
  { id: 'ganhos', rotulo: 'Ganhos' },
  { id: 'seu-jeito', rotulo: 'Do seu jeito' },
  { id: 'comecar', rotulo: 'Como começar' },
  { id: 'perguntas', rotulo: 'Perguntas' },
] as const
