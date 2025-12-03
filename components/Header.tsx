import React from 'react';
import { HandHeart, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  scrollToId: (id: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ scrollToId, darkMode, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-dark-border transition-colors duration-300 py-4">
      <div className="w-full max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5 text-primary dark:text-primary-light text-2xl font-heading font-extrabold cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <HandHeart size={32} strokeWidth={2.5} />
          <span>Conecta Bairro</span>
        </div>
        
        <div className="flex items-center gap-6">
            <nav>
            <ul className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
                {['Notícias', 'Vizinhança Solidária', 'Anúncios', 'Chat'].map((label) => {
                    const idMap: {[key: string]: string} = {
                        'Notícias': 'news',
                        'Vizinhança Solidária': 'solidarity',
                        'Anúncios': 'posts',
                        'Chat': 'chat'
                    };
                    return (
                        <li key={label}>
                        <button 
                            onClick={() => scrollToId(idMap[label])}
                            className="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-dark-muted hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                        >
                            {label}
                        </button>
                        </li>
                    );
                })}
            </ul>
            </nav>

            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Alternar tema"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
      </div>
    </header>
  );
};