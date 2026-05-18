'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Search,
  ShoppingBag,
  User,
  MapPinned,
  Star,
  Utensils,
  ShoppingCart,
  Activity,
  PawPrint,
  Plus,
  Bike,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Store,
} from 'lucide-react'
import { AnimatedSection, HeadingReveal, LabelReveal } from '@mallevo/ui'

/* ───────────────────────── Shared chrome ───────────────────────── */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1">
      <span className="text-white/70 text-[10px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5 items-end">
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} className="w-1 bg-white/45 rounded-sm" style={{ height: h }} />
          ))}
        </div>
        <svg viewBox="0 0 16 12" className="w-3.5 h-3 fill-white/45">
          <path d="M8 2.4C9.9 2.4 11.6 3.15 12.9 4.35L14.2 3.05C12.55 1.55 10.38.65 8 .65 5.62.65 3.45 1.55 1.8 3.05L3.1 4.35C4.4 3.15 6.1 2.4 8 2.4z" />
          <circle cx="8" cy="10" r="1.5" />
        </svg>
        <div className="w-[18px] h-[9px] rounded-[2px] border border-white/35 flex items-center px-[1px]">
          <div className="w-[12px] h-[5px] bg-white/55 rounded-[1px]" />
        </div>
      </div>
    </div>
  )
}

function TabBar({ active }: { active: 'inicio' | 'buscar' | 'sacola' | 'perfil' }) {
  const items = [
    { key: 'inicio', Icon: Home },
    { key: 'buscar', Icon: Search },
    { key: 'sacola', Icon: ShoppingBag },
    { key: 'perfil', Icon: User },
  ] as const
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#0d0d10]/95 border-t border-white/[0.06] px-5 py-3 flex justify-around items-center">
      {items.map(({ key, Icon }) => {
        const on = key === active
        return (
          <div key={key} className="flex flex-col items-center gap-1">
            <Icon size={16} className={on ? 'text-lime' : 'text-white/25'} strokeWidth={on ? 2.5 : 1.5} />
            {on && <div className="w-1 h-1 rounded-full bg-lime" />}
          </div>
        )
      })}
    </div>
  )
}

/* ───────────────────────── Screen 1: Início ───────────────────────── */
const CATEGORIES = [
  { Icon: Utensils, label: 'Comida' },
  { Icon: ShoppingCart, label: 'Mercado' },
  { Icon: Activity, label: 'Farmácia' },
  { Icon: PawPrint, label: 'Pet' },
]
const STORES = [
  { name: 'Pizzaria da Vila', rating: '4.8', sub: '25–35 min', tag: 'Entrega grátis', free: true },
  { name: 'Mercado Bom Preço', rating: '4.6', sub: '20–30 min', tag: 'R$ 5,00 entrega', free: false },
  { name: 'Farmácia Saúde+', rating: '4.9', sub: '15–25 min', tag: 'Entrega grátis', free: true },
]

