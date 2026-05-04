'use client'

import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'
import { Badge } from '@mallevo/ui'

const CTA_URL =
  process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/cadastro`
    : 'https://app.mallevo.com.br/cadastro'

const plans = [
  {
    name: 'Básico',
    price: '97',
    tagline: 'Para começar com o pé direito',
    highlight: false,
    cta: 'Começar grátis',
    ctaHref: CTA_URL,
    features: [
      { text: '1 loja', included: true },
      { text: 'Até 30 produtos', included: true },
      { text: 'Dashboard de pedidos', included: true },
      { text: 'Financeiro básico', included: true },
      { text: '1 entregador próprio', included: true },
      { text: 'Notificações push', included: true },
      { text: 'Controle de estoque', included: false },
      { text: 'Relatórios avançados', included: false },
    ],
  },
  {
    name: 'Profissional',
    price: '147',
    tagline: 'Para quem quer crescer',
    highlight: true,
    badge: 'Mais popular',
    cta: 'Começar grátis',
    ctaHref: CTA_URL,
    features: [
      { text: 'Até 3 lojas', included: true },
      { text: 'Até 100 produtos', included: true },
      { text: 'Dashboard completo', included: true },
      { text: 'Financeiro com gráficos', included: true },
      { text: '5 entregadores próprios', included: true },
      { text: 'Controle de estoque', included: true },
      { text: 'Relatórios completos', included: true },
      { text: 'Antecipação de repasse', included: true },
    ],
  },
  {
    name: 'Premium',
    price: '247',
    tagline: 'Para operações maiores',
    highlight: false,
    cta: 'Falar com vendas',
    ctaHref: 'mailto:contato@mallevo.com.br',
    features: [
      { text: 'Lojas ilimitadas', included: true },
      { text: 'Produtos ilimitados', included: true },
      { text: 'Tudo do Profissional', included: true },
      { text: 'Entregadores ilimitados', included: true },
      { text: 'Relatórios com export CSV', included: true },
      { text: 'Prioridade no suporte', included: true },
      { text: 'Acesso antecipado a novidades', included: true },
      { text: 'Gerente de conta dedicado', included: true },
    ],
  },
]

export default function Planos() {
  return (
    <section id="planos" className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-lime font-jakarta font-bold text-sm tracking-widest uppercase">
              04
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink">
            Planos que cabem no{' '}
            <span className="text-dark">seu bolso</span>
          </h2>
          <p className="text-ink-2 text-lg mt-4">
            Sem surpresas. Cancele quando quiser.
          </p>
        </AnimatedSection>

        {/* Trial banner */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="bg-lime/10 border border-lime/30 rounded-2xl py-3.5 px-6 inline-flex items-center gap-3">
            <span className="text-xl">✨</span>
            <p className="text-ink font-semibold">
              Todos os planos incluem{' '}
              <strong>14 dias grátis para testar</strong>
            </p>
          </div>
        </AnimatedSection>

        {/* Plans grid */}
        <AnimatedSection stagger>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <StaggerItem key={plan.name}>
                <motion.div
                  className={`relative rounded-3xl border-2 h-full flex flex-col ${
                    plan.highlight
                      ? 'border-dark bg-dark text-white shadow-2xl shadow-dark/25'
                      : 'border-surface-alt bg-white shadow-sm'
                  }`}
                  whileHover={
                    plan.highlight
                      ? { y: -6 }
                      : { y: -4, boxShadow: '0 16px 40px rgba(15,15,13,0.08)' }
                  }
                  transition={{ duration: 0.2 }}
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge variant="lime" className="shadow-lg shadow-lime/20">
                        ⭐ {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="p-8 flex-1 flex flex-col">
                    {/* Plan name */}
                    <div className="mb-6">
                      <h3
                        className={`font-jakarta font-bold text-xl mb-1 ${
                          plan.highlight ? 'text-white' : 'text-ink'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          plan.highlight ? 'text-white/50' : 'text-ink-3'
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-end gap-1">
                        <span
                          className={`text-sm font-semibold ${
                            plan.highlight ? 'text-white/60' : 'text-ink-3'
                          }`}
                        >
                          R$
                        </span>
                        <span
                          className={`font-jakarta font-bold text-5xl leading-none ${
                            plan.highlight ? 'text-lime' : 'text-ink'
                          }`}
                        >
                          {plan.price}
                        </span>
                        <span
                          className={`text-sm mb-1 ${
                            plan.highlight ? 'text-white/50' : 'text-ink-3'
                          }`}
                        >
                          /mês
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="flex flex-col gap-3 flex-1 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check
                              size={16}
                              className="text-accent shrink-0"
                            />
                          ) : (
                            <X
                              size={16}
                              className={
                                plan.highlight
                                  ? 'text-white/25 shrink-0'
                                  : 'text-ink-3/40 shrink-0'
                              }
                            />
                          )}
                          <span
                            className={`text-sm ${
                              !feature.included
                                ? plan.highlight
                                  ? 'text-white/25'
                                  : 'text-ink-3/40'
                                : plan.highlight
                                ? 'text-white/85'
                                : 'text-ink-2'
                            }`}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.a
                      href={plan.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-colors ${
                        plan.highlight
                          ? 'bg-lime text-lime-ink hover:bg-lime-dark'
                          : 'bg-dark text-white hover:bg-dark-2'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                      <ArrowRight size={16} />
                    </motion.a>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Footer note */}
        <AnimatedSection delay={0.2} className="mt-10 text-center">
          <p className="text-ink-3 text-sm">
            Não tem certeza qual plano escolher?{' '}
            <a
              href="mailto:contato@mallevo.com.br"
              className="text-dark font-semibold hover:text-ink-2 transition-colors"
            >
              Fale com a gente →
            </a>
          </p>
          <p className="text-ink-3 text-xs mt-2">
            Todos os planos incluem comissão de R$1,00 por pedido entregue com
            pagamento online.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
