import type { PartnerIconName } from '../components/marca/PartnerIcon'

/**
 * O balcão que a landing mostra é o do app do lojista: os status, rótulos e
 * ações são os de Mall-online/apps/mobile-partner/lib/status-pedido.ts e
 * @mallevo/lib (pedidos/transicoes.ts). A loja de demonstração é o Café
 * Aroma do conjunto de demonstração do app (cardápio e preços do mock;
 * a taxa de entrega é da landing); clientes e responsável são fictícios.
 *
 * Nada de faturamento, nota ou volume de pedidos "do Mallevo" — os números
 * que aparecem são de uma loja-exemplo, dentro da tela do app.
 */

export const LOJA_DEMO = {
  nome: 'Café Aroma',
  iniciais: 'CA',
  responsavel: 'Helena',
} as const

export type StatusPedido =
  | 'novo'
  | 'confirmado'
  | 'em_preparo'
  | 'aguardando_entregador'
  | 'saiu_para_entrega'
  | 'entregue'

export interface MetaStatus {
  status: StatusPedido
  cor: string
  /** Badge / chip. */
  rotulo: string
  /** Statement da marquise (por extenso). */
  rotuloLongo: string
  /** O que o lojista deve fazer ou esperar agora. */
  descricao: string
  icone: PartnerIconName
  progresso: number
  pedeAcao: boolean
  /** A ação que o lojista toca neste momento (ROTULO_TRANSICAO). */
  acao?: string
}

/** META_STATUS do app do lojista, na ordem do fluxo. */
export const STATUS: MetaStatus[] = [
  {
    status: 'novo',
    cor: '#F2B84B',
    rotulo: 'Novo',
    rotuloLongo: 'Pedido novo',
    descricao: 'Aguardando sua confirmação.',
    icone: 'bell',
    progresso: 0.1,
    pedeAcao: true,
    acao: 'Confirmar pedido',
  },
  {
    status: 'confirmado',
    cor: '#5BB7FF',
    rotulo: 'Confirmado',
    rotuloLongo: 'Confirmado',
    descricao: 'Inicie o preparo quando começar.',
    icone: 'check-circle',
    progresso: 0.28,
    pedeAcao: true,
    acao: 'Iniciar preparo',
  },
  {
    status: 'em_preparo',
    cor: '#F2B84B',
    rotulo: 'Em preparo',
    rotuloLongo: 'Em preparo',
    descricao: 'Marque como pronto ao terminar.',
    icone: 'chef',
    progresso: 0.52,
    pedeAcao: true,
    acao: 'Pronto — chamar entregador',
  },
  {
    status: 'aguardando_entregador',
    cor: '#5BB7FF',
    rotulo: 'Aguardando coleta',
    rotuloLongo: 'Pronto para coleta',
    descricao: 'Aguardando o entregador retirar.',
    icone: 'package',
    progresso: 0.72,
    pedeAcao: false,
  },
  {
    status: 'saiu_para_entrega',
    cor: '#5BB7FF',
    rotulo: 'Em entrega',
    rotuloLongo: 'Saiu para entrega',
    descricao: 'A caminho do cliente.',
    icone: 'bike',
    progresso: 0.88,
    pedeAcao: false,
  },
  {
    status: 'entregue',
    cor: '#8ED14F',
    rotulo: 'Entregue',
    rotuloLongo: 'Entregue',
    descricao: 'Entrega concluída.',
    icone: 'check-circle',
    progresso: 1,
    pedeAcao: false,
  },
]

export const STATUS_POR_CHAVE = Object.fromEntries(STATUS.map((s) => [s.status, s])) as Record<
  StatusPedido,
  MetaStatus
>

export interface ItemPedido {
  qtd: number
  nome: string
  /** Total da linha, em centavos. */
  total: number
}

export interface PedidoDemo {
  id: string
  cliente: string
  itens: ItemPedido[]
  /** Centavos. */
  subtotal: number
  entrega: number
  total: number
  pagamento: string
}

/** A taxa de entrega do Café Aroma na landing (centavos). */
export const TAXA_ENTREGA = 490

/** Cardápio do Café Aroma no mock do app (centavos). */
const PRECO = {
  cappuccino: 1590,
  croissant: 1190,
  latte: 1490,
  coldBrew: 1690,
  coado: 990,
  bolo: 1490,
  cookie: 890,
}

function pedido(id: string, cliente: string, itens: [number, string, number][], pagamento: string): PedidoDemo {
  const linhas = itens.map(([qtd, nome, preco]) => ({ qtd, nome, total: qtd * preco }))
  const subtotal = linhas.reduce((s, l) => s + l.total, 0)
  return { id, cliente, itens: linhas, subtotal, entrega: TAXA_ENTREGA, total: subtotal + TAXA_ENTREGA, pagamento }
}

/** Os pedidos que chegam, um depois do outro, no balcão do hero. */
export const PEDIDOS_DEMO: PedidoDemo[] = [
  pedido('p1', 'Maria Silva', [[2, 'Cappuccino Trio', PRECO.cappuccino], [1, 'Croissant Amanteigado', PRECO.croissant]], 'Pix online'),
  pedido('p2', 'Rafael Costa', [[1, 'Cold Brew Tônica', PRECO.coldBrew], [1, 'Bolo Trufado', PRECO.bolo]], 'Cartão online'),
  pedido('p3', 'Juliana Alves', [[2, 'Latte da Casa', PRECO.latte], [2, 'Cookie Tostado', PRECO.cookie]], 'Pix online'),
  pedido('p4', 'Lucas Andrade', [[1, 'Coado da Torra', PRECO.coado], [1, 'Croissant Amanteigado', PRECO.croissant]], 'Cartão online'),
]

/** O pedido que atravessa o balcão na seção "Do balcão à porta". */
export const PEDIDO_BALCAO = PEDIDOS_DEMO[0]

/** "R$ 1.234,50" — montado à mão: o mesmo texto no servidor e no navegador. */
export function reais(centavos: number) {
  const [inteiro, fracao] = (Math.round(centavos) / 100).toFixed(2).split('.')
  return `R$ ${inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${fracao}`
}

export function resumoItens(itens: ItemPedido[]) {
  return itens.map((i) => `${i.qtd}× ${i.nome}`).join(', ')
}
