'use client'

import { motion } from 'framer-motion'
import { useSafeReducedMotion } from './useSafeReducedMotion'
import { cn } from '../lib/utils'
import { EASE } from './easing'

interface RevealLinesProps {
  lines: React.ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  duration?: number
}

/**
 * Cada linha sobe de dentro da própria máscara (overflow escondido), em
 * cascata — a revelação de título da casa. O texto é real no DOM; só o
 * deslocamento é animado.
 *
 * O gatilho fica no bloco, não na linha: a linha começa fora da máscara, e
 * o IntersectionObserver desconta o recorte do pai — observada sozinha, ela
 * nunca "entraria na tela".
 */
export default function RevealLines({
  lines,
  as = 'div',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  duration = 1,
}: RevealLinesProps) {
  const reduce = useSafeReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={reduce ? false : 'oculto'}
      whileInView="visivel"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{
        oculto: {},
        visivel: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          // Folga para descendentes (g, p, ç) e para o itálico não cortar.
          className={cn('block overflow-hidden pb-[0.1em] -mb-[0.1em] pr-[0.12em] -mr-[0.12em]', lineClassName)}
        >
          <motion.span
            className="block will-change-transform"
            variants={{
              oculto: { y: '112%' },
              visivel: { y: '0%', transition: { duration, ease: EASE.entrada } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
