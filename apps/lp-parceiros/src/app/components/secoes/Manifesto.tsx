'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn, useSafeReducedMotion } from '@mallevo/ui'
import { VITRINES } from '../../dados/vitrines'
import { VitrineLoja } from '../app/VitrineLoja'
import { PartnerIcon } from '../marca/PartnerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const CAFE = VITRINES[0]

/** A lista genérica: cada loja, uma linha cinza igual à do lado. */
const LINHAS = [
  { nome: 'Burger House DV', meta: 'Lanches · 30–40 min · R$ 5,90', foto: '/images/shopping/lojas/burger-house/duplo-smash.webp' },
  { nome: 'Café Aroma', meta: 'Cafeteria · 20–30 min · Grátis', foto: '/images/shopping/lojas/cafe-aroma/cappuccino.webp' },
  { nome: 'Forno Real', meta: 'Pizzaria · 40–50 min · R$ 5,90', foto: '/images/shopping/lojas/forno-real/margherita.webp' },
]

const FRASE_LISTA = ['Em', 'app', 'de', 'entrega,', 'sua', 'loja', 'é', 'mais', 'uma', 'linha', 'na', 'lista.']

/**
 * Manifesto — o que muda para a loja. A seção gruda: primeiro a frase da
 * lista acende palavra a palavra sobre uma lista genérica; depois a linha
 * do Café Aroma rompe a lista e abre na vitrine dele (o recorte cresce da
 * linha até o cartão inteiro). No fim, a folha clara sobe por cima.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // 0 → 0,3: a frase da lista acende. 0,34 → 0,68: a linha vira vitrine.
  const abre = useTransform(p, [0.34, 0.68], [0, 1], { clamp: true })
  const fraseUmSai = useTransform(p, [0.5, 0.6], [1, 0])
  const fraseDoisEntra = useTransform(p, [0.58, 0.7], [0, 1])
  const fraseDoisY = useTransform(p, [0.58, 0.7], [28, 0])
  const linhaOpacidade = useTransform(abre, [0, 0.3], [1, 0])
  const vizinhaSobe = useTransform(abre, [0, 0.6], [0, -70])
  const vizinhaDesce = useTransform(abre, [0, 0.6], [0, 70])
  const vizinhaOpacidade = useTransform(abre, [0, 0.45], [1, 0])
  const zoom = useTransform(abre, [0, 1], [1.08, 1])
  // O recorte nasce do tamanho da linha do meio (84px × até 580px) e abre
  // até o palco inteiro; o raio vai do da linha ao do cartão.
  const recorte = useTransform(
    abre,
    (t) =>
      `inset(calc((50% - 42px) * ${(1 - t).toFixed(4)}) calc((50% - min(290px, 46%)) * ${(1 - t).toFixed(4)}) round ${(18 + 22 * t).toFixed(1)}px)`,
  )
  const legenda = useTransform(p, [0.7, 0.8], [0, 1])
  // A folha clara cobre o fim da seção: a fachada recua e escurece.
  const recuo = useTransform(p, [0.86, 1], [1, 0.93])
  const veu = useTransform(p, [0.86, 1], [0, 0.55])

  if (reduce) {
    return (
      <section id="manifesto" data-tema="escuro" className="relative bg-marquee px-5 pb-[calc(30vh+7rem)] pt-28 md:px-8">
        <div className="mx-auto max-w-[1180px] text-center">
          <Sobrelinha aoVivo className="justify-center">
            Vitrine própria
          </Sobrelinha>
          <p className="mx-auto mt-6 max-w-[22ch] text-[clamp(22px,2.4vw,34px)] font-semibold leading-[1.15] tracking-[-0.03em] text-white/45">
            Em app de entrega, sua loja é mais uma linha na lista.
          </p>
          <h2 className="mx-auto mt-4 text-[clamp(40px,6vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
            Aqui, ela tem <span className="italic text-accent">vitrine própria.</span>
          </h2>
          <VitrineLoja loja={CAFE} className="mt-14 h-[min(78svh,700px)] text-left" />
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="manifesto" data-tema="escuro" className="relative h-[320vh] bg-marquee">
      <motion.div className="sticky top-0 flex h-svh flex-col overflow-hidden" style={{ scale: recuo }}>
        <div aria-hidden className="glow-marquise absolute inset-0 opacity-70" />

        {/* As duas frases, no mesmo lugar */}
        <div className="relative z-20 mx-auto w-full max-w-[1180px] px-5 pt-24 text-center md:px-8 md:pt-28">
          <Sobrelinha aoVivo className="justify-center">
            Vitrine própria
          </Sobrelinha>
          <div className="relative mt-5 md:mt-6">
            <motion.p
              className="mx-auto max-w-[20ch] text-[clamp(32px,4.6vw,76px)] font-semibold leading-[1] tracking-[-0.045em] text-white"
              style={{ opacity: fraseUmSai }}
            >
              {FRASE_LISTA.map((palavra, i) => (
                <Palavra key={i} progresso={p} indice={i} total={FRASE_LISTA.length}>
                  {palavra}
                </Palavra>
              ))}
            </motion.p>
            <motion.h2
              className="absolute inset-x-0 top-0 mx-auto max-w-[20ch] text-[clamp(32px,4.6vw,76px)] font-semibold leading-[1] tracking-[-0.045em] text-white"
              style={{ opacity: fraseDoisEntra, y: fraseDoisY }}
            >
              Aqui, ela tem <span className="italic text-accent">vitrine própria.</span>
            </motion.h2>
          </div>
        </div>

        {/* O palco: a lista, e a vitrine que nasce dela */}
        <div className="relative z-10 mx-auto my-6 w-full max-w-[1180px] flex-1 px-4 md:my-10 md:px-8">
          <div className="relative h-full">
            {/* A vitrine, recortada na linha do meio — o recorte abre até o cartão inteiro. */}
            <motion.div className="absolute inset-0" style={{ clipPath: recorte }}>
              <motion.div className="h-full origin-center" style={{ scale: zoom }}>
                <VitrineLoja loja={CAFE} className="h-full" />
              </motion.div>
            </motion.div>

            {/* As linhas da lista, por cima */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
              <motion.div style={{ y: vizinhaSobe, opacity: vizinhaOpacidade }} className="w-[min(580px,92%)]">
                <Linha {...LINHAS[0]} />
              </motion.div>
              <motion.div style={{ opacity: linhaOpacidade }} className="w-[min(580px,92%)]">
                <Linha {...LINHAS[1]} destaque />
              </motion.div>
              <motion.div style={{ y: vizinhaDesce, opacity: vizinhaOpacidade }} className="w-[min(580px,92%)]">
                <Linha {...LINHAS[2]} />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.p
          className="relative z-20 mx-auto mb-8 max-w-[560px] px-5 text-center text-[clamp(15px,1.15vw,17px)] leading-[1.6] text-white/66 md:mb-10"
          style={{ opacity: legenda }}
        >
          Cor, letra e jeito de expor são da sua loja — o shopping só emoldura.
        </motion.p>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-40 bg-black" style={{ opacity: veu }} />
      </motion.div>
    </section>
  )
}

/** Uma linha de lista genérica: a loja reduzida a miniatura, nome e prazo. */
function Linha({ nome, meta, foto, destaque = false }: { nome: string; meta: string; foto: string; destaque?: boolean }) {
  return (
    <div
      className={cn(
        'flex h-[84px] items-center gap-4 rounded-[18px] border px-3.5 font-sistema',
        destaque ? 'border-white/15 bg-[#2a2b2f]' : 'border-white/[0.07] bg-[#222326]',
      )}
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-[12px] grayscale">
        <Image src={foto} alt="" fill sizes="56px" className="object-cover opacity-80" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] font-semibold text-white/85">{nome}</span>
        <span className="mt-0.5 block truncate text-[13px] text-white/55">{meta}</span>
      </span>
      <PartnerIcon name="chevron-right" size={18} className="shrink-0 text-white/30" />
    </div>
  )
}

function Palavra({
  children,
  progresso,
  indice,
  total,
}: {
  children: string
  progresso: MotionValue<number>
  indice: number
  total: number
}) {
  // As palavras acendem no primeiro terço do percurso, uma após a outra.
  const inicio = 0.02 + (indice / total) * 0.26
  const opacity = useTransform(progresso, [inicio, inicio + 0.05], [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}
