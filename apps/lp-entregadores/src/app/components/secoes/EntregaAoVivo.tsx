'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn, useSafeReducedMotion } from '@mallevo/ui'
import { OFERTA_DEMO } from '../../dados/rua'
import { Celular } from '../app/Celular'
import { ATE_A_LOJA } from '../app/MapaRua'
import { TelaGanhos } from '../app/TelaGanhos'
import { TelaInicioEntregador } from '../app/TelaInicioEntregador'
import { TelaRota, type Sobreposicao } from '../app/TelaRota'
import { CourierIcon } from '../marca/CourierIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const ETAPAS = [
  {
    titulo: 'Oferta de entrega',
    texto: 'Chega no app com o valor, a loja e o destino. Aceitar é com você.',
  },
  {
    titulo: 'Indo até a loja',
    texto: 'Um toque abre a rota no Google Maps. O mapa do app mostra a loja, o cliente e você.',
  },
  {
    titulo: 'Coleta confirmada',
    texto: 'Na loja, com o pedido na mão, você confirma a coleta: "Sim, coletei".',
  },
  {
    titulo: 'A caminho do cliente',
    texto: 'Durante a entrega, o app compartilha a sua localização com o cliente e a loja daquele pedido — e só durante a entrega.',
  },
  {
    titulo: 'Confirmar entrega',
    texto: 'Uma foto do local fica como comprovante. O cliente já pagou no app: sem dinheiro, sem troco.',
  },
  {
    titulo: 'Entregue',
    texto: 'A entrega vai para o histórico, e o valor soma na aba Ganhos.',
  },
]

/** Onde cada etapa começa no percurso da seção (0–1). As de rua são longas: o entregador anda. */
const MARCOS = [0, 0.13, 0.33, 0.43, 0.7, 0.86]
/** O dedo aperta o botão um instante antes de cada troca. */
const TOQUE = 0.035

function etapaEm(p: number) {
  let etapa = 0
  MARCOS.forEach((marco, i) => {
    if (p >= marco) etapa = i
  })
  return etapa
}

/**
 * A entrega por dentro — a rolagem é o tempo. A seção gruda e a entrega do
 * Sushi Yamato atravessa as etapas reais do app do entregador: a oferta, a
 * ida à loja, a coleta, a rua, a confirmação com foto e a aba Ganhos.
 */
