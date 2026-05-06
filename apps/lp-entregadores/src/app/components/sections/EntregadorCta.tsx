'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap, Users, Star } from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'
import Image from 'next/image'

const CADASTRO_URL =
  process.env.NEXT_PUBLIC_CADASTRO_URL ??
  'https://app.mallevo.com.br/entregador/cadastro'

const TRUST = [
  'Cadastro 100% gratuito',
  'Sem mensalidade',
  'Receba toda sexta via Pix',
  'Qualquer veículo aceito',
]

const STATS = [
  { Icon: Users, value: '50+', label: 'Entregadores ativos' },
  { Icon: Zap, value: 'R$432', label: 'Ganho médio semanal' },
  { Icon: Star, value: '4.8', label: 'Avaliação média' },
]

export default function EntregadorCta() {
  return (
    <section className="relative bg-dark py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(193,241,72,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/25 rounded-full px-4 py-1.5 mb-10">
            <div
              className="w-2 h-2 rounded-full bg-lime animate-pulse"
              style={{ boxShadow: '0 0 6px #c1f148' }}
            />
            <span className="text-lime text-[13px] font-semibold">
              Mais de 50 entregadores ativos em Divinópolis
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-jakarta text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.04] mb-6">
            Comece a ganhar
            <br />
            <span className="text-gradient-lime">dinheiro hoje</span>
          </h2>

          <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Cadastre-se agora, aguarde a aprovação e comece a receber pedidos
            ainda essa semana. É de graça, sem burocracia.
          </p>

          {/* CTA button */}
          <motion.a
            href={CADASTRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-lime text-lime-ink font-bold px-10 py-5 rounded-2xl text-lg hover:bg-lime-dark transition-colors"
            style={{ boxShadow: '0 12px 40px rgba(193,241,72,0.3)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero ser entregador
            <ArrowRight size={22} />
          </motion.a>

          {/* Trust items */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            {TRUST.map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-lime/70" />
                <span className="text-white/40 text-[13px]">{t}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-16 border-t border-white/[0.07] pt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center mb-1">
                  <Icon size={16} className="text-lime/70" />
                </div>
                <p className="font-jakarta font-bold text-white text-2xl leading-none">{value}</p>
                <p className="text-white/30 text-[12px] text-center leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* App icon + brand */}
          <div className="mt-14 flex items-center justify-center gap-3 opacity-40">
            <Image
              src="/images/icons/iconMallevo.png"
              alt="Mallevo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-jakarta font-bold text-white text-lg tracking-tight">
              Mall<span className="text-lime">evo</span> Entregadores
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
