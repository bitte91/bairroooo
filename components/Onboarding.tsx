import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { ChevronRight, Check, X } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Descubra o Bairro",
      desc: "Encontre serviços locais, comércios e vagas de emprego bem pertinho de você.",
      image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Ofertas e Promoções",
      desc: "Fique por dentro das melhores ofertas e promoções exclusivas para vizinhos.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Alertas e Ajuda",
      desc: "Receba avisos importantes e ajude seus vizinhos em questões de segurança e solidariedade.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col relative animate-fade-in-up">
        <button
          onClick={completeOnboarding}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10"
        >
          <X size={24} />
        </button>

        {/* Image Area */}
        <div className="h-64 overflow-hidden relative bg-slate-100">
           <img
             src={steps[step].image}
             alt={steps[step].title}
             className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
           </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col flex-1 text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 transition-all duration-300">
                {steps[step].title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 flex-1">
                {steps[step].desc}
            </p>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mb-8">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            i === step ? 'w-8 bg-teal-600' : 'w-2 bg-slate-300 dark:bg-slate-600'
                        }`}
                    />
                ))}
            </div>

            {/* Actions */}
            <button
                onClick={handleNext}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                {step === steps.length - 1 ? (
                    <>Começar <Check size={20} /></>
                ) : (
                    <>Próximo <ChevronRight size={20} /></>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
