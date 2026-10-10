'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useRef, useState } from 'react'
import { BlurIn, Counter, RevealLines, cn, useSafeReducedMotion } from '@mallevo/ui'
import { PISOS } from '../../dados/shopping'
import { dois } from '../../lib/divinopolis'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * Diretório — a placa de wayfinding do shopping. Os nove pisos em lista,
 * com o vocabulário de cada corredor; no desktop, a foto do piso segue o
 * cursor (e inclina com a velocidade da mão).
 */
export function Diretorio() {
  const lista = useRef<HTMLUListElement>(null)
  const reduce = useSafeReducedMotion()
  const [ativo, setAtivo] = useState<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mola = { stiffness: 220, damping: 26, mass: 0.6 }
  const sx = useSpring(x, mola)
  const sy = useSpring(y, mola)
  const giro = useTransform(useVelocity(sx), [-1600, 1600], [-10, 10], { clamp: true })

  const aoMover = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !lista.current) return
    const r = lista.current.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section id="pisos" className="relative px-5 pb-28 pt-[calc(30vh+7rem)] md:px-8 lg:pb-40 lg:pt-[calc(30vh+9rem)]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Diretório do shopping</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Um shopping inteiro,',
                <span key="acesa" className="italic">
                  <span className="marca-texto">andar por andar.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex items-end gap-4">
              <Counter
                value={PISOS.length}
                digits={2}
                className="text-[clamp(72px,7.6vw,128px)] font-semibold leading-none tracking-[-0.06em] text-ink"
              />
              <p className="mb-2 text-[15px] font-semibold leading-snug text-ink-muted">
                pisos para
                <br />
                passear
              </p>
            </div>
            <BlurIn delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-muted">
                Do almoço ao presente de última hora. Os pisos organizam a cidade do jeito que você procura — e cada
                corredor fala a língua do que vende.
              </p>
            </BlurIn>
          </div>
        </div>

        <ul
          ref={lista}
          className="relative mt-20 border-t border-ink/10 lg:mt-28"
          onPointerMove={aoMover}
          onPointerLeave={() => setAtivo(null)}
        >
          {PISOS.map((piso, i) => (
            <li
              key={piso.nome}
              className="group relative border-b border-ink/10"
              onPointerEnter={(e) => e.pointerType === 'mouse' && setAtivo(i)}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0 bg-white transition-[height] duration-500 ease-[var(--ease-entrada)] group-hover:h-full"
              />
              <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 py-5 md:grid-cols-12 md:gap-x-6 md:py-7">
                <span className="font-mono text-[12px] tabular-nums text-ink-muted md:col-span-1">{dois(piso.ordem)}</span>
                <div className="min-w-0 md:col-span-5">
                  <p className="text-[clamp(24px,3.3vw,54px)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink transition-transform duration-500 ease-[var(--ease-entrada)] group-hover:translate-x-3 md:truncate">
                    {piso.nome}
                  </p>
                  <p className="mt-1 text-[14px] text-ink-muted md:hidden">{piso.subtitulo}</p>
                </div>
                <div className="hidden md:col-span-4 md:block">
                  <p className="text-[15px] font-semibold text-ink">{piso.subtitulo}</p>
                  <p className="mt-1 truncate text-[13px] text-ink-muted">{piso.lojas.slice(0, 3).join(' · ')}</p>
                </div>
                <div className="flex items-center justify-end gap-3 md:col-span-2">
                  <span className="hidden text-[13px] font-bold text-ink-muted transition-colors group-hover:text-ink lg:inline">
                    {piso.vitrine}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition-[background-color,color,transform] duration-500 ease-[var(--ease-entrada)] group-hover:bg-ink group-hover:text-accent">
                    <ConsumerIcon name={piso.icone} size={20} strokeWidth={1.8} />
                  </span>
                </div>
              </div>
            </li>
          ))}

          {/* Foto do piso seguindo o cursor (só mouse, sem movimento reduzido). */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
              style={{ x: sx, y: sy }}
            >
              <motion.div
                className="relative -ml-[150px] -mt-[190px] h-[380px] w-[300px] overflow-hidden rounded-[26px] shadow-[0_40px_80px_-30px_rgb(17_18_22/0.55)]"
                style={{ rotate: giro }}
                initial={false}
                animate={{ opacity: ativo === null ? 0 : 1, scale: ativo === null ? 0.6 : 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {PISOS.map((piso, i) => (
                  <div
                    key={piso.nome}
                    className={cn(
                      'absolute inset-0 transition-[opacity,transform] duration-500 ease-[var(--ease-entrada)]',
                      ativo === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0',
                    )}
                  >
                    <Image src={piso.foto} alt="" fill sizes="300px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="micro text-accent">Piso {piso.ordem}</p>
                      <p className="mt-1.5 text-[19px] font-semibold leading-tight tracking-[-0.02em]">{piso.cta} →</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </ul>
      </div>
    </section>
  )
}
