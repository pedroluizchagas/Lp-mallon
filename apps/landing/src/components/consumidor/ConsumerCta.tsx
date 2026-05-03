'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

function AppButton({ label, sub }: { label: string; sub: string }) {
  return (
    <motion.a
      href="#"
      className="flex items-center justify-center gap-3 bg-white/[0.06] border border-white/10 hover:border-[#4CAF82]/30 hover:bg-white/[0.09] text-[#EDF7F2] px-6 py-3.5 rounded-xl transition-all duration-300"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-left">
        <p className="text-[10px] text-[#EDF7F2]/40 leading-none">{sub}</p>
        <p className="text-sm font-semibold leading-tight mt-0.5">{label}</p>
      </div>
    </motion.a>
  )
}

export default function ConsumerCta() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="baixar-app" className="relative bg-[#0B0F0D] py-28 lg:py-36 overflow-hidden">
      {/* Multi-layer background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-[#0E1410] via-[#091509] to-[#0B0F0D]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4CAF82]/12 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[200px] bg-[#1A4D3A]/30 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[150px] bg-[#F5A623]/6 rounded-full blur-[70px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(76,175,130,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,130,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#4CAF82]/10 border border-[#4CAF82]/20 rounded-full px-4 py-2 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF82] animate-pulse" />
            <span className="text-[#4CAF82] text-xs font-semibold uppercase tracking-wider">Em breve · Divinópolis, MG</span>
          </div>

          {/* Headline — mask reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h2
              className="font-jakarta font-bold text-5xl sm:text-6xl lg:text-8xl text-[#EDF7F2] leading-[0.95] tracking-tight"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Peça agora.
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              className="font-jakarta font-bold text-5xl sm:text-6xl lg:text-8xl text-[#4CAF82] leading-[0.95] tracking-tight"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Sem complicação.
            </motion.h2>
          </div>

          <motion.p
            className="text-[#EDF7F2]/45 text-lg mb-14 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Cadastre seu e-mail e seja o primeiro a saber quando o app estiver disponível na sua cidade.
          </motion.p>

          {/* Email form */}
          <motion.div
            className="max-w-md mx-auto mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-[#111714] border border-white/10 focus:border-[#4CAF82]/50 rounded-xl px-5 py-3.5 text-[#EDF7F2] placeholder:text-[#EDF7F2]/25 text-sm focus:outline-none transition-colors"
                />
                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#4CAF82] text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-[#3d9e71] transition-colors whitespace-nowrap shadow-lg shadow-[#4CAF82]/20"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  Quero ser avisado
                  <ArrowRight size={16} />
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="flex items-center justify-center gap-3 bg-[#4CAF82]/10 border border-[#4CAF82]/25 rounded-xl py-4 px-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <CheckCircle size={18} className="text-[#4CAF82]" />
                <p className="text-[#EDF7F2] text-sm font-medium">
                  Perfeito! Você será o primeiro a saber. 🎉
                </p>
              </motion.div>
            )}
            <p className="text-[#EDF7F2]/25 text-xs mt-3">Sem spam. Apenas o aviso do lançamento.</p>
          </motion.div>

          {/* App store buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AppButton label="App Store" sub="Download na" />
            <AppButton label="Google Play" sub="Disponível no" />
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-6 max-w-xs mx-auto my-10 opacity-20">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-[#EDF7F2] text-xs">ou</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* Cross-link */}
          <p className="text-[#EDF7F2]/30 text-sm">
            Tem uma loja?{' '}
            <a
              href="/lojista"
              className="text-[#4CAF82] hover:text-[#4CAF82]/80 font-medium underline underline-offset-4 transition-colors"
            >
              Cadastre seu negócio
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
