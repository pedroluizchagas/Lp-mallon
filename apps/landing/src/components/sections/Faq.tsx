'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const faqs = [
  {
    question: 'Quanto custa cadastrar minha loja?',
    answer:
      'Você escolhe entre os planos Básico (R$97/mês), Profissional (R$147/mês) ou Premium (R$247/mês). Todos incluem 14 dias de trial grátis, sem necessidade de cartão de crédito.',
  },
  {
    question: 'Como funciona a comissão de R$1,00?',
    answer:
      'Para cada pedido entregue com pagamento online (cartão ou PIX), a plataforma retém R$1,00 de comissão. Pedidos pagos na entrega (dinheiro ou maquininha) não têm comissão no MVP.',
  },
  {
    question: 'Quando recebo o dinheiro das vendas?',
    answer:
      'O repasse é automático em D+7 (7 dias após a entrega confirmada). Se precisar antes, você pode solicitar antecipação para D+2 por apenas R$0,75 por pedido.',
  },
  {
    question: 'A Mallevo tem entregadores disponíveis?',
    answer:
      'Sim! A plataforma tem um pool de entregadores autônomos cadastrados. Você também pode cadastrar seus próprios entregadores em qualquer plano.',
  },
  {
    question: 'Posso cancelar quando quiser?',
    answer:
      'Sim. Sem multa e sem burocracia. Você pode cancelar a qualquer momento diretamente pelo próprio dashboard da plataforma.',
  },
  {
    question: 'Como os clientes fazem pedidos?',
    answer:
      'Através do app Mallevo disponível para Android e iOS. O cliente descobre sua loja, adiciona produtos ao carrinho, escolhe a forma de entrega, faz o pagamento e o pedido chega até você.',
  },
  {
    question: 'Preciso de maquininha ou conta bancária específica?',
    answer:
      'Para receber os repasses, você vai conectar sua conta via Stripe Express — um processo simples e guiado pela plataforma. Aceitamos contas PJ e PF, sem necessidade de conta específica.',
  },
  {
    question: 'A Mallevo funciona para que tipos de estabelecimento?',
    answer:
      'Qualquer negócio que vende produtos com entrega: restaurantes, lanchonetes, marmitarias, mercadinhos, farmácias, pet shops, floriculturas, cosméticos, papelarias e muito mais.',
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
      className="border-b border-gray-100 last:border-0"
      initial={{ opacity: 0, y: 20 }}
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
          className={`font-sora font-semibold text-base transition-colors ${
            isOpen ? 'text-verde-profundo' : 'text-texto-escuro group-hover:text-verde-profundo'
          }`}
        >
          {question}
        </span>
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isOpen
              ? 'bg-verde-profundo text-white'
              : 'bg-gray-100 text-texto-claro group-hover:bg-verde-profundo/10 group-hover:text-verde-profundo'
          }`}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={16} />
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
            <p className="text-texto-medio text-base leading-relaxed pb-5 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16">
          {/* Left: Header */}
          <AnimatedSection className="lg:sticky lg:top-28 self-start">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-verde-medio font-sora font-bold text-sm tracking-widest uppercase">
                08
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <h2 className="font-sora text-4xl lg:text-5xl font-bold text-texto-escuro mb-6">
              Tem alguma{' '}
              <span className="text-verde-profundo">dúvida?</span>
            </h2>
            <p className="text-texto-medio text-base leading-relaxed mb-8">
              Reunimos as perguntas mais frequentes de lojistas interessados na
              Mallevo. Não encontrou sua resposta?
            </p>
            <a
              href="mailto:contato@mallevo.com.br"
              className="inline-flex items-center gap-2 text-verde-profundo font-semibold hover:text-verde-medio transition-colors"
            >
              Fale com a gente →
            </a>

            {/* Quick stats */}
            <div className="mt-10 p-6 bg-creme rounded-2xl border border-gray-100">
              <p className="text-texto-claro text-xs uppercase tracking-wider font-semibold mb-4">
                Em resumo
              </p>
              {[
                '✅ 14 dias grátis',
                '✅ R$1,00 por pedido',
                '✅ Repasse em D+7',
                '✅ Cancele quando quiser',
              ].map((item) => (
                <p
                  key={item}
                  className="text-texto-medio text-sm font-medium py-1.5"
                >
                  {item}
                </p>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: FAQ items */}
          <AnimatedSection direction="right">
            <div className="bg-creme rounded-3xl p-6 lg:p-8">
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
      </div>
    </section>
  )
}
