import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { BottomNav } from '../shared/components/layout/BottomNav';
import { HomeDashboard } from '../features/home/components/HomeDashboard';
import { NewsFeed } from '../features/news/NewsFeed';
import { EventsPage } from '../features/events/EventsPage';
import { ProfilePage } from '../features/profile/ProfilePage';
// Placeholder for Chat/Services if not fully implemented yet
const ChatPlaceholder = () => <div className="p-4 text-center mt-10">Chat em construção</div>;
const ServicesPlaceholder = () => <div className="p-4 text-center mt-10">Serviços em construção</div>;


// Layout Component
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
       {/* Pages have their own headers mostly, but we can have a global wrapper if needed.
           For now, the images show distinct headers per page.
           We'll just render Outlet and BottomNav. */}
      <main className="flex-1 w-full mx-auto md:max-w-md"> {/* Restricting width for mobile view simulation */}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

// Route Components
const Home = () => (
    <div className="pb-24">
        {/* The Hero is integrated in HomeDashboard in my implementation, or I can separate it.
            HomeDashboard currently has the "Bem-vindo" text. */}
        <HomeDashboard />

        {/* We can add a "Recent News" section here too as per the feed in Image 0 */}
        <div className="px-4 mt-2">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Últimas do Bairro</h3>
                <span className="text-sm text-primary">Ver tudo</span>
            </div>
             {/* Reusing NewsFeed or a subset? For now, I'll just put a placeholder or basic list
                 to match the "Feed" concept in Image 0 */}
             <div className="space-y-3">
                 <div className="bg-card p-3 rounded-xl border border-border flex gap-3 shadow-sm">
                     <div className="h-20 w-20 bg-muted rounded-lg shrink-0">
                         <img src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=200" className="h-full w-full object-cover rounded-lg" alt=""/>
                     </div>
                     <div>
                         <span className="text-xs text-secondary font-bold">EVENTOS</span>
                         <h4 className="font-bold text-sm leading-tight">Inauguração da Horta</h4>
                         <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Venha participar do plantio neste sábado às 9h...</p>
                     </div>
                 </div>
                 <div className="bg-card p-3 rounded-xl border border-border flex gap-3 shadow-sm">
                     <div className="h-20 w-20 bg-muted rounded-lg shrink-0">
                         <img src="https://images.unsplash.com/photo-1510596713412-56030c252371?auto=format&fit=crop&q=80&w=200" className="h-full w-full object-cover rounded-lg" alt=""/>
                     </div>
                     <div>
                         <span className="text-xs text-secondary font-bold">MELHORIAS</span>
                         <h4 className="font-bold text-sm leading-tight">Iluminação Pública</h4>
                         <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Novos postes de LED instalados na Rua das Flores...</p>
                     </div>
                 </div>
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
        <Route path="/chat" element={<ChatPlaceholder />} />
        <Route path="/perfil" element={<ProfilePage />} />

        {/* Additional routes for Home Grid items */}
        <Route path="/comercio" element={<ServicesPlaceholder />} />
        <Route path="/servicos" element={<ServicesPlaceholder />} />

        <Route path="*" element={<div className="p-4 text-center">Página não encontrada</div>} />
      </Route>
    </Routes>
  );
};
