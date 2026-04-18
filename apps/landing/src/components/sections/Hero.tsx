'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Bell } from 'lucide-react'
import Badge from '@/components/ui/Badge'

const CTA_URL =
  process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/cadastro`
    : 'https://app.mallevo.com.br/cadastro'

const metrics = [
  { icon: '⭐', label: 'Sem comissão percentual' },
  { icon: '⚡', label: 'Repasse em 7 dias' },
  { icon: '📱', label: 'App para seus clientes' },
  { icon: '🛵', label: 'Entregadores disponíveis' },
]

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const wordVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-creme dot-pattern">
      {/* Large decorative number */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-sora font-bold text-verde-profundo/[0.03] select-none pointer-events-none leading-none">
        01
      </span>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="green">
                <span className="w-2 h-2 rounded-full bg-verde-medio animate-pulse-slow inline-block" />
                Divinópolis, MG — Já disponível
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div
              className="overflow-hidden"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="font-sora text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-texto-escuro mb-6">
                <motion.span
                  variants={wordVariant}
                  className="block"
                >
                  Venda mais.
                </motion.span>
                <motion.span
                  variants={wordVariant}
                  className="block"
                >
                  Pague menos.
                </motion.span>
                <motion.span
                  variants={wordVariant}
                  className="block text-verde-profundo"
                >
                  Cresça de verdade.
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-texto-medio text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              A Mallevo é o shopping digital de Divinópolis. Coloque sua loja
              online com{' '}
              <strong className="text-verde-profundo font-semibold">
                comissão fixa de R$1,00 por pedido
              </strong>{' '}
              — sem percentual sobre suas vendas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ambar text-[#1A1A1A] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#e8961a] transition-colors shadow-lg shadow-ambar/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cadastrar minha loja grátis
                <ArrowRight size={20} />
              </motion.a>

              <button
                onClick={() => {
                  document
                    .querySelector('#como-funciona')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex items-center gap-2 text-verde-profundo font-semibold hover:text-verde-medio transition-colors cursor-pointer"
              >
                Ver como funciona
                <ChevronDown size={18} className="animate-bounce" />
              </button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-2 text-sm text-texto-medio"
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main mockup card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-verde-profundo/20">
              {/* Dashboard UI mockup */}
              <div className="bg-gradient-to-br from-verde-profundo to-verde-medio p-6 min-h-[420px] lg:min-h-[480px]">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/60 text-xs">Bem-vindo,</p>
                    <p className="text-white font-sora font-semibold">Pizzaria da Vila</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Bell size={16} className="text-white" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Pedidos hoje', value: '28' },
                    { label: 'Receita', value: 'R$847' },
                    { label: 'A receber', value: 'R$1.290' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/10 backdrop-blur rounded-2xl p-3"
                    >
                      <p className="text-white/60 text-[10px] mb-1">{stat.label}</p>
                      <p className="text-white font-sora font-bold text-lg leading-none">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                  <p className="text-white/60 text-xs mb-3 font-semibold uppercase tracking-wider">
                    Pedidos Recentes
                  </p>
                  {[
                    { name: 'Pizza Calabresa', value: 'R$52,00', status: 'Em preparo' },
                    { name: 'Pizza Frango', value: 'R$48,00', status: 'A caminho' },
                    { name: 'Combo 2 pizzas', value: 'R$89,90', status: 'Entregue' },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                    >
                      <div>
                        <p className="text-white text-xs font-medium">{order.name}</p>
                        <p className="text-white/50 text-[10px]">{order.status}</p>
                      </div>
                      <span className="text-ambar font-semibold text-xs">
                        {order.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <motion.div
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ animation: 'float 3s ease-in-out infinite' }}
            >
              <div className="w-10 h-10 rounded-full bg-verde-medio/10 flex items-center justify-center text-xl shrink-0">
                🔔
              </div>
              <div>
                <p className="text-xs font-semibold text-texto-escuro">Novo pedido!</p>
                <p className="text-sm font-bold text-verde-profundo">R$58,90</p>
              </div>
            </motion.div>

            {/* Floating commission badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-ambar rounded-2xl shadow-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            >
              <p className="text-[10px] font-semibold text-[#1A1A1A]/70 leading-none mb-0.5">
                comissão
              </p>
              <p className="font-sora font-bold text-[#1A1A1A] text-lg leading-none">
                R$1,00
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-creme to-transparent pointer-events-none" />
    </section>
  )
}
