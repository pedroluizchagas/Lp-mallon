'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── Arpeggio menu system ─────────────────────────────────────────────────────
//
// 1. OVERLAY  — clip-path circle expanding from hamburger corner position.
//              cubic-bezier(0.76, 0, 0.24, 1) — fast then smooth.
//              Open: 0% → 150%  |  Close: 150% → 0% (reverse, faster)
//
// 2. ITEMS    — each item lives inside overflow:hidden wrapper.
//              Text slides up from y:100% → y:0%, staggered 0.06s per item.
//              Left: two-digit index (01, 02…). Right: arrow → on hover.
//
// 3. HAMBURGER — two lines at rest (top 24px, bottom 18px).
//              Open: lines rotate ±45° into an X.
//              Middle line fades + scaleX 0.
//
// 4. LOGO     — position: fixed top-center, invisible até o hero sair (~150vh scroll)
//              fade-in suave entre 150vh e 190vh de scroll.
// ─────────────────────────────────────────────────────────────────────────────

const EASE_MENU   = [0.76, 0, 0.24, 1]   // Arpeggio overlay easing
const EASE_SPRING = [0.22, 1, 0.36, 1]   // items + logo

const menuItems = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Categorias',    href: '#categorias'    },
  { label: 'O app',         href: '#o-app'         },
  { label: 'Para lojistas', href: '/lojista'       },
  { label: 'Baixar app',    href: '#baixar-app'    },
]

// ─── Hamburger ────────────────────────────────────────────────────────────────

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col items-end justify-center gap-1.75 w-7 h-7">
      {/* Top line */}
      <motion.span
        className="block h-[1.5px] bg-[#EDF7F2] rounded-full origin-center"
        animate={open
          ? { rotate: 45, y: 8.5, width: 24 }
          : { rotate: 0,  y: 0,   width: 24 }
        }
        transition={{ duration: 0.38, ease: EASE_SPRING }}
        style={{ width: 24 }}
      />
      {/* Mid line */}
      <motion.span
        className="block h-[1.5px] bg-[#EDF7F2] rounded-full"
        animate={open
          ? { opacity: 0, scaleX: 0 }
          : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.22 }}
        style={{ width: 18 }}
      />
      {/* Bottom line */}
      <motion.span
        className="block h-[1.5px] bg-[#EDF7F2] rounded-full origin-center"
        animate={open
          ? { rotate: -45, y: -8.5, width: 24 }
          : { rotate: 0,   y: 0,    width: 24 }
        }
        transition={{ duration: 0.38, ease: EASE_SPRING }}
        style={{ width: 24 }}
      />
    </div>
  )
}

// ─── Menu Item ────────────────────────────────────────────────────────────────

function MenuItem({
  item,
  index,
  onNavigate,
}: {
  item: (typeof menuItems)[number]
  index: number
  onNavigate: (href: string) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="border-b border-white/[0.07] overflow-hidden">
      <motion.button
        onClick={() => onNavigate(item.href)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="w-full flex items-center justify-between py-5 sm:py-6 lg:py-7 text-left group cursor-pointer"
        // Mask reveal: slides up from clip overflow
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        exit={{ y: '60%', opacity: 0 }}
        transition={{
          delay: 0.05 + index * 0.06,
          duration: 0.6,
          ease: EASE_SPRING,
        }}
      >
        {/* Left: index + label */}
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="text-[#EDF7F2]/20 text-xs font-mono tabular-nums select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
          <motion.span
            className="font-sora font-bold text-[clamp(2rem,7vw,5rem)] leading-none tracking-tight"
            animate={{ color: hovered ? 'rgba(237,247,242,1)' : 'rgba(237,247,242,0.55)' }}
            transition={{ duration: 0.2 }}
          >
            {item.label}
          </motion.span>
        </div>

        {/* Right: arrow — slides in on hover */}
        <motion.span
          className="text-[#4CAF82] text-xl sm:text-2xl lg:text-3xl font-light select-none"
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : -10,
          }}
          transition={{ duration: 0.22, ease: EASE_SPRING }}
        >
          →
        </motion.span>
      </motion.button>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ConsumerStickyHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const logoRef = useRef<HTMLAnchorElement>(null)

  // ── Logo fade-in: aparece somente após o hero sticky sair (~100vh de scroll) ─
  // O hero ocupa height:200vh no DOM. O brand name enorme do hero encolhe e sobe
  // até ~0.85 do scrollYProgress. Após isso, o logo pequeno aqui toma seu lugar.
  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return

    const update = () => {
      // hero container = 200vh; fade começa em 150vh, completa em 190vh
      const start  = window.innerHeight * 1.5
      const end    = window.innerHeight * 1.9
      const raw    = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)))
      logo.style.opacity = String(raw)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // ── Lock body scroll when menu open ───────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navigate = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      if (href.startsWith('#')) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = href
      }
    }, 500) // wait for menu close animation to finish
  }

  return (
    <>
      {/* ── Logo — fixo no topo-centro, aparece após o hero sair ──────── */}
      {/* "fica no centro" — exatamente como o Arpeggio logo no header */}
      <Link
        ref={logoRef}
        href="/consumidor"
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
        style={{ opacity: 0 }}
      >
        <span className="font-sora font-bold text-xl text-[#EDF7F2] tracking-tight leading-none select-none">
          Mall<span className="text-[#4CAF82]">evo</span>
        </span>
      </Link>

      {/* ── Hamburger button — fixed top-right ─────────────────────────── */}
      <button
        className="fixed top-5 right-6 lg:right-8 z-60 w-11 h-11 flex items-center justify-center"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <Hamburger open={menuOpen} />
      </button>

      {/* ── Full-screen overlay — Arpeggio clip-path circle reveal ─────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-overlay"
            className="fixed inset-0 z-40 bg-[#080C09] flex flex-col overflow-hidden"
            // Hamburger center ≈ top: 44px, right: 44px
            // clip-path origin = top-right corner at the button position
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{    clipPath: 'circle(0%   at calc(100% - 44px) 44px)' }}
            transition={{
              duration: 0.72,
              ease: EASE_MENU,
            }}
          >
            {/* Grain texture */}
            <div className="absolute inset-0 noise-overlay opacity-[0.04] pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 bg-[#4CAF82]/6 rounded-full blur-[150px] pointer-events-none" />

            {/* Content — bottom-anchored (Arpeggio layout) */}
            <div className="relative flex-1 flex flex-col justify-end px-8 sm:px-12 lg:px-20 pb-12 lg:pb-20">

              {/* Nav items */}
              <nav className="mb-10 lg:mb-14">
                <AnimatePresence>
                  {menuOpen && menuItems.map((item, i) => (
                    <MenuItem
                      key={item.label}
                      item={item}
                      index={i}
                      onNavigate={navigate}
                    />
                  ))}
                </AnimatePresence>
              </nav>

              {/* Footer row */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.44, duration: 0.45, ease: EASE_SPRING }}
              >
                {/* Social links */}
                <div className="flex items-center gap-6">
                  {[
                    { label: 'Instagram', href: '#' },
                    { label: 'WhatsApp',  href: 'https://wa.me/5537999999999' },
                    { label: 'E-mail',    href: 'mailto:contato@mallevo.com.br' },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[#EDF7F2]/30 hover:text-[#EDF7F2] text-sm font-medium transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ))}
                </div>

                {/* Download CTA */}
                <motion.button
                  onClick={() => navigate('#baixar-app')}
                  className="flex items-center gap-2 bg-[#4CAF82] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#3d9e71] transition-colors shadow-lg shadow-[#4CAF82]/20"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  Baixar app
                  <span className="text-base">↓</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
