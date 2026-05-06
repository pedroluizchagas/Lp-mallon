import { Navbar, Footer } from '@mallevo/ui'
import Hero from './components/sections/Hero'
import ComoFunciona from './components/sections/ComoFunciona'
import DiferenciaisLojista from './components/sections/DiferenciaisLojista'
import DashboardPreview from './components/sections/DashboardPreview'
import Planos from './components/sections/Planos'
import ParaConsumidores from './components/sections/ParaConsumidores'
import ParaEntregadores from './components/sections/ParaEntregadores'
import Depoimentos from './components/sections/Depoimentos'
import Faq from './components/sections/Faq'
import CtaFinal from './components/sections/CtaFinal'

export default function LojistasPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <DiferenciaisLojista />
        <DashboardPreview />
        <Planos />
        <ParaConsumidores />
        <ParaEntregadores />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
