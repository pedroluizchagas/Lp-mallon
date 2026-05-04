import CustomCursor from './components/sections/CustomCursor'
import ConsumerStickyHeader from './components/sections/ConsumerStickyHeader'
import ConsumerHero from './components/sections/ConsumerHero'
import ConsumerMarquee from './components/sections/ConsumerMarquee'
import ConsumerScrollText from './components/sections/ConsumerScrollText'
import ConsumerComoFunciona from './components/sections/ConsumerComoFunciona'
import ConsumerCategorias from './components/sections/ConsumerCategorias'
import ConsumerApp from './components/sections/ConsumerApp'
import ConsumerDepoimentos from './components/sections/ConsumerDepoimentos'
import ConsumerCta from './components/sections/ConsumerCta'
import ConsumerFooter from './components/sections/ConsumerFooter'

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
