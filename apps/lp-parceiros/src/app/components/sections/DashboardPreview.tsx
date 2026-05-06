'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Clock,
  Star,
  Wallet,
} from 'lucide-react'
import { AnimatedSection } from '@mallevo/ui'

/* ─────────────────────────── Screen: Dashboard ─────────────────────── */
function ScreenDashboard() {
  const KPIS = [
    { label: 'Receita hoje', value: 'R$1.247', change: '+12%', up: true },
    { label: 'Pedidos hoje', value: '18', change: '+3 agora', up: true },
    { label: 'Ticket médio', value: 'R$69,30', change: 'vs R$61', up: true },
    { label: 'Avaliação', value: '4.8★', change: '94 avaliações', up: true },
  ]
  const ORDERS = [
    { name: 'João Silva', items: '3 itens', value: 'R$47,80', status: 'Novo', dot: 'bg-blue-400' },
    { name: 'Maria Souza', items: '2 itens', value: 'R$23,50', status: 'Em preparo', dot: 'bg-yellow-400' },
    { name: 'Carlos Mendes', items: '5 itens', value: 'R$89,90', status: 'A caminho', dot: 'bg-lime' },
  ]
  return (
    <div className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-ink-3 text-[11px]">Bem-vindo de volta,</p>
          <p className="text-ink font-jakarta font-bold text-sm">Pizzaria da Vila</p>
        </div>
        <div className="flex items-center gap-1.5 bg-lime/10 border border-lime/20 rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          <span className="text-[10px] font-bold text-accent">Online</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-surface rounded-xl p-3 border border-surface-alt">
            <p className="text-ink-3 text-[9px] uppercase tracking-wider mb-1">{k.label}</p>
            <p className="font-jakarta font-bold text-[15px] text-ink leading-none mb-0.5">{k.value}</p>
            <div className="flex items-center gap-1">
              {k.up
                ? <ArrowUp size={8} className="text-accent" />
                : <ArrowDown size={8} className="text-red-400" />
              }
              <span className="text-[9px] text-accent font-semibold">{k.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-surface-alt overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-surface flex justify-between items-center">
          <span className="text-ink-3 text-[10px] font-bold uppercase tracking-wider">Fila de pedidos</span>
          <span className="text-lime text-[10px] font-bold">3 ativos</span>
        </div>
        {ORDERS.map((o, i) => (
          <div key={i} className="flex items-center justify-between px-3.5 py-2.5 border-b border-surface last:border-0">
            <div className="flex items-center gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full ${o.dot}`} />
              <div>
                <p className="text-ink text-[11px] font-semibold">{o.name}</p>
                <p className="text-ink-3 text-[9px]">{o.items} · {o.status}</p>
              </div>
            </div>
            <span className="font-bold text-[11px] text-ink">{o.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────── Screen: Orders ────────────────────────── */
function ScreenPedidos() {
  const ORDERS = [
    { id: 'MV-4821', name: 'João Silva', items: 3, value: 'R$47,80', status: 'Novo', statusColor: 'bg-blue-100 text-blue-700', time: '09:32' },
    { id: 'MV-4820', name: 'Maria Souza', items: 2, value: 'R$23,50', status: 'Em preparo', statusColor: 'bg-yellow-100 text-yellow-700', time: '09:28' },
    { id: 'MV-4819', name: 'Carlos Mendes', items: 5, value: 'R$89,90', status: 'A caminho', statusColor: 'bg-lime/20 text-accent', time: '09:15' },
    { id: 'MV-4818', name: 'Ana Ferreira', items: 1, value: 'R$18,00', status: 'Entregue', statusColor: 'bg-surface-alt text-ink-3', time: '08:52' },
    { id: 'MV-4817', name: 'Lucas Oliveira', items: 4, value: 'R$62,50', status: 'Entregue', statusColor: 'bg-surface-alt text-ink-3', time: '08:40' },
  ]
  return (
    <div className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-ink font-jakarta font-bold text-sm">Gestão de Pedidos</p>
        <div className="flex gap-2">
          {['Todos', 'Ativos', 'Entregues'].map((f, i) => (
            <span
              key={f}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer ${
                i === 0 ? 'bg-dark text-white' : 'bg-surface-alt text-ink-3'
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-surface-alt overflow-hidden">
        <div className="grid grid-cols-5 px-3.5 py-2 border-b border-surface bg-surface">
          {['Pedido', 'Cliente', 'Itens', 'Valor', 'Status'].map((h) => (
            <span key={h} className="text-ink-3 text-[9px] font-bold uppercase tracking-wider">{h}</span>
          ))}
        </div>
        {ORDERS.map((o) => (
          <div key={o.id} className="grid grid-cols-5 items-center px-3.5 py-2.5 border-b border-surface last:border-0 hover:bg-surface/50 transition-colors">
            <span className="text-ink-3 text-[10px] font-mono">{o.id}</span>
            <div>
              <p className="text-ink text-[11px] font-semibold">{o.name}</p>
              <p className="text-ink-3 text-[9px]">{o.time}</p>
            </div>
            <span className="text-ink-2 text-[11px]">{o.items}</span>
            <span className="text-ink font-bold text-[11px]">{o.value}</span>
            <span className={`text-[9px] font-bold px-2 py-1 rounded-lg w-fit ${o.statusColor}`}>{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────── Screen: Products ──────────────────────── */
function ScreenCardapio() {
  const PRODUCTS = [
    { name: 'Pizza Calabresa', cat: 'Pizzas', price: 'R$42,90', stock: 'OK', active: true },
    { name: 'Pizza Frango', cat: 'Pizzas', price: 'R$44,90', stock: 'OK', active: true },
    { name: 'Combo 2 Pizzas', cat: 'Combos', price: 'R$79,90', stock: 'OK', active: true },
    { name: 'Refrigerante 2L', cat: 'Bebidas', price: 'R$8,90', stock: 'Baixo', active: true },
    { name: 'Suco Natural', cat: 'Bebidas', price: 'R$7,90', stock: 'OK', active: false },
  ]
  return (
    <div className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-ink font-jakarta font-bold text-sm">Cardápio / Produtos</p>
        <div className="flex gap-2 items-center">
          <span className="text-ink-3 text-[10px]">5 / 30 produtos</span>
          <div className="bg-lime text-lime-ink text-[10px] font-bold px-2.5 py-1 rounded-lg">+ Novo</div>
        </div>
      </div>
      <div className="w-full bg-surface-alt rounded-full h-1.5 mb-4 overflow-hidden">
        <div className="bg-lime h-full rounded-full" style={{ width: '17%' }} />
      </div>
      <div className="bg-white rounded-xl border border-surface-alt overflow-hidden">
        <div className="grid grid-cols-5 px-3.5 py-2 border-b border-surface bg-surface">
          {['Produto', 'Categoria', 'Preço', 'Estoque', 'Ativo'].map((h) => (
            <span key={h} className="text-ink-3 text-[9px] font-bold uppercase tracking-wider">{h}</span>
          ))}
        </div>
        {PRODUCTS.map((p, i) => (
          <div key={i} className="grid grid-cols-5 items-center px-3.5 py-2.5 border-b border-surface last:border-0 hover:bg-surface/50 transition-colors">
            <span className="text-ink font-semibold text-[11px]">{p.name}</span>
            <span className="text-ink-3 text-[10px]">{p.cat}</span>
            <span className="text-ink font-bold text-[11px]">{p.price}</span>
            <span className={`text-[9px] font-bold ${p.stock === 'Baixo' ? 'text-yellow-600' : 'text-accent'}`}>{p.stock}</span>
            <div className={`w-7 h-3.5 rounded-full relative transition-colors ${p.active ? 'bg-lime' : 'bg-surface-alt border border-surface'}`}>
              <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-all ${p.active ? 'right-0.5' : 'left-0.5'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────── Screen: Financial ─────────────────────── */
function ScreenFinanceiro() {
  const BARS = [55, 70, 45, 80, 60, 90, 75, 65, 85, 70, 95, 80, 60, 72]
  return (
    <div className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-ink font-jakarta font-bold text-sm">Financeiro</p>
        <div className="flex items-center gap-1.5 bg-surface-alt border border-surface rounded-lg px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-semibold text-accent">Stripe Express ativo</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Receita mensal', value: 'R$18.420', Icon: TrendingUp },
          { label: 'Repasse pendente', value: 'R$3.240', Icon: Wallet },
          { label: 'Ticket médio', value: 'R$67,50', Icon: Star },
        ].map(({ label, value, Icon }) => (
          <div key={label} className="bg-white rounded-xl p-3 border border-surface-alt">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={11} className="text-ink-3" />
              <span className="text-ink-3 text-[9px] uppercase tracking-wider">{label}</span>
            </div>
            <p className="font-jakarta font-bold text-[14px] text-ink">{value}</p>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="bg-white rounded-xl border border-surface-alt p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-ink-3 text-[10px] uppercase tracking-wider font-bold">Faturamento — 14 dias</span>
          <span className="text-accent text-[10px] font-bold">+18% vs mês anterior</span>
        </div>
        <div className="flex items-end gap-1 h-16">
          {BARS.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm transition-all ${i === BARS.length - 1 ? 'bg-lime' : 'bg-surface-alt hover:bg-dark/20'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface">
          <Clock size={10} className="text-ink-3" />
          <span className="text-ink-3 text-[9px]">Próximo repasse: sexta-feira</span>
          <span className="text-accent font-bold text-[9px] ml-auto">R$3.240,00</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── Section ───────────────────────────── */
const TABS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    Icon: LayoutDashboard,
    subtitle: 'Visão geral em tempo real',
    features: [
      '4 KPIs principais: receita, pedidos, ticket médio, avaliação',
      'Fila de pedidos com status em tempo real',
      'Indicadores de tendência e comparativos',
    ],
    Screen: ScreenDashboard,
  },
  {
    key: 'pedidos',
    label: 'Pedidos',
    Icon: ShoppingBag,
    subtitle: 'Gestão completa de pedidos',
    features: [
      'Todos os pedidos com filtro por status',
      'Detalhes do cliente, itens e valor por pedido',
      'Histórico completo com timestamps',
    ],
    Screen: ScreenPedidos,
  },
  {
    key: 'cardapio',
    label: 'Cardápio',
    Icon: Package,
    subtitle: 'Catálogo e estoque',
    features: [
      'Adicione, edite e ative/desative produtos',
      'Controle de estoque com alertas de baixo nível',
      'Importação em massa via CSV',
    ],
    Screen: ScreenCardapio,
  },
  {
    key: 'financeiro',
    label: 'Financeiro',
    Icon: BarChart3,
    subtitle: 'Receita e repasses',
    features: [
      'Gráfico de faturamento dos últimos 30 dias',
      'Saldo Stripe e repasses pendentes/agendados',
      'Antecipação para D+2 disponível',
    ],
    Screen: ScreenFinanceiro,
  },
]

export default function DashboardPreview() {
  const [active, setActive] = useState(0)
  const current = TABS[active]
  const { Screen } = current

  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-lime font-jakarta font-bold text-xs tracking-widest uppercase">
              03
            </span>
            <div className="flex-1 h-px bg-surface-alt" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-ink">
              O dashboard que sua{' '}
              <span className="text-dark">loja merecia</span>
            </h2>
            <p className="text-ink-3 text-base max-w-xs lg:text-right">
              Tudo que você precisa para gerenciar, num único painel.
            </p>
          </div>
        </AnimatedSection>

        {/* Two-column: features + browser mockup */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">

          {/* Left: tab selector + features */}
          <AnimatedSection direction="left">
            <div className="flex flex-col gap-2 mb-8">
              {TABS.map(({ key, label, Icon }, i) => (
                <button
                  key={key}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-2xl py-3.5 px-4 border transition-all duration-200 text-left cursor-pointer ${
                    active === i
                      ? 'bg-dark border-dark shadow-lg'
                      : 'bg-white border-surface-alt hover:border-dark/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    active === i ? 'bg-lime/15' : 'bg-surface'
                  }`}>
                    <Icon
                      size={16}
                      className={active === i ? 'text-lime' : 'text-ink-3'}
                      strokeWidth={active === i ? 2.5 : 1.5}
                    />
                  </div>
                  <span className={`font-semibold text-[13px] ${active === i ? 'text-white' : 'text-ink'}`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-jakarta font-bold text-ink text-[17px] mb-4">
                  {current.subtitle}
                </p>
                <div className="flex flex-col gap-3">
                  {current.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-lime/15 border border-lime/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} className="text-lime" />
                      </div>
                      <span className="text-ink-2 text-[14px] leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>

          {/* Right: Browser mockup */}
          <AnimatedSection direction="right">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(24,24,27,0.15)] border border-surface-alt">
              {/* Browser chrome */}
              <div className="bg-surface-alt border-b border-surface px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-lime/70" />
                </div>
                <div className="flex-1 bg-white/70 rounded-lg px-3 py-1 flex items-center gap-2 max-w-xs mx-auto">
                  <div className="w-2 h-2 rounded-full bg-accent/60" />
                  <span className="text-ink-3 text-[10px] font-medium">app.mallevo.com.br/dashboard</span>
                </div>
              </div>

              {/* App shell */}
              <div className="flex bg-surface">
                {/* Sidebar */}
                <div className="w-[130px] bg-dark py-4 px-3 flex flex-col gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1.5 px-2 mb-4">
                    <div className="w-5 h-5 rounded bg-lime flex items-center justify-center">
                      <ShoppingBag size={10} className="text-lime-ink" />
                    </div>
                    <span className="font-jakarta font-bold text-white text-[11px]">Mall<span className="text-lime">evo</span></span>
                  </div>
                  {TABS.map(({ Icon: TIcon, label }, i) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl ${i === active ? 'bg-lime/15' : ''}`}
                    >
                      <TIcon size={12} className={i === active ? 'text-lime' : 'text-white/25'} />
                      <span className={`text-[10px] font-medium ${i === active ? 'text-white' : 'text-white/25'}`}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Screen content */}
                <div className="flex-1 min-h-[380px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Screen />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
