'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BlurIn, RevealLines, useSafeReducedMotion } from '@mallevo/ui'
import { Celular } from '../app/Celular'
import { TelaDetalheEntrega } from '../app/TelaDetalheEntrega'
import { TelaGanhos } from '../app/TelaGanhos'
import { CourierIcon, type CourierIconName } from '../marca/CourierIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const ITENS: { icone: CourierIconName; titulo: string; texto: string }[] = [
  {
    icone: 'cash',
    titulo: 'O valor é a taxa de entrega da loja',
    texto: 'Cada loja define a sua — e ela aparece no cartão da oferta antes de você aceitar.',
  },
  {
    icone: 'calendar',
    titulo: 'Hoje, 7 dias ou mês',
    texto: 'O total do período, quantas entregas você fez e a média de cada uma.',
  },
  {
    icone: 'clock',
    titulo: 'Cada entrega com a sua linha do tempo',
    texto: 'Atribuída, aceita, coletada e entregue, com dia e hora.',
  },
]

/**
 * Ganhos — a aba Ganhos do app na frente (o período "Hoje" com o histórico)
 * e, atrás, o detalhe da entrega que a página acompanhou, que desce sozinho
 * até a linha do tempo quando a seção entra.
 */
export function Ganhos() {
  const ref = useRef<HTMLElement>(null)
  const palco = useRef<HTMLDivElement>(null)
  const reduce = useSafeReducedMotion()
  const emVista = useInView(palco, { amount: 0.45, once: true })
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const frenteY = useTransform(p, [0, 1], [50, -50])
  const atrasY = useTransform(p, [0, 1], [110, -110])
  const aceso = reduce || emVista

  return (
    <section ref={ref} id="ganhos" className="relative overflow-hidden px-5 py-28 md:px-8 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Sobrelinha tom="claro">Ganhos</Sobrelinha>
          <RevealLines
            as="h2"
            className="mt-6 text-[clamp(36px,4.3vw,76px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
            lines={[
              'O que você ganhou,',
              <span key="acesa" className="italic">
                <span className="marca-texto">entrega por entrega.</span>
              </span>,
            ]}
          />
          <BlurIn delay={0.1}>
            <p className="mt-8 max-w-[480px] text-[17px] leading-[1.65] text-ink-muted">
              A aba Ganhos soma o valor das entregas que você concluiu e guarda o histórico — cada uma com a loja, o
              valor e a hora.
            </p>
          </BlurIn>

          <ul className="mt-10 space-y-6">
            {ITENS.map((item, i) => (
              <li key={item.titulo}>
                <BlurIn delay={0.12 + i * 0.07} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-accent">
                    <CourierIcon name={item.icone} size={19} strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{item.titulo}</span>
                    <span className="mt-1 block text-[14.5px] leading-[1.6] text-ink-muted">{item.texto}</span>
                  </span>
                </BlurIn>
              </li>
            ))}
          </ul>
        </div>

        <div ref={palco} className="relative flex justify-center lg:col-span-6">
          {/* Atrás: o detalhe da entrega, descendo até a linha do tempo. */}
          <motion.div
            className="absolute left-[56%] top-[-4%] hidden rotate-[5deg] sm:block"
            style={reduce ? undefined : { y: atrasY }}
          >
            <Celular
              rotulo="Detalhe de uma entrega no app: valor de R$ 8,90, do Sushi Yamato até o cliente, com a linha do tempo atribuído, aceito, coletado e entregue."
              className="[--k:0.56] lg:[--k:0.6] xl:[--k:0.66]"
            >
              <TelaDetalheEntrega rolado={aceso} />
            </Celular>
          </motion.div>

          {/* Na frente: a aba Ganhos. */}
          <motion.div className="relative sm:-translate-x-[22%]" style={reduce ? undefined : { y: frenteY }}>
            <Celular
              rotulo="A aba Ganhos do app do entregador no período Hoje: três entregas, a primeira do Sushi Yamato, de R$ 8,90."
              className="[--k:0.68] sm:[--k:0.66] lg:[--k:0.72] xl:[--k:0.78]"
            >
              <TelaGanhos destaque={aceso} />
            </Celular>
          </motion.div>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-[1440px] text-[13px] text-ink-muted lg:mt-20 lg:text-right">
        Telas com valores de exemplo, de lojas de demonstração do app. O valor de cada entrega é a taxa que a loja define.
      </p>
    </section>
  )
}
