'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { EASE, RevealLines, cn } from '@mallevo/ui'
import { reais } from '../../dados/balcao'
import { LINKS } from '../../lib/links'
import type { Plano } from '../../lib/planos'
import { PartnerIcon } from '../marca/PartnerIcon'
import { Sobrelinha } from '../ui/Sobrelinha'

function perguntas(planos: Plano[] | null): { pergunta: string; resposta: React.ReactNode }[] {
  const menor = planos ? Math.min(...planos.map((p) => p.precoMensal)) : null
  return [
    {
      pergunta: 'Quanto custa vender no Mallevo?',
      resposta: `A mensalidade do plano que você escolhe no cadastro${
        menor ? ` (a partir de ${reais(menor)} por mês)` : ''
      }, mais R$ 1,00 por pedido pago — sem porcentagem sobre a venda. Os primeiros 15 dias são de teste, e o cadastro não pede cartão.`,
    },
    {
      pergunta: 'Tem alguma outra taxa?',
      resposta:
        'A comissão do Mallevo é só o R$ 1,00 por pedido. O pagamento do cliente é processado pela Pagar.me, e as tarifas do meio de pagamento saem da sua parte da venda. A taxa de entrega é você quem define — e quem paga é o cliente.',
    },
    {
      pergunta: 'Como eu recebo o dinheiro das vendas?',
      resposta:
        'No próprio pagamento, a Pagar.me divide o valor: a sua parte vai para a sua conta de recebimentos e a comissão vai para o Mallevo. O saldo disponível e o que está a receber aparecem no painel; os prazos seguem o calendário da Pagar.me para Pix e cartão.',
    },
    {
      pergunta: 'Preciso ter CNPJ?',
      resposta: 'Sim. O cadastro de lojista aceita só pessoa jurídica — e o MEI conta: ele também tem CNPJ.',
    },
    {
      pergunta: 'Quem faz as entregas?',
      resposta:
        'Quando o pedido fica pronto, você chama o entregador: os entregadores autônomos do Mallevo que estão online aparecem para você escolher. A taxa e o tempo de entrega quem define é você; o cliente acompanha a rota no app.',
    },
    {
      pergunta: 'Funciona para que tipo de loja?',
      resposta:
        'Comida, moda, farmácia, pet, serviços com hora marcada e varejo em geral — são 20 categorias, organizadas nos 9 pisos do shopping. O painel se monta pelo tipo de negócio: cardápio e adicionais para quem vende comida, grade de tamanho e cor para a moda, agenda para quem atende com hora marcada.',
    },
    {
      pergunta: 'Dá para cuidar da loja só pelo celular?',
      resposta:
        'O dia a dia, sim: pedidos, catálogo, Publicar no Explorar, financeiro e relatórios estão no app Mallevo Parceiro, que está chegando à App Store e ao Google Play. O cadastro e algumas configurações — recebimentos, estilo da vitrine, tipo de loja — ficam no painel, pelo navegador.',
    },
    {
      pergunta: 'Minha loja ganha um site?',
      resposta: (
        <>
          Ganha um endereço próprio, no formato <span className="font-mono text-[0.92em] text-ink">sualoja.mallevo.com.br</span>
          , criado no cadastro a partir do nome da loja. É a mesma vitrine do app, com o mesmo estilo — e o cliente
          compra por ali também.
        </>
      ),
    },
  ]
}

/** Perguntas frequentes — acordeão de uma aberta por vez. */
export function Perguntas({ planos }: { planos: Plano[] | null }) {
  const [aberta, setAberta] = useState<number | null>(0)
  const base = useId()
  const lista = perguntas(planos)

  return (
    <section id="perguntas" className="relative px-5 pb-40 pt-12 md:px-8 lg:pb-56">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Sobrelinha tom="claro">Perguntas</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(38px,5vw,84px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Antes de',
                <span key="acesa" className="italic">
                  <span className="marca-texto">abrir a porta.</span>
                </span>,
              ]}
            />
            <div className="mt-10 rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-30px_rgb(17_18_22/0.35)] ring-1 ring-ink/[0.05]">
              <p className="text-[16px] font-semibold text-ink">Quer falar com alguém?</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">
                Escreva para a gente — quem responde é daqui, de Divinópolis.
              </p>
              <a href={`mailto:${LINKS.email}`} className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-ink">
                <span className="sublinha">{LINKS.email}</span>
                <PartnerIcon name="chevron-right" size={16} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>

        <ul className="border-t border-ink/10 lg:col-span-7 lg:col-start-6">
          {lista.map((item, i) => {
            const aberto = aberta === i
            const idResposta = `${base}-resposta-${i}`
            return (
              <li key={item.pergunta} className="border-b border-ink/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={aberto}
                    aria-controls={idResposta}
                    onClick={() => setAberta(aberto ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <span
                      className={cn(
                        'text-[clamp(19px,1.7vw,24px)] font-semibold tracking-[-0.02em] transition-colors duration-300',
                        aberto ? 'text-ink' : 'text-ink/80 group-hover:text-ink',
                      )}
                    >
                      {item.pergunta}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'relative flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                        aberto ? 'bg-ink text-accent' : 'bg-ink/[0.06] text-ink group-hover:bg-ink/10',
                      )}
                    >
                      <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
                      <span
                        className={cn(
                          'absolute h-3.5 w-[2px] rounded-full bg-current transition-transform duration-300 ease-[var(--ease-entrada)]',
                          aberto && 'rotate-90 scale-y-0',
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {aberto && (
                    <motion.div
                      id={idResposta}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE.entrada }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-7 pr-14 text-[16.5px] leading-[1.7] text-ink-muted">{item.resposta}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
