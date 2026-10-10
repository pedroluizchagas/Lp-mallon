'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { EASE, RevealLines, cn } from '@mallevo/ui'
import { LINKS } from '../../lib/links'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const PERGUNTAS: { pergunta: string; resposta: React.ReactNode }[] = [
  {
    pergunta: 'O Mallevo é pago?',
    resposta:
      'Não. Baixar e usar o app é gratuito. Você paga só o que pede — e a taxa de entrega de cada loja aparece antes de você fechar o pedido.',
  },
  {
    pergunta: 'Funciona em que cidade?',
    resposta:
      'Em Divinópolis, MG. O Mallevo é o shopping digital da cidade: as lojas, os entregadores e até a luz da tela são daqui.',
  },
  {
    pergunta: 'Como eu pago?',
    resposta: 'No próprio app, com Pix ou cartão de crédito. No cartão, dá para parcelar.',
  },
  {
    pergunta: 'Dá para acompanhar o pedido?',
    resposta:
      'Sim, ao vivo: da confirmação da loja até a entrega, com a faixa de horário de chegada e, quando o entregador sai, a rota no mapa.',
  },
  {
    pergunta: 'O que são os pisos?',
    resposta:
      'São os andares do shopping: Praça de Alimentação, Moda & Estilo, Saúde, Beleza, Pet, Casa & Vida, Mercado, Serviços e Presentes & Diversão. Cada loja fica no piso do que vende.',
  },
  {
    pergunta: 'Consigo agendar um serviço?',
    resposta:
      'Sim. Em salões, barbearias, estética e outros serviços, você escolhe o horário no app e acompanha o agendamento como um pedido.',
  },
  {
    pergunta: 'Tenho uma loja. Como entro no Mallevo?',
    resposta: (
      <>
        Pelo Mallevo para lojistas: você cadastra a loja, escolhe a vitrine e começa a receber pedidos.{' '}
        <a href={LINKS.parceiros} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
          Conheça em parceiros.mallevo.com.br
        </a>
        .
      </>
    ),
  },
  {
    pergunta: 'Quero ser entregador. Por onde começo?',
    resposta: (
      <>
        O cadastro e os requisitos estão em{' '}
        <a href={LINKS.entregadores} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
          entregadores.mallevo.com.br
        </a>
        .
      </>
    ),
  },
]

/** Perguntas frequentes — acordeão de uma aberta por vez. */
export function Perguntas() {
  const [aberta, setAberta] = useState<number | null>(0)
  const base = useId()

  return (
    <section id="perguntas" className="relative px-5 pb-40 pt-12 md:px-8 lg:pb-56">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Sobrelinha tom="claro">Perguntas</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(38px,5vw,84px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Ficou alguma',
                <span key="acesa" className="italic">
                  <span className="marca-texto">dúvida?</span>
                </span>,
              ]}
            />
            <div className="mt-10 rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-30px_rgb(17_18_22/0.35)] ring-1 ring-ink/[0.05]">
              <p className="text-[16px] font-semibold text-ink">Não achou a resposta?</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">Escreva para a gente — quem responde é daqui.</p>
              <a
                href={`mailto:${LINKS.email}`}
                className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-ink"
              >
                <span className="sublinha">{LINKS.email}</span>
                <ConsumerIcon name="chevron-right" size={16} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>

        <ul className="border-t border-ink/10 lg:col-span-7 lg:col-start-6">
          {PERGUNTAS.map((item, i) => {
            const aberto = aberta === i
            const idResposta = `${base}-resposta-${i}`
            return (
              <li key={item.pergunta} className="border-b border-ink/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={aberto}
                    aria-controls={idResposta}
                    onClick={() => setAberta(aberto ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <span
                      className={cn(
                        'text-[clamp(19px,1.7vw,24px)] font-semibold tracking-[-0.02em] transition-colors duration-300',
                        aberto ? 'text-ink' : 'text-ink/80 group-hover:text-ink',
                      )}
                    >
                      {item.pergunta}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'relative flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                        aberto ? 'bg-ink text-accent' : 'bg-ink/[0.06] text-ink group-hover:bg-ink/10',
                      )}
                    >
                      <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
                      <span
                        className={cn(
                          'absolute h-3.5 w-[2px] rounded-full bg-current transition-transform duration-300 ease-[var(--ease-entrada)]',
                          aberto && 'rotate-90 scale-y-0',
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {aberto && (
                    <motion.div
                      id={idResposta}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE.entrada }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-7 pr-14 text-[16.5px] leading-[1.7] text-ink-muted">{item.resposta}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
