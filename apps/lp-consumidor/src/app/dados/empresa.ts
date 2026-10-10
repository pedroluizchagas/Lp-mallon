import { LINKS } from '../lib/links'

/**
 * Quem responde pela Mallevo. Fonte: cadastro do CNPJ na Receita Federal
 * (consultado em 10/10/2026). O nome empresarial do MEI carrega o CPF do
 * titular — por decisão do responsável, ele não é publicado; o CNPJ basta
 * para identificar a empresa. O endereço sai sem rua e número pelo mesmo
 * motivo.
 */
export const EMPRESA = {
  nome: 'Pedro Luiz Chagas',
  natureza: 'microempreendedor individual (MEI)',
  cnpj: '24.811.306/0001-96',
  endereco: 'Bairro Interlagos, Divinópolis/MG, CEP 35500-470',
  comarca: 'Divinópolis/MG',
  email: LINKS.email,
} as const
