'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'amber' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-verde-profundo text-white hover:bg-[#153d2e] active:scale-[0.98]',
  secondary:
    'bg-verde-medio text-white hover:bg-[#3d9e71] active:scale-[0.98]',
  outline:
    'border-2 border-verde-profundo text-verde-profundo hover:bg-verde-profundo hover:text-white active:scale-[0.98]',
  amber:
    'bg-ambar text-[#1A1A1A] font-semibold hover:bg-[#e8961a] active:scale-[0.98] shadow-lg shadow-ambar/20',
  ghost:
    'text-verde-profundo hover:text-verde-medio underline-offset-4 hover:underline',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  onClick,
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes} {...linkProps}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}
