'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from './useSafeReducedMotion'

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset']

export interface ScrollWordsPart {
  text: string
  className?: string
}

interface ScrollWordsProps {
  parts: ScrollWordsPart[]
  as?: 'h2' | 'h3' | 'p'
  className?: string
  /** Opacidade da palavra ainda "apagada". */
  dim?: number
  /** Janela de rolagem em que o texto acende (useScroll offset). */
  offset?: ScrollOffset
}

/**
 * O texto acende palavra a palavra conforme a rolagem — a leitura acompanha
 * o dedo. Cada parte pode ter estilo próprio (ex.: o trecho em itálico).
 */
export default function ScrollWords({
  parts,
  as: Tag = 'p',
  className,
  dim = 0.16,
  offset = ['start 0.85', 'end 0.5'],
}: ScrollWordsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset })

  const words = parts.flatMap((part) =>
    part.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: part.className })),
  )

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map(({ word, className: wordClass }, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            dim={reduce ? 1 : dim}
            className={wordClass}
          >
            {word}
          </Word>
        ))}
      </Tag>
    </div>
  )
}

function Word({
  children,
  progress,
  range,
  dim,
  className,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  dim: number
  className?: string
}) {
  const opacity = useTransform(progress, range, [dim, 1])
  return (
    <>
      <motion.span className={className} style={{ opacity }}>
        {children}
      </motion.span>{' '}
    </>
  )
}
