import CustomCursor from '@/components/consumidor/CustomCursor'
import ConsumerStickyHeader from '@/components/consumidor/ConsumerStickyHeader'
import ConsumerHero from '@/components/consumidor/ConsumerHero'
import ConsumerMarquee from '@/components/consumidor/ConsumerMarquee'
import ConsumerScrollText from '@/components/consumidor/ConsumerScrollText'
import ConsumerComoFunciona from '@/components/consumidor/ConsumerComoFunciona'
import ConsumerCategorias from '@/components/consumidor/ConsumerCategorias'
import ConsumerApp from '@/components/consumidor/ConsumerApp'
import ConsumerDepoimentos from '@/components/consumidor/ConsumerDepoimentos'
import ConsumerCta from '@/components/consumidor/ConsumerCta'
import ConsumerFooter from '@/components/consumidor/ConsumerFooter'

export default function ConsumerPage() {
  return (
    <div className="dark-page hide-cursor bg-[#0B0F0D] min-h-screen">
      <CustomCursor />
      <ConsumerStickyHeader />
      <main>
        <ConsumerHero />
        <ConsumerMarquee />
        <ConsumerScrollText />
        <ConsumerComoFunciona />
        <ConsumerCategorias />
        <ConsumerApp />
        <ConsumerDepoimentos />
        <ConsumerCta />
      </main>
      <ConsumerFooter />
    </div>
  )
}
