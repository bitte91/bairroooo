import React from 'react';
import { Providers } from './app/Providers';
import { AppRouter } from './app/router';
import '../index.css';

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
