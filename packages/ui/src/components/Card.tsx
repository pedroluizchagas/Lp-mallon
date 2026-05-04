'use client'

import { cn } from '../lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  highlight?: boolean
}

export default function Card({
  children,
  className,
  hover = false,
  highlight = false,
}: CardProps) {
  const base = cn(
    'bg-white rounded-2xl border',
    highlight
      ? 'border-lime shadow-lg shadow-lime/15'
      : 'border-surface-alt shadow-sm',
    className
  )

  if (hover) {
    return (
      <motion.div
        className={base}
        whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(15,15,13,0.10)' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}
