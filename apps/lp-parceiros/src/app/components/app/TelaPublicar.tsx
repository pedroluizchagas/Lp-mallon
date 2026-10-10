'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@mallevo/ui'
import { LOJA_DEMO } from '../../dados/balcao'
import { POST_DEMO } from '../../dados/conteudo'
import { PartnerIcon } from '../marca/PartnerIcon'
import { StatusBar, TabBarLojista } from './Cromo'
import { TijoloLoja } from './Vidro'

export type PassoPublicar = 'origem' | 'detalhes' | 'enviando' | 'publicado'

const ENTRADA = [0.16, 1, 0.3, 1] as const

/**
 * A aba Publicar do app do lojista ((tabs)/publicar.tsx), na base escura
 * própria (é o "Explorar" de quem vende): escolher a origem → o post
 * (legenda, tags, produto) → o envio, que retoma se a rede cair → publicado.
 * `passo` e `progresso` vêm de fora; `legenda` cresce como se fosse digitada.
 */
export function TelaPublicar({
  passo,
  progresso = 0,
  legenda,
}: {
  passo: PassoPublicar
  progresso?: number
  /** Quantos caracteres da legenda já foram "digitados". */
  legenda: number
}) {
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-ink font-sistema text-white">
      <StatusBar />
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={passo === 'enviando' ? 'detalhes' : passo}
          className="absolute inset-0"
          initial={{ opacity: 0, x: passo === 'publicado' ? 0 : 40, scale: passo === 'publicado' ? 0.96 : 1 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.55, ease: ENTRADA }}
        >
          {passo === 'origem' && <Origem />}
          {(passo === 'detalhes' || passo === 'enviando') && (
            <Detalhes enviando={passo === 'enviando'} progresso={progresso} legenda={legenda} />
          )}
          {passo === 'publicado' && <Publicado />}
        </motion.div>
      </AnimatePresence>
      {passo === 'origem' && <TabBarLojista ativa="plus" />}
    </div>
  )
}

function Origem() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center px-[16px] pt-[72px]">
        <p className="flex-1 font-sans text-[28px] font-extrabold tracking-[-0.5px]">Publicar</p>
        <span className="flex items-center gap-[8px] rounded-full bg-white py-[6px] pl-[6px] pr-[14px] shadow-[0_4px_12px_rgb(0_0_0/0.06)]">
          <TijoloLoja iniciais={LOJA_DEMO.iniciais} />
          <span className="text-[13.5px] font-bold text-ink">{LOJA_DEMO.nome}</span>
        </span>
      </div>
      <p className="mt-[4px] px-[16px] text-[14px] text-white/66">Fotos e vídeos de até 60s no Explorar dos seus clientes.</p>

      <div className="flex flex-1 flex-col justify-center gap-[12px] px-[16px] pb-[60px]">
        <OpcaoCaptura icone="camera" titulo="Câmera" descricao="Fotografe ou grave agora" />
        <OpcaoCaptura icone="gallery" titulo="Galeria" descricao="Escolha algo já salvo" tocada />
      </div>
    </div>
  )
}

function OpcaoCaptura({
  icone,
  titulo,
  descricao,
  tocada = false,
}: {
  icone: 'camera' | 'gallery'
  titulo: string
  descricao: string
  tocada?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-[16px] rounded-[20px] bg-surface-dark-soft p-[20px]',
        tocada && 'animate-[toque_2.4s_var(--ease-suave)_0.9s_both]',
      )}
    >
      <span className="flex size-[54px] items-center justify-center rounded-[14px] bg-accent">
        <PartnerIcon name={icone} size={24} color="#111216" strokeWidth={2.1} />
      </span>
      <span>
        <span className="block text-[18px] font-bold">{titulo}</span>
        <span className="block text-[14px] text-white/66">{descricao}</span>
      </span>
    </div>
  )
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <p className="mb-[8px] text-[11px] font-bold uppercase tracking-[1.2px] text-ink-soft">{children}</p>
}

