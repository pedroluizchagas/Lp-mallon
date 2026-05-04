'use client'

const rowA = [
  { icon: '🍕', label: 'Pizzas' },
  { icon: '🛒', label: 'Mercados' },
  { icon: '💊', label: 'Farmácias' },
  { icon: '🍔', label: 'Burgers' },
  { icon: '🥗', label: 'Saladas' },
  { icon: '🍣', label: 'Japonês' },
  { icon: '☕', label: 'Cafés' },
  { icon: '🐾', label: 'Pet Shop' },
  { icon: '🍰', label: 'Docerias' },
  { icon: '🥤', label: 'Bebidas' },
  { icon: '🍗', label: 'Lanches' },
  { icon: '🌮', label: 'Mexicano' },
]

const rowB = [
  { icon: '🌟', label: 'Destaques' },
  { icon: '🥐', label: 'Padarias' },
  { icon: '🍦', label: 'Sorveterias' },
  { icon: '🥩', label: 'Açougues' },
  { icon: '🌺', label: 'Floricultura' },
  { icon: '🍱', label: 'Marmitas' },
  { icon: '🎂', label: 'Bolos' },
  { icon: '🧃', label: 'Sucos' },
  { icon: '🥪', label: 'Sanduíches' },
  { icon: '🍜', label: 'Massas' },
  { icon: '🥦', label: 'Hortifruti' },
  { icon: '🍷', label: 'Empório' },
]

function MarqueeItem({ icon, label, highlight }: { icon: string; label: string; highlight: boolean }) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <span className="text-2xl">{icon}</span>
      <span
        className={`font-jakarta font-semibold text-xl whitespace-nowrap tracking-tight ${
          highlight ? 'text-[#4CAF82]' : 'text-[#EDF7F2]/30'
        }`}
      >
        {label}
      </span>
      <span className="text-[#EDF7F2]/10 text-2xl mx-4 select-none">·</span>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }: { items: typeof rowA; reverse?: boolean }) {
  const doubled = [...items, ...items]

  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <MarqueeItem
            key={i}
            icon={item.icon}
            label={item.label}
            highlight={i % 4 === 0}
          />
        ))}
      </div>
    </div>
  )
}

export default function ConsumerMarquee() {
  return (
    <section className="bg-[#0B0F0D] py-10 overflow-hidden">
      {/* Top border */}
      <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent mb-8" />

      <div className="space-y-5">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>

      {/* Bottom border */}
      <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent mt-8" />
    </section>
  )
}
