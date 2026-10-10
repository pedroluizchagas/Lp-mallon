'use client'

import { AnimatePresence, motion, useTransform, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@mallevo/ui'
import { PASSOS_PEDIDO, PEDIDO_DEMO } from '../../dados/shopping'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { StatusBar } from './Cromo'

const ENTRADA = [0.16, 1, 0.3, 1] as const
const SAIU = 4
const ENTREGUE = 5

/**
 * Acompanhamento do pedido (app/pedido/[id].tsx): a marquise com o que está
 * ao vivo — status em statement, faixa de chegada no itálico aceso, barra
 * de progresso, entregador e mapa — e a folha com a timeline e o recibo.
 * `passo` é o índice em PASSOS_PEDIDO; `rota` (0–1) move o entregador.
 */
export function TelaPedido({ passo, rota }: { passo: number; rota: MotionValue<number> }) {
  const atual = PASSOS_PEDIDO[passo]
  const entregue = passo === ENTREGUE
  const comFaixa = atual.status === 'aguardando_entregador' || atual.status === 'saiu_para_entrega'

  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-canvas font-sistema">
      <div className="relative overflow-hidden bg-marquee pb-[40px] pt-[56px] text-white">
        <div aria-hidden className="glow-marquise absolute inset-0" />
        <StatusBar />

        <div className="relative flex items-center justify-between px-[16px]">
          <span className="flex size-[40px] items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10">
            <ConsumerIcon name="back" size={20} strokeWidth={2} />
          </span>
          {!entregue && (
            <span className="flex size-[40px] items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10">
              <ConsumerIcon name="comment" size={19} strokeWidth={1.9} />
            </span>
          )}
        </div>

        <div className="relative px-[24px] pt-[18px]">
          <p className="flex items-center gap-[8px] text-[11px] font-bold uppercase tracking-[1.2px] text-accent">
            <span className={cn('size-[7px] rounded-full', entregue ? 'bg-success' : 'animate-pulso bg-accent')} />
            {entregue ? 'Entregue' : 'Ao vivo'} · {PEDIDO_DEMO.loja}
          </p>
          <div className="relative mt-[10px] h-[106px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={atual.status}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: ENTRADA }}
                className="absolute inset-x-0 top-0"
              >
                <p className="font-sans text-[30px] font-semibold leading-[34px] tracking-[-0.6px]">{atual.rotulo}</p>
                {comFaixa && (
                  <p className="font-sans text-[30px] font-semibold italic leading-[34px] tracking-[-0.6px] text-accent">
                    entre 19:40 e 19:52
                  </p>
                )}
                <p className="mt-[8px] text-[14px] text-white/66">{atual.descricao}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-[14px] flex items-center gap-[12px]">
            <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-white/[0.13]">
              <motion.div
                className={cn('h-full rounded-full', entregue ? 'bg-success' : 'bg-accent')}
                initial={false}
                animate={{ width: `${atual.progresso * 100}%` }}
                transition={{ duration: 0.8, ease: ENTRADA }}
              />
            </div>
            <span className="w-[38px] text-right font-mono text-[12px] tabular-nums text-white/66">
              {Math.round(atual.progresso * 100)}%
            </span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {passo === SAIU && (
            <motion.div
              key="rua"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: ENTRADA }}
              className="relative overflow-hidden"
            >
              <div className="mx-[16px] mt-[18px] flex items-center gap-[12px] rounded-[20px] border border-white/10 bg-white/[0.08] p-[12px]">
                <span className="flex size-[40px] items-center justify-center rounded-full bg-accent font-sans text-[16px] font-bold text-ink">
                  J
                </span>
                <div className="flex-1">
                  <p className="text-[10.5px] font-bold uppercase tracking-[1.2px] text-white/42">Entregador</p>
                  <p className="text-[15px] font-bold">{PEDIDO_DEMO.entregador}</p>
                </div>
                <span className="flex size-[38px] items-center justify-center rounded-full bg-accent text-ink">
                  <ConsumerIcon name="phone" size={18} strokeWidth={2} />
                </span>
              </div>
              <div className="mx-[16px] mt-[12px] h-[176px] overflow-hidden rounded-[28px] border border-white/10">
                <MapaRota rota={rota} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Folha: o registro */}
      <div className="vidro-fosco relative -mt-[24px] rounded-t-[20px] px-[16px] pb-[40px] pt-[24px]">
        <p className="px-[8px] text-[11px] font-bold uppercase tracking-[1.2px] text-ink-soft">Passo a passo</p>
        <p className="px-[8px] font-sans text-[21px] font-bold tracking-[-0.4px] text-ink">Acompanhamento</p>
        <div className="mt-[12px] rounded-[20px] bg-white p-[16px] shadow-[0_4px_12px_rgb(0_0_0/0.06)]">
          {PASSOS_PEDIDO.map((p, i) => {
            const estado = i < passo || entregue ? 'feito' : i === passo ? 'atual' : 'pendente'
            return (
              <div key={p.status} className="relative flex gap-[12px] pb-[14px] last:pb-0">
                {i < PASSOS_PEDIDO.length - 1 && (
                  <span
                    className={cn(
                      'absolute left-[13px] top-[28px] h-[calc(100%-26px)] w-[2px] rounded-full transition-colors duration-500',
                      estado === 'feito' ? 'bg-accent' : 'bg-canvas-alt',
                    )}
                  />
                )}
                <span
                  className={cn(
                    'relative flex size-[28px] shrink-0 items-center justify-center rounded-full transition-colors duration-500',
                    estado === 'pendente' && 'bg-canvas-alt text-ink-soft',
                    estado === 'feito' && 'bg-accent text-ink',
                  )}
                  style={estado === 'atual' ? { backgroundColor: p.cor, color: '#FFFFFF' } : undefined}
                >
                  <ConsumerIcon name={estado === 'feito' ? 'check' : p.icone} size={15} strokeWidth={2.4} />
                </span>
                <div className="pt-[4px]">
                  <p
                    className={cn(
                      'text-[14px] leading-[18px] transition-colors duration-500',
                      estado === 'pendente' ? 'text-ink-muted' : 'font-semibold text-ink',
                    )}
                  >
                    {p.rotulo}
                  </p>
                  {estado === 'atual' && <p className="mt-[2px] text-[12.5px] text-ink-muted">{p.descricao}</p>}
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-[24px] px-[8px] text-[11px] font-bold uppercase tracking-[1.2px] text-ink-soft">Pedido · hoje, 19:12</p>
        <p className="px-[8px] font-sans text-[21px] font-bold tracking-[-0.4px] text-ink">Recibo</p>
        <div className="mt-[12px] rounded-[20px] bg-white p-[16px] shadow-[0_4px_12px_rgb(0_0_0/0.06)]">
          <div className="flex items-center gap-[12px]">
            <span
              className="flex size-[42px] items-center justify-center rounded-[14px] font-archivo text-[15px] font-extrabold"
              style={{ backgroundColor: PEDIDO_DEMO.tijolo.bg, color: PEDIDO_DEMO.tijolo.ink }}
            >
              {PEDIDO_DEMO.iniciais}
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-ink">{PEDIDO_DEMO.loja}</p>
              <p className="text-[12.5px] text-ink-muted">3 itens · {PEDIDO_DEMO.pagamento}</p>
            </div>
            <span className="text-[12.5px] font-bold text-ink-muted">Ver loja ›</span>
          </div>
          <div className="mt-[14px] space-y-[10px] border-t border-line pt-[14px]">
            {PEDIDO_DEMO.itens.map((item) => (
              <div key={item.nome} className="flex items-center gap-[10px] text-[13.5px]">
                <span className="relative size-[34px] shrink-0 overflow-hidden rounded-[10px]">
                  <Image src={item.foto} alt="" fill sizes="34px" className="object-cover" />
                </span>
                <span className="flex-1 text-ink">
                  {item.qtd}× {item.nome}
                </span>
                <span className="font-semibold text-ink">{item.total}</span>
              </div>
            ))}
          </div>
          <div className="mt-[14px] flex justify-between border-t border-line pt-[12px] text-[14px]">
            <span className="font-bold text-ink">Total</span>
            <span className="font-bold text-ink">{PEDIDO_DEMO.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mapa estilizado (escuro, como o MapaEntregador com userInterfaceStyle dark) ───

const ROTA: [number, number][] = [
  [40, 142],
  [40, 104],
  [124, 104],
  [124, 64],
  [222, 64],
  [222, 32],
  [318, 32],
]

const TRECHOS = ROTA.slice(1).map((p, i) => Math.hypot(p[0] - ROTA[i][0], p[1] - ROTA[i][1]))
const TOTAL = TRECHOS.reduce((a, b) => a + b, 0)

function pontoNaRota(t: number): [number, number] {
  let falta = Math.max(0, Math.min(1, t)) * TOTAL
  for (let i = 0; i < TRECHOS.length; i++) {
    if (falta <= TRECHOS[i]) {
      const k = TRECHOS[i] === 0 ? 0 : falta / TRECHOS[i]
      return [ROTA[i][0] + (ROTA[i + 1][0] - ROTA[i][0]) * k, ROTA[i][1] + (ROTA[i + 1][1] - ROTA[i][1]) * k]
    }
    falta -= TRECHOS[i]
  }
  return ROTA[ROTA.length - 1]
}

const CAMINHO = `M${ROTA.map(([x, y]) => `${x} ${y}`).join(' L')}`

function MapaRota({ rota }: { rota: MotionValue<number> }) {
  const cx = useTransform(rota, (t) => pontoNaRota(t)[0])
  const cy = useTransform(rota, (t) => pontoNaRota(t)[1])

  return (
    <svg viewBox="0 0 358 176" className="h-full w-full" aria-hidden>
      <rect width="358" height="176" fill="#1c1d21" />
      {/* Quarteirões */}
      {[
        [8, 8, 100, 80],
        [8, 116, 100, 52],
        [140, 8, 70, 40],
        [140, 80, 70, 88],
        [238, 48, 112, 56],
        [238, 116, 112, 52],
        [238, 8, 112, 8],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill="#25262b" />
      ))}
      {/* Rio Itapecerica, em curva lenta */}
      <path d="M-10 160 C 80 150, 120 176, 200 160 S 320 150, 370 168" stroke="#1f3340" strokeWidth="14" fill="none" />
      {/* Ruas */}
      <path d="M0 104 H358 M0 64 H358 M124 0 V176 M222 0 V176 M40 0 V176 M0 32 H358" stroke="#2f3036" strokeWidth="6" />
      {/* Rota: o que falta tracejado, o percorrido aceso */}
      <path d={CAMINHO} stroke="rgb(255 255 255 / 0.28)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" fill="none" />
      <motion.path
        d={CAMINHO}
        stroke="#D8FF3E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{ pathLength: rota }}
      />
      {/* Loja e casa */}
      <circle cx={ROTA[0][0]} cy={ROTA[0][1]} r="9" fill="#18181B" stroke="#D8FF3E" strokeWidth="2.5" />
      <circle cx={ROTA[0][0]} cy={ROTA[0][1]} r="3" fill="#D8FF3E" />
      <circle cx={ROTA[ROTA.length - 1][0]} cy={ROTA[ROTA.length - 1][1]} r="10" fill="#FFFFFF" />
      <path
        d={`M${ROTA[ROTA.length - 1][0] - 4.5} ${ROTA[ROTA.length - 1][1] + 0.5} l4.5 -4 l4.5 4 v4.5 h-9 z`}
        fill="#111216"
      />
      {/* Entregador */}
      <motion.circle cx={cx} cy={cy} r="15" fill="rgb(216 255 62 / 0.18)" />
      <motion.circle cx={cx} cy={cy} r="7.5" fill="#D8FF3E" stroke="#111216" strokeWidth="2.5" />
    </svg>
  )
}
