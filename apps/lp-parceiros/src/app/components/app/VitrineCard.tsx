import Image from 'next/image'
import { cn } from '@mallevo/ui'
import { PartnerIcon } from '../marca/PartnerIcon'

export interface PostVitrine {
  loja: string
  /** Sobrelinha no accent da loja quando ele lê no escuro; senão branco. */
  corLoja: string
  titulo: string
  sublinha: string
  foto: string
  momento?: { rotulo: string; tipo: 'alta' | 'video' }
}

/**
 * Vitrine da marquise do app do consumidor (components/home/VitrineCard): o
 * post recente de uma loja, aceso na fachada de quem compra. A tipografia
 * é medida em unidades do próprio card (cqw) — as proporções do app em
 * qualquer tamanho.
 */
export function VitrineCard({
  post,
  className,
  sizes = '160px',
  prioridade = false,
}: {
  post: PostVitrine
  className?: string
  sizes?: string
  prioridade?: boolean
}) {
  return (
    // O contêiner mede o card; o recorte mora num filho — `cqw` no próprio
    // contêiner resolveria contra a viewport, não contra o card.
    <div className={cn('@container relative aspect-[1/1.56] font-sistema', className)}>
      <div className="absolute inset-0 overflow-hidden border border-white/10 bg-marquee-card" style={{ borderRadius: '14cqw' }}>
        <Image src={post.foto} alt="" fill sizes={sizes} priority={prioridade} className="object-cover" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 46%, rgb(35 35 38 / 0.32) 62%, rgb(35 35 38 / 0.78) 80%, rgb(35 35 38 / 0.96) 100%)',
          }}
        />

        {post.momento && (
          <span
            className={cn(
              'absolute left-[7cqw] top-[7cqw] flex h-[18.5cqw] items-center gap-[2.4cqw] rounded-full px-[5.6cqw] font-bold uppercase tracking-[0.06em]',
              post.momento.tipo === 'alta' ? 'bg-warning text-ink' : 'bg-[rgb(17_18_22/0.72)] text-white backdrop-blur',
            )}
            style={{ fontSize: '7.4cqw' }}
          >
            <PartnerIcon
              name={post.momento.tipo === 'alta' ? 'trend' : 'play'}
              size={11}
              strokeWidth={2.4}
              className="size-[7.8cqw]"
            />
            {post.momento.rotulo}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-[8.5cqw]">
          <p className="truncate font-bold uppercase" style={{ color: post.corLoja, fontSize: '6.9cqw', letterSpacing: '0.1em' }}>
            {post.loja}
          </p>
          <p className="mt-[2.2cqw] line-clamp-2 font-sans font-bold text-white" style={{ fontSize: '9.9cqw', lineHeight: 1.28 }}>
            {post.titulo}
          </p>
          <p className="mt-[2.4cqw] font-semibold text-white/66" style={{ fontSize: '8.5cqw' }}>
            {post.sublinha}
          </p>
        </div>
      </div>
    </div>
  )
}
