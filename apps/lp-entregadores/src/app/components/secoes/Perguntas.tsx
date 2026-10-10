'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { EASE, RevealLines, cn } from '@mallevo/ui'
import { APP_PUBLICADO, LINKS } from '../../lib/links'
import { CourierIcon } from '../marca/CourierIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * Só respostas que o app sustenta hoje. Prazo e forma de repasse ficam de
 * fora até o repasse ao entregador estar funcionando.
 */
const PERGUNTAS: { pergunta: string; resposta: string }[] = [
  {
    pergunta: 'Quanto eu ganho por entrega?',
    resposta:
      'O valor de cada entrega é a taxa de entrega que a loja definiu para o pedido, e ele aparece no cartão da oferta antes de você aceitar. A aba Ganhos soma tudo por dia, por 7 dias ou pelo mês.',
  },
  {
    pergunta: 'Preciso cumprir horário?',
    resposta:
      'Não. Você liga o modo online quando quiser e desliga quando quiser, pelo interruptor do app. Não há escala nem horário mínimo.',
  },
  {
    pergunta: 'Como as entregas chegam até mim?',
    resposta:
      'Com o modo online ligado, você aparece para as lojas do Mallevo na lista de entregadores disponíveis, e elas podem te chamar para um pedido. A oferta chega no app com o valor, a loja e o destino — aceitar ou recusar é com você.',
  },
  {
    pergunta: 'Que veículo posso usar?',
    resposta: 'Moto, bicicleta ou carro. A placa só é pedida para moto e carro.',
  },
  {
    pergunta: 'Preciso de CNH?',
    resposta:
      'Hoje, sim: o cadastro pede o número da CNH para todos os veículos, inclusive bicicleta. A foto da CNH é opcional.',
  },
  {
    pergunta: 'Vou lidar com dinheiro ou troco?',
    resposta: 'Não. O cliente paga pelo app, com Pix ou cartão. Você não recebe dinheiro nem dá troco na porta.',
  },
  {
    pergunta: 'Quem vê a minha localização?',
    resposta:
      'O cliente e a loja do pedido que você está entregando — e só enquanto a entrega está em andamento. Fora de uma entrega, o app não compartilha onde você está.',
  },
  {
    pergunta: 'Quanto custa para me cadastrar?',
    resposta: 'Nada. O cadastro é gratuito e não tem mensalidade.',
  },
  {
    pergunta: 'Como faço o cadastro?',
    resposta: `Pelo app Entregadores Mallevo, em quatro etapas: conta, dados pessoais, veículo e documentos. Depois, a equipe do Mallevo analisa o cadastro, e o app confere o status sozinho até a aprovação.${
      APP_PUBLICADO ? '' : ' O app está chegando à App Store e ao Google Play.'
    }`,
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
                'Antes de',
                <span key="acesa" className="italic">
                  <span className="marca-texto">sair na rua.</span>
                </span>,
              ]}
            />
            <div className="mt-10 rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-30px_rgb(17_18_22/0.35)] ring-1 ring-ink/[0.05]">
              <p className="text-[16px] font-semibold text-ink">Ficou alguma dúvida?</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">
                Escreva para a gente — quem responde é daqui, de Divinópolis.
              </p>
              <a href={`mailto:${LINKS.email}`} className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-ink">
                <span className="sublinha">{LINKS.email}</span>
                <CourierIcon name="chevron-right" size={16} strokeWidth={2.2} />
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
