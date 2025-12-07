import React from 'react';
import { Home, Briefcase, User, Shield, ShoppingBag } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const BottomNav: React.FC = () => {

  const navItems = [
    { id: 'home', icon: Home, label: 'Início', path: '/' },
    { id: 'business', icon: ShoppingBag, label: 'Comércio', path: '/comercio' },
    { id: 'providers', icon: Briefcase, label: 'Serviços', path: '/servicos' },
    { id: 'safety', icon: Shield, label: 'Segurança', path: '/seguranca' },
    { id: 'profile', icon: User, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full h-full transition-colors
              ${isActive
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={22}
                  className={isActive ? 'fill-teal-100 dark:fill-teal-900/30' : ''}
                  strokeWidth={2.5}
                  aria-label={item.label}
                />
                <span className="text-[10px] mt-1 font-bold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
