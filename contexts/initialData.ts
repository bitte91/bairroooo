import { Business, ServiceProvider, SafetyAlert, NeighborGroup } from '../types';

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
    longitude: -46.6320
  },
  {
    id: 'sa2',
    category: 'pet',
    title: 'Cachorro Perdido',
    description: 'Cachorro caramelo visto correndo assustado próximo ao parque.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    createdBy: 'Morador Anônimo',
    urgency: 'baixa'
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
