import React, { useState } from 'react';
import { Alert, AlertType } from '../types';
import { HeartHandshake, PawPrint, ShieldAlert, Clock, Plus } from 'lucide-react';

interface SolidaritySectionProps {
  alerts: Alert[];
  onRequestHelp: () => void;
}

export const SolidaritySection: React.FC<SolidaritySectionProps> = ({ alerts, onRequestHelp }) => {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  const getStyle = (type: AlertType) => {
    switch(type) {
      case 'ajuda': return {
        bg: 'bg-amber-50 dark:bg-amber-900/10', 
        border: 'border-amber-200 dark:border-amber-800/50', 
        text: 'text-amber-800 dark:text-amber-200', 
        icon: <HeartHandshake size={20} className="text-amber-600 dark:text-amber-400" />,
        badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
      };
      case 'pet': return {
        bg: 'bg-rose-50 dark:bg-rose-900/10', 
        border: 'border-rose-200 dark:border-rose-800/50', 
        text: 'text-rose-800 dark:text-rose-200', 
        icon: <PawPrint size={20} className="text-rose-600 dark:text-rose-400" />,
        badge: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'
      };
      case 'seguranca': return {
        bg: 'bg-red-50 dark:bg-red-900/10', 
        border: 'border-red-200 dark:border-red-800/50', 
        text: 'text-red-900 dark:text-red-200', 
        icon: <ShieldAlert size={20} className="text-red-600 dark:text-red-400" />,
        badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
      };
    }
  };

  const getLabel = (type: AlertType) => {
    switch(type) {
        case 'ajuda': return 'Voluntariado';
        case 'pet': return 'Pet Perdido';
        case 'seguranca': return 'Alerta de Segurança';
    }
  };

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-6">
        <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <HeartHandshake className="text-rose-500" size={32} />
                Vizinhança Solidária
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-2 max-w-lg">Ajude seus vizinhos, encontre pets e mantenha o bairro seguro.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center w-full md:w-auto">
            <button 
                onClick={onRequestHelp}
                className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap"
            >
                <HeartHandshake size={18} />
                Preciso de Ajuda
            </button>
            <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-xl w-full sm:w-auto overflow-x-auto border border-gray-200 dark:border-slate-700">
                <button onClick={() => setFilter('all')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filter === 'all' ? 'bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>Todos</button>
                <button onClick={() => setFilter('ajuda')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filter === 'ajuda' ? 'bg-white dark:bg-slate-600 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>Ajuda</button>
                <button onClick={() => setFilter('pet')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filter === 'pet' ? 'bg-white dark:bg-slate-600 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>Pets</button>
                <button onClick={() => setFilter('seguranca')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filter === 'seguranca' ? 'bg-white dark:bg-slate-600 text-red-600 dark:text-red-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>Segurança</button>
            </div>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center">
              <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-full mb-4">
                <HeartHandshake className="text-gray-400 dark:text-slate-400" size={32} />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">Nenhum alerta encontrado nesta categoria.</p>
              <button 
                  onClick={onRequestHelp}
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline text-sm"
              >
                  Criar o primeiro alerta
              </button>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlerts.map((alert) => {
                const style = getStyle(alert.type);
                return (
                    <div key={alert.id} className={`group rounded-2xl border ${style.border} ${style.bg} p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg`}>
                        {alert.type === 'seguranca' && (
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500 dark:bg-red-600"></div>
                        )}
                        
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 ${style.badge}`}>
                                {style.icon}
                                {getLabel(alert.type)}
                            </span>
                            <span className="text-xs font-medium opacity-60 flex items-center gap-1 dark:text-gray-300">
                                <Clock size={14} /> {alert.timestamp}
                            </span>
                        </div>

                        {alert.image && (
                            <div className="mb-5 rounded-xl overflow-hidden h-48 w-full border border-black/5 dark:border-white/10 shadow-sm">
                                <img src={alert.image} alt="Alerta" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        )}

                        <h3 className={`text-xl font-heading font-bold mb-3 ${style.text}`}>{alert.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 leading-relaxed bg-white/60 dark:bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/5">{alert.desc}</p>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/10">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-xs font-bold border border-gray-200 dark:border-slate-600 shadow-sm text-gray-700 dark:text-gray-200">
                                    {alert.author.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{alert.author}</span>
                            </div>
                            <button className="text-xs font-bold underline opacity-70 hover:opacity-100 dark:text-gray-200">
                                Entrar em contato
                            </button>
                        </div>
                    </div>
                );
            })}
          </div>
      )}
    </section>
  );
};