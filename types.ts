export type PostType = 'comercio' | 'autonomo' | 'promocao';
export type AlertType = 'ajuda' | 'pet' | 'seguranca';

export interface Post {
  id: number;
  title: string;
  desc: string;
  author: string;
  type: PostType;
  image?: string;
  latitude?: number;
  longitude?: number;
}

export interface Alert {
  id: number;
  title: string;
  desc: string;
  author: string;
  type: AlertType;
  image?: string; // Para pets ou locais
  timestamp: string;
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  imageUrl: string;
  link: string;
}

export interface Message {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

export interface User {
  name: string;
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
  itemType: 'post' | 'alert' | 'event';
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
