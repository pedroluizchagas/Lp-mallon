'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

const CADASTRO_URL =
  process.env.NEXT_PUBLIC_CADASTRO_URL ?? 'https://app.mallevo.com.br/entregador/cadastro'

const metricas = [
  { valor: 'R$80–150', label: 'Ganho médio por dia' },
  { valor: '25 min', label: 'Tempo médio por entrega' },
  { valor: '200+', label: 'Pedidos disponíveis por dia' },
]

export default function EntregadorGanhos() {
  return (
    <section id="ganhos" className="bg-surface-alt py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-jakarta font-bold text-sm tracking-widest uppercase">
              03
            </span>
            <div className="flex-1 h-px bg-surface" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink mb-3">
            Quanto você pode ganhar?
          </h2>
          <p className="text-ink-3 text-lg">
            Baseado nos dados dos nossos entregadores ativos em Divinópolis
          </p>
        </AnimatedSection>

        <AnimatedSection stagger className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {metricas.map((m, i) => (
              <motion.div
                key={m.label}
                className="bg-white rounded-3xl p-8 text-center border border-surface-alt shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(15,15,13,0.08)' }}
              >
                <p className="font-jakarta font-bold text-4xl lg:text-5xl text-accent mb-3 leading-none">
                  {m.valor}
                </p>
                <p className="text-ink-3 text-sm">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="text-center">
          <motion.a
            href={CADASTRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-semibold text-base hover:text-accent/80 transition-colors"
            whileHover={{ x: 4 }}
          >
            Quero começar agora
            <ArrowRight size={18} />
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  )
}
