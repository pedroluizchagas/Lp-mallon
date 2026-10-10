/**
 * Os modelos de painel por tipo de negócio (@mallevo/lib · templates/*):
 * quais módulos aparecem, como o catálogo se chama e os campos que o
 * produto ganha. `recursos` é o featuresDoTemplate do cadastro ("Seu painel
 * já vem otimizado com…").
 */
export interface ModeloPainel {
  codigo: string
  nome: string
  /** Rótulo curto do chip. */
  chip: string
  catalogo: string
  modulos: { estoque: boolean; entregadores: boolean; agenda: boolean }
  recursos: string[]
  campos: string[]
}

export const MODELOS: ModeloPainel[] = [
  {
    codigo: 'food',
    nome: 'Praça de Alimentação',
    chip: 'Comida',
    catalogo: 'Cardápio',
    modulos: { estoque: false, entregadores: true, agenda: false },
    recursos: ['Modificadores (adicionais, ponto da carne, etc.)', 'Gestão de entregadores'],
    campos: ['Tempo de preparo (min)', 'Serve quantas pessoas', 'Tags'],
  },
  {
    codigo: 'fashion',
    nome: 'Moda & Vestuário',
    chip: 'Moda',
    catalogo: 'Catálogo',
    modulos: { estoque: true, entregadores: true, agenda: false },
    recursos: ['Variações de produto (tamanho, cor, etc.)', 'Controle de estoque integrado', 'Gestão de entregadores'],
    campos: ['Coleção', 'Gênero', 'Tabela de medidas', 'Composição', 'Cuidados'],
  },
  {
    codigo: 'pharmacy',
    nome: 'Farmácia & Medicamentos',
    chip: 'Farmácia',
    catalogo: 'Catálogo',
    modulos: { estoque: true, entregadores: true, agenda: false },
    recursos: ['Variações de produto (tamanho, cor, etc.)', 'Controle de estoque integrado', 'Gestão de entregadores'],
    campos: ['Registro ANVISA', 'Princípio ativo', 'Exige receita', 'Bula (PDF)'],
  },
  {
    codigo: 'pet',
    nome: 'Pet Shop',
    chip: 'Pet',
    catalogo: 'Catálogo',
    modulos: { estoque: true, entregadores: true, agenda: true },
    recursos: [
      'Variações de produto (tamanho, cor, etc.)',
      'Controle de estoque integrado',
      'Agenda de horários',
      'Gestão de entregadores',
    ],
    campos: ['Espécie', 'Faixa de peso (kg)', 'Tipo'],
  },
  {
    codigo: 'services',
    nome: 'Serviços',
    chip: 'Serviços',
    catalogo: 'Serviços',
    modulos: { estoque: false, entregadores: false, agenda: true },
    recursos: ['Agenda de horários'],
    campos: ['Duração (minutos)', 'Profissionais aptos', 'Pedir sinal'],
  },
  {
    codigo: 'generic',
    nome: 'Produtos Diversos',
    chip: 'Varejo',
    catalogo: 'Produtos',
    modulos: { estoque: true, entregadores: true, agenda: false },
    recursos: ['Variações de produto (tamanho, cor, etc.)', 'Controle de estoque integrado', 'Gestão de entregadores'],
    campos: ['Garantia (meses)', 'Marca', 'Modelo', 'Dimensões'],
  },
]

/** O que o painel tem para todo tipo de loja (verificado no apps/web). */
export const DO_PAINEL = [
  { icone: 'search', titulo: 'Busca e atalhos', texto: 'Ctrl/⌘K abre qualquer tela; atalhos de teclado para o dia a dia.' },
  { icone: 'file', titulo: 'Planilha de produtos', texto: 'Importe o catálogo de um CSV e exporte quando quiser.' },
  { icone: 'chart', titulo: 'Relatórios', texto: 'Vendas, produtos, pedidos, clientes e bairros — com exportação.' },
  { icone: 'check-circle', titulo: 'Saúde da loja', texto: 'Um checklist vivo do que falta para vender melhor.' },
] as const
