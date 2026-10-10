'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@mallevo/ui'
import { PEDIDO_BALCAO, STATUS, reais } from '../../dados/balcao'
import { PartnerIcon } from '../marca/PartnerIcon'
import { StatusBar } from './Cromo'
import { CartaoFolha, FolhaApp, SecaoFolha } from './Folha'
import { BarraProgresso, CartaoVidro, MICRO_MUDO, MoedaVidro, PontoAoVivo } from './Vidro'

const ENTRADA = [0.16, 1, 0.3, 1] as const

/** Há quanto tempo o pedido chegou, em cada etapa. */
const ESPERA = ['chegou agora.', 'há 3 min.', 'há 6 min.', 'há 14 min.', 'há 19 min.']

/** As ações de cada etapa (TRANSICOES_PEDIDO_LOJISTA + ROTULO_TRANSICAO). */
const ACOES: string[][] = [
  ['Confirmar pedido', 'Cancelar pedido'],
  ['Iniciar preparo', 'Cancelar pedido'],
  ['Pronto — chamar entregador', 'Cancelar pedido'],
  ['Cancelar pedido'],
  [],
  [],
]

const ENTREGADORES = [
  { nome: 'João da Silva', tipo: 'Autônomo · online', escolhido: true },
  { nome: 'Carla Menezes', tipo: 'Autônomo · online', escolhido: false },
  { nome: 'Diego Ramos', tipo: 'Autônomo · online', escolhido: false },
]

/**
 * O pedido visto do balcão (app/pedido/[id].tsx): a marquise com o status
 * por extenso, há quanto tempo chegou, a barra e o total; a folha com a
 * separação e os itens; no pé, os botões da etapa — os mesmos do painel.
 * `passo` é o índice em STATUS; `tocando` aperta o botão principal;
 * `escolhendo` abre a folha "Selecionar entregador".
 */