function Detalhes({ enviando, progresso, legenda }: { enviando: boolean; progresso: number; legenda: number }) {
  const texto = POST_DEMO.descricao.slice(0, legenda)
  return (
    <div className="relative h-full">
      {/* O lojista rola o formulário enquanto preenche. */}
      <motion.div
        className="px-[16px] pt-[64px]"
        initial={{ y: 0 }}
        animate={{ y: -270 }}
        transition={{ duration: 2.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mb-[16px] flex items-center">
          <span className={cn('mr-[12px] flex size-[40px] items-center justify-center rounded-full bg-surface-dark-soft', enviando && 'opacity-40')}>
            <PartnerIcon name="back" size={18} color="#FFFFFF" />
          </span>
          <p className="flex-1 font-sans text-[22px] font-extrabold">Novo post</p>
        </div>

        <div className="relative mx-auto mb-[16px] aspect-[9/16] w-[62%] overflow-hidden rounded-[20px] bg-surface-dark-soft">
          <Image src={POST_DEMO.foto} alt="" fill sizes="222px" className="object-cover" />
        </div>

        <Rotulo>{`Legenda · ${texto.length}/600`}</Rotulo>
        <div className="mb-[16px] min-h-[84px] rounded-[14px] bg-surface-dark-soft p-[14px] text-[16px] leading-[22px]">
          {texto}
          {!enviando && legenda < POST_DEMO.descricao.length && (
            <span className="ml-px inline-block h-[18px] w-[2px] translate-y-[3px] animate-pulso bg-accent" />
          )}
        </div>

        <Rotulo>{`Tags · ${POST_DEMO.tags.length}/5`}</Rotulo>
        <div className="mb-[16px] flex flex-wrap gap-[8px]">
          {POST_DEMO.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-[6px] rounded-full bg-[rgb(216_255_62/0.18)] px-[12px] py-[6px]">
              <span className="text-[13px] font-bold text-accent">{tag}</span>
              <span className="font-extrabold text-ink-soft">×</span>
            </span>
          ))}
        </div>

        <Rotulo>Produto (opcional)</Rotulo>
        <div className="flex items-center gap-[12px] rounded-[14px] bg-surface-dark-soft p-[12px]">
          <div className="flex-1">
            <p className="font-bold">{POST_DEMO.produto.nome}</p>
            <p className="text-[13px] font-bold text-accent">{POST_DEMO.produto.preco}</p>
          </div>
          <span className="text-[18px] font-extrabold text-ink-soft">×</span>
        </div>
      </motion.div>

      {/* Rodapé: publicar / progresso */}
      <div className="absolute inset-x-0 bottom-0 border-t border-line-dark bg-ink px-[16px] pb-[32px] pt-[16px]">
        {enviando ? (
          <div>
            <div className="mb-[8px] flex items-center gap-[10px]">
              <span className="size-[18px] animate-spin rounded-full border-2 border-accent border-t-transparent" />
              <p className="flex-1 font-bold">
                {progresso < 0.08 ? 'Preparando mídia…' : progresso < 1 ? `Enviando ${Math.round(progresso * 100)}%` : 'Finalizando…'}
              </p>
              <span className="font-extrabold text-danger">Cancelar</span>
            </div>
            <div className="h-[6px] rounded-full bg-surface-dark-soft">
              <div className="h-[6px] rounded-full bg-accent transition-[width] duration-300" style={{ width: `${Math.round(progresso * 100)}%` }} />
            </div>
            <p className="mt-[6px] text-[11px] text-ink-soft">Mantenha o app aberto — se a rede cair, o envio retoma de onde parou.</p>
          </div>
        ) : (
          <span className="flex h-[54px] items-center justify-center rounded-full bg-accent text-[15px] font-extrabold text-ink">
            Publicar no Explorar
          </span>
        )}
      </div>
    </div>
  )
}

function Publicado() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[24px] text-center">
      <span className="mb-[20px] flex size-[72px] items-center justify-center rounded-full bg-accent">
        <PartnerIcon name="gallery" size={30} color="#111216" strokeWidth={2.2} />
      </span>
      <p className="mb-[6px] font-sans text-[22px] font-extrabold">Publicado!</p>
      <p className="mb-[32px] text-[15px] text-white/66">Seu post já está no Explorar dos clientes.</p>
      <span className="mb-[8px] flex h-[54px] min-w-[240px] items-center justify-center rounded-full bg-accent px-[24px] font-extrabold text-ink">
        Ver em Meu conteúdo
      </span>
      <span className="flex h-[46px] items-center font-bold">Publicar outro</span>
    </div>
  )
}
