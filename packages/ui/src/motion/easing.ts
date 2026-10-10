/**
 * Curvas e durações de movimento da Mallevo.
 *
 * As curvas são as mesmas do app (TransicaoMallevo / SplashLoja):
 * ENTRADA desacelera ao chegar, SAÍDA acelera ao sair e SUAVE serve ao que
 * já está na tela. A CORTINA é a curva das aberturas de página (sobe e
 * assenta sem tranco). Uma curva-assinatura para quase tudo: ENTRADA.
 */
export const EASE = {
  entrada: [0.16, 1, 0.3, 1],
  saida: [0.3, 0, 1, 1],
  suave: [0.4, 0, 0.2, 1],
  cortina: [0.76, 0, 0.24, 1],
} as const

/** Paleta de durações (s): micro-interação, revelação de bloco, cena. */
export const DURATION = {
  quick: 0.22,
  base: 0.7,
  slow: 1.1,
} as const
