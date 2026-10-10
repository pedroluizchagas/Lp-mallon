'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn, useSafeReducedMotion } from '@mallevo/ui'
import { POSTS, type PostPassarela } from '../../dados/shopping'
import { VitrineCard } from '../app/VitrineCard'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * Passarela — "Ao vivo no shopping". O statement fica parado no meio da
 * fachada enquanto os posts das lojas sobem em três profundidades: os de
 * trás desfocados e lentos, os da frente nítidos e rápidos. As palavras
 * acendem conforme a rolagem; no fim, a folha clara sobe por cima.
 */

type Camada = 'frente' | 'meio' | 'fundo'

interface Vaga {
  post: string
  /** Posição horizontal (classes `left-*`, por largura de tela). */
  x: string
  /** Altura de partida (vh) quando a seção gruda. */
  y: number
  /** Multiplicador do percurso — a profundidade em velocidade. */
  v: number
  giro: number
  largura: string
  camada: Camada
  /** Some no celular (tela estreita não comporta todas). */
  soDesktop?: boolean
}

const VAGAS: Vaga[] = [
  { post: 'cafe', x: 'left-[8%] md:left-[33%]', y: 96, v: 0.6, giro: 2, largura: 'w-[26vw] md:w-[clamp(110px,9vw,150px)]', camada: 'fundo' },
  { post: 'pet', x: 'left-[66%] md:left-[57%]', y: 126, v: 0.66, giro: -4, largura: 'w-[26vw] md:w-[clamp(110px,9.5vw,156px)]', camada: 'fundo' },
  { post: 'mercado', x: 'left-[1%]', y: 168, v: 0.58, giro: 5, largura: 'w-[clamp(100px,8.5vw,140px)]', camada: 'fundo', soDesktop: true },
  { post: 'pilates', x: 'left-[89%]', y: 150, v: 0.6, giro: -2, largura: 'w-[clamp(100px,8.5vw,140px)]', camada: 'fundo', soDesktop: true },
  { post: 'barbearia', x: 'left-[41%]', y: 232, v: 0.64, giro: 3, largura: 'w-[clamp(110px,10vw,160px)]', camada: 'fundo', soDesktop: true },
  { post: 'fisio', x: 'left-[69%]', y: 276, v: 0.6, giro: -3, largura: 'w-[clamp(100px,9vw,150px)]', camada: 'fundo', soDesktop: true },
  { post: 'idiomas', x: 'left-[22%]', y: 156, v: 0.84, giro: -3, largura: 'w-[clamp(120px,11vw,180px)]', camada: 'meio', soDesktop: true },
  { post: 'poltrona', x: 'left-[65%]', y: 188, v: 0.86, giro: 3, largura: 'w-[clamp(120px,11vw,180px)]', camada: 'meio', soDesktop: true },
  { post: 'burger', x: 'left-[3%] md:left-[1.5%]', y: 92, v: 1, giro: -6, largura: 'w-[38vw] md:w-[clamp(150px,14vw,220px)]', camada: 'frente' },
  { post: 'buque', x: 'left-[58%] md:left-[83%]', y: 116, v: 1.06, giro: 5, largura: 'w-[36vw] md:w-[clamp(150px,13.5vw,214px)]', camada: 'frente' },
  { post: 'sushi', x: 'left-[4%] md:left-[3%]', y: 206, v: 1.02, giro: 4, largura: 'w-[36vw] md:w-[clamp(150px,13.5vw,214px)]', camada: 'frente' },
  { post: 'bella', x: 'left-[56%] md:left-[82%]', y: 238, v: 0.98, giro: -5, largura: 'w-[38vw] md:w-[clamp(150px,14vw,220px)]', camada: 'frente' },
]

const PERCURSO = 250

const ESTILO_CAMADA: Record<Camada, string> = {
  fundo: 'z-0 opacity-45 blur-[3px]',
  meio: 'z-10 opacity-80 blur-[1px]',
  // No celular a frente também passa por trás do texto: a tela é estreita
  // demais para um card cruzar o statement sem apagá-lo.
  frente: 'z-10 md:z-30',
}

const STATEMENT: { texto: string; acesa?: boolean }[] = [
  { texto: 'Divinópolis' },
  { texto: 'acabou' },
  { texto: 'de' },
  { texto: 'pôr', acesa: true },
  { texto: 'na', acesa: true },
  { texto: 'vitrine.', acesa: true },
]