export function TelaPedidoLojista({
  passo,
  tocando = false,
  escolhendo = false,
}: {
  passo: number
  tocando?: boolean
  escolhendo?: boolean
}) {
  const meta = STATUS[passo]
  const ativo = meta.status !== 'entregue'
  const entregue = !ativo
  const acoes = ACOES[passo]
  const pedido = PEDIDO_BALCAO
  const editavel = passo <= 2

  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-canvas font-sistema">
      <div className="relative overflow-hidden bg-marquee pb-[48px] pt-[63px] text-white">
        <div aria-hidden className="glow-marquise absolute inset-0" />
        <StatusBar />

        <div className="relative flex min-h-[40px] items-center justify-between px-[24px]">
          <MoedaVidro icone="back" />
          <MoedaVidro icone="phone" accent={ativo} />
        </div>

        <div className="relative px-[24px] pt-[22px]">
          <div className="flex items-center gap-[8px]">
            {ativo && <PontoAoVivo apagado={!meta.pedeAcao} />}
            <p className={cn(MICRO_MUDO, 'truncate')}>
              {ativo ? `Ao vivo · ${pedido.cliente}` : `${pedido.cliente} · 10 de out., 19:12`}
            </p>
          </div>
          <div className="relative mt-[8px] h-[116px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={meta.status}
                className="absolute inset-x-0 top-0"
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: ENTRADA }}
              >
                <p className="font-sans text-[30px] font-semibold leading-[35px] tracking-[-0.7px]">
                  {meta.rotuloLongo}
                  {ativo && (
                    <>
                      <br />
                      <span className="italic text-accent">{ESPERA[passo]}</span>
                    </>
                  )}
                </p>
                <p className="mt-[8px] text-[13.5px] font-medium text-white/66">{meta.descricao}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-[16px] flex items-center gap-[10px]">
            <BarraProgresso valor={meta.progresso} cor={entregue ? '#8ED14F' : '#D8FF3E'} />
            <span className="w-[34px] text-right text-[11px] font-extrabold text-white/66">{Math.round(meta.progresso * 100)}%</span>
          </div>
        </div>

        <div className="relative px-[16px] pt-[18px]">
          <CartaoVidro className="p-[16px]">
            <div className="flex items-center gap-[12px]">
              <div className="flex-1">
                <p className={MICRO_MUDO}>Total do pedido</p>
                <p className="mt-[2px] text-[24px] font-extrabold tracking-[-0.6px]">{reais(pedido.total)}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-bold">{pedido.pagamento}</p>
                <p className="mt-[3px] text-[11px] font-bold uppercase tracking-[1px] text-success">Pago</p>
              </div>
            </div>
          </CartaoVidro>
        </div>
      </div>

      <FolhaApp className="pb-[200px]">
        <SecaoFolha sobrelinha="Para a coleta" titulo="Separação">
          <CartaoFolha className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[15px] font-extrabold text-ink">Carga Pequeno</p>
                <p className="mt-[2px] text-[13px] text-ink-muted">Cabe em bag comum — qualquer entregador</p>
              </div>
              <span className="flex size-[34px] items-center justify-center rounded-full bg-ink font-extrabold text-accent">P</span>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-[12px]">
              <div className="flex-1">
                <p className="text-[14px] font-bold text-ink">Volumes separados</p>
                <p className="mt-[2px] text-[13px] text-ink-muted">Quantas embalagens o entregador vai receber</p>
              </div>
              {editavel ? (
                <span className="flex items-center gap-[10px]">
                  <span className="flex size-[32px] items-center justify-center rounded-full bg-surface-muted text-[18px] font-bold text-ink-soft">−</span>
                  <span className="min-w-[28px] text-center text-[17px] font-extrabold text-ink">1</span>
                  <span className="flex size-[32px] items-center justify-center rounded-full bg-surface-muted text-[18px] font-bold text-ink">+</span>
                </span>
              ) : (
                <span className="text-[17px] font-extrabold text-ink">1</span>
              )}
            </div>
          </CartaoFolha>
        </SecaoFolha>

        <SecaoFolha
          sobrelinha="Pedido · 10 de out., 19:12"
          titulo="Itens"
          direita={<span className="text-[11px] font-bold tracking-[0.8px] text-ink-soft">2 ITENS</span>}
        >
          <CartaoFolha className="p-0">
            {pedido.itens.map((item) => (
              <div key={item.nome} className="flex items-center gap-[10px] border-b border-line px-[16px] py-[12px] text-[14px]">
                <span className="font-extrabold text-ink">{item.qtd}×</span>
                <span className="flex-1 text-ink">{item.nome}</span>
                <span className="font-bold text-ink">{reais(item.total)}</span>
              </div>
            ))}
            <div className="space-y-[6px] px-[16px] py-[12px] text-[13.5px]">
              <p className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span>{reais(pedido.subtotal)}</span>
              </p>
              <p className="flex justify-between text-ink-muted">
                <span>Entrega</span>
                <span>{reais(pedido.entrega)}</span>
              </p>
              <p className="flex justify-between text-[15px] font-extrabold text-ink">
                <span>Total</span>
                <span>{reais(pedido.total)}</span>
              </p>
            </div>
          </CartaoFolha>
        </SecaoFolha>
      </FolhaApp>

      {/* Ações fixas no pé — as mesmas transições do painel */}
      <AnimatePresence initial={false}>
        {acoes.length > 0 && (
          <motion.div
            key={acoes.join('|')}
            className="absolute inset-x-0 bottom-0 z-30 space-y-[8px] rounded-t-[20px] bg-white p-[16px] pb-[34px] shadow-[0_-12px_24px_rgb(0_0_0/0.12)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: ENTRADA }}
          >
            {acoes.map((rotulo) => {
              const cancelar = rotulo === 'Cancelar pedido'
              return (
                <span
                  key={rotulo}
                  className={cn(
                    'flex h-[48px] items-center justify-center gap-[8px] rounded-full text-[15px] font-bold transition-[transform,opacity] duration-200',
                    cancelar ? 'border border-line bg-white text-ink' : 'bg-accent text-ink',
                    !cancelar && tocando && 'scale-[0.97] opacity-60',
                  )}
                >
                  {cancelar && <PartnerIcon name="close" size={16} strokeWidth={2.2} />}
                  {rotulo}
                </span>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Folha "Selecionar entregador" (SheetEntregador) */}
      <AnimatePresence>
        {escolhendo && (
          <>
            <motion.div
              key="veu"
              className="absolute inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              key="folha"
              className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-canvas px-[16px] pb-[40px] pt-[10px]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.55, ease: ENTRADA }}
            >
              <span className="mx-auto block h-[5px] w-[40px] rounded-full bg-ink/15" />
              <p className="mt-[16px] px-[8px] text-[10.5px] font-bold uppercase tracking-[1.2px] text-ink-soft">
                {`Entrega de ${reais(pedido.entrega)}`}
              </p>
              <p className="px-[8px] font-sans text-[21px] font-bold tracking-[-0.4px] text-ink">Selecionar entregador</p>
              <CartaoFolha className="mt-[14px] p-0">
                {ENTREGADORES.map((e, i) => (
                  <div key={e.nome} className={cn('flex items-center gap-[12px] px-[14px] py-[12px]', i > 0 && 'border-t border-line')}>
                    <span className="flex size-[40px] items-center justify-center rounded-[14px] bg-canvas-alt">
                      <PartnerIcon name="bike" size={19} color="#111216" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-ink">{e.nome}</span>
                      <span className="block text-[12.5px] text-ink-muted">{e.tipo}</span>
                    </span>
                    {e.escolhido ? (
                      <span className="flex size-[26px] items-center justify-center rounded-full bg-ink">
                        <PartnerIcon name="check" size={13} color="#D8FF3E" strokeWidth={2.6} />
                      </span>
                    ) : (
                      <PartnerIcon name="chevron-right" size={16} color="#8B8E94" />
                    )}
                  </div>
                ))}
              </CartaoFolha>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
