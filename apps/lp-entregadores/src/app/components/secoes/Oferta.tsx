import { BlurIn, RevealLines, cn } from '@mallevo/ui'
import { OFERTA_DEMO } from '../../dados/rua'
import { CartaoOferta } from '../app/CartaoOferta'
import { CourierIcon, type CourierIconName } from '../marca/CourierIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const PARTES: { icone: CourierIconName; titulo: string; texto: string; lado: 'esquerda' | 'direita' }[] = [
  {
    icone: 'cash',
    titulo: 'O valor da entrega',
    texto: 'É a taxa de entrega que a loja definiu para o pedido — e vem antes de tudo no cartão.',
    lado: 'esquerda',
  },
  {
    icone: 'store',
    titulo: 'De onde sai',
    texto: 'A loja e o endereço da coleta: rua, número e bairro.',
    lado: 'esquerda',
  },
  {
    icone: 'pin',
    titulo: 'Para onde vai',
    texto: 'O endereço do cliente. Depois do aceite, a rota abre no Google Maps com um toque.',
    lado: 'direita',
  },
  {
    icone: 'check',
    titulo: 'A decisão é sua',
    texto: 'Aceitar entrega ou recusar. Ninguém aceita por você.',
    lado: 'direita',
  },
]

/**
 * A oferta — o cartão de entrega do app em tamanho grande, com as partes
 * explicadas em volta: valor, coleta, destino e as duas respostas.
 */
export function Oferta() {
  return (
    <section id="oferta" className="relative overflow-x-clip px-5 pb-28 pt-[calc(30vh+7rem)] md:px-8 lg:pb-40 lg:pt-[calc(30vh+9rem)]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">A oferta</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Você vê o valor',
                <span key="acesa" className="italic">
                  <span className="marca-texto">antes de aceitar.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <BlurIn delay={0.1}>
              <p className="text-[17px] leading-[1.65] text-ink-muted">
                Quando você está online, as lojas do Mallevo te veem na lista de entregadores disponíveis e podem te
                chamar. A entrega chega no app com o que importa para decidir — e quem decide é você.
              </p>
            </BlurIn>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <ul className="order-2 space-y-8 lg:order-1 lg:col-span-3">
            {PARTES.filter((p) => p.lado === 'esquerda').map((parte, i) => (
              <Parte key={parte.titulo} {...parte} atraso={0.08 * i} />
            ))}
          </ul>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-6">
            <BlurIn y={40} className="w-full max-w-[520px]">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-x-[12%] bottom-[-12%] h-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(17_18_22/0.18),transparent)] blur-2xl"
                />
                <div role="img" aria-label={`Cartão de oferta do app do entregador: entrega de ${OFERTA_DEMO.valor}, coletar em ${OFERTA_DEMO.loja} e entregar na ${OFERTA_DEMO.clienteEndereco}.`}>
                  <div aria-hidden className="[zoom:1.12] sm:[zoom:1.3]">
                    <CartaoOferta oferta={OFERTA_DEMO} className="shadow-[0_50px_100px_-40px_rgb(17_18_22/0.6)]" />
                  </div>
                </div>
              </div>
            </BlurIn>
          </div>

          <ul className="order-3 space-y-8 lg:col-span-3">
            {PARTES.filter((p) => p.lado === 'direita').map((parte, i) => (
              <Parte key={parte.titulo} {...parte} atraso={0.08 * (i + 2)} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Parte({
  icone,
  titulo,
  texto,
  lado,
  atraso,
}: {
  icone: CourierIconName
  titulo: string
  texto: string
  lado: 'esquerda' | 'direita'
  atraso: number
}) {
  return (
    <li>
      <BlurIn delay={atraso} className={cn('flex gap-4', lado === 'esquerda' && 'lg:flex-row-reverse lg:text-right')}>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-accent">
          <CourierIcon name={icone} size={19} strokeWidth={1.9} />
        </span>
        <span>
          <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{titulo}</span>
          <span className="mt-1.5 block text-[14.5px] leading-[1.6] text-ink-muted">{texto}</span>
        </span>
      </BlurIn>
    </li>
  )
}
