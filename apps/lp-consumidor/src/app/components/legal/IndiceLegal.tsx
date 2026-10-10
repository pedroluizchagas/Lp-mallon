'use client'

import { useEffect, useState } from 'react'
import { cn } from '@mallevo/ui'
import { dois } from '../../lib/divinopolis'

export interface ItemIndice {
  id: string
  titulo: string
}

/**
 * Índice do documento. No desktop fica preso ao lado do texto e acende a
 * seção que está sendo lida; no celular vira uma gaveta no topo.
 */
export function IndiceLegal({ itens }: { itens: ItemIndice[] }) {
  const [atual, setAtual] = useState<string | null>(null)

  useEffect(() => {
    const secoes = itens
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visivel) setAtual(visivel.target.id)
      },
      // Uma faixa no terço de cima da tela: a seção "em leitura" é a que passa por ali.
      { rootMargin: '-18% 0px -70% 0px' },
    )
    secoes.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [itens])

  const lista = (
    <ol className="space-y-0.5">
      {itens.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={atual === item.id ? 'true' : undefined}
            className={cn(
              'group flex gap-3 rounded-xl px-3 py-2 text-[14px] leading-snug transition-colors',
              atual === item.id ? 'bg-white font-semibold text-ink shadow-[0_1px_0_rgb(17_18_22/0.04)]' : 'text-ink-muted hover:text-ink',
            )}
          >
            <span className={cn('w-5 shrink-0 font-mono text-[12px] tabular-nums', atual === item.id ? 'text-ink' : 'text-ink-muted')}>
              {dois(i + 1)}
            </span>
            {item.titulo}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <details className="group rounded-[20px] bg-white/80 ring-1 ring-ink/[0.06] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[15px] font-semibold text-ink">
          Nesta página
          <span className="text-[13px] font-medium text-ink-muted">{itens.length} seções</span>
        </summary>
        <div className="px-2 pb-3">{lista}</div>
      </details>
      <div className="hidden lg:block">
        <p className="micro px-3 text-ink-muted">Nesta página</p>
        <div className="mt-3">{lista}</div>
      </div>
    </>
  )
}
