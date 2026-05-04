'use client'

import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const steps = [
  {
    num: '1',
    title: 'Cadastre-se grátis',
    desc: 'Preencha o formulário em minutos, sem burocracia',
  },
  {
    num: '2',
    title: 'Aceite pedidos',
    desc: 'Receba notificações no app e escolha quando trabalhar',
  },
  {
    num: '3',
    title: 'Entregue e receba',
    desc: 'O valor cai na sua conta toda sexta-feira',
  },
]

export default function EntregadorComoFunciona() {
  return (
    <section id="como-funciona" className="bg-dark text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-lime font-jakarta font-bold text-sm tracking-widest uppercase">
              02
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-white">
            Como começar em{' '}
            <span className="text-lime">3 passos</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection stagger>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="relative">
                  <span className="block font-jakarta font-bold text-8xl leading-none text-lime/10 mb-4 select-none">
                    {step.num}
                  </span>
                  <h3 className="font-jakarta font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-base leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
