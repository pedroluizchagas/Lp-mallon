'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Navigation2,
  DollarSign,
  User,
  Signal,
  Battery,
  Wifi,
  Package,
  MapPin,
  ChevronRight,
  Wallet,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowUp,
  BarChart3,
} from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

/* ─────────────────────────── Phone: Dashboard ─────────────────────────── */
function PhoneDashboard() {
  return (
    <div className="w-full h-full bg-[#111114] overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <Signal size={10} className="text-white/60" />
          <Wifi size={10} className="text-white/60" />
          <Battery size={12} className="text-white/60" />
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-3 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/35 text-[10px]">Olá,</p>
            <p className="text-white font-bold text-[13px] font-jakarta">João Entregador</p>
          </div>
          <div
            className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-dark text-[11px] font-bold"
            style={{ boxShadow: '0 0 10px rgba(193,241,72,0.4)' }}
          >
            J
          </div>
        </div>

        {/* Online toggle */}
        <div className="bg-white/[0.05] rounded-xl px-3 py-2 flex items-center justify-between border border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-lime" style={{ boxShadow: '0 0 5px #c1f148' }} />
            <span className="text-white text-[11px] font-semibold">Online</span>
          </div>
          <div className="w-8 h-[15px] bg-lime rounded-full relative">
            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-dark rounded-full" />
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="px-4 flex items-center justify-between mb-1.5">
        <span className="text-white/25 text-[9px] uppercase tracking-wider font-medium">Disponíveis</span>
        <span className="text-lime text-[9px] font-bold">3</span>
      </div>

      {/* Cards */}
      {[
        { store: 'Pizza Palace', addr: 'Av. Brasil, 230', value: 'R$ 12,00', dist: '2.1 km' },
        { store: 'Burger King', addr: 'R. das Flores, 87', value: 'R$ 9,50', dist: '1.4 km' },
      ].map((d, i) => (
        <div key={i} className="mx-4 mb-1.5 bg-white/[0.05] rounded-xl p-2.5 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                <Package size={11} className="text-white/40" />
              </div>
              <span className="text-white font-semibold text-[11px]">{d.store}</span>
            </div>
            <span className="text-lime font-bold text-[11px]">{d.value}</span>
          </div>
          <div className="flex items-center gap-1 text-white/25 text-[9px]">
            <MapPin size={8} /><span>{d.addr} · {d.dist}</span>
          </div>
        </div>
      ))}

      {/* Earnings mini */}
      <div className="mx-4 mt-1.5 bg-lime/10 rounded-xl p-2.5 border border-lime/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Wallet size={12} className="text-lime" />
          <div>
            <p className="text-white/30 text-[8px] uppercase tracking-wider">Esta semana</p>
            <p className="text-white font-bold text-[12px]">R$ 432,00</p>
          </div>
        </div>
        <ChevronRight size={11} className="text-white/15" />
      </div>

      {/* Tab bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0d0d10]/95 border-t border-white/[0.05] px-4 py-2.5 flex items-center justify-around">
        {[
          { Icon: Home, label: 'Início', active: true },
          { Icon: Navigation2, label: 'Em Rota', active: false },
          { Icon: DollarSign, label: 'Ganhos', active: false },
          { Icon: User, label: 'Perfil', active: false },
        ].map(({ Icon, label, active }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <Icon size={15} className={active ? 'text-lime' : 'text-white/20'} strokeWidth={active ? 2.5 : 1.5} />
            <span className={`text-[8px] font-medium ${active ? 'text-lime' : 'text-white/20'}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────── Phone: Active Delivery ───────────────────── */
function PhoneActiveDelivery() {
  return (
    <div className="w-full h-full bg-[#111114] overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <Signal size={10} className="text-white/60" />
          <Battery size={12} className="text-white/60" />
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mx-4 mt-2 h-28 rounded-2xl overflow-hidden relative bg-[#1a2535] border border-white/10">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d="M 30 80 Q 80 40 140 25" stroke="#c1f148" strokeWidth="2" fill="none" strokeDasharray="4 2" />
          <circle cx="30" cy="80" r="5" fill="#4CAF82" />
          <circle cx="140" cy="25" r="5" fill="#c1f148" />
        </svg>
        {/* Labels */}
        <div className="absolute bottom-2 left-6 bg-accent/20 border border-accent/40 rounded-lg px-1.5 py-0.5">
          <span className="text-accent text-[8px] font-bold">Coleta</span>
        </div>
        <div className="absolute top-2 right-8 bg-lime/20 border border-lime/40 rounded-lg px-1.5 py-0.5">
          <span className="text-lime text-[8px] font-bold">Entrega</span>
        </div>
      </div>

      {/* Delivery info */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-bold text-[12px] font-jakarta">Em andamento</p>
          <div className="flex items-center gap-1 bg-lime/15 rounded-full px-2 py-0.5">
            <div className="w-1 h-1 rounded-full bg-lime" />
            <span className="text-lime text-[9px] font-bold">Ativo</span>
          </div>
        </div>

        {/* Timeline */}
        {[
          { label: 'Pedido aceito', done: true, time: '09:30' },
          { label: 'Indo buscar', done: true, time: '09:32' },
          { label: 'Coletado', done: false, time: '—' },
          { label: 'Entregue', done: false, time: '—' },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2.5 mb-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-lime/20 border border-lime/40' : 'border border-white/10'}`}>
              {step.done && <CheckCircle2 size={10} className="text-lime" />}
            </div>
            <span className={`text-[10px] flex-1 ${step.done ? 'text-white/70' : 'text-white/25'}`}>{step.label}</span>
            <span className={`text-[9px] ${step.done ? 'text-white/40' : 'text-white/15'}`}>{step.time}</span>
          </div>
        ))}

        {/* Value + code */}
        <div className="mt-2 flex gap-2">
          <div className="flex-1 bg-white/[0.05] rounded-xl p-2.5 border border-white/[0.06]">
            <p className="text-white/30 text-[8px] uppercase tracking-wider">Valor</p>
            <p className="text-lime font-bold text-[13px]">R$ 12,00</p>
          </div>
          <div className="flex-1 bg-white/[0.05] rounded-xl p-2.5 border border-white/[0.06]">
            <p className="text-white/30 text-[8px] uppercase tracking-wider">Código</p>
            <p className="text-white font-bold text-[13px] tracking-widest">8472</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0d0d10]/95 border-t border-white/[0.05] px-4 py-2.5 flex items-center justify-around">
        {[
          { Icon: Home, label: 'Início', active: false },
          { Icon: Navigation2, label: 'Em Rota', active: true },
          { Icon: DollarSign, label: 'Ganhos', active: false },
          { Icon: User, label: 'Perfil', active: false },
        ].map(({ Icon, label, active }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <Icon size={15} className={active ? 'text-lime' : 'text-white/20'} strokeWidth={active ? 2.5 : 1.5} />
            <span className={`text-[8px] font-medium ${active ? 'text-lime' : 'text-white/20'}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────── Phone: Earnings ──────────────────────────── */
function PhoneEarnings() {
  return (
    <div className="w-full h-full bg-[#111114] overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <Signal size={10} className="text-white/60" />
          <Battery size={12} className="text-white/60" />
        </div>
      </div>

      <div className="px-4 pt-3">
        <p className="text-white font-bold text-[14px] font-jakarta mb-3">Meus Ganhos</p>

        {/* Period selector */}
        <div className="flex gap-1.5 mb-3">
          {['Hoje', '7 dias', 'Mês'].map((p, i) => (
            <div
              key={p}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${
                i === 1 ? 'bg-lime text-dark' : 'bg-white/[0.06] text-white/40 border border-white/[0.06]'
              }`}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Main balance */}
        <div className="bg-lime/10 border border-lime/20 rounded-2xl p-3.5 mb-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/35 text-[9px] uppercase tracking-wider mb-1">Total — 7 dias</p>
              <p className="text-white font-bold text-[22px] font-jakarta leading-none">R$ 432,00</p>
            </div>
            <div className="flex items-center gap-1 bg-lime/20 rounded-lg px-2 py-1">
              <ArrowUp size={10} className="text-lime" />
              <span className="text-lime text-[9px] font-bold">+12%</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-white/[0.07] flex items-center gap-1.5">
            <Clock size={10} className="text-white/30" />
            <span className="text-white/30 text-[9px]">Próximo pagamento: sexta-feira</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { label: 'Entregas', value: '32', Icon: Package },
            { label: 'Média', value: 'R$13', Icon: TrendingUp },
            { label: 'Horas', value: '18h', Icon: Clock },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-2 text-center">
              <Icon size={12} className="text-white/30 mx-auto mb-1" />
              <p className="text-white font-bold text-[11px]">{value}</p>
              <p className="text-white/25 text-[8px]">{label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart mini */}
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-2.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/30 text-[9px] uppercase tracking-wider">Por dia</span>
            <BarChart3 size={10} className="text-white/20" />
          </div>
          <div className="flex items-end gap-1 h-10">
            {[40, 65, 55, 80, 45, 72, 60].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${i === 3 ? 'bg-lime' : 'bg-white/15'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
              <span key={i} className={`flex-1 text-center text-[7px] ${i === 3 ? 'text-lime/70' : 'text-white/15'}`}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0d0d10]/95 border-t border-white/[0.05] px-4 py-2.5 flex items-center justify-around">
        {[
          { Icon: Home, label: 'Início', active: false },
          { Icon: Navigation2, label: 'Em Rota', active: false },
          { Icon: DollarSign, label: 'Ganhos', active: true },
          { Icon: User, label: 'Perfil', active: false },
        ].map(({ Icon, label, active }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <Icon size={15} className={active ? 'text-lime' : 'text-white/20'} strokeWidth={active ? 2.5 : 1.5} />
            <span className={`text-[8px] font-medium ${active ? 'text-lime' : 'text-white/20'}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ────────────────────────────── Section ───────────────────────────────── */
const TABS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    Icon: Home,
    subtitle: 'Controle total na palma da mão',
    features: [
      'Modo online/offline com um toque',
      'Pedidos disponíveis em tempo real',
      'Resumo de ganhos da semana',
    ],
    Screen: PhoneDashboard,
  },
  {
    key: 'entrega',
    label: 'Entrega ativa',
    Icon: Navigation2,
    subtitle: 'Mapa integrado e rastreamento',
    features: [
      'Mapa com rota de coleta e entrega',
      'Timeline de status do pedido',
      'Código de confirmação da entrega',
    ],
    Screen: PhoneActiveDelivery,
  },
  {
    key: 'ganhos',
    label: 'Meus ganhos',
    Icon: DollarSign,
    subtitle: 'Transparência total nos pagamentos',
    features: [
      'Histórico por dia, semana ou mês',
      'Previsão do próximo pagamento',
      'Gráfico de desempenho semanal',
    ],
    Screen: PhoneEarnings,
  },
]

export default function EntregadorAppPreview() {
  const [active, setActive] = useState(0)
  const current = TABS[active]
  const { Screen } = current

  return (
    <section className="bg-surface py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="flex-1 max-w-24 h-px bg-surface-alt" />
            <span className="font-jakarta font-bold text-xs tracking-widest uppercase text-accent">
              03
            </span>
            <div className="flex-1 max-w-24 h-px bg-surface-alt" />
          </div>
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink mb-4">
            Tudo que você precisa,{' '}
            <span className="text-dark">num só app</span>
          </h2>
          <p className="text-ink-3 text-lg max-w-md mx-auto">
            O app do entregador foi criado para ser simples, rápido e completo.
          </p>
        </AnimatedSection>

        {/* Two-column: text + phone */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: tab selector + features */}
          <AnimatedSection direction="left">
            {/* Tabs */}
            <div className="flex gap-2 mb-10">
              {TABS.map(({ key, label, Icon }, i) => (
                <button
                  key={key}
                  onClick={() => setActive(i)}
                  className={`flex-1 flex flex-col items-center gap-2 rounded-2xl py-3.5 px-3 border transition-all duration-200 cursor-pointer ${
                    active === i
                      ? 'bg-dark border-dark shadow-[0_4px_20px_rgba(24,24,27,0.12)]'
                      : 'bg-white border-surface-alt hover:border-dark/20'
                  }`}
                >
                  <Icon
                    size={18}
                    className={active === i ? 'text-lime' : 'text-ink-3'}
                    strokeWidth={active === i ? 2.5 : 1.5}
                  />
                  <span
                    className={`text-[11px] font-semibold text-center leading-tight ${
                      active === i ? 'text-white' : 'text-ink-3'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Features */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-jakarta font-bold text-ink text-2xl mb-2">
                  {current.subtitle}
                </p>
                <div className="flex flex-col gap-3 mt-6">
                  {current.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-lime/15 border border-lime/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} className="text-lime" />
                      </div>
                      <span className="text-ink-2 text-[15px] leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>

          {/* Right: phone */}
          <AnimatedSection direction="right" className="flex justify-center">
            <div className="relative">
              <div className="w-[240px] h-[490px] bg-[#111114] rounded-[34px] border-2 border-white/15 shadow-[0_40px_100px_-15px_rgba(24,24,27,0.35)] overflow-hidden relative">
                {/* Dynamic island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 bg-dark/5 blur-3xl rounded-full scale-150" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
