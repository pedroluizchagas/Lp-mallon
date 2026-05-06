'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

const CTA_URL =
  process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/cadastro`
    : 'https://app.mallevo.com.br/cadastro'

export default function CtaFinal() {
  return (
    <section className="bg-dark py-20 lg:py-28 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.03]" />
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/[0.04]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-lime/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section number */}
        <AnimatedSection>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10 max-w-16" />
            <span className="text-lime font-jakarta font-bold text-sm tracking-widest uppercase">
              09
            </span>
            <div className="flex-1 h-px bg-white/10 max-w-16" />
          </div>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-jakarta text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Pronto para colocar sua
            <br />
            <span className="text-lime">loja no digital?</span>
          </h2>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={0.2}>
          <p className="text-white/60 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Junte-se aos lojistas de Divinópolis que já vendem pela Mallevo.
            Comece grátis por 14 dias — sem cartão de crédito.
          </p>
        </AnimatedSection>

        {/* CTA button */}
        <AnimatedSection delay={0.3}>
          <motion.a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-lime text-lime-ink font-bold px-10 py-5 rounded-2xl text-lg lg:text-xl hover:bg-lime-dark transition-colors shadow-2xl shadow-lime/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Cadastrar minha loja agora
            <ArrowRight size={22} />
          </motion.a>
        </AnimatedSection>

        {/* Trust indicators */}
        <AnimatedSection delay={0.4} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-lime shrink-0" />
              14 dias grátis
            </span>
            <span className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-lime shrink-0" />
              Sem cartão de crédito
            </span>
            <span className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-lime shrink-0" />
              Cancele quando quiser
            </span>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <AnimatedSection delay={0.5}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { value: 'R$1,00', label: 'comissão por pedido' },
                { value: 'D+7',    label: 'para receber' },
                { value: '24/7',   label: 'plataforma disponível' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-jakarta font-bold text-3xl text-lime mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
