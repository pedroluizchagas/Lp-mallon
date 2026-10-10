import { URLS } from '@mallevo/brand'

/**
 * Destinos da landing. Lojas de apps e redes só aparecem quando a URL existe
 * de verdade (variável de ambiente) — sem botão apontando para "#".
 */
export const LINKS = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || null,
  playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL || null,
  parceiros: URLS.PARCEIROS_URL,
  entregadores: URLS.ENTREGADORES_URL,
  email: process.env.NEXT_PUBLIC_CONTATO_EMAIL || 'contato@mallevo.com.br',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  // Os documentos moram aqui mesmo (/termos, /privacidade) — o app abre
  // essas URLs em Perfil › Ajuda. A variável só existe para apontar outro lugar.
  termos: process.env.NEXT_PUBLIC_TERMOS_URL || '/termos',
  privacidade: process.env.NEXT_PUBLIC_PRIVACIDADE_URL || '/privacidade',
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
