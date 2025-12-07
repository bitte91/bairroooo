import React from 'react';
import { Hero } from './Hero';
import { QuickAccess } from './QuickAccess';
import { CombinedFeed } from './CombinedFeed';
import { useApp } from '../contexts/AppContext';
import { Card } from './ui/Card';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

interface HomeProps {
  onOpenPostModal: (mode: 'post') => void;
  onOpenAlertModal: (mode: 'alert', type: any) => void;
  onRequireLogin: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenPostModal, onOpenAlertModal }) => {
  const {
    favorites,
    alerts,
    posts,
    serviceProviders,
    businesses
  } = useApp();

  return (
    <div className="space-y-8 pb-20">
      <Hero
        onOpenPostModal={() => onOpenPostModal('post')}
      />

      <QuickAccess />

      {/* Meus Lugares Preview - Only if has favorites */}
      {favorites.length > 0 && (
        <section className="animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Star className="text-amber-400 fill-amber-400" size={20} />
              Meus Lugares
            </h2>
            <Link
              to="/meus-lugares"
              className="text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-1"
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {favorites.slice(0, 3).map(fav => (
                  <Card key={fav.id} className="flex items-center justify-between !p-3">
                      <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{fav.itemType}</span>
                          <h3 className="font-semibold text-slate-800 dark:text-white line-clamp-1">{fav.title}</h3>
                      </div>
                      <Link to="/meus-lugares" className="p-2 text-teal-600 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                          <ArrowRight size={16} />
                      </Link>
                  </Card>
              ))}
          </div>
        </section>
      )}

      {/* Combined Feed Section */}
      <section id="feed" className="scroll-mt-24">
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-bold text-slate-800 dark:text-white">Acontece no Bairro</h2>
           <button
             onClick={() => onOpenAlertModal('alert', 'ajuda')}
             className="text-sm font-semibold text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full"
           >
             Pedir Ajuda
           </button>
        </div>
        <CombinedFeed posts={posts} alerts={alerts} />
      </section>

      {/* Highlights Preview - Services/Commerce */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Destaques da Comunidade</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Show 1 business and 1 service provider as tease */}
          {businesses.slice(0, 1).map(b => (
             <Link to="/comercio" key={b.id} className="block">
                <Card className="h-full hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
                    <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">Comércio</span>
                    <h3 className="font-bold text-slate-800 dark:text-white leading-tight mt-1">{b.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{b.description}</p>
                </Card>
             </Link>
          ))}
           {serviceProviders.slice(0, 1).map(s => (
             <Link to="/servicos" key={s.id} className="block">
                <Card className="h-full hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
                    <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">Serviço</span>
                    <h3 className="font-bold text-slate-800 dark:text-white leading-tight mt-1">{s.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{s.description}</p>
                </Card>
             </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
            <Link to="/comercio" className="text-sm font-medium text-slate-500 hover:text-teal-600 underline decoration-slate-300 hover:decoration-teal-600 underline-offset-4 transition-all">
                Explorar diretório completo
            </Link>
        </div>
      </section>
    </div>
  );
};
