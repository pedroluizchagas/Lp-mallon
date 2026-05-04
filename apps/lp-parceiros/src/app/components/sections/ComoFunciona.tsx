'use client'

import { motion } from 'framer-motion'
import { Store, PackagePlus, TrendingUp } from 'lucide-react'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const steps = [
  {
    number: '01',
    icon: Store,
    title: 'Cadastre sua loja',
    description:
      'Preencha os dados da sua loja, fotos e horários em minutos. Sem burocracia, sem contrato longo.',
  },
  {
    number: '02',
    icon: PackagePlus,
    title: 'Monte seu cardápio',
    description:
      'Adicione seus produtos, preços e categorias. Fotos bonitas vendem mais — nossa plataforma facilita o upload.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Receba pedidos e ganhe',
    description:
      'Seus clientes pedem pelo app, você confirma no dashboard, o entregador coleta. O dinheiro cai em D+7.',
  },
]

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="bg-white py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-lime font-jakarta font-bold text-sm tracking-widest uppercase">
              02
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink max-w-lg">
            Comece a vender em{' '}
            <span className="text-dark">3 passos</span>
          </h2>
          <p className="text-ink-3 text-lg mt-4 max-w-xl">
            De zero a recebendo pedidos em menos de uma hora. Sem complicação.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <AnimatedSection stagger className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[calc(33.333%-4px)] right-[calc(33.333%-4px)] h-px bg-linear-to-r from-lime/20 via-lime/60 to-lime/20 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <StaggerItem key={step.number}>
                  <motion.div
                    className="bg-surface rounded-3xl p-8 border border-surface-alt hover:border-lime/40 transition-colors relative group"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {/* Large number watermark */}
                    <span className="absolute top-4 right-6 font-jakarta font-bold text-6xl text-dark/5 select-none group-hover:text-dark/10 transition-colors leading-none">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-dark flex items-center justify-center mb-6">
                      <Icon size={26} className="text-lime" />
                    </div>

                    {/* Step number */}
                    <span className="inline-block text-lime font-jakarta font-bold text-sm mb-2">
                      Passo {step.number}
                    </span>

                    <h3 className="font-jakarta text-xl font-bold text-ink mb-3">
                      {step.title}
                    </h3>
                    <p className="text-ink-2 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="mt-12 text-center">
          <motion.a
            href={
              process.env.NEXT_PUBLIC_APP_URL
                ? `${process.env.NEXT_PUBLIC_APP_URL}/cadastro`
                : 'https://app.mallevo.com.br/cadastro'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-lime text-lime-ink font-bold px-8 py-4 rounded-xl hover:bg-lime-dark transition-colors shadow-md shadow-lime/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Começar agora — grátis por 14 dias
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  )
}
