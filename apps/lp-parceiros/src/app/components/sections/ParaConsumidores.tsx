'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  CreditCard,
  Star,
  MessageSquare,
  Home,
  Search,
  ShoppingCart,
  User,
  Utensils,
  ShoppingBag,
  Activity,
  PawPrint,
  MapPinned,
  Bike,
} from 'lucide-react'
import { AnimatedSection, StaggerItem } from '@mallevo/ui'

const features = [
  { icon: MapPin,        label: 'Rastreamento em tempo real' },
  { icon: CreditCard,   label: 'Pague com cartão ou PIX' },
  { icon: Star,         label: 'Avalie sua experiência' },
  { icon: MessageSquare, label: 'Fale direto com a loja' },
]

const CATEGORIES = [
  { Icon: Utensils,    label: 'Comida' },
  { Icon: ShoppingBag, label: 'Mercado' },
  { Icon: Activity,    label: 'Farmácia' },
  { Icon: PawPrint,    label: 'Pet' },
]

const STORES = [
  { name: 'Pizzaria da Vila', sub: '25–35 min', rating: '4.8', tag: 'Entrega grátis', tagColor: 'text-accent' },
  { name: 'Mercado Bom Preço', sub: '20–30 min', rating: '4.6', tag: 'R$ 5,00 entrega', tagColor: 'text-ink-3' },
]

function PhoneConsumerApp() {
  return (
    <div className="relative w-[260px] bg-[#111114] rounded-[36px] border-2 border-white/12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[72px] h-[18px] bg-black rounded-full z-20" />

      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-8 pb-1">
        <span className="text-white/60 text-[10px] font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5 items-end">
            {[3,5,7,9].map((h, i) => (
              <div key={i} className="w-1 bg-white/50 rounded-sm" style={{ height: h }} />
            ))}
          </div>
          <svg viewBox="0 0 16 12" className="w-4 h-3 fill-white/50">
            <path d="M8 2.4C9.9 2.4 11.6 3.15 12.9 4.35L14.2 3.05C12.55 1.55 10.38.65 8 .65 5.62.65 3.45 1.55 1.8 3.05L3.1 4.35C4.4 3.15 6.1 2.4 8 2.4z" />
            <path d="M8 5.4C9.2 5.4 10.3 5.9 11.1 6.7L12.4 5.4C11.25 4.3 9.7 3.65 8 3.65c-1.7 0-3.25.65-4.4 1.75L4.9 6.7C5.7 5.9 6.8 5.4 8 5.4z" />
            <circle cx="8" cy="10" r="1.5" />
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-[18px] h-[9px] rounded-[2px] border border-white/40 flex items-center px-[1px]">
              <div className="w-[13px] h-[5px] bg-white/60 rounded-[1px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-3 pb-3">
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

      {/* Search bar */}
      <div className="mx-4 bg-white/8 rounded-xl px-3 py-2 mb-4 flex items-center gap-2 border border-white/8">
        <Search size={12} className="text-white/30" />
        <span className="text-white/30 text-[11px]">Buscar loja ou produto...</span>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <p className="text-white/35 text-[9px] font-semibold uppercase tracking-wider mb-2.5">
          Categorias
        </p>
        <div className="flex gap-2">
          {CATEGORIES.map(({ Icon, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-1 flex-1 rounded-xl py-2 border ${
                i === 0 ? 'bg-lime/15 border-lime/25' : 'bg-white/5 border-white/8'
              }`}
            >
              <Icon size={13} className={i === 0 ? 'text-lime' : 'text-white/40'} />
              <span className={`text-[8px] font-medium ${i === 0 ? 'text-lime' : 'text-white/40'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stores */}
      <div className="px-4 mb-4">
        <p className="text-white/35 text-[9px] font-semibold uppercase tracking-wider mb-2.5">
          Em destaque
        </p>
        <div className="flex flex-col gap-2">
          {STORES.map((s, i) => (
            <div key={i} className="bg-white/6 rounded-xl p-3 flex items-center gap-3 border border-white/8">
              <div className="w-10 h-10 rounded-xl bg-lime/15 flex items-center justify-center shrink-0">
                <Utensils size={14} className="text-lime" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold truncate">{s.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Star size={9} className="fill-lime text-lime" />
                  <span className="text-white/40 text-[9px]">{s.rating} · {s.sub}</span>
                </div>
                <p className={`text-[9px] font-semibold mt-0.5 ${s.tagColor}`}>{s.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bg-[#0d0d10] border-t border-white/8 px-4 py-3 flex justify-around items-center">
        {[
          { Icon: Home, active: true },
          { Icon: Search, active: false },
          { Icon: ShoppingCart, active: false },
          { Icon: User, active: false },
        ].map(({ Icon, active }, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <Icon size={16} className={active ? 'text-lime' : 'text-white/25'} />
            {active && <div className="w-1 h-1 rounded-full bg-lime" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ParaConsumidores() {
  return (
    <section
      id="para-consumidores"
      className="bg-dark py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lime font-jakarta font-bold text-sm tracking-widest uppercase">
                  05
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <span className="text-lime text-sm font-semibold uppercase tracking-wider mb-4 block">
                Para quem mora em Divinópolis
              </span>

              <h2 className="font-jakarta text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Seus pedidos favoritos,
                <br />
                <span className="text-lime">na palma da mão.</span>
              </h2>

              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Restaurantes, mercadinhos, farmácias, pet shops e muito mais.
                Acompanhe sua entrega em tempo real no mapa.
              </p>
            </AnimatedSection>

            {/* Features */}
            <AnimatedSection stagger className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f) => {
                  const Icon = f.icon
                  return (
                    <StaggerItem key={f.label}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime/15 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-lime" />
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          {f.label}
                        </span>
                      </div>
                    </StaggerItem>
                  )
                })}
              </div>
            </AnimatedSection>

            {/* App store buttons */}
            <AnimatedSection delay={0.3}>
              <p className="text-white/40 text-sm mb-4">
                Disponível em breve para:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#"
                  className="flex items-center gap-3 bg-white text-ink px-5 py-3 rounded-xl hover:bg-surface transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-ink-3 leading-none">Download na</p>
                    <p className="text-sm font-semibold leading-tight">App Store</p>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center gap-3 bg-white text-ink px-5 py-3 rounded-xl hover:bg-surface transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18.5v-13c0-.83.95-1.3 1.6-.8l11 6.5c.6.35.6 1.25 0 1.6l-11 6.5c-.65.5-1.6.03-1.6-.8z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-ink-3 leading-none">Disponível no</p>
                    <p className="text-sm font-semibold leading-tight">Google Play</p>
                  </div>
                </motion.a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Phone mockup */}
          <AnimatedSection direction="right">
            <div className="flex justify-center lg:justify-end">
              <motion.div
                className="relative"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneConsumerApp />

                {/* Floating: order tracking */}
                <motion.div
                  className="absolute -right-10 top-1/3 bg-white rounded-2xl shadow-xl p-3.5 border border-surface-alt min-w-[140px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Bike size={13} className="text-accent shrink-0" />
                    <p className="text-[11px] font-bold text-ink">A caminho</p>
                  </div>
                  <div className="flex gap-1">
                    {[true, true, false].map((done, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full ${done ? 'bg-lime' : 'bg-surface-alt'}`}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] text-ink-3 mt-1.5">Chega em ~8 min</p>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
