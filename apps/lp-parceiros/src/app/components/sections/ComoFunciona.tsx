'use client'

import { motion } from 'framer-motion'
import {
  Store,
  PackagePlus,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
} from 'lucide-react'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const CTA_URL =
  process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/cadastro`
    : 'https://app.mallevo.com.br/cadastro'

const STEPS = [
  {
    number: '01',
    Icon: Store,
    title: 'Cadastre sua loja',
    description:
      'Preencha os dados da sua loja, endereço, horários de funcionamento e escolha seu plano. O processo é 100% online e leva menos de 10 minutos.',
    tags: ['Dados da loja', 'Endereço via CEP', 'Escolha do plano'],
  },
  {
    number: '02',
    Icon: PackagePlus,
    title: 'Monte seu cardápio',
    description:
      'Adicione seus produtos por categorias, defina preços e faça upload das fotos. Você pode importar via CSV ou cadastrar um a um.',
    tags: ['Produtos e categorias', 'Fotos e descrições', 'Import via CSV'],
  },
  {
    number: '03',
    Icon: TrendingUp,
    title: 'Receba pedidos e ganhe',
    description:
      'Seus clientes pedem pelo app, você confirma no dashboard, o entregador coleta e o dinheiro cai na sua conta em D+7 via Stripe.',
    tags: ['Pedidos em tempo real', 'Entregadores do pool', 'Repasse D+7'],
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-lime font-jakarta font-bold text-xs tracking-widest uppercase">
              01
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink">
              Comece a vender em{' '}
              <span className="text-dark">3 passos</span>
            </h2>
            <p className="text-ink-3 text-base max-w-xs lg:text-right">
              De zero a recebendo pedidos em menos de uma hora.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <AnimatedSection stagger className="relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-[72px] left-[calc(16.666%+28px)] right-[calc(16.666%+28px)] h-px bg-gradient-to-r from-lime/20 via-lime/50 to-lime/20 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {STEPS.map((step) => {
              const { Icon } = step
              return (
                <StaggerItem key={step.number}>
                  <motion.div
                    className="bg-surface rounded-3xl p-7 border border-surface-alt hover:border-dark/15 hover:shadow-md transition-all duration-300 h-full group relative"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {/* Large number watermark */}
                    <span className="absolute top-5 right-6 font-jakarta font-bold text-6xl text-dark/[0.04] select-none leading-none">
                      {step.number}
                    </span>

                    {/* Icon circle */}
                    <div className="w-14 h-14 rounded-2xl bg-dark flex items-center justify-center mb-6">
                      <Icon size={24} className="text-lime" />
                    </div>

                    {/* Step label */}
                    <span className="inline-block text-lime font-jakarta font-bold text-[11px] uppercase tracking-widest mb-2">
                      Passo {step.number}
                    </span>

                    <h3 className="font-jakarta text-[18px] font-bold text-ink mb-3">
                      {step.title}
                    </h3>
                    <p className="text-ink-2 text-[14px] leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 border border-surface-alt"
                        >
                          <CheckCircle2 size={10} className="text-accent/70" />
                          <span className="text-ink-3 text-[10px]">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Bottom info bar */}
        <AnimatedSection delay={0.3} className="mt-10">
          <div className="bg-dark rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-wrap gap-6">
              {[
                { Icon: Clock, text: 'Setup completo em menos de 1 hora' },
                { Icon: MapPin, text: 'Foco exclusivo em Divinópolis' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center">
                    <Icon size={15} className="text-lime" />
                  </div>
                  <span className="text-white/70 text-[14px]">{text}</span>
                </div>
              ))}
            </div>
            <motion.a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lime text-lime-ink font-bold px-7 py-3.5 rounded-2xl text-sm hover:bg-lime-dark transition-colors flex-shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Começar grátis — 14 dias
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
