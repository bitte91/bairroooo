export type PostType = 'comercio' | 'autonomo' | 'promocao' | 'vaga';
export type AlertType = 'ajuda' | 'pet' | 'seguranca';

export interface Post {
  id: number;
  title: string;
  desc: string;
  author: string; // This might need to be User object or string ID
  type: PostType;
  image?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  businessId?: string;
  serviceProviderId?: string;
}

export interface Alert {
  id: number;
  title: string;
  desc: string;
  author: string;
  type: AlertType;
  image?: string;
  timestamp: string;
}

export type BusinessCategory = 'mercado' | 'padaria' | 'restaurante' | 'farmacia' | 'pet' | 'servico' | 'outros';

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  address: string;
  bairro: string;
  latitude?: number;
  longitude?: number;
  whatsapp?: string;
  instagram?: string;
  openingHours?: string;
  paymentMethods?: string[];
  delivery?: boolean;
  highlights?: string[];
  isVerified?: boolean;
  isSafetyPartner?: boolean;
}

export type ServiceProviderType = 'diarista' | 'eletricista' | 'encanador' | 'aulaparticular' | 'cuidado_idosos' | 'passeador_pets' | 'chaveiro' | 'outros';

export interface ServiceProvider {
  id: string;
  name: string;
  serviceType: ServiceProviderType;
  description: string;
  whatsapp?: string;
  bairro: string;
  radiusKm?: number;
  portfolio?: string[];
  rating?: number;
  reviewsCount?: number;
  isSolidary?: boolean;
  isRecommendedByNeighbors?: boolean;
}

export type AlertCategory = 'seguranca' | 'pet' | 'ajuda' | 'objeto_perdido' | 'informativo';

export interface SafetyAlert {
  id: string;
  category: AlertCategory;
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
  street?: string;
  latitude?: number;
  longitude?: number;
  urgency: 'baixa' | 'media' | 'alta';
  resolved?: boolean;
}

export interface NeighborGroup {
  id: string;
  name: string;
  bairro: string;
  membersCount: number;
  rules: string[];
  safetyTips: string[];
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  imageUrl: string;
  link: string;
  category: 'Eventos' | 'Segurança' | 'Melhorias' | 'Local';
}

export interface Message {
  id: number;
  text: string;
  author: User | string; // Normalized to User usually
  timestamp: string;
}

export interface User {
  id?: string;
  name: string;
  email?: string;
  avatar?: string;
  role?: 'user' | 'provider' | 'admin';
  points?: number;
  badges?: Badge[];
}

export interface ToastNotification {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'post' | 'alert' | 'event' | 'business' | 'service';
  title: string;
  createdAt: string;
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    category: 'community' | 'religious' | 'market' | 'other';
    latitude?: number;
    longitude?: number;
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    type: 'system' | 'alert' | 'post';
}
