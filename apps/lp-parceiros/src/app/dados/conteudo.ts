/**
 * O post que a landing publica: o do Café Aroma no conjunto de
 * demonstração do app (mobile-consumer/lib/mock/feed.ts) — legenda, tags e
 * produto vinculado de lá.
 */
export const POST_DEMO = {
  loja: 'Café Aroma',
  inicial: 'C',
  foto: '/images/shopping/posts/cafe-coado.webp',
  descricao:
    'Lote novo chegou do Cerrado Mineiro: torra média, notas de chocolate ao leite e castanha. Moemos na hora, do coado ao espresso.',
  tags: ['#cafe', '#cerradomineiro', '#torraartesanal'],
  produto: { nome: 'Café Coado da Casa 300ml', preco: 'R$ 9,90' },
}

/** O post que estava no topo do Explorar antes (outra loja do mock). */
export const POST_ANTERIOR = {
  loja: 'Burger House DV',
  inicial: 'B',
  foto: '/images/shopping/posts/burger-smash-duplo.webp',
  descricao:
    'Dois blends de 90g esmagados na chapa quente, cheddar derretendo por cima e bacon crocante. Sai em 18 minutos pra Divinópolis inteira.',
  tags: ['#smashburger', '#divinopolis'],
  produto: { nome: 'Smash Duplo Bacon', preco: 'R$ 32,90' },
}

export type PostExplorar = typeof POST_DEMO
