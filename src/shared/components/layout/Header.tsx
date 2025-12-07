import React, { useState } from 'react';
import { HandHeart, Sun, Moon, Menu, User as UserIcon } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

// Mock NotificationCenter for now, to be migrated later
const NotificationCenter = () => <div className="p-2">🔔</div>;

interface HeaderProps {
  toggleTheme?: () => void;
  darkMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, darkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Notícias', path: '/#news' },
    { label: 'Solidariedade', path: '/#solidarity' },
    { label: 'Anúncios', path: '/#posts' },
    { label: 'Chat', path: '/chat' },
    { label: 'Eventos', path: '/eventos' },
    { label: 'Serviços', path: '/servicos' },
    { label: 'Salvos', path: '/meus-lugares' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-300 py-4">
      <div className="w-full max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto justify-between items-center">
            <div
              className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <HandHeart size={32} strokeWidth={2.5} />
              <span className="hidden sm:inline">Conecta Bairro</span>
            </div>

            <div className="flex items-center gap-4 md:hidden">
                {toggleTheme && (
                  <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                )}
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
                      {item.path.startsWith('/#') ? (
                         <a href={item.path} className="block w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                           {item.label}
                         </a>
                      ) : (
                        <NavLink
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) => `block w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10'
                                : 'text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10'
                            }`}
                        >
                            {item.label}
                        </NavLink>
                      )}
                    </li>
                ))}
            </ul>
            </nav>

            <NotificationCenter />

            {toggleTheme && (
              <button
                  onClick={toggleTheme}
                  className="hidden md:block p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Alternar tema"
              >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

             <button
                onClick={() => navigate('/perfil')}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Perfil"
            >
                <UserIcon size={20} />
            </button>
        </div>
      </div>
    </header>
  );
};
