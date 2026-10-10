'use client'

import { motion } from 'framer-motion'
import { useSafeReducedMotion } from './useSafeReducedMotion'
import { EASE } from './easing'

interface BlurInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: number
  duration?: number
}

/** Entra desfocado e assenta nítido — a revelação de blocos de texto e cards. */
export default function BlurIn({
  children,
  className,
  delay = 0,
  y = 18,
  blur = 10,
  duration = 0.9,
}: BlurInProps) {
  const reduce = useSafeReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        oculto: { opacity: 0, y, filter: `blur(${blur}px)` },
        // Sem filtro residual: `blur(0)` ainda isolaria o backdrop-filter dos filhos.
        visivel: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration, delay, ease: EASE.entrada },
          transitionEnd: { filter: 'none' },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
