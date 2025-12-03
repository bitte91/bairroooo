import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border pt-16 pb-8 mt-16 transition-colors duration-300">
      <div className="w-full max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-primary dark:text-primary-light font-heading font-bold text-lg mb-6">Conecta Bairro</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Unindo vizinhos e impulsionando negócios locais para criar uma comunidade mais forte, segura e colaborativa.
            </p>
          </div>
          <div>
            <h3 className="text-primary dark:text-primary-light font-heading font-bold text-lg mb-6">Serviços</h3>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary dark:hover:text-primary-light hover:underline transition-colors" onClick={e => e.preventDefault()}>Anunciar</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primary-light hover:underline transition-colors" onClick={e => e.preventDefault()}>Profissionais</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primary-light hover:underline transition-colors" onClick={e => e.preventDefault()}>Ofertas</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary dark:text-primary-light font-heading font-bold text-lg mb-6">Ajuda</h3>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary dark:hover:text-primary-light hover:underline transition-colors" onClick={e => e.preventDefault()}>Regras da Comunidade</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primary-light hover:underline transition-colors" onClick={e => e.preventDefault()}>Suporte</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primary-light hover:underline transition-colors" onClick={e => e.preventDefault()}>Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-dark-border text-center text-xs text-gray-400 dark:text-gray-500">
          &copy; 2025 Conecta Bairro. Feito com cuidado para a comunidade.
        </div>
      </div>
    </footer>
  );
};