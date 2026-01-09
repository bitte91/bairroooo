import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '../../lib/cn';

const INTERESTS = [
  "Esportes", "Cultura", "Segurança", "Animais", "Trocas", "Eventos", "Empregos", "Política Local"
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      setSelectedInterests(prev => [...prev, interest]);
    }
  };

  const nextStep = () => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">👋</span>
              </div>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Bem-vindo à Conecta Vila</h1>
              <p className="text-muted-foreground text-lg mb-8">
                A rede social exclusiva para conectar você aos seus vizinhos e melhorar nosso bairro.
              </p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">O que te interessa?</h2>
              <p className="text-muted-foreground mb-6">Personalize seu feed com o que é importante para você.</p>

              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    aria-pressed={selectedInterests.includes(interest)}
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all relative overflow-hidden active:scale-95",
                      selectedInterests.includes(interest)
                        ? "border-primary bg-primary/5 text-primary font-medium shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && (
                      <div className="absolute top-2 right-2" aria-hidden="true">
                        <Check size={16} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
             <motion.div
             key="step2"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="text-center w-full"
           >
             <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
               <Check size={48} />
             </div>
             <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Tudo pronto!</h2>
             <p className="text-muted-foreground text-lg mb-8">
               Seu perfil foi criado e você já pode começar a interagir com sua comunidade.
             </p>
           </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm mx-auto mt-8">
        <div
          className="flex gap-2 mb-4 justify-center"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Progresso do cadastro"
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === step ? "w-8 bg-primary" : "w-2 bg-border"
              )}
            />
          ))}
        </div>
        <Button
          onClick={nextStep}
          className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20"
        >
          {step === 2 ? 'Começar' : 'Continuar'}
          {step !== 2 && <ChevronRight className="ml-2 w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};
