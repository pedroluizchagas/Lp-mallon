'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from './useSafeReducedMotion'
import { cn } from '../lib/utils'
import { EASE } from './easing'

interface CounterProps {
  value: number
  /** Zeros à esquerda: `digits={2}` mostra 9 como "09". */
  digits?: number
  className?: string
  duration?: number
}

const DIGITOS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

/**
 * Número de odômetro: cada dígito é uma fita de 0–9 que rola até o valor
 * quando entra na tela. O valor final já está no HTML (leitores de tela e
 * buscadores leem o número, não a fita).
 */
export default function Counter({ value, digits = 1, className, duration = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useSafeReducedMotion()
  const texto = String(Math.max(0, Math.round(value))).padStart(digits, '0')

  return (
    <span ref={ref} className={cn('inline-flex tabular-nums', className)}>
      <span className="sr-only">{texto}</span>
      {texto.split('').map((d, i) => (
        <span
          key={i}
          aria-hidden
          className="relative inline-block h-[1em] overflow-hidden leading-none"
        >
          <span className="invisible block">0</span>
          <motion.span
            className="absolute inset-x-0 top-0 flex flex-col"
            initial={reduce ? false : { y: '0%' }}
            animate={{ y: inView || reduce ? `-${Number(d) * 10}%` : '0%' }}
            transition={{ duration, delay: i * 0.12, ease: EASE.entrada }}
          >
            {DIGITOS.map((n) => (
              <span key={n} className="block h-[1em] leading-none">
                {n}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
