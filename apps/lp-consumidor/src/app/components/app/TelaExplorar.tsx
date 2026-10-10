'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useSafeReducedMotion } from '@mallevo/ui'
import { COMENTARIOS, REELS } from '../../dados/shopping'
import { ConsumerIcon, type ConsumerIconName } from '../marca/ConsumerIcon'
import { StatusBar } from './Cromo'

/** Ritmo do stream (components/explorar/ComentariosLive.tsx do app). */
const RITMO_MS = 2000
const MAX_LINHAS = 5
const OPACIDADE_POR_IDADE = [1, 0.78, 0.55, 0.32, 0.18]

interface Linha {
  id: number
  autor: string
  texto: string
}

/**
 * O Explorar em modo comentários — o "ao vivo" do app: o reel continua
 * tocando, a barra de abas recolhe para a caixa de escrever e os
 * comentários sobem um a um, sem balão, esmaecendo com a idade. Quando a
 * loja responde, a linha acende no accent.
 */
export function TelaExplorar() {
  const reel = REELS[0]
  const ref = useRef<HTMLDivElement>(null)
  const visivel = useInView(ref, { margin: '0px 0px -10% 0px' })
  const reduce = useSafeReducedMotion()
  const [linhas, setLinhas] = useState<Linha[]>(() =>
    COMENTARIOS.slice(0, 3).map((c, i) => ({ id: i, autor: c.autor, texto: c.texto })),
  )

  useEffect(() => {
    if (!visivel || reduce) return
    const relogio = setInterval(() => {
      setLinhas((atual) => {
        const proximo = (atual[atual.length - 1]?.id ?? -1) + 1
        const c = COMENTARIOS[proximo % COMENTARIOS.length]
        return [...atual, { id: proximo, autor: c.autor, texto: c.texto }].slice(-MAX_LINHAS)
      })
    }, RITMO_MS)
    return () => clearInterval(relogio)
  }, [visivel, reduce])

  return (
    <div ref={ref} className="relative h-[844px] w-[390px] overflow-hidden bg-ink font-sistema text-white">
      <div className="absolute inset-0 animate-[ken-burns_14s_var(--ease-suave)_infinite_alternate]">
        <Image src={reel.foto} alt="" fill sizes="390px" className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-black/55 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_34%,rgb(0_0_0/0.55)_62%,rgb(0_0_0/0.86)_100%)]" />
      <StatusBar />

      <div className="absolute inset-x-0 top-[56px] flex items-center justify-between px-[16px]">
        <p className="font-sans text-[22px] font-bold tracking-[-0.4px]">Explorar</p>
        <span className="flex size-[40px] items-center justify-center rounded-full bg-white/[0.14] backdrop-blur-md">
          <ConsumerIcon name="search" size={19} strokeWidth={2} />
        </span>
      </div>

      {/* Coluna de ações */}
      <div className="absolute bottom-[132px] right-[10px] flex flex-col items-center gap-[16px]">
        <Acao icone="volume" />
        <Acao icone="heart" rotulo={reel.curtidas} acesa />
        <Acao icone="comment" rotulo={reel.comentarios} />
        <Acao icone="send" />
        <span className="mt-[2px] flex size-[46px] items-center justify-center rounded-full bg-accent text-ink shadow-[0_8px_20px_rgb(0_0_0/0.35)]">
          <ConsumerIcon name="bag" size={21} strokeWidth={2.1} />
        </span>
      </div>

      {/* Stream ao vivo */}
      <div className="absolute bottom-[262px] left-[16px] right-[80px] flex flex-col justify-end gap-[9px]">
        <AnimatePresence initial={false}>
          {linhas.map((linha, i) => {
            const idade = linhas.length - 1 - i
            const daLoja = linha.autor === 'loja'
            return (
              <motion.p
                key={linha.id}
                layout="position"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: OPACIDADE_POR_IDADE[idade] ?? 0.12, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="line-clamp-3 text-[14px] leading-[19px] [text-shadow:0_1px_8px_rgb(0_0_0/0.65)]"
              >
                {daLoja ? (
                  <>
                    <span className="mb-[2px] flex items-center gap-[5px] text-[12px] font-bold text-accent">
                      <ConsumerIcon name="store" size={13} strokeWidth={2.2} />
                      {reel.loja} respondeu você
                    </span>
                    <span className="text-accent">{linha.texto}</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold">{linha.autor}</span> {linha.texto}
                  </>
                )}
              </motion.p>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Informação no modo comentários: descrição · produto · loja */}
      <div className="absolute bottom-[86px] left-[16px] right-[80px]">
        <p className="line-clamp-2 text-[14px] leading-[19px] text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
          {reel.descricao}
        </p>
        {reel.produto && (
          <span className="mt-[10px] inline-flex items-center gap-[8px] rounded-full bg-white/[0.16] py-[7px] pl-[10px] pr-[14px] text-[13px] backdrop-blur-md">
            <ConsumerIcon name="bag" size={15} color="#D8FF3E" strokeWidth={2.1} />
            <span className="font-bold">{reel.produto.nome}</span>
            <span className="text-white/70">{reel.produto.preco}</span>
          </span>
        )}
        <div className="mt-[12px] flex items-center gap-[10px]">
          <span className="flex size-[34px] items-center justify-center rounded-full bg-accent font-sans text-[15px] font-bold text-ink">
            {reel.inicial}
          </span>
          <span className="text-[15px] font-bold">{reel.loja}</span>
          <span className="rounded-full border border-accent px-[10px] py-[3px] text-[12px] font-bold text-accent">Seguir</span>
        </div>
      </div>

      {/* A barra de abas recolheu: o rodapé é da caixa de escrever. */}
      <div className="absolute inset-x-[12px] bottom-[22px] flex items-center gap-[10px] rounded-full border border-white/15 bg-white/[0.1] px-[16px] py-[12px] backdrop-blur-md">
        <span className="flex-1 text-[14px] text-white/55">Comente algo para a loja…</span>
        <ConsumerIcon name="send" size={19} color="#D8FF3E" strokeWidth={2} />
      </div>
    </div>
  )
}

function Acao({ icone, rotulo, acesa = false }: { icone: ConsumerIconName; rotulo?: string; acesa?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-[3px] [filter:drop-shadow(0_1px_6px_rgb(0_0_0/0.45))]">
      <ConsumerIcon
        name={icone}
        size={28}
        color={acesa ? '#FF6D5E' : '#FFFFFF'}
        strokeWidth={1.9}
        className={acesa ? '[&_path]:fill-danger' : undefined}
      />
      {rotulo && <span className="text-[12px] font-semibold">{rotulo}</span>}
    </span>
  )
}
