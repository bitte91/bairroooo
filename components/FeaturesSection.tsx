import React from 'react';
import { Users, Store, Calendar, ArrowRight } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      title: "Conexão Comunitária",
      desc: "Fortaleça laços com quem mora perto de você. Encontre vizinhos com interesses em comum e construa uma rede de apoio real.",
      visual: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Users className="text-bairro-amber" size={24} />
    },
    {
      title: "Apoio ao Comércio Local",
      desc: "Descubra jóias escondidas e apoie os pequenos negócios que dão vida ao seu bairro. De padarias artesanais a serviços especializados.",
      visual: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Store className="text-bairro-amber" size={24} />
    },
    {
      title: "Eventos e Atividades",
      desc: "Nunca perca o que acontece perto de casa. Feiras de rua, aulas de yoga no parque, reuniões comunitárias e muito mais.",
      visual: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Calendar className="text-bairro-amber" size={24} />
    }
  ];

  return (
    <section className="py-20 px-5 max-w-[1200px] mx-auto">
      <div className="space-y-24">
        {features.map((item, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

            {/* Visual */}
            <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-bairro-teal opacity-10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <img
                    src={item.visual}
                    alt={item.title}
                    className="relative rounded-3xl shadow-xl w-full h-[300px] md:h-[400px] object-cover border-4 border-white"
                />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-bold text-bairro-teal">
                    {item.icon}
                    <span className="uppercase tracking-wider">Destaque</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-bairro-stone-900 leading-tight">
                    {item.title}
                </h2>
                <p className="text-lg text-bairro-stone-600 leading-relaxed">
                    {item.desc}
                </p>
                <button className="flex items-center gap-2 text-bairro-teal font-bold hover:text-bairro-amber transition-colors group">
                    Saiba mais <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
