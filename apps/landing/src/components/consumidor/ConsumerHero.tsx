'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── App Store Buttons ───────────────────────────────────────────────────────

function AppStoreButton({ store }: { store: 'apple' | 'google' }) {
  const isApple = store === 'apple'
  return (
    <motion.a
      href="#"
      className="inline-flex items-center gap-2.5 bg-white/7 border border-white/10 hover:border-[#4CAF82]/35 hover:bg-white/10 text-[#EDF7F2] px-4 py-2.5 rounded-xl transition-colors duration-200"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      {isApple ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#EDF7F2] shrink-0">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <path d="M3.18 23.76a2.03 2.03 0 0 1-1.18-1.87V2.11c0-.8.44-1.5 1.18-1.87l11.61 11.76L3.18 23.76z" fill="#EA4335"/>
          <path d="M16.54 9.23l2.78-1.61c.71-.41.71-1.08 0-1.49L16.54 4.52 14.79 12l1.75-2.77z" fill="#FBBC04"/>
          <path d="M3.18.24C2.67-.06 2.08-.07 1.54.18L14.79 12 16.54 9.23 3.18.24z" fill="#4285F4"/>
          <path d="M1.54 23.82c.54.25 1.13.24 1.64-.06L16.54 14.77 14.79 12 1.54 23.82z" fill="#34A853"/>
        </svg>
      )}
      <div className="text-left">
        <p className="text-[10px] text-[#EDF7F2]/30 leading-none">
          {isApple ? 'Download na' : 'Disponível no'}
        </p>
        <p className="text-sm font-semibold text-[#EDF7F2] leading-tight mt-0.5">
          {isApple ? 'App Store' : 'Google Play'}
        </p>
      </div>
    </motion.a>
  )
}

// ─── Corner Markers ───────────────────────────────────────────────────────────
// Usamos className em vez de style para evitar conflito com MotionStyle

