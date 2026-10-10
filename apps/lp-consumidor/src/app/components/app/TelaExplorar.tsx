'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useSafeReducedMotion } from '@mallevo/ui'
import { REELS, type Reel } from '../../dados/shopping'
import { ConsumerIcon, type ConsumerIconName } from '../marca/ConsumerIcon'
import { StatusBar, TabBar } from './Cromo'

/** Tempo de cada post na tela antes de o feed rolar para o próximo. */
const RITMO_MS = 5200

/**
 * O Explorar do app (components/explorar/FeedReels.tsx): o feed vertical de
 * posts das lojas. Aqui ele rola sozinho, um post depois do outro — o mesmo
 * gesto do dedo, sem o dedo. Só as ações que o feed tem de verdade: curtir
 * (que favorita), seguir, compartilhar e ir do post à sacola.
 */
export function TelaExplorar() {
  const ref = useRef<HTMLDivElement>(null)
  const visivel = useInView(ref, { margin: '0px 0px -10% 0px' })
  const reduce = useSafeReducedMotion()
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (!visivel || reduce) return
    const relogio = setInterval(() => setIndice((i) => (i + 1) % REELS.length), RITMO_MS)
    return () => clearInterval(relogio)
  }, [visivel, reduce])

  return (
    <div ref={ref} className="relative h-[844px] w-[390px] overflow-hidden bg-ink font-sistema text-white">
      {/* Pré-carrega as fotos dos próximos posts: o feed rola sem piscar. */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 size-px overflow-hidden opacity-0">
        {REELS.map((reel) => (
          <Image key={reel.id} src={reel.foto} alt="" fill sizes="390px" />
        ))}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key={REELS[indice].id}
          className="absolute inset-0"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <Post reel={REELS[indice]} />
        </motion.div>
      </AnimatePresence>

      <div aria-hidden className="absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-black/55 to-transparent" />
      <StatusBar />
      <div className="absolute inset-x-0 top-[56px] flex items-center justify-between px-[16px]">
        <p className="font-sans text-[22px] font-bold tracking-[-0.4px]">Explorar</p>
        <span className="flex size-[40px] items-center justify-center rounded-full bg-white/[0.14] backdrop-blur-md">
          <ConsumerIcon name="search" size={19} strokeWidth={2} />
        </span>
      </div>
      <TabBar ativa="reels" />
    </div>
  )
}

function Post({ reel }: { reel: Reel }) {
  return (
    <>
      <div className="absolute inset-0 animate-[ken-burns_14s_var(--ease-suave)_infinite_alternate]">
        <Image src={reel.foto} alt="" fill sizes="390px" className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgb(0_0_0/0.5)_66%,rgb(0_0_0/0.84)_100%)]" />

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

      {/* Esquerda: loja · descrição · produto (a ordem do app). */}
      <div className="absolute bottom-[112px] left-[16px] right-[80px]">
        <div className="flex items-center gap-[10px]">
          <span className="flex size-[34px] items-center justify-center rounded-full bg-accent font-sans text-[15px] font-bold text-ink">
            {reel.inicial}
          </span>
          <span className="text-[15px] font-bold">{reel.loja}</span>
          <span className="rounded-full border border-accent px-[10px] py-[3px] text-[12px] font-bold text-accent">Seguir</span>
        </div>
        <p className="mt-[10px] line-clamp-3 text-[14px] leading-[19px] text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
          {reel.descricao}
        </p>
        <p className="mt-[6px] text-[13px] font-semibold text-white/70">{reel.tags.join('  ')}</p>
        {reel.produto && (
          <span className="mt-[10px] inline-flex items-center gap-[8px] rounded-full bg-white/[0.16] py-[7px] pl-[10px] pr-[14px] text-[13px] backdrop-blur-md">
            <ConsumerIcon name="bag" size={15} color="#D8FF3E" strokeWidth={2.1} />
            <span className="font-bold">{reel.produto.nome}</span>
            <span className="text-white/70">{reel.produto.preco}</span>
          </span>
        )}
      </div>
    </>
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
