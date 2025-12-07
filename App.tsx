import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { LoginModal, CreatePostModal } from './components/Modals';
import { PostType, AlertType } from './types';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { SavedItems } from './components/SavedItems';
import { EventsSection } from './components/EventsSection';
import { UserProfile } from './components/UserProfile';
import { MapView } from './components/MapView';
import { BottomNav } from './components/BottomNav';
import { Onboarding } from './components/Onboarding';
import { ChatSection } from './components/ChatSection';

// New Views
import { BusinessDirectoryView } from './components/views/BusinessDirectoryView';
import { ServiceProvidersView } from './components/views/ServiceProvidersView';
import { SafetyAndSolidarityView } from './components/views/SafetyAndSolidarityView';

export default function App() {
  const {
    currentUser,
    loginUser,
    addPost,
    addAlert,
    addMessage,
    toasts,
    removeToast,
    theme,
    toggleTheme,
    setCurrentView,
    showOnboarding,
    messages
  } = useApp();
  
  const location = useLocation();

  // Update currentView context based on route for backward compatibility (e.g. BottomNav highlighting)
  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrentView('home');
    else if (path === '/comercio') setCurrentView('business');
    else if (path === '/servicos') setCurrentView('providers');
    else if (path === '/seguranca') setCurrentView('safety');
    else if (path === '/perfil') setCurrentView('profile');
    else if (path === '/meus-lugares') setCurrentView('saved');
    else if (path === '/eventos') setCurrentView('events');
    else if (path === '/mapa') setCurrentView('map');
  }, [location, setCurrentView]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState<{initialMode: 'post' | 'alert', initialAlertType?: AlertType}>({ initialMode: 'post' });

  // Initial login check handled in Context

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
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
        const newPost = {
            id: Date.now(),
            title,
            desc,
            type,
            author: currentUser
        };
        addPost(newPost);
        setIsSubmitting(false);
        setIsPostModalOpen(false);
        // Toast is added by Context or we can add it here if needed
    }, 1500);
  };

  const handleCreateAlert = (title: string, desc: string, type: AlertType, image?: string) => {
    if (!currentUser) return;
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
        const newAlert = {
            id: Date.now(),
            title,
            desc,
            type,
            author: currentUser,
            image,
            timestamp: 'Agora'
        };
        addAlert(newAlert);
        setIsSubmitting(false);
        setIsPostModalOpen(false);
    }, 1500);
  };

  const handleSendMessage = (text: string) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    const newMessage = {
      id: Date.now(),
      text,
      author: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    addMessage(newMessage);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans text-gray-800 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300`}>
      <Header 
        scrollToId={(id) => {
            // Keep this for now, but in future, navigation might handle this
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        darkMode={theme === 'dark'}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 py-6">
        <Routes>
          <Route path="/" element={
            <Home
              onOpenPostModal={() => openCreateModal('post')}
              onOpenAlertModal={(mode, type) => openCreateModal(mode, type)}
              onRequireLogin={() => setIsLoginModalOpen(true)}
            />
          } />
          <Route path="/comercio" element={<BusinessDirectoryView />} />
          <Route path="/servicos" element={<ServiceProvidersView />} />
          <Route path="/seguranca" element={<SafetyAndSolidarityView />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/meus-lugares" element={<SavedItems />} />
          <Route path="/eventos" element={<EventsSection />} />
          <Route path="/mapa" element={<MapView />} />
          <Route path="/chat" element={
             <ChatSection
              messages={messages}
              onSendMessage={handleSendMessage}
              currentUser={currentUser}
              onRequireLogin={() => setIsLoginModalOpen(true)}
            />
          } />
        </Routes>
      </main>

      <Footer />

      <BottomNav />

      {/* Onboarding Overlay */}
      {showOnboarding && <Onboarding />}

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal 
          onLogin={loginUser}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      
      {isPostModalOpen && (
        <CreatePostModal 
          onClose={() => setIsPostModalOpen(false)} 
          onSubmitPost={handleCreatePost}
          onSubmitAlert={handleCreateAlert}
          initialMode={modalConfig.initialMode}
          initialAlertType={modalConfig.initialAlertType}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg text-white animate-slideIn ${
              toast.type === 'success' ? 'bg-slate-800 dark:bg-slate-700 border-l-4 border-emerald-400' : 'bg-slate-800 dark:bg-slate-700 border-l-4 border-red-500'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle size={20} className="text-emerald-400" /> : <AlertCircle size={20} className="text-red-500" />}
            <span className="font-medium">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-2 opacity-70 hover:opacity-100">
               <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
