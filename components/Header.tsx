import React from 'react';
import { HandHeart, Sun, Moon, Menu, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { NotificationCenter } from './NotificationCenter';

interface HeaderProps {
  scrollToId: (id: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ scrollToId, darkMode, toggleTheme }) => {
  const { setCurrentView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
      { label: 'Notícias', id: 'news', action: () => scrollToId('news') },
      { label: 'Solidariedade', id: 'solidarity', action: () => scrollToId('solidarity') },
      { label: 'Anúncios', id: 'posts', action: () => scrollToId('posts') },
      { label: 'Chat', id: 'chat', action: () => scrollToId('chat') },
      { label: 'Eventos', id: 'events', action: () => setCurrentView('events') },
      { label: 'Serviços', id: 'services', action: () => setCurrentView('services') },
      { label: 'Salvos', id: 'saved', action: () => setCurrentView('saved') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-300 py-4">
      <div className="w-full max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto justify-between items-center">
            <div className="flex items-center gap-2.5 text-primary dark:text-primary-light text-2xl font-heading font-extrabold cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <HandHeart size={32} strokeWidth={2.5} />
            <span className="hidden sm:inline">Conecta Bairro</span>
            </div>

            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                    <Menu size={24} className="text-gray-700 dark:text-gray-200" />
                </button>
            </div>
        </div>
        
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-6 w-full md:w-auto`}>
            <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-1">
                {navItems.map((item) => (
                    <li key={item.label} className="w-full md:w-auto">
                    <button
                        onClick={() => { item.action(); setMobileMenuOpen(false); }}
                        className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                    >
                        {item.label}
                    </button>
                    </li>
                ))}
            </ul>
            </nav>

            <NotificationCenter />

            <button 
                onClick={toggleTheme}
                className="hidden md:block p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Alternar tema"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

             <button
                onClick={() => setCurrentView('profile')}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Perfil"
            >
                <User size={20} />
            </button>
        </div>
      </div>
    </header>
  );
};
