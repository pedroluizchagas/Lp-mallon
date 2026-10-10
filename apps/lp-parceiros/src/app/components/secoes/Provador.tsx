'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { BlurIn, Counter, EASE, RevealLines, cn } from '@mallevo/ui'
import { VITRINES } from '../../dados/vitrines'
import { VitrineLoja } from '../app/VitrineLoja'
import { PartnerIcon } from '../marca/PartnerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

/** Os arquétipos de pele do store-theme (@mallevo/lib · presets.ts). */
const TOTAL_ESTILOS = 21

/**
 * O endereço da loja na web, com a mesma regra do cadastro
 * (supabase/functions/onboard-tenant): minúsculas, sem acento, hífen no
 * lugar do resto.
 */
function slugDaLoja(nome: string) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Provador de vitrines — o visitante escreve o nome da loja dele e veste a
 * loja com as peles de verdade: cores, fontes e o jeito de expor de cada
 * arquétipo. O nome não sai do navegador.
 */
export function Provador() {
  const [nome, setNome] = useState('')
  const [ativa, setAtiva] = useState(0)
  const campo = useId()
  const loja = VITRINES[ativa]
  const nomeNaVitrine = nome.trim() || loja.nome
  const slug = slugDaLoja(nome) || loja.slug

  return (
    <section id="vitrine" className="relative px-5 pb-28 pt-[calc(30vh+7rem)] md:px-8 lg:pb-40 lg:pt-[calc(30vh+9rem)]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Provador de vitrines</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Vista sua loja',
                <span key="acesa" className="italic">
                  <span className="marca-texto">do jeito dela.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex items-end gap-4">
              <Counter
                value={TOTAL_ESTILOS}
                className="text-[clamp(72px,7.6vw,128px)] font-semibold leading-none tracking-[-0.06em] text-ink"
              />
              <p className="mb-2 text-[15px] font-semibold leading-snug text-ink-muted">
                estilos de
                <br />
                loja
              </p>
            </div>
            <BlurIn delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-muted">
                Você escolhe o estilo no cadastro e ajusta quando quiser no painel: paleta, cor de destaque,
                tipografia, banner. Em várias categorias, o estilo vem com uma vitrine desenhada sob medida.
              </p>
            </BlurIn>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Controles */}
          <div className="lg:col-span-4">
            <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-40px_rgb(17_18_22/0.35)] ring-1 ring-ink/[0.06] md:p-7 lg:sticky lg:top-28">
              <label htmlFor={campo} className="micro text-ink-muted">
                Nome da sua loja
              </label>
              <input
                id={campo}
                type="text"
                value={nome}
                maxLength={28}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Padaria Pão de Minas"
                autoComplete="organization"
                className="mt-3 h-14 w-full rounded-[16px] bg-canvas px-4 text-[17px] font-semibold text-ink outline-none ring-1 ring-inset ring-ink/10 transition-shadow placeholder:font-medium placeholder:text-ink-soft focus:ring-2 focus:ring-ink"
              />
              <p className="mt-2 text-[12.5px] text-ink-muted">Fica só no seu navegador — nada é enviado.</p>

              <p className="micro mt-7 text-ink-muted" id={`${campo}-estilos`}>
                Vitrine
              </p>
              <div role="radiogroup" aria-labelledby={`${campo}-estilos`} className="mt-3 flex flex-wrap gap-2">
                {VITRINES.map((v, i) => {
                  const escolhida = i === ativa
                  return (
                    <button
                      key={v.slug}
                      type="button"
                      role="radio"
                      aria-checked={escolhida}
                      onClick={() => setAtiva(i)}
                      className={cn(
                        'flex items-center gap-2 rounded-full py-2 pl-2 pr-3.5 text-[13.5px] font-bold transition-[background-color,color,box-shadow] duration-300',
                        escolhida ? 'bg-ink text-white' : 'bg-canvas text-ink ring-1 ring-inset ring-ink/[0.08] hover:bg-canvas-alt',
                      )}
                    >
                      <span
                        aria-hidden
                        className="size-5 rounded-full ring-1 ring-inset ring-black/10"
                        style={{ background: `linear-gradient(135deg, ${v.pele.bg} 50%, ${v.pele.accent} 50%)` }}
                      />
                      {v.vitrine.nome}
                      <span className={cn('text-[12px] font-semibold', escolhida ? 'text-white/60' : 'text-ink-muted')}>
                        {v.categoria}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-7 border-t border-ink/10 pt-6">
                <p className="micro text-ink-muted">Seu endereço na web</p>
                <p className="mt-3 flex items-center gap-2 overflow-hidden rounded-[14px] bg-canvas px-3.5 py-3 font-mono text-[13.5px] text-ink">
                  <PartnerIcon name="shield" size={15} className="shrink-0 text-success" strokeWidth={2.1} />
                  <span className="truncate">
                    <span className="font-semibold">{slug}</span>
                    <span className="text-ink-muted">.mallevo.com.br</span>
                  </span>
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
                  O cadastro cria o endereço a partir do nome da loja — a mesma vitrine abre no app e no navegador.
                </p>
              </div>
            </div>
          </div>

          {/* A vitrine vestida */}
          <div className="relative lg:col-span-8">
            <div className="relative h-[min(82svh,720px)] min-h-[560px]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={loja.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
                  exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.3, ease: EASE.saida } }}
                  transition={{ duration: 0.7, ease: EASE.entrada }}
                >
                  <VitrineLoja loja={loja} nome={nomeNaVitrine} className="h-full shadow-[0_50px_100px_-50px_rgb(17_18_22/0.55)]" />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-[13px] text-ink-muted">
              Fotos e produtos de lojas de demonstração do app. Na sua vitrine, entram os seus.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
