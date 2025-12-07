import { Business, ServiceProvider, SafetyAlert, NeighborGroup, NewsItem, Event } from '../shared/types';

export const MOCK_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'Mercadinho da Esquina',
    category: 'mercado',
    description: 'Tudo para o seu dia a dia. Entregas grátis acima de R$50.',
    address: 'Rua das Flores, 123',
    bairro: 'Centro',
    latitude: -23.5490,
    longitude: -46.6350,
    whatsapp: '5512999999999',
    openingHours: 'Seg-Sáb 08:00 - 20:00',
    paymentMethods: ['Cartão', 'Pix', 'Dinheiro'],
    delivery: true,
    isVerified: true,
    isSafetyPartner: true
  },
  {
    id: 'b2',
    name: 'Padaria do Zé',
    category: 'padaria',
    description: 'Pães artesanais, bolos e café quentinho a toda hora.',
    address: 'Av. Principal, 456',
    bairro: 'Jardim das Rosas',
    latitude: -23.5520,
    longitude: -46.6320,
    whatsapp: '5512988888888',
    openingHours: 'Todos os dias 06:00 - 22:00',
    highlights: ['Pão na chapa', 'Cafezinho'],
    isVerified: true
  },
  {
    id: 'b3',
    name: 'Farmácia Saúde',
    category: 'farmacia',
    description: 'Medicamentos e perfumaria com os melhores preços.',
    address: 'Rua do Comércio, 789',
    bairro: 'Centro',
    whatsapp: '5512977777777',
    openingHours: '24 horas',
    delivery: true,
    isSafetyPartner: true
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
    isRecommendedByNeighbors: true
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
    isSolidary: true
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
    isSolidary: true
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
        link: "#"
    },
    {
        id: 2,
        title: "Melhorias na Iluminação Pública",
        source: "Prefeitura",
        time: "Ontem",
        imageUrl: "https://images.unsplash.com/photo-1510596713412-56030c252371?auto=format&fit=crop&q=80&w=800",
        link: "#"
    },
    {
        id: 3,
        title: "Campeonato de Futebol do Bairro",
        source: "Associação de Moradores",
        time: "23 Out",
        imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
        link: "#"
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
