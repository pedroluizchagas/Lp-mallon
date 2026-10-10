'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

/**
 * O mapa claro da entrega em curso ((tabs)/ativa.tsx usa o mapa do
 * sistema — react-native-maps — em tela cheia). Aqui, um desenho no mesmo
 * espírito e com o que o app põe nele: o pino da loja, o do cliente (acende
 * o da fase atual) e o ponto azul de "você está aqui". O app não traça a
 * rota — o caminho existe só para o ponto andar pelas ruas. `rota` (0–1) é
 * o quanto já foi percorrido; a loja fica em ATE_A_LOJA.
 *
 * A folha escura cobre o mapa a partir de ~290 pt: tudo o que importa mora
 * na faixa de cima, entre o botão de voltar e a folha.
 */

/** As ruas: x das verticais e y das horizontais (pontos do app). */
const RUAS_X = [44, 124, 204, 284, 352]
const RUAS_Y = [140, 206, 272, 350, 430, 510, 590, 670, 750]

const ROTA: [number, number][] = [
  [44, 272],
  [124, 272],
  [124, 206],
  [204, 206],
  [204, 140],
  [352, 140],
]
/** Índice da loja na rota: antes dela o entregador vai buscar; depois, entregar. */
const LOJA = 2

const TRECHOS = ROTA.slice(1).map((p, i) => Math.hypot(p[0] - ROTA[i][0], p[1] - ROTA[i][1]))
const TOTAL = TRECHOS.reduce((a, b) => a + b, 0)

function pontoNaRota(t: number): [number, number] {
  let falta = Math.max(0, Math.min(1, t)) * TOTAL
  for (let i = 0; i < TRECHOS.length; i++) {
    if (falta <= TRECHOS[i]) {
      const k = TRECHOS[i] === 0 ? 0 : falta / TRECHOS[i]
      return [ROTA[i][0] + (ROTA[i + 1][0] - ROTA[i][0]) * k, ROTA[i][1] + (ROTA[i + 1][1] - ROTA[i][1]) * k]
    }
    falta -= TRECHOS[i]
  }
  return ROTA[ROTA.length - 1]
}

/** O quanto da rota (0–1) fica até a loja. */
export const ATE_A_LOJA = TRECHOS.slice(0, LOJA).reduce((a, b) => a + b, 0) / TOTAL

/** Os quarteirões são os vãos entre as ruas (a borda da tela conta como rua). */
const BORDAS_X = [-10, ...RUAS_X, 400]
const BORDAS_Y = [-10, ...RUAS_Y, 854]
const QUARTEIROES = BORDAS_Y.slice(1).flatMap((y1, j) =>
  BORDAS_X.slice(1).map((x1, i) => ({ x0: BORDAS_X[i], y0: BORDAS_Y[j], x1, y1, chave: `${i}-${j}` })),
)
/** A praça: o quarteirão entre as ruas 204–284 e 206–272. */
const PRACA = '3-2'

export function MapaRua({ rota, fase }: { rota: MotionValue<number>; fase: 'loja' | 'cliente' }) {
  const cx = useTransform(rota, (t) => pontoNaRota(t)[0])
  const cy = useTransform(rota, (t) => pontoNaRota(t)[1])
  const loja = ROTA[LOJA]
  const casa = ROTA[ROTA.length - 1]

  return (
    <svg viewBox="0 0 390 844" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="390" height="844" fill="#FFFFFF" />
      {QUARTEIROES.map(({ x0, y0, x1, y1, chave }) => (
        <rect
          key={chave}
          x={x0 + 8}
          y={y0 + 8}
          width={x1 - x0 - 16}
          height={y1 - y0 - 16}
          rx="6"
          fill={chave === PRACA ? '#DDEBCF' : '#EEECE6'}
        />
      ))}
      {/* Loja e casa — o pino da fase atual acende */}
      <circle cx={loja[0]} cy={loja[1]} r="15" fill={fase === 'loja' ? '#C8F22E' : '#111216'} stroke="#111216" strokeWidth="3" />
      <circle cx={loja[0]} cy={loja[1]} r="5" fill={fase === 'loja' ? '#111216' : '#FFFFFF'} />
      <circle cx={casa[0]} cy={casa[1]} r="16" fill={fase === 'cliente' ? '#C8F22E' : '#9CA3AF'} stroke="#111216" strokeWidth="3" />
      <path d={`M${casa[0] - 6.5} ${casa[1] + 1} l6.5 -6 l6.5 6 v6.5 h-13 z`} fill="#111216" />
      {/* O entregador */}
      <motion.circle cx={cx} cy={cy} r="20" fill="rgb(91 183 255 / 0.18)" />
      <motion.circle cx={cx} cy={cy} r="9" fill="#5BB7FF" stroke="#FFFFFF" strokeWidth="3.5" />
    </svg>
  )
}
