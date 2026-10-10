import { useEffect, useState } from 'react'
import { agoraEmDivinopolis, type Agora } from './divinopolis'

/**
 * O instante atual em Divinópolis, atualizado a cada `passoMs`. Devolve
 * null no servidor e no primeiro render — a hora só existe no navegador
 * (sem divergência de hidratação; o HTML mostra "--:--").
 */
export function useAgora(passoMs = 1000): Agora | null {
  const [agora, setAgora] = useState<Agora | null>(null)
  useEffect(() => {
    const atualizar = () => setAgora(agoraEmDivinopolis())
    atualizar()
    const relogio = setInterval(atualizar, passoMs)
    return () => clearInterval(relogio)
  }, [passoMs])
  return agora
}
