'use client'

import { motion } from 'framer-motion'
import { Clock, DollarSign, Map, Bike, Smartphone, Shield, ArrowRight, Star } from 'lucide-react'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const COURIER_URL =
  process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/entregador/cadastro`
    : 'https://app.mallevo.com.br/entregador/cadastro'

const benefits = [
  { icon: Clock,      label: 'Você decide quando trabalhar' },
  { icon: DollarSign, label: 'Receba por entrega (D+1 automático)' },
  { icon: Map,        label: 'Aceite ou recuse pedidos' },
  { icon: Bike,       label: 'Use qualquer veículo' },
  { icon: Smartphone, label: 'App dedicado para entregadores' },
  { icon: Shield,     label: 'Sem vínculo empregatício' },
]

export default function ParaEntregadores() {
  return (
    <section
      id="para-entregadores"
      className="bg-surface-alt py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Courier app mockup */}
          <AnimatedSection direction="left">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Main stat card */}
                <motion.div
                  className="w-72 bg-dark rounded-3xl p-8 shadow-2xl shadow-dark/30"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-lime text-xs font-semibold uppercase tracking-wider mb-6">
                    Sua semana
                  </p>

                  <div className="mb-6">
                    <p className="text-white/50 text-sm mb-1">Você ganhou</p>
                    <p className="font-jakarta font-bold text-5xl text-white leading-none">
                      R$642
                    </p>
                    <p className="text-lime text-sm mt-1">em 3 dias trabalhados</p>
                  </div>

                  {/* Mini chart bars */}
                  <div className="flex items-end gap-2 h-16 mb-4">
                    {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-lime/25 rounded-t-lg"
                        style={{ height: `${h}%` }}
                        initial={{ scaleY: 0, originY: 1 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.3, duration: 0.4 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-white/25 text-[10px]">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 flex justify-between">
                    <div>
                      <p className="text-white/40 text-xs">Entregas</p>
                      <p className="text-white font-jakarta font-bold text-xl">47</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Média/entrega</p>
                      <p className="text-white font-jakarta font-bold text-xl">R$13,66</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Avaliação</p>
                      <p className="text-white font-jakarta font-bold text-xl flex items-center gap-1">
                        4.9 <Star size={14} className="fill-lime text-lime" />
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating available badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-lime rounded-2xl px-4 py-3 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                >
                  <p className="text-lime-ink font-jakarta font-bold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime-ink inline-block" />
                    Online
                  </p>
                </motion.div>

                {/* Floating order notification */}
                <motion.div
                  className="absolute -bottom-6 -right-8 bg-white rounded-2xl shadow-xl border border-surface-alt p-4 max-w-40"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-xs font-bold text-ink mb-1">Novo pedido!</p>
                  <p className="text-[10px] text-ink-3 mb-2">
                    Pizzaria da Vila → Rua das Flores
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-1 rounded-lg">
                      Recusar
                    </span>
                    <span className="bg-lime text-lime-ink text-[10px] font-semibold px-2 py-1 rounded-lg">
                      Aceitar
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Text */}
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lime font-jakarta font-bold text-sm tracking-widest uppercase">
                  06
                </span>
                <div className="flex-1 h-px bg-surface" />
              </div>

              <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4 block">
                Trabalho flexível em Divinópolis
              </span>

              <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink leading-tight mb-6">
                Seja seu próprio chefe.{' '}
                <span className="text-dark">Entregue quando quiser.</span>
              </h2>

              <p className="text-ink-2 text-lg leading-relaxed mb-8">
                Cadastre-se como entregador autônomo, escolha seus horários e
                receba pelo que entregar. Repasse direto na sua conta em{' '}
                <strong className="text-ink">D+1</strong>.
              </p>
            </AnimatedSection>

            {/* Benefits list */}
            <AnimatedSection stagger className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((b) => {
                  const Icon = b.icon
                  return (
                    <StaggerItem key={b.label}>
                      <div className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-surface-alt">
                        <div className="w-9 h-9 rounded-lg bg-dark/8 flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-dark" />
                        </div>
                        <span className="text-ink-2 text-sm">{b.label}</span>
                      </div>
                    </StaggerItem>
                  )
                })}
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.3}>
              <motion.a
                href={COURIER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lime text-lime-ink font-bold px-8 py-4 rounded-xl text-lg hover:bg-lime-dark transition-colors shadow-lg shadow-lime/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Quero ser entregador
                <ArrowRight size={20} />
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
