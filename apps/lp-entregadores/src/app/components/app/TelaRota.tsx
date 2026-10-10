'use client'

import { AnimatePresence, motion, type MotionValue } from 'framer-motion'
import { cn } from '@mallevo/ui'
import { ENTREGA_DEMO } from '../../dados/rua'
import { CourierIcon } from '../marca/CourierIcon'
import { StatusBar } from './Cromo'
import { MapaRua } from './MapaRua'

const ENTRADA = [0.16, 1, 0.3, 1] as const

export type Sobreposicao = 'nenhuma' | 'coleta' | 'entrega'

/**
 * A entrega em curso ((tabs)/ativa.tsx): o mapa em tela cheia, a pílula da
 * fase ("Coleta" ou "Entrega") e a folha escura com o acompanhamento — os
 * três passos, a rota no Google Maps e o botão da etapa. Por cima, quando é
 * a hora, a confirmação da coleta e a da entrega (com a foto do local).
 *
 * Os rótulos que o app ainda mostra em inglês ("Tracking Detail", "Tracking
 * ID", "Current Location") e os textos sem acento aparecem aqui em português;
 * o modal de confirmação, que no app ainda usa o verde antigo, veste o ink.
 */
export function TelaRota({
  fase,
  coletada,
  rota,
  sobreposicao = 'nenhuma',
  tocando = false,
}: {
  fase: 'loja' | 'cliente'
  coletada: boolean
  rota: MotionValue<number>
  sobreposicao?: Sobreposicao
  tocando?: boolean
}) {
  const e = ENTREGA_DEMO
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-rua-canvas font-sistema">
      <MapaRua rota={rota} fase={fase} />
      <StatusBar />

      <div className="absolute inset-x-0 top-[59px] flex items-center justify-between px-[20px]">
        <span className="flex size-[44px] items-center justify-center rounded-full bg-white/92">
          <CourierIcon name="back" size={20} color="#111216" />
        </span>
        <span className="rounded-full bg-[rgb(17_18_22/0.9)] px-[16px] py-[8px] text-[14px] font-semibold text-accent">
          {fase === 'loja' ? 'Coleta' : 'Entrega'}
        </span>
      </div>

      {/* A folha escura do acompanhamento */}
      <div className="absolute inset-x-[12px] bottom-[12px] rounded-[34px] bg-ink px-[16px] pb-[20px] pt-[16px] text-white">
        <span className="mx-auto mb-[16px] block h-[6px] w-[48px] rounded-full bg-[#5A5D64]" />
        <div className="mb-[16px] flex rounded-full bg-surface-dark-soft p-[4px]">
          <span className="flex-1 rounded-full bg-accent py-[12px] text-center text-[14px] font-semibold text-ink">Acompanhamento</span>
          <span className="flex-1 py-[12px] text-center text-[14px] font-semibold text-[#BFC2C8]">Detalhes</span>
        </div>

        <p className="mb-[4px] text-[12px] text-[#8D9198]">ID da entrega</p>
        <p className="mb-[16px] text-[24px] font-bold">{e.id}</p>
        <p className="mb-[4px] text-[12px] text-[#8D9198]">Destino</p>
        <p className="mb-[20px] text-[14px] text-[#F1F2F4]">{fase === 'loja' ? e.lojaEndereco : e.clienteEndereco}</p>

        <Passo
          ativo
          titulo={fase === 'loja' ? 'Indo até a loja' : 'Pedido em deslocamento'}
          descricao={fase === 'loja' ? `Destino atual: ${e.loja}` : `Entrega para ${e.cliente}`}
        />
        <Passo ativo={coletada} titulo="Coleta confirmada" descricao="Atualize esta etapa assim que retirar o pedido." />
        <Passo ativo={false} titulo="Entrega concluída" descricao="Finalize com o código ou comprovante do pedido." ultimo />

        <span className="mb-[12px] mt-[4px] flex items-center justify-center rounded-full bg-surface-dark-soft py-[12px] text-[14px] font-semibold">
          Abrir rota no Google Maps
        </span>
        <span
          className={cn(
            'flex items-center justify-center rounded-full bg-accent py-[16px] text-[16px] font-bold text-ink transition-[transform,opacity] duration-200',
            tocando && 'scale-[0.97] opacity-60',
          )}
        >
          {fase === 'loja' ? 'Confirmar coleta na loja' : 'Confirmar entrega'}
        </span>
      </div>

      <AnimatePresence>
        {sobreposicao === 'coleta' && (
          <motion.div
            key="coleta"
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/35 px-[44px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* O alerta do sistema: "Você coletou o pedido em {loja}?" */}
            <motion.div
              className="w-full overflow-hidden rounded-[14px] bg-[#F2F2F2]/95 text-center text-ink backdrop-blur-xl"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: ENTRADA }}
            >
              <div className="px-[16px] pb-[16px] pt-[19px]">
                <p className="text-[17px] font-semibold">Confirmar coleta</p>
                <p className="mt-[2px] text-[13px]">Você coletou o pedido em {e.loja}?</p>
              </div>
              <div className="flex border-t border-black/15 text-[17px]">
                <span className="flex-1 border-r border-black/15 py-[11px] text-[#0A84FF]">Não</span>
                <span className="flex-1 py-[11px] font-semibold text-[#0A84FF]">Sim, coletei</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {sobreposicao === 'entrega' && (
          <motion.div
            key="entrega"
            className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ModalConfirmacaoEntrega no modo Foto: o comprovante vai para o
                armazenamento do entregador (o modo Código ainda não chega ao
                cliente, então a landing não o mostra). */}
            <motion.div
              className="rounded-t-[24px] bg-white p-[24px] pb-[40px] text-ink"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: ENTRADA }}
            >
              <p className="mb-[4px] text-[20px] font-bold">Confirmar entrega</p>
              <p className="mb-[20px] text-[14px] text-ink-muted">Confirme que o pedido foi entregue ao consumidor.</p>
              <div className="mb-[20px] flex gap-[8px]">
                <span className="flex-1 rounded-[12px] border border-rua-line py-[10px] text-center text-[14px] font-semibold text-ink-muted">
                  Código
                </span>
                <span className="flex-1 rounded-[12px] bg-ink py-[10px] text-center text-[14px] font-semibold text-white">Foto</span>
              </div>
              <p className="mb-[8px] text-[12px] font-medium text-ink-muted">Tire uma foto do local de entrega como comprovante</p>
              <p className="mb-[16px] flex h-[112px] items-center justify-center rounded-[16px] border-2 border-dashed border-success bg-[rgb(142_209_79/0.1)] text-[14px] font-medium text-[#4E8A26]">
                Foto tirada — toque para refazer
              </p>
              <div className="flex gap-[12px]">
                <span className="flex-1 rounded-[16px] border border-rua-line py-[14px] text-center text-[14px] font-medium text-ink-muted">
                  Cancelar
                </span>
                <span
                  className={cn(
                    'flex-1 rounded-[16px] bg-ink py-[14px] text-center text-[14px] font-bold text-accent transition-[transform,opacity] duration-200',
                    tocando && 'scale-[0.97] opacity-60',
                  )}
                >
                  Confirmar entrega
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Passo({ ativo, titulo, descricao, ultimo = false }: { ativo: boolean; titulo: string; descricao: string; ultimo?: boolean }) {
  return (
    <div className="flex">
      <div className="mr-[12px] flex flex-col items-center">
        <span className={cn('mt-[4px] size-[12px] rounded-full transition-colors duration-500', ativo ? 'bg-accent' : 'bg-[#5A5D64]')} />
        {!ultimo && <span className="mt-[4px] h-[40px] w-px bg-[#4F5258]" />}
      </div>
      <div className="flex-1 pb-[4px]">
        <p className="text-[14px] font-semibold">{titulo}</p>
        <p className="mt-[4px] text-[12px] text-[#A9ADB4]">{descricao}</p>
      </div>
    </div>
  )
}
