'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

const FAQS = [
  {
    question: 'Que tipo de veículo preciso para me cadastrar?',
    answer:
      'Aceitamos moto, bicicleta, carro e até a pé para entregas próximas. Basta selecionar seu veículo durante o cadastro e preencher os dados (como placa, para moto e carro). Todos os veículos precisam estar em bom estado de uso.',
  },
  {
    question: 'Como funciona o pagamento e quando recebo?',
    answer:
      'Seus ganhos são acumulados ao longo da semana e transferidos via Pix toda sexta-feira para a conta bancária que você cadastrar no app. O processo usa a plataforma Stripe, que é segura e criptografada. Sem taxa de transferência.',
  },
  {
    question: 'Preciso cumprir um horário mínimo de trabalho?',
    answer:
      'Não. Você trabalha quando e quanto quiser. Basta abrir o app e ativar o modo "online" para começar a receber pedidos. Pode desligar a qualquer momento. Não há penalidade por ficar offline.',
  },
  {
    question: 'Qual é o valor médio por entrega?',
    answer:
      'O valor por entrega varia de acordo com a distância percorrida. Em Divinópolis, a média está entre R$8 e R$15 por entrega. Você vê o valor antes de aceitar cada pedido, então tem total controle sobre o que quer pegar.',
  },
  {
    question: 'Como funciona o processo de cadastro?',
    answer:
      'O cadastro é 100% pelo app em 4 etapas: (1) criação de conta com e-mail e senha, (2) dados pessoais (nome, CPF, WhatsApp), (3) tipo de veículo e placa, e (4) envio de foto e número da CNH. Após o envio, nossa equipe analisa em até 24 horas.',
  },
  {
    question: 'Quanto tempo leva para meu cadastro ser aprovado?',
    answer:
      'Nossa equipe analisa os documentos em até 24 horas úteis. Você acompanha o status em tempo real no app. Quando aprovado, recebe uma notificação e pode configurar o recebimento via Stripe antes de começar a entregar.',
  },
  {
    question: 'O cadastro é gratuito? Existe alguma mensalidade?',
    answer:
      'Sim, o cadastro é 100% gratuito. Não existe taxa de adesão, mensalidade nem custo fixo de nenhum tipo. Você só ganha — não paga nada para usar a plataforma.',
  },
]

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      className="border-b border-surface-alt last:border-0"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-jakarta font-semibold text-[15px] leading-snug transition-colors ${
            isOpen ? 'text-dark' : 'text-ink group-hover:text-dark'
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
            isOpen
              ? 'bg-dark text-lime'
              : 'bg-surface-alt text-ink-3 group-hover:bg-dark group-hover:text-white'
          }`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-ink-2 text-[14px] leading-relaxed pb-5 pr-10">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function EntregadorFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-surface py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-accent font-jakarta font-bold text-xs tracking-widest uppercase">
              05
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink">
            Perguntas frequentes
          </h2>
        </AnimatedSection>

        {/* Two-column: FAQ + contact sidebar */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* FAQ accordion */}
          <AnimatedSection direction="none">
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-surface-alt">
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  index={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Sidebar */}
          <AnimatedSection direction="right" className="lg:sticky lg:top-24">
            <div className="bg-dark rounded-3xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-lime/15 flex items-center justify-center mb-4">
                <MessageCircle size={18} className="text-lime" />
              </div>
              <h3 className="font-jakarta font-bold text-white text-[17px] mb-2">
                Ainda com dúvidas?
              </h3>
              <p className="text-white/45 text-[13px] leading-relaxed mb-5">
                Fale com nossa equipe de suporte. Estamos disponíveis de seg. a sáb., das 8h às 20h.
              </p>
              <a
                href="https://wa.me/5537999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 bg-white/[0.07] hover:bg-white/10 border border-white/10 rounded-2xl px-4 py-3.5 transition-colors group"
              >
                <span className="text-white text-[13px] font-semibold">Falar pelo WhatsApp</span>
                <ArrowRight size={15} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { value: '50+', label: 'Entregadores ativos' },
                { value: '24h', label: 'Aprovação média' },
                { value: '0', label: 'Custo de cadastro' },
                { value: 'Sexta', label: 'Dia de pagamento' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-4 border border-surface-alt text-center"
                >
                  <p className="font-jakarta font-bold text-dark text-xl leading-none mb-1">{value}</p>
                  <p className="text-ink-3 text-[11px]">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