export function Passarela() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const legendaOpacidade = useTransform(p, [0.42, 0.56], [0, 1])
  const legendaY = useTransform(p, [0.42, 0.56], [24, 0])
  // A folha clara cobre o fim da seção: a fachada recua e escurece.
  const recuo = useTransform(p, [0.8, 1], [1, 0.93])
  const veu = useTransform(p, [0.8, 1], [0, 0.55])

  const porId = (id: string) => POSTS.find((post) => post.id === id) as PostPassarela

  return (
    <section
      ref={ref}
      id="passarela"
      data-tema="escuro"
      className={cn('relative bg-marquee', reduce ? 'px-5 py-28 text-center md:px-8' : 'h-[300vh]')}
    >
      {reduce ? (
        <>
          <Sobrelinha aoVivo className="justify-center">
            Ao vivo no shopping
          </Sobrelinha>
          <h2 className="mx-auto mt-6 max-w-[16ch] text-[clamp(40px,6vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
            Divinópolis acabou de <span className="italic text-accent">pôr na vitrine.</span>
          </h2>
          <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-4 md:grid-cols-4">
            {POSTS.slice(0, 8).map((post) => (
              <VitrineCard key={post.id} post={post} sizes="260px" />
            ))}
          </div>
        </>
      ) : (
        <motion.div className="sticky top-0 h-svh overflow-hidden" style={{ scale: recuo }}>
          <div aria-hidden className="glow-marquise absolute inset-0 opacity-70" />

          {VAGAS.map((vaga) => (
            <CardVoando key={vaga.post} vaga={vaga} post={porId(vaga.post)} progresso={p} />
          ))}

          <div className="pointer-events-none relative z-20 flex h-full flex-col items-center justify-center px-5 text-center">
            <Sobrelinha aoVivo>Ao vivo no shopping</Sobrelinha>
            <h2 className="mt-6 max-w-[14ch] text-[clamp(40px,6.2vw,108px)] font-semibold leading-[0.95] tracking-[-0.045em] text-white [text-shadow:0_4px_40px_rgb(24_24_27/0.9)]">
              {STATEMENT.map((palavra, i) => (
                <Palavra key={i} progresso={p} indice={i} total={STATEMENT.length} acesa={palavra.acesa}>
                  {palavra.texto}
                </Palavra>
              ))}
            </h2>
            <motion.div style={{ opacity: legendaOpacidade, y: legendaY }} className="pointer-events-auto mt-8 max-w-[460px]">
              <p className="text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-white/66">
                Cada loja publica o que acabou de chegar — o lote de café, o buquê do dia, o combinado montado na
                hora. Você vê, curte e pede no mesmo lugar.
              </p>
              <a href="#explorar" className="sublinha mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-white">
                Como funciona o Explorar
                <ConsumerIcon name="chevron-right" size={16} strokeWidth={2.2} />
              </a>
            </motion.div>
          </div>

          <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-40 bg-black" style={{ opacity: veu }} />
        </motion.div>
      )}
    </section>
  )
}

function CardVoando({ vaga, post, progresso }: { vaga: Vaga; post: PostPassarela; progresso: MotionValue<number> }) {
  const y = useTransform(progresso, [0, 1], [`${vaga.y}vh`, `${vaga.y - vaga.v * PERCURSO}vh`])
  const rotate = useTransform(progresso, [0, 1], [vaga.giro, vaga.giro * -0.6])
  return (
    <motion.div
      aria-hidden
      className={cn('absolute top-0', vaga.x, ESTILO_CAMADA[vaga.camada], vaga.largura, vaga.soDesktop && 'hidden md:block')}
      style={{ y, rotate }}
    >
      <VitrineCard
        post={post}
        className="w-full shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]"
        sizes={vaga.camada === 'frente' ? '(min-width: 768px) 220px, 38vw' : '(min-width: 768px) 160px, 26vw'}
      />
    </motion.div>
  )
}

function Palavra({
  children,
  progresso,
  indice,
  total,
  acesa,
}: {
  children: string
  progresso: MotionValue<number>
  indice: number
  total: number
  acesa?: boolean
}) {
  // As palavras acendem na primeira metade do percurso, uma após a outra.
  const inicio = 0.04 + (indice / total) * 0.36
  const opacity = useTransform(progresso, [inicio, inicio + 0.08], [0.14, 1])
  return (
    <>
      <motion.span style={{ opacity }} className={cn(acesa && 'italic text-accent')}>
        {children}
      </motion.span>{' '}
    </>
  )
}
