import type { ConsumerIconName } from '../components/marca/ConsumerIcon'

/**
 * O shopping que a landing mostra é o do app: as mesmas lojas, produtos,
 * posts e textos do conjunto de demonstração do consumidor
 * (Mall-online/apps/mobile-consumer/lib/mock), as mesmas peles de vitrine
 * (@mallevo/lib · store-theme/presets.ts) e o mesmo vocabulário de pisos
 * (@mallevo/lib · pisos.ts). Fotos: Unsplash, as mesmas do catálogo.
 *
 * Nada de nota, "verificado", contagem de lojas ou depoimento inventado —
 * a regra do app vale aqui: sem dado, não aparece.
 */

const FOTO = '/images/shopping'

// ─── Passarela (posts dos parceiros) ──────────────────────────────────

export interface Momento {
  rotulo: string
  tipo: 'alta' | 'video'
}

export interface PostPassarela {
  id: string
  loja: string
  /** Sobrelinha no accent da loja quando ele lê no escuro (contraste ≥ 3); senão branco. */
  corLoja: string
  titulo: string
  sublinha: string
  foto: string
  /** O momento sai do post, como no VitrineCard: ≥ 1000 curtidas → em alta; vídeo → duração. */
  momento?: Momento
}

export const POSTS: PostPassarela[] = [
  {
    id: 'burger',
    loja: 'Burger House DV',
    corLoja: '#EF6A1F',
    titulo: 'Smash Duplo Bacon',
    sublinha: 'R$ 32,90',
    foto: `${FOTO}/posts/burger-smash-duplo.webp`,
    momento: { rotulo: 'Em alta', tipo: 'alta' },
  },
  {
    id: 'buque',
    loja: 'Ateliê Camélia',
    corLoja: '#FFFFFF',
    titulo: 'Buquê Camélia do Mês',
    sublinha: 'R$ 129,00',
    foto: `${FOTO}/posts/atelie-buque.webp`,
  },
  {
    id: 'cafe',
    loja: 'Café Aroma',
    corLoja: '#F2A33C',
    titulo: 'Café Coado da Casa 300ml',
    sublinha: 'R$ 9,90',
    foto: `${FOTO}/posts/cafe-coado.webp`,
  },
  {
    id: 'pet',
    loja: 'Vira-Lata Chique',
    corLoja: '#FFFFFF',
    titulo: 'O Tobias entrou parecendo um capacho e saiu galã.',
    sublinha: 'há 5 h',
    foto: `${FOTO}/posts/pet-tobias.webp`,
    momento: { rotulo: 'Em alta', tipo: 'alta' },
  },
  {
    id: 'sushi',
    loja: 'Sushi Yamato',
    corLoja: '#C9A24B',
    titulo: 'Combinado Yamato 24 peças',
    sublinha: 'R$ 129,00',
    foto: `${FOTO}/posts/sushi-combinado.webp`,
    momento: { rotulo: 'Em alta', tipo: 'alta' },
  },
  {
    id: 'barbearia',
    loja: 'Barbearia Fio Nobre',
    corLoja: '#C9A24B',
    titulo: 'Degradê na máquina zero e toalha quente no fim.',
    sublinha: 'há 3 h',
    foto: `${FOTO}/posts/barbearia-degrade.webp`,
    momento: { rotulo: '0:22', tipo: 'video' },
  },
  {
    id: 'bella',
    loja: 'Bella Cosméticos',
    corLoja: '#FFFFFF',
    titulo: 'Sérum Vitamina C 30ml',
    sublinha: 'R$ 89,90',
    foto: `${FOTO}/posts/bella-serum.webp`,
    momento: { rotulo: 'Em alta', tipo: 'alta' },
  },
  {
    id: 'mercado',
    loja: 'Mercado Central DV',
    corLoja: '#22863A',
    titulo: 'Caminhão do hortifruti descarregou às 5h.',
    sublinha: 'há 1 h',
    foto: `${FOTO}/posts/mercado-hortifruti.webp`,
  },
  {
    id: 'poltrona',
    loja: 'Casa & Conforto',
    corLoja: '#7C6A4E',
    titulo: 'Poltrona Nórdica Linho',
    sublinha: 'R$ 899,00',
    foto: `${FOTO}/posts/casa-poltrona.webp`,
  },
  {
    id: 'pilates',
    loja: 'Núcleo Pilates',
    corLoja: '#C6F42D',
    titulo: 'Série de reformer pra fortalecer o core.',
    sublinha: 'há 2 h',
    foto: `${FOTO}/posts/pilates-reformer.webp`,
    momento: { rotulo: '0:26', tipo: 'video' },
  },
  {
    id: 'idiomas',
    loja: 'Ponte Idiomas',
    corLoja: '#FFFFFF',
    titulo: 'Duas vagas na turma de conversação das 19h.',
    sublinha: 'ontem',
    foto: `${FOTO}/posts/ponte-idiomas.webp`,
  },
  {
    id: 'fisio',
    loja: 'Movimento Fisioterapia',
    corLoja: '#0D7A6E',
    titulo: 'Três exercícios pra lombar de quem passa o dia sentado.',
    sublinha: 'há 4 h',
    foto: `${FOTO}/posts/fisio-movimento.webp`,
    momento: { rotulo: '0:34', tipo: 'video' },
  },
]

