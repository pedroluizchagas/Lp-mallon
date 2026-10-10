'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from '@mallevo/ui'

/**
 * A folha clara — o gesto central dos apps da casa: o conteúdo sobe por
 * cima da marquise como uma folha arredondada. Aqui ela cobre a rua do
 * manifesto e abre o passo a passo; a cúpula curva no topo se achata
 * conforme a folha assume a tela.
 */
export function Folha({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })
  const cupula = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={ref} data-tema="claro" className="vidro-fosco relative z-10 -mt-[30vh]">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-full h-[11vw] origin-bottom bg-canvas"
        style={{
          borderTopLeftRadius: '50% 100%',
          borderTopRightRadius: '50% 100%',
          scaleY: reduce ? 0 : cupula,
        }}
      />
      {children}
    </div>
  )
}
