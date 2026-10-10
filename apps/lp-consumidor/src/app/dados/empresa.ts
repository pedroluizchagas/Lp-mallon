import { EMPRESA as DADOS } from '@mallevo/brand'
import { LINKS } from '../lib/links'

/**
 * Quem responde pela Mallevo: os dados moram em @mallevo/brand (fonte única
 * das landings); aqui só entra o canal de contato deste site.
 */
export const EMPRESA = {
  ...DADOS,
  email: LINKS.email,
} as const
