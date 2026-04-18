'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

// ─── Arpeggio — seção de mídia pós-hero ───────────────────────────────────────
//
// PADRÃO ARPEGGIO:
//   Container height: 280vh  →  section sticky  →  280vh de scroll para animar
//
//   Fase 0–0.35  : painel central expande  clipPath inset(8% 14%) → inset(0% 0%)
//                  borderRadius 28px → 0px
//   Fase 0.15–0.5: texto overlay revela linha a linha (mask reveal)
//   Fase 0.05–0.40: tiles laterais entram da esquerda/direita (x ±80 → 0, clip reveal)
//   Fase 0.55–1.0 : painel inteiro faz parallax suave para cima (sai de cena)
//
// ELEMENTOS:
//   • painel central  — bg-hero.png + overlay + texto
//   • 3 tiles laterais — representativos (gradiente + label + ícone)
//   • texto de seção  — "Tudo em um só lugar…" revelado linha a linha
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

const textLines = [
  'Tudo em um',
  'só lugar.',
  'A melhor experiência,',
  'tudo mais rápido',
  'e do seu jeito.',
]

// ─── Tiles laterais representativos ──────────────────────────────────────────

const tiles = [
  {
    id: 'a',
    position: 'left-top',
    label: 'Restaurantes',
    sublabel: '60+ parceiros',
    emoji: '🍕',
    gradient: 'from-[#0D2016] to-[#1A4D3A]',
    accent: '#4CAF82',
    delay: 0.08,
  },
  {
    id: 'b',
    position: 'right-top',
    label: 'Mercados',
    sublabel: 'Entrega em 40min',
    emoji: '🛒',
    gradient: 'from-[#1A1008] to-[#3D2A00]',
    accent: '#F5A623',
    delay: 0.16,
  },
  {
    id: 'c',
    position: 'left-bottom',
    label: 'Farmácias',
    sublabel: 'Aberto agora',
    emoji: '💊',
    gradient: 'from-[#0A0D18] to-[#1A2040]',
    accent: '#7B9FFF',
    delay: 0.24,
  },
]

// ─── Tile ─────────────────────────────────────────────────────────────────────

