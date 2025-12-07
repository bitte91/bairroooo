import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Alert, Message, ToastNotification, PostType, AlertType, Favorite, Notification, Business, ServiceProvider, SafetyAlert, NeighborGroup } from '../types';
import { MOCK_BUSINESSES, MOCK_SERVICE_PROVIDERS, MOCK_SAFETY_ALERTS, MOCK_NEIGHBOR_GROUPS } from './initialData';

interface AppContextType {
  currentUser: string | null;
  loginUser: (name: string) => void;
  logoutUser: () => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  posts: Post[];
  addPost: (post: Post) => void;

  alerts: Alert[];
  addAlert: (alert: Alert) => void;

  // New Data Models
  businesses: Business[];
  addBusiness: (business: Business) => void;

  serviceProviders: ServiceProvider[];
  addServiceProvider: (provider: ServiceProvider) => void;

  safetyAlerts: SafetyAlert[];
  addSafetyAlert: (alert: SafetyAlert) => void;

  neighborGroups: NeighborGroup[];

  messages: Message[];
  addMessage: (message: Message) => void;

  favorites: Favorite[];
  addFavorite: (item: Favorite) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (itemId: string) => boolean;

  toasts: ToastNotification[];
  addToast: (message: string, type: 'success' | 'error') => void;
  removeToast: (id: number) => void;

  notifications: Notification[];
  markAsRead: (id: number) => void;
  clearNotifications: () => void;

  // Features
  badges: string[]; // Mock badges for now

  showOnboarding: boolean;
  completeOnboarding: () => void;

  // Navigation State (Simple view switching)
  // Extended with new views
  currentView: 'home' | 'saved' | 'profile' | 'events' | 'services' | 'map' | 'business' | 'providers' | 'safety';
  setCurrentView: (view: 'home' | 'saved' | 'profile' | 'events' | 'services' | 'map' | 'business' | 'providers' | 'safety') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Data with Coordinates (Mocking a neighborhood in São Paulo roughly)
const CENTER_LAT = -23.5505;
const CENTER_LNG = -46.6333;

const INITIAL_POSTS: Post[] = [
  { id: 1, title: "Eletricista Residencial", desc: "Instalação de tomadas, chuveiros e reparos. Orçamento grátis.", author: "Carlos Ruiz", type: "autonomo", latitude: -23.5510, longitude: -46.6340, serviceProviderId: 'sp1' },
  { id: 2, title: "Pães Artesanais - 20% OFF", desc: "Toda a linha de fermentação natural com desconto hoje.", author: "Padaria do Zé", type: "promocao", latitude: -23.5520, longitude: -46.6320, businessId: 'b2' },
  { id: 3, title: "Mercadinho da Esquina", desc: "Entregas gratuitas para compras acima de R$50 no bairro.", author: "Mercadinho Bom Dia", type: "comercio", latitude: -23.5490, longitude: -46.6350, businessId: 'b1' },
  { id: 4, title: "Aulas de Inglês", desc: "Aulas particulares para crianças e adolescentes. Primeira aula grátis.", author: "Ana Lima", type: "autonomo", latitude: -23.5500, longitude: -46.6310, serviceProviderId: 'sp2' },
  { id: 5, title: "Balconista de Padaria", desc: "Vaga para período da manhã. Entregar currículo no local.", author: "Padaria do Zé", type: "vaga", latitude: -23.5520, longitude: -46.6320, businessId: 'b2' }
];

const INITIAL_ALERTS: Alert[] = [
  { id: 101, title: "Troca de Lâmpada", desc: "Preciso de ajuda para trocar lâmpada do quintal. Sou idosa e não alcanço.", author: "Dona Maria", type: "ajuda", timestamp: "10:00" },
  { id: 102, title: "Gato Desaparecido", desc: "Gato siamês atende por 'Mingau'. Visto por último na Rua das Flores.", author: "Julia S.", type: "pet", image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", timestamp: "Ontem" },
  { id: 103, title: "Movimentação Estranha", desc: "Carro prata parado há muito tempo na esquina da padaria. Fiquem atentos.", author: "Vigilância Comunitária", type: "seguranca", timestamp: "Agora" }
];

const INITIAL_MESSAGES: Message[] = [
  { id: 1, text: "Bom dia pessoal! Alguém recomenda um encanador?", author: "Pedro M.", timestamp: "10:30" },
  { id: 2, text: "O Carlos é ótimo, o número dele está nos anúncios acima!", author: "Mariana S.", timestamp: "10:32" }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  // New State
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>(MOCK_SERVICE_PROVIDERS);
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>(MOCK_SAFETY_ALERTS);
  const [neighborGroups, setNeighborGroups] = useState<NeighborGroup[]>(MOCK_NEIGHBOR_GROUPS);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [badges, setBadges] = useState<string[]>([]);

  const [currentView, setCurrentView] = useState<'home' | 'saved' | 'profile' | 'events' | 'services' | 'map' | 'business' | 'providers' | 'safety'>('home');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    // Onboarding check
    const onboardingDone = localStorage.getItem('cb_onboarding_done');
    if (!onboardingDone) {
      setShowOnboarding(true);
    }

    const savedUser = localStorage.getItem('cb_user');
    if (savedUser) setCurrentUser(savedUser);

    const savedTheme = localStorage.getItem('cb_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    const savedFavorites = localStorage.getItem('cb_favorites');
    if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Theme Effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cb_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cb_theme', 'light');
    }
  }, [theme]);

