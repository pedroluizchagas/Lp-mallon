'use client'

import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE, useSafeReducedMotion } from '@mallevo/ui'
import { PEDIDOS_DEMO, type PedidoDemo } from '../../dados/balcao'
import { saudacao } from '../../lib/divinopolis'
import { LINKS } from '../../lib/links'
import { useAgora } from '../../lib/useAgora'
import { Celular } from '../app/Celular'
import { TelaInicioLojista, type NumerosDoDia } from '../app/TelaInicioLojista'
import { VitrineCard } from '../app/VitrineCard'
import { PainelAoVivo } from '../painel/PainelAoVivo'
import { PartnerIcon } from '../marca/PartnerIcon'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'

/** O começo da noite no balcão do Café Aroma (centavos). */
const NUMEROS_INICIAIS: NumerosDoDia = { receita: 41230, pedidos: 11, preparo: 2, entrega: 1 }

type Fase = 'aguardando' | 'tocando' | 'vazio'

/** Quanto cada momento dura na tela (ms). O primeiro espera a entrada do hero. */
const DURACAO: Record<Fase, number> = { aguardando: 3800, tocando: 700, vazio: 2300 }
const PRIMEIRA_ESPERA = 5200

const POST_DA_LOJA = {
  loja: 'Café Aroma',
  corLoja: '#F2A33C',
  titulo: 'Café Coado da Casa 300ml',
  sublinha: 'R$ 9,90',
  foto: '/images/shopping/posts/cafe-coado.webp',
}

/**
 * Hero — a marquise do balcão. O statement é o do próprio app do lojista
 * ("Sua loja, ao vivo no shopping.") e o celular mostra o Início dele, vivo:
 * um pedido chega, o lojista confirma, os números do dia andam, chega o
 * próximo. O botão de som toca o aviso de verdade do app.
 */
