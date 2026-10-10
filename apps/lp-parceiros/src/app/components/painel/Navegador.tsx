import { cn } from '@mallevo/ui'
import { PAINEL_H, PAINEL_W } from './TelaPainel'

/**
 * Moldura do painel no navegador. A tela é desenhada em pixels do desktop
 * (1240 × 780) e escalada por `--k` (defina na `className`, ex.
 * `[--k:0.3] lg:[--k:0.82]`) — CSS puro, como o Celular.
 */
export function Navegador({
  children,
  className,
  rotulo,
}: {
  children: React.ReactNode
  className?: string
  rotulo: string
}) {
  return (
    <div
      role="img"
      aria-label={rotulo}
      className={cn('relative shrink-0 [--k:0.5]', className)}
      style={{ width: `calc(${PAINEL_W}px * var(--k))`, height: `calc(${PAINEL_H}px * var(--k))` }}
    >
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: PAINEL_W, height: PAINEL_H, transform: 'scale(var(--k))' }}>
        <div
          aria-hidden
          className="h-full w-full overflow-hidden rounded-[22px] shadow-[0_60px_120px_-40px_rgb(17_18_22/0.55),0_30px_60px_-30px_rgb(17_18_22/0.35)] ring-1 ring-ink/10"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
