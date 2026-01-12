import React, { useEffect } from 'react';
import { Providers } from './app/Providers';
import { AppRouter } from './app/router';

function App() {
  useEffect(() => {
    // Registar o service worker do PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registrado com sucesso:', registration);
          })
          .catch((error) => {
            console.log('Erro ao registar Service Worker:', error);
          });
      });
    }
  }, []);

  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
