import type { Oferta } from '../components/app/CartaoOferta'

/**
 * A rua que a landing mostra é a do app do entregador: os rótulos, as
 * etapas e os botões são os de Mall-online/apps/mobile-courier. A loja é o
 * Sushi Yamato do conjunto de demonstração do app (taxa de entrega R$ 8,90
 * no mock); entregador, cliente e endereços são fictícios.
 *
 * Nada de "quanto se ganha por dia" ou "quantos pedidos por dia": o valor
 * de cada entrega é a taxa que a loja define, e ele aparece no cartão antes
 * do aceite.
 */

export const ENTREGADOR_DEMO = {
  nome: 'João Silva',
  inicial: 'J',
}

export const OFERTA_DEMO: Oferta = {
  valor: 'R$ 8,90',
  loja: 'Sushi Yamato',
  lojaEndereco: 'Rua Goiás, 210 - Centro',
  clienteEndereco: 'Rua Pernambuco, 1.040 - Bom Pastor',
}

/** As ofertas que chegam, uma depois da outra, no celular do hero (taxas do mock). */
export const OFERTAS_DEMO: Oferta[] = [
  OFERTA_DEMO,
  {
    valor: 'R$ 5,90',
    loja: 'Burger House DV',
    lojaEndereco: 'Av. Primeiro de Junho, 845 - Centro',
    clienteEndereco: 'Rua Itapecerica, 312 - Sidil',
  },
  {
    valor: 'R$ 4,90',
    loja: 'Roxa Açaí',
    lojaEndereco: 'Rua São Paulo, 1.180 - Centro',
    clienteEndereco: 'Rua Rio de Janeiro, 77 - Niterói',
  },
]

export const ENTREGA_DEMO = {
  id: '#C4E19A07',
  loja: OFERTA_DEMO.loja,
  lojaEndereco: OFERTA_DEMO.lojaEndereco,
  cliente: 'Ana Beatriz',
  clienteEndereco: OFERTA_DEMO.clienteEndereco,
  valor: OFERTA_DEMO.valor,
}

/**
 * A aba Ganhos no período "Hoje": três entregas de lojas do mock, cada uma
 * com a taxa de entrega da própria loja (centavos). A primeira é a entrega
 * que a landing acompanha.
 */
export const GANHOS_DEMO = {
  periodo: 'Hoje',
  entregas: [
    { loja: 'Sushi Yamato', quando: '10 de out., 21:14', valor: 890 },
    { loja: 'Burger House DV', quando: '10 de out., 20:32', valor: 590 },
    { loja: 'Roxa Açaí', quando: '10 de out., 19:58', valor: 490 },
  ],
  total: 890 + 590 + 490,
}
