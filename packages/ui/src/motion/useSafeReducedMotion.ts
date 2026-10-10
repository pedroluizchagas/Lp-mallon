'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * `prefers-reduced-motion`, mas só depois de montar. O `useReducedMotion`
 * do framer já responde no primeiro render do cliente — se a árvore muda
 * por causa dele, o HTML do servidor não bate e a hidratação falha. Aqui o
 * primeiro render é sempre o do servidor; a preferência entra em seguida.
 */
export function useSafeReducedMotion() {
  const reduce = useReducedMotion()
  const [montado, setMontado] = useState(false)
  useEffect(() => setMontado(true), [])
  return montado && Boolean(reduce)
}
