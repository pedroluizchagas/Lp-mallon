'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn, useSafeReducedMotion } from '@mallevo/ui'
import { STATUS } from '../../dados/balcao'
import { Celular } from '../app/Celular'
import { TelaPedidoLojista } from '../app/TelaPedidoLojista'
import { PartnerIcon } from '../marca/PartnerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/** O que o lojista faz em cada etapa — o lado de dentro do balcão. */
const NO_BALCAO = [
  'Chega com som, no app e no painel. Você confirma com um toque.',
  'Comece o preparo quando puder — o cliente acompanha cada passo no app dele.',
  'Separe os volumes e, quando ficar pronto, chame o entregador.',
  'Você escolhe quem leva entre os entregadores online. Agora é com ele.',
  'Daqui em diante, quem move o pedido é o entregador, até a porta.',
  'Pedido concluído — e o cliente viu tudo ao vivo, do seu balcão à porta.',
]

/** Onde cada etapa começa no percurso da seção (0–1). */
const MARCOS = [0, 0.15, 0.3, 0.52, 0.66, 0.86]
/** A folha "Selecionar entregador" sobe no fim do preparo. */
const ESCOLHA = { de: 0.42, ate: 0.52 }
/** O dedo aperta o botão um instante antes de cada troca. */
const TOQUE = 0.035

function passoEm(p: number) {
  let passo = 0
  MARCOS.forEach((marco, i) => {
    if (p >= marco) passo = i
  })
  return passo
}

/**
 * Balcão ao vivo — a rolagem é o tempo. A seção gruda e o pedido do Café
 * Aroma atravessa as seis etapas reais do app do lojista, com os botões de
 * cada momento (Confirmar pedido → Iniciar preparo → Pronto — chamar
 * entregador) e a folha de escolher o entregador.
 */
export function BalcaoAoVivo() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [estado, setEstado] = useState({ passo: 0, tocando: false, escolhendo: false })
  const trilha = useTransform(p, [0, MARCOS[MARCOS.length - 1]], [0, 1], { clamp: true })

  // Sem movimento, a seção não gruda: mostra o pedido pronto para coleta.
  useEffect(() => {
    if (reduce) setEstado({ passo: 3, tocando: false, escolhendo: false })
  }, [reduce])

  useMotionValueEvent(p, 'change', (v) => {
    if (reduce) return
    const passo = passoEm(v)
    const proximo = MARCOS[passo + 1]
    const escolhendo = v >= ESCOLHA.de && v < ESCOLHA.ate
    // Aperta o botão antes de trocar de etapa (e antes de abrir a escolha).
    const alvo = passo === 2 ? ESCOLHA.de : proximo
    const tocando = passo <= 2 && alvo !== undefined && v >= alvo - TOQUE && v < alvo
    setEstado((atual) =>
      atual.passo === passo && atual.tocando === tocando && atual.escolhendo === escolhendo
        ? atual
        : { passo, tocando, escolhendo },
    )
  })

  const atual = STATUS[estado.passo]

  return (
    <section ref={ref} id="balcao" className={cn('relative', reduce ? 'py-28' : 'h-[460vh]')}>
      <div className={cn('flex items-center', !reduce && 'sticky top-0 h-svh')}>
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-12 items-center gap-x-6 gap-y-6 px-5 pt-16 md:px-8 md:pt-0">
          <div className="col-span-12 lg:col-span-6">
            <Sobrelinha tom="claro" aoVivo>
              Operação
            </Sobrelinha>
            <h2 className="mt-5 text-[clamp(36px,5vw,84px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
              Do balcão
              <br />
              <span className="italic">
                <span className="marca-texto">à porta do cliente.</span>
              </span>
            </h2>

            {/* Celular: só a etapa atual */}
            <div className="mt-5 lg:hidden" aria-live="polite">
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{atual.rotuloLongo}</p>
              <p className="text-[14.5px] text-ink-muted">{NO_BALCAO[estado.passo]}</p>
            </div>

            {/* Desktop: a trilha inteira */}
            <div className="relative mt-12 hidden pl-7 lg:block">
              <span className="absolute bottom-3 left-[5px] top-3 w-[2px] rounded-full bg-ink/10" />
              <motion.span
                className="absolute left-[5px] top-3 w-[2px] origin-top rounded-full bg-ink"
                style={{ height: 'calc(100% - 24px)', scaleY: reduce ? 0.6 : trilha }}
              />
              <ol className="space-y-1">
                {STATUS.map((etapa, i) => {
                  const fase = i < estado.passo ? 'feito' : i === estado.passo ? 'atual' : 'pendente'
                  return (
                    <li key={etapa.status} className="relative py-2.5">
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
                          'flex items-baseline gap-3 text-[clamp(20px,1.7vw,26px)] font-semibold tracking-[-0.025em] transition-colors duration-500',
                          fase === 'pendente' ? 'text-ink/25' : fase === 'feito' ? 'text-ink/55' : 'text-ink',
                        )}
                      >
                        {etapa.rotuloLongo}
                        {etapa.acao && (
                          <span
                            className={cn(
                              'hidden items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-bold tracking-normal transition-colors duration-500 xl:inline-flex',
                              fase === 'atual' ? 'bg-accent text-ink' : 'bg-ink/[0.05] text-ink/40',
                            )}
                          >
                            <PartnerIcon name="check" size={12} strokeWidth={2.6} />
                            {etapa.acao}
                          </span>
                        )}
                      </p>
                      <motion.p
                        initial={false}
                        animate={{ height: fase === 'atual' ? 'auto' : 0, opacity: fase === 'atual' ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden text-[15px] text-ink-muted"
                      >
                        {NO_BALCAO[i]}
                      </motion.p>
                    </li>
                  )
                })}
              </ol>
            </div>

            <p className="mt-10 hidden max-w-[460px] items-start gap-3 text-[14.5px] leading-[1.6] text-ink-muted lg:flex">
              <PartnerIcon name="store" size={20} className="mt-0.5 shrink-0 text-ink" />
              O mesmo pedido aparece, na mesma hora, no app do lojista e no painel do computador — e cada toque seu
              chega ao cliente sem ele precisar atualizar a tela.
            </p>
          </div>

          <div className="col-span-12 flex justify-center lg:col-span-5 lg:col-start-8">
            <Celular
              rotulo={`O pedido no app do lojista: ${atual.rotuloLongo}${estado.escolhendo ? ', escolhendo o entregador' : ''}.`}
              className="[--k:0.56] sm:[--k:0.66] lg:[--k:0.8] xl:[--k:0.86]"
            >
              <TelaPedidoLojista passo={estado.passo} tocando={estado.tocando} escolhendo={estado.escolhendo} />
            </Celular>
          </div>
        </div>
      </div>
    </section>
  )
}
