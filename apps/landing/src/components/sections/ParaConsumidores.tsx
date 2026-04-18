'use client'

import { motion } from 'framer-motion'
import { MapPin, CreditCard, Star, MessageSquare } from 'lucide-react'
import AnimatedSection, { StaggerItem } from '@/components/ui/AnimatedSection'

const features = [
  {
    icon: MapPin,
    label: 'Rastreamento em tempo real',
  },
  {
    icon: CreditCard,
    label: 'Pague com cartão ou PIX',
  },
  {
    icon: Star,
    label: 'Avalie sua experiência',
  },
  {
    icon: MessageSquare,
    label: 'Fale direto com a loja',
  },
]

export default function ParaConsumidores() {
  return (
    <section
      id="para-consumidores"
      className="bg-verde-profundo py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-verde-medio font-sora font-bold text-sm tracking-widest uppercase">
                  05
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <span className="text-verde-medio text-sm font-semibold uppercase tracking-wider mb-4 block">
                Para quem mora em Divinópolis
              </span>

              <h2 className="font-sora text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Seus pedidos favoritos,
                <br />
                <span className="text-ambar">na palma da mão.</span>
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Restaurantes, mercadinhos, farmácias, pet shops e muito mais.
                Acompanhe sua entrega em tempo real no mapa.
              </p>
            </AnimatedSection>

            {/* Features */}
            <AnimatedSection stagger className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f) => {
                  const Icon = f.icon
                  return (
                    <StaggerItem key={f.label}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-verde-medio/20 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-verde-medio" />
                        </div>
                        <span className="text-white/90 text-sm font-medium">
                          {f.label}
                        </span>
                      </div>
                    </StaggerItem>
                  )
                })}
              </div>
            </AnimatedSection>

            {/* App store buttons */}
            <AnimatedSection delay={0.3}>
              <p className="text-white/60 text-sm mb-4">
                Disponível em breve para:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#"
                  className="flex items-center gap-3 bg-white text-texto-escuro px-5 py-3 rounded-xl hover:bg-creme transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-texto-claro leading-none">
                      Download na
                    </p>
                    <p className="text-sm font-semibold leading-tight">
                      App Store
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center gap-3 bg-white text-texto-escuro px-5 py-3 rounded-xl hover:bg-creme transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 18.5v-13c0-.83.95-1.3 1.6-.8l11 6.5c.6.35.6 1.25 0 1.6l-11 6.5c-.65.5-1.6.03-1.6-.8z" />
                    <path d="M3.18 6.32L12.27 12 3.18 17.68z" opacity=".3" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-texto-claro leading-none">
                      Disponível no
                    </p>
                    <p className="text-sm font-semibold leading-tight">
                      Google Play
                    </p>
                  </div>
                </motion.a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Phone mockup */}
          <AnimatedSection direction="right">
            <div className="flex justify-center lg:justify-end">
              <motion.div
                className="relative"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Phone frame */}
                <div className="w-64 h-[520px] bg-gradient-to-b from-[#0d3326] to-verde-medio rounded-[2.5rem] border-4 border-white/20 shadow-2xl overflow-hidden relative">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-white text-xs font-medium">9:41</span>
                    <div className="w-24 h-5 bg-black/30 rounded-full" />
                    <div className="flex gap-1 items-center">
                      <div className="w-3 h-2 border border-white/60 rounded-sm">
                        <div className="w-2 h-full bg-verde-medio rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-5 pt-2 pb-4">
                    <p className="text-white/60 text-xs">Olá, Maria!</p>
                    <p className="text-white font-sora font-bold text-lg">
                      O que você quer?
                    </p>
                  </div>

                  {/* Search bar */}
                  <div className="mx-5 bg-white/20 backdrop-blur rounded-xl px-4 py-2.5 mb-4">
                    <p className="text-white/50 text-sm">
                      Buscar loja ou produto...
                    </p>
                  </div>

                  {/* Categories */}
                  <div className="px-5 mb-4">
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
                      Categorias
                    </p>
                    <div className="flex gap-2 overflow-hidden">
                      {['🍕 Pizza', '🛒 Mercado', '💊 Farma', '🐾 Pet'].map(
                        (cat) => (
                          <div
                            key={cat}
                            className="bg-white/15 rounded-xl px-3 py-2 text-white text-xs font-medium whitespace-nowrap"
                          >
                            {cat}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Store card */}
                  <div className="mx-5 bg-white/15 backdrop-blur rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-ambar/30 flex items-center justify-center text-2xl shrink-0">
                        🍕
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                          Pizzaria da Vila
                        </p>
                        <p className="text-white/60 text-xs mt-0.5">
                          ⭐ 4.8 · 25–35 min
                        </p>
                        <p className="text-verde-medio text-xs font-semibold mt-1">
                          Entrega grátis
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur px-6 py-3 flex justify-around">
                    {['🏠', '🔍', '🛒', '👤'].map((icon) => (
                      <span key={icon} className="text-xl">
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating order status */}
                <motion.div
                  className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-xl p-3 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs font-semibold text-texto-escuro mb-1">
                    Pedido a caminho 🛵
                  </p>
                  <div className="flex gap-1">
                    {['✓', '✓', '◌'].map((step, i) => (
                      <div
                        key={i}
                        className={`w-6 h-1.5 rounded-full ${
                          step === '✓' ? 'bg-verde-medio' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
