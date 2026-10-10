import { cn } from '@mallevo/ui'
import { ConsumerIcon, type ConsumerIconName } from '../marca/ConsumerIcon'

type Variante = 'acesa' | 'vidro' | 'tinta' | 'contorno'

const VARIANTES: Record<Variante, string> = {
  // CTA primário do app: lima com tinta ink — nunca texto branco sobre lima.
  acesa: 'bg-accent text-ink shadow-[0_14px_36px_-14px_rgb(193_241_72/0.65)] hover:bg-accent-strong',
  vidro: 'bg-white/[0.08] text-white ring-1 ring-inset ring-white/10 backdrop-blur-md hover:bg-white/[0.13]',
  tinta: 'bg-ink text-white hover:bg-surface-dark',
  contorno: 'text-ink ring-1 ring-inset ring-ink/15 hover:bg-ink hover:text-white',
}

/** Botão-pílula da casa (âncora). A seta corre um passo no hover. */
export function Botao({
  href,
  children,
  variante = 'acesa',
  icone = 'chevron-right',
  externo = false,
  className,
}: {
  href: string
  children: React.ReactNode
  variante?: Variante
  icone?: ConsumerIconName | null
  externo?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-bold tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-entrada)] active:scale-[0.97]',
        VARIANTES[variante],
        className,
      )}
    >
      <span>{children}</span>
      {icone && (
        <ConsumerIcon
          name={icone}
          size={17}
          strokeWidth={2.4}
          className="transition-transform duration-300 ease-[var(--ease-entrada)] group-hover:translate-x-0.5"
        />
      )}
    </a>
  )
}
