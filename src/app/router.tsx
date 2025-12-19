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
import { NeighborhoodList } from '../presentation/components/NeighborhoodList';
import { ThemeToggle } from '../shared/components/ui/ThemeToggle';
import { HomeFeed } from '../features/home/components/HomeFeed';

// Layout Component
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

// Route Components
const Home = () => (
    <div className="pb-24">
        <HomeDashboard />

        {/* Map Widget on Home */}
        <div className="px-4 mt-6">
            <h3 className="font-bold text-lg mb-2">Mapa do Bairro</h3>
            <InteractiveMap locations={[
                { id: '1', name: 'Centro Cultural', description: 'Espaço para eventos comunitários', latitude: -23.0257, longitude: -45.5559 },
                { id: '2', name: 'Mercado Municipal', description: 'Produtos frescos locais', latitude: -23.0270, longitude: -45.5570 }
            ]} />
        </div>

        {/* Neighborhood List Widget */}
        <div className="px-4 mt-6">
            <h3 className="font-bold text-lg mb-2">Bairros Atendidos</h3>
            <div className="h-[200px] border border-border rounded-lg overflow-hidden">
                <NeighborhoodList height={200} />
            </div>
        </div>

        {/* Recent News Widget on Home */}
        <div className="px-4 mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Últimas do Bairro</h3>
                <span className="text-sm text-primary">Ver tudo</span>
            </div>
             <div className="space-y-3">
                 {MOCK_NEWS.slice(0, 2).map((item) => (
                    <div key={item.id} className="bg-card p-3 rounded-xl border border-border flex gap-3 shadow-sm">
                         <div className="h-20 w-20 bg-muted rounded-lg shrink-0 overflow-hidden">
                             <img src={item.imageUrl} className="h-full w-full object-cover" alt={item.title}/>
                         </div>
                         <div>
                             <span className="text-xs text-secondary font-bold uppercase">{item.source}</span>
                             <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                             <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.time}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        {/* Main Feed */}
        <div className="px-4 mt-6">
             <HomeFeed />
        </div>
    </div>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
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
