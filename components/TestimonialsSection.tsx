import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      location: "Vila Madalena",
      text: "Eu não conhecia meus vizinhos até usar o Bairro. Agora temos um grupo de jardinagem que se reúne todo fim de semana!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "João Pereira",
      location: "Moema",
      text: "Minha padaria ganhou vida nova depois que anunciei aqui. Os moradores realmente apoiam o comércio local quando sabem que existimos.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Ana Costa",
      location: "Pinheiros",
      text: "A segurança do bairro melhorou muito com nosso grupo de alerta. Sinto que todos cuidam uns dos outros.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 bg-orange-100/50">
        <div className="max-w-[1200px] mx-auto px-5">
            <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-bairro-stone-900 mb-4">O que dizem nossos vizinhos</h2>
                <p className="text-bairro-stone-600 max-w-2xl mx-auto">Histórias reais de quem transformou a convivência no bairro.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative border border-orange-100">
                        <div className="absolute -top-6 left-8">
                            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-4 border-white shadow-md object-cover" />
                        </div>
                        <div className="pt-6">
                            <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-bairro-amber fill-current" />)}
                            </div>
                            <p className="text-bairro-stone-600 italic mb-6 leading-relaxed">"{t.text}"</p>
                            <div>
                                <h4 className="font-bold text-bairro-stone-900">{t.name}</h4>
                                <p className="text-xs text-bairro-teal font-bold uppercase tracking-wider">{t.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
