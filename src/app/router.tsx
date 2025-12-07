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

// Layout Component
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
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

        {/* Recent News Widget on Home */}
        <div className="px-4 mt-2">
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
