/**
 * As vitrines que o provador veste: as peles reais dos arquétipos
 * (@mallevo/lib · store-theme/presets.ts) nas lojas do conjunto de
 * demonstração do app (mesmas lojas, produtos e preços do mock do
 * consumidor; fotos Unsplash, as mesmas do catálogo). O nome da vitrine é
 * o que o lojista vê no painel ("Vitrine ativada: Forno").
 */

const FOTO = '/images/shopping'

// ─── Vitrines (cada loja com a própria pele) ──────────────────────────

/** Tokens de cor do arquétipo (store-theme/presets.ts). */
export interface Pele {
  bg: string
  surface: string
  surfaceAlt: string
  ink: string
  inkMuted: string
  line: string
  accent: string
  accentInk: string
}

export interface ProdutoVitrine {
  nome: string
  preco: string
  foto: string
}

export interface LojaVitrine {
  slug: string
  nome: string
  iniciais: string
  categoria: string
  piso: string
  descricao: string
  tempo: string
  frete: string
  freteGratis: boolean
  vitrine: { nome: string; descricao: string; mood: string[] }
  pele: Pele
  /** Classe da fonte de display do arquétipo + caixa alta quando a voz é em caps. */
  display: string
  corpo: string
  rotuloVitrine: string
  link: string
  cta: string
  banner: string
  produtos: ProdutoVitrine[]
}