function CornerMarkers() {
  const corners = [
    'absolute top-6 left-6 border-t border-l',
    'absolute top-6 right-6 border-t border-r',
    'absolute bottom-6 left-6 border-b border-l',
    'absolute bottom-6 right-6 border-b border-r',
  ]
  return (
    <>
      {corners.map((cls, i) => (
        <motion.div
          key={i}
          className={`${cls} w-4 h-4 border-white/15 pointer-events-none z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
        />
      ))}
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function ConsumerHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Background real: parallax sobe + leve zoom
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])

  // Top copy: some + sobe
  const topOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0])
  const topY       = useTransform(scrollYProgress, [0, 0.38], ['0%', '-7%'])

  // Brand name: sobe até o header + encolhe
  const brandY       = useTransform(scrollYProgress, [0, 0.85], ['0%', '-88vh'])
  const brandScale   = useTransform(scrollYProgress, [0, 0.85], [1, 0.095])
  const brandOpacity = useTransform(scrollYProgress, [0.72, 0.90], [1, 0])

  // Linha separadora some junto com o copy
  const dividerOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0])

  return (
    <div ref={containerRef} style={{ height: '200vh' }}>
      <section className="sticky top-0 h-screen overflow-hidden bg-[#050807]">

        {/* ── Imagem de fundo com parallax ─────────────────────────────── */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY, scale: bgScale }}
        >
          <Image
            src="/images/hero/bg-hero.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Overlay em 3 camadas para legibilidade do texto ─────────────
              1. base escura — garante contraste mínimo
              2. vinheta top-bottom — topo e base mais escuros
              3. toque verde — integra a imagem no design system          */}
          <div className="absolute inset-0 bg-[#050807]/58" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(5,8,7,0.55) 0%, rgba(5,8,7,0.15) 40%, rgba(5,8,7,0.20) 65%, rgba(5,8,7,0.80) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 15% 55%, rgba(26,77,58,0.30) 0%, transparent 65%)',
            }}
          />

          {/* Grain cinematográfico */}
          <div className="absolute inset-0 noise-overlay opacity-[0.055]" />
        </motion.div>

        {/* ── Corner markers ───────────────────────────────────────────── */}
        <CornerMarkers />

        {/* ── Coordenada geográfica no topo-centro ─────────────────────── */}
        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="h-px w-8 bg-white/10" />
          <span className="text-[#EDF7F2]/18 text-[10px] font-mono tracking-[0.25em]">
            04°53′S 44°19′O
          </span>
          <div className="h-px w-8 bg-white/10" />
        </motion.div>

        {/* ── Top-left: headline pequena ────────────────────────────────── */}
        <motion.div
          className="absolute z-10"
          style={{
            opacity: topOpacity,
            y: topY,
            top: 'clamp(6rem, 10vh, 8rem)',
            left: 'clamp(1.5rem, 4vw, 4rem)',
            maxWidth: '20rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <p className="flex items-center gap-2 text-[#EDF7F2]/25 text-[10px] tracking-[0.22em] uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF82] shadow-[0_0_8px_rgba(76,175,130,1)]" />
            Disponível agora · Divinópolis, MG
          </p>
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-[1.9rem] text-[#EDF7F2] leading-[1.1] tracking-tight">
            O delivery que<br />
            Divinópolis<br />
            <em className="not-italic text-[#4CAF82]">merecia.</em>
          </h2>
        </motion.div>

        {/* ── Top-right: descriptor ─────────────────────────────────────── */}
        <motion.div
          className="absolute z-10 text-right"
          style={{
            opacity: topOpacity,
            top: 'clamp(6rem, 10vh, 8rem)',
            right: 'clamp(1.5rem, 4vw, 4rem)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.12, ease: EASE }}
        >
          <p className="text-[#EDF7F2]/40 text-base sm:text-[1.05rem] leading-tight font-medium">
            Para<br />Consumidores—
          </p>
          <p className="text-[#EDF7F2]/18 text-[10px] font-mono tracking-wider mt-3">
            v1.0 · 2025
          </p>
        </motion.div>

        {/* ── Linha separadora ──────────────────────────────────────────── */}
        <motion.div
          className="absolute left-0 right-0 z-10"
          style={{
            opacity: dividerOpacity,
            bottom: 'calc(4rem + 23vw * 0.82 + 2rem)',
          }}
        >
          <motion.div
            className="h-px bg-white/6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* ── Eyebrow + CTAs — zona inferior esquerda ───────────────────── */}
        <motion.div
          className="absolute z-10 flex flex-col gap-4"
          style={{
            opacity: topOpacity,
            bottom: 'calc(4rem + 23vw * 0.82 + 3.5rem)',
            left: 'clamp(1.5rem, 4vw, 4rem)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
        >
          <p className="flex items-center gap-2 text-[#EDF7F2]/30 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF5C3A]" />
            Mais de 100 lojas locais na palma da sua mão
          </p>
          <div className="flex gap-2.5">
            <AppStoreButton store="apple" />
            <AppStoreButton store="google" />
          </div>
        </motion.div>

        {/* ── BRAND NAME enorme — base da tela ─────────────────────────── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center z-20 pointer-events-none select-none overflow-hidden"
          style={{ y: brandY, scale: brandScale, opacity: brandOpacity }}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.1, delay: 0.06, ease: EASE }}
        >
          <span
            className="font-jakarta font-black leading-[0.80] tracking-[-0.03em] text-[#EDF7F2] whitespace-nowrap pb-3 sm:pb-4"
            style={{ fontSize: '23vw' }}
          >
            Mall<span className="text-[#4CAF82]">evo</span>
          </span>

          <motion.span
            className="absolute text-[#EDF7F2]/22 font-light"
            style={{
              fontSize: '1.5vw',
              right: '3.2vw',
              bottom: 'calc(12px + 13.8vw)',
            }}
          >
            ®
          </motion.span>
        </motion.div>

        {/* ── Vinheta inferior ─────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#050807] to-transparent pointer-events-none z-10" />

      </section>
    </div>
  )
}
