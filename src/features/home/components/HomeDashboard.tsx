import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Briefcase, Shield, Calendar, MessageCircle, Bookmark, Map } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  icon: React.ElementType;
  path: string;
  color: string;
  delay: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon: Icon, path, color, delay }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(path)}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 ${color} bg-opacity-10 dark:bg-opacity-10 hover:shadow-md transition-shadow w-full aspect-square`}
    >
      <div className={`p-3 rounded-full mb-2 ${color.replace('text-', 'bg-').replace('600', '100')} dark:bg-opacity-20`}>
        <Icon className={`w-8 h-8 ${color}`} strokeWidth={2} />
      </div>
      <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{title}</span>
    </motion.button>
  );
};

export const HomeDashboard: React.FC = () => {
  const sections = [
    { title: 'Comércio', icon: ShoppingBag, path: '/comercio', color: 'text-blue-600' },
    { title: 'Serviços', icon: Briefcase, path: '/servicos', color: 'text-emerald-600' },
    { title: 'Segurança', icon: Shield, path: '/seguranca', color: 'text-red-600' },
    { title: 'Eventos', icon: Calendar, path: '/eventos', color: 'text-amber-600' },
    { title: 'Chat', icon: MessageCircle, path: '/chat', color: 'text-violet-600' },
    { title: 'Salvos', icon: Bookmark, path: '/meus-lugares', color: 'text-pink-600' },
  ];

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Explorar Bairro</h2>
      </div>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {sections.map((section, index) => (
          <DashboardCard
            key={section.title}
            {...section}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};
