'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import AnimatedSection, { StaggerItem } from '@/components/ui/AnimatedSection'

const comparison = [
  {
    feature: 'Comissão',
    others: '12–30% por pedido',
    mallevo: 'R$1,00 fixo',
  },
  {
    feature: 'Mensalidade',
    others: 'Cobranças extras',
    mallevo: 'Fixa e transparente',
  },
  {
    feature: 'Repasse',
    others: 'D+30',
    mallevo: 'D+7 (ou D+2)',
  },
  {
    feature: 'Seus dados',
    others: 'Propriedade deles',
    mallevo: 'São seus',
  },
  {
    feature: 'Suporte',
    others: 'Robô',
    mallevo: 'Pessoa real',
  },
  {
    feature: 'Foco',
    others: 'Nacional',
    mallevo: 'Sua cidade',
  },
]

const benefits = [
  {
    icon: '💰',
    title: 'Comissão fixa de R$1,00',
    description:
      'Não importa se o pedido é de R$20 ou R$200, a comissão é sempre R$1,00. Previsível e justo.',
  },
  {
    icon: '📊',
    title: 'Dashboard completo incluso',
    description:
      'Gestão de produtos, pedidos, financeiro e estoque incluídos na assinatura. Sem custo extra.',
  },
  {
    icon: '⚡',
    title: 'Receba em 7 dias',
    description:
      'Repasse automático todo D+7. Precisa antes? Antecipe para D+2 por apenas R$0,75 por pedido.',
  },
  {
    icon: '🏘️',
    title: 'Feito para Divinópolis',
    description:
      'Suporte próximo, entregadores locais e foco total na nossa cidade.',
  },
]

export default function DiferenciaisLojista() {
  return (
    <section
      id="diferenciais"
      className="bg-creme-escuro py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-verde-medio font-sora font-bold text-sm tracking-widest uppercase">
              03
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <h2 className="font-sora text-4xl lg:text-5xl font-bold text-texto-escuro max-w-2xl">
            Chega de pagar percentual{' '}
            <span className="text-verde-profundo">para o iFood</span>
          </h2>
          <p className="text-texto-medio text-lg mt-4 max-w-2xl">
            Enquanto você paga 12–30% por pedido nos grandes apps, aqui é{' '}
            <strong className="text-verde-profundo">R$1,00 fixo. Sempre.</strong>
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Comparison table */}
          <AnimatedSection direction="left">
            <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-verde-profundo">
                <div className="py-4 px-5">
                  <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                    Critério
                  </span>
                </div>
                <div className="py-4 px-5 border-l border-white/10">
                  <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                    iFood / Rappi
                  </span>
                </div>
                <div className="py-4 px-5 border-l border-white/10">
                  <span className="text-verde-medio text-xs font-bold uppercase tracking-wider">
                    Mallevo ✓
                  </span>
                </div>
              </div>

              {/* Table rows */}
              {comparison.map((row, i) => (
                <motion.div
                  key={row.feature}
                  className="grid grid-cols-3 border-b border-gray-50 last:border-0 hover:bg-creme/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div className="py-4 px-5">
                    <span className="text-texto-escuro font-semibold text-sm">
                      {row.feature}
                    </span>
                  </div>
                  <div className="py-4 px-5 border-l border-gray-50">
                    <div className="flex items-center gap-2">
                      <X size={14} className="text-red-400 shrink-0" />
                      <span className="text-texto-claro text-sm">
                        {row.others}
                      </span>
                    </div>
                  </div>
                  <div className="py-4 px-5 border-l border-gray-50 bg-verde-medio/5">
                    <div className="flex items-center gap-2">
                      <Check
                        size={14}
                        className="text-verde-medio shrink-0"
                      />
                      <span className="text-verde-profundo font-semibold text-sm">
                        {row.mallevo}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Benefits cards */}
          <AnimatedSection stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <StaggerItem key={benefit.title}>
                  <motion.div
                    className="bg-white rounded-2xl p-6 border border-gray-100 h-full"
                    whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(26,77,58,0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-3xl mb-4 block">{benefit.icon}</span>
                    <h3 className="font-sora font-bold text-texto-escuro text-base mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-texto-claro text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
