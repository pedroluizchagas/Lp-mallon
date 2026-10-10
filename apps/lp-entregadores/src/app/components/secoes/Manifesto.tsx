'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn, useSafeReducedMotion } from '@mallevo/ui'
import { CourierIcon } from '../marca/CourierIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

type Ponto = [number, number]

/**
 * A rota de cada desenho (pontos no viewBox): do balcão (primeiro) à porta
 * (último). Ela contorna o texto — sobe pela esquerda e cruza por cima —
 * para o entregador nunca passar por cima da frase.
 */
const ROTA_LARGA: Ponto[] = [
  [200, 730],
  [200, 560],
  [290, 560],
  [290, 190],
  [760, 190],
  [760, 135],
  [1240, 135],
  [1240, 210],
]
const ROTA_ALTA: Ponto[] = [
  [70, 790],
  [70, 712],
  [16, 712],
  [16, 196],
  [196, 196],
  [196, 136],
  [326, 136],
]

function medir(rota: Ponto[]) {
  const trechos = rota.slice(1).map((p, i) => Math.hypot(p[0] - rota[i][0], p[1] - rota[i][1]))
  return { trechos, total: trechos.reduce((a, b) => a + b, 0) }
}

function pontoNa(rota: Ponto[], t: number): Ponto {
  const { trechos, total } = medir(rota)
  let falta = Math.max(0, Math.min(1, t)) * total
  for (let i = 0; i < trechos.length; i++) {
    if (falta <= trechos[i]) {
      const k = trechos[i] === 0 ? 0 : falta / trechos[i]
      return [rota[i][0] + (rota[i + 1][0] - rota[i][0]) * k, rota[i][1] + (rota[i + 1][1] - rota[i][1]) * k]
    }
    falta -= trechos[i]
  }
  return rota[rota.length - 1]
}

const FRASE: { texto: string; acesa?: boolean }[] = [
  { texto: 'Entre' },
  { texto: 'o' },
  { texto: 'balcão' },
  { texto: 'e' },
  { texto: 'a' },
  { texto: 'porta,' },
  { texto: 'tem', acesa: true },
  { texto: 'você.', acesa: true },
]

