import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Map, AlertTriangle, Briefcase, ShoppingBag, Heart, FileText } from 'lucide-react';

export const QuickAccess: React.FC = () => {
  const { setCurrentView } = useApp();

  const items = [
    { icon: FileText, label: 'Avisos', onClick: () => { document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' }); } },
    { icon: Heart, label: 'Ajuda', onClick: () => { document.getElementById('solidarity')?.scrollIntoView({ behavior: 'smooth' }); } },
    { icon: Briefcase, label: 'Serviços', onClick: () => setCurrentView('services') },
    { icon: AlertTriangle, label: 'Alertas', onClick: () => { document.getElementById('solidarity')?.scrollIntoView({ behavior: 'smooth' }); } }, // Linking to solidarity/alerts section
    { icon: Map, label: 'Mapa', onClick: () => setCurrentView('map') },
    { icon: ShoppingBag, label: 'Comércio', onClick: () => { document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' }); } },
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
            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-2 text-primary dark:text-primary-light">
              <item.icon size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
