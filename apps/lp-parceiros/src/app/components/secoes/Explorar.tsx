'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BlurIn, RevealLines, useSafeReducedMotion } from '@mallevo/ui'
import { POST_DEMO } from '../../dados/conteudo'
import { Celular } from '../app/Celular'
import { TelaExplorarCliente } from '../app/TelaExplorarCliente'
import { TelaPublicar, type PassoPublicar } from '../app/TelaPublicar'
import { PartnerIcon, type PartnerIconName } from '../marca/PartnerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const RECURSOS: { icone: PartnerIconName; titulo: string; texto: string }[] = [
  {
    icone: 'camera',
    titulo: 'Câmera ou galeria',
    texto: 'Foto ou vídeo de até 60 segundos, direto do celular — ou pelo painel, no computador.',
  },
  {
    icone: 'bag',
    titulo: 'Do post à sacola',
    texto: 'Vincule um produto: o preço aparece no post e o cliente pede dali.',
  },
  {
    icone: 'route',
    titulo: 'Envio que não se perde',
    texto: 'Se a rede cair no meio do vídeo, o envio retoma de onde parou.',
  },
  {
    icone: 'eye',
    titulo: 'Quantos viram',
    texto: 'Em Meu conteúdo, cada post mostra as visualizações — e some do feed quando você quiser.',
  },
]

/** O roteiro do celular do lojista, em ms desde o começo do ciclo. */
const ROTEIRO: { passo: PassoPublicar; em: number }[] = [
  { passo: 'origem', em: 0 },
  { passo: 'detalhes', em: 2600 },
  { passo: 'enviando', em: 7000 },
  { passo: 'publicado', em: 9400 },
]
const CICLO = 14_000
const DIGITACAO = { inicio: 3000, duracao: 3400 }
const ENVIO = { inicio: 7000, duracao: 2200 }

/**
 * Explorar — o lojista publica, o shopping vê. Dois celulares lado a lado:
 * a aba Publicar do app do lojista andando sozinha (origem → post → envio →
 * publicado) e, quando o post sai, o Explorar de quem compra rolando até ele.
 */
export function Explorar() {
  const ref = useRef<HTMLDivElement>(null)
  const visivel = useInView(ref, { margin: '0px 0px -15% 0px' })
  const reduce = useSafeReducedMotion()
  const [tempo, setTempo] = useState(0)

  useEffect(() => {
    if (!visivel || reduce) return
    const inicio = performance.now() - tempo
    let quadro = 0
    let ultimo = -1
    const andar = (agora: number) => {
      const t = (agora - inicio) % CICLO
      // 10 quadros por segundo bastam para a digitação e a barra de envio.
      const passo = Math.floor(t / 100)
      if (passo !== ultimo) {
        ultimo = passo
        setTempo(t)
      }
      quadro = requestAnimationFrame(andar)
    }
    quadro = requestAnimationFrame(andar)
    return () => cancelAnimationFrame(quadro)
    // `tempo` fica de fora de propósito: só o ponto de partida ao (re)entrar na tela.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visivel, reduce])

  const t = reduce ? CICLO - 1 : tempo
  const passo = [...ROTEIRO].reverse().find((r) => t >= r.em)?.passo ?? 'origem'
  const legenda = Math.round(
    Math.min(1, Math.max(0, (t - DIGITACAO.inicio) / DIGITACAO.duracao)) * POST_DEMO.descricao.length,
  )
  const progresso = Math.min(1, Math.max(0, (t - ENVIO.inicio) / ENVIO.duracao))
  const publicado = passo === 'publicado'

  return (
    <section id="explorar" className="relative px-3 py-6 md:px-6">
      <div data-tema="escuro" className="grao relative overflow-hidden rounded-[32px] bg-marquee text-white md:rounded-[48px]">
        <div aria-hidden className="glow-marquise absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1320px] gap-14 px-6 py-20 md:px-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 lg:py-28">
          <div className="min-w-0 lg:col-span-5 lg:self-end">
            <Sobrelinha aoVivo>Explorar · publicar</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(38px,4.6vw,76px)] font-semibold leading-[0.95] tracking-[-0.045em]"
              lines={[
                'Postou agora,',
                <span key="acesa" className="italic text-accent">
                  vende do post.
                </span>,
              ]}
            />
            <BlurIn delay={0.1}>
              <p className="mt-8 max-w-[520px] text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-white/66">
                O Explorar é o feed das lojas no app de quem compra. Fotografe o lote que chegou, grave o produto saindo
                pronto, marque o item e publique: o post entra na hora, com o seu produto a um toque da sacola.
              </p>
            </BlurIn>
          </div>

          <div ref={ref} className="relative min-w-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div
              aria-hidden
              className="absolute -inset-x-[10%] bottom-[-8%] h-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(193_241_72/0.2),transparent)] blur-2xl"
            />
            <BlurIn y={40}>
              <div className="relative flex items-start justify-center gap-2.5 sm:gap-6 lg:justify-end xl:gap-10">
                <figure className="flex flex-col items-center">
                  <Celular
                    rotulo={`A aba Publicar do app do lojista: ${
                      publicado ? 'post publicado no Explorar' : 'um post do Café Aroma sendo preparado e enviado'
                    }.`}
                    className="[--k:0.33] min-[380px]:[--k:0.36] sm:[--k:0.56] lg:[--k:0.6] xl:[--k:0.68]"
                  >
                    <TelaPublicar passo={passo} progresso={progresso} legenda={reduce ? POST_DEMO.descricao.length : legenda} />
                  </Celular>
                  <figcaption className="micro mt-5 text-center text-white/55">App do lojista · Publicar</figcaption>
                </figure>

                <figure className="mt-16 flex flex-col items-center sm:mt-24">
                  <div className="relative">
                    <Celular
                      rotulo={`O Explorar no app de quem compra: ${
                        publicado ? 'o post do Café Aroma no topo do feed, com o produto a um toque da sacola' : 'o feed de posts das lojas'
                      }.`}
                      className="[--k:0.33] min-[380px]:[--k:0.36] sm:[--k:0.52] lg:[--k:0.54] xl:[--k:0.62]"
                    >
                      <TelaExplorarCliente publicado={publicado} />
                    </Celular>
                    <span
                      aria-hidden
                      className={`absolute -left-3 top-[18%] flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[12px] font-extrabold text-ink shadow-[0_12px_30px_-10px_rgb(193_241_72/0.7)] transition-[opacity,transform] duration-500 ease-[var(--ease-entrada)] sm:-left-6 ${
                        publicado ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                    >
                      <PartnerIcon name="check" size={13} strokeWidth={2.6} />
                      Novo no feed
                    </span>
                  </div>
                  <figcaption className="micro mt-5 text-center text-white/55">App de quem compra · Explorar</figcaption>
                </figure>
              </div>
            </BlurIn>
          </div>

          <ul className="grid min-w-0 gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-5 lg:row-start-2 lg:mt-12 lg:self-start">
            {RECURSOS.map((recurso, i) => (
              <li key={recurso.titulo}>
                <BlurIn delay={0.08 * i}>
                  <span className="flex size-11 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10">
                    <PartnerIcon name={recurso.icone} size={20} strokeWidth={1.8} />
                  </span>
                  <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em]">{recurso.titulo}</p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-white/55">{recurso.texto}</p>
                </BlurIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
