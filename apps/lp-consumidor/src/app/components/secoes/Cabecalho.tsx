'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EASE, cn, useLenis } from '@mallevo/ui'
import { dois, luzNoMinuto, eventosSolares, NOME_DA_FASE } from '../../lib/divinopolis'
import { useAgora } from '../../lib/useAgora'
import { LINKS, SECOES } from '../../lib/links'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { Logo } from '../marca/Logo'

type Tema = 'escuro' | 'claro'

/**
 * Cabeçalho fixo. Lê o tema da seção que passa por baixo dele
 * (`data-tema`) e troca de pele sozinho — fachada escura, folha clara.
 * À esquerda, a portaria: a cidade e a hora dela.
 */
export function Cabecalho() {
  const [tema, setTema] = useState<Tema>('escuro')
  const [rolou, setRolou] = useState(false)
  const [aberto, setAberto] = useState(false)
  const lenis = useLenis()
  const agora = useAgora(1000)
  const botaoMenu = useRef<HTMLButtonElement>(null)
  // Fora da home (termos, privacidade) as âncoras apontam para a home.
  const naHome = usePathname() === '/'
  const base = naHome ? '' : '/'

  useEffect(() => {
    let quadro = 0
    const medir = () => {
      quadro = 0
      setRolou(window.scrollY > 24)
      const sob = document
        .elementsFromPoint(window.innerWidth / 2, 36)
        .find((el) => !el.closest('[data-cabecalho]'))
      const secao = sob?.closest<HTMLElement>('[data-tema]')
      if (secao) setTema(secao.dataset.tema === 'claro' ? 'claro' : 'escuro')
    }
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
    }
  }, [])

  const fechar = useCallback(() => setAberto(false), [])

  useEffect(() => {
    if (!aberto) return
    const botao = botaoMenu.current
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && fechar()
    window.addEventListener('keydown', aoTeclar)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', aoTeclar)
      botao?.focus()
    }
  }, [aberto, lenis, fechar])

  const irPara = (id: string) => {
    fechar()
    // Espera a cortina do menu recolher antes de rolar.
    window.setTimeout(() => {
      const alvo = document.getElementById(id)
      if (!alvo) {
        window.location.assign(`/#${id}`)
        return
      }
      if (lenis) lenis.scrollTo(alvo, { offset: -72, duration: 1.6 })
      else alvo.scrollIntoView({ behavior: 'smooth' })
    }, 380)
  }

  const claro = tema === 'claro' && !aberto

  return (
    <>
      <header data-cabecalho className="fixed inset-x-0 top-0 z-50">
        {/* Desfoque progressivo: o conteúdo some sob o cabeçalho sem linha dura. */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[112px] transition-opacity duration-500',
            rolou ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            maskImage: 'linear-gradient(to bottom, black 45%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent)',
            background: claro
              ? 'linear-gradient(to bottom, rgb(241 241 243 / 0.78), rgb(241 241 243 / 0))'
              : 'linear-gradient(to bottom, rgb(24 24 27 / 0.7), rgb(24 24 27 / 0))',
          }}
        />

        <div className="relative mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-[72px] md:px-8">
          {/* Portaria */}
          <div
            className={cn(
              'hidden items-center gap-3 text-[12px] font-semibold transition-colors duration-500 md:flex',
              claro ? 'text-ink-muted' : 'text-white/60',
            )}
          >
            <ConsumerIcon name="pin" size={15} strokeWidth={2.2} className={claro ? 'text-ink' : 'text-accent'} />
            <span>Divinópolis, MG</span>
            <span className={cn('font-mono tabular-nums', claro ? 'text-ink' : 'text-white')}>
              {agora ? `${dois(agora.hora)}:${dois(agora.minuto)}` : '--:--'}
            </span>
          </div>

          <a
            href={naHome ? '#topo' : '/'}
            aria-label={naHome ? 'Mallevo — voltar ao topo' : 'Mallevo — página inicial'}
            className="relative col-start-1 h-6 w-[152px] justify-self-start md:col-start-2 md:h-7 md:w-[177px] md:justify-self-center"
          >
            <Logo tom="branco" prioridade className={cn('absolute inset-0 h-full w-auto transition-opacity duration-500', claro ? 'opacity-0' : 'opacity-100')} />
            <Logo tom="preto" className={cn('absolute inset-0 h-full w-auto transition-opacity duration-500', claro ? 'opacity-100' : 'opacity-0')} />
          </a>

          <div className="col-start-3 flex items-center justify-end gap-2.5">
            <a
              href={`${base}#baixar`}
              className={cn(
                'hidden h-10 items-center gap-2 rounded-full px-5 text-[13.5px] font-bold transition-colors duration-500 sm:inline-flex',
                claro ? 'bg-ink text-white hover:bg-surface-dark' : 'bg-accent text-ink hover:bg-accent-strong',
              )}
            >
              Baixar o app
            </a>
            <button
              ref={botaoMenu}
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-principal"
              aria-label="Abrir menu"
              className={cn(
                'group flex size-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-500',
                claro ? 'bg-ink/[0.06] hover:bg-ink/10' : 'bg-white/[0.08] hover:bg-white/[0.14]',
              )}
            >
              <span className={cn('h-[1.5px] w-4 rounded-full transition-[width] duration-300 group-hover:w-[18px]', claro ? 'bg-ink' : 'bg-white')} />
              <span className={cn('h-[1.5px] w-[11px] rounded-full transition-[width] duration-300 group-hover:w-[18px]', claro ? 'bg-ink' : 'bg-white')} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{aberto && <Menu aoFechar={fechar} aoIr={irPara} />}</AnimatePresence>
    </>
  )
}

