'use client'

import { motion, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from './useSafeReducedMotion'
import { cn } from '../lib/utils'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  /** Quanto do deslocamento do cursor o elemento acompanha (0–1). */
  strength?: number
}

/** O elemento é atraído pelo cursor e volta com mola ao soltar. Só mouse. */
export default function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useSafeReducedMotion()
  const mola = { stiffness: 240, damping: 18, mass: 0.5 }
  const x = useSpring(0, mola)
  const y = useSpring(0, mola)

  if (reduce) return <div className={cn('inline-block', className)}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
