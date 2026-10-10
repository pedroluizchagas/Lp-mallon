'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from './useSafeReducedMotion'

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  /** Fração da própria altura percorrida enquanto cruza a tela (+ desce, − sobe). */
  speed?: number
}

/** Desloca o conteúdo em velocidade própria enquanto ele atravessa a tela. */
export default function Parallax({ children, className, speed = 0.15 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])

  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  )
}