function Menu({ aoFechar, aoIr }: { aoFechar: () => void; aoIr: (id: string) => void }) {
  const agora = useAgora(1000)
  const fecharRef = useRef<HTMLButtonElement>(null)
  const luz = agora ? luzNoMinuto(agora.minutoDoDia, eventosSolares(agora)) : null

  useEffect(() => {
    fecharRef.current?.focus()
  }, [])

  return (
    <motion.div
      id="menu-principal"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      className="fixed inset-0 z-[70] overflow-y-auto bg-marquee text-white"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.85, ease: EASE.cortina } }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease: EASE.cortina, delay: 0.08 } }}
    >
      <div aria-hidden className="glow-marquise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex min-h-full max-w-[1440px] flex-col px-5 pb-10 md:px-8">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[72px]">
          <span className="micro hidden text-white/55 md:block">Menu</span>
          <Logo tom="branco" className="col-start-1 h-6 w-auto md:col-start-2 md:h-7 md:justify-self-center" />
          <button
            ref={fecharRef}
            type="button"
            onClick={aoFechar}
            aria-label="Fechar menu"
            className="col-start-3 flex size-10 items-center justify-center justify-self-end rounded-full bg-white/[0.08] transition-colors hover:bg-white/[0.14]"
          >
            <ConsumerIcon name="close" size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="grid flex-1 gap-14 pt-10 md:pt-16 lg:grid-cols-12">
          <nav aria-label="Seções" className="lg:col-span-7">
            <ol>
              {SECOES.map((secao, i) => (
                <li key={secao.id} className="overflow-hidden border-b border-white/10">
                  <motion.button
                    type="button"
                    onClick={() => aoIr(secao.id)}
                    className="group flex w-full items-baseline gap-5 py-4 text-left md:py-5"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%', transition: { duration: 0.9, ease: EASE.entrada, delay: 0.3 + i * 0.05 } }}
                    exit={{ y: '-110%', transition: { duration: 0.35, ease: EASE.saida } }}
                  >
                    <span className="w-8 font-mono text-[12px] text-white/55">{dois(i + 1)}</span>
                    <span className="text-[clamp(34px,5.4vw,76px)] font-semibold leading-none tracking-[-0.04em] transition-[color,transform] duration-500 ease-[var(--ease-entrada)] group-hover:translate-x-2 group-hover:italic group-hover:text-accent">
                      {secao.rotulo}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ol>
          </nav>

          <motion.aside
            className="flex flex-col justify-between gap-12 lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.entrada, delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <div className="space-y-8">
              <div>
                <p className="micro text-white/55">Para negócios</p>
                <ul className="mt-4 space-y-3 text-[18px] font-semibold">
                  <li>
                    <a href={LINKS.parceiros} target="_blank" rel="noopener noreferrer" className="sublinha inline-flex items-center gap-2">
                      Sou lojista
                      <ConsumerIcon name="chevron-right" size={16} strokeWidth={2.2} />
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.entregadores} target="_blank" rel="noopener noreferrer" className="sublinha inline-flex items-center gap-2">
                      Quero entregar
                      <ConsumerIcon name="chevron-right" size={16} strokeWidth={2.2} />
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="micro text-white/55">Fale com a gente</p>
                <a href={`mailto:${LINKS.email}`} className="sublinha mt-4 inline-block text-[18px] font-semibold">
                  {LINKS.email}
                </a>
              </div>
            </div>

            <div>
              <p className="micro text-white/55">Agora em Divinópolis</p>
              <p className="mt-3 font-mono text-[44px] font-medium tabular-nums tracking-[-0.04em]">
                {agora ? `${dois(agora.hora)}:${dois(agora.minuto)}:${dois(agora.segundo)}` : '--:--:--'}
              </p>
              <p className="mt-1 flex items-center gap-2 text-[14px] text-white/55">
                <span className="size-2 rounded-full" style={{ backgroundColor: luz?.cor ?? '#5B6B9E' }} />
                {luz ? NOME_DA_FASE[luz.fase] : '—'} · GMT-3
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.div>
  )
}
