'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { LOJA_DEMO, STATUS_POR_CHAVE, TAXA_ENTREGA, reais, resumoItens, type PedidoDemo } from '../../dados/balcao'
import { PartnerIcon } from '../marca/PartnerIcon'
import { CartaoPedidoVivo, SemAcaoPendente } from './CartaoPedidoVivo'
import { StatusBar, TabBarLojista } from './Cromo'
import { FolhaApp, Recibo, SecaoFolha } from './Folha'
import { PlacaVidro, SeletorLoja, Statement } from './Vidro'

const ENTRADA = [0.16, 1, 0.3, 1] as const

export interface NumerosDoDia {
  /** Centavos. */
  receita: number
  pedidos: number
  preparo: number
  entrega: number
}

/**
 * O Início do app do lojista ((tabs)/index.tsx): a marquise com a loja
 * ativa, o statement "Sua loja, ao vivo no shopping.", os números do dia em
 * placas de vidro, a fila operacional e o pedido que pede ação agora — com
 * "Confirmar pedido" no próprio cartão. Embaixo, a folha com o que já está
 * em andamento. O estado vem de fora (o hero faz os pedidos chegarem).
 */
export function TelaInicioLojista({
  saudacao,
  numeros,
  novo,
  tocando = false,
}: {
  saudacao: string
  numeros: NumerosDoDia
  /** O pedido novo esperando confirmação (null = nenhum). */
  novo: PedidoDemo | null
  tocando?: boolean
}) {
  const novos = novo ? 1 : 0
  const ticket = numeros.pedidos ? Math.round(numeros.receita / 100 / numeros.pedidos) * 100 : 0
  const resumo = [
    novos > 0 ? '1 novo' : null,
    numeros.preparo > 0 ? `${numeros.preparo} em preparo` : null,
    numeros.entrega > 0 ? `${numeros.entrega} em entrega` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-canvas font-sistema">
      <div className="relative overflow-hidden bg-marquee pb-[48px] pt-[63px]">
        <div aria-hidden className="glow-marquise absolute inset-0" />
        <StatusBar />

        <div className="relative flex min-h-[40px] items-center px-[24px]">
          <SeletorLoja nome={LOJA_DEMO.nome} iniciais={LOJA_DEMO.iniciais} />
        </div>

        <Statement
          className="relative"
          sobrelinha={<span suppressHydrationWarning>{`${saudacao}, ${LOJA_DEMO.responsavel}`}</span>}
          linha="Sua loja,"
          acento="ao vivo no shopping."
          sublinha={resumo || 'Tudo tranquilo por aqui — nenhum pedido em aberto.'}
        />

        <div className="relative flex gap-[10px] px-[16px] pt-[22px]">
          <PlacaVidro icone="cash" valor={reais(numeros.receita)} rotulo="Receita hoje" />
          <PlacaVidro icone="orders" valor={numeros.pedidos} rotulo="Pedidos hoje" />
          <PlacaVidro icone="trend" valor={reais(ticket)} rotulo="Ticket médio" />
        </div>
        <div className="relative flex gap-[10px] px-[16px] pt-[10px]">
          <PlacaVidro icone="bell" valor={novos} rotulo="Novos" alerta={novos > 0} />
          <PlacaVidro icone="chef" valor={numeros.preparo} rotulo="Em preparo" />
          <PlacaVidro icone="bike" valor={numeros.entrega} rotulo="Em entrega" />
        </div>

        <div className="relative px-[16px] pt-[22px]">
          <div className="relative h-[216px]">
            <AnimatePresence initial={false} mode="popLayout">
              {novo ? (
                <motion.div
                  key={novo.id}
                  className="absolute inset-x-0 top-0"
                  initial={{ opacity: 0, y: -18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.45, ease: [0.3, 0, 1, 1] } }}
                  transition={{ duration: 0.7, ease: ENTRADA }}
                >
                  <CartaoPedidoVivo pedido={novo} meta={STATUS_POR_CHAVE.novo} acao="Confirmar pedido" tocando={tocando} />
                </motion.div>
              ) : (
                <motion.div
                  key="vazio"
                  className="absolute inset-x-0 top-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SemAcaoPendente />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <FolhaApp>
        <SecaoFolha
          sobrelinha="Já confirmados"
          titulo="Em andamento"
          direita={
            <span className="flex items-center gap-[2px] text-[13px] font-bold text-ink-muted">
              Ver todos
              <PartnerIcon name="chevron-right" size={14} strokeWidth={2.2} />
            </span>
          }
        >
          <div className="space-y-[12px]">
            <Recibo
              cliente="Bruno Teixeira"
              itens={resumoItens([{ qtd: 1, nome: 'Latte da Casa', total: 1490 }, { qtd: 1, nome: 'Bolo Trufado', total: 1490 }])}
              total={reais(2980 + TAXA_ENTREGA)}
              quando="há 9 min"
              status={STATUS_POR_CHAVE.em_preparo}
              pagamento="Pix online"
            />
            <Recibo
              cliente="Camila Rocha"
              itens={resumoItens([{ qtd: 3, nome: 'Café Gelado Clássico', total: 3870 }])}
              total={reais(3870 + TAXA_ENTREGA)}
              quando="há 16 min"
              status={STATUS_POR_CHAVE.saiu_para_entrega}
              pagamento="Cartão online"
            />
          </div>
        </SecaoFolha>
      </FolhaApp>

      <TabBarLojista ativa="home" novos={novos} />
    </div>
  )
}
