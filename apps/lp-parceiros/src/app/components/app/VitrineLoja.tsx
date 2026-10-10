import Image from 'next/image'
import { cn } from '@mallevo/ui'
import type { LojaVitrine } from '../../dados/vitrines'
import { PartnerIcon } from '../marca/PartnerIcon'

/** "Café Aroma" → "CA"; "Padaria" → "PA" (TijoloLoja do app). */
export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return '?'
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return (partes[0][0] + partes[1][0]).toUpperCase()
}

/** Nome comprido encolhe a letra: a vitrine cabe em qualquer nome de loja. */
function tamanhoDoNome(nome: string) {
  if (nome.length > 20) return 'text-[clamp(28px,3.4vw,60px)]'
  if (nome.length > 12) return 'text-[clamp(32px,4.2vw,76px)]'
  return 'text-[clamp(38px,5vw,92px)]'
}

/**
 * A vitrine de uma loja, na pele do arquétipo dela: cores e fontes são os
 * tokens reais (store-theme/presets.ts). `nome` troca o nome da loja — é
 * assim que o provador veste a loja de quem está lendo.
 */
export function VitrineLoja({
  loja,
  nome = loja.nome,
  className,
  prioridade = false,
}: {
  loja: LojaVitrine
  nome?: string
  className?: string
  prioridade?: boolean
}) {
  const { pele } = loja
  return (
    <article
      aria-label={`Vitrine ${loja.vitrine.nome}: ${nome}`}
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-[28px] [container-type:size] md:flex-row md:rounded-[40px]',
        className,
      )}
      style={{ backgroundColor: pele.bg, color: pele.ink, ['--loja-accent' as string]: pele.accent }}
    >
      {/* Foto da casa */}
      <div className="relative h-[30%] shrink-0 p-2.5 md:order-2 md:h-auto md:w-1/2 md:p-4">
        <div className="relative h-full overflow-hidden rounded-[20px] md:rounded-[28px]">
          <Image
            src={loja.banner}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={prioridade}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink md:left-5 md:top-5">
            {loja.categoria} • {loja.piso}
          </span>
          <div className="absolute inset-x-5 bottom-5 hidden items-end justify-between gap-6 text-white md:flex">
            <p className="micro">Vitrine {loja.vitrine.nome}</p>
            <p className="text-right text-[13px] text-white/80">{loja.vitrine.mood.join(' · ')}</p>
          </div>
        </div>
      </div>

      {/* A loja, na voz dela */}
      <div className={cn('flex min-h-0 flex-1 flex-col p-5 md:order-1 md:p-8 lg:p-10', loja.corpo)}>
        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <span
            className={cn('flex size-12 shrink-0 items-center justify-center rounded-[14px] text-[18px] md:size-14 md:text-[20px]', loja.display)}
            style={{ backgroundColor: pele.accent, color: pele.accentInk }}
          >
            {iniciais(nome)}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: pele.inkMuted }}>
              Vitrine {loja.vitrine.nome}
            </p>
            <p className="mt-0.5 hidden text-[13.5px] leading-snug md:line-clamp-2" style={{ color: pele.inkMuted }}>
              {loja.vitrine.descricao}
            </p>
          </div>
        </div>

        <h3 className={cn('mt-5 shrink-0 break-words leading-[0.92] md:mt-6', tamanhoDoNome(nome), loja.display)}>{nome}</h3>
        {/* line-clamp zera o min-height do item flex: o layout precisa caber para o texto não sumir. */}
        <p className="mt-3 line-clamp-2 max-w-[38ch] text-[15px] leading-relaxed md:mt-4 md:text-[17px]" style={{ color: pele.inkMuted }}>
          {loja.descricao}
        </p>

        <div className="mt-auto shrink-0 pt-5">
          {/* Cartão baixo (o palco do manifesto em telas curtas): a grade de produtos sai. */}
          <div className="flex items-center justify-between [@container_(max-height:580px)]:hidden">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: pele.inkMuted }}>
              {loja.rotuloVitrine}
            </span>
            <span className="flex items-center gap-1 text-[13px] font-bold">
              {loja.link}
              <PartnerIcon name="chevron-right" size={14} strokeWidth={2.2} />
            </span>
          </div>
          <ul className="mt-3 grid max-w-[460px] grid-cols-3 gap-2.5 md:gap-3 [@container_(max-height:580px)]:hidden">
            {loja.produtos.map((p) => (
              <li key={p.nome} className="min-w-0 rounded-[14px] p-2 md:p-2.5" style={{ backgroundColor: pele.surface }}>
                <div className="relative aspect-square overflow-hidden rounded-[8px] md:rounded-[10px]">
                  <Image src={p.foto} alt={p.nome} fill sizes="(min-width: 768px) 180px, 30vw" className="object-cover" />
                </div>
                <p className="mt-2 truncate text-[12px] font-semibold md:text-[13.5px]">{p.nome}</p>
                <p className="truncate text-[12px] font-bold md:text-[13px]" style={{ color: pele.inkMuted }}>
                  {p.preco}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3 md:mt-5">
            <span className="flex min-w-0 items-center gap-2 text-[12.5px] font-semibold md:text-[14px]" style={{ color: pele.inkMuted }}>
              <PartnerIcon name="clock" size={16} className="shrink-0" />
              <span className="truncate">
                Entrega em {loja.tempo} · {loja.freteGratis ? 'Frete grátis' : loja.frete}
              </span>
            </span>
            <span
              className="shrink-0 rounded-full px-5 py-2.5 text-[13px] font-extrabold md:px-6 md:py-3 md:text-[15px]"
              style={{ backgroundColor: pele.accent, color: pele.accentInk }}
            >
              {loja.cta}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
