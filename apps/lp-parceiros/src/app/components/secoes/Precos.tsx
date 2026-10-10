'use client'

import { useId, useState } from 'react'
import { BlurIn, RevealLines, cn } from '@mallevo/ui'
import { reais } from '../../dados/balcao'
import { LINKS } from '../../lib/links'
import type { Plano } from '../../lib/planos'
import { PartnerIcon } from '../marca/PartnerIcon'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'

/** A comissão do Mallevo sobre cada pedido, em %. */
const COMISSAO = 9.1

const PARA_TODOS = [
  'Comissão de 9,1% por pedido, em todos os planos',
  '15 dias de teste — o cadastro não pede cartão',
  'Vitrine, endereço na web, Explorar, app e painel',
]

/**
 * Quanto custa — uma comissão de um dígito. O simulador faz a conta com os
 * números do próprio visitante (inclusive o percentual que ele paga hoje):
 * mensalidade do plano + 9,1% de cada pedido, sem esconder o caso em que o
 * outro percentual sai mais barato. Os planos vêm do banco (lib/planos).
 */
export function Precos({ planos }: { planos: Plano[] | null }) {
  return (
    <section id="precos" className="relative px-5 py-28 md:px-8 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Quanto custa</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Uma comissão',
                <span key="acesa" className="italic">
                  <span className="marca-texto">de um dígito.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[clamp(72px,7.6vw,128px)] font-semibold leading-none tracking-[-0.06em] text-ink">
              9,1<span className="text-[0.5em] tracking-[-0.03em]">%</span>
            </p>
            <BlurIn delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-muted">
                Sobre cada pedido pago — menos de um décimo da venda. Além dela, só a mensalidade do plano que você
                escolher: sem taxa de adesão.
              </p>
            </BlurIn>
          </div>
        </div>

        <Simulador planos={planos} />

        {planos ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {planos.map((plano, i) => (
              <li key={plano.nome}>
                <BlurIn delay={0.06 * i} className="h-full">
                  <div className="flex h-full flex-col rounded-[28px] bg-white p-7 shadow-[0_20px_50px_-30px_rgb(17_18_22/0.35)] ring-1 ring-ink/[0.05]">
                    <p className="micro text-ink-muted">{plano.nome}</p>
                    <p className="mt-5 flex items-baseline gap-1.5">
                      <span className="text-[clamp(34px,3vw,44px)] font-semibold tracking-[-0.04em] text-ink">
                        {reais(plano.precoMensal)}
                      </span>
                      <span className="text-[14px] font-semibold text-ink-muted">/mês</span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5 border-t border-ink/10 pt-6 text-[15px] text-ink">
                      <li className="flex items-center gap-2.5">
                        <Marca />
                        Até {plano.maxProdutos.toLocaleString('pt-BR')} produtos
                      </li>
                      {plano.temEstoque && (
                        <li className="flex items-center gap-2.5">
                          <Marca />
                          Controle de estoque
                        </li>
                      )}
                      {plano.temRelatorios && (
                        <li className="flex items-center gap-2.5">
                          <Marca />
                          Relatórios avançados
                        </li>
                      )}
                      {plano.temAntecipacao && (
                        <li className="flex items-center gap-2.5">
                          <Marca />
                          Antecipação de recebíveis
                        </li>
                      )}
                    </ul>
                    <Botao href={LINKS.cadastro} externo variante={i === 0 ? 'tinta' : 'contorno'} className="mt-8 w-full">
                      Começar com o {plano.nome}
                    </Botao>
                  </div>
                </BlurIn>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 lg:grid-cols-12">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-semibold text-ink lg:col-span-8">
            {PARA_TODOS.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Marca />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[13px] leading-relaxed text-ink-muted lg:col-span-4">
            {planos
              ? 'Os planos são os mesmos do cadastro e mudam aqui quando mudam lá. '
              : 'Os planos e preços aparecem no último passo do cadastro. '}
            O pagamento do cliente é processado pela Pagar.me, e as tarifas dela saem da sua parte da venda.
          </p>
        </div>
      </div>
    </section>
  )
}

function Marca() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-ink">
      <PartnerIcon name="check" size={11} color="#D8FF3E" strokeWidth={3} />
    </span>
  )
}

function Simulador({ planos }: { planos: Plano[] | null }) {
  const [pedidos, setPedidos] = useState(300)
  const [ticket, setTicket] = useState(60)
  const [percentual, setPercentual] = useState(15)
  const [indicePlano, setIndicePlano] = useState(0)
  const grupo = useId()

  const plano = planos?.[indicePlano] ?? null
  const vendas = pedidos * ticket * 100
  const comissoes = Math.round((vendas * COMISSAO) / 100)
  const mallevo = (plano?.precoMensal ?? 0) + comissoes
  const percentualMes = Math.round((vendas * percentual) / 100)
  const diferenca = percentualMes - mallevo

  return (
    <div data-tema="escuro" className="grao relative mt-16 overflow-hidden rounded-[32px] bg-marquee text-white md:rounded-[48px] lg:mt-24">
      <div aria-hidden className="glow-marquise absolute inset-0" />
      <div className="relative grid gap-12 p-6 py-10 md:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16">
        <div className="lg:col-span-5">
          <p className="micro text-accent">Faça a conta</p>
          <p className="mt-4 text-[clamp(26px,2.4vw,36px)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Com os números da sua loja.
          </p>

          <div className="mt-10 space-y-8">
            <Regua
              rotulo="Pedidos por mês"
              valor={pedidos}
              exibir={pedidos.toLocaleString('pt-BR')}
              min={20}
              max={1500}
              passo={10}
              aoMudar={setPedidos}
            />
            <Regua
              rotulo="Valor médio do pedido"
              valor={ticket}
              exibir={reais(ticket * 100)}
              min={15}
              max={250}
              passo={1}
              aoMudar={setTicket}
            />
            <Regua
              rotulo="Comissão percentual que você paga hoje"
              valor={percentual}
              exibir={`${percentual}%`}
              min={0}
              max={30}
              passo={1}
              aoMudar={setPercentual}
            />
          </div>

          {planos && (
            <div className="mt-9">
              <p className="micro text-white/55" id={grupo}>
                Plano no Mallevo
              </p>
              <div role="radiogroup" aria-labelledby={grupo} className="mt-3 flex flex-wrap gap-2">
                {planos.map((p, i) => (
                  <button
                    key={p.nome}
                    type="button"
                    role="radio"
                    aria-checked={i === indicePlano}
                    onClick={() => setIndicePlano(i)}
                    className={cn(
                      'rounded-full px-4 py-2 text-[14px] font-bold transition-colors duration-300',
                      i === indicePlano ? 'bg-accent text-ink' : 'bg-white/[0.08] text-white ring-1 ring-inset ring-white/10 hover:bg-white/[0.13]',
                    )}
                  >
                    {p.nome}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7" aria-live="polite">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-6">
              <p className="micro text-white/55">Comissão de {percentual}%</p>
              <p className="mt-4 text-[clamp(28px,2.6vw,40px)] font-semibold tabular-nums tracking-[-0.04em] text-white/70">
                {reais(percentualMes)}
              </p>
              <p className="mt-1 text-[13px] text-white/55">por mês, sobre {reais(vendas)} em vendas</p>
            </div>
            <div className="rounded-[24px] border border-[rgb(216_255_62/0.34)] bg-white/[0.08] p-6">
              <p className="micro text-accent">No Mallevo{plano ? ` · ${plano.nome}` : ''}</p>
              <p className="mt-4 text-[clamp(28px,2.6vw,40px)] font-semibold tabular-nums tracking-[-0.04em]">{reais(mallevo)}</p>
              <p className="mt-1 text-[13px] text-white/55">
                {plano ? `${reais(plano.precoMensal)} do plano + ` : ''}
                {reais(comissoes)} de comissão (9,1%)
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] bg-accent p-6 text-ink md:p-7">
            {diferenca > 0 ? (
              <>
                <p className="micro">Fica com você</p>
                <p className="mt-3 text-[clamp(34px,3.4vw,54px)] font-semibold leading-none tabular-nums tracking-[-0.045em]">
                  {reais(diferenca)}
                  <span className="text-[0.4em] tracking-[-0.02em]"> por mês</span>
                </p>
                <p className="mt-3 text-[14.5px] font-medium text-ink/70">
                  É o que deixa de sair para a plataforma, com {pedidos.toLocaleString('pt-BR')} pedidos de {reais(ticket * 100)}.
                </p>
              </>
            ) : (
              <>
                <p className="micro">{percentual <= COMISSAO ? 'Com a sua comissão de hoje' : 'Com esse volume'}</p>
                <p className="mt-3 text-[clamp(24px,2.2vw,32px)] font-semibold leading-tight tracking-[-0.03em]">
                  {diferenca === 0
                    ? 'As duas contas empatam.'
                    : `A comissão de ${percentual}% sai ${reais(-diferenca)} mais barata por mês.`}
                </p>
                <p className="mt-3 text-[14.5px] font-medium text-ink/70">
                  {percentual <= COMISSAO
                    ? 'Ela já fica abaixo dos 9,1% do Mallevo — aqui a conta não fecha a nosso favor.'
                    : 'A mensalidade é fixa: quanto mais a loja vende, menos ela pesa — mexa nos números.'}
                </p>
              </>
            )}
          </div>

          <p className="mt-5 text-[12.5px] leading-relaxed text-white/55">
            Simulação com os números que você informou. No Mallevo, o custo é a mensalidade do plano mais 9,1% de cada
            pedido; as tarifas do meio de pagamento (Pagar.me) ficam fora da conta.
          </p>
        </div>
      </div>
    </div>
  )
}

function Regua({
  rotulo,
  valor,
  exibir,
  min,
  max,
  passo,
  aoMudar,
}: {
  rotulo: string
  valor: number
  exibir: string
  min: number
  max: number
  passo: number
  aoMudar: (v: number) => void
}) {
  const id = useId()
  const p = ((valor - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14.5px] font-semibold text-white/70">
          {rotulo}
        </label>
        <span className="font-mono text-[18px] font-medium tabular-nums">{exibir}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        aria-valuetext={exibir}
        className="regua mt-2"
        style={{ ['--p' as string]: `${p}%` }}
      />
    </div>
  )
}
