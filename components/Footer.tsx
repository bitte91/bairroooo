import React from 'react';
import { HandHeart, Mail, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-orange-100 dark:border-slate-800 pt-20 pb-10 mt-0">
      <div className="w-full max-w-[1200px] mx-auto px-5">

        {/* Newsletter Section (Fat Footer Top) */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-bairro-teal rounded-3xl p-8 md:p-12 mb-20 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 w-full md:w-1/2 mb-8 md:mb-0">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Fique por dentro do seu bairro</h3>
                <p className="text-teal-100">Receba novidades, eventos e promoções exclusivas da vizinhança.</p>
            </div>
            <div className="relative z-10 w-full md:w-1/2 flex gap-2">
                <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-teal-200 outline-none focus:bg-white focus:text-bairro-teal transition-all"
                />
                <button className="bg-bairro-amber text-white px-6 py-4 rounded-full font-bold hover:bg-amber-700 transition-colors flex items-center gap-2">
                    Assinar <ArrowRight size={18} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-bairro-teal text-2xl font-serif font-black">
                <HandHeart size={28} strokeWidth={2.5} />
                <span>Bairro</span>
            </div>
            <p className="text-bairro-stone-600 text-sm leading-relaxed">
              Transformando vizinhanças em comunidades vibrantes. Conecte-se, apoie e cresça junto com quem mora ao seu lado.
            </p>
            <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-bairro-teal hover:bg-bairro-teal hover:text-white transition-all">
                        <Icon size={18} />
                    </a>
                ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg text-bairro-stone-900 mb-6">Para Moradores</h4>
            <ul className="space-y-3 text-sm text-bairro-stone-600">
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Encontrar Eventos</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Guia de Serviços</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Grupos Comunitários</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Alertas de Segurança</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg text-bairro-stone-900 mb-6">Para Negócios</h4>
            <ul className="space-y-3 text-sm text-bairro-stone-600">
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Criar Perfil Comercial</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Anunciar Ofertas</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Histórias de Sucesso</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Planos para Empresas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg text-bairro-stone-900 mb-6">Ajuda</h4>
            <ul className="space-y-3 text-sm text-bairro-stone-600">
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Central de Suporte</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Diretrizes da Comunidade</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Privacidade e Dados</a></li>
              <li><a href="#" className="hover:text-bairro-amber transition-colors">Fale Conosco</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-orange-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bairro-stone-600">
          <p>&copy; 2025 Bairro. Feito com ❤️ para comunidades locais.</p>
          <div className="flex gap-6">
              <a href="#" className="hover:text-bairro-teal">Termos de Uso</a>
              <a href="#" className="hover:text-bairro-teal">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};