/**
 * Manifesto — onde o entregador entra na história do shopping. A seção
 * gruda; a rota se desenha do balcão até a porta conforme a rolagem, o
 * entregador anda junto e a frase acende palavra a palavra. No fim, a folha
 * clara sobe por cima.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const percurso = useTransform(p, [0.08, 0.72], [0, 1], { clamp: true })
  const legenda = useTransform(p, [0.62, 0.74], [0, 1])
  const legendaY = useTransform(p, [0.62, 0.74], [24, 0])
  const recuo = useTransform(p, [0.84, 1], [1, 0.93])
  const veu = useTransform(p, [0.84, 1], [0, 0.55])

  if (reduce) {
    return (
      // A folha clara sobe 30vh por cima desta seção: o respiro de baixo desconta isso.
      <section
        id="manifesto"
        data-tema="escuro"
        className="relative bg-marquee px-5 pb-[calc(30vh+7rem)] pt-28 text-center md:px-8"
      >
        <Sobrelinha aoVivo className="justify-center">
          Da loja ao cliente
        </Sobrelinha>
        <h2 className="mx-auto mt-6 max-w-[16ch] text-[clamp(40px,6vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
          Entre o balcão e a porta, <span className="italic text-accent">tem você.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-[480px] text-[17px] leading-[1.6] text-white/66">
          Cada pedido do shopping termina numa porta de Divinópolis. Quem leva até lá é o entregador — e o app mostra o
          caminho.
        </p>
      </section>
    )
  }

  return (
    <section ref={ref} id="manifesto" data-tema="escuro" className="relative h-[300vh] bg-marquee">
      <motion.div className="sticky top-0 h-svh overflow-hidden" style={{ scale: recuo }}>
        <div aria-hidden className="glow-marquise absolute inset-0 opacity-70" />

        <Desenho
          rota={ROTA_LARGA}
          largura={1440}
          altura={900}
          percurso={percurso}
          className="hidden [@media(min-aspect-ratio:1/1)]:block"
        />
        <Desenho
          rota={ROTA_ALTA}
          largura={390}
          altura={844}
          percurso={percurso}
          className="[@media(min-aspect-ratio:1/1)]:hidden"
        />

        <div className="pointer-events-none relative z-20 flex h-full flex-col items-center justify-center px-5 text-center">
          <Sobrelinha aoVivo>Da loja ao cliente</Sobrelinha>
          <h2 className="mt-6 max-w-[13ch] text-[clamp(40px,6.2vw,108px)] font-semibold leading-[0.95] tracking-[-0.045em] text-white [text-shadow:0_4px_40px_rgb(24_24_27/0.95)]">
            {FRASE.map((palavra, i) => (
              <Palavra key={i} progresso={p} indice={i} total={FRASE.length} acesa={palavra.acesa}>
                {palavra.texto}
              </Palavra>
            ))}
          </h2>
          <motion.p
            className="mt-8 max-w-[440px] text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-white/66 [text-shadow:0_2px_24px_rgb(24_24_27/0.95)]"
            style={{ opacity: legenda, y: legendaY }}
          >
            Cada pedido do shopping termina numa porta de Divinópolis. Quem leva até lá é o entregador — e o app mostra o
            caminho.
          </motion.p>
        </div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-40 bg-black" style={{ opacity: veu }} />
      </motion.div>
    </section>
  )
}

/** A malha da cidade, a rota acendendo e o entregador sobre ela. */
function Desenho({
  rota,
  largura,
  altura,
  percurso,
  className,
}: {
  rota: Ponto[]
  largura: number
  altura: number
  percurso: MotionValue<number>
  className?: string
}) {
  const caminho = `M${rota.map(([x, y]) => `${x} ${y}`).join(' L')}`
  const cx = useTransform(percurso, (t) => pontoNa(rota, t)[0])
  const cy = useTransform(percurso, (t) => pontoNa(rota, t)[1])
  const balcao = rota[0]
  const porta = rota[rota.length - 1]
  const passoX = largura / 9
  const passoY = altura / 7
  const portaAcesa = useTransform(percurso, [0.96, 1], [0, 1])

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${largura} ${altura}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('absolute inset-0 h-full w-full', className)}
    >
      <g stroke="rgb(255 255 255 / 0.05)" strokeWidth="1.5">
        {Array.from({ length: 10 }, (_, i) => (
          <path key={`v${i}`} d={`M${i * passoX} 0 V${altura}`} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`h${i}`} d={`M0 ${i * passoY} H${largura}`} />
        ))}
      </g>
      <path d={caminho} stroke="rgb(255 255 255 / 0.14)" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" fill="none" />
      <motion.path d={caminho} stroke="#D8FF3E" strokeOpacity="0.14" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ pathLength: percurso }} />
      <motion.path d={caminho} stroke="#D8FF3E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ pathLength: percurso }} />

      {/* O balcão */}
      <g transform={`translate(${balcao[0]} ${balcao[1]})`}>
        <circle r="30" fill="#18181B" stroke="#D8FF3E" strokeWidth="3" />
        <g transform="translate(-13 -13)">
          <CourierIcon name="store" size={26} color="#D8FF3E" strokeWidth={1.9} />
        </g>
      </g>
      {/* A porta: acende quando o entregador chega */}
      <g transform={`translate(${porta[0]} ${porta[1]})`}>
        <circle r="30" fill="#FFFFFF" />
        <motion.circle r="44" fill="none" stroke="#D8FF3E" strokeWidth="3" style={{ opacity: portaAcesa }} />
        <g transform="translate(-13 -13)">
          <CourierIcon name="home" size={26} color="#111216" strokeWidth={2} />
        </g>
      </g>
      {/* O entregador */}
      <motion.circle cx={cx} cy={cy} r="26" fill="rgb(216 255 62 / 0.18)" />
      <motion.circle cx={cx} cy={cy} r="12" fill="#D8FF3E" stroke="#111216" strokeWidth="4" />
    </svg>
  )
}

function Palavra({
  children,
  progresso,
  indice,
  total,
  acesa,
}: {
  children: string
  progresso: MotionValue<number>
  indice: number
  total: number
  acesa?: boolean
}) {
  // As palavras acendem enquanto a rota anda, uma após a outra.
  const inicio = 0.06 + (indice / total) * 0.56
  const opacity = useTransform(progresso, [inicio, inicio + 0.08], [0.14, 1])
  return (
    <>
      <motion.span style={{ opacity }} className={cn(acesa && 'italic text-accent')}>
        {children}
      </motion.span>{' '}
    </>
  )
}
