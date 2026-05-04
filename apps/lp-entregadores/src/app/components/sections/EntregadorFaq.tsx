'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

const faqs = [
  {
    question: 'Preciso de moto para ser entregador?',
    answer: 'Aceitamos motos e bicicletas devidamente documentadas.',
  },
  {
    question: 'Como recebo meu pagamento?',
    answer:
      'Todo valor é pago via Pix toda sexta-feira para a chave cadastrada.',
  },
  {
    question: 'Tenho que cumprir horário mínimo?',
    answer:
      'Não. Você acessa o app, ativa sua disponibilidade e trabalha quando quiser.',
  },
  {
    question: 'Qual o valor por entrega?',
    answer:
      'O valor varia por distância. A média em Divinópolis é R$8–15 por entrega.',
  },
  {
    question: 'O cadastro é gratuito?',
    answer: 'Sim, 100% gratuito. Sem taxa de adesão ou mensalidade.',
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-jakarta font-semibold text-base transition-colors ${
            isOpen ? 'text-dark' : 'text-ink group-hover:text-dark'
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`shrink-0 transition-colors ${
            isOpen ? 'text-accent' : 'text-ink-3 group-hover:text-dark'
          }`}
        >
          <ChevronDown size={20} />
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
            <p className="text-ink-2 text-base leading-relaxed pb-5 pr-10">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function EntregadorFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-surface py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-jakarta font-bold text-sm tracking-widest uppercase">
              04
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink">
            Perguntas frequentes
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="none">
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-surface-alt">
            {faqs.map((faq, i) => (
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
      </div>
    </section>
  )
}
