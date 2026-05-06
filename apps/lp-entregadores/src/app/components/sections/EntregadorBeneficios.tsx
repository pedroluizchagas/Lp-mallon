'use client'

import {
  Clock,
  Wallet,
  Navigation2,
  Smartphone,
  Bike,
  Zap,
  CheckCircle2,
} from 'lucide-react'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const BENEFICIOS = [
  {
    Icon: Clock,
    title: 'Horários livres',
    desc: 'Você escolhe quando trabalhar. Basta ligar o modo online no app e começar a receber pedidos. Sem escala, sem horário mínimo.',
    highlight: false,
  },
  {
    Icon: Wallet,
    title: 'R$8–15 por entrega',
    desc: 'Cada entrega concluída cai direto na sua conta. Quanto mais você entrega, mais você ganha — sem teto.',
    highlight: true,
  },
  {
    Icon: Zap,
    title: 'Pix toda sexta',
    desc: 'Seus ganhos da semana são transferidos via Pix toda sexta-feira. Sem burocracia, sem espera.',
    highlight: false,
  },
  {
    Icon: Navigation2,
    title: 'Rastreamento em tempo real',
    desc: 'O app mostra a rota completa no mapa, com os endereços de coleta e entrega. Navegação integrada com um toque.',
    highlight: false,
  },
  {
    Icon: Smartphone,
    title: 'App dedicado para você',
    desc: 'Dashboard de ganhos, histórico de entregas, controle de conta e suporte — tudo num só app feito para o entregador.',
    highlight: false,
  },
  {
    Icon: Bike,
    title: 'Qualquer veículo aceito',
    desc: 'Moto, bicicleta, carro ou a pé. Escolha como vai trabalhar e cadastre seu veículo no app em menos de 5 minutos.',
    highlight: false,
  },
]

export default function EntregadorBeneficios() {
  return (
    <section id="beneficios" className="bg-surface py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-jakarta font-bold text-xs tracking-widest uppercase text-accent">
              01
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <div className="max-w-2xl">
            <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink mb-4 leading-tight">
              Por que ser entregador{' '}
              <span className="text-dark">Mallevo?</span>
            </h2>
            <p className="text-ink-3 text-lg leading-relaxed">
              Um app completo criado para você ganhar mais, com mais liberdade e
              menos complicação.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <AnimatedSection stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFICIOS.map(({ Icon, title, desc, highlight }) => (
              <StaggerItem key={title}>
                <div
                  className={`relative rounded-3xl p-7 h-full border transition-all duration-300 hover:-translate-y-1 ${
                    highlight
                      ? 'bg-dark border-dark shadow-[0_8px_40px_rgba(24,24,27,0.18)]'
                      : 'bg-white border-surface-alt hover:border-dark/15 hover:shadow-md'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                      highlight ? 'bg-lime/15' : 'bg-surface'
                    }`}
                  >
                    <Icon
                      size={22}
                      className={highlight ? 'text-lime' : 'text-accent'}
                    />
                  </div>

                  {/* Content */}
                  <h3
                    className={`font-jakarta font-bold text-[17px] mb-3 ${
                      highlight ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      highlight ? 'text-white/55' : 'text-ink-3'
                    }`}
                  >
                    {desc}
                  </p>

                  {/* Highlight badge */}
                  {highlight && (
                    <div className="absolute top-5 right-5 flex items-center gap-1 bg-lime/15 border border-lime/25 rounded-full px-2.5 py-1">
                      <CheckCircle2 size={11} className="text-lime" />
                      <span className="text-lime text-[10px] font-bold">Destaque</span>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
