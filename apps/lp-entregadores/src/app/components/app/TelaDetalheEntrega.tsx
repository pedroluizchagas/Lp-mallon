'use client'

import { motion } from 'framer-motion'
import { ENTREGA_DEMO } from '../../dados/rua'
import { CourierIcon, type CourierIconName } from '../marca/CourierIcon'
import { StatusBar } from './Cromo'

const ENTRADA = [0.16, 1, 0.3, 1] as const

/** Os horários da entrega do Sushi Yamato, no formato do app ("10 de out., 21:14"). */
const LINHA_DO_TEMPO = [
  { rotulo: 'Atribuído', quando: '10 de out., 20:58' },
  { rotulo: 'Aceito', quando: '10 de out., 20:59' },
  { rotulo: 'Coletado', quando: '10 de out., 21:03' },
  { rotulo: 'Entregue', quando: '10 de out., 21:14' },
]

/**
 * O detalhe de uma entrega do histórico (entrega/[id].tsx): o topo escuro
 * com o valor e o trajeto, e a folha branca com os números, o trajeto e a
 * linha do tempo — atribuído, aceito, coletado, entregue. `rolado` desce a
 * folha até a linha do tempo.
 *
 * Os rótulos que o app ainda mostra em inglês ("Shipping Cost", "Details",
 * "From", "To", "Route", "Timeline") e os sem acento aparecem em português.
 */
export function TelaDetalheEntrega({ rolado = false }: { rolado?: boolean }) {
  const e = ENTREGA_DEMO
  return (
    <div className="relative flex h-[844px] w-[390px] flex-col overflow-hidden bg-rua-canvas font-sistema text-ink">
      <StatusBar tom="claro" />
      <div className="bg-surface-dark px-[20px] pb-[48px] pt-[56px] text-white">
        <span className="mb-[20px] flex size-[44px] items-center justify-center rounded-full bg-white/[0.12]">
          <CourierIcon name="back" color="#FFFFFF" />
        </span>
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-[12px]">
            <p className="mb-[4px] text-[14px] text-[#B6BAC1]">Valor da entrega</p>
            <p className="text-[30px] font-bold leading-[36px]">{e.valor}</p>
          </div>
          <span className="rounded-full bg-white/[0.12] px-[12px] py-[8px] text-[12px] font-semibold text-accent">Entregue</span>
        </div>
        <div className="mt-[20px] rounded-[28px] bg-white/[0.08] p-[16px]">
          <p className="mb-[8px] text-[12px] font-semibold uppercase text-[#AEB2B8]">Detalhes</p>
          <InfoEscura rotulo="De" titulo={e.loja} endereco={e.lojaEndereco} />
          <span className="my-[12px] block h-px bg-white/[0.08]" />
          <InfoEscura rotulo="Para" titulo={e.cliente} endereco={e.clienteEndereco} />
        </div>
      </div>

      <div className="relative -mt-[28px] flex-1 overflow-hidden rounded-t-[34px] bg-white">
        <motion.div
          className="p-[20px]"
          initial={false}
          animate={{ y: rolado ? -404 : 0 }}
          transition={{ duration: 1.1, ease: ENTRADA }}
        >
          <span className="mx-auto mb-[20px] block h-[6px] w-[48px] rounded-full bg-rua-line" />
          <div className="mb-[16px] flex gap-[12px]">
            <Metrica icone="cash" rotulo="Valor" valor={e.valor} />
            <Metrica icone="shield" rotulo="Código" valor="Não gerado" />
          </div>
          <div className="mb-[16px] flex gap-[12px]">
            <Metrica icone="clock" rotulo="Criado" valor={LINHA_DO_TEMPO[0].quando} />
            <Metrica icone="package" rotulo="Pedido" valor={e.id} />
          </div>

          <div className="mb-[16px] rounded-[28px] bg-rua-canvas p-[16px]">
            <p className="mb-[12px] text-[12px] font-semibold uppercase text-[#6B6E75]">Trajeto</p>
            <LinhaRota icone="store" rotulo="Coleta" titulo={e.loja} endereco={e.lojaEndereco} />
            <span className="my-[12px] ml-[20px] block h-[24px] w-px bg-rua-line" />
            <LinhaRota icone="pin" rotulo="Entrega" titulo={e.cliente} endereco={e.clienteEndereco} />
          </div>

          <div className="rounded-[28px] bg-rua-canvas p-[16px]">
            <p className="mb-[12px] text-[12px] font-semibold uppercase text-[#6B6E75]">Linha do tempo</p>
            {LINHA_DO_TEMPO.map((passo, i) => {
              const ultimo = i === LINHA_DO_TEMPO.length - 1
              return (
                <div key={passo.rotulo} className={ultimo ? 'flex items-start gap-[12px]' : 'mb-[16px] flex items-start gap-[12px]'}>
                  <div className="flex flex-col items-center">
                    <span className="mt-[4px] size-[10px] rounded-full bg-accent-strong" />
                    {!ultimo && <span className="mt-[4px] h-[24px] w-px bg-[#D7D9DE]" />}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-ink-muted">{passo.rotulo}</p>
                    <p className="mt-[2px] text-[12px] text-[#6B6E75]">{passo.quando}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function InfoEscura({ rotulo, titulo, endereco }: { rotulo: string; titulo: string; endereco: string }) {
  return (
    <div>
      <p className="mb-[4px] text-[12px] text-[#AEB2B8]">{rotulo}</p>
      <p className="text-[14px] leading-[20px]">
        {titulo}
        <br />
        {endereco}
      </p>
    </div>
  )
}

function Metrica({ icone, rotulo, valor }: { icone: CourierIconName; rotulo: string; valor: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-[22px] bg-rua-canvas p-[16px]">
      <span className="mb-[12px] flex size-[36px] items-center justify-center rounded-full bg-white">
        <CourierIcon name={icone} size={18} color="#111216" />
      </span>
      <p className="mb-[4px] text-[12px] text-[#6B6E75]">{rotulo}</p>
      <p className="truncate text-[14px] font-semibold">{valor}</p>
    </div>
  )
}

function LinhaRota({ icone, rotulo, titulo, endereco }: { icone: CourierIconName; rotulo: string; titulo: string; endereco: string }) {
  return (
    <div className="flex items-start gap-[12px]">
      <span className="mt-[2px] flex size-[40px] shrink-0 items-center justify-center rounded-full bg-white">
        <CourierIcon name={icone} size={18} color="#111216" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold uppercase text-[#6B6E75]">{rotulo}</p>
        <p className="mt-[4px] text-[14px] font-semibold">{titulo}</p>
        <p className="mt-[4px] text-[12px] text-ink-muted">{endereco}</p>
      </div>
    </div>
  )
}
