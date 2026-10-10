import Image from 'next/image'
import { BlurIn, RevealLines } from '@mallevo/ui'
import { POSTS } from '../../dados/shopping'
import { LINKS } from '../../lib/links'
import { BotoesLojas } from '../marca/BotoesLojas'
import { Sobrelinha } from '../ui/Sobrelinha'

/**
 * A saída do shopping: a marquise volta a subir por cima da folha, acesa,
 * com a passarela correndo ao fundo. O rodapé continua a mesma fachada.
 */
export function Chamada() {
  const publicado = Boolean(LINKS.appStore || LINKS.playStore)

  return (
    <section
      id="baixar"
      data-tema="escuro"
      className="grao relative z-20 -mt-14 overflow-hidden rounded-t-[36px] bg-marquee text-white md:-mt-20 md:rounded-t-[64px]"
    >
      {/* Só o neon de cima: o de baixo fica com o rodapé, sem emenda entre os dois. */}
      <div
        aria-hidden
        className="absolute inset-0 animate-respira bg-[radial-gradient(ellipse_72%_62%_at_88%_-8%,rgb(193_241_72/0.22),rgb(193_241_72/0.08)_45%,transparent_75%)]"
      />

      {/* A passarela passando ao fundo, apagada */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[34%] opacity-[0.16] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]"
      >
        <div className="flex w-max animate-trilho gap-4">
          {[...POSTS.slice(0, 8), ...POSTS.slice(0, 8)].map((post, i) => (
            <div key={`${post.id}-${i}`} className="relative aspect-[1/1.56] w-[150px] overflow-hidden rounded-[22px] md:w-[190px]">
              <Image src={post.foto} alt="" fill sizes="190px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-28 pt-32 text-center md:px-8 md:pt-44">
        <Sobrelinha aoVivo className="justify-center">
          O shopping está aceso
        </Sobrelinha>
        <RevealLines
          as="h2"
          className="mx-auto mt-8 text-[clamp(52px,10.4vw,188px)] font-semibold leading-[0.9] tracking-[-0.055em] [word-spacing:0.08em]"
          lines={[
            'A cidade inteira,',
            <span key="acesa" className="italic text-accent">
              na sua mão.
            </span>,
          ]}
        />
        <BlurIn delay={0.15}>
          <p className="mx-auto mt-10 max-w-[480px] text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-white/66">
            {publicado
              ? 'Baixe o Mallevo e entre no shopping de Divinópolis. É gratuito.'
              : 'O app do Mallevo está chegando à App Store e ao Google Play — gratuito e feito em Divinópolis.'}
          </p>
          <BotoesLojas className="mt-10 justify-center" />
        </BlurIn>
      </div>
    </section>
  )
}
