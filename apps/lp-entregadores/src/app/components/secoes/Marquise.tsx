'use client'

import Image from 'next/image'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn, useSafeReducedMotion } from '@mallevo/ui'
import { OFERTAS_DEMO } from '../../dados/rua'
import { Celular } from '../app/Celular'
import { TelaInicioEntregador } from '../app/TelaInicioEntregador'
import { CourierIcon } from '../marca/CourierIcon'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'

type Fase = 'offline' | 'buscando' | 'oferta' | 'tocando'

/** Quanto cada momento dura (ms). */
const DURACAO: Record<Exclude<Fase, 'offline'>, number> = { buscando: 2600, oferta: 4200, tocando: 700 }
/** Sem toque do visitante, o modo online liga sozinho depois da entrada. */
const LIGA_SOZINHO = 3600

/**
 * Hero — a marquise da rua. O statement é o convite ("A cidade em rota, no
 * seu horário.") e o celular mostra o Início do app do entregador: o
 * interruptor do modo online liga (pelo visitante ou sozinho), o radar
 * busca, a oferta chega com o valor antes de tudo e é aceita; vem a
 * próxima. A foto é a da tela de entrada do app.
 */
export function Marquise() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const emVista = useInView(ref, { amount: 0.35 })
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textoOpacidade = useTransform(p, [0, 0.55], [1, 0])
  const textoDesfoque = useTransform(p, [0, 0.55], ['blur(0px)', 'blur(10px)'])
  const textoY = useTransform(p, [0, 1], [0, -90])
  const celularY = useTransform(p, [0, 1], [0, 140])
  const celularEscala = useTransform(p, [0, 1], [1, 0.92])
  const fotoY = useTransform(p, [0, 1], [0, -120])

  const mola = { stiffness: 90, damping: 20, mass: 0.6 }
  const mx = useSpring(useMotionValue(0), mola)
  const my = useSpring(useMotionValue(0), mola)
  const giroY = useTransform(mx, [-1, 1], [-16, -4])
  const giroX = useTransform(my, [-1, 1], [9, 1])
  const fundoX = useTransform(mx, [-1, 1], [14, -14])
  const fundoY = useTransform(my, [-1, 1], [10, -10])
  const fotoYTotal = useTransform([fotoY, fundoY], ([a, b]: number[]) => a + b)

  const aoMover = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  // ─── O turno andando sozinho ──────────────────────────────────────────
  const [fase, setFase] = useState<Fase>('offline')
  const [indice, setIndice] = useState(0)
  const mexeu = useRef(false)
  const online = fase !== 'offline'
  const oferta = fase === 'oferta' || fase === 'tocando' ? OFERTAS_DEMO[indice] : null

  // Movimento reduzido: o celular já mostra uma oferta, parado.
  useEffect(() => {
    if (reduce) setFase('oferta')
  }, [reduce])

  useEffect(() => {
    if (reduce || !emVista) return
    if (fase === 'offline') {
      if (mexeu.current) return
      const relogio = window.setTimeout(() => setFase('buscando'), LIGA_SOZINHO)
      return () => window.clearTimeout(relogio)
    }
    const relogio = window.setTimeout(() => {
      if (fase === 'buscando') setFase('oferta')
      else if (fase === 'oferta') setFase('tocando')
      else {
        setIndice((i) => (i + 1) % OFERTAS_DEMO.length)
        setFase('buscando')
      }
    }, DURACAO[fase])
    return () => window.clearTimeout(relogio)
  }, [fase, emVista, reduce])

  // Ao ficar online, o interruptor acende no topo e, um instante depois, a
  // tela desce até a lista — o radar e as ofertas moram lá embaixo.
  const [rolar, setRolar] = useState(false)
  useEffect(() => {
    if (!online) {
      setRolar(false)
      return
    }
    const relogio = window.setTimeout(() => setRolar(true), reduce ? 0 : 1100)
    return () => window.clearTimeout(relogio)
  }, [online, reduce])

  const alternar = () => {
    mexeu.current = true
    setFase((f) => (f === 'offline' ? 'buscando' : 'offline'))
  }

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

      <div className="relative mx-auto grid min-h-svh max-w-[1440px] grid-cols-12 items-center gap-x-6 px-5 pb-20 pt-28 md:px-8 lg:pb-12 lg:pt-24">
        <motion.div
          className="col-span-12 lg:col-span-7"
          style={reduce ? undefined : { opacity: textoOpacidade, filter: textoDesfoque, y: textoY }}
        >
          <div className="entra-bloco" style={{ ['--d' as string]: '0s' }}>
            <Sobrelinha aoVivo>Mallevo para entregadores · Divinópolis</Sobrelinha>
          </div>

          <h1 className="mt-7 text-[clamp(46px,12.5vw,72px)] font-semibold leading-[0.92] tracking-[-0.045em] text-white [word-spacing:0.06em] md:text-[80px] lg:text-[clamp(64px,6.6vw,100px)]">
            {/* Equilibrada: no celular quebra em "A cidade / em rota,", sem "rota," sozinho. */}
            <span className="entra-titulo text-balance" style={{ ['--d' as string]: '0.04s' }}>
              A cidade em rota,
            </span>
            {/* "seu horário." não se separa. */}
            <span className="entra-titulo pb-[0.06em] italic text-accent" style={{ ['--d' as string]: '0.16s' }}>
              no seu{' '}horário.
            </span>
          </h1>

          <p
            className="entra-bloco mt-7 max-w-[560px] text-[clamp(17px,1.3vw,19px)] leading-[1.6] text-white/66"
            style={{ ['--d' as string]: '0.34s' }}
          >
            Entregue para as lojas do shopping digital de Divinópolis: fique online quando quiser, veja quanto a entrega
            paga antes de aceitar e siga a rota até a porta do cliente.
          </p>

          <div className="entra-bloco mt-10 flex flex-wrap items-center gap-3" style={{ ['--d' as string]: '0.44s' }}>
            <Botao href="#cadastro" icone="chevron-down">
              Quero entregar
            </Botao>
            <Botao href="#entrega" variante="vidro" icone="chevron-down">
              Ver uma entrega por dentro
            </Botao>
          </div>

          {/* O interruptor do app, aqui fora: o visitante liga o modo online. */}
          <div className="entra-bloco mt-7" style={{ ['--d' as string]: '0.5s' }}>
            <button
              type="button"
              role="switch"
              aria-checked={online}
              onClick={alternar}
              className="group inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-[14px] font-semibold text-white/66 transition-colors hover:text-white"
            >
              <span
                className={cn(
                  'relative flex h-[30px] w-[50px] items-center rounded-full p-[2px] transition-colors duration-300',
                  online ? 'bg-accent-strong' : 'bg-white/15',
                )}
              >
                <span
                  className={cn(
                    'size-[26px] rounded-full bg-white shadow-[0_3px_8px_rgb(0_0_0/0.25)] transition-transform duration-300 ease-[var(--ease-entrada)]',
                    online && 'translate-x-[20px]',
                  )}
                />
              </span>
              {online ? 'Online: as ofertas chegam no app' : 'Ligue o modo online'}
            </button>
          </div>

          <ul
            className="entra-bloco mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[13.5px] font-semibold text-white/55"
            style={{ ['--d' as string]: '0.58s' }}
          >
            <li className="flex items-center gap-2">
              <CourierIcon name="clock" size={17} className="text-accent" />
              Sem escala nem horário mínimo
            </li>
            <li className="flex items-center gap-2">
              <CourierIcon name="eye" size={17} className="text-accent" />
              O valor antes de aceitar
            </li>
            <li className="flex items-center gap-2">
              <CourierIcon name="route" size={17} className="text-accent" />
              Moto, bicicleta ou carro
            </li>
          </ul>
        </motion.div>

        <div className="relative col-span-12 mt-24 flex justify-center lg:col-span-5 lg:mt-0">
          <motion.div className="relative [perspective:1800px]" style={reduce ? undefined : { y: celularY, scale: celularEscala }}>
            <div
              aria-hidden
              className="entra-fade absolute -inset-x-[30%] bottom-[-14%] h-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(193_241_72/0.32),transparent)] blur-2xl"
              style={{ ['--d' as string]: '0.5s' }}
            />

            {/* A foto da tela de entrada do app: a entrega na mão, numa rua da cidade. */}
            <motion.div
              aria-hidden
              className="absolute -left-[52%] top-[46%] hidden w-[190px] -rotate-[6deg] xl:block 2xl:-left-[60%] 2xl:w-[220px]"
              style={reduce ? undefined : { x: fundoX, y: fotoYTotal }}
            >
              <div className="entra-bloco" style={{ ['--d' as string]: '0.6s' }}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/10 shadow-[0_40px_70px_-30px_rgb(0_0_0/0.85)]">
                  <Image
                    src="/images/app/login-entregador.png"
                    alt=""
                    fill
                    sizes="220px"
                    className="object-cover object-[50%_8%] scale-[1.35] origin-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative [transform-style:preserve-3d]"
              style={reduce ? { rotateY: -10, rotateX: 4 } : { rotateY: giroY, rotateX: giroX }}
            >
              <div className="entra-bloco" style={{ ['--d' as string]: '0.22s' }}>
                <Celular
                  rotulo={`Tela inicial do app do entregador: ${
                    online ? (oferta ? `uma oferta de entrega de ${oferta.valor} da loja ${oferta.loja}` : 'online, buscando entregas') : 'modo offline'
                  }.`}
                  className="[--k:0.7] sm:[--k:0.78] lg:[--k:0.7] xl:[--k:0.74] [@media(min-width:1280px)_and_(min-height:900px)]:[--k:0.8] [@media(min-width:1280px)_and_(min-height:1000px)]:[--k:0.86]"
                >
                  <TelaInicioEntregador online={online} oferta={oferta} tocando={fase === 'tocando'} rolado={rolar} />
                </Celular>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

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
            <span className="micro">Role para sair na rua</span>
          </a>
        </div>
      </div>
    </section>
  )
}