function ScreenInicio() {
  return (
    <div className="w-full h-full bg-[#111114] overflow-hidden">
      <StatusBar />
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-white/40 text-[10px]">Boa tarde,</p>
          <div className="w-7 h-7 rounded-full bg-lime/20 flex items-center justify-center">
            <User size={13} className="text-lime" />
          </div>
        </div>
        <p className="text-white font-jakarta font-bold text-[15px] leading-tight">
          O que você quer hoje?
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <MapPinned size={10} className="text-lime shrink-0" />
          <span className="text-white/40 text-[10px]">Divinópolis, MG</span>
        </div>
      </div>

      <div className="mx-4 bg-white/[0.07] rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2 border border-white/[0.07]">
        <Search size={12} className="text-white/30" />
        <span className="text-white/30 text-[11px]">Buscar loja ou produto…</span>
      </div>

      <div className="px-4 mb-4">
        <p className="text-white/35 text-[9px] font-semibold uppercase tracking-wider mb-2.5">Categorias</p>
        <div className="flex gap-2">
          {CATEGORIES.map(({ Icon, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-1 flex-1 rounded-xl py-2 border ${
                i === 0 ? 'bg-lime/15 border-lime/25' : 'bg-white/[0.04] border-white/[0.07]'
              }`}
            >
              <Icon size={13} className={i === 0 ? 'text-lime' : 'text-white/40'} />
              <span className={`text-[8px] font-medium ${i === 0 ? 'text-lime' : 'text-white/40'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4">
        <p className="text-white/35 text-[9px] font-semibold uppercase tracking-wider mb-2.5">Em destaque</p>
        <div className="flex flex-col gap-2">
          {STORES.map((s) => (
            <div key={s.name} className="bg-white/[0.05] rounded-xl p-3 flex items-center gap-3 border border-white/[0.07]">
              <div className="w-10 h-10 rounded-xl bg-lime/15 flex items-center justify-center shrink-0">
                <Store size={14} className="text-lime" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold truncate">{s.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Star size={9} className="fill-lime text-lime" />
                  <span className="text-white/40 text-[9px]">{s.rating} · {s.sub}</span>
                </div>
                <p className={`text-[9px] font-semibold mt-0.5 ${s.free ? 'text-lime' : 'text-white/35'}`}>{s.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="inicio" />
    </div>
  )
}

/* ───────────────────────── Screen 2: Loja ───────────────────────── */
const MENU = [
  { name: 'Pizza Margherita', desc: 'Molho, muçarela e manjericão', price: 'R$ 42,90' },
  { name: 'Pizza Calabresa', desc: 'Calabresa, cebola e orégano', price: 'R$ 45,90' },
  { name: 'Refrigerante 2L', desc: 'Cola, guaraná ou laranja', price: 'R$ 12,00' },
]

function ScreenLoja() {
  return (
    <div className="w-full h-full bg-[#111114] overflow-hidden">
      <StatusBar />

      <div className="relative mx-4 mt-2 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-lime/25 to-[#0d0d10] border border-white/[0.07]">
        <button className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center">
          <ChevronLeft size={12} className="text-white" />
        </button>
        <Utensils size={26} className="text-lime/40 absolute right-4 bottom-3" />
      </div>

      <div className="px-4 pt-3">
        <p className="text-white font-jakarta font-bold text-[14px] leading-tight">Pizzaria da Vila</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-lime text-[9px] font-semibold">
            <Star size={9} className="fill-lime text-lime" /> 4.8
          </span>
          <span className="text-white/30 text-[9px]">·</span>
          <span className="text-white/40 text-[9px]">25–35 min</span>
          <span className="text-white/30 text-[9px]">·</span>
          <span className="text-lime text-[9px] font-semibold">Entrega grátis</span>
        </div>
      </div>

      <div className="px-4 pt-3">
        <p className="text-white/35 text-[9px] font-semibold uppercase tracking-wider mb-2">Mais pedidos</p>
        <div className="flex flex-col gap-2">
          {MENU.map((m) => (
            <div key={m.name} className="bg-white/[0.05] rounded-xl p-2.5 flex items-center gap-2.5 border border-white/[0.07]">
              <div className="w-11 h-11 rounded-lg bg-lime/12 flex items-center justify-center shrink-0">
                <Utensils size={15} className="text-lime/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold truncate">{m.name}</p>
                <p className="text-white/35 text-[8.5px] truncate">{m.desc}</p>
                <p className="text-lime text-[10px] font-bold mt-0.5">{m.price}</p>
              </div>
              <div className="w-6 h-6 rounded-lg bg-lime flex items-center justify-center shrink-0">
                <Plus size={12} className="text-[#1a2a00]" strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[52px] left-4 right-4 bg-lime rounded-xl px-3.5 py-2.5 flex items-center justify-between shadow-lg shadow-lime/20">
        <span className="text-[#1a2a00] text-[10px] font-bold">2 itens</span>
        <span className="text-[#1a2a00] text-[11px] font-bold">Ver sacola · R$ 88,80</span>
      </div>

      <TabBar active="inicio" />
    </div>
  )
}

/* ───────────────────────── Screen 3: Acompanhar pedido ───────────────────────── */
const TIMELINE = [
  { label: 'Pedido confirmado', done: true, time: '19:02' },
  { label: 'Em preparo', done: true, time: '19:08' },
  { label: 'Saiu para entrega', done: true, time: '19:31' },
  { label: 'Entregue', done: false, time: '—' },
]

function ScreenPedido() {
  return (
    <div className="w-full h-full bg-[#111114] overflow-hidden">
      <StatusBar />

      <div className="mx-4 mt-2 h-24 rounded-2xl overflow-hidden relative bg-[#16201a] border border-white/[0.07]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d="M 28 78 Q 90 50 168 22" stroke="#c1f148" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <circle cx="28" cy="78" r="5" fill="#9dc93a" />
          <circle cx="168" cy="22" r="5" fill="#c1f148" />
        </svg>
        <div className="absolute bottom-2 right-3 bg-lime/20 border border-lime/40 rounded-lg px-1.5 py-0.5">
          <span className="text-lime text-[8px] font-bold">Chega em ~8 min</span>
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-white font-jakarta font-bold text-[13px]">Saiu para entrega</p>
          <div className="flex items-center gap-1 bg-lime/15 rounded-full px-2 py-0.5">
            <span className="w-1 h-1 rounded-full bg-lime" />
            <span className="text-lime text-[8px] font-bold">Ao vivo</span>
          </div>
        </div>

        <div className="bg-white/[0.05] rounded-xl p-2.5 flex items-center gap-2.5 border border-white/[0.07] mb-3">
          <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center shrink-0">
            <Bike size={14} className="text-lime" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[11px] font-semibold">Ricardo M.</p>
            <p className="text-white/35 text-[9px]">Seu entregador · moto</p>
          </div>
          <Star size={10} className="fill-lime text-lime" />
          <span className="text-white/50 text-[9px] font-semibold">4.9</span>
        </div>

        {TIMELINE.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 mb-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                s.done ? 'bg-lime/20 border border-lime/40' : 'border border-white/10'
              }`}
            >
              {s.done && <CheckCircle2 size={10} className="text-lime" />}
            </div>
            <span className={`text-[10px] flex-1 ${s.done ? 'text-white/70' : 'text-white/25'}`}>{s.label}</span>
            <span className={`text-[9px] ${s.done ? 'text-white/40' : 'text-white/15'}`}>{s.time}</span>
          </div>
        ))}

        <div className="mt-2 bg-white/[0.05] rounded-xl p-2.5 border border-white/[0.07] flex items-center gap-2">
          <Clock size={11} className="text-lime" />
          <span className="text-white/50 text-[9px]">Código de entrega:</span>
          <span className="text-white font-bold text-[11px] tracking-widest ml-auto">8472</span>
        </div>
      </div>

      <TabBar active="sacola" />
    </div>
  )
}

/* ───────────────────────── Section ───────────────────────── */
const TABS = [
  {
    key: 'inicio',
    label: 'Descobrir',
    Icon: Home,
    subtitle: 'Tudo de Divinópolis num só app',
    features: [
      'Lojas locais por categoria, perto de você',
      'Busca rápida por loja ou produto',
      'Avaliações reais de quem já pediu',
    ],
    Screen: ScreenInicio,
  },
  {
    key: 'loja',
    label: 'Pedir',
    Icon: ShoppingBag,
    subtitle: 'Do cardápio à sacola em segundos',
    features: [
      'Cardápio completo com fotos e preços',
      'Monte sua sacola sem complicação',
      'Pague com cartão, PIX ou na entrega',
    ],
    Screen: ScreenLoja,
  },
  {
    key: 'pedido',
    label: 'Acompanhar',
    Icon: Bike,
    subtitle: 'Rastreie cada passo até a sua porta',
    features: [
      'Mapa ao vivo com a rota do entregador',
      'Status do pedido em tempo real',
      'Código de confirmação na entrega',
    ],
    Screen: ScreenPedido,
  },
]

export default function ConsumerApp() {
  const [active, setActive] = useState(0)
  const current = TABS[active]
  const { Screen } = current

  return (
    <section id="o-app" className="bg-dark py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-16">
          <AnimatedSection className="flex items-center gap-4 mb-8" direction="none">
            <span className="font-jakarta font-bold text-sm tracking-[0.2em] text-lime/40">03</span>
            <motion.div
              className="flex-1 h-px bg-linear-to-r from-white/10 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <LabelReveal delay={0.05} className="mb-5">O app</LabelReveal>
              <HeadingReveal
                lines={[
                  { text: 'Feito para quem' },
                  { text: 'ama praticidade.', accent: true },
                ]}
              />
            </div>
            <AnimatedSection direction="none" delay={0.3}>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Uma experiência pensada para moradores de Divinópolis. Sem taxa
                absurda, sem complicação — exatamente como o app funciona.
              </p>
            </AnimatedSection>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: tabs + features */}
          <AnimatedSection direction="left">
            <div className="flex gap-2 mb-10">
              {TABS.map(({ key, label, Icon }, i) => (
                <button
                  key={key}
                  onClick={() => setActive(i)}
                  className={`flex-1 flex flex-col items-center gap-2 rounded-2xl py-3.5 px-3 border transition-all duration-200 cursor-pointer ${
                    active === i
                      ? 'bg-lime border-lime shadow-[0_8px_30px_rgba(193,241,72,0.18)]'
                      : 'bg-white/[0.04] border-white/[0.08] hover:border-lime/30'
                  }`}
                >
                  <Icon
                    size={18}
                    className={active === i ? 'text-[#1a2a00]' : 'text-white/45'}
                    strokeWidth={active === i ? 2.5 : 1.5}
                  />
                  <span
                    className={`text-[11px] font-semibold text-center leading-tight ${
                      active === i ? 'text-[#1a2a00]' : 'text-white/45'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-jakarta font-bold text-white text-2xl mb-6">{current.subtitle}</p>
                <div className="flex flex-col gap-3">
                  {current.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-lime/15 border border-lime/25 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={11} className="text-lime" />
                      </div>
                      <span className="text-white/65 text-[15px] leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>

          {/* Right: phone */}
          <AnimatedSection direction="right" className="flex justify-center">
            <div className="relative">
              <div className="w-[240px] h-[490px] bg-[#111114] rounded-[34px] border-2 border-white/15 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative">
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
              <div className="absolute inset-0 -z-10 bg-lime/10 blur-3xl rounded-full scale-150" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
