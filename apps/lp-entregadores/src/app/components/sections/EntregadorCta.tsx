'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, Badge } from '@mallevo/ui'

const CADASTRO_URL =
  process.env.NEXT_PUBLIC_CADASTRO_URL ?? 'https://app.mallevo.com.br/entregador/cadastro'

export default function EntregadorCta() {
  return (
    <section className="bg-dark py-20 lg:py-28 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="mb-8">
            <Badge variant="lime">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse inline-block" />
              Mais de 50 entregadores ativos em Divinópolis
            </Badge>
          </div>

          <h2 className="font-jakarta text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Pronto para começar?
          </h2>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Cadastre-se agora e comece a receber pedidos ainda essa semana.
          </p>

          <motion.a
            href={CADASTRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-lime text-lime-ink font-bold px-10 py-5 rounded-2xl text-lg hover:bg-lime-dark transition-colors shadow-2xl shadow-lime/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero ser entregador
            <ArrowRight size={20} />
          </motion.a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-lime">✓</span>
              Cadastro 100% gratuito
            </span>
            <span className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center gap-2">
              <span className="text-lime">✓</span>
              Sem mensalidade
            </span>
            <span className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center gap-2">
              <span className="text-lime">✓</span>
              Receba na sexta-feira
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
