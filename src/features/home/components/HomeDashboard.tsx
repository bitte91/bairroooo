import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Newspaper, ShoppingBag, Briefcase, Calendar } from 'lucide-react';
import { cn } from '../../../lib/cn';

interface DashboardCardProps {
  title: string;
  icon: React.ElementType;
  path: string;
  colorClass: string;
  bgClass: string;
  delay: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon: Icon, path, colorClass, bgClass, delay }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border border-border bg-card hover:shadow-lg transition-all w-full aspect-square active:shadow-sm"
    >
      <motion.div 
        className={cn("p-4 rounded-full mb-3", bgClass)}
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className={cn("w-8 h-8", colorClass)} strokeWidth={2} />
      </motion.div>
      <span className="font-semibold text-sm text-foreground">{title}</span>
    </motion.button>
  );
};

export const HomeDashboard: React.FC = () => {
  // Matching Image 0 (unnamed.jpg): News, Commerce, Services, Agenda
  const sections = [
    { title: 'Notícias', icon: Newspaper, path: '/noticias', colorClass: 'text-blue-600', bgClass: 'bg-blue-100' },
    { title: 'Comércio', icon: ShoppingBag, path: '/comercio', colorClass: 'text-orange-600', bgClass: 'bg-orange-100' },
    { title: 'Serviços', icon: Briefcase, path: '/servicos', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-100' },
    { title: 'Agenda', icon: Calendar, path: '/eventos', colorClass: 'text-purple-600', bgClass: 'bg-purple-100' },
  ];

  return (
    <div className="py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-primary mb-1">Bem-vindo à Conecta Vila</h1>
        <p className="text-muted-foreground">O que você procura hoje?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
