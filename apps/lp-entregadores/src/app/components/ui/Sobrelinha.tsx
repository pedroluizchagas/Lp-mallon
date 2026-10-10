import { cn } from '@mallevo/ui'

/**
 * Sobrelinha de seção — o micro em caixa alta que abre cada letreiro do app
 * ("AO VIVO NO SHOPPING", "CAMINHANDO PELO PISO 1"). O ponto aceso marca o
 * que está ao vivo.
 */
export function Sobrelinha({
  children,
  tom = 'escuro',
  aoVivo = false,
  className,
}: {
  children: React.ReactNode
  tom?: 'escuro' | 'claro'
  aoVivo?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'micro flex items-center gap-2.5',
        tom === 'escuro' ? 'text-white/60' : 'text-ink-muted',
        aoVivo && tom === 'escuro' && 'text-accent',
        className,
      )}
    >
      {aoVivo && (
        <span className="relative flex size-2">
          <span
            className={cn(
              'absolute inset-0 rounded-full animate-pulso',
              tom === 'escuro' ? 'bg-accent' : 'bg-ink',
            )}
          />
        </span>
      )}
      {children}
    </p>
  )
}
