import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PostList } from './components/PostList';
import { NewsSection } from './components/NewsSection';
import { SolidaritySection } from './components/SolidaritySection';
import { ChatSection } from './components/ChatSection';
import { Footer } from './components/Footer';
import { LoginModal, CreatePostModal } from './components/Modals';
import { Post, Message, PostType, ToastNotification, Alert, AlertType } from './types';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const INITIAL_POSTS: Post[] = [
  { id: 1, title: "Eletricista Residencial", desc: "Instalação de tomadas, chuveiros e reparos. Orçamento grátis.", author: "Carlos Ruiz", type: "autonomo" },
  { id: 2, title: "Pães Artesanais - 20% OFF", desc: "Toda a linha de fermentação natural com desconto hoje.", author: "Padaria do Zé", type: "promocao" },
  { id: 3, title: "Mercadinho da Esquina", desc: "Entregas gratuitas para compras acima de R$50 no bairro.", author: "Mercadinho Bom Dia", type: "comercio" },
  { id: 4, title: "Aulas de Inglês", desc: "Aulas particulares para crianças e adolescentes. Primeira aula grátis.", author: "Ana Lima", type: "autonomo" }
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

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // State to configure the create modal (tab and alert type)
  const [modalConfig, setModalConfig] = useState<{initialMode: 'post' | 'alert', initialAlertType?: AlertType}>({ initialMode: 'post' });
  
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Load user and theme from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('cb_user');
    if (savedUser) {
      setCurrentUser(savedUser);
      addToast(`Bem-vindo de volta, ${savedUser}!`, 'success');
    } else {
      setIsLoginModalOpen(true);
    }

    const savedTheme = localStorage.getItem('cb_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cb_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cb_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleLogin = (name: string) => {
    setCurrentUser(name);
    localStorage.setItem('cb_user', name);
    setIsLoginModalOpen(false);
    addToast(`Olá, ${name}! Você está conectado.`, 'success');
  };

  const openCreateModal = (mode: 'post' | 'alert', alertType: AlertType = 'ajuda') => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    setModalConfig({ initialMode: mode, initialAlertType: alertType });
    setIsPostModalOpen(true);
  };

  const handleCreatePost = (title: string, desc: string, type: PostType) => {
    if (!currentUser) return;
    const newPost: Post = {
      id: Date.now(),
      title,
      desc,
      type,
      author: currentUser
    };
    setPosts(prev => [newPost, ...prev]);
    setIsPostModalOpen(false);
    addToast('Anúncio publicado com sucesso!', 'success');
  };

  const handleCreateAlert = (title: string, desc: string, type: AlertType, image?: string) => {
    if (!currentUser) return;
    const newAlert: Alert = {
        id: Date.now(),
        title,
        desc,
        type,
        author: currentUser,
        image,
        timestamp: 'Agora'
    };
    setAlerts(prev => [newAlert, ...prev]);
    setIsPostModalOpen(false);
    addToast('Alerta de solidariedade publicado!', 'success');
  };

  const handleSendMessage = (text: string) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    const newMessage: Message = {
      id: Date.now(),
      text,
      author: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans text-gray-800 bg-[#f5f6fa] dark:bg-dark-bg dark:text-dark-text transition-colors duration-300`}>
      <Header 
        scrollToId={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} 
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 py-6">
        <Hero 
          onOpenPostModal={() => openCreateModal('post')} 
        />
        
        <div id="news" className="scroll-mt-24">
            <NewsSection />
        </div>

        <div id="solidarity" className="scroll-mt-24">
            <SolidaritySection 
              alerts={alerts} 
              onRequestHelp={() => openCreateModal('alert', 'ajuda')} 
            />
        </div>
        
        <div id="posts" className="scroll-mt-24">
          <PostList posts={posts} />
        </div>
        
        <div id="chat" className="scroll-mt-24">
          <ChatSection 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            currentUser={currentUser}
            onRequireLogin={() => setIsLoginModalOpen(true)}
          />
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal 
          onLogin={handleLogin} 
          onClose={() => currentUser && setIsLoginModalOpen(false)} 
        />
      )}
      
      {isPostModalOpen && (
        <CreatePostModal 
          onClose={() => setIsPostModalOpen(false)} 
          onSubmitPost={handleCreatePost}
          onSubmitAlert={handleCreateAlert}
          initialMode={modalConfig.initialMode}
          initialAlertType={modalConfig.initialAlertType}
        />
      )}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg text-white animate-slideIn ${
              toast.type === 'success' ? 'bg-gray-800 dark:bg-slate-700 border-l-4 border-emerald-400' : 'bg-gray-800 dark:bg-slate-700 border-l-4 border-red-500'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle size={20} className="text-emerald-400" /> : <AlertCircle size={20} className="text-red-500" />}
            <span className="font-medium">{toast.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-2 opacity-70 hover:opacity-100">
               <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}