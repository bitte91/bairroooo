import React from 'react';
import { Home, Briefcase, Map, User, Menu } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const navItems = [
    { id: 'home', icon: Home, label: 'Início', view: 'home' },
    { id: 'services', icon: Briefcase, label: 'Serviços', view: 'services' },
    { id: 'map', icon: Map, label: 'Mapa', view: 'map' },
    { id: 'profile', icon: User, label: 'Perfil', view: 'profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
                <button
                    key={item.id}
                    onClick={() => setCurrentView(item.view as any)}
                    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                        isActive
                        ? 'text-primary dark:text-primary-light'
                        : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light'
                    }`}
                >
                    <item.icon size={24} className={isActive ? 'fill-current' : ''} />
                    <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </button>
            );
        })}
        {/* Menu item as a catch-all or for more options */}
        <button
            className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light"
            onClick={() => { /* Open a drawer or menu modal? For now just log or scroll to top */ window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
            <Menu size={24} />
            <span className="text-[10px] mt-1 font-medium">Menu</span>
        </button>
      </div>
    </div>
  );
};
