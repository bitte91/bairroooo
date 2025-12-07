import React from 'react';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { Calendar as CalendarIcon, MapPin, Share2, Plus, Filter } from 'lucide-react';
import { cn } from '../../lib/cn';

// Mock data based on Image 5
const EVENTS = [
    {
        id: 1,
        title: "Feira de Trocas e Doações",
        time: "14:00 - 17:00",
        location: "Centro Comunitário da Vila",
        date: "Hoje, 24 de Outubro",
        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=200",
        section: "today"
    },
    {
        id: 2,
        title: "Reunião de Moradores: Melhorias na Praça",
        time: "19:30",
        location: "Salão Paroquial",
        date: "Amanhã, 25 de Outubro",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=200",
        section: "tomorrow"
    },
    {
        id: 3,
        title: "Oficina de Jardinagem Urbana",
        time: "Sábado, 28 Out • 09:00",
        location: "Praça Central",
        date: "Próxima Semana",
        image: "https://images.unsplash.com/photo-1611735341450-74d61e66bbad?auto=format&fit=crop&q=80&w=200",
        section: "next_week"
    },
    {
        id: 4,
        title: "Festa Junina Fora de Época",
        time: "Domingo, 29 Out • 16:00",
        location: "Campo de Futebol",
        date: "Próxima Semana",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=200",
        section: "next_week"
    }
];

export const EventsPage: React.FC = () => {
    const [view, setView] = React.useState<'month' | 'list'>('list');

    return (
        <div className="pb-24 bg-muted/20 min-h-screen">
             {/* Header */}
             <div className="bg-background pt-2 pb-4 shadow-sm">
                <div className="px-4 flex justify-between items-center h-14">
                    <Button variant="ghost" size="icon" className="-ml-2">
                         {/* Using a menu icon or similar if needed, image shows hamburger */}
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </Button>
                    <h1 className="text-lg font-bold font-serif">Agenda da Vila</h1>
                    <Button variant="ghost" size="icon" className="-mr-2">
                        <Filter className="h-5 w-5 text-primary" />
                    </Button>
                </div>

                {/* Hero Illustration Area */}
                <div className="px-4 mb-4 relative">
                    <div className="bg-orange-100 rounded-xl p-4 flex items-center h-32 overflow-hidden relative">
                         <div className="z-10 max-w-[60%]">
                             <p className="text-sm font-medium text-orange-900 leading-tight">
                                 Eventos da comunidade em Vila São José, Taubaté - SP
                             </p>
                         </div>
                         {/* Placeholder for the illustration in Image 5 */}
                         <div className="absolute right-0 bottom-0 h-full w-1/2 bg-orange-200/50 rounded-l-full translate-x-4"></div>
                    </div>
                </div>

                {/* Toggle */}
                <div className="px-4">
                    <div className="bg-muted p-1 rounded-lg flex">
                        <button
                            onClick={() => setView('month')}
                            className={cn("flex-1 text-sm font-medium py-1.5 rounded-md transition-all", view === 'month' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
                        >
                            Mês
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={cn("flex-1 text-sm font-medium py-1.5 rounded-md transition-all", view === 'list' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
                        >
                            Lista
                        </button>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="px-4 mt-4 space-y-6">
                {/* We'll Group by date manually for now as per mock */}
                {['today', 'tomorrow', 'next_week'].map(section => {
                    const sectionEvents = EVENTS.filter(e => e.section === section);
                    if (sectionEvents.length === 0) return null;

                    return (
                        <div key={section}>
                            <h2 className="text-sm font-medium text-muted-foreground mb-3">{sectionEvents[0].date}</h2>
                            <div className="space-y-3">
                                {sectionEvents.map(event => (
                                    <Card key={event.id} className="p-3 flex gap-3 border-none shadow-sm bg-card">
                                        <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                                            <img src={event.image} alt="" className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm leading-tight mb-1 truncate">{event.title}</h3>
                                            <div className="flex items-center text-xs text-muted-foreground mb-0.5">
                                                {/* <Clock className="h-3 w-3 mr-1" /> */}
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                {/* <MapPin className="h-3 w-3 mr-1" /> */}
                                                <span className="truncate">• {event.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 justify-center shrink-0">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <CalendarIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* FAB */}
            <Button
                className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white p-0 z-40"
            >
                <Plus className="h-6 w-6" />
            </Button>
        </div>
    );
};
