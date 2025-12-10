import { Business, ServiceProvider, SafetyAlert, NeighborGroup, NewsItem, Event } from '../shared/types';

export const MOCK_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'Outback Steakhouse',
    category: 'restaurante',
    description: 'Steakhouse de temática australiana, famosa pela Bloomin\' Onion e cortes de carnes especiais. Ambiente acolhedor e descontraído.',
    address: 'Av. Charles Schnneider, 1700 - Taubaté Shopping',
    bairro: 'Vila Costa',
    latitude: -23.0248,
    longitude: -45.5830,
    whatsapp: '551236314856',
    openingHours: 'Seg-Qui 11:30-22:30, Sex-Sáb 11:30-23:00, Dom 12:00-22:00',
    paymentMethods: ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'Vale Refeição'],
    delivery: true,
    highlights: ['Bloomin Onion', 'Costela', 'Happy Hour'],
    isVerified: true,
    isSafetyPartner: false,
    featured: true,
    promoMessage: 'Happy hour com 2 porções + chopp em dobro'
  },
  {
    id: 'b2',
    name: 'Coco Bambu',
    category: 'restaurante',
    description: 'Restaurante especializado em frutos do mar e pratos típicos brasileiros em um ambiente elegante e espaçoso.',
    address: 'Av. Charles Schnneider, 1700 - Taubaté Shopping',
    bairro: 'Vila Costa',
    latitude: -23.0248,
    longitude: -45.5830,
    whatsapp: '551236315000',
    openingHours: 'Todos os dias 11:30 - 23:00',
    paymentMethods: ['Cartão', 'Dinheiro'],
    delivery: true,
    highlights: ['Camarão Internacional', 'Frutos do Mar', 'Vinhos'],
    isVerified: true,
    featured: true,
    promoMessage: 'Cardápio executivo no almoço com sobremesa inclusa'
  },
  {
    id: 'b3',
    name: 'Bar do Urso (Cervejaria Colorado)',
    category: 'restaurante',
    description: 'Bar oficial da Cervejaria Colorado. Chopes artesanais brasileiros premiados e petiscos de boteco.',
    address: 'Av. Itália, 258',
    bairro: 'Jardim das Nações',
    latitude: -23.0270,
    longitude: -45.5580,
    whatsapp: '5512999999999',
    openingHours: 'Ter-Sex 17:00-00:00, Sáb-Dom 12:00-00:00',
    paymentMethods: ['Cartão', 'Pix'],
    delivery: true,
    highlights: ['Chopp Artesanal', 'Petiscos', 'Música ao Vivo'],
    isVerified: true,
    promoMessage: 'Clube do growler com 20% de cashback'
  },
  {
    id: 'b4',
    name: 'Choperia Pinguim',
    category: 'restaurante',
    description: 'Tradicional choperia famosa pelo chopp cremoso e pratos clássicos. O melhor chopp da região.',
    address: 'Rodovia Presidente Dutra, Km 94,5 (Graal)',
    bairro: 'Pindamonhangaba',
    latitude: -22.9567,
    longitude: -45.4856,
    whatsapp: '551236422000',
    openingHours: 'Todos os dias 11:00 - 23:00',
    paymentMethods: ['Cartão', 'Dinheiro'],
    highlights: ['Chopp Pinguim', 'Comida Alemã'],
    isVerified: true,
    promoMessage: 'Rodízio de petiscos nas quartas'
  },
  {
    id: 'b5',
    name: 'Mousse Cake',
    category: 'restaurante',
    description: 'Doceria e restaurante com cardápio variado, desde saladas e pratos principais até as famosas sobremesas.',
    address: 'Av. Charles Schnneider, 1700 - Taubaté Shopping',
    bairro: 'Vila Costa',
    latitude: -23.0248,
    longitude: -45.5830,
    whatsapp: '551236316000',
    openingHours: 'Todos os dias 12:00 - 22:00',
    paymentMethods: ['Cartão', 'Pix', 'Vale Refeição'],
    delivery: true,
    highlights: ['Sobremesas', 'Cafés', 'Almoço'],
    isVerified: true
  },
  {
    id: 'b6',
    name: 'Mercadinho do Zé',
    category: 'mercado',
    description: 'Mercado de bairro com hortifruti fresco, açougue e itens de conveniência.',
    address: 'Rua das Laranjeiras, 120',
    bairro: 'Quiririm',
    whatsapp: '5512988888888',
    openingHours: 'Todos os dias 08:00 - 21:00',
    delivery: true,
    highlights: ['Entrega rápida', 'Produtos locais', 'Ofertas do dia'],
    promoMessage: 'Lista de compras via WhatsApp e entrega no mesmo dia'
  },
  {
    id: 'b7',
    name: 'Padaria Nuvem Doce',
    category: 'padaria',
    description: 'Pães artesanais de fermentação natural, brunch de fim de semana e café especial.',
    address: 'Rua das Acácias, 45',
    bairro: 'Jardim das Flores',
    whatsapp: '5512977777777',
    openingHours: 'Seg-Sáb 07:00 - 20:00',
    highlights: ['Croissant de amêndoas', 'Café especial', 'Brunch'],
    featured: true,
    promoMessage: 'Assinatura semanal de pães com 10% de desconto'
  },
  {
    id: 'b8',
    name: 'Farmácia Bem+ Saúde',
    category: 'farmacia',
    description: 'Entrega de medicamentos 24h, teste de glicemia e aferição de pressão no local.',
    address: 'Av. Independência, 501',
    bairro: 'Centro',
    whatsapp: '5512966666666',
    openingHours: '24 horas',
    delivery: true,
    highlights: ['Plantão 24h', 'Entrega expressa', 'Atendimento consultório'],
    promoMessage: 'Programa de descontos para receitas de uso contínuo'
  },
  {
    id: 'b9',
    name: 'Pet Wash & Care',
    category: 'pet',
    description: 'Banho e tosa humanizado, táxi pet e plano mensal para cães e gatos.',
    address: 'Rua do Bosque, 88',
    bairro: 'Residencial Primavera',
    whatsapp: '5512955555555',
    openingHours: 'Ter-Dom 09:00 - 19:00',
    delivery: true,
    highlights: ['Táxi pet', 'Tosa especializada', 'Clube mensal'],
    featured: true,
    promoMessage: 'Primeiro banho com 15% off + avaliação gratuita'
  }
];