export const VITRINES: LojaVitrine[] = [
  {
    slug: 'cafe-aroma',
    nome: 'Café Aroma',
    iniciais: 'CA',
    categoria: 'Cafeteria',
    piso: 'Piso 1',
    descricao: 'Sempre fresco, sempre na hora — grãos de especialidade torrados na casa.',
    tempo: '25 min',
    frete: 'R$ 4,90',
    freteGratis: false,
    vitrine: {
      nome: 'Torra',
      descricao: 'Pôster retrô de cafeteria. Verde-floresta profundo, âmbar vibrante e tipografia gigante.',
      mood: ['quente', 'retrô', 'espirituoso'],
    },
    pele: {
      bg: '#1C2617',
      surface: '#243020',
      surfaceAlt: '#2E3B28',
      ink: '#F4EFE2',
      inkMuted: '#A9AE97',
      line: '#37432F',
      accent: '#F2A33C',
      accentInk: '#221503',
    },
    display: 'font-archivo font-extrabold uppercase tracking-[-0.03em]',
    corpo: 'font-inter',
    rotuloVitrine: 'Frescos do dia',
    link: 'Cardápio',
    cta: 'Pedir agora',
    banner: `${FOTO}/lojas/cafe-aroma/banner.webp`,
    produtos: [
      { nome: 'Cappuccino Trio', preco: 'R$ 15,90', foto: `${FOTO}/lojas/cafe-aroma/cappuccino.webp` },
      { nome: 'Latte da Casa', preco: 'R$ 14,90', foto: `${FOTO}/lojas/cafe-aroma/latte.webp` },
      { nome: 'Croissant Amanteigado', preco: 'R$ 11,90', foto: `${FOTO}/lojas/cafe-aroma/croissant.webp` },
    ],
  },
  {
    slug: 'burger-house',
    nome: 'Burger House DV',
    iniciais: 'BH',
    categoria: 'Lanches',
    piso: 'Piso 1',
    descricao: 'Smash burgers artesanais e batatas rústicas. Direto da chapa.',
    tempo: '30 min',
    frete: 'R$ 5,90',
    freteGratis: false,
    vitrine: {
      nome: 'Smash',
      descricao: 'Apetite em caps pesadas. Bordô profundo, laranja vivo e pills por toda parte.',
      mood: ['apetitoso', 'ousado', 'divertido'],
    },
    pele: {
      bg: '#470A10',
      surface: '#551218',
      surfaceAlt: '#641820',
      ink: '#FFF6E8',
      inkMuted: '#D3A79D',
      line: '#5D161E',
      accent: '#EF6A1F',
      accentInk: '#470A10',
    },
    display: 'font-archivo font-extrabold uppercase tracking-[-0.03em]',
    corpo: 'font-nunito',
    rotuloVitrine: 'Frescos do dia',
    link: 'Cardápio',
    cta: 'Pedir agora',
    banner: `${FOTO}/lojas/burger-house/banner.webp`,
    produtos: [
      { nome: 'Duplo Smash da Casa', preco: 'R$ 32,90', foto: `${FOTO}/lojas/burger-house/duplo-smash.webp` },
      { nome: 'Cheddar Bacon', preco: 'R$ 34,90', foto: `${FOTO}/lojas/burger-house/cheddar-bacon.webp` },
      { nome: 'Fritas Rústicas', preco: 'R$ 14,90', foto: `${FOTO}/lojas/burger-house/fritas-rusticas.webp` },
    ],
  },
  {
    slug: 'forno-real',
    nome: 'Forno Real',
    iniciais: 'FR',
    categoria: 'Pizzaria',
    piso: 'Piso 1',
    descricao: 'Massa de fermentação longa, forno a lenha e coroa na borda.',
    tempo: '40 min',
    frete: 'R$ 5,90',
    freteGratis: false,
    vitrine: {
      nome: 'Forno',
      descricao: 'Cartaz de pizzaria. Creme fatiado em blocos, grotesca esmagada em caps e coroa real.',
      mood: ['apetitoso', 'majestoso', 'intenso'],
    },
    pele: {
      bg: '#F6EFDE',
      surface: '#FFFCF1',
      surfaceAlt: '#EFE4CB',
      ink: '#1A150F',
      inkMuted: '#6B6049',
      line: '#E8DEC5',
      accent: '#B3231B',
      accentInk: '#F6EFDE',
    },
    display: 'font-archivo font-black uppercase tracking-[-0.035em] text-[var(--loja-accent)]',
    corpo: 'font-archivo',
    rotuloVitrine: 'Frescos do dia',
    link: 'Cardápio',
    cta: 'Pedir agora',
    banner: `${FOTO}/lojas/forno-real/banner.webp`,
    produtos: [
      { nome: 'Margherita Reale', preco: 'R$ 54,90', foto: `${FOTO}/lojas/forno-real/margherita.webp` },
      { nome: 'Pepperoni Coroada', preco: 'R$ 62,90', foto: `${FOTO}/lojas/forno-real/pepperoni.webp` },
      { nome: 'Calabresa da Corte', preco: 'R$ 52,90', foto: `${FOTO}/lojas/forno-real/calabresa.webp` },
    ],
  },
  {
    slug: 'roxa-acai',
    nome: 'Roxa Açaí',
    iniciais: 'RA',
    categoria: 'Sobremesas',
    piso: 'Piso 1',
    descricao: 'Um ritual pra quem romantiza a vida — uma tigela de cada vez.',
    tempo: '25 min',
    frete: 'R$ 4,90',
    freteGratis: false,
    vitrine: {
      nome: 'Ritual',
      descricao: 'Groovy e espirituoso. Rosa chiclete, roxo profundo e caps condensadas.',
      mood: ['groovy', 'espirituoso', 'vibrante'],
    },
    pele: {
      bg: '#F6B8D3',
      surface: '#FBF3DC',
      surfaceAlt: '#F9D3E3',
      ink: '#39103B',
      inkMuted: '#7A4263',
      line: '#EBA0C4',
      accent: '#3F1244',
      accentInk: '#FBF3DC',
    },
    display: 'font-anton uppercase tracking-[0.005em]',
    corpo: 'font-nunito',
    rotuloVitrine: 'Frescos do dia',
    link: 'Cardápio',
    cta: 'Pedir agora',
    banner: `${FOTO}/lojas/roxa-acai/banner.webp`,
    produtos: [
      { nome: 'Roxa Assinatura 500', preco: 'R$ 27,90', foto: `${FOTO}/lojas/roxa-acai/assinatura.webp` },
      { nome: 'Tigela Nascer do Sol', preco: 'R$ 22,90', foto: `${FOTO}/lojas/roxa-acai/nascer-do-sol.webp` },
      { nome: 'Bowl Frutas do Verão', preco: 'R$ 25,90', foto: `${FOTO}/lojas/roxa-acai/frutas-verao.webp` },
    ],
  },
  {
    slug: 'sushi-yamato',
    nome: 'Sushi Yamato',
    iniciais: 'SY',
    categoria: 'Japonesa',
    piso: 'Piso 1',
    descricao: 'O balcão silencioso — peixe do dia, arroz no ponto e a calma do mestre.',
    tempo: '50 min',
    frete: 'R$ 8,90',
    freteGratis: false,
    vitrine: {
      nome: 'Noir',
      descricao: 'Luxo dramático. Fundo preto, acento metálico e a imagem dominando o texto.',
      mood: ['luxuoso', 'exclusivo', 'dramático'],
    },
    pele: {
      bg: '#000000',
      surface: '#0C0C0C',
      surfaceAlt: '#161616',
      ink: '#F5F5F5',
      inkMuted: '#8A8A8A',
      line: '#1C1C1C',
      accent: '#C9A24B',
      accentInk: '#000000',
    },
    display: 'font-cormorant font-semibold tracking-[-0.01em]',
    corpo: 'font-inter',
    rotuloVitrine: 'Frescos do dia',
    link: 'Cardápio',
    cta: 'Pedir agora',
    banner: `${FOTO}/lojas/sushi-yamato/banner.webp`,
    produtos: [
      { nome: 'Omakase Nigiri', preco: 'R$ 128,90', foto: `${FOTO}/lojas/sushi-yamato/omakase.webp` },
      { nome: 'Uramaki Salmão', preco: 'R$ 58,90', foto: `${FOTO}/lojas/sushi-yamato/uramaki.webp` },
      { nome: 'Barco Yamato', preco: 'R$ 189,90', foto: `${FOTO}/lojas/sushi-yamato/barco.webp` },
    ],
  },
  {
    slug: 'monarca',
    nome: 'Monarca',
    iniciais: 'MO',
    categoria: 'Moda',
    piso: 'Piso 2',
    descricao: 'O essencial masculino em preto e branco — alfaiataria limpa e caimento exato.',
    tempo: '60 min',
    frete: 'R$ 9,90',
    freteGratis: false,
    vitrine: {
      nome: 'Passarela',
      descricao: 'Moda em preto e branco. Página branca, foto monocromática e compra direto na grade.',
      mood: ['monocromático', 'contemporâneo', 'direto'],
    },
    pele: {
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      surfaceAlt: '#F2F2F2',
      ink: '#111111',
      inkMuted: '#6E6E6E',
      line: '#ECECEC',
      accent: '#111111',
      accentInk: '#FFFFFF',
    },
    display: 'font-manrope font-normal tracking-[-0.045em]',
    corpo: 'font-manrope',
    rotuloVitrine: 'Peças na vitrine',
    link: 'Entrar na loja',
    cta: 'Passear',
    banner: `${FOTO}/lojas/monarca/banner.webp`,
    produtos: [
      { nome: 'Blazer Meia-Noite', preco: 'R$ 1.299,00', foto: `${FOTO}/lojas/monarca/blazer.webp` },
      { nome: 'Camisa de Popeline', preco: 'R$ 349,00', foto: `${FOTO}/lojas/monarca/popeline.webp` },
      { nome: 'Calça de Alfaiataria', preco: 'R$ 599,00', foto: `${FOTO}/lojas/monarca/alfaiataria.webp` },
    ],
  },
  {
    slug: 'quintal-verde',
    nome: 'Quintal Verde',
    iniciais: 'QV',
    categoria: 'Hortifruti',
    piso: 'Piso 7',
    descricao: 'Colhido de manhã, na sua casa antes do almoço — fruta, verdura e horta.',
    tempo: '35 min',
    frete: 'R$ 4,90',
    freteGratis: false,
    vitrine: {
      nome: 'Feira',
      descricao: 'Feira premium. Página clara, verde-mata, lima de ação e preço por unidade.',
      mood: ['fresco', 'vivo', 'confiável'],
    },
    pele: {
      bg: '#FBFBF7',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F4EC',
      ink: '#17211A',
      inkMuted: '#63705F',
      line: '#E7EBE2',
      accent: '#C6E84B',
      accentInk: '#1F3020',
    },
    display: 'font-sans font-bold tracking-[-0.035em]',
    corpo: 'font-sans',
    rotuloVitrine: 'Na cesta hoje',
    link: 'Ver tudo',
    cta: 'Pedir agora',
    banner: `${FOTO}/lojas/quintal-verde/banner.webp`,
    produtos: [
      { nome: 'Manga Palmer', preco: 'R$ 10,90/kg', foto: `${FOTO}/lojas/quintal-verde/manga.webp` },
      { nome: 'Tomate Italiano', preco: 'R$ 11,90/kg', foto: `${FOTO}/lojas/quintal-verde/tomate.webp` },
      { nome: 'Ovos caipiras', preco: 'R$ 18,90/dz', foto: `${FOTO}/lojas/quintal-verde/ovos.webp` },
    ],
  },
]

/** As outras 12 vitrines da tabela VITRINES (@mallevo/lib). */
