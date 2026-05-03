import { cn } from '@/lib/utils'

type BadgeVariant = 'lime' | 'green' | 'outline' | 'dark'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  lime:
    'bg-lime/20 text-ink border border-lime/50 font-semibold',
  green:
    'bg-accent/10 text-accent border border-accent/30',
  outline:
    'border border-dark/20 text-ink bg-transparent',
  dark:
    'bg-dark text-white',
}

export default function Badge({
  children,
  variant = 'green',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