export function Marquise() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const agora = useAgora(60_000)
  const emVista = useInView(ref, { amount: 0.35 })
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textoOpacidade = useTransform(p, [0, 0.55], [1, 0])
  const textoDesfoque = useTransform(p, [0, 0.55], ['blur(0px)', 'blur(10px)'])
  const textoY = useTransform(p, [0, 1], [0, -90])
  const celularY = useTransform(p, [0, 1], [0, 140])
  const celularEscala = useTransform(p, [0, 1], [1, 0.92])
  const cartaA = useTransform(p, [0, 1], [0, -170])
  const cartaB = useTransform(p, [0, 1], [0, -60])

  // Inclinação que segue o cursor: o celular gira de leve, as peças soltas
  // flutuam em profundidades diferentes.
  const mola = { stiffness: 90, damping: 20, mass: 0.6 }
  const mx = useSpring(useMotionValue(0), mola)
  const my = useSpring(useMotionValue(0), mola)
  const giroY = useTransform(mx, [-1, 1], [-16, -4])
  const giroX = useTransform(my, [-1, 1], [9, 1])
  const fundoX = useTransform(mx, [-1, 1], [14, -14])
  const fundoY = useTransform(my, [-1, 1], [10, -10])
  const frenteX = useTransform(mx, [-1, 1], [-26, 26])
  const frenteY = useTransform(my, [-1, 1], [-18, 18])
  const fundoYTotal = useTransform([cartaB, fundoY], ([a, b]: number[]) => a + b)
  const frenteYTotal = useTransform([cartaA, frenteY], ([a, b]: number[]) => a + b)

  const aoMover = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  // ─── O balcão andando sozinho ─────────────────────────────────────────
  const [fase, setFase] = useState<Fase>('aguardando')
  const [indice, setIndice] = useState(0)
  const [numeros, setNumeros] = useState(NUMEROS_INICIAIS)
  const [aviso, setAviso] = useState<PedidoDemo | null>(null)
  const primeira = useRef(true)

  const novo = fase === 'vazio' ? null : PEDIDOS_DEMO[indice]

  useEffect(() => {
    if (reduce || !emVista) return
    const espera = primeira.current && fase === 'aguardando' ? PRIMEIRA_ESPERA : DURACAO[fase]
    const relogio = window.setTimeout(() => {
      primeira.current = false
      if (fase === 'aguardando') setFase('tocando')
      else if (fase === 'tocando') {
        // Confirmado: o pedido sai da marquise e entra no preparo.
        const pedido = PEDIDOS_DEMO[indice]
        setNumeros((n) => {
          const preparo = n.preparo + 1
          // Um dos que estavam no preparo sai para entrega; um da rua chega.
          const sai = preparo > 3 ? 1 : 0
          const entrega = Math.min(2, n.entrega + sai)
          return { receita: n.receita + pedido.total, pedidos: n.pedidos + 1, preparo: preparo - sai, entrega }
        })
        setFase('vazio')
      } else {
        const proximo = (indice + 1) % PEDIDOS_DEMO.length
        setIndice(proximo)
        setAviso(PEDIDOS_DEMO[proximo])
        setFase('aguardando')
      }
    }, espera)
    return () => window.clearTimeout(relogio)
  }, [fase, indice, emVista, reduce])

  // O aviso do painel some sozinho.
  useEffect(() => {
    if (!aviso) return
    const relogio = window.setTimeout(() => setAviso(null), 3400)
    return () => window.clearTimeout(relogio)
  }, [aviso])

  const audio = useRef<HTMLAudioElement | null>(null)
  const [tocouSom, setTocouSom] = useState(0)
  const ouvirAviso = () => {
    audio.current ??= new Audio('/som/pedido-novo.wav')
    audio.current.currentTime = 0
    void audio.current.play().catch(() => {})
    setTocouSom((n) => n + 1)
    setAviso(PEDIDOS_DEMO[indice])
  }

  const hora = agora?.hora ?? 20
  const saudar = saudacao(hora)

  return (
    <section
      ref={ref}
      id="topo"
      data-tema="escuro"
      className="grao relative isolate overflow-hidden bg-marquee"
      onPointerMove={aoMover}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <div aria-hidden className="glow-marquise absolute inset-0 animate-respira" />
      <Cruzes />

      <div className="relative mx-auto grid min-h-svh max-w-[1440px] grid-cols-12 items-center gap-x-6 px-5 pb-20 pt-28 md:px-8 lg:pb-12 lg:pt-24">
        <motion.div
          className="col-span-12 lg:col-span-7"
          style={reduce ? undefined : { opacity: textoOpacidade, filter: textoDesfoque, y: textoY }}
        >
          <div className="entra-bloco" style={{ ['--d' as string]: '0s' }}>
            <Sobrelinha aoVivo>Mallevo para lojistas · Divinópolis</Sobrelinha>
          </div>

          <h1 className="mt-7 text-[clamp(46px,12.5vw,72px)] font-semibold leading-[0.92] tracking-[-0.045em] text-white [word-spacing:0.06em] md:text-[80px] lg:text-[clamp(64px,6.6vw,100px)]">
            <span className="entra-titulo" style={{ ['--d' as string]: '0.04s' }}>
              Sua loja,
            </span>
            {/* "no shopping." não se separa: a quebra cai em "ao vivo / no shopping." */}
            <span className="entra-titulo pb-[0.06em] italic text-accent" style={{ ['--d' as string]: '0.16s' }}>
              ao vivo no{'\u00a0'}shopping.
            </span>
          </h1>

          <p
            className="entra-bloco mt-7 max-w-[560px] text-[clamp(17px,1.3vw,19px)] leading-[1.6] text-white/66"
            style={{ ['--d' as string]: '0.34s' }}
          >
            Abra sua loja no shopping digital de Divinópolis: vitrine com a cara dela, posts no Explorar e os
            pedidos chegando ao vivo, com som e aviso — no app e no painel. A comissão é de 9,1% por pedido.
          </p>

          <div className="entra-bloco mt-10 flex flex-wrap items-center gap-3" style={{ ['--d' as string]: '0.44s' }}>
            <Botao href={LINKS.cadastro} externo>
              Cadastrar minha loja
            </Botao>
            <Botao href="#balcao" variante="vidro" icone="chevron-down">
              Ver o balcão por dentro
            </Botao>
          </div>

          <div className="entra-bloco mt-6" style={{ ['--d' as string]: '0.5s' }}>
            <button
              type="button"
              onClick={ouvirAviso}
              className="group inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-[14px] font-semibold text-white/66 transition-colors hover:text-white"
            >
              <span className="relative flex size-9 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-white/[0.14]">
                {tocouSom > 0 && (
                  <span key={tocouSom} aria-hidden className="absolute inset-0 rounded-full bg-accent/40 [animation:onda_0.9s_var(--ease-entrada)_forwards]" />
                )}
                <span key={`sino-${tocouSom}`} className="flex origin-top [animation:toca_0.9s_var(--ease-suave)]">
                  <PartnerIcon name="bell" size={17} strokeWidth={2} className="text-accent" />
                </span>
              </span>
              Ouça o aviso de pedido novo
            </button>
          </div>

          <ul
            className="entra-bloco mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[13.5px] font-semibold text-white/55"
            style={{ ['--d' as string]: '0.58s' }}
          >
            <li className="flex items-center gap-2">
              <PartnerIcon name="cash" size={17} className="text-accent" />
              9,1% de comissão
            </li>
            <li className="flex items-center gap-2">
              <PartnerIcon name="store" size={17} className="text-accent" />
              Endereço próprio na web
            </li>
            <li className="flex items-center gap-2">
              <PartnerIcon name="clock" size={17} className="text-accent" />
              15 dias para testar
            </li>
          </ul>
        </motion.div>

        <div className="relative col-span-12 mt-24 flex justify-center lg:col-span-5 lg:mt-0">
          <motion.div className="relative [perspective:1800px]" style={reduce ? undefined : { y: celularY, scale: celularEscala }}>
            {/* Halo de neon sob o aparelho: a luz da marquise refletida no balcão. */}
            <div
              aria-hidden
              className="entra-fade absolute -inset-x-[30%] bottom-[-14%] h-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(193_241_72/0.32),transparent)] blur-2xl"
              style={{ ['--d' as string]: '0.5s' }}
            />

            {/* O post da loja aceso na fachada de quem compra (atrás do celular) */}
            <motion.div
              aria-hidden
              className="absolute -right-[40%] top-[3%] hidden w-[138px] rotate-[7deg] sm:block xl:w-[150px]"
              style={reduce ? undefined : { x: fundoX, y: fundoYTotal }}
            >
              <div className="entra-bloco brightness-75" style={{ ['--d' as string]: '0.62s' }}>
                <VitrineCard post={POST_DA_LOJA} className="w-full shadow-[0_40px_70px_-30px_rgb(0_0_0/0.8)]" sizes="150px" />
              </div>
            </motion.div>

            <motion.div
              className="relative [transform-style:preserve-3d]"
              style={reduce ? { rotateY: -10, rotateX: 4 } : { rotateY: giroY, rotateX: giroX }}
            >
              <div className="entra-bloco" style={{ ['--d' as string]: '0.22s' }}>
                <Celular
                  rotulo={`Tela inicial do app do lojista: a marquise do Café Aroma com os números do dia e ${novo ? `um pedido novo de ${novo.cliente} esperando confirmação` : 'nenhum pedido esperando'}.`}
                  className="[--k:0.7] sm:[--k:0.78] lg:[--k:0.7] xl:[--k:0.74] [@media(min-width:1280px)_and_(min-height:900px)]:[--k:0.8] [@media(min-width:1280px)_and_(min-height:1000px)]:[--k:0.86]"
                >
                  <TelaInicioLojista saudacao={saudar} numeros={numeros} novo={novo} tocando={fase === 'tocando'} />
                </Celular>
              </div>
            </motion.div>

            {/* O mesmo pedido chegando no painel web, ao mesmo tempo */}
            <motion.div
              aria-hidden
              className="absolute -left-[6%] -top-[6%] w-[min(310px,84vw)] sm:-left-[58%] sm:top-[36%] lg:-left-[64%] xl:-left-[72%]"
              style={reduce ? undefined : { x: frenteX, y: frenteYTotal }}
            >
              <AnimatePresence>
                {aviso && (
                  <motion.div
                    key={`${aviso.id}-${tocouSom}`}
                    initial={{ opacity: 0, y: -26, scale: 0.94, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
                    exit={{ opacity: 0, y: -14, scale: 0.97, transition: { duration: 0.35, ease: EASE.saida } }}
                    transition={{ duration: 0.7, ease: EASE.entrada }}
                  >
                    <PainelAoVivo pedido={aviso} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Convite para rolar, alinhado ao texto. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 hidden lg:block">
        <div className="mx-auto max-w-[1440px] px-8">
          <a
            href="#manifesto"
            className="entra-fade pointer-events-auto inline-flex items-center gap-3 text-white/55 transition-colors hover:text-white"
            style={{ ['--d' as string]: '0.9s' }}
          >
            <span className="relative h-8 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[desce_1.8s_var(--ease-suave)_infinite] bg-accent" />
            </span>
            <span className="micro">Role para abrir a loja</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/** As cruzes de alinhamento da fachada (o grid que a referência deixa à mostra). */
function Cruzes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px] px-5 md:px-8">
      <div className="entra-fade relative h-full" style={{ ['--d' as string]: '0.3s' }}>
        {[
          ['0%', '22%'],
          ['33.33%', '22%'],
          ['66.66%', '22%'],
          ['100%', '22%'],
          ['0%', '78%'],
          ['100%', '78%'],
        ].map(([x, y]) => (
          <span
            key={`${x}-${y}`}
            className="absolute size-3 -translate-x-1/2 -translate-y-1/2 text-white/[0.18]"
            style={{ left: x, top: y }}
          >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          </span>
        ))}
      </div>
    </div>
  )
}
