'use client'

import { motion } from 'framer-motion'
import {
  UserPlus,
  ClipboardCheck,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  FileText,
  Camera,
  Bike,
} from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

const CADASTRO_URL =
  process.env.NEXT_PUBLIC_CADASTRO_URL ??
  'https://app.mallevo.com.br/entregador/cadastro'

const STEPS = [
  {
    num: '01',
    Icon: UserPlus,
    title: 'Crie sua conta',
    desc: 'Preencha seus dados pessoais, escolha o tipo de veículo e envie seus documentos. O processo é 100% pelo app, sem precisar ir a lugar nenhum.',
    tags: ['Dados pessoais', 'Tipo de veículo', 'CPF e CNH'],
    TagIcon: FileText,
  },
  {
    num: '02',
    Icon: ClipboardCheck,
    title: 'Aguarde a aprovação',
    desc: 'Nossa equipe verifica os seus documentos em até 24 horas. Você acompanha o status em tempo real no app. Quando aprovado, recebe uma notificação.',
    tags: ['Revisão em 24h', 'Status no app', 'Notificação automática'],
    TagIcon: Camera,
  },
  {
    num: '03',
    Icon: CreditCard,
    title: 'Configure os recebimentos',
    desc: 'Conecte sua conta bancária via Stripe para receber seus pagamentos toda sexta-feira via Pix. Processo simples e totalmente seguro.',
    tags: ['Conta bancária', 'Pix toda sexta', 'Criptografado'],
    TagIcon: CreditCard,
  },
  {
    num: '04',
    Icon: Truck,
    title: 'Comece a entregar!',
    desc: 'Ative o modo online no app, receba pedidos na sua área e navegue com o mapa integrado até o destino. Simples assim.',
    tags: ['Online no app', 'Pedidos na área', 'Mapa integrado'],
    TagIcon: Bike,
  },
]

function RegistrationPhoneMockup() {
  return (
    <div className="relative w-[240px] h-[480px] bg-[#111114] rounded-[34px] border-2 border-white/15 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden flex-shrink-0 mx-auto">
      {/* Notch */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />

      {/* Content */}
      <div className="pt-10 px-5 pb-4 h-full flex flex-col">
        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/40 text-[10px] font-medium">Etapa 2 de 4</span>
            <span className="text-lime text-[10px] font-bold">50%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-lime rounded-full" style={{ width: '50%' }} />
          </div>
        </div>

        <p className="text-white font-bold text-[14px] font-jakarta mb-1">Seus dados</p>
        <p className="text-white/40 text-[10px] mb-4">Preencha suas informações pessoais</p>

        {/* Form fields */}
        {[
          { label: 'Nome completo', value: 'João da Silva' },
          { label: 'CPF', value: '123.456.789-00' },
          { label: 'WhatsApp', value: '(37) 99999-9999' },
        ].map(({ label, value }) => (
          <div key={label} className="mb-3">
            <p className="text-white/30 text-[9px] uppercase tracking-wider mb-1">{label}</p>
            <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2">
              <p className="text-white text-[12px]">{value}</p>
            </div>
          </div>
        ))}

        {/* Next button */}
        <div className="mt-auto">
          <div className="bg-lime rounded-xl px-4 py-3 flex items-center justify-center gap-2">
            <span className="text-dark font-bold text-[12px]">Continuar</span>
            <ArrowRight size={13} className="text-dark" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EntregadorComoFunciona() {
  return (
    <section id="como-funciona" className="bg-dark text-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-lime font-jakarta font-bold text-xs tracking-widest uppercase">
              02
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-white">
              Como começar em{' '}
              <span className="text-lime">4 passos</span>
            </h2>
            <p className="text-white/40 text-base max-w-xs lg:text-right">
              Do cadastro à primeira entrega em menos de 48 horas.
            </p>
          </div>
        </AnimatedSection>

        {/* Two-column: steps + phone */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map((step, i) => {
              const { Icon } = step
              return (
                <AnimatedSection key={step.num} delay={i * 0.1}>
                  <div className="bg-white/[0.04] border border-white/[0.07] rounded-3xl p-6 h-full hover:border-white/15 transition-colors">
                    {/* Number + icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-jakarta font-bold text-4xl text-lime/15 leading-none select-none">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-lime/10 flex items-center justify-center">
                        <Icon size={18} className="text-lime" />
                      </div>
                    </div>

                    <h3 className="font-jakarta font-bold text-[17px] text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/45 text-[13px] leading-relaxed mb-5">
                      {step.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1.5 bg-white/[0.05] rounded-full px-2.5 py-1 border border-white/[0.07]"
                        >
                          <CheckCircle2 size={10} className="text-lime/60" />
                          <span className="text-white/40 text-[10px]">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          {/* Phone mockup */}
          <AnimatedSection className="lg:sticky lg:top-24" direction="right">
            <div className="flex flex-col items-center gap-6">
              <RegistrationPhoneMockup />
              <motion.a
                href={CADASTRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lime text-lime-ink font-bold px-6 py-3.5 rounded-2xl text-sm hover:bg-lime-dark transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Começar cadastro grátis
                <ArrowRight size={16} />
              </motion.a>
              <p className="text-white/25 text-[12px] text-center">
                Leva menos de 5 minutos
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
