'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Settings,
  Wallet,
  Star,
  Package,
  CheckCircle2,
  MapPin,
  Bell,
} from 'lucide-react'

const CTA_URL =
  process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/cadastro`
    : 'https://app.mallevo.com.br/cadastro'

const TRUST = [
  '14 dias grátis',
  'Sem cartão de crédito',
  'Cancele quando quiser',
]

/* ─────────────────────────── Browser Dashboard Mockup ────────────────── */
function DashboardBrowser() {
  const KPIS = [
    { label: 'Receita hoje', value: 'R$1.247', sub: '+12%', subColor: 'text-accent' },
    { label: 'Pedidos', value: '18', sub: '+3 agora', subColor: 'text-accent' },
    { label: 'Ticket médio', value: 'R$69,30', sub: 'vs R$61', subColor: 'text-ink-3' },
    { label: 'Avaliação', value: '4.8', sub: '★ de 5.0', subColor: 'text-lime' },
  ]

  const ORDERS = [
    { name: 'João Silva', items: 3, value: 'R$47,80', status: 'Novo', dot: 'bg-blue-400' },
    { name: 'Maria Souza', items: 2, value: 'R$23,50', status: 'Em preparo', dot: 'bg-yellow-400' },
    { name: 'Carlos Mendes', items: 5, value: 'R$89,90', status: 'A caminho', dot: 'bg-lime' },
  ]

  const NAV = [
    { Icon: LayoutDashboard, label: 'Dashboard', active: true },
    { Icon: ShoppingBag, label: 'Pedidos', active: false },
    { Icon: Package, label: 'Produtos', active: false },
    { Icon: BarChart3, label: 'Financeiro', active: false },
    { Icon: Settings, label: 'Config.', active: false },
  ]

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(24,24,27,0.25)] border border-surface-alt">
      {/* Browser chrome */}
      <div className="bg-surface-alt border-b border-surface-alt px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-lime/70" />
        </div>
        <div className="flex-1 bg-white/70 rounded-lg px-3 py-1.5 flex items-center gap-2 max-w-xs mx-auto">
          <div className="w-3 h-3 rounded-full bg-accent/60 flex-shrink-0" />
          <span className="text-ink-3 text-[11px] font-medium truncate">
            app.mallevo.com.br/dashboard
          </span>
        </div>
        <Bell size={14} className="text-ink-3 ml-auto" />
      </div>

      {/* App shell */}
      <div className="flex bg-surface min-h-[340px]">
        {/* Sidebar */}
        <div className="w-[140px] bg-dark flex flex-col py-4 px-3 gap-1 shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-lime flex items-center justify-center flex-shrink-0">
              <ShoppingBag size={13} className="text-lime-ink" />
            </div>
            <span className="font-jakarta font-bold text-white text-[13px]">
              Mall<span className="text-lime">evo</span>
            </span>
          </div>

          {NAV.map(({ Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-colors ${
                active ? 'bg-lime/15' : 'hover:bg-white/5'
              }`}
            >
              <Icon size={14} className={active ? 'text-lime' : 'text-white/30'} strokeWidth={active ? 2.5 : 1.5} />
              <span className={`text-[11px] font-medium ${active ? 'text-white' : 'text-white/30'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-ink-3 text-[11px]">Bem-vindo de volta,</p>
              <p className="text-ink font-jakarta font-bold text-[13px]">Pizzaria da Vila</p>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-alt rounded-full px-3 py-1 border border-surface-alt">
              <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              <span className="text-[10px] font-semibold text-accent">Online</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {KPIS.map((k) => (
              <div key={k.label} className="bg-white rounded-xl p-3 border border-surface-alt">
                <p className="text-ink-3 text-[9px] font-medium mb-1 uppercase tracking-wider">{k.label}</p>
                <p className="font-jakarta font-bold text-[15px] text-ink leading-none mb-0.5">{k.value}</p>
                <p className={`text-[9px] font-semibold ${k.subColor}`}>{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Orders queue */}
          <div className="bg-white rounded-xl border border-surface-alt overflow-hidden">
            <div className="px-3 py-2 border-b border-surface flex items-center justify-between">
              <span className="text-ink-3 text-[9px] font-bold uppercase tracking-wider">Fila de pedidos</span>
              <span className="text-lime text-[9px] font-bold">3 ativos</span>
            </div>
            {ORDERS.map((o, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 border-b border-surface last:border-0 hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${o.dot} flex-shrink-0`} />
                  <div>
                    <p className="text-ink text-[11px] font-semibold">{o.name}</p>
                    <p className="text-ink-3 text-[9px]">{o.items} itens · {o.status}</p>
                  </div>
                </div>
                <span className="font-jakarta font-bold text-[11px] text-ink">{o.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── Section ──────────────────────────────── */
const METRICS = [
  { Icon: TrendingUp, label: 'D+7 automático', value: 'Repasse' },
  { Icon: Wallet, label: 'Comissão fixa', value: 'R$1,00' },
  { Icon: Star, label: 'Avaliação média', value: '4.8★' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-lime/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── Left: Copy ─── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-lime/10 border border-lime/25 rounded-full px-4 py-1.5 mb-8"
            >
              <MapPin size={13} className="text-lime" />
              <span className="text-lime text-[13px] font-semibold">
                Divinópolis, MG — Já disponível
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-jakarta text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.04] tracking-tight text-ink mb-6"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              Venda mais.
              <br />
              Pague menos.
              <br />
              <span className="text-gradient-lime">Cresça de verdade.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-ink-2 text-[17px] leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              A Mallevo é o shopping digital de Divinópolis. Coloque sua loja
              online com{' '}
              <strong className="text-ink font-semibold">
                comissão fixa de R$1,00 por pedido
              </strong>{' '}
              — enquanto o iFood cobra 12 a 30% das suas vendas.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-lime text-lime-ink font-bold px-8 py-4 rounded-2xl text-base hover:bg-lime-dark transition-colors"
                style={{ boxShadow: '0 8px 32px rgba(193,241,72,0.3)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Cadastrar minha loja grátis
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>

            {/* Trust */}
            <motion.div
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {TRUST.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-accent flex-shrink-0" />
                  <span className="text-ink-3 text-[13px]">{t}</span>
                </div>
              ))}
            </motion.div>

            {/* Metrics */}
            <motion.div
              className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-surface-alt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              {METRICS.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 bg-white border border-surface-alt rounded-2xl px-4 py-2.5 shadow-sm"
                >
                  <div className="w-7 h-7 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-ink-3 text-[9px] uppercase tracking-wider leading-none mb-0.5">{label}</p>
                    <p className="text-ink font-bold text-[13px] leading-none">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Browser dashboard mockup ─── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <DashboardBrowser />

            {/* Floating: new order notification */}
            <motion.div
              className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 border border-surface-alt hidden sm:flex"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-lime/15 flex items-center justify-center flex-shrink-0">
                  <Bell size={15} className="text-lime" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-ink">Novo pedido!</p>
                  <p className="text-[13px] font-bold text-accent">R$58,90</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating: commission badge */}
            <motion.div
              className="absolute -top-5 -right-4 bg-dark rounded-2xl shadow-xl p-3.5 text-center hidden sm:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <p className="text-[9px] font-semibold text-white/40 leading-none mb-1 uppercase tracking-wider">
                  comissão
                </p>
                <p className="font-jakarta font-bold text-lime text-xl leading-none">
                  R$1,00
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