// ─── Pisos (diretório) ────────────────────────────────────────────────

export interface Piso {
  ordem: number
  nome: string
  subtitulo: string
  /** VOZ_POR_PISO — o rótulo da vitrine e o convite do CTA do corredor. */
  vitrine: string
  cta: string
  icone: ConsumerIconName
  foto: string
  lojas: string[]
}

export const PISOS: Piso[] = [
  {
    ordem: 1,
    nome: 'Praça de Alimentação',
    subtitulo: 'Restaurantes, lanches e cafés',
    vitrine: 'Frescos do dia',
    cta: 'Pedir agora',
    icone: 'utensils',
    foto: `${FOTO}/pisos/alimentacao.webp`,
    lojas: ['Burger House DV', 'Forno Real', 'Café Aroma', 'Sushi Yamato'],
  },
  {
    ordem: 2,
    nome: 'Moda & Estilo',
    subtitulo: 'Roupas, calçados e acessórios',
    vitrine: 'Peças na vitrine',
    cta: 'Passear',
    icone: 'hanger',
    foto: `${FOTO}/pisos/moda.webp`,
    lojas: ['Monarca', 'Vitrine Fashion', 'Selene', 'Urban Wear'],
  },
  {
    ordem: 3,
    nome: 'Saúde',
    subtitulo: 'Farmácias, clínicas e bem-estar',
    vitrine: 'Cuidados em destaque',
    cta: 'Ver loja',
    icone: 'pulse',
    foto: `${FOTO}/pisos/saude.webp`,
    lojas: ['Farmácia Saúde+', 'Movimento Fisioterapia', 'Núcleo Pilates'],
  },
  {
    ordem: 4,
    nome: 'Beleza',
    subtitulo: 'Salões, estética e cosméticos',
    vitrine: 'Rituais da casa',
    cta: 'Ver loja',
    icone: 'scissors',
    foto: `${FOTO}/pisos/beleza.webp`,
    lojas: ['Bella Cosméticos', 'Barbearia Fio Nobre', 'Ateliê Camélia', 'Esmalteria Lilás'],
  },
  {
    ordem: 5,
    nome: 'Pet',
    subtitulo: 'Ração, acessórios e cuidados do pet',
    vitrine: 'Para o seu pet',
    cta: 'Pedir agora',
    icone: 'paw',
    foto: `${FOTO}/pisos/pet.webp`,
    lojas: ['Vira-Lata Chique', 'Amigo Fiel Pet'],
  },
  {
    ordem: 6,
    nome: 'Casa & Vida',
    subtitulo: 'Decoração, eletrônicos e ferramentas',
    vitrine: 'Para a sua casa',
    cta: 'Passear',
    icone: 'armchair',
    foto: `${FOTO}/pisos/casa.webp`,
    lojas: ['Casa & Conforto', 'Jardim & Flor', 'Lojão Central', 'Ferragens Cruzeiro'],
  },
  {
    ordem: 7,
    nome: 'Mercado',
    subtitulo: 'Mercado, hortifrúti e conveniência',
    vitrine: 'Na cesta hoje',
    cta: 'Pedir agora',
    icone: 'basket',
    foto: `${FOTO}/pisos/mercado.webp`,
    lojas: ['Quintal Verde', 'Mercado Central DV'],
  },
  {
    ordem: 8,
    nome: 'Serviços',
    subtitulo: 'Oficinas, manutenção e cursos',
    vitrine: 'Serviços em destaque',
    cta: 'Conhecer',
    icone: 'wrench',
    foto: `${FOTO}/pisos/servicos.webp`,
    lojas: ['Mecânica Beira-Rio', 'Ponte Idiomas', 'Clave Nove Estúdio', 'Reparo Já'],
  },
  {
    ordem: 9,
    nome: 'Presentes & Diversão',
    subtitulo: 'Brinquedos, papelaria e presentes',
    vitrine: 'Para presentear',
    cta: 'Passear',
    icone: 'gift',
    foto: `${FOTO}/pisos/presentes.webp`,
    lojas: ['Caixa de Mimos', 'Confete & Cia Festas', 'Pião & Girassol', 'Cesta & Afeto'],
  },
]

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
export const OUTRAS_VITRINES = [
  'Editorial',
  'Raw',
  'Serena',
  'Artesã',
  'Volt',
  'Clínica',
  'Torra',
  'Magazine',
  'Horta',
  'Mesa',
  'Gôndola',
  'Cuidado',
]

// ─── Explorar (reels) ─────────────────────────────────────────────────

export interface Reel {
  id: string
  loja: string
  inicial: string
  foto: string
  descricao: string
  tags: string[]
  curtidas: string
  comentarios: string
  produto?: { nome: string; preco: string }
}