export function EntregaAoVivo() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [estado, setEstado] = useState({ etapa: 0, tocando: false })
  const trilha = useTransform(p, [0, MARCOS[MARCOS.length - 1]], [0, 1], { clamp: true })
  // O entregador anda até a loja na etapa 1 e da loja ao cliente na etapa 3.
  const rota = useTransform(p, [MARCOS[1], MARCOS[2] - 0.02, MARCOS[3], MARCOS[4] - 0.03], [0, ATE_A_LOJA, ATE_A_LOJA, 1], {
    clamp: true,
  })

  // Sem movimento, a seção não gruda: mostra a entrega a caminho do cliente.
  useEffect(() => {
    if (reduce) setEstado({ etapa: 3, tocando: false })
  }, [reduce])

  useMotionValueEvent(p, 'change', (v) => {
    if (reduce) return
    const etapa = etapaEm(v)
    const proximo = MARCOS[etapa + 1]
    // Os botões apertados: "Aceitar entrega", "Confirmar coleta na loja",
    // "Sim, coletei" (no alerta), "Confirmar entrega" e, no modal, a confirmação.
    const tocando = proximo !== undefined && v >= proximo - TOQUE && v < proximo
    setEstado((atual) => (atual.etapa === etapa && atual.tocando === tocando ? atual : { etapa, tocando }))
  })

  const { etapa, tocando } = estado
  const sobreposicao: Sobreposicao = etapa === 2 ? 'coleta' : etapa === 4 ? 'entrega' : 'nenhuma'

  return (
    <section ref={ref} id="entrega" className={cn('relative', reduce ? 'py-28' : 'h-[460vh]')}>
      <div className={cn('flex items-center', !reduce && 'sticky top-0 h-svh')}>
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-12 items-center gap-x-6 gap-y-6 px-5 pt-16 md:px-8">
          <div className="col-span-12 lg:col-span-6">
            <Sobrelinha tom="claro" aoVivo>
              A entrega por dentro
            </Sobrelinha>
            <h2 className="mt-5 text-[clamp(36px,5vw,84px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
              Do aceite
              <br />
              <span className="italic">
                <span className="marca-texto">até a porta.</span>
              </span>
            </h2>

            {/* Celular: só a etapa atual */}
            <div className="mt-5 lg:hidden" aria-live="polite">
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{ETAPAS[etapa].titulo}</p>
              <p className="text-[14.5px] text-ink-muted">{ETAPAS[etapa].texto}</p>
            </div>

            {/* Desktop: a trilha inteira */}
            <div className="relative mt-12 hidden pl-7 lg:block">
              <span className="absolute bottom-3 left-[5px] top-3 w-[2px] rounded-full bg-ink/10" />
              <motion.span
                className="absolute left-[5px] top-3 w-[2px] origin-top rounded-full bg-ink"
                style={{ height: 'calc(100% - 24px)', scaleY: reduce ? 0.55 : trilha }}
              />
              <ol className="space-y-1">
                {ETAPAS.map((item, i) => {
                  const fase = i < etapa ? 'feito' : i === etapa ? 'atual' : 'pendente'
                  return (
                    <li key={item.titulo} className="relative py-2.5">
                      <span
                        className={cn(
                          'absolute -left-[27px] top-[16px] size-3.5 rounded-full transition-colors duration-500',
                          fase === 'pendente' && 'bg-[#d4d4d8]',
                          fase === 'feito' && 'bg-ink',
                          fase === 'atual' && 'bg-accent ring-[3px] ring-ink',
                        )}
                      />
                      <p
                        className={cn(
                          'text-[clamp(20px,1.7vw,26px)] font-semibold tracking-[-0.025em] transition-colors duration-500',
                          fase === 'pendente' ? 'text-ink/25' : fase === 'feito' ? 'text-ink/55' : 'text-ink',
                        )}
                      >
                        {item.titulo}
                      </p>
                      <motion.p
                        initial={false}
                        animate={{ height: fase === 'atual' ? 'auto' : 0, opacity: fase === 'atual' ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[46ch] overflow-hidden text-[15px] text-ink-muted"
                      >
                        {item.texto}
                      </motion.p>
                    </li>
                  )
                })}
              </ol>
            </div>

            <p className="mt-10 hidden max-w-[460px] items-start gap-3 text-[14.5px] leading-[1.6] text-ink-muted lg:flex lg:[@media(max-height:780px)]:hidden">
              <CourierIcon name="shield" size={20} className="mt-0.5 shrink-0 text-ink" />
              A sua localização só é compartilhada durante a entrega, com quem está nela: o cliente e a loja daquele
              pedido. Terminou, o app para de enviar.
            </p>
          </div>

          <div className="col-span-12 flex justify-center lg:col-span-5 lg:col-start-8">
            <Celular
              rotulo={`O app do entregador na etapa "${ETAPAS[etapa].titulo}" de uma entrega do ${OFERTA_DEMO.loja}.`}
              className="[--k:0.56] sm:[--k:0.66] lg:[--k:0.8] xl:[--k:0.86]"
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={etapa === 0 ? 'inicio' : etapa === 5 ? 'ganhos' : 'rota'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  {etapa === 0 ? (
                    <TelaInicioEntregador online oferta={OFERTA_DEMO} tocando={tocando} rolado />
                  ) : etapa === 5 ? (
                    <TelaGanhos destaque />
                  ) : (
                    <TelaRota
                      fase={etapa <= 2 ? 'loja' : 'cliente'}
                      coletada={etapa >= 3}
                      rota={rota}
                      sobreposicao={sobreposicao}
                      tocando={tocando}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </Celular>
          </div>
        </div>
      </div>
    </section>
  )
}
