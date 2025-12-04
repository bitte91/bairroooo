import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenPostModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPostModal }) => {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden rounded-3xl mb-12">
        <div className="absolute inset-0 z-0 flex">
            {/* Split Screen Background */}
            <div className="w-full md:w-1/2 bg-bairro-cream dark:bg-slate-900"></div>
            <div className="hidden md:block w-1/2 bg-white">
                 <div className="grid grid-cols-2 gap-4 h-full p-4 opacity-80">
                     <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-48 object-cover rounded-2xl transform translate-y-8" alt="Community Cafe" />
                     <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-2xl" alt="Park Yoga" />
                     <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-56 object-cover rounded-2xl -translate-y-12" alt="Street Market" />
                     <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-48 object-cover rounded-2xl" alt="Neighbors talking" />
                 </div>
            </div>
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 text-left md:pr-12">
                <div className="inline-block px-4 py-1.5 bg-white border border-bairro-teal/20 rounded-full text-bairro-teal text-sm font-bold mb-6 shadow-sm">
                    📍 Conectando comunidades locais
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-black text-bairro-stone-900 mb-6 leading-tight">
                    Sua vizinhança,<br />
                    <span className="text-bairro-teal">mais conectada</span><br />
                    do que nunca.
                </h1>
                <p className="text-lg md:text-xl text-bairro-stone-600 mb-10 leading-relaxed max-w-lg">
                    Descubra negócios locais, encontre vizinhos e participe de eventos no seu bairro. Tudo em um só lugar, feito por gente como você.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onOpenPostModal}
                        className="px-8 py-4 bg-bairro-amber text-white font-bold rounded-full shadow-lg hover:bg-amber-700 transition-all active:scale-95 text-lg"
                    >
                        Explore seu Bairro Agora
                    </button>
                    <button className="px-8 py-4 bg-white text-bairro-stone-900 border-2 border-orange-100 font-bold rounded-full hover:border-bairro-amber/50 hover:bg-orange-50 transition-all">
                        Cadastre seu negócio
                    </button>
                </div>

                <div className="mt-12 flex items-center gap-4 text-sm text-bairro-stone-600 font-medium">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-bairro-cream bg-gray-300 overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                            </div>
                        ))}
                    </div>
                    <p>+2.000 vizinhos já participam</p>
                </div>
            </div>
        </div>
    </section>
  );
};
