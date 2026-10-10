import Image from 'next/image'
import { cn } from '@mallevo/ui'
import type { LojaVitrine } from '../../dados/shopping'
import { ConsumerIcon } from '../marca/ConsumerIcon'

/**
 * Fachada da loja vista do corredor (components/home/FachadaLoja.tsx do
 * app), em pontos do app. Veste a pele da PRÓPRIA loja — fundo, tinta,
 * accent e fonte de display —; a caixa é a da casa (raios fixos) e o único
 * cromo Mallevo é o Seguir.
 */
export function FachadaLoja({ loja, largura = 340 }: { loja: LojaVitrine; largura?: number }) {
  const { pele } = loja
  const tile = Math.floor((largura - 16 * 2 - 10 * 2) / 3)

  return (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-[20px] shadow-[0_8px_18px_rgb(0_0_0/0.1)]', loja.corpo)}
      style={{ width: largura, backgroundColor: pele.bg, color: pele.ink }}
    >
      {/* Hero: banner que se dissolve no fundo do card, sem linha nem degrau. */}
      <div className="relative h-[224px]">
        <Image src={loja.banner} alt="" fill sizes="340px" className="object-cover" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgb(17 18 22 / 0.42) 0%, transparent 38%, transparent 42%, ${pele.bg}47 60%, ${pele.bg}b8 80%, ${pele.bg} 100%)`,
          }}
        />
        <span className="absolute left-[14px] top-[14px] rounded-full bg-white/92 px-[10px] py-[5px] text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
          {loja.categoria} • {loja.piso}
        </span>
        <span className="absolute right-[14px] top-[12px] rounded-full border border-accent px-[12px] py-[5px] text-[12px] font-bold text-accent">
          Seguir
        </span>
      </div>

      {/* Identidade: o tijolo pousa dentro da zona dissolvida. */}
      <div className="relative -mt-[44px] px-[16px]">
        <span
          className={cn('flex size-[60px] items-center justify-center rounded-[14px] text-[22px]', loja.display)}
          style={{ backgroundColor: pele.accent, color: pele.accentInk }}
        >
          {loja.iniciais}
        </span>
        <p className={cn('mt-[10px] truncate text-[22px] leading-[1.1]', loja.display)} style={{ ['--loja-accent' as string]: pele.accent }}>
          {loja.nome}
        </p>
        <p className="mt-[4px] truncate text-[13px]" style={{ color: pele.inkMuted }}>
          {loja.descricao}
        </p>
      </div>

      {/* Vitrine: rótulo do piso + 3 produtos. */}
      <div className="px-[16px] pt-[16px]">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.1em]" style={{ color: pele.inkMuted }}>
            {loja.rotuloVitrine}
          </span>
          <span className="flex items-center gap-[2px] text-[12px] font-bold">
            {loja.link}
            <ConsumerIcon name="chevron-right" size={13} strokeWidth={2.2} />
          </span>
        </div>
        <div className="mt-[10px] flex gap-[10px]">
          {loja.produtos.map((p) => (
            <div key={p.nome} className="rounded-[14px] p-[10px]" style={{ width: tile, backgroundColor: pele.surface }}>
              <div className="relative aspect-square overflow-hidden rounded-[8px]">
                <Image src={p.foto} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <p className="mt-[7px] truncate text-[11.5px] font-semibold">{p.nome}</p>
              <p className="text-[11.5px] font-bold" style={{ color: pele.inkMuted }}>
                {p.preco}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé: entrega à esquerda, convite do piso à direita. */}
      <div className="flex items-center justify-between px-[16px] pb-[16px] pt-[14px]">
        <span className="flex items-center gap-[6px] text-[12px] font-semibold" style={{ color: pele.inkMuted }}>
          <ConsumerIcon name="clock" size={14} />
          {loja.tempo} · {loja.frete}
        </span>
        <span
          className="rounded-full px-[14px] py-[8px] text-[12.5px] font-extrabold"
          style={{ backgroundColor: pele.accent, color: pele.accentInk }}
        >
          {loja.cta}
        </span>
      </div>
    </div>
  )
}
