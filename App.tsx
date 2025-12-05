import React, { useState } from 'react';
import { useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PostList } from './components/PostList';
import { NewsSection } from './components/NewsSection';
import { SolidaritySection } from './components/SolidaritySection';
import { ChatSection } from './components/ChatSection';
import { Footer } from './components/Footer';
import { LoginModal, CreatePostModal } from './components/Modals';
import { PostType, AlertType } from './types';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { SavedItems } from './components/SavedItems';
import { EventsSection } from './components/EventsSection';
import { ServiceDirectory } from './components/ServiceDirectory';
import { UserProfile } from './components/UserProfile';
import { QuickAccess } from './components/QuickAccess';
import { MapView } from './components/MapView';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const {
    currentUser,
    loginUser,
    posts,
    addPost,
    alerts,
    addAlert,
    messages,
    addMessage,
    toasts,
    removeToast,
    theme,
    toggleTheme,
    currentView,
    setCurrentView
  } = useApp();
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
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
    const newPost = {
      id: Date.now(),
      title,
      desc,
      type,
      author: currentUser
    };
    addPost(newPost);
    setIsPostModalOpen(false);
  };

  const handleCreateAlert = (title: string, desc: string, type: AlertType, image?: string) => {
    if (!currentUser) return;
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
    setIsPostModalOpen(false);
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

  // Render content based on currentView
  const renderContent = () => {
      switch(currentView) {
          case 'saved':
              return <SavedItems />;
          case 'events':
              return <EventsSection />;
          case 'services':
              return <ServiceDirectory />;
          case 'map':
              return <MapView />;
          case 'profile':
              return <UserProfile />;
          case 'home':
          default:
              return (
                <>
                    <Hero
                    onOpenPostModal={() => openCreateModal('post')}
                    />

                    <QuickAccess />

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
                </>
              );
      }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans text-gray-800 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300`}>
      <Header 
        scrollToId={(id) => {
            setCurrentView('home');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }}
        darkMode={theme === 'dark'}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 py-6">
        {renderContent()}
      </main>

      <Footer />

      <BottomNav />

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
