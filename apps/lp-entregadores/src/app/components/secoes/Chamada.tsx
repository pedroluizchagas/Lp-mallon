'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from '@mallevo/ui'
import { APP_PUBLICADO, LINKS } from '../../lib/links'
import { BotoesLojas } from '../marca/BotoesLojas'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'
import { ROTA } from './Abertura'

/**
 * A saída: a mesma rota da abertura, agora desenhada pela rolagem — da loja
 * até a casa, que acende na chegada — sobre o convite. O rodapé continua a
 * mesma fachada.
 */
export function Chamada() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })
  const traco = useTransform(scrollYProgress, [0.3, 1], [0, 1])
  const chegada = useTransform(scrollYProgress, [0.92, 1], [0, 1])

  return (
    <section
      ref={ref}
      id="cadastro"
      data-tema="escuro"
      className="grao relative z-20 -mt-14 overflow-hidden rounded-t-[36px] bg-marquee text-white md:-mt-20 md:rounded-t-[64px]"
    >
      {/* Só o neon de cima: o de baixo fica com o rodapé, sem emenda entre os dois. */}
      <div
        aria-hidden
        className="absolute inset-0 animate-respira bg-[radial-gradient(ellipse_72%_62%_at_88%_-8%,rgb(193_241_72/0.22),rgb(193_241_72/0.08)_45%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-28 pt-24 text-center md:px-8 md:pt-32">
        <svg viewBox="0 0 520 220" fill="none" aria-hidden className="mx-auto w-[min(420px,78vw)] overflow-visible">
          <path d={ROTA} stroke="rgb(255 255 255 / 0.12)" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
          <motion.path
            d={ROTA}
            stroke="#D8FF3E"
            strokeOpacity="0.14"
            strokeWidth="18"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : traco }}
          />
          <motion.path
            d={ROTA}
            stroke="#D8FF3E"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : traco }}
          />
          <circle cx="40" cy="190" r="13" fill="#18181B" stroke="#D8FF3E" strokeWidth="3" />
          <circle cx="40" cy="190" r="4.5" fill="#D8FF3E" />
          <circle cx="480" cy="30" r="14" fill="#FFFFFF" />
          <path d="M473.5 31 l6.5 -6 l6.5 6 v6.5 h-13 z" fill="#111216" />
          <motion.circle
            cx="480"
            cy="30"
            r="24"
            stroke="#D8FF3E"
            strokeWidth="3"
            style={{ opacity: reduce ? 1 : chegada }}
          />
        </svg>

        <Sobrelinha aoVivo className="mt-12 justify-center">
          {APP_PUBLICADO ? 'Cadastro aberto no app' : 'Chegando às lojas de apps'}
        </Sobrelinha>
        <h2 className="mx-auto mt-8 text-[clamp(52px,10vw,180px)] font-semibold leading-[0.9] tracking-[-0.055em] [word-spacing:0.08em]">
          A loja chama.
          <br />
          <span className="italic text-accent">Você decide.</span>
        </h2>
        <p className="mx-auto mt-10 max-w-[540px] text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-white/66">
          Fique online quando quiser, veja o valor antes de aceitar e leve o pedido até a porta. O cadastro é gratuito e
          fica dentro do app Entregadores Mallevo
          {APP_PUBLICADO ? '.' : ', que está chegando à App Store e ao Google Play.'}
        </p>

        {APP_PUBLICADO ? (
          <BotoesLojas className="mt-10 justify-center" />
        ) : (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Botao href={LINKS.avisar}>Quero ser entregador</Botao>
          </div>
        )}

        <div className="mx-auto mt-16 max-w-[520px] border-t border-white/10 pt-10">
          <p className="micro text-white/55">App do entregador · Entregadores Mallevo</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">
            {APP_PUBLICADO ? (
              <>
                Dúvidas antes de começar? Escreva para{' '}
                <a href={`mailto:${LINKS.email}`} className="sublinha text-white/80">
                  {LINKS.email}
                </a>
                .
              </>
            ) : (
              'O botão acima abre o seu e-mail com o assunto pronto.'
            )}
          </p>
          {!APP_PUBLICADO && <BotoesLojas className="mt-6 justify-center" />}
        </div>
      </div>
    </section>
  )
}
