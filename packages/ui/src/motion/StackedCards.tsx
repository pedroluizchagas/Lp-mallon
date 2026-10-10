'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Children, useRef } from 'react'
import { useSafeReducedMotion } from './useSafeReducedMotion'
import { cn } from '../lib/utils'

interface StackedCardsProps {
  children: React.ReactNode
  className?: string
  /** Classes do card (ex.: o raio) — o véu de escurecimento herda o recorte. */
  cardClassName?: string
  /** Quanto cada card desce em relação ao anterior — as bordas de trás espiam. */
  step?: number
  /** Escala do card mais ao fundo quando a pilha fecha. */
  minScale?: number
}

/**
 * Pilha de cards fixos: cada um gruda na tela e o seguinte sobe por cima;
 * os de trás encolhem e escurecem, como folhas empilhadas.
 */
export default function StackedCards({
  children,
  className,
  cardClassName,
  step = 18,
  minScale = 0.86,
}: StackedCardsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const cards = Children.toArray(children)

  if (reduce) {
    return <div className={cn('flex flex-col gap-6', className)}>{cards}</div>
  }

  return (
    <div ref={ref} className={className}>
      {cards.map((card, i) => (
        <StackedCard
          key={i}
          index={i}
          total={cards.length}
          progress={scrollYProgress}
          step={step}
          minScale={minScale}
          className={cardClassName}
        >
          {card}
        </StackedCard>
      ))}
    </div>
  )
}

function StackedCard({
  children,
  index,
  total,
  progress,
  step,
  minScale,
  className,
}: {
  children: React.ReactNode
  index: number
  total: number
  progress: MotionValue<number>
  step: number
  minScale: number
  className?: string
}) {
  const ultimo = Math.max(1, total - 1)
  const final = index >= total - 1
  // O último card nunca é coberto: faixa [1, 1] dividiria por zero.
  const chega = final ? 0 : index / ultimo
  const coberto = final ? 1 : (index + 1) / ultimo
  const alvo = final ? 1 : 1 - ((total - 1 - index) / ultimo) * (1 - minScale)
  const scale = useTransform(progress, [chega, 1], [1, alvo])
  const sombra = useTransform(progress, [chega, coberto], [0, final ? 0 : 0.42])

  return (
    <div className="sticky top-0 flex h-svh items-center justify-center">
      <motion.div
        className={cn('relative w-full origin-top will-change-transform', className)}
        style={{ scale, top: `calc(-4vh + ${index * step}px)` }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black"
          style={{ opacity: sombra }}
        />
      </motion.div>
    </div>
  )
}
