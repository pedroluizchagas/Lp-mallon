'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { BlurIn, EASE, RevealLines, cn } from '@mallevo/ui'
import { DO_PAINEL, MODELOS } from '../../dados/painel'
import { Navegador } from '../painel/Navegador'
import { TelaPainel } from '../painel/TelaPainel'
import { PartnerIcon, type PartnerIconName } from '../marca/PartnerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * Painel — o balcão no computador. A home do painel web do lojista, com a
 * sidebar montada pelo tipo de loja: troque o tipo e veja os módulos
 * mudarem (cardápio ou catálogo, estoque, agenda, entregadores), como no
 * cadastro de verdade.
 */
export function Painel() {
  const [ativo, setAtivo] = useState(0)
  const grupo = useId()
  const modelo = MODELOS[ativo]

  return (
    <section id="painel" className="relative px-5 py-28 md:px-8 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Painel</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'O balcão inteiro,',
                <span key="acesa" className="italic">
                  <span className="marca-texto">na tela grande.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <BlurIn delay={0.1}>
              <p className="text-[17px] leading-[1.65] text-ink-muted">
                Pedidos, catálogo, vitrine, conteúdo, financeiro e relatórios num painel só — o mesmo balcão do app,
                no computador. E ele se monta pelo tipo da sua loja: quem vende comida tem cardápio e adicionais; quem
                atende com hora marcada tem agenda.
              </p>
            </BlurIn>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="micro text-ink-muted" id={grupo}>
              Tipo de loja
            </p>
            <div role="radiogroup" aria-labelledby={grupo} className="mt-3 flex flex-wrap gap-2">
              {MODELOS.map((m, i) => (
                <button
                  key={m.codigo}
                  type="button"
                  role="radio"
                  aria-checked={i === ativo}
                  onClick={() => setAtivo(i)}
                  className={cn(
                    'rounded-full px-4 py-2 text-[14px] font-bold transition-[background-color,color] duration-300',
                    i === ativo ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-inset ring-ink/[0.08] hover:bg-canvas-alt',
                  )}
                >
                  {m.chip}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-30px_rgb(17_18_22/0.35)] ring-1 ring-ink/[0.05]">
              <p className="micro text-ink-muted">Seu painel já vem otimizado com</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={modelo.codigo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE.entrada }}
                >
                  <p className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-ink">{modelo.nome}</p>
                  <ul className="mt-4 space-y-2.5">
                    {modelo.recursos.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-[15px] text-ink">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink">
                          <PartnerIcon name="check" size={11} color="#D8FF3E" strokeWidth={3} />
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <p className="micro mt-6 text-ink-muted">O produto ganha os campos do ramo</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {modelo.campos.map((c) => (
                      <li key={c} className="rounded-full bg-canvas px-3 py-1.5 text-[12.5px] font-semibold text-ink-muted">
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-8 lg:justify-end">
            <BlurIn y={40}>
              <Navegador
                rotulo={`A tela inicial do painel do lojista para ${modelo.nome}: indicadores do dia, fila de pedidos em tempo real, movimento por hora e a saúde da loja.`}
                className="[--k:0.28] min-[420px]:[--k:0.31] sm:[--k:0.5] md:[--k:0.58] lg:[--k:0.6] xl:[--k:0.7] 2xl:[--k:0.74]"
              >
                <TelaPainel modelo={modelo} />
              </Navegador>
            </BlurIn>
          </div>
        </div>

        <ul className="mt-20 grid gap-x-8 gap-y-10 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {DO_PAINEL.map((item, i) => (
            <li key={item.titulo}>
              <BlurIn delay={0.06 * i}>
                <span className="flex size-11 items-center justify-center rounded-full bg-ink/[0.06] text-ink">
                  <PartnerIcon name={item.icone as PartnerIconName} size={20} strokeWidth={1.8} />
                </span>
                <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink">{item.titulo}</p>
                <p className="mt-1.5 text-[14.5px] leading-[1.6] text-ink-muted">{item.texto}</p>
              </BlurIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
