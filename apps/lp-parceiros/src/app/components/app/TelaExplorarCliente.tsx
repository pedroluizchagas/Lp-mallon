'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { POST_ANTERIOR, POST_DEMO, type PostExplorar } from '../../dados/conteudo'
import { PartnerIcon, type PartnerIconName } from '../marca/PartnerIcon'
import { StatusBar, TabBarCliente } from './Cromo'

/**
 * O Explorar do app de quem compra (components/explorar/FeedReels.tsx): o
 * feed vertical de posts das lojas. Quando o lojista publica, o post dele
 * entra no topo — com o produto a um toque da sacola. Só as ações que o
 * feed tem de verdade: curtir (que favorita), compartilhar e ir à sacola.
 */
export function TelaExplorarCliente({ publicado }: { publicado: boolean }) {
  const post = publicado ? POST_DEMO : POST_ANTERIOR
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-ink font-sistema text-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={post.loja}
          className="absolute inset-0"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <Post post={post} />
        </motion.div>
      </AnimatePresence>

      <div aria-hidden className="absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-black/55 to-transparent" />
      <StatusBar />
      <div className="absolute inset-x-0 top-[56px] flex items-center justify-between px-[16px]">
        <p className="font-sans text-[22px] font-bold tracking-[-0.4px]">Explorar</p>
        <span className="flex size-[40px] items-center justify-center rounded-full bg-white/[0.14] backdrop-blur-md">
          <PartnerIcon name="search" size={19} strokeWidth={2} />
        </span>
      </div>
      <TabBarCliente ativa="reels" />
    </div>
  )
}

function Post({ post }: { post: PostExplorar }) {
  return (
    <>
      <div className="absolute inset-0 animate-[ken-burns_14s_var(--ease-suave)_infinite_alternate]">
        <Image src={post.foto} alt="" fill sizes="390px" className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgb(0_0_0/0.5)_66%,rgb(0_0_0/0.84)_100%)]" />

      {/* Coluna de ações */}
      <div className="absolute bottom-[132px] right-[10px] flex flex-col items-center gap-[16px]">
        <Acao icone="volume" />
        <Acao icone="heart" />
        <Acao icone="send" />
        <span className="mt-[2px] flex size-[46px] items-center justify-center rounded-full bg-accent text-ink shadow-[0_8px_20px_rgb(0_0_0/0.35)]">
          <PartnerIcon name="bag" size={21} strokeWidth={2.1} />
        </span>
      </div>

      {/* Esquerda: loja · descrição · produto (a ordem do app). */}
      <div className="absolute bottom-[112px] left-[16px] right-[80px]">
        <div className="flex items-center gap-[10px]">
          <span className="flex size-[34px] items-center justify-center rounded-full bg-accent font-sans text-[15px] font-bold text-ink">
            {post.inicial}
          </span>
          <span className="text-[15px] font-bold">{post.loja}</span>
          <span className="rounded-full border border-accent px-[10px] py-[3px] text-[12px] font-bold text-accent">Seguir</span>
        </div>
        <p className="mt-[10px] line-clamp-3 text-[14px] leading-[19px] text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
          {post.descricao}
        </p>
        <p className="mt-[6px] text-[13px] font-semibold text-white/70">{post.tags.join('  ')}</p>
        <span className="mt-[10px] inline-flex items-center gap-[8px] rounded-full bg-white/[0.16] py-[7px] pl-[10px] pr-[14px] text-[13px] backdrop-blur-md">
          <PartnerIcon name="bag" size={15} color="#D8FF3E" strokeWidth={2.1} />
          <span className="font-bold">{post.produto.nome}</span>
          <span className="text-white/70">{post.produto.preco}</span>
        </span>
      </div>
    </>
  )
}

function Acao({ icone }: { icone: PartnerIconName }) {
  return (
    <span className="flex flex-col items-center [filter:drop-shadow(0_1px_6px_rgb(0_0_0/0.45))]">
      <PartnerIcon name={icone} size={28} color="#FFFFFF" strokeWidth={1.9} />
    </span>
  )
}
