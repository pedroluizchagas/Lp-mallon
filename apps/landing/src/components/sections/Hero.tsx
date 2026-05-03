'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, ShoppingBag, TrendingUp, Clock, Star } from 'lucide-react'
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

const orders = [
  { name: 'Pizza Calabresa', value: 'R$52,00', status: 'Em preparo',  dot: 'bg-yellow-400' },
  { name: 'Pizza Frango',    value: 'R$48,00', status: 'A caminho',   dot: 'bg-blue-400' },
  { name: 'Combo 2 pizzas',  value: 'R$89,90', status: 'Entregue',    dot: 'bg-lime' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface dot-pattern">
      {/* Decorative background blob */}
      <div className="absolute top-1/3 right-0 w-150 h-150 bg-lime/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-dark/4 rounded-full blur-3xl pointer-events-none" />

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
              <Badge variant="lime">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse-slow inline-block" />
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
              <h1 className="font-jakarta text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-ink mb-6">
                <motion.span variants={wordVariant} className="block">
                  Venda mais.
                </motion.span>
                <motion.span variants={wordVariant} className="block">
                  Pague menos.
                </motion.span>
                <motion.span variants={wordVariant} className="block text-gradient-lime" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', background: 'linear-gradient(135deg, #c1f148, #a3d22a)' }}>
                  Cresça de verdade.
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-ink-2 text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              A Mallevo é o shopping digital de Divinópolis. Coloque sua loja
              online com{' '}
              <strong className="text-ink font-semibold">
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
                className="inline-flex items-center gap-2 bg-lime text-lime-ink font-bold px-8 py-4 rounded-xl text-lg hover:bg-lime-dark transition-colors shadow-lg shadow-lime/25"
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
                className="flex items-center gap-2 text-ink-2 font-semibold hover:text-ink transition-colors cursor-pointer"
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
                  className="flex items-center gap-2 text-sm text-ink-3"
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard mockup — espelha o app real */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main mockup card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-dark/20 border border-surface-alt">
              {/* App shell: sidebar + content */}
              <div className="flex min-h-115 lg:min-h-125">

                {/* Sidebar — dark, como no app */}
                <div className="w-14 bg-dark flex flex-col items-center py-5 gap-5 shrink-0">
                  {/* Logo mark */}
                  <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center mb-2">
                    <ShoppingBag size={15} className="text-lime-ink" />
                  </div>
                  {/* Nav icons */}
                  {[TrendingUp, ShoppingBag, Star, Clock].map((Icon, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-lime/20' : 'bg-white/5'}`}
                    >
                      <Icon size={14} className={i === 0 ? 'text-lime' : 'text-white/30'} />
                    </div>
                  ))}
                </div>

                {/* Content area — claro */}
                <div className="flex-1 bg-white p-5">
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-ink-3 text-[11px] font-medium">Bem-vindo de volta,</p>
                      <p className="text-ink font-jakarta font-bold text-sm">Pizzaria da Vila</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                      <span className="text-[11px] text-ink-3 font-medium">Online</span>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5">
                    {[
                      { label: 'Pedidos hoje', value: '28',     color: 'text-ink' },
                      { label: 'Receita',       value: 'R$847', color: 'text-ink' },
                      { label: 'A receber',     value: 'R$1.2k', color: 'text-accent' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-surface rounded-xl p-3 border border-surface-alt"
                      >
                        <p className="text-ink-3 text-[10px] mb-1 font-medium">{stat.label}</p>
                        <p className={`font-jakarta font-bold text-base leading-none ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Recent orders */}
                  <div className="bg-surface rounded-xl p-4 border border-surface-alt">
                    <p className="text-ink-3 text-[10px] mb-3 font-semibold uppercase tracking-wider">
                      Pedidos Recentes
                    </p>
                    {orders.map((order, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2.5 border-b border-surface-alt last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${order.dot}`} />
                          <div>
                            <p className="text-ink text-xs font-medium leading-none mb-0.5">{order.name}</p>
                            <p className="text-ink-3 text-[10px]">{order.status}</p>
                          </div>
                        </div>
                        <span className="text-ink font-bold text-xs">{order.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <motion.div
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-surface-alt"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ animation: 'float 3s ease-in-out infinite' }}
            >
              <div className="w-10 h-10 rounded-full bg-lime/15 flex items-center justify-center text-xl shrink-0">
                🔔
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">Novo pedido!</p>
                <p className="text-sm font-bold text-accent">R$58,90</p>
              </div>
            </motion.div>

            {/* Floating commission badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-lime rounded-2xl shadow-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            >
              <p className="text-[10px] font-semibold text-lime-ink/70 leading-none mb-0.5">
                comissão
              </p>
              <p className="font-jakarta font-bold text-lime-ink text-lg leading-none">
                R$1,00
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-surface to-transparent pointer-events-none" />
    </section>
  )
}
