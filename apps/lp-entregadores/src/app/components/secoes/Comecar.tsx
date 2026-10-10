import { BlurIn, RevealLines, StackedCards, cn } from '@mallevo/ui'
import { APP_PUBLICADO } from '../../lib/links'
import { Celular } from '../app/Celular'
import { TelaCadastro, type EtapaCadastro } from '../app/TelaCadastro'
import { BotoesLojas } from '../marca/BotoesLojas'
import { CourierIcon } from '../marca/CourierIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

interface Passo {
  titulo: string
  texto: string
  itens: string[]
  escuro: boolean
  tela: EtapaCadastro
  rotulo: string
}

const PASSOS: Passo[] = [
  {
    titulo: 'Crie a conta',
    texto: 'No app Entregadores Mallevo, com e-mail e senha. O cadastro tem quatro etapas, uma por tela, e não custa nada.',
    itens: ['Cadastro só pelo app', 'Gratuito e sem mensalidade', 'Quatro etapas, uma por tela'],
    escuro: true,
    tela: 1,
    rotulo: 'Etapa 1 de 4 do cadastro no app: criar conta com e-mail e senha.',
  },
  {
    titulo: 'Seus dados e o veículo',
    texto: 'Nome, CPF e um telefone com WhatsApp. Depois, como você vai entregar — e a placa, se for de moto ou de carro.',
    itens: ['Nome, CPF e WhatsApp', 'Moto, bicicleta ou carro', 'Placa só para moto e carro'],
    escuro: false,
    tela: 3,
    rotulo: 'Etapa 3 de 4 do cadastro no app: escolher o veículo entre moto, bicicleta e carro.',
  },
  {
    titulo: 'Documentos e foto',
    texto: 'Uma foto de perfil e o número da CNH — hoje, pedido para todos os veículos. A foto da CNH é opcional.',
    itens: ['Foto de perfil', 'Número da CNH', 'Foto da CNH opcional'],
    escuro: true,
    tela: 4,
    rotulo: 'Etapa 4 de 4 do cadastro no app: foto de perfil, número da CNH e foto da CNH opcional.',
  },
  {
    titulo: 'A análise',
    texto:
      'A equipe do Mallevo confere o seu cadastro. Enquanto isso, o app verifica o status sozinho — aprovado, ele abre o Início e é só ficar online.',
    itens: ['Análise feita pela equipe', 'O app confere o status sozinho', 'Aprovado, é só ficar online'],
    escuro: false,
    tela: 'analise',
    rotulo: 'Tela "Cadastro em análise" do app, verificando o status automaticamente.',
  },
]

/** Como começar — as quatro etapas do cadastro do app, empilhadas como folhas. */
export function Comecar() {
  return (
    <section id="comecar" className="relative px-3 md:px-6">
      <div className="mx-auto max-w-[1440px] px-2 pb-6 pt-6 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Como começar</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Do cadastro',
                <span key="acesa" className="italic">
                  <span className="marca-texto">à primeira entrega.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <BlurIn delay={0.1}>
              <p className="text-[17px] leading-[1.65] text-ink-muted">
                {APP_PUBLICADO
                  ? 'O cadastro é todo no app Entregadores Mallevo: baixe, preencha as quatro etapas e aguarde a análise.'
                  : 'O cadastro é todo no app Entregadores Mallevo, que está chegando à App Store e ao Google Play.'}
              </p>
            </BlurIn>
          </div>
        </div>
      </div>

      <StackedCards cardClassName="rounded-[28px] md:rounded-[40px]">
        {PASSOS.map((passo, i) => (
          <article
            key={passo.titulo}
            data-tema={passo.escuro ? 'escuro' : 'claro'}
            className={cn(
              'mx-auto grid h-[min(82svh,720px)] w-full max-w-[1400px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[28px] md:grid-cols-2 md:grid-rows-1 md:rounded-[40px]',
              passo.escuro ? 'bg-marquee text-white' : 'bg-white text-ink ring-1 ring-ink/[0.06]',
            )}
          >
            <div className="relative flex min-h-0 flex-col p-6 md:p-10 lg:p-14">
              {passo.escuro && <div aria-hidden className="glow-marquise absolute inset-0" />}
              <span className={cn('relative font-mono text-[13px]', passo.escuro ? 'text-white/55' : 'text-ink-muted')}>
                {`{0${i + 1}}`}
              </span>
              <h3 className="relative mt-4 text-[clamp(32px,4.2vw,72px)] font-semibold leading-[0.95] tracking-[-0.045em] md:mt-6">
                {passo.titulo}
              </h3>
              <p
                className={cn(
                  'relative mt-4 max-w-[46ch] text-[15px] leading-[1.6] md:mt-6 md:text-[17px]',
                  passo.escuro ? 'text-white/66' : 'text-ink-muted',
                )}
              >
                {passo.texto}
              </p>
              <ul className="relative mt-auto hidden space-y-2.5 pt-8 text-[15px] font-semibold md:block">
                {passo.itens.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full',
                        passo.escuro ? 'bg-accent' : 'bg-ink',
                      )}
                    >
                      <CourierIcon name="check" size={11} color={passo.escuro ? '#111216' : '#D8FF3E'} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {i === 0 && <BotoesLojas className="relative mt-6 hidden md:mt-8 md:flex" />}
            </div>
            <div
              className={cn(
                // No celular a tela sai de baixo do texto, cortada pela borda do cartão; em tela baixa, sai.
                'relative flex min-h-0 justify-center overflow-hidden px-5 pt-2 max-md:[@media(max-height:719px)]:hidden md:items-center md:p-10',
                passo.escuro ? 'bg-white/[0.03]' : 'bg-canvas',
              )}
            >
              <Celular rotulo={passo.rotulo} className="[--k:0.5] md:[--k:0.6] lg:[--k:0.66] xl:[--k:0.72]">
                <TelaCadastro etapa={passo.tela} />
              </Celular>
            </div>
          </article>
        ))}
      </StackedCards>

      <div className="h-24 lg:h-32" />
    </section>
  )
}
