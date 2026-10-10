import { BlurIn, RevealLines } from '@mallevo/ui'
import { LINKS } from '../../lib/links'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'

const LADOS = [
  {
    titulo: 'Para quem compra',
    texto: 'Peça, acompanhe e descubra o que a cidade tem de bom — sem baixar um app para cada loja.',
    itens: ['Pisos e corredores', 'Vitrines das lojas', 'Explorar e Seguindo', 'Favoritos', 'Pedido ao vivo'],
    cta: 'Baixar o app',
    href: '#baixar',
    externo: false,
  },
  {
    titulo: 'Para quem vende',
    texto: 'Sua loja no shopping da cidade, com a sua cara: vitrine própria, posts no Explorar e os pedidos num painel só.',
    itens: ['Vitrine com a pele da loja', 'Endereço próprio na web', 'Posts no Explorar', 'Pedidos, catálogo e estoque'],
    cta: 'Mallevo para lojistas',
    href: LINKS.parceiros,
    externo: true,
  },
  {
    titulo: 'Para quem entrega',
    texto: 'Entregue pela sua cidade, no seu horário, com os pedidos, a rota e os ganhos no app do entregador.',
    itens: ['App do entregador', 'Pedidos perto de você', 'Rota no mapa', 'Ganhos no app'],
    cta: 'Quero entregar',
    href: LINKS.entregadores,
    externo: true,
  },
]

/** Os três lados do balcão — a lista numerada de serviços da referência, na voz do shopping. */
export function ParaTodos() {
  return (
    <section id="para-todos" className="relative px-5 py-28 md:px-8 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <Sobrelinha tom="claro">Para todo mundo</Sobrelinha>
        <RevealLines
          as="h2"
          className="mt-6 text-[clamp(34px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
          lines={[
            'Um shopping se faz',
            <span key="acesa" className="italic">
              <span className="marca-texto">com a cidade inteira.</span>
            </span>,
          ]}
        />

        <ul className="mt-16 border-t border-ink/10 lg:mt-24">
          {LADOS.map((lado, i) => (
            <li key={lado.titulo} className="border-b border-ink/10">
              <BlurIn className="grid gap-6 py-10 md:grid-cols-12 md:gap-6 md:py-14">
                <span className="font-mono text-[13px] text-ink-muted md:col-span-1 md:pt-3">{`{0${i + 1}}`}</span>
                <div className="md:col-span-5">
                  <h3 className="text-[clamp(30px,3.4vw,54px)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
                    {lado.titulo} —
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-[16.5px] leading-[1.6] text-ink-muted">{lado.texto}</p>
                </div>
                <ul className="space-y-2 text-[15px] font-medium text-ink-muted md:col-span-3 md:pt-3">
                  {lado.itens.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="size-1.5 rounded-full bg-ink/30" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-3 md:flex md:justify-end md:pt-2">
                  <Botao href={lado.href} externo={lado.externo} variante={i === 0 ? 'tinta' : 'contorno'}>
                    {lado.cta}
                  </Botao>
                </div>
              </BlurIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