  // Favorites Effect
  useEffect(() => {
      localStorage.setItem('cb_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const loginUser = (name: string) => {
    setCurrentUser(name);
    localStorage.setItem('cb_user', name);
    addToast(`Olá, ${name}! Você está conectado.`, 'success');
  };

  const logoutUser = () => {
      setCurrentUser(null);
      localStorage.removeItem('cb_user');
      addToast('Você saiu da conta.', 'success');
  }

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const addPost = (post: Post) => {
      setPosts(prev => [post, ...prev]);
  };

  const addAlert = (alert: Alert) => {
      setAlerts(prev => [alert, ...prev]);
  };

  // New adders
  const addBusiness = (business: Business) => {
    setBusinesses(prev => [business, ...prev]);
  };

  const addServiceProvider = (provider: ServiceProvider) => {
    setServiceProviders(prev => [provider, ...prev]);
  };

  const addSafetyAlert = (alert: SafetyAlert) => {
    setSafetyAlerts(prev => [alert, ...prev]);
  };

  const addMessage = (message: Message) => {
      setMessages(prev => [...prev, message]);
  };

  const addFavorite = (item: Favorite) => {
      setFavorites(prev => [...prev, item]);
      addToast('Item salvo em favoritos!', 'success');
  };

  const removeFavorite = (id: string) => {
      setFavorites(prev => prev.filter(f => f.id !== id));
      addToast('Item removido dos favoritos.', 'success');
  };

  const isFavorite = (itemId: string) => {
      return favorites.some(f => f.itemId === itemId.toString());
  };

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Mock Notifications System
  useEffect(() => {
    // Simulate receiving a notification after 10 seconds if logged in
    const timer = setTimeout(() => {
      if (currentUser) {
        const newNotif: Notification = {
          id: Date.now(),
          title: "Novo Evento Próximo",
          message: "A 'Feira de Trocas' começa em 1 hora na Praça Central.",
          timestamp: "Agora",
          read: false,
          type: "system"
        };
        setNotifications(prev => [newNotif, ...prev]);
        addToast("Você tem uma nova notificação!", "success");
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentUser]);

  const markAsRead = (id: number) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
      setNotifications([]);
  };

  const completeOnboarding = () => {
      setShowOnboarding(false);
      localStorage.setItem('cb_onboarding_done', 'true');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginUser,
        logoutUser,
        theme,
        toggleTheme,
        posts,
        addPost,
        alerts,
        addAlert,
        businesses,
        addBusiness,
        serviceProviders,
        addServiceProvider,
        safetyAlerts,
        addSafetyAlert,
        neighborGroups,
        messages,
        addMessage,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toasts,
        addToast,
        removeToast,
        notifications,
        markAsRead,
        clearNotifications,
        badges,
        currentView,
        setCurrentView,
        showOnboarding,
        completeOnboarding
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
