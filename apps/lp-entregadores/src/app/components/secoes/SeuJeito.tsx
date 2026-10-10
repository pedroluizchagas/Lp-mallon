'use client'

import { useState } from 'react'
import { BlurIn, RevealLines, cn } from '@mallevo/ui'
import { CourierIcon, type CourierIconName } from '../marca/CourierIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

const VEICULOS = [
  { id: 'moto', rotulo: 'Moto', placa: true },
  { id: 'bicicleta', rotulo: 'Bicicleta', placa: false },
  { id: 'carro', rotulo: 'Carro', placa: true },
] as const

type Veiculo = (typeof VEICULOS)[number]['id']

/**
 * Do seu jeito — o que vale para todo entregador, em cartões: o interruptor
 * do modo online (de verdade: o visitante liga e desliga), os veículos do
 * cadastro, o pagamento no app, a localização só durante a entrega e o
 * cadastro gratuito.
 */
export function SeuJeito() {
  const [online, setOnline] = useState(true)
  const [veiculo, setVeiculo] = useState<Veiculo>('moto')
  const escolhido = VEICULOS.find((v) => v.id === veiculo) ?? VEICULOS[0]

  return (
    <section id="seu-jeito" className="relative px-5 pb-28 pt-12 md:px-8 lg:pb-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Do seu jeito</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Sem escala.',
                <span key="acesa" className="italic">
                  <span className="marca-texto">Sem horário mínimo.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <BlurIn delay={0.1}>
              <p className="text-[17px] leading-[1.65] text-ink-muted">
                O app não marca turno nem cobra presença. Você liga quando dá, entrega com o que tem e desliga quando quer.
              </p>
            </BlurIn>
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {/* O interruptor */}
          <BlurIn className="lg:col-span-7 lg:row-span-2">
            <article
              data-tema="escuro"
              className="grao relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[32px] bg-marquee p-7 text-white md:p-10"
            >
              <div
                aria-hidden
                className={cn(
                  'glow-marquise absolute inset-0 transition-opacity duration-700',
                  online ? 'opacity-100' : 'opacity-0',
                )}
              />
              <p className="micro relative text-white/55">Modo online</p>
              <div className="relative mt-auto flex flex-wrap items-end justify-between gap-8 pt-14">
                <div className="max-w-[440px]">
                  <h3 className="text-[clamp(32px,3.6vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em]">
                    {online ? (
                      <>
                        Online. <span className="italic text-accent">As lojas te veem.</span>
                      </>
                    ) : (
                      <>
                        Offline. <span className="italic text-white/55">Você sai da lista.</span>
                      </>
                    )}
                  </h3>
                  <p className="mt-5 text-[15.5px] leading-[1.6] text-white/66">
                    Ligado, você aparece na lista de entregadores disponíveis das lojas, que podem te chamar. Desligado,
                    ninguém te chama — e ninguém cobra.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={online}
                  aria-label="Modo online"
                  onClick={() => setOnline((v) => !v)}
                  className="flex flex-col items-end gap-3"
                >
                  <span
                    className={cn(
                      'relative flex h-[62px] w-[102px] items-center rounded-full p-[4px] transition-colors duration-300',
                      online ? 'bg-accent-strong' : 'bg-[#4C4F55]',
                    )}
                  >
                    <span
                      className={cn(
                        'size-[54px] rounded-full bg-white shadow-[0_6px_16px_rgb(0_0_0/0.3)] transition-transform duration-500 ease-[var(--ease-entrada)]',
                        online && 'translate-x-[40px]',
                      )}
                    />
                  </span>
                  <span className="font-mono text-[13px] font-semibold tracking-[0.1em] text-accent">
                    {online ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </button>
              </div>
            </article>
          </BlurIn>

          {/* Os veículos do cadastro */}
          <BlurIn delay={0.06} className="lg:col-span-5">
            <article className="flex h-full flex-col rounded-[32px] bg-white p-7 ring-1 ring-ink/[0.05] md:p-9">
              <p className="micro text-ink-muted">Seu veículo</p>
              <h3 className="mt-4 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Moto, bicicleta ou carro.
              </h3>
              <div className="mt-6 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Tipo de veículo">
                {VEICULOS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={veiculo === v.id}
                    onClick={() => setVeiculo(v.id)}
                    className={cn(
                      'rounded-[20px] border-[1.5px] px-5 py-3 text-[14px] font-semibold transition-colors duration-300',
                      veiculo === v.id
                        ? 'border-ink bg-ink text-accent'
                        : 'border-ink/10 bg-canvas text-ink-muted hover:border-ink/25 hover:text-ink',
                    )}
                  >
                    {v.rotulo}
                  </button>
                ))}
              </div>
              <p className="mt-auto flex items-center gap-2 pt-6 text-[14.5px] text-ink-muted" aria-live="polite">
                <CourierIcon name={escolhido.placa ? 'file' : 'check-circle'} size={17} className="text-ink" />
                {escolhido.placa ? `${escolhido.rotulo}: o cadastro pede a placa.` : `${escolhido.rotulo}: sem placa.`}
              </p>
            </article>
          </BlurIn>

          <Cartao
            atraso={0.1}
            className="lg:col-span-5"
            icone="cash"
            titulo="Sem dinheiro na mão."
            texto="O cliente paga no app, com Pix ou cartão. Você não recebe dinheiro nem dá troco."
          />
          <Cartao
            atraso={0.06}
            className="lg:col-span-6"
            icone="shield"
            titulo="Localização só durante a entrega."
            texto="Quem vê onde você está é o cliente e a loja daquele pedido — e só enquanto a entrega está em andamento."
          />
          <Cartao
            atraso={0.12}
            className="lg:col-span-6"
            icone="check-circle"
            titulo="Cadastro gratuito."
            texto="Sem mensalidade e sem taxa de adesão. O cadastro é todo pelo app."
            aceso
          />
        </div>
      </div>
    </section>
  )
}

function Cartao({
  icone,
  titulo,
  texto,
  className,
  atraso,
  aceso = false,
}: {
  icone: CourierIconName
  titulo: string
  texto: string
  className?: string
  atraso: number
  aceso?: boolean
}) {
  return (
    <BlurIn delay={atraso} className={className}>
      <article
        className={cn(
          'flex h-full gap-5 rounded-[32px] p-7 md:p-9',
          aceso ? 'bg-accent text-ink' : 'bg-white text-ink ring-1 ring-ink/[0.05]',
        )}
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-accent">
          <CourierIcon name={icone} size={21} strokeWidth={1.9} />
        </span>
        <span>
          <span className="block text-[22px] font-semibold leading-tight tracking-[-0.025em]">{titulo}</span>
          <span className={cn('mt-2 block text-[15px] leading-[1.6]', aceso ? 'text-ink/75' : 'text-ink-muted')}>{texto}</span>
        </span>
      </article>
    </BlurIn>
  )
}
