'use client'

import { motion } from 'framer-motion'
import AnimatedSection, { StaggerItem, HeadingReveal, LabelReveal } from '@/components/ui/AnimatedSection'

const testimonials = [
  {
    name: 'Ana Paula Ribeiro',
    role: 'Cliente desde o lançamento',
    avatar: '👩🏻',
    text: 'Finalmente um app de delivery que é realmente da nossa cidade. Conheço as lojas, confio na qualidade e o pedido chega rápido.',
    rating: 5,
    highlight: true,
  },
  {
    name: 'Carlos Eduardo',
    role: 'Morador do Centro',
    avatar: '👨🏽',
    text: 'O rastreamento em tempo real é excelente. Sou eu que fico olhando o mapa esperando o motoboy chegar — muito melhor que outros apps.',
    rating: 5,
    highlight: false,
  },
  {
    name: 'Mariana Santos',
    role: 'Bairro Jardinópolis',
    avatar: '👩🏼',
    text: 'Uso toda semana para pedir da farmácia e do mercado. App simples, pagamento rápido no PIX e nunca tive problema.',
    rating: 5,
    highlight: false,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#F5A623] text-base">★</span>
      ))}
    </div>
  )
}

export default function ConsumerDepoimentos() {
  return (
    <section className="bg-[#0E1410] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20">
          <AnimatedSection className="flex items-center gap-4 mb-8" direction="none">
            <span className="font-sora font-bold text-sm tracking-[0.2em] text-[#4CAF82]/40">04</span>
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
                Depoimentos
              </LabelReveal>
              <HeadingReveal
                lines={[
                  { text: 'Quem pediu,' },
                  { text: 'aprovou.', accent: true },
                ]}
              />
            </div>

            {/* Rating badge */}
            <AnimatedSection direction="none" delay={0.25}>
              <div className="flex items-center gap-4 bg-[#111714] border border-white/[0.07] rounded-2xl px-6 py-4 self-start lg:self-auto">
                <span className="font-sora font-bold text-4xl text-[#EDF7F2]">4.8</span>
                <div>
                  <Stars count={5} />
                  <p className="text-[#EDF7F2]/40 text-xs mt-1">baseado em avaliações</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Cards */}
        <AnimatedSection stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <motion.div
                  className={`group relative h-full flex flex-col rounded-3xl p-8 border transition-colors duration-300 ${
                    t.highlight
                      ? 'bg-linear-to-br from-[#0F2318] to-[#111714] border-[#4CAF82]/20 hover:border-[#4CAF82]/40'
                      : 'bg-[#111714] border-white/[0.07] hover:border-white/15'
                  }`}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.highlight && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF82]/8 rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="relative flex-1 flex flex-col">
                    {/* Stars */}
                    <div className="mb-5">
                      <Stars count={t.rating} />
                    </div>

                    {/* Quote mark */}
                    <div className="text-[#4CAF82]/15 font-sora font-bold text-6xl leading-none mb-2 select-none">"</div>

                    {/* Quote */}
                    <p className="text-[#EDF7F2]/65 text-sm leading-relaxed flex-1 mb-6">
                      {t.text}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-white/6 mb-6" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#1A2620] border border-white/8 flex items-center justify-center text-xl">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-[#EDF7F2] font-semibold text-sm leading-tight">{t.name}</p>
                        <p className="text-[#EDF7F2]/35 text-xs mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