export const REELS: Reel[] = [
  {
    id: 'burger',
    loja: 'Burger House DV',
    inicial: 'B',
    foto: `${FOTO}/posts/burger-smash-duplo.webp`,
    descricao:
      'Dois blends de 90g esmagados na chapa quente, cheddar derretendo por cima e bacon crocante. Sai em 18 minutos pra Divinópolis inteira.',
    tags: ['#smashburger', '#divinopolis'],
    curtidas: '1.842',
    comentarios: '137',
    produto: { nome: 'Smash Duplo Bacon', preco: 'R$ 32,90' },
  },
  {
    id: 'buque',
    loja: 'Ateliê Camélia',
    inicial: 'A',
    foto: `${FOTO}/posts/atelie-buque.webp`,
    descricao:
      'O buquê do mês saiu do balde às 6h: lisianthus branco, eucalipto baby e três camélias abertas. Embrulho em papel kraft e fita de algodão.',
    tags: ['#floricultura', '#feitoamao'],
    curtidas: '517',
    comentarios: '42',
    produto: { nome: 'Buquê Camélia do Mês', preco: 'R$ 129,00' },
  },
  {
    id: 'pet',
    loja: 'Vira-Lata Chique',
    inicial: 'V',
    foto: `${FOTO}/posts/pet-tobias.webp`,
    descricao:
      'O Tobias entrou parecendo um capacho e saiu galã. Banho com shampoo hipoalergênico, tosa higiênica e perfuminho de baunilha.',
    tags: ['#banhoetosa', '#petshop'],
    curtidas: '2.314',
    comentarios: '196',
  },
]

/** Conversa ao vivo: as falas e respostas do lib/comentarios.ts do app. */
export const COMENTARIOS = [
  { autor: 'Ana Clara', texto: 'Isso ficou muito bom' },
  { autor: 'Rafa', texto: 'Vocês entregam no Bom Pastor?' },
  { autor: 'Juliana M.', texto: 'Melhor da cidade, sem exagero' },
  { autor: 'Téo', texto: 'Já quero' },
  { autor: 'Bruna S.', texto: 'Salvando pra depois' },
  { autor: 'loja', texto: 'Entregamos sim! Qualquer coisa chama no direct.' },
  { autor: 'Marcos V.', texto: 'Fui semana passada e amei' },
  { autor: 'Lud', texto: 'Que capricho, gente' },
  { autor: 'Ricardo A.', texto: 'Comprei ontem, recomendo demais' },
  { autor: 'Paty', texto: 'Abre domingo?' },
  { autor: 'loja', texto: 'Ficamos felizes! Hoje ainda tem, é só passar.' },
  { autor: 'Gui', texto: 'Preço justo pelo que entrega' },
  { autor: 'Camila R.', texto: 'Tô indo agora' },
]

// ─── Pedido ao vivo ───────────────────────────────────────────────────

export type StatusPedido =
  | 'novo'
  | 'confirmado'
  | 'em_preparo'
  | 'aguardando_entregador'
  | 'saiu_para_entrega'
  | 'entregue'

export interface PassoPedido {
  status: StatusPedido
  rotulo: string
  descricao: string
  cor: string
  icone: ConsumerIconName
  progresso: number
}

/** META_STATUS do app (lib/status-pedido.ts), na ordem do fluxo. */
export const PASSOS_PEDIDO: PassoPedido[] = [
  { status: 'novo', rotulo: 'Aguardando confirmação', descricao: 'A loja está revisando seu pedido.', cor: '#F2B84B', icone: 'clock', progresso: 0.1 },
  { status: 'confirmado', rotulo: 'Pedido confirmado', descricao: 'A loja confirmou seu pedido.', cor: '#5BB7FF', icone: 'check-circle', progresso: 0.28 },
  { status: 'em_preparo', rotulo: 'Em preparo', descricao: 'Seu pedido está sendo preparado.', cor: '#F2B84B', icone: 'chef', progresso: 0.52 },
  { status: 'aguardando_entregador', rotulo: 'Aguardando entregador', descricao: 'Procurando um entregador disponível.', cor: '#F2B84B', icone: 'bike', progresso: 0.72 },
  { status: 'saiu_para_entrega', rotulo: 'Saiu para entrega', descricao: 'Seu pedido está a caminho.', cor: '#5BB7FF', icone: 'truck', progresso: 0.88 },
  { status: 'entregue', rotulo: 'Entregue', descricao: 'Pedido entregue. Bom apetite!', cor: '#8ED14F', icone: 'check-circle', progresso: 1 },
]

export const PEDIDO_DEMO = {
  loja: 'Café Aroma',
  iniciais: 'CA',
  /** Pele roast: o tijolo do recibo veste a loja. */
  tijolo: { bg: '#1C2617', ink: '#F2A33C' },
  itens: [
    { qtd: 2, nome: 'Cappuccino Trio', total: 'R$ 31,80', foto: `${FOTO}/lojas/cafe-aroma/cappuccino.webp` },
    { qtd: 1, nome: 'Croissant Amanteigado', total: 'R$ 11,90', foto: `${FOTO}/lojas/cafe-aroma/croissant.webp` },
  ],
  subtotal: 'R$ 43,70',
  total: 'R$ 43,70',
  pagamento: 'Pix',
  entregador: 'João da Silva',
  endereco: 'Av. Primeiro de Junho, 512 · Centro',
}
