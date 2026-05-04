'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CADASTRO_URL =
  process.env.NEXT_PUBLIC_CADASTRO_URL ?? 'https://app.mallevo.com.br/entregador/cadastro'

const metrics = [
  { value: 'R$40–120/dia', label: 'Ganho médio diário' },
  { value: 'Pagamento semanal', label: 'Toda sexta via Pix' },
  { value: 'Suporte 24h', label: 'Sempre disponível' },
]

export default function EntregadorHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0B0F0D]">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(76,175,130,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(76,175,130,0.06)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(237,247,242,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(237,247,242,0.15) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            className="inline-flex items-center gap-2 bg-[#4CAF82]/10 border border-[#4CAF82]/20 rounded-full px-4 py-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF82] animate-pulse" />
            <span className="text-[#4CAF82] text-xs font-semibold uppercase tracking-wider">
              Divinópolis, MG — Vagas abertas
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-jakarta font-bold text-5xl sm:text-6xl lg:text-7xl text-[#EDF7F2] leading-[1.0] tracking-tight"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Ganhe dinheiro no
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="font-jakarta font-bold text-5xl sm:text-6xl lg:text-7xl text-[#4CAF82] leading-[1.0] tracking-tight"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              seu tempo livre.
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            className="text-[#EDF7F2]/50 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Entregue quando quiser em Divinópolis. Você define seus horários,
            recebe por entrega e tem suporte completo da plataforma.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={CADASTRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#4CAF82] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#3d9e71] transition-colors shadow-lg shadow-[#4CAF82]/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Quero ser entregador
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

        {/* Floating metric cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.value}
              className="bg-[#111714] border border-[#4CAF82]/15 rounded-2xl p-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: 'rgba(76,175,130,0.35)', y: -3 }}
            >
              <p className="font-jakarta font-bold text-[#4CAF82] text-xl mb-1">
                {metric.value}
              </p>
              <p className="text-[#EDF7F2]/40 text-xs">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Brand name — base of screen */}
        <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 select-none pointer-events-none">
          <span className="font-jakarta font-bold text-[8rem] lg:text-[12rem] leading-none text-white/[0.03]">
            Mall<span className="text-[#4CAF82]/[0.06]">evo</span>
          </span>
        </div>
      </div>
    </section>
  )
}
