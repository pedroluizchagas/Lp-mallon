'use client'

import { motion } from 'framer-motion'
import { Download, Search, MapPin } from 'lucide-react'
import AnimatedSection, { StaggerItem, HeadingReveal, LabelReveal } from '@/components/ui/AnimatedSection'

const steps = [
  {
    num: '01',
    Icon: Download,
    title: 'Baixe o app',
    desc: 'Disponível na App Store e Google Play. Crie sua conta em menos de 1 minuto, sem burocracia.',
    accentColor: '#4CAF82',
    borderHover: 'hover:border-[#4CAF82]/30',
  },
  {
    num: '02',
    Icon: Search,
    title: 'Escolha o que quiser',
    desc: 'Explore restaurantes, mercados, farmácias e muito mais de lojas reais de Divinópolis.',
    accentColor: '#F5A623',
    borderHover: 'hover:border-[#F5A623]/30',
  },
  {
    num: '03',
    Icon: MapPin,
    title: 'Peça e acompanhe',
    desc: 'Pague com cartão ou PIX e rastreie seu pedido ao vivo no mapa enquanto aguarda.',
    accentColor: '#4CAF82',
    borderHover: 'hover:border-[#4CAF82]/30',
  },
]

export default function ConsumerComoFunciona() {
  return (
    <section id="como-funciona" className="bg-[#0B0F0D] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-20">
          {/* Section number + rule */}
          <AnimatedSection className="flex items-center gap-4 mb-8" direction="none">
            <span className="font-jakarta font-bold text-sm tracking-[0.2em] text-[#4CAF82]/40">01</span>
            <motion.div
              className="flex-1 h-px bg-linear-to-r from-white/8 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <LabelReveal delay={0.05} className="mb-5">
                Como funciona
              </LabelReveal>
              <HeadingReveal
                lines={[{ text: 'Simples assim.' }]}
              />
            </div>
            <AnimatedSection direction="none" delay={0.3}>
              <p className="text-[#EDF7F2]/40 text-sm leading-relaxed max-w-sm">
                Em 3 passos você já está pedindo dos melhores estabelecimentos de Divinópolis.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Steps grid */}
        <AnimatedSection stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step) => {
              const { num, Icon, title, desc, accentColor, borderHover } = step
              return (
                <StaggerItem key={num}>
                  <motion.div
                    className={`group relative bg-[#111714] border border-white/[0.07] rounded-3xl p-8 h-full overflow-hidden ${borderHover} transition-colors duration-300`}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Number watermark */}
                    <span
                      className="absolute top-5 right-7 font-jakarta font-bold text-[88px] leading-none select-none pointer-events-none"
                      style={{ color: `${accentColor}05` }}
                    >
                      {num}
                    </span>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${accentColor}10, transparent 60%)`,
                      }}
                    />

                    <div className="relative">
                      {/* Step label */}
                      <div className="flex items-center gap-3 mb-7">
                        <span
                          className="font-jakarta font-bold text-xs tracking-[0.2em]"
                          style={{ color: `${accentColor}50` }}
                        >
                          {num}
                        </span>
                        <div className="flex-1 h-px bg-white/6" />
                      </div>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-7 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${accentColor}12` }}
                      >
                        <Icon size={22} style={{ color: accentColor }} />
                      </div>

                      {/* Text */}
                      <h3 className="font-jakarta font-bold text-xl text-[#EDF7F2] mb-3 leading-snug">
                        {title}
                      </h3>
                      <p className="text-[#EDF7F2]/45 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Connecting visual — desktop only */}
        <AnimatedSection delay={0.4} className="hidden md:flex items-center justify-center mt-12 gap-4 opacity-30">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-4 flex-1">
              <div className="flex-1 h-px bg-linear-to-r from-white/20 to-white/5" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF82]/60" />
              <div className="flex-1 h-px bg-linear-to-r from-white/5 to-white/20" />
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
