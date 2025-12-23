import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { BottomNav } from '../shared/components/layout/BottomNav';
import { HomeDashboard } from '../features/home/components/HomeDashboard';
import { NewsFeed } from '../features/news/NewsFeed';
import { EventsPage } from '../features/events/EventsPage';
import { ProfilePage } from '../features/profile/ProfilePage';
import { CommercePage } from '../features/services/CommercePage';
import { ServicesPage } from '../features/services/ServicesPage';
import { ChatPage } from '../features/chat/ChatPage';
import { MOCK_NEWS } from '../lib/mockData';
import { InteractiveMap } from '../presentation/components/InteractiveMap';
import { ThemeToggle } from '../shared/components/ui/ThemeToggle';
import { OnboardingPage } from '../features/onboarding/OnboardingPage';

// Layout Component (Contains BottomNav)
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <div className="fixed top-4 right-4 z-40">
        <div className="bg-card/90 backdrop-blur border border-border rounded-full px-3 py-2 shadow-lg flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Tema</span>
          <ThemeToggle />
        </div>
      </div>
      <main className="flex-1 w-full mx-auto md:max-w-md bg-background">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

// Map Page Component
const MapPage = () => (
    <div className="h-screen w-full relative">
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-background to-transparent pointer-events-none">
            <h1 className="text-2xl font-bold text-foreground drop-shadow-md">Mapa do Bairro</h1>
        </div>
        <InteractiveMap locations={[
            { id: '1', name: 'Centro Cultural', description: 'Espaço para eventos comunitários', latitude: -23.0257, longitude: -45.5559 },
            { id: '2', name: 'Mercado Municipal', description: 'Produtos frescos locais', latitude: -23.0270, longitude: -45.5570 },
            { id: '3', name: 'Parque da Cidade', description: 'Área verde e lazer', latitude: -23.0300, longitude: -45.5600 }
        ]} />
    </div>
);

// Route Components
const Home = () => (
    <div className="pb-24">
        <HomeDashboard />

        <div className="px-4 mt-6">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg">Feed da Comunidade</h3>
             </div>
             <div className="space-y-4">
                 {MOCK_NEWS.map((item) => (
                    <div key={item.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                         <div className="h-40 w-full bg-muted">
                             <img src={item.imageUrl} className="h-full w-full object-cover" alt={item.title}/>
                         </div>
                         <div className="p-4">
                             <span className="text-xs text-primary font-bold uppercase mb-2 block">{item.source}</span>
                             <h4 className="font-bold text-lg leading-tight mb-2">{item.title}</h4>
                             <p className="text-sm text-muted-foreground mb-3">{item.time}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    </div>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/noticias" element={<NewsFeed />} />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/comercio" element={<CommercePage />} />
        <Route path="/servicos" element={<ServicesPage />} />

        <Route path="*" element={<div className="p-4 text-center">Página não encontrada</div>} />
      </Route>
    </Routes>
  );
};
