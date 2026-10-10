'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useSafeReducedMotion } from '@mallevo/ui'
import { LINKS } from '../../lib/links'
import { BotoesLojas } from '../marca/BotoesLojas'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * A saída: a mesma porta de enrolar da abertura, agora sobre a fachada
 * acesa — ela sobe conforme a rolagem e o convite aparece por baixo. O
 * rodapé continua a mesma fachada.
 */
export function Chamada() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useSafeReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] })
  const porta = useTransform(scrollYProgress, [0.2, 1], ['0%', '-101%'])
  const publicado = Boolean(LINKS.appStore || LINKS.playStore)

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

      <div className="relative mx-auto max-w-[1440px] px-5 pb-28 pt-32 text-center md:px-8 md:pt-44">
        <Sobrelinha aoVivo className="justify-center">
          Cadastro aberto
        </Sobrelinha>
        <h2 className="mx-auto mt-8 text-[clamp(52px,10vw,180px)] font-semibold leading-[0.9] tracking-[-0.055em] [word-spacing:0.08em]">
          Abra as portas
          <br />
          <span className="italic text-accent">da sua loja.</span>
        </h2>
        <p className="mx-auto mt-10 max-w-[520px] text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-white/66">
          Doze perguntas, nenhum cartão e 15 dias de teste. O balcão abre no painel e no app — e a sua vitrine acende no
          shopping de Divinópolis.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Botao href={LINKS.cadastro} externo>
            Cadastrar minha loja
          </Botao>
          <Botao href={LINKS.entrar} externo variante="vidro">
            Já tenho loja · Entrar
          </Botao>
        </div>

        <div className="mx-auto mt-16 max-w-[520px] border-t border-white/10 pt-10">
          <p className="micro text-white/55">App do lojista · Mallevo Parceiro</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">
            {publicado
              ? 'Pedidos, catálogo e o Publicar no seu celular — com o mesmo login do painel.'
              : 'Chegando à App Store e ao Google Play — com o mesmo login do painel.'}
          </p>
          <BotoesLojas className="mt-6 justify-center" />
        </div>
      </div>

      {/* A porta de enrolar subindo por cima de tudo. */}
      {!reduce && (
        <motion.div aria-hidden className="chapa pointer-events-none absolute inset-0 z-10" style={{ y: porta }}>
          <div className="porta__puxador" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent shadow-[0_0_18px_2px_rgb(193_241_72/0.6),0_36px_90px_18px_rgb(193_241_72/0.16)]" />
        </motion.div>
      )}
    </section>
  )
}
