'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const testimonials = [
  {
    stars: 5,
    quote:
      'Antes pagava 28% para o iFood. Aqui pago R$1,00 por pedido. Em um mês, economizei mais de R$2.000 em comissões.',
    name: 'Marcos A.',
    role: 'Pizzaria da Vila',
    city: 'Divinópolis',
    emoji: '🍕',
    accent: 'bg-dark',
  },
  {
    stars: 5,
    quote:
      'O dashboard é muito mais fácil do que parece. Em menos de uma hora já estava com meu cardápio todo cadastrado e pronto para receber pedidos.',
    name: 'Fernanda C.',
    role: 'Marmitas da Fê',
    city: 'Divinópolis',
    emoji: '🍱',
    accent: 'bg-lime',
  },
  {
    stars: 5,
    quote:
      'Trabalho quando quero, recebo na minha conta no dia seguinte. É o melhor bico que já tive.',
    name: 'Ricardo M.',
    role: 'Entregador autônomo',
    city: 'Divinópolis',
    emoji: '🛵',
    accent: 'bg-accent',
  },
]

export default function Depoimentos() {
  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mb-16 text-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-surface-alt" />
            <span className="text-lime font-jakarta font-bold text-sm tracking-widest uppercase px-4">
              07
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink">
            Quem já usa,{' '}
            <span className="text-dark">aprova</span>
          </h2>
          <p className="text-ink-3 text-lg mt-4">
            Histórias reais de lojistas e entregadores de Divinópolis.
          </p>
        </AnimatedSection>

        {/* Testimonials grid */}
        <AnimatedSection stagger>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="rounded-3xl overflow-hidden shadow-sm border border-surface-alt flex flex-col h-full"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Colored top accent */}
                  <div className={`h-1.5 ${t.accent}`} />

                  <div className="p-8 flex flex-col flex-1 bg-surface">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <span key={s} className="text-lime text-lg">★</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-ink-2 text-base leading-relaxed flex-1 mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-full ${t.accent} flex items-center justify-center text-xl shrink-0`}
                      >
                        {t.emoji}
                      </div>
                      <div>
                        <p className="font-jakarta font-bold text-ink text-sm">
                          {t.name}
                        </p>
                        <p className="text-ink-3 text-xs">
                          {t.role} · {t.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Disclaimer */}
        <AnimatedSection delay={0.2} className="mt-8 text-center">
          <p className="text-ink-3 text-xs">
            * Depoimentos ilustrativos baseados em casos de uso reais.
          </p>
        </AnimatedSection>

        {/* Social proof numbers */}
        <AnimatedSection stagger className="mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-surface rounded-3xl border border-surface-alt">
            {[
              { value: '14',    label: 'dias grátis',        suffix: '' },
              { value: 'R$1',   label: 'por pedido',         suffix: '' },
              { value: '7',     label: 'dias para receber',  suffix: 'D+' },
              { value: '100%',  label: 'seus dados são seus', suffix: '' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <p className="font-jakarta font-bold text-3xl lg:text-4xl text-dark">
                    {stat.suffix}{stat.value}
                  </p>
                  <p className="text-ink-3 text-sm mt-1">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
