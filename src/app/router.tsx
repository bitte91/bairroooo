import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from '../shared/components/layout/Header';
import { Footer } from '../shared/components/layout/Footer';
import { BottomNav } from '../shared/components/layout/BottomNav';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { HomeFeed } from '../features/home/components/HomeFeed';
import { ServiceList } from '../features/services/components/ServiceList';
import { EventList } from '../features/events/components/EventList';
import { SafetyView } from '../features/safety/components/SafetyView';
import { ProfileView } from '../features/profile/components/ProfileView';
import { SavedView } from '../features/saved/components/SavedView';
import { ChatView } from '../features/chat/components/ChatView';

// Layout Component
const Layout = () => {
    // Theme toggle logic - to be moved to a ThemeProvider or hook later
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  React.useEffect(() => {
      if (theme === 'dark') {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }, [theme]);


  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Header toggleTheme={toggleTheme} darkMode={theme === 'dark'} />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

// Route Components
const Home = () => (
    <div className="space-y-6">
        <section className="bg-emerald-600 dark:bg-emerald-700 -mx-5 px-5 py-8 text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">Olá, Vizinho!</h1>
            <p className="text-emerald-100">O que você está procurando hoje?</p>
             {/* Quick Actions could go here */}
        </section>
        <HomeFeed />
    </div>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/comercio" element={<ServiceList />} />
        <Route path="/servicos" element={<ServiceList />} />
        <Route path="/seguranca" element={<SafetyView />} />
        <Route path="/perfil" element={<ProfileView />} />
        <Route path="/meus-lugares" element={<SavedView />} />
        <Route path="/eventos" element={<EventList />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="*" element={<div className="p-4 text-center">Página não encontrada</div>} />
      </Route>
    </Routes>
  );
};
