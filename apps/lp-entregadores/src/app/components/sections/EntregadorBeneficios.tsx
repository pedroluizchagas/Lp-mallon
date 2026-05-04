'use client'

import { Clock, DollarSign, Zap, MapPin, Shield, Headphones } from 'lucide-react'
import { AnimatedSection, StaggerItem, Card } from '@mallevo/ui'

const beneficios = [
  {
    Icon: Clock,
    title: 'Horários flexíveis',
    desc: 'Trabalhe quando e quanto quiser',
  },
  {
    Icon: DollarSign,
    title: 'Ganho por entrega',
    desc: 'Sem mínimo de horas obrigatórias',
  },
  {
    Icon: Zap,
    title: 'Pagamento semanal',
    desc: 'Toda sexta-feira via Pix',
  },
  {
    Icon: MapPin,
    title: 'Só em Divinópolis',
    desc: 'Rotas curtas, mais entregas por dia',
  },
  {
    Icon: Shield,
    title: 'Seguro incluído',
    desc: 'Cobertura durante as entregas',
  },
  {
    Icon: Headphones,
    title: 'Suporte 24h',
    desc: 'Time disponível para ajudar sempre',
  },
]

export default function EntregadorBeneficios() {
  return (
    <section id="beneficios" className="bg-surface py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-jakarta font-bold text-sm tracking-widest uppercase">
              01
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink">
            Por que ser entregador{' '}
            <span className="text-dark">Mallevo?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beneficios.map((b) => {
              const { Icon, title, desc } = b
              return (
                <StaggerItem key={title}>
                  <Card hover className="p-6 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" />
                    </div>
                    <h3 className="font-jakarta font-bold text-ink text-base mb-2">{title}</h3>
                    <p className="text-ink-3 text-sm leading-relaxed">{desc}</p>
                  </Card>
                </StaggerItem>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
