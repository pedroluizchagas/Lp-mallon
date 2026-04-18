import { cn } from '@/lib/utils'

type BadgeVariant = 'green' | 'amber' | 'outline' | 'dark'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  green:
    'bg-verde-medio/10 text-verde-profundo border border-verde-medio/30',
  amber:
    'bg-ambar/10 text-[#a06d00] border border-ambar/30',
  outline:
    'border border-verde-profundo/20 text-verde-profundo bg-transparent',
  dark:
    'bg-verde-profundo text-white',
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
