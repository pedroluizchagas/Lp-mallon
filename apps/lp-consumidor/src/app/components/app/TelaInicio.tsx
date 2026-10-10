import Image from 'next/image'
import { POSTS, VITRINES } from '../../dados/shopping'
import { comAlfa, type Luz } from '../../lib/divinopolis'
import { ConsumerIcon } from '../marca/ConsumerIcon'
import { StatusBar, TabBar } from './Cromo'
import { FachadaLoja } from './FachadaLoja'
import { VitrineCard } from './VitrineCard'

/**
 * O Início do app (app/(tabs)/index.tsx): a marquise — fachada noturna com
 * o neon vazando, saudação, statement, busca de vidro e a passarela de
 * posts — e a folha clara subindo por cima com o primeiro corredor.
 * Medidas em pontos do app (390 de largura).
 */
export function TelaInicio({
  saudacao = 'Boa noite, Ana',
  luz,
  leve = false,
}: {
  saudacao?: string
  luz?: Luz
  /** Miniatura: cartazes e fachada viram só foto (menos DOM onde o detalhe não se lê). */
  leve?: boolean
}) {
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-canvas font-sistema">
      <div className="relative overflow-hidden bg-marquee pb-[40px] pt-[57px]">
        <div aria-hidden className="glow-marquise absolute inset-0" />
        <StatusBar />

        {/* Portaria: localização + sino, sem cromo */}
        <div className="relative flex items-center justify-between px-[24px]">
          <div className="flex items-center gap-[10px] pr-[16px]">
            <ConsumerIcon name="pin" size={19} color="#D8FF3E" strokeWidth={2} />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[1.2px] text-white/42">Entregar em</p>
              <p className="flex items-center gap-[4px] text-[15px] font-extrabold tracking-[-0.3px] text-white">
                Divinópolis
                <ConsumerIcon name="chevron-down" size={13} color="rgb(255 255 255 / 0.66)" />
              </p>
            </div>
          </div>
          <span className="relative">
            <ConsumerIcon name="bell" size={22} color="#FFFFFF" />
            <span className="absolute -right-px -top-px size-[8px] rounded-full bg-danger ring-[1.5px] ring-marquee" />
          </span>
        </div>

        {/* Letreiro */}
        <div className="relative px-[24px] pt-[26px]">
          <p className="text-[11px] font-bold uppercase tracking-[1.2px] text-white/42">{saudacao}</p>
          <p className="mt-[8px] font-sans text-[34px] font-semibold leading-[39px] tracking-[-0.8px] text-white">
            A cidade inteira,
            <br />
            <span className="italic text-accent">na sua mão.</span>
          </p>
          <p className="mt-[8px] text-[13.5px] font-medium text-white/66">O shopping digital de Divinópolis</p>
        </div>

        {/* Busca em vidro fumê */}
        <div className="relative mx-[24px] mt-[24px] flex items-center gap-[10px] rounded-full border border-white/10 bg-white/[0.08] px-[18px] py-[14px]">
          <ConsumerIcon name="search" size={17} color="rgb(255 255 255 / 0.66)" />
          <span className="flex-1 text-[14px] font-medium text-white/66">O que você procura hoje?</span>
          <span className="flex size-[26px] items-center justify-center rounded-full bg-accent">
            <ConsumerIcon name="chevron-right" size={14} color="#111216" strokeWidth={2.4} />
          </span>
        </div>

        {/* Ao vivo no shopping: a passarela de posts */}
        <div className="relative pt-[30px]">
          <div className="mb-[16px] flex items-end justify-between px-[24px]">
            <div>
              <p className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-[1.2px] text-accent">
                <ConsumerIcon name="trend" size={11} strokeWidth={2.4} />
                Ao vivo no shopping
              </p>
              <p className="mt-[6px] font-sans text-[21px] font-bold tracking-[-0.4px] text-white">Novidades na passarela</p>
            </div>
            <p className="flex items-center gap-[2px] pb-[3px] text-[13px] font-bold text-white/66">
              Ver tudo
              <ConsumerIcon name="chevron-right" size={14} strokeWidth={2.2} />
            </p>
          </div>
          <div className="flex gap-[10px] px-[24px]">
            {[POSTS[0], POSTS[2], POSTS[1]].map((post) =>
              leve ? (
                <div key={post.id} className="relative aspect-[1/1.56] w-[141px] shrink-0 overflow-hidden rounded-[20px] border border-white/10">
                  <Image src={post.foto} alt="" fill sizes="72px" className="object-cover" />
                </div>
              ) : (
                <VitrineCard key={post.id} post={post} className="w-[141px] shrink-0" sizes="141px" />
              ),
            )}
          </div>
        </div>
      </div>

      {/* Folha clara: sair da fachada e entrar no shopping */}
      <div className="vidro-fosco relative -mt-[24px] rounded-t-[20px] pt-[24px]">
        {/* Luz do dia: véu + sol na cor da fase — só na folha, nunca na marquise. */}
        {luz && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-t-[20px]"
              style={{
                background: `linear-gradient(to bottom, ${comAlfa(luz.cor, 0.14 * luz.intensidade)}, ${comAlfa(luz.cor, 0.06)} 28%, transparent 62%)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-t-[20px]"
              style={{
                background: `radial-gradient(46% 60% at ${luz.solX * 100}% 4%, ${comAlfa(luz.cor, 0.18 * luz.solForca)}, transparent 70%)`,
              }}
            />
          </>
        )}
        <div className="relative px-[24px]">
          <p className="text-[11px] font-bold uppercase tracking-[1.2px] text-ink-soft">Caminhando pelo piso 1</p>
          <div className="mt-[6px] flex items-end justify-between">
            <p className="font-sans text-[21px] font-bold tracking-[-0.4px] text-ink">Praça de Alimentação</p>
            <p className="flex items-center gap-[2px] pb-[3px] text-[13px] font-bold text-ink-muted">
              Ver todas
              <ConsumerIcon name="chevron-right" size={14} strokeWidth={2.2} />
            </p>
          </div>
          <p className="mt-[2px] text-[13px] font-medium text-ink-muted">Restaurantes, lanches e cafés</p>
        </div>
        <div className="relative mt-[16px] flex gap-[12px] pl-[16px]">
          {leve ? (
            <div className="relative h-[300px] w-[340px] shrink-0 overflow-hidden rounded-[20px]" style={{ backgroundColor: VITRINES[0].pele.bg }}>
              <Image src={VITRINES[0].banner} alt="" fill sizes="170px" className="object-cover" />
            </div>
          ) : (
            <FachadaLoja loja={VITRINES[0]} />
          )}
          {/* A próxima fachada espiando — o convite para rolar o corredor. */}
          <div aria-hidden className="h-[560px] w-[40px] shrink-0 rounded-[20px]" style={{ backgroundColor: VITRINES[1].pele.bg }} />
        </div>
      </div>

      <TabBar ativa="home" />
    </div>
  )
}
