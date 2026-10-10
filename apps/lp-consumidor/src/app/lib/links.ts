import { URLS } from '@mallevo/brand'

/**
 * Destinos externos da landing. Lojas de apps, redes e páginas legais só
 * aparecem quando a URL existe de verdade (variável de ambiente) — sem
 * botão apontando para "#".
 */
export const LINKS = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || null,
  playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL || null,
  parceiros: URLS.PARCEIROS_URL,
  entregadores: URLS.ENTREGADORES_URL,
  email: process.env.NEXT_PUBLIC_CONTATO_EMAIL || 'contato@mallevo.com.br',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  termos: process.env.NEXT_PUBLIC_TERMOS_URL || null,
  privacidade: process.env.NEXT_PUBLIC_PRIVACIDADE_URL || null,
} as const

/** Seções da página (âncoras do cabeçalho, do menu e do rodapé). */
export const SECOES = [
  { id: 'passarela', rotulo: 'Passarela' },
  { id: 'pisos', rotulo: 'Pisos' },
  { id: 'vitrines', rotulo: 'Vitrines' },
  { id: 'explorar', rotulo: 'Explorar' },
  { id: 'pedido', rotulo: 'Pedido ao vivo' },
  { id: 'perguntas', rotulo: 'Perguntas' },
] as const
