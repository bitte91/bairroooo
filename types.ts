export type PostType = 'comercio' | 'autonomo' | 'promocao';
export type AlertType = 'ajuda' | 'pet' | 'seguranca';

export interface Post {
  id: number;
  title: string;
  desc: string;
  author: string;
  type: PostType;
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
}

export interface ToastNotification {
  id: number;
  message: string;
  type: 'success' | 'error';
}