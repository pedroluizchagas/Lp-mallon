'use client'

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from '@mallevo/ui'
import { POSTS } from '../../dados/shopping'
import { saudacao, useAgora } from '../../lib/divinopolis'
import { CartaoPedidoVivo } from '../app/CartaoPedidoVivo'
import { Celular } from '../app/Celular'
import { TelaInicio } from '../app/TelaInicio'
import { VitrineCard } from '../app/VitrineCard'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * Hero — a marquise. A fachada do shopping à noite: zinco quente com o neon
 * lima vazando, o statement do app ("A cidade inteira, na sua mão.") e o
 * Início de verdade no celular, com as vitrines acesas flutuando em volta.
 * A entrada é CSS (não espera a hidratação); a saída acompanha a rolagem.
 */
export function Marquise() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const agora = useAgora(60_000)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textoOpacidade = useTransform(p, [0, 0.55], [1, 0])
  const textoDesfoque = useTransform(p, [0, 0.55], ['blur(0px)', 'blur(10px)'])
  const textoY = useTransform(p, [0, 1], [0, -90])
  const celularY = useTransform(p, [0, 1], [0, 140])
  const celularEscala = useTransform(p, [0, 1], [1, 0.92])
  const cartaA = useTransform(p, [0, 1], [0, -160])
  const cartaB = useTransform(p, [0, 1], [0, -60])
  const cartaC = useTransform(p, [0, 1], [0, -240])

  // Inclinação que segue o cursor: o celular gira de leve, as vitrines
  // flutuam em profundidades diferentes (paralaxe de mão).
  const mola = { stiffness: 90, damping: 20, mass: 0.6 }
  const mx = useSpring(useMotionValue(0), mola)
  const my = useSpring(useMotionValue(0), mola)
  const giroY = useTransform(mx, [-1, 1], [-16, -4])
  const giroX = useTransform(my, [-1, 1], [9, 1])
  const fundoX = useTransform(mx, [-1, 1], [14, -14])
  const fundoY = useTransform(my, [-1, 1], [10, -10])
  const frenteX = useTransform(mx, [-1, 1], [-26, 26])
  const frenteY = useTransform(my, [-1, 1], [-18, 18])
  // Rolagem + mão no mesmo eixo: soma das duas camadas.
  const fundoYTotal = useTransform([cartaB, fundoY], ([a, b]: number[]) => a + b)
  const frenteYTotal = useTransform([cartaA, frenteY], ([a, b]: number[]) => a + b)

  const aoMover = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
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
            <Sobrelinha aoVivo>
              <span suppressHydrationWarning>{`${saudar}, Divinópolis`}</span>
            </Sobrelinha>
          </div>

          {/* Escala por largura: "A cidade inteira," cabe na coluna em duas linhas, de 1024 a 1920. */}
          <h1 className="mt-7 text-[clamp(46px,12.5vw,72px)] font-semibold leading-[0.92] tracking-[-0.045em] text-white [word-spacing:0.06em] md:text-[80px] lg:text-[clamp(64px,6.6vw,100px)]">
            <span className="entra-titulo" style={{ ['--d' as string]: '0.04s' }}>
              A cidade inteira,
            </span>
            <span className="entra-titulo pb-[0.06em] italic text-accent" style={{ ['--d' as string]: '0.16s' }}>
              na sua mão.
            </span>
          </h1>

          <p
            className="entra-bloco mt-7 max-w-[540px] text-[clamp(17px,1.3vw,19px)] leading-[1.6] text-white/66"
            style={{ ['--d' as string]: '0.34s' }}
          >
            O Mallevo é o shopping digital de Divinópolis: restaurantes, moda, farmácias, pet, mercado e
            serviços da cidade num app só — com o pedido acompanhado ao vivo, do balcão até a sua porta.
          </p>

          <div className="entra-bloco mt-10 flex flex-wrap gap-3" style={{ ['--d' as string]: '0.44s' }}>
            <Botao href="#baixar" icone="chevron-down">
              Baixar o app
            </Botao>
            <Botao href="#pisos" variante="vidro">
              Passear pelo shopping
            </Botao>
          </div>

          <ul
            className="entra-bloco mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[13.5px] font-semibold text-white/55"
            style={{ ['--d' as string]: '0.54s' }}
          >
            <li className="flex items-center gap-2">
              <ConsumerIcon name="store" size={17} className="text-accent" />9 pisos de lojas da cidade
            </li>
            <li className="flex items-center gap-2">
              <ConsumerIcon name="wallet" size={17} className="text-accent" />
              Pix ou cartão no app
            </li>
            <li className="flex items-center gap-2">
              <ConsumerIcon name="route" size={17} className="text-accent" />
              Entrega acompanhada ao vivo
            </li>
          </ul>
        </motion.div>

        <div className="relative col-span-12 mt-24 flex justify-center lg:col-span-5 lg:mt-0">
          <motion.div
            className="relative [perspective:1800px]"
            style={reduce ? undefined : { y: celularY, scale: celularEscala }}
          >
            {/* Halo de neon sob o aparelho: a luz da marquise refletida no chão. */}
            <div
              aria-hidden
              className="entra-fade absolute -inset-x-[30%] bottom-[-14%] h-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(193_241_72/0.32),transparent)] blur-2xl"
              style={{ ['--d' as string]: '0.5s' }}
            />

            {/* Vitrine ao fundo (atrás do celular) */}
            <motion.div
              aria-hidden
              className="absolute -right-[22%] top-[6%] hidden w-[138px] rotate-[7deg] sm:block xl:w-[150px]"
              style={reduce ? undefined : { x: fundoX, y: fundoYTotal }}
            >
              <div className="entra-bloco brightness-75" style={{ ['--d' as string]: '0.62s' }}>
                <VitrineCard post={POSTS[4]} className="w-full shadow-[0_40px_70px_-30px_rgb(0_0_0/0.8)]" sizes="150px" />
              </div>
            </motion.div>

            <motion.div
              className="relative [transform-style:preserve-3d]"
              style={reduce ? { rotateY: -10, rotateX: 4 } : { rotateY: giroY, rotateX: giroX }}
            >
              <div className="entra-bloco" style={{ ['--d' as string]: '0.22s' }}>
                <Celular
                  rotulo="Tela inicial do app Mallevo: a marquise com a busca e as novidades das lojas, e o corredor da Praça de Alimentação."
                  className="[--k:0.7] sm:[--k:0.78] lg:[--k:0.7] xl:[--k:0.74] [@media(min-width:1280px)_and_(min-height:900px)]:[--k:0.8] [@media(min-width:1280px)_and_(min-height:1000px)]:[--k:0.86]"
                >
                  <TelaInicio saudacao={`${saudar}, Ana`} />
                </Celular>
              </div>
            </motion.div>

            {/* Vitrine à frente (esquerda) */}
            <motion.div
              aria-hidden
              className="absolute -left-[30%] top-[30%] hidden w-[150px] -rotate-[6deg] sm:block lg:hidden xl:block xl:-left-[34%] xl:w-[160px] 2xl:-left-[36%] 2xl:w-[176px]"
              style={reduce ? undefined : { x: frenteX, y: frenteYTotal }}
            >
              <div className="entra-bloco" style={{ ['--d' as string]: '0.5s' }}>
                <VitrineCard post={POSTS[1]} className="w-full shadow-[0_50px_80px_-30px_rgb(0_0_0/0.85)]" sizes="176px" prioridade />
              </div>
            </motion.div>

            {/* Pedido ao vivo (frente, pé do aparelho) */}
            <motion.div
              aria-hidden
              className="absolute -left-[6%] -bottom-[4%] w-[min(300px,82vw)] sm:-left-[40%] xl:-left-[50%]"
              style={reduce ? undefined : { y: cartaC, x: frenteX }}
            >
              <div className="entra-bloco" style={{ ['--d' as string]: '0.72s' }}>
                <CartaoPedidoVivo />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Convite para rolar, alinhado ao texto (no centro ele brigava com o cartão do pedido). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 hidden lg:block">
        <div className="mx-auto max-w-[1440px] px-8">
          <a
            href="#passarela"
            className="entra-fade pointer-events-auto inline-flex items-center gap-3 text-white/55 transition-colors hover:text-white"
            style={{ ['--d' as string]: '0.9s' }}
          >
            <span className="relative h-8 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[desce_1.8s_var(--ease-suave)_infinite] bg-accent" />
            </span>
            <span className="micro">Role para entrar</span>
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
