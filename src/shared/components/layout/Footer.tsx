import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Conecta Bairro. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