export const MOCK_SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 'sp1',
    name: 'Carlos Ruiz',
    serviceType: 'eletricista',
    description: 'Instalação de tomadas, chuveiros, reparos elétricos em geral.',
    whatsapp: '5512966666666',
    bairro: 'Vila Nova',
    radiusKm: 10,
    rating: 4.8,
    reviewsCount: 42,
    isRecommendedByNeighbors: true,
    headline: 'Emergências elétricas 24h'
  },
  {
    id: 'sp2',
    name: 'Ana Lima',
    serviceType: 'aulaparticular',
    description: 'Aulas de inglês e reforço escolar para crianças.',
    whatsapp: '5512955555555',
    bairro: 'Jardim das Rosas',
    rating: 5.0,
    reviewsCount: 15,
    isSolidary: true,
    headline: 'Aulas personalizadas com material próprio'
  },
  {
    id: 'sp3',
    name: 'Maria Silva',
    serviceType: 'diarista',
    description: 'Limpeza residencial e comercial. Caprichosa e pontual.',
    whatsapp: '5512944444444',
    bairro: 'Centro',
    rating: 4.9,
    reviewsCount: 88,
    isRecommendedByNeighbors: true,
    isSolidary: true,
    headline: 'Pacotes semanais e diárias avulsas'
  }
];

export const MOCK_SAFETY_ALERTS: SafetyAlert[] = [
  {
    id: 'sa1',
    category: 'seguranca',
    title: 'Movimentação Suspeita',
    description: 'Carro prata parado há muito tempo na esquina da padaria com 2 ocupantes observando as casas.',
    createdAt: new Date().toISOString(),
    createdBy: 'Vigilância Comunitária',
    urgency: 'media',
    street: 'Av. Principal com Rua das Flores',
    latitude: -23.5520,
    longitude: -46.6320,
    resolved: false
  },
  {
    id: 'sa2',
    category: 'pet',
    title: 'Cachorro Perdido',
    description: 'Cachorro caramelo visto correndo assustado próximo ao parque.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    createdBy: 'Morador Anônimo',
    urgency: 'baixa',
    resolved: false
  }
];

export const MOCK_NEIGHBOR_GROUPS: NeighborGroup[] = [
  {
    id: 'ng1',
    name: 'Vizinhança Solidária - Centro',
    bairro: 'Centro',
    membersCount: 128,
    rules: [
      'Não compartilhar correntes ou fake news',
      'Respeitar horários de silêncio para mensagens não urgentes',
      'Focar em segurança e ajuda mútua'
    ],
    safetyTips: [
      'Ao chegar em casa à noite, avise no grupo',
      'Não reaja a assaltos',
      'Conheça seus vizinhos de porta'
    ]
  }
];

export const MOCK_NEWS: NewsItem[] = [
    { 
        id: 1,
        title: "Inauguração da Horta Comunitária!",
        source: "Conecta Vila",
        time: "Há 2 horas",
        imageUrl: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800",
        link: "#",
        category: "Eventos"
    },
    {
        id: 2,
        title: "Melhorias na Iluminação Pública",
        source: "Prefeitura",
        time: "Ontem",
        imageUrl: "https://images.unsplash.com/photo-1510596713412-56030c252371?auto=format&fit=crop&q=80&w=800",
        link: "#",
        category: "Melhorias"
    },
    {
        id: 3,
        title: "Campeonato de Futebol do Bairro",
        source: "Associação de Moradores",
        time: "23 Out",
        imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
        link: "#",
        category: "Local"
    }
];

export const MOCK_EVENTS: (Event & { section: 'today' | 'tomorrow' | 'next_week', timeStr: string })[] = [
    {
        id: 1,
        title: "Feira de Trocas e Doações",
        description: "Traga o que não usa mais e troque por algo que precisa.",
        timeStr: "14:00 - 17:00",
        location: "Centro Comunitário da Vila",
        date: "Hoje, 24 de Outubro",
        category: 'community',
        section: "today",
        latitude: 0,
        longitude: 0
    },
    {
        id: 2,
        title: "Reunião de Moradores: Melhorias na Praça",
        description: "Discussão sobre o novo projeto de paisagismo.",
        timeStr: "19:30",
        location: "Salão Paroquial",
        date: "Amanhã, 25 de Outubro",
        category: 'community',
        section: "tomorrow",
        latitude: 0,
        longitude: 0
    },
    {
        id: 3,
        title: "Oficina de Jardinagem Urbana",
        description: "Aprenda a cultivar seus próprios alimentos em pequenos espaços.",
        timeStr: "Sábado, 28 Out • 09:00",
        location: "Praça Central",
        date: "Próxima Semana",
        category: 'other',
        section: "next_week",
        latitude: 0,
        longitude: 0
    },
    {
        id: 4,
        title: "Festa Junina Fora de Época",
        description: "Comidas típicas, música e diversão para toda a família.",
        timeStr: "Domingo, 29 Out • 16:00",
        location: "Campo de Futebol",
        date: "Próxima Semana",
        category: 'community',
        section: "next_week",
        latitude: 0,
        longitude: 0
    }
];
