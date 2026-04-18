'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  stagger?: boolean
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
  none: { y: 0, x: 0 },
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  stagger = false,
}: AnimatedSectionProps) {
  const { y, x } = directionMap[direction]

  if (stagger) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * HeadingReveal — mask animation para títulos de seção (padrão Arpeggio).
 * Cada linha desliza de baixo para cima atrás de um overflow-hidden.
 */
export function HeadingReveal({
  lines,
  className,
  delay = 0,
}: {
  lines: Array<{ text: string; accent?: boolean }>
  className?: string
  delay?: number
}) {
  return (
    <div className={cn(className)}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            className={cn(
              'block font-sora font-bold text-5xl lg:text-7xl leading-[0.95] tracking-tight',
              line.accent ? 'text-[#4CAF82]' : 'text-[#EDF7F2]'
            )}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line.text}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

/**
 * LabelReveal — anima o label de seção (ex: "Como funciona") com clip reveal.
 */
export function LabelReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.span
        className="block text-[#4CAF82] text-xs font-semibold uppercase tracking-[0.2em]"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </div>
  )
}
