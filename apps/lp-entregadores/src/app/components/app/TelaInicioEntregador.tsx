'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@mallevo/ui'
import { ENTREGADOR_DEMO } from '../../dados/rua'
import { CourierIcon, type CourierIconName } from '../marca/CourierIcon'
import { CartaoOferta, type Oferta } from './CartaoOferta'
import { StatusBar, TabBar } from './Cromo'
import { RotaIlustrada } from './RotaIlustrada'

const ENTRADA = [0.16, 1, 0.3, 1] as const

/**
 * O Início do app do entregador ((tabs)/index.tsx), no canvas bege da
 * versão atual: a saudação, o cartão escuro com o interruptor ONLINE, os
 * atalhos e a lista "Entregas disponíveis" — vazia com o radar buscando, ou
 * com a oferta que acabou de chegar. `rolado` desce a tela até a lista,
 * como o dedo faria.
 *
 * Os textos que o app ainda mostra em inglês ("Current Tracking",
 * "Feature") ou sem acento aparecem aqui em português. "Monitorando pedidos
 * na sua área" fica de fora: não há filtro por área — quem chama é a loja.
 */
export function TelaInicioEntregador({
  online,
  oferta,
  tocando = false,
  rolado = false,
}: {
  online: boolean
  oferta: Oferta | null
  tocando?: boolean
  rolado?: boolean
}) {
  const { nome, inicial } = ENTREGADOR_DEMO
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-rua-canvas font-sistema">
      <motion.div
        className="px-[20px] pt-[67px]"
        initial={false}
        animate={{ y: rolado ? -452 : 0 }}
        transition={{ duration: 0.9, ease: ENTRADA }}
      >
        <div className="mb-[28px] flex items-center justify-between">
          <div className="flex items-center gap-[14px]">
            <span className="flex size-[54px] items-center justify-center rounded-full bg-accent text-[20px] font-extrabold text-ink">
              {inicial}
            </span>
            <div className="space-y-[4px]">
              <p className="text-[17px] tracking-[-0.3px]">
                <span className="text-[#6B6E75]">Olá, </span>
                <span className="font-bold text-ink">{nome}</span>
              </p>
              <p className="mt-[2px] flex items-center gap-[5px]">
                <span className={cn('size-[6px] rounded-full transition-colors', online ? 'bg-success' : 'bg-rua-line')} />
                <span className={cn('text-[11px]', online ? 'text-ink-muted' : 'text-[#6B6E75]')}>
                  {online ? 'Disponível para novas rotas' : 'Modo offline'}
                </span>
              </p>
            </div>
          </div>
          <span className="flex size-[44px] items-center justify-center rounded-full bg-white">
            <CourierIcon name={online ? 'spark' : 'power'} color={online ? '#111216' : '#8B8E94'} />
          </span>
        </div>

        <div className="mb-[20px] flex items-center justify-between rounded-full bg-rua-muted px-[16px] py-[12px]">
          <span className="flex items-center gap-[12px] text-ink-muted">
            <CourierIcon name="search" size={18} color="#8B8E94" />
            Buscar ID da entrega
          </span>
          <span className="flex size-[36px] items-center justify-center rounded-full bg-accent">
            <CourierIcon name="package" size={18} color="#111216" />
          </span>
        </div>

        {/* O cartão escuro do turno, com o interruptor */}
        <div className="rounded-[30px] bg-surface-dark p-[20px] text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-[16px]">
              <p className="mb-[4px] text-[12px] font-semibold uppercase text-[#A4A7AD]">Entrega atual</p>
              <p className="text-[20px] font-bold">Sem rota ativa</p>
              <p className="mt-[8px] text-[14px] text-[#C9CCD1]">
                {online ? 'Você está pronto para receber uma nova coleta.' : 'Ative o modo online para voltar a operar.'}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <Interruptor ligado={online} />
              <span className="mt-[8px] text-[12px] font-semibold text-accent">{online ? 'ONLINE' : 'OFFLINE'}</span>
            </div>
          </div>
          <div className="mt-[20px] rounded-[24px] bg-surface-dark-soft p-[16px]">
            <div className="mb-[12px] flex items-center justify-between">
              <span className="flex items-center gap-[8px]">
                <span className="size-[10px] rounded-full bg-accent" />
                <span className="text-[14px] font-semibold">Operação</span>
              </span>
              <span className="text-[12px] text-[#A9ADB4]">{oferta ? '1 disponível' : '0 disponíveis'}</span>
            </div>
            <p className="text-[14px] text-[#D5D7DB]">
              {online
                ? 'Assim que um pedido for atribuído, ele aparece aqui com acesso rápido para a rota.'
                : 'Seu painel acompanha online/offline, entregas disponíveis e o histórico do turno.'}
            </p>
            <span className="mt-[16px] flex items-center justify-center rounded-full bg-accent py-[12px] font-bold text-ink">
              Ver desempenho do dia
            </span>
          </div>
        </div>

        <p className="mb-[16px] mt-[24px] text-[16px] font-semibold text-ink">Atalhos</p>
        <div className="mb-[24px] flex justify-between">
          <Atalho icone="power" rotulo="Operação" valor={online ? 'Online' : 'Offline'} />
          <Atalho icone="route" rotulo="Rota" valor="Livre" />
          <Atalho icone="wallet" rotulo="Ganhos" valor="Painel" />
          <Atalho icone="user" rotulo="Perfil" valor="Conta" />
        </div>

        <div className="mb-[16px] mt-[4px] flex items-center justify-between">
          <p className="text-[16px] font-semibold text-ink">Entregas disponíveis</p>
          <p className="text-[14px] text-[#6B6E75]">{online ? `${oferta ? 1 : 0} no radar` : 'Modo pausado'}</p>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence initial={false} mode="wait">
            {oferta ? (
              <motion.div
                key="oferta"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
                transition={{ duration: 0.6, ease: ENTRADA }}
              >
                <CartaoOferta oferta={oferta} tocando={tocando} />
              </motion.div>
            ) : (
              <motion.div key="vazio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                <EsperandoRota online={online} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <StatusBar className="bg-rua-canvas" />
      <TabBar ativa="home" />
    </div>
  )
}

/** O interruptor do iOS no cartão escuro (trilha lima quando online). */
function Interruptor({ ligado }: { ligado: boolean }) {
  return (
    <span
      className={cn(
        'relative flex h-[31px] w-[51px] items-center rounded-full p-[2px] transition-colors duration-300',
        ligado ? 'bg-accent-strong' : 'bg-[#4C4F55]',
      )}
    >
      <span
        className={cn(
          'size-[27px] rounded-full bg-white shadow-[0_3px_8px_rgb(0_0_0/0.15)] transition-transform duration-300 ease-[var(--ease-entrada)]',
          ligado && 'translate-x-[20px]',
        )}
      />
    </span>
  )
}

function Atalho({ icone, rotulo, valor }: { icone: CourierIconName; rotulo: string; valor: string }) {
  return (
    <span className="flex w-[23%] flex-col items-center">
      <span className="mb-[8px] flex size-[56px] items-center justify-center rounded-full bg-white">
        <CourierIcon name={icone} size={18} color="#111216" />
      </span>
      <span className="text-[12px] font-semibold text-ink">{rotulo}</span>
      <span className="text-[11px] text-[#6B6E75]">{valor}</span>
    </span>
  )
}

/** O estado vazio da lista: o mapa ilustrado, com o radar quando online. */
function EsperandoRota({ online }: { online: boolean }) {
  return (
    <div className="relative mb-[12px] min-h-[196px] overflow-hidden rounded-[32px] bg-surface-dark">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%]">
        <RotaIlustrada radar={online} />
      </div>
      <span
        className={cn(
          'absolute right-[20px] top-[20px] z-10 rounded-[20px] px-[10px] py-[4px] text-[11px] font-semibold',
          online ? 'bg-[rgb(142_209_79/0.15)] text-success' : 'bg-white/[0.06] text-[#A4A7AD]',
        )}
      >
        {online ? 'Aguardando rota' : 'Modo pausado'}
      </span>
      <div className="space-y-[24px] p-[24px] pr-[130px]">
        <p className="flex items-center gap-[8px]">
          <span className={cn('size-[8px] rounded-full', online ? 'animate-pulso bg-success' : 'bg-[#4C4F55]')} />
          <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-[#A4A7AD]">{online ? 'Em espera' : 'Offline'}</span>
        </p>
        <div className="space-y-[4px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-[#A4A7AD]">Próxima entrega</p>
          <p className="text-[24px] font-extrabold tracking-[-0.5px] text-white">{online ? 'Buscando...' : 'Sem rota'}</p>
        </div>
        <div className="space-y-[10px]">
          {!online && (
            <p className="flex items-center gap-[8px] text-[12px] text-[#A4A7AD]">
              <CourierIcon name="pin" size={13} color="#6B6E75" />
              Ative o modo online para operar
            </p>
          )}
          <p className="flex items-center gap-[8px] text-[12px] text-[#A4A7AD]">
            <CourierIcon name="clock" size={13} color="#6B6E75" />
            {online ? 'Atribuições chegam em tempo real' : 'Seu histórico do turno está salvo'}
          </p>
        </div>
      </div>
    </div>
  )
}
