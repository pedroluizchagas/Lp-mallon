import { Navbar, Footer } from '@mallevo/ui'
import EntregadorHero from './components/sections/EntregadorHero'
import EntregadorBeneficios from './components/sections/EntregadorBeneficios'
import EntregadorComoFunciona from './components/sections/EntregadorComoFunciona'
import EntregadorGanhos from './components/sections/EntregadorGanhos'
import EntregadorFaq from './components/sections/EntregadorFaq'
import EntregadorCta from './components/sections/EntregadorCta'

export default function EntregadoresPage() {
  return (
    <>
      <Navbar
        links={[
          { label: 'Benefícios', href: '#beneficios' },
          { label: 'Como funciona', href: '#como-funciona' },
          { label: 'Ganhos', href: '#ganhos' },
          { label: 'FAQ', href: '#faq' },
        ]}
        ctaLabel="Quero ser entregador"
        ctaUrl={process.env.NEXT_PUBLIC_CADASTRO_URL ?? 'https://app.mallevo.com.br/entregador/cadastro'}
      />
      <main>
        <EntregadorHero />
        <EntregadorBeneficios />
        <EntregadorComoFunciona />
        <EntregadorGanhos />
        <EntregadorFaq />
        <EntregadorCta />
      </main>
      <Footer
        columns={[
          {
            title: 'Entregadores',
            links: [
              { label: 'Como funciona', href: '#como-funciona' },
              { label: 'Quanto posso ganhar', href: '#ganhos' },
              { label: 'Perguntas frequentes', href: '#faq' },
            ],
          },
          {
            title: 'Plataforma',
            links: [
              { label: 'Para consumidores', href: 'https://mallevo.com.br' },
              { label: 'Para parceiros', href: 'https://parceiros.mallevo.com.br' },
            ],
          },
        ]}
      />
    </>
  )
}
