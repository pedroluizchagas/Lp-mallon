import { cn } from '@mallevo/ui'
import { LINKS } from '../../lib/links'

/**
 * Botões das lojas de apps para o app do entregador (Entregadores Mallevo). Sem
 * URL configurada o app ainda não está publicado: o botão vira um aviso
 * honesto ("Em breve"), nunca um link morto.
 */
export function BotoesLojas({ tom = 'escuro', className }: { tom?: 'escuro' | 'claro'; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <BotaoLoja loja="apple" url={LINKS.appStore} tom={tom} />
      <BotaoLoja loja="google" url={LINKS.playStore} tom={tom} />
    </div>
  )
}

function BotaoLoja({
  loja,
  url,
  tom,
}: {
  loja: 'apple' | 'google'
  url: string | null
  tom: 'escuro' | 'claro'
}) {
  const nome = loja === 'apple' ? 'App Store' : 'Google Play'
  const chamada = url ? (loja === 'apple' ? 'Baixar na' : 'Disponível no') : 'Em breve na'
  const classe = cn(
    'group inline-flex h-14 min-w-[172px] items-center gap-3 rounded-2xl pl-4 pr-6 transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-entrada)]',
    tom === 'escuro'
      ? 'bg-white text-ink shadow-[0_18px_40px_-18px_rgb(193_241_72/0.45)]'
      : 'bg-ink text-white shadow-[0_18px_40px_-20px_rgb(17_18_22/0.6)]',
    url ? 'hover:-translate-y-0.5' : 'cursor-default opacity-90',
  )
  const conteudo = (
    <>
      {loja === 'apple' ? <MarcaApple /> : <MarcaGooglePlay />}
      <span className="flex flex-col text-left leading-none">
        <span className={cn('text-[11px] font-semibold', tom === 'escuro' ? 'text-ink-muted' : 'text-white/60')}>
          {chamada}
        </span>
        <span className="mt-1 text-[17px] font-bold tracking-[-0.02em]">{nome}</span>
      </span>
    </>
  )

  if (!url) {
    return (
      <span className={classe} aria-label={`${nome}: em breve`}>
        {conteudo}
      </span>
    )
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={classe} aria-label={`Baixar o Entregadores Mallevo na ${nome}`}>
      {conteudo}
    </a>
  )
}

/** Glifo da Apple (Simple Icons, CC0). */
function MarcaApple() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

/** Glifo do Google Play (Simple Icons, CC0). */
function MarcaGooglePlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  )
}
