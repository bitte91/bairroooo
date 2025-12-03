import React from 'react';
import { PlusCircle } from 'lucide-react';

interface HeroProps {
  onOpenPostModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPostModal }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary dark:from-primary-dark dark:to-blue-900 shadow-xl dark:shadow-slate-900/50 text-white p-8 md:p-20 my-8 text-center transition-all duration-300">
      {/* Background Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507668025116-5aa751d1e2d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 leading-tight drop-shadow-sm">
          Fortaleça sua comunidade
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
          Encontre serviços locais, ofertas exclusivas e converse com seus vizinhos em um ambiente seguro.
        </p>
        <button 
          onClick={onOpenPostModal}
          className="group inline-flex items-center gap-3 bg-white text-primary dark:text-primary-dark hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 px-8 py-4 rounded-full font-bold text-lg shadow-lg active:scale-95"
        >
          <PlusCircle size={22} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Anunciar Serviço</span>
        </button>
      </div>
    </section>
  );
};