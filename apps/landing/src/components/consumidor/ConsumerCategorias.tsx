'use client'

import { motion } from 'framer-motion'
import AnimatedSection, { StaggerItem, HeadingReveal, LabelReveal } from '@/components/ui/AnimatedSection'

const categories = [
  { emoji: '🍕', label: 'Pizzas', count: '12 lojas', glow: 'rgba(249,115,22,0.12)' },
  { emoji: '🛒', label: 'Mercados', count: '8 lojas', glow: 'rgba(59,130,246,0.12)' },
  { emoji: '💊', label: 'Farmácias', count: '5 lojas', glow: 'rgba(76,175,130,0.12)' },
  { emoji: '🍔', label: 'Lanches', count: '18 lojas', glow: 'rgba(234,179,8,0.12)' },
  { emoji: '🐾', label: 'Pet Shop', count: '4 lojas', glow: 'rgba(168,85,247,0.12)' },
  { emoji: '☕', label: 'Cafés', count: '7 lojas', glow: 'rgba(180,83,9,0.15)' },
  { emoji: '🥗', label: 'Saudável', count: '6 lojas', glow: 'rgba(34,197,94,0.12)' },
  { emoji: '🍰', label: 'Docerias', count: '9 lojas', glow: 'rgba(236,72,153,0.12)' },
]

export default function ConsumerCategorias() {
  return (
    <section id="categorias" className="bg-[#0E1410] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20">
          <AnimatedSection className="flex items-center gap-4 mb-8" direction="none">
            <span className="font-jakarta font-bold text-sm tracking-[0.2em] text-[#4CAF82]/40">02</span>
            <motion.div
              className="flex-1 h-px bg-linear-to-r from-white/8 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <LabelReveal delay={0.05} className="mb-5">
                Categorias
              </LabelReveal>
              <HeadingReveal
                lines={[
                  { text: 'Tudo que você' },
                  { text: 'precisa.', accent: true },
                ]}
              />
            </div>
            <AnimatedSection direction="none" delay={0.3}>
              <p className="text-[#EDF7F2]/40 text-sm leading-relaxed max-w-xs">
                Mais de 100 estabelecimentos locais disponíveis para entrega em Divinópolis.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Grid */}
        <AnimatedSection stagger>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <StaggerItem key={cat.label}>
                <motion.button
                  className="group relative w-full bg-[#111714] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Category-specific glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at center, ${cat.glow}, transparent 70%)` }}
                  />

                  <div className="relative">
                    <motion.div
                      className="text-[42px] mb-3 leading-none"
                      whileHover={{ scale: 1.15, rotate: [-2, 2, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {cat.emoji}
                    </motion.div>
                    <p className="font-jakarta font-semibold text-[#EDF7F2] text-sm">{cat.label}</p>
                    <p className="text-[#EDF7F2]/30 text-xs mt-1">{cat.count}</p>
                  </div>
                </motion.button>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>

        {/* "Ver todas" CTA */}
        <AnimatedSection delay={0.3} className="flex justify-center mt-12">
          <motion.button
            className="group flex items-center gap-2 text-[#4CAF82] text-sm font-semibold border border-[#4CAF82]/20 rounded-xl px-6 py-3 hover:bg-[#4CAF82]/8 transition-colors overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Ver todas as categorias</span>
            <motion.span
              className="text-[#4CAF82]/50 text-lg leading-none relative z-10"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.button>
        </AnimatedSection>
      </div>
    </section>
  )
}
