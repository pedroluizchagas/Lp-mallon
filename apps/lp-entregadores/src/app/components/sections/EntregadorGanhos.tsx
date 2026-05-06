'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Package,
  Wallet,
  CalendarCheck,
  CheckCircle2,
} from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

const CADASTRO_URL =
  process.env.NEXT_PUBLIC_CADASTRO_URL ??
  'https://app.mallevo.com.br/entregador/cadastro'

const KPIS = [
  {
    value: 'R$8–15',
    label: 'Por entrega',
    sub: 'Valor médio recebido em cada pedido concluído',
    Icon: Package,
  },
  {
    value: 'R$80–150',
    label: 'Por dia',
    sub: 'Ganho diário dos entregadores ativos em Divinópolis',
    Icon: TrendingUp,
    highlight: true,
  },
  {
    value: '25 min',
    label: 'Por entrega',
    sub: 'Tempo médio de deslocamento em rotas locais',
    Icon: Clock,
  },
  {
    value: '+200',
    label: 'Pedidos/dia',
    sub: 'Disponíveis na plataforma para você aceitar',
    Icon: Wallet,
  },
]

const PAYMENT_ITEMS = [
  {
    Icon: CalendarCheck,
    title: 'Pagamento toda sexta',
    desc: 'Os ganhos da semana são depositados na sua conta todo dia de semana.',
  },
  {
    Icon: Wallet,
    title: 'Via Pix, sem taxa',
    desc: 'Transferência instantânea direto para o banco que você cadastrou no app.',
  },
  {
    Icon: CheckCircle2,
    title: 'Histórico completo',
    desc: 'Acompanhe cada entrega, valor e data de pagamento pelo seu app.',
  },
]

export default function EntregadorGanhos() {
  return (
    <section id="ganhos" className="bg-dark text-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-lime font-jakarta font-bold text-xs tracking-widest uppercase">
              04
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-white">
              Quanto você pode ganhar?
            </h2>
            <p className="text-white/40 text-base max-w-xs lg:text-right">
              Dados reais dos entregadores ativos em Divinópolis.
            </p>
          </div>
        </AnimatedSection>

        {/* KPI grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {KPIS.map(({ value, label, sub, Icon, highlight }, i) => (
            <motion.div
              key={label}
              className={`rounded-3xl p-6 border ${
                highlight
                  ? 'bg-lime/10 border-lime/25 col-span-2 lg:col-span-1'
                  : 'bg-white/[0.04] border-white/[0.07]'
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: highlight ? 'rgba(193,241,72,0.4)' : 'rgba(255,255,255,0.14)' }}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${
                  highlight ? 'bg-lime/20' : 'bg-white/[0.06]'
                }`}
              >
                <Icon size={17} className={highlight ? 'text-lime' : 'text-white/50'} />
              </div>
              <p
                className={`font-jakarta font-bold leading-none mb-1 ${
                  highlight ? 'text-4xl text-lime' : 'text-3xl text-white'
                }`}
              >
                {value}
              </p>
              <p className={`font-semibold text-sm mb-2 ${highlight ? 'text-white' : 'text-white/70'}`}>
                {label}
              </p>
              <p className="text-white/35 text-[12px] leading-relaxed">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Payment info */}
        <AnimatedSection>
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="lg:max-w-sm">
                <h3 className="font-jakarta font-bold text-2xl text-white mb-3">
                  Receba toda semana,{' '}
                  <span className="text-lime">sem surpresas</span>
                </h3>
                <p className="text-white/45 text-[15px] leading-relaxed">
                  Seus ganhos são calculados automaticamente e depositados via Pix toda sexta-feira.
                  Sem burocracia, sem espera.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:flex-1">
                {PAYMENT_ITEMS.map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-lime" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-[13px] mb-1">{title}</p>
                      <p className="text-white/35 text-[12px] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="mt-12 text-center">
          <motion.a
            href={CADASTRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-lime text-lime-ink font-bold px-8 py-4 rounded-2xl text-base hover:bg-lime-dark transition-colors"
            style={{ boxShadow: '0 8px 32px rgba(193,241,72,0.2)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero começar agora
            <ArrowRight size={18} />
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  )
}