function ShowcaseTile({
  tile,
  clipPath,
  x,
  opacity,
}: {
  tile: (typeof tiles)[number]
  clipPath: ReturnType<typeof useTransform>
  x: ReturnType<typeof useTransform>
  opacity: ReturnType<typeof useTransform>
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${tile.gradient} border border-white/8 flex flex-col justify-between p-5`}
      style={{ clipPath, x, opacity }}
    >
      {/* Index */}
      <div className="flex items-center justify-between mb-auto">
        <span className="text-white/20 text-[10px] font-mono">
          {tiles.indexOf(tile) === 0 ? '01' : tiles.indexOf(tile) === 1 ? '02' : '03'}
        </span>
        <span
          className="text-[10px] font-semibold tracking-[0.15em] uppercase"
          style={{ color: tile.accent }}
        >
          {tile.label}
        </span>
      </div>

      {/* Emoji central */}
      <div className="flex items-center justify-center py-6">
        <span className="text-5xl">{tile.emoji}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-white/30 text-xs">{tile.sublabel}</span>
        <span className="text-lg" style={{ color: tile.accent }}>→</span>
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 80%, ${tile.accent}14 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ConsumerShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // ── Painel central: expande de caixa para tela cheia ─────────────────────
  const panelClip = useTransform(
    scrollYProgress,
    [0.0, 0.35],
    ['inset(8% 14% 8% 14% round 28px)', 'inset(0% 0% 0% 0% round 0px)'],
  )
  const panelScale = useTransform(scrollYProgress, [0.0, 0.35], [0.9, 1])

  // Sai de cena no final (parallax up)
  const panelY = useTransform(scrollYProgress, [0.6, 1.0], ['0%', '-18%'])

  // ── Texto overlay: revela entre 0.18 e 0.55 ──────────────────────────────
  const textOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1])
  const textY       = useTransform(scrollYProgress, [0.18, 0.40], ['30px', '0px'])

  // ── Tiles: entram entre 0.05 e 0.45 ─────────────────────────────────────
  const tilesOpacity = useTransform(scrollYProgress, [0.05, 0.30], [0, 1])

  // Tile esquerda
  const tileLeftClip = useTransform(
    scrollYProgress,
    [0.05, 0.40],
    ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
  )
  const tileLeftX = useTransform(scrollYProgress, [0.05, 0.40], ['-40px', '0px'])

  // Tile direita
  const tileRightClip = useTransform(
    scrollYProgress,
    [0.10, 0.45],
    ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'],
  )
  const tileRightX = useTransform(scrollYProgress, [0.10, 0.45], ['40px', '0px'])

  // Tile terceiro (baixo-esquerda)
  const tileBottomClip = useTransform(
    scrollYProgress,
    [0.15, 0.48],
    ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
  )
  const tileBottomY = useTransform(scrollYProgress, [0.15, 0.48], ['40px', '0px'])

  // ── Label de seção (aparece antes dos tiles) ──────────────────────────────
  const labelOpacity = useTransform(scrollYProgress, [0.02, 0.18], [0, 1])

  return (
    <div ref={containerRef} style={{ height: '280vh' }} className="relative bg-[#050807]">
      <section className="sticky top-0 h-screen overflow-hidden bg-[#050807]">

        {/* ── Grain ────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 noise-overlay opacity-[0.04] pointer-events-none z-30" />

        {/* ── Label de seção — topo esquerdo ───────────────────────────── */}
        <motion.div
          className="absolute top-8 left-8 sm:left-12 z-20 flex items-center gap-3"
          style={{ opacity: labelOpacity }}
        >
          <div className="h-px w-6 bg-white/20" />
          <span className="text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase">
            Experiência
          </span>
        </motion.div>

        {/* ── Contador de seção — topo direito ─────────────────────────── */}
        <motion.div
          className="absolute top-8 right-8 sm:right-12 z-20"
          style={{ opacity: labelOpacity }}
        >
          <span className="text-white/20 text-[10px] font-mono">02 / 05</span>
        </motion.div>

        {/* ── Layout: tiles laterais + painel central ───────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">

          {/* Grade principal: [tile] [painel] [tile] */}
          <div className="w-full max-w-[1200px] grid grid-cols-[1fr_2.4fr_1fr] sm:grid-cols-[180px_1fr_180px] lg:grid-cols-[220px_1fr_220px] gap-3 h-[70vh] items-center">

            {/* ── Coluna esquerda: tiles ────────────────────────────────── */}
            <div className="flex flex-col gap-3 h-full py-2">
              <ShowcaseTile
                tile={tiles[0]}
                clipPath={tileLeftClip}
                x={tileLeftX}
                opacity={tilesOpacity}
              />
              <ShowcaseTile
                tile={tiles[2]}
                clipPath={tileBottomClip}
                x={tileBottomY}  // usa Y como X para vir de baixo
                opacity={tilesOpacity}
              />
            </div>

            {/* ── Painel central ────────────────────────────────────────── */}
            <motion.div
              className="relative h-full overflow-hidden"
              style={{ clipPath: panelClip, scale: panelScale, y: panelY }}
            >
              {/* Imagem de fundo */}
              <Image
                src="/images/hero/bg-hero.png"
                alt="Mallevo — o delivery de Divinópolis"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 60vw"
              />

              {/* Overlay escuro */}
              <div className="absolute inset-0 bg-[#050807]/50" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,8,7,0.88) 0%, rgba(5,8,7,0.20) 45%, rgba(5,8,7,0.10) 100%)',
                }}
              />

              {/* Grain sobre a imagem */}
              <div className="absolute inset-0 noise-overlay opacity-[0.06]" />

              {/* ── Texto overlay — centro-baixo do painel ─────────────── */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 px-8 sm:px-10 pb-8 sm:pb-10 z-10"
                style={{ opacity: textOpacity, y: textY }}
              >
                {/* Label acima do texto */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF82]" />
                  <span className="text-[#4CAF82] text-[10px] font-semibold tracking-[0.2em] uppercase">
                    Mallevo · Divinópolis
                  </span>
                </div>

                {/* Linhas de texto — mask reveal individual */}
                <div className="space-y-0.5">
                  {textLines.map((line, i) => (
                    <div key={i} className="overflow-hidden">
                      <motion.p
                        className={`font-sora font-black leading-[0.92] tracking-tight text-[#EDF7F2] whitespace-nowrap ${
                          i < 2
                            ? 'text-[clamp(2rem,5.5vw,4.5rem)]'
                            : 'text-[clamp(1rem,2.5vw,2rem)] text-[#EDF7F2]/50 font-medium'
                        }`}
                        initial={{ y: '100%' }}
                        style={{ opacity: textOpacity }}
                        whileInView={{ y: '0%' }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: EASE,
                        }}
                      >
                        {line}
                      </motion.p>
                    </div>
                  ))}
                </div>

                {/* Linha separadora */}
                <div className="mt-6 h-px bg-white/10" />

                {/* Rodapé do painel */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white/25 text-xs font-mono">100+ lojas · Divinópolis, MG</span>
                  <span className="text-[#4CAF82] text-xs font-semibold">Disponível agora →</span>
                </div>
              </motion.div>

              {/* Decoração: índice no canto superior direito do painel */}
              <motion.div
                className="absolute top-6 right-6 z-10"
                style={{ opacity: textOpacity }}
              >
                <span className="text-white/15 text-[11px] font-mono">01</span>
              </motion.div>
            </motion.div>

            {/* ── Coluna direita: tile ──────────────────────────────────── */}
            <div className="flex flex-col h-full py-2">
              <ShowcaseTile
                tile={tiles[1]}
                clipPath={tileRightClip}
                x={tileRightX}
                opacity={tilesOpacity}
              />
            </div>
          </div>
        </div>

        {/* ── Vinheta inferior ─────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#050807] to-transparent pointer-events-none z-20" />

      </section>
    </div>
  )
}
