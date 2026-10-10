'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { BlurIn, RevealLines, cn } from '@mallevo/ui'
import { COR_DA_FASE, NOME_DA_FASE, comAlfa, eventosSolares, formatarMinuto, luzNoMinuto } from '../../lib/divinopolis'
import { useAgora } from '../../lib/useAgora'
import { Celular } from '../app/Celular'
import { TelaInicio } from '../app/TelaInicio'
import { Sobrelinha } from '../ui/Sobrelinha'

/** Antes de o navegador saber a hora: um fim de tarde qualquer (sem divergir na hidratação). */
const MINUTO_PADRAO = 18 * 60 + 20
const DIA_PADRAO = { ano: 2026, mes: 9, dia: 9 }

/**
 * Luz do dia — a folha do Início acompanha o sol real de Divinópolis
 * (lib/luz-do-dia.ts do app). Aqui o visitante vê a luz de agora na cidade
 * e pode arrastar o dia: a folha muda de tinta; a marquise, não.
 */
export function LuzDoDia() {
  const agora = useAgora(30_000)
  const [previa, setPrevia] = useState<number | null>(null)

  const eventos = eventosSolares(agora ?? DIA_PADRAO)
  const minutoAgora = agora?.minutoDoDia ?? MINUTO_PADRAO
  const minuto = previa ?? minutoAgora
  const luz = luzNoMinuto(minuto, eventos)

  // A faixa de 24h pintada pelas sete fases (amostra a cada 20 min).
  const paradas: string[] = []
  for (let m = 0; m <= 1440; m += 20) {
    paradas.push(`${luzNoMinuto(m, eventos).cor} ${((m / 1440) * 100).toFixed(2)}%`)
  }
  const faixa = `linear-gradient(to right, ${paradas.join(', ')})`

  return (
    <section id="luz" className="relative overflow-hidden px-5 py-28 md:px-8 lg:py-40">
      {/* A luz pinta o salão em alpha baixo — o canvas nunca muda. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: `linear-gradient(to bottom, ${comAlfa(luz.cor, 0.16 * luz.intensidade)}, ${comAlfa(luz.cor, 0.07)} 30%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(40% 55% at ${luz.solX * 100}% 0%, ${comAlfa(luz.cor, 0.22 * luz.solForca)}, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1320px]">
        <Sobrelinha tom="claro">Luz do dia</Sobrelinha>
        <RevealLines
          as="h2"
          className="mt-6 text-[clamp(36px,5.6vw,96px)] font-semibold leading-[0.96] tracking-[-0.045em] text-ink"
          lines={[
            'Um app que sabe',
            <span key="acesa" className="italic">
              <span className="marca-texto">que horas são aqui.</span>
            </span>,
          ]}
        />

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <BlurIn delay={0.1}>
              <p className="max-w-[480px] text-[17px] leading-[1.65] text-ink-muted">
                A tela inicial acompanha o sol de verdade de Divinópolis: azul de madrugada, âmbar no nascer, dourado à
                tarde, cobre no entardecer. A conta é feita para a cidade — o app nem precisa pedir sua localização.
              </p>
            </BlurIn>

            <dl className="mt-12 grid grid-cols-3 border-t border-ink/10">
              {[
                { rotulo: previa === null ? 'Agora' : 'Prévia', valor: agora || previa !== null ? formatarMinuto(minuto) : '--:--' },
                { rotulo: 'Nascer do sol', valor: agora ? formatarMinuto(eventos.nascer) : '--:--' },
                { rotulo: 'Pôr do sol', valor: agora ? formatarMinuto(eventos.por) : '--:--' },
              ].map((item) => (
                <div key={item.rotulo} className="border-r border-ink/10 py-5 pr-4 last:border-r-0 [&:not(:first-child)]:pl-5">
                  <dt className="micro text-ink-muted">{item.rotulo}</dt>
                  <dd className="mt-2 font-mono text-[clamp(24px,2.4vw,34px)] font-medium tabular-nums tracking-[-0.04em] text-ink">
                    {item.valor}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 flex items-center gap-2.5 text-[15px] font-semibold text-ink" aria-live="polite">
              <span className="size-3 rounded-full ring-1 ring-ink/15" style={{ backgroundColor: luz.cor }} />
              {NOME_DA_FASE[luz.fase]} em Divinópolis
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[32px] bg-white/75 p-6 shadow-[0_30px_80px_-40px_rgb(17_18_22/0.35)] ring-1 ring-ink/[0.06] md:p-10">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <ArcoDoSol minuto={minuto} nascer={eventos.nascer} por={eventos.por} cor={luz.cor} />

                  <div className="mt-6">
                    <div className="flex min-h-7 items-center justify-between">
                      <label htmlFor="hora-do-dia" className="micro text-ink-muted">
                        Arraste o dia
                      </label>
                      {previa !== null && (
                        <button
                          type="button"
                          onClick={() => setPrevia(null)}
                          className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-white"
                        >
                          Voltar para agora
                        </button>
                      )}
                    </div>
                    <input
                      id="hora-do-dia"
                      type="range"
                      min={0}
                      max={1435}
                      step={5}
                      value={Math.round(minuto)}
                      onChange={(e) => setPrevia(Number(e.target.value))}
                      aria-valuetext={`${formatarMinuto(minuto)}, ${NOME_DA_FASE[luz.fase]}`}
                      className="faixa-dia mt-3 w-full"
                      style={{ ['--faixa' as string]: faixa }}
                    />
                    <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-muted">
                      {['00h', '06h', '12h', '18h', '24h'].map((h) => (
                        <span key={h}>{h}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Celular
                    rotulo={`O Início do app com a luz de ${NOME_DA_FASE[luz.fase].toLowerCase()}: a folha clara tingida pela fase do dia, a marquise sempre igual.`}
                    className="[--k:0.5] md:[--k:0.44] xl:[--k:0.5]"
                  >
                    <TelaInicio luz={luz} leve saudacao={`${saudacaoDoMinuto(minuto)}, Ana`} />
                  </Celular>
                </div>
              </div>

              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Fases do dia">
                {(Object.keys(NOME_DA_FASE) as (keyof typeof NOME_DA_FASE)[]).map((fase) => (
                  <li
                    key={fase}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors',
                      luz.fase === fase ? 'bg-ink text-white' : 'bg-ink/[0.05] text-ink-muted',
                    )}
                  >
                    <span className="size-2 rounded-full" style={{ backgroundColor: COR_DA_FASE[fase] }} />
                    {NOME_DA_FASE[fase]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function saudacaoDoMinuto(minuto: number) {
  const hora = Math.floor(minuto / 60)
  if (hora < 12) return 'Bom dia'
  if (hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

/** O arco do sol de hoje: nasce à esquerda, se põe à direita. À noite, desce abaixo do horizonte. */
function ArcoDoSol({ minuto, nascer, por, cor }: { minuto: number; nascer: number; por: number; cor: string }) {
  const W = 560
  const H = 250
  const R = 210
  const cx = W / 2
  const horizonte = 220
  const dia = minuto >= nascer && minuto <= por
  let t: number
  if (dia) t = (minuto - nascer) / (por - nascer)
  else {
    // Noite: o sol percorre um arco raso por baixo, do poente ao nascente.
    const noite = 1440 - (por - nascer)
    const desde = (minuto - por + 1440) % 1440
    t = 1 + desde / noite
  }
  const angulo = Math.PI * (1 - t)
  const x = cx + R * Math.cos(angulo)
  const y = dia ? horizonte - R * Math.sin(angulo) : horizonte - Math.sin(angulo) * 46

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Sol ${dia ? 'acima' : 'abaixo'} do horizonte`}>
      <defs>
        <linearGradient id="arco-ceu" x1="0" x2="1">
          <stop offset="0" stopColor="#F4B36F" />
          <stop offset="0.3" stopColor="#FFE9B8" />
          <stop offset="0.5" stopColor="#E4E4E7" />
          <stop offset="0.72" stopColor="#FFD08A" />
          <stop offset="1" stopColor="#E9855A" />
        </linearGradient>
        <radialGradient id="brilho-sol">
          <stop offset="0" stopColor={cor} stopOpacity="0.85" />
          <stop offset="1" stopColor={cor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d={`M${cx - R} ${horizonte} A${R} ${R} 0 0 1 ${cx + R} ${horizonte}`}
        fill="none"
        stroke="url(#arco-ceu)"
        strokeWidth="2.5"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <line x1="20" x2={W - 20} y1={horizonte} y2={horizonte} stroke="#111216" strokeOpacity="0.14" strokeWidth="1.5" />
      <text x={cx - R} y={horizonte + 24} textAnchor="middle" className="fill-ink-muted font-mono text-[12px]">
        {formatarMinuto(nascer)}
      </text>
      <text x={cx + R} y={horizonte + 24} textAnchor="middle" className="fill-ink-muted font-mono text-[12px]">
        {formatarMinuto(por)}
      </text>
      <motion.circle
        r="44"
        fill="url(#brilho-sol)"
        initial={false}
        animate={{ cx: x, cy: y, opacity: dia ? 1 : 0.35 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <motion.circle
        r="13"
        fill={dia ? cor : '#4A5A8F'}
        stroke="#111216"
        strokeOpacity="0.12"
        initial={false}
        animate={{ cx: x, cy: y }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </svg>
  )
}
