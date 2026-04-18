'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

const text =
  'Feito para quem vive em Divinópolis. Uma plataforma que coloca o comércio local na palma da sua mão — conectando você às melhores lojas da cidade com velocidade, confiança e muito mais sabor.'

const words = text.split(' ')

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string
  progress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.08, 1])
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(237,247,242,0.08)', 'rgba(237,247,242,1)']
  )
  return (
    <motion.span
      className="inline mr-[0.28em]"
      style={{ opacity, color }}
    >
      {word}
    </motion.span>
  )
}

export default function ConsumerScrollText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  })

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0B0F0D] py-32 lg:py-52 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4CAF82]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <motion.p
          className="text-[#4CAF82]/40 text-[10px] font-semibold uppercase tracking-[0.25em] mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nossa missão
        </motion.p>

        {/* Scroll-driven word reveal */}
        <p className="font-sora font-bold text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.2] tracking-tight">
          {words.map((word, i) => {
            const total = words.length
            // each word starts revealing slightly before the prior one finishes
            const start = (i / total) * 0.88
            const end = start + 0.12
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            )
          })}
        </p>

        {/* Bottom line */}
        <motion.div
          className="mt-16 h-px bg-linear-to-r from-[#4CAF82]/20 via-white/8 to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  )
}
