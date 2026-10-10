'use client'

import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState } from 'react'

const LenisContext = createContext<Lenis | null>(null)

/** Instância do Lenis (null com movimento reduzido ou antes de montar). */
export function useLenis() {
  return useContext(LenisContext)
}

interface SmoothScrollProps {
  children: React.ReactNode
  /** Altura do cabeçalho fixo: âncoras param abaixo dele. */
  anchorOffset?: number
}

/**
 * Rolagem com inércia (Lenis) para a página inteira. A rolagem continua
 * nativa por baixo — sticky, IntersectionObserver e useScroll seguem
 * funcionando. Com `prefers-reduced-motion`, nada é instalado e o
 * MotionConfig zera as animações de deslocamento do framer na página toda.
 */
export default function SmoothScroll({ children, anchorOffset = 0 }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      autoRaf: true,
      anchors: { offset: -anchorOffset },
      // Elementos com rolagem própria (menus, trilhos) rolam por conta.
      prevent: (node) => node.hasAttribute('data-lenis-prevent'),
    })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [anchorOffset])

  return (
    <MotionConfig reducedMotion="user">
      <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
    </MotionConfig>
  )
}
