'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, CreditCard, Star, Clock, Shield, Bell } from 'lucide-react'
import { AnimatedSection, StaggerItem, HeadingReveal, LabelReveal } from '@mallevo/ui'

const features = [
  {
    Icon: MapPin,
    title: 'Rastreamento ao vivo',
    desc: 'Acompanhe seu pedido em tempo real no mapa até a sua porta.',
  },
  {
    Icon: CreditCard,
    title: 'Pagamento fácil',
    desc: 'Cartão de crédito, débito, PIX ou dinheiro. Você escolhe.',
  },
  {
    Icon: Star,
    title: 'Avalie e favorite',
    desc: 'Dê sua opinião e salve as lojas que você mais gosta.',
  },
  {
    Icon: Clock,
    title: 'Histórico completo',
    desc: 'Todos seus pedidos em um lugar. Repita com um toque.',
  },
  {
    Icon: Shield,
    title: 'Pagamento seguro',
    desc: 'Seus dados protegidos com criptografia de ponta a ponta.',
  },
  {
    Icon: Bell,
    title: 'Notificações em tempo real',
    desc: 'Saiba exatamente quando seu pedido saiu para entrega.',
  },
]

const stats = [
  { value: 100, suffix: '+', label: 'Lojas parceiras', accent: '#4CAF82' },
  { value: 4.8, suffix: '', label: 'Estrelas médias', accent: '#F5A623', decimal: true },
  { value: 30, suffix: 'min', label: 'Entrega média', accent: '#4CAF82' },
  { value: 0, prefix: 'R$', suffix: '', label: 'Instalação', accent: '#F5A623' },
]

function Counter({
  value,
  suffix = '',
  prefix = '',
  decimal = false,
  accent,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimal?: boolean
  accent: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const duration = 1600

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * value).toFixed(decimal ? 1 : 0)))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(value)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, decimal])

  return (
    <p
      ref={ref}
      className="font-jakarta font-bold text-4xl mb-2 leading-none"
      style={{ color: accent }}
    >
      {prefix}{decimal ? count.toFixed(1) : count}{suffix}
    </p>
  )
}

export default function ConsumerApp() {
  return (
    <section id="o-app" className="bg-[#0B0F0D] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-20">
          <AnimatedSection className="flex items-center gap-4 mb-8" direction="none">
            <span className="font-jakarta font-bold text-sm tracking-[0.2em] text-[#4CAF82]/40">03</span>
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
                O app
              </LabelReveal>
              <HeadingReveal
                lines={[
                  { text: 'Feito para quem' },
                  { text: 'ama praticidade.', accent: true },
                ]}
              />
            </div>
            <AnimatedSection direction="none" delay={0.3}>
              <p className="text-[#EDF7F2]/40 text-sm leading-relaxed max-w-sm">
                Uma experiência pensada para moradores de Divinópolis. Nada de taxa absurda, nada de complicação.
              </p>
            </AnimatedSection>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Features list */}
          <AnimatedSection stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => {
                const { Icon, title, desc } = f
                return (
                  <StaggerItem key={title}>
                    <motion.div
                      className="group flex gap-4 p-5 bg-[#111714] border border-white/[0.07] rounded-2xl hover:border-[#4CAF82]/20 transition-colors duration-200"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#4CAF82]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#4CAF82]/18 transition-colors duration-200">
                        <Icon size={18} className="text-[#4CAF82]" />
                      </div>
                      <div>
                        <p className="font-jakarta font-semibold text-[#EDF7F2] text-sm leading-tight mb-1">{title}</p>
                        <p className="text-[#EDF7F2]/40 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Stats grid + visual */}
          <AnimatedSection direction="right">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  className="bg-[#111714] border rounded-3xl p-7 text-center"
                  style={{ borderColor: `${s.accent}18` }}
                  whileHover={{ scale: 1.03, borderColor: `${s.accent}35` }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    prefix={s.prefix}
                    decimal={s.decimal}
                    accent={s.accent}
                  />
                  <p className="text-[#EDF7F2]/35 text-xs leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* App download teaser */}
            <motion.div
              className="relative bg-linear-to-br from-[#0F2318] to-[#111714] border border-[#4CAF82]/15 rounded-3xl p-7 overflow-hidden"
              whileHover={{ borderColor: 'rgba(76,175,130,0.3)' }}
              transition={{ duration: 0.2 }}
            >
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4CAF82]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#4CAF82] flex items-center justify-center shadow-lg shadow-[#4CAF82]/25">
                    <span className="font-jakarta font-bold text-white text-sm">M</span>
                  </div>
                  <span className="font-jakarta font-bold text-[#EDF7F2] text-lg">Mallevo</span>
                </div>
                <p className="text-[#EDF7F2] font-semibold text-sm mb-1">Em breve nas lojas</p>
                <p className="text-[#EDF7F2]/40 text-xs mb-5">
                  Cadastre seu e-mail e seja avisado no lançamento.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['👩', '👨', '🧑'].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-[#1A2620] border-2 border-[#0B0F0D] flex items-center justify-center text-sm">
                        {e}
                      </div>
                    ))}
                  </div>
                  <p className="text-[#EDF7F2]/40 text-xs">
                    <span className="text-[#4CAF82] font-semibold">+240</span> pessoas aguardando
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
