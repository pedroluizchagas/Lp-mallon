import { BlurIn, RevealLines } from '@mallevo/ui'
import { Celular } from '../app/Celular'
import { TelaExplorar } from '../app/TelaExplorar'
import { ConsumerIcon, type ConsumerIconName } from '../marca/ConsumerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const RECURSOS: { icone: ConsumerIconName; titulo: string; texto: string }[] = [
  {
    icone: 'comment',
    titulo: 'Comentários ao vivo',
    texto: 'Pergunte se entrega no seu bairro. A loja responde ali mesmo, na conversa.',
  },
  {
    icone: 'heart',
    titulo: 'Curtir é favoritar',
    texto: 'O coração guarda o post nos seus Favoritos — para pedir quando der vontade.',
  },
  {
    icone: 'users',
    titulo: 'Seguindo',
    texto: 'Siga as lojas que você gosta e veja só o que elas publicam.',
  },
  {
    icone: 'bag',
    titulo: 'Do vídeo à sacola',
    texto: 'O produto do post fica a um toque, com o preço já na tela.',
  },
]

/**
 * Explorar — os reels das lojas. Um painel de vídeo dentro da folha (a tela
 * escura do app emoldurada no salão claro), com o celular no modo
 * comentários: a conversa ao vivo rolando.
 */
export function Explorar() {
  return (
    <section id="explorar" className="relative px-3 py-6 md:px-6">
      <div
        data-tema="escuro"
        className="grao relative overflow-hidden rounded-[32px] bg-marquee text-white md:rounded-[48px]"
      >
        <div aria-hidden className="glow-marquise absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-16 px-6 py-20 md:px-12 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <div className="lg:col-span-6">
            <Sobrelinha aoVivo>Explorar · ao vivo</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(38px,5.4vw,92px)] font-semibold leading-[0.95] tracking-[-0.045em]"
              lines={[
                'Veja a loja',
                <span key="acesa" className="italic text-accent">
                  antes de pedir.
                </span>,
              ]}
            />
            <BlurIn delay={0.1}>
              <p className="mt-8 max-w-[520px] text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-white/66">
                No Explorar, as próprias lojas mostram o que estão fazendo agora: o burger saindo da chapa, o buquê
                montado de manhã, o banho e tosa do dia. Comente, pergunte, curta — e peça sem sair do vídeo.
              </p>
            </BlurIn>
            <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {RECURSOS.map((recurso, i) => (
                <li key={recurso.titulo}>
                  <BlurIn delay={0.08 * i}>
                    <span className="flex size-11 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10">
                      <ConsumerIcon name={recurso.icone} size={20} strokeWidth={1.8} />
                    </span>
                    <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em]">{recurso.titulo}</p>
                    <p className="mt-1.5 text-[14.5px] leading-[1.6] text-white/55">{recurso.texto}</p>
                  </BlurIn>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex justify-center lg:col-span-5 lg:col-start-8">
            <div
              aria-hidden
              className="absolute -inset-x-[20%] bottom-[-10%] h-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(193_241_72/0.22),transparent)] blur-2xl"
            />
            <BlurIn y={40}>
              <Celular
                rotulo="O Explorar do app Mallevo em modo comentários: o vídeo da Burger House DV com a conversa ao vivo e a resposta da loja."
                className="[--k:0.7] sm:[--k:0.78] xl:[--k:0.84]"
              >
                <TelaExplorar />
              </Celular>
            </BlurIn>
          </div>
        </div>
      </div>
    </section>
  )
}
