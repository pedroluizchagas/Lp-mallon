import { useEffect, useState } from 'react'

/**
 * A hora e a luz de Divinópolis — não as do visitante.
 *
 * Porte do `lib/luz-do-dia.ts` do app do consumidor: nascer, meio-dia solar
 * e pôr calculados de verdade (NOAA simplificado) para a cidade, sete
 * quadros de luz ancorados nesses eventos e interpolados. A diferença é o
 * relógio: o app usa o fuso do aparelho; a landing é vista de qualquer
 * lugar, então tudo é contado no horário de Brasília.
 */

const LATITUDE = -20.1386
const LONGITUDE = -44.8839
/** America/Sao_Paulo, sem horário de verão desde 2019. */
const FUSO_MIN = -180
const RAD = Math.PI / 180

export type FaseDoDia =
  | 'madrugada'
  | 'amanhecer'
  | 'manha'
  | 'meio-dia'
  | 'tarde'
  | 'entardecer'
  | 'noite'

export const NOME_DA_FASE: Record<FaseDoDia, string> = {
  madrugada: 'Madrugada',
  amanhecer: 'Amanhecer',
  manha: 'Manhã',
  'meio-dia': 'Meio-dia',
  tarde: 'Tarde',
  entardecer: 'Entardecer',
  noite: 'Noite',
}

/** Tokens `consumerDesign.luz` do app. */
export const COR_DA_FASE: Record<FaseDoDia, string> = {
  madrugada: '#5B6B9E',
  amanhecer: '#F4B36F',
  manha: '#FFE9B8',
  'meio-dia': '#FFFFFF',
  tarde: '#FFD08A',
  entardecer: '#E9855A',
  noite: '#4A5A8F',
}

export interface Agora {
  ano: number
  mes: number
  dia: number
  hora: number
  minuto: number
  segundo: number
  /** Minuto do dia (0–1440), com fração. */
  minutoDoDia: number
}

export interface EventosSolares {
  nascer: number
  meioDia: number
  por: number
}

export interface Luz {
  fase: FaseDoDia
  cor: string
  intensidade: number
  solX: number
  solForca: number
}

/** O relógio de parede de Divinópolis para um instante. */
export function agoraEmDivinopolis(instante: Date = new Date()): Agora {
  const local = new Date(instante.getTime() + FUSO_MIN * 60_000)
  const hora = local.getUTCHours()
  const minuto = local.getUTCMinutes()
  const segundo = local.getUTCSeconds()
  return {
    ano: local.getUTCFullYear(),
    mes: local.getUTCMonth(),
    dia: local.getUTCDate(),
    hora,
    minuto,
    segundo,
    minutoDoDia: hora * 60 + minuto + segundo / 60,
  }
}

export function saudacao(hora: number) {
  if (hora < 12) return 'Bom dia'
  if (hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function eventosSolares(agora: Pick<Agora, 'ano' | 'mes' | 'dia'>): EventosSolares {
  const diaDoAno =
    Math.floor((Date.UTC(agora.ano, agora.mes, agora.dia) - Date.UTC(agora.ano, 0, 1)) / 86_400_000) + 1
  const gama = ((2 * Math.PI) / 365) * (diaDoAno - 1)

  const eqTempo =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gama) -
      0.032077 * Math.sin(gama) -
      0.014615 * Math.cos(2 * gama) -
      0.040849 * Math.sin(2 * gama))
  const declinacao =
    0.006918 -
    0.399912 * Math.cos(gama) +
    0.070257 * Math.sin(gama) -
    0.006758 * Math.cos(2 * gama) +
    0.000907 * Math.sin(2 * gama) -
    0.002697 * Math.cos(3 * gama) +
    0.00148 * Math.sin(3 * gama)

  const lat = LATITUDE * RAD
  const cosHa =
    Math.cos(90.833 * RAD) / (Math.cos(lat) * Math.cos(declinacao)) -
    Math.tan(lat) * Math.tan(declinacao)
  const ha = Math.acos(Math.max(-1, Math.min(1, cosHa))) / RAD

  const local = (m: number) => (((m + FUSO_MIN) % 1440) + 1440) % 1440
  return {
    nascer: local(720 - 4 * (LONGITUDE + ha) - eqTempo),
    meioDia: local(720 - 4 * LONGITUDE - eqTempo),
    por: local(720 - 4 * (LONGITUDE - ha) - eqTempo),
  }
}

interface Quadro extends Luz {
  minuto: number
}

function quadros(ev: EventosSolares): Quadro[] {
  const q = (fase: FaseDoDia, minuto: number, intensidade: number, solX: number, solForca: number): Quadro => ({
    fase,
    minuto,
    cor: COR_DA_FASE[fase],
    intensidade,
    solX,
    solForca,
  })
  return [
    q('madrugada', ev.nascer - 100, 0.5, 0.08, 0),
    q('amanhecer', ev.nascer + 5, 1, 0.12, 1),
    q('manha', ev.nascer + 110, 0.55, 0.3, 0.7),
    q('meio-dia', ev.meioDia, 0.35, 0.5, 0.45),
    q('tarde', ev.por - 130, 0.6, 0.72, 0.7),
    q('entardecer', ev.por + 5, 1, 0.9, 1),
    q('noite', ev.por + 100, 0.6, 0.92, 0),
  ]
}

/** A luz num minuto do dia (o mesmo dia dos eventos). */
export function luzNoMinuto(minuto: number, ev: EventosSolares): Luz {
  const lista = quadros(ev)
  const i = lista.findIndex((q) => q.minuto > minuto) - 1
  let a: Quadro
  let b: Quadro
  if (i === -2) {
    a = lista[lista.length - 1]
    b = { ...lista[0], minuto: lista[0].minuto + 1440 }
  } else if (i === -1) {
    a = { ...lista[lista.length - 1], minuto: lista[lista.length - 1].minuto - 1440 }
    b = lista[0]
  } else {
    a = lista[i]
    b = lista[i + 1]
  }
  const t = Math.max(0, Math.min(1, (minuto - a.minuto) / (b.minuto - a.minuto)))
  return {
    fase: t < 0.5 ? a.fase : b.fase,
    cor: misturar(a.cor, b.cor, t),
    intensidade: a.intensidade + (b.intensidade - a.intensidade) * t,
    solX: a.solX + (b.solX - a.solX) * t,
    solForca: a.solForca + (b.solForca - a.solForca) * t,
  }
}

function misturar(de: string, ate: string, t: number) {
  const a = parseInt(de.slice(1), 16)
  const b = parseInt(ate.slice(1), 16)
  const canal = (desl: number) => {
    const va = (a >> desl) & 0xff
    const vb = (b >> desl) & 0xff
    return Math.round(va + (vb - va) * t)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${canal(16)}${canal(8)}${canal(0)}`
}

/** "05:52" a partir de um minuto do dia. */
export function formatarMinuto(minuto: number) {
  const m = ((Math.round(minuto) % 1440) + 1440) % 1440
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export function dois(n: number) {
  return String(n).padStart(2, '0')
}

/** `#RRGGBB` + alpha → `rgb(r g b / a)`. */
export function comAlfa(hex: string, alfa: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgb(${(n >> 16) & 0xff} ${(n >> 8) & 0xff} ${n & 0xff} / ${Math.max(0, Math.min(1, alfa)).toFixed(3)})`
}

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
