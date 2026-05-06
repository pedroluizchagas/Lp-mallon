'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  MapPin,
  Wallet,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  Home,
  Navigation2,
  DollarSign,
  User,
  Signal,
  Battery,
  Wifi,
  Package,
  ChevronRight,
} from 'lucide-react'

const CADASTRO_URL =
  process.env.NEXT_PUBLIC_CADASTRO_URL ??
  'https://app.mallevo.com.br/entregador/cadastro'

function PhoneHomeScreen() {
  return (
    <div className="relative w-[270px] h-[560px] bg-[#111114] rounded-[38px] border-2 border-white/15 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden flex-shrink-0">
      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />

      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-0">
        <span className="text-white text-[11px] font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <Signal size={11} className="text-white/70" />
          <Wifi size={11} className="text-white/70" />
          <Battery size={13} className="text-white/70" />
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[11px] font-medium">Bom dia,</p>
            <p className="text-white font-bold text-[15px] leading-tight font-jakarta">
              João Entregador
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-full bg-lime flex items-center justify-center"
            style={{ boxShadow: '0 0 14px rgba(193,241,72,0.45)' }}
          >
            <span className="text-dark font-bold text-sm">J</span>
          </div>
        </div>

        {/* Online toggle */}
        <div className="mt-3 bg-white/[0.06] rounded-2xl px-3.5 py-2.5 flex items-center justify-between border border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-lime"
              style={{ boxShadow: '0 0 6px #c1f148' }}
            />
            <span className="text-white text-[12px] font-semibold">Online</span>
            <span className="text-white/25 text-[10px]">· recebendo pedidos</span>
          </div>
          <div className="w-9 h-[18px] bg-lime rounded-full relative">
            <div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-dark rounded-full shadow" />
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="px-5 flex items-center justify-between mb-2">
        <span className="text-white/25 text-[10px] font-semibold uppercase tracking-wider">
          Disponíveis agora
        </span>
        <span className="text-lime text-[10px] font-bold">3 pedidos</span>
      </div>

      {/* Delivery cards */}
      {[
        { store: 'Pizza Palace', addr: 'Av. Brasil, 230', value: 'R$ 12,00', dist: '2.1 km' },
        { store: 'Burger King', addr: 'R. das Flores, 87', value: 'R$ 9,50', dist: '1.4 km' },
      ].map((d, i) => (
        <div
          key={i}
          className="mx-5 mb-2 bg-white/[0.05] rounded-2xl p-3 border border-white/[0.07]"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center">
                <Package size={13} className="text-white/50" />
              </div>
              <span className="text-white font-semibold text-[12px]">{d.store}</span>
            </div>
            <span className="text-lime font-bold text-[12px]">{d.value}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/25 text-[10px]">
            <MapPin size={9} />
            <span>{d.addr}</span>
            <span>·</span>
            <span>{d.dist}</span>
          </div>
        </div>
      ))}

      {/* Weekly earnings mini card */}
      <div className="mx-5 mt-1.5 bg-lime/10 rounded-2xl p-3 border border-lime/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-lime/20 flex items-center justify-center">
            <Wallet size={13} className="text-lime" />
          </div>
          <div>
            <p className="text-white/35 text-[9px] uppercase tracking-wider">Esta semana</p>
            <p className="text-white font-bold text-[13px]">R$ 432,00</p>
          </div>
        </div>
        <ChevronRight size={13} className="text-white/20" />
      </div>

      {/* Bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0d0d10]/95 border-t border-white/[0.06] px-5 py-3.5 flex items-center justify-around backdrop-blur-sm">
        {[
          { Icon: Home, label: 'Início', active: true },
          { Icon: Navigation2, label: 'Em Rota', active: false },
          { Icon: DollarSign, label: 'Ganhos', active: false },
          { Icon: User, label: 'Perfil', active: false },
        ].map(({ Icon, label, active }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Icon
              size={17}
              className={active ? 'text-lime' : 'text-white/20'}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <span
              className={`text-[9px] font-medium ${active ? 'text-lime' : 'text-white/20'}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const STATS = [
  { Icon: Wallet, label: 'Ganho médio/dia', value: 'R$80–150' },
  { Icon: Clock, label: 'Pag. toda sexta', value: 'Via Pix' },
  { Icon: TrendingUp, label: 'Pedidos/dia', value: '+200' },
]

const TRUST = ['Cadastro 100% gratuito', 'Sem mensalidade', 'Qualquer veículo']

export default function EntregadorHero() {
  return (
    <section className="relative min-h-screen bg-dark overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_80%_50%,rgba(193,241,72,0.07)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_15%_85%,rgba(76,175,130,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/25 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-32">

          {/* ─── Left: Copy ─── */}
          <div className="order-2 lg:order-1">
            <motion.div
              className="inline-flex items-center gap-2 bg-lime/10 border border-lime/25 rounded-full px-4 py-1.5 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin size={13} className="text-lime" />
              <span className="text-lime text-[13px] font-semibold">
                App do Entregador · Divinópolis, MG
              </span>
            </motion.div>

            <motion.h1
              className="font-jakarta text-5xl lg:text-6xl xl:text-[68px] font-bold text-white leading-[1.04] mb-6"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              Entregue no
              <br />
              seu ritmo.
              <br />
              <span className="text-gradient-lime">Ganhe de verdade.</span>
            </motion.h1>

            <motion.p
              className="text-white/55 text-[17px] leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Seja um entregador parceiro da Mallevo. Você define seus horários,
              aceita os pedidos que quiser e recebe via Pix toda sexta-feira.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {STATS.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-lime/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-lime" />
                  </div>
                  <div>
                    <p className="text-white/35 text-[10px] uppercase tracking-wider leading-none mb-0.5">
                      {label}
                    </p>
                    <p className="text-white font-bold text-[13px] leading-none">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href={CADASTRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-lime text-lime-ink font-bold px-8 py-4 rounded-2xl text-base hover:bg-lime-dark transition-colors"
                style={{ boxShadow: '0 8px 32px rgba(193,241,72,0.3)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Quero ser entregador
                <ArrowRight size={18} />
              </motion.a>

              <div className="flex flex-col gap-1.5">
                {TRUST.map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-lime/70 flex-shrink-0" />
                    <span className="text-white/40 text-[13px]">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Right: Phone ─── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <PhoneHomeScreen />

              {/* Floating: today earnings */}
              <motion.div
                className="absolute -left-4 lg:-left-20 top-28 bg-dark border border-white/15 rounded-2xl px-3.5 py-2.5 shadow-2xl hidden sm:block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-lime/15 flex items-center justify-center">
                      <Zap size={14} className="text-lime" />
                    </div>
                    <div>
                      <p className="text-white/35 text-[9px] uppercase tracking-wider">Hoje</p>
                      <p className="text-white font-bold text-[13px]">R$ 87,50</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating: new order */}
              <motion.div
                className="absolute -right-2 lg:-right-16 top-52 bg-lime/12 border border-lime/25 rounded-2xl px-3 py-2.5 shadow-xl hidden sm:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-lime"
                      style={{ boxShadow: '0 0 5px #c1f148' }}
                    />
                    <span className="text-lime text-[10px] font-bold">Novo pedido!</span>
                  </div>
                  <p className="text-white text-[11px] font-semibold">Farmácia Drogasil</p>
                  <p className="text-white/40 text-[10px]">R$ 11,00 · 1.8 km</p>
                </motion.div>
              </motion.div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 bg-lime/4 blur-3xl rounded-full scale-150" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </section>
  )
}
