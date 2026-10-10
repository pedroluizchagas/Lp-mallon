import Image from 'next/image'

const ARQUIVO = {
  branco: '/images/logos/logoWhite.png',
  preto: '/images/logos/logoBlack.png',
  lima: '/images/logos/logoGreen.png',
} as const

export function Logo({
  tom = 'branco',
  className,
  prioridade = false,
}: {
  tom?: keyof typeof ARQUIVO
  className?: string
  prioridade?: boolean
}) {
  return (
    // PNG de 12 KB: servido como está. Passar pelo otimizador só somava a
    // conversão (AVIF) à primeira pintura do cabeçalho.
    <Image
      src={ARQUIVO[tom]}
      alt="Mallevo"
      width={669}
      height={106}
      priority={prioridade}
      unoptimized
      className={className}
    />
  )
}
