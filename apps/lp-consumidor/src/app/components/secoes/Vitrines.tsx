import Image from 'next/image'
import { BlurIn, Counter, RevealLines, StackedCards, cn } from '@mallevo/ui'
import { OUTRAS_VITRINES, VITRINES, type LojaVitrine } from '../../dados/shopping'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * Vitrines — cada loja com a própria pele. Os cards empilham como
 * folhas: a hamburgueria em bordô e caps pesadas, a pizzaria em cartaz
 * creme, a açaíteria em rosa-chiclete, o japonês em preto e ouro… Cores e
 * fontes são os tokens reais dos arquétipos (store-theme/presets.ts).
 */
export function Vitrines() {
  return (
    <section id="vitrines" className="relative px-3 md:px-6">
      <div className="mx-auto max-w-[1440px] px-2 pb-6 pt-6 md:px-2 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Vitrines</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Cada loja',
                <span key="acesa" className="italic">
                  <span className="marca-texto">com a sua cara.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex items-end gap-4">
              <Counter
                value={VITRINES.length + OUTRAS_VITRINES.length}
                className="text-[clamp(72px,7.6vw,128px)] font-semibold leading-none tracking-[-0.06em] text-ink"
              />
              <p className="mb-2 text-[15px] font-semibold leading-snug text-ink-muted">
                vitrines
                <br />
                diferentes
              </p>
            </div>
            <BlurIn delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-muted">
                Aqui, loja não vira quadradinho de lista. A hamburgueria tem cara de chapa quente; a alfaiataria, de
                vitrine de rua. Cor, fonte e jeito de vender são da loja — o shopping só emoldura.
              </p>
            </BlurIn>
          </div>
        </div>
      </div>

      <StackedCards cardClassName="rounded-[28px] md:rounded-[40px]">
        {VITRINES.map((loja) => (
          <VitrineLoja key={loja.slug} loja={loja} />
        ))}
      </StackedCards>

      <div className="mx-auto max-w-[1440px] px-2 pb-28 pt-12 lg:pb-36">
        <BlurIn>
          <p className="micro text-ink-muted">E mais doze vitrines</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {OUTRAS_VITRINES.map((nome) => (
              <li
                key={nome}
                className="rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-ink shadow-[0_1px_0_rgb(17_18_22/0.04)] ring-1 ring-ink/[0.06]"
              >
                {nome}
              </li>
            ))}
          </ul>
        </BlurIn>
      </div>
    </section>
  )
}

function VitrineLoja({ loja }: { loja: LojaVitrine }) {
  const { pele } = loja
  return (
    <article
      aria-label={`Vitrine ${loja.vitrine.nome}: ${loja.nome}`}
      className="mx-auto flex h-[min(82svh,760px)] w-full max-w-[1400px] flex-col overflow-hidden rounded-[28px] md:flex-row md:rounded-[40px]"
      style={{ backgroundColor: pele.bg, color: pele.ink, ['--loja-accent' as string]: pele.accent }}
    >
      {/* Foto da casa */}
      <div className="relative h-[30%] shrink-0 p-2.5 md:order-2 md:h-auto md:w-1/2 md:p-4">
        <div className="relative h-full overflow-hidden rounded-[20px] md:rounded-[28px]">
          <Image
            src={loja.banner}
            alt={`Ambiente de ${loja.nome}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
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
            {loja.iniciais}
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

        <h3 className={cn('mt-5 shrink-0 text-[clamp(38px,5vw,92px)] leading-[0.92] md:mt-6', loja.display)}>{loja.nome}</h3>
        {/* line-clamp zera o min-height do item flex: o layout precisa caber para o texto não sumir. */}
        <p className="mt-3 line-clamp-2 max-w-[38ch] text-[15px] leading-relaxed md:mt-4 md:text-[17px]" style={{ color: pele.inkMuted }}>
          {loja.descricao}
        </p>

        <div className="mt-auto shrink-0 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: pele.inkMuted }}>
              {loja.rotuloVitrine}
            </span>
            <span className="flex items-center gap-1 text-[13px] font-bold">
              {loja.link}
              <ConsumerIcon name="chevron-right" size={14} strokeWidth={2.2} />
            </span>
          </div>
          <ul className="mt-3 grid max-w-[460px] grid-cols-3 gap-2.5 md:gap-3">
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
              <ConsumerIcon name="clock" size={16} className="shrink-0" />
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
