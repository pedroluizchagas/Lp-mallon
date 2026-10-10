import { cn } from '@mallevo/ui'

/** Tela do app em pontos lógicos (iPhone 14/15), a medida em que as telas foram desenhadas. */
export const TELA_W = 390
export const TELA_H = 844
const BORDA = 12

/**
 * Moldura de celular. A tela é desenhada em pontos do app (390 × 844) e
 * escalada por `--k` (defina na `className`, ex. `[--k:0.7] lg:[--k:0.82]`)
 * — CSS puro, sem medir nada no cliente: o servidor já entrega no tamanho
 * certo e as telas guardam as proporções exatas do app.
 */
export function Celular({
  children,
  className,
  rotulo,
}: {
  children: React.ReactNode
  className?: string
  /** Descrição da tela para leitores (a moldura em si é decorativa). */
  rotulo: string
}) {
  const W = TELA_W + BORDA * 2
  const H = TELA_H + BORDA * 2
  return (
    <div
      role="img"
      aria-label={rotulo}
      className={cn('relative shrink-0 [--k:0.7]', className)}
      style={{ width: `calc(${W}px * var(--k))`, height: `calc(${H}px * var(--k))` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: 'scale(var(--k))' }}
      >
        <div
          className="relative h-full w-full rounded-[64px] bg-[#0b0b0d] shadow-[0_60px_120px_-40px_rgb(0_0_0/0.65),0_30px_60px_-30px_rgb(0_0_0/0.45)]"
          style={{ padding: BORDA }}
        >
          {/* aro metálico + botões laterais */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[64px] ring-1 ring-inset ring-white/[0.14]" />
          <div aria-hidden className="absolute -left-[3px] top-[180px] h-[34px] w-[3px] rounded-l bg-[#1d1d20]" />
          <div aria-hidden className="absolute -left-[3px] top-[236px] h-[62px] w-[3px] rounded-l bg-[#1d1d20]" />
          <div aria-hidden className="absolute -left-[3px] top-[310px] h-[62px] w-[3px] rounded-l bg-[#1d1d20]" />
          <div aria-hidden className="absolute -right-[3px] top-[262px] h-[96px] w-[3px] rounded-r bg-[#1d1d20]" />

          <div className="relative h-full w-full overflow-hidden rounded-[52px] bg-black" aria-hidden>
            {children}
            <div className="absolute left-1/2 top-[11px] z-50 h-[35px] w-[124px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  )
}
