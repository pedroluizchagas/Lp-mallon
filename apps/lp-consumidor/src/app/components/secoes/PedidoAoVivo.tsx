'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn, useSafeReducedMotion } from '@mallevo/ui'
import { PASSOS_PEDIDO } from '../../dados/shopping'
import { Celular } from '../app/Celular'
import { TelaPedido } from '../app/TelaPedido'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/** Onde cada etapa começa no percurso da seção (0–1). "Saiu para entrega" é longa: o entregador anda. */
const MARCOS = [0, 0.12, 0.26, 0.42, 0.54, 0.86]
const SAIU = 4

function passoEm(p: number) {
  let passo = 0
  MARCOS.forEach((marco, i) => {
    if (p >= marco) passo = i
  })
  return passo
}

/**
 * Pedido ao vivo — a rolagem é o tempo. A seção gruda e, conforme o dedo
 * desce, o pedido anda pelas seis etapas reais do app; na saída para
 * entrega, o entregador percorre a rota no mapa.
 */
export function PedidoAoVivo() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [passo, setPasso] = useState(0)
  const rota = useTransform(p, [MARCOS[SAIU], MARCOS[SAIU + 1] - 0.02], [0, 1], { clamp: true })
  const trilha = useTransform(p, [0, MARCOS[MARCOS.length - 1]], [0, 1], { clamp: true })

  // Sem movimento, a seção não gruda: mostra a etapa mais completa — o
  // entregador na rua, com o mapa.
  useEffect(() => {
    if (reduce) setPasso(SAIU)
  }, [reduce])

  useMotionValueEvent(p, 'change', (v) => {
    if (reduce) return
    const novo = passoEm(v)
    setPasso((atual) => (atual === novo ? atual : novo))
  })

  const atual = PASSOS_PEDIDO[passo]

  return (
    <section ref={ref} id="pedido" className={cn('relative', reduce ? 'py-28' : 'h-[420vh]')}>
      <div className={cn('flex items-center', !reduce && 'sticky top-0 h-svh')}>
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-12 items-center gap-x-6 gap-y-6 px-5 pt-16 md:px-8 md:pt-0">
          <div className="col-span-12 lg:col-span-6">
            <Sobrelinha tom="claro" aoVivo>
              Pedido ao vivo
            </Sobrelinha>
            <h2 className="mt-5 text-[clamp(36px,5vw,84px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
              Do balcão
              <br />
              <span className="italic">
                <span className="marca-texto">até a sua porta.</span>
              </span>
            </h2>

            {/* Celular: só a etapa atual */}
            <div className="mt-5 lg:hidden" aria-live="polite">
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{atual.rotulo}</p>
              <p className="text-[14.5px] text-ink-muted">{atual.descricao}</p>
            </div>

            {/* Desktop: a trilha inteira */}
            <div className="relative mt-12 hidden pl-7 lg:block">
              <span className="absolute bottom-3 left-[5px] top-3 w-[2px] rounded-full bg-ink/10" />
              <motion.span
                className="absolute left-[5px] top-3 w-[2px] origin-top rounded-full bg-ink"
                style={{ height: 'calc(100% - 24px)', scaleY: trilha }}
              />
              <ol className="space-y-1">
                {PASSOS_PEDIDO.map((etapa, i) => {
                  const estado = i < passo ? 'feito' : i === passo ? 'atual' : 'pendente'
                  return (
                    <li key={etapa.status} className="relative py-2.5">
                      <span
                        className={cn(
                          'absolute -left-[27px] top-[16px] size-3.5 rounded-full transition-colors duration-500',
                          estado === 'pendente' && 'bg-[#d4d4d8]',
                          estado === 'feito' && 'bg-ink',
                          estado === 'atual' && 'bg-accent ring-[3px] ring-ink',
                        )}
                      />
                      <p
                        className={cn(
                          'text-[clamp(20px,1.7vw,26px)] font-semibold tracking-[-0.025em] transition-colors duration-500',
                          estado === 'pendente' ? 'text-ink/25' : estado === 'feito' ? 'text-ink/55' : 'text-ink',
                        )}
                      >
                        {etapa.rotulo}
                      </p>
                      <motion.p
                        initial={false}
                        animate={{ height: estado === 'atual' ? 'auto' : 0, opacity: estado === 'atual' ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden text-[15px] text-ink-muted"
                      >
                        {etapa.descricao}
                      </motion.p>
                    </li>
                  )
                })}
              </ol>
            </div>

            <p className="mt-10 hidden max-w-[440px] items-start gap-3 text-[14.5px] leading-[1.6] text-ink-muted lg:flex">
              <ConsumerIcon name="wallet" size={20} className="mt-0.5 shrink-0 text-ink" />
              Pague no app com Pix ou cartão. Cada etapa chega na hora — sem precisar atualizar a tela.
            </p>
          </div>

          <div className="col-span-12 flex justify-center lg:col-span-5 lg:col-start-8">
            <Celular
              rotulo={`Acompanhamento do pedido no app Mallevo: ${atual.rotulo}.`}
              className="[--k:0.56] sm:[--k:0.66] lg:[--k:0.8] xl:[--k:0.86]"
            >
              <TelaPedido passo={passo} rota={rota} />
            </Celular>
          </div>
        </div>
      </div>
    </section>
  )
}
