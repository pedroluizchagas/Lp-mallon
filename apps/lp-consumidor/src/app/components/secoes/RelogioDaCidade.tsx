'use client'

import { NOME_DA_FASE, dois, eventosSolares, formatarMinuto, luzNoMinuto, useAgora } from '../../lib/divinopolis'

/** A hora de Divinópolis, a fase da luz e o sol de hoje — ao vivo, no rodapé. */
export function RelogioDaCidade() {
  const agora = useAgora(1000)
  const eventos = agora ? eventosSolares(agora) : null
  const luz = agora && eventos ? luzNoMinuto(agora.minutoDoDia, eventos) : null

  return (
    <div>
      <p className="micro flex items-center gap-2.5 text-white/60 lg:justify-end">
        <span className="size-2 rounded-full animate-pulso bg-accent" />
        Estamos em Divinópolis, MG
      </p>
      <p className="mt-3 font-mono text-[clamp(44px,4.4vw,72px)] font-medium tabular-nums leading-none tracking-[-0.05em] text-white">
        {agora ? `${dois(agora.hora)}:${dois(agora.minuto)}:${dois(agora.segundo)}` : '--:--:--'}
      </p>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-white/60 lg:justify-end">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ backgroundColor: luz?.cor ?? '#4A5A8F' }} />
          {luz ? NOME_DA_FASE[luz.fase] : '—'}
        </span>
        <span>·</span>
        <span>Nascer {eventos ? formatarMinuto(eventos.nascer) : '--:--'}</span>
        <span>·</span>
        <span>Pôr {eventos ? formatarMinuto(eventos.por) : '--:--'}</span>
        <span>·</span>
        <span>GMT-3</span>
      </p>
    </div>
  )
}
