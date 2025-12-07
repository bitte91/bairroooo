import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Map, Shield, Briefcase, ShoppingBag, Heart, Users } from 'lucide-react';

export const QuickAccess: React.FC = () => {
  const { setCurrentView } = useApp();

  const items = [
    { icon: ShoppingBag, label: 'Comércio', onClick: () => setCurrentView('business') },
    { icon: Briefcase, label: 'Serviços', onClick: () => setCurrentView('providers') },
    { icon: Shield, label: 'Segurança', onClick: () => setCurrentView('safety') },
    { icon: Heart, label: 'Ajuda', onClick: () => { setCurrentView('safety'); setTimeout(() => document.getElementById('solidarity')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { icon: Map, label: 'Mapa', onClick: () => setCurrentView('map') },
    { icon: Users, label: 'Grupo', onClick: () => setCurrentView('safety') },
  ];

  return (
    <section className="py-6">
      <h3 className="text-xl font-bold mb-4 px-2">Acesso Rápido</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100 dark:border-slate-700"
          >
            <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-full mb-2 text-teal-600 dark:text-teal-400">
              <item.icon size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
