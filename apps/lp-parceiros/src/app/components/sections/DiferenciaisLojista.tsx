'use client'

import { motion } from 'framer-motion'
import { Check, X, Wallet, LayoutDashboard, Zap, MapPin } from 'lucide-react'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const COMPARISON = [
  { feature: 'Comissão', others: '12–30% por pedido', mallevo: 'R$1,00 fixo' },
  { feature: 'Mensalidade', others: 'Cobranças extras', mallevo: 'Fixa e transparente' },
  { feature: 'Repasse', others: 'D+30', mallevo: 'D+7 (ou D+2)' },
  { feature: 'Seus dados', others: 'Propriedade deles', mallevo: 'São 100% seus' },
  { feature: 'Suporte', others: 'Chatbot automático', mallevo: 'Pessoa real, local' },
  { feature: 'Foco', others: 'Nacional, genérico', mallevo: 'Divinópolis, MG' },
]

const BENEFITS = [
  {
    Icon: Wallet,
    title: 'Comissão fixa de R$1,00',
    description:
      'Não importa se o pedido é de R$20 ou R$200 — a comissão é sempre R$1,00. Sem surpresas no fim do mês.',
  },
  {
    Icon: LayoutDashboard,
    title: 'Dashboard completo incluso',
    description:
      'Gestão de pedidos, produtos, estoque, financeiro e relatórios incluídos em todos os planos. Sem custo extra.',
  },
  {
    Icon: Zap,
    title: 'Receba em 7 dias',
    description:
      'Repasse automático em D+7. Precisa antes? Antecipe para D+2 por apenas R$0,75 por pedido.',
  },
  {
    Icon: MapPin,
    title: 'Feito para Divinópolis',
    description:
      'Suporte próximo, entregadores locais e foco total em quem vende aqui. A plataforma que entende sua cidade.',
  },
]

export default function DiferenciaisLojista() {
  return (
    <section id="diferenciais" className="bg-surface-alt py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-lime font-jakarta font-bold text-xs tracking-widest uppercase">
              02
            </span>
            <div className="flex-1 h-px bg-surface" />
          </div>
          <div className="max-w-2xl">
            <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink mb-4">
              Chega de pagar percentual{' '}
              <span className="text-dark">para o iFood</span>
            </h2>
            <p className="text-ink-2 text-lg leading-relaxed">
              Enquanto você paga 12–30% por pedido nos grandes apps, aqui é{' '}
              <strong className="text-ink">R$1,00 fixo. Sempre.</strong>
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Comparison table */}
          <AnimatedSection direction="left">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-surface-alt">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-dark">
                <div className="py-4 px-5">
                  <span className="text-white/35 text-[10px] font-bold uppercase tracking-wider">
                    Critério
                  </span>
                </div>
                <div className="py-4 px-5 border-l border-white/10">
                  <span className="text-white/35 text-[10px] font-bold uppercase tracking-wider">
                    iFood / Rappi
                  </span>
                </div>
                <div className="py-4 px-5 border-l border-white/10">
                  <span className="text-lime text-[10px] font-bold uppercase tracking-wider">
                    Mallevo
                  </span>
                </div>
              </div>

              {/* Rows */}
              {COMPARISON.map((row, i) => (
                <motion.div
                  key={row.feature}
                  className="grid grid-cols-3 border-b border-surface last:border-0 hover:bg-surface/60 transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div className="py-4 px-5">
                    <span className="text-ink font-semibold text-[13px]">{row.feature}</span>
                  </div>
                  <div className="py-4 px-5 border-l border-surface">
                    <div className="flex items-start gap-2">
                      <X size={13} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-ink-3 text-[12px] leading-snug">{row.others}</span>
                    </div>
                  </div>
                  <div className="py-4 px-5 border-l border-surface bg-lime/4">
                    <div className="flex items-start gap-2">
                      <Check size={13} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-ink font-semibold text-[12px] leading-snug">{row.mallevo}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Benefits cards */}
          <AnimatedSection stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map(({ Icon, title, description }) => (
                <StaggerItem key={title}>
                  <motion.div
                    className="bg-white rounded-2xl p-6 border border-surface-alt h-full hover:border-dark/15 hover:shadow-sm transition-all duration-200"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-dark flex items-center justify-center mb-5">
                      <Icon size={18} className="text-lime" />
                    </div>
                    <h3 className="font-jakarta font-bold text-ink text-[15px] mb-2.5">{title}</h3>
                    <p className="text-ink-3 text-[13px] leading-relaxed">{description}</p>
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
