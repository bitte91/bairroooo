import React from 'react';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { Calendar as CalendarIcon, Share2, Plus, Filter } from 'lucide-react';
import { cn } from '../../lib/cn';
import { MOCK_EVENTS } from '../../lib/mockData';
import { EventCardSkeleton } from '../../shared/components/ui/Skeleton';
import { EmptyState } from '../../shared/components/ui/EmptyState';

export const EventsPage: React.FC = () => {
    const [view, setView] = React.useState<'month' | 'list'>('list');
    const [isLoading, setIsLoading] = React.useState(true);

    // Simular carregamento inicial
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pb-24 bg-muted/20 min-h-screen">
             {/* Header */}
             <div className="bg-background pt-2 pb-4 shadow-sm">
                <div className="px-4 flex justify-between items-center h-14">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="-ml-2 transition-transform active:scale-95"
                        aria-label="Menu"
                    >
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </Button>
                    <h1 className="text-lg font-bold font-serif">Agenda da Vila</h1>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="-mr-2 transition-transform active:scale-95"
                        aria-label="Filtrar eventos"
                    >
                        <Filter className="h-5 w-5 text-primary" />
                    </Button>
                </div>

                {/* Hero Illustration Area */}
                <div className="px-4 mb-4 relative">
                    <div className="bg-orange-100 rounded-xl p-4 flex items-center h-32 overflow-hidden relative transition-all hover:shadow-md">
                         <div className="z-10 max-w-[60%]">
                             <p className="text-sm font-medium text-orange-900 leading-tight">
                                 Eventos da comunidade em Vila São José, Taubaté - SP
                             </p>
                         </div>
                         <div className="absolute right-0 bottom-0 h-full w-1/2 bg-orange-200/50 rounded-l-full translate-x-4"></div>
                    </div>
                </div>

                {/* Toggle */}
                <div className="px-4">
                    <div className="bg-muted p-1 rounded-lg flex">
                        <button
                            onClick={() => setView('month')}
                            className={cn(
                                "flex-1 text-sm font-medium py-1.5 rounded-md transition-all active:scale-95",
                                view === 'month' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                            )}
                        >
                            Mês
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={cn(
                                "flex-1 text-sm font-medium py-1.5 rounded-md transition-all active:scale-95",
                                view === 'list' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                            )}
                        >
                            Lista
                        </button>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="px-4 mt-4 space-y-6">
                {isLoading ? (
                    // Skeleton Loading State
                    <div className="space-y-3">
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                    </div>
                ) : MOCK_EVENTS.length === 0 ? (
                    // Empty State
                    <EmptyState
                        icon={CalendarIcon}
                        title="Nenhum evento agendado"
                        description="Ainda não há eventos cadastrados. Seja o primeiro a criar um evento para a comunidade!"
                        actionLabel="Criar Evento"
                        onAction={() => {}}
                    />
                ) : (
                    ['today', 'tomorrow', 'next_week'].map(section => {
                        const sectionEvents = MOCK_EVENTS.filter(e => e.section === section);
                        if (sectionEvents.length === 0) return null;

                        return (
                            <div key={section}>
                                <h2 className="text-sm font-medium text-muted-foreground mb-3">{sectionEvents[0].date}</h2>
                                <div className="space-y-3">
                                    {sectionEvents.map(event => (
                                        <Card 
                                            key={event.id} 
                                            className="p-3 flex gap-3 border-none shadow-sm bg-card transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
                                        >
                                            <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden flex items-center justify-center text-muted-foreground bg-gray-200">
                                                <CalendarIcon className="h-8 w-8 opacity-50" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm leading-tight mb-1 truncate">{event.title}</h3>
                                                <div className="flex items-center text-xs text-muted-foreground mb-0.5">
                                                    <span>{event.timeStr}</span>
                                                </div>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <span className="truncate">• {event.location}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 justify-center shrink-0">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-muted-foreground hover:text-primary transition-all active:scale-90"
                                                    aria-label="Compartilhar evento"
                                                >
                                                    <Share2 className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-muted-foreground hover:text-primary transition-all active:scale-90"
                                                    aria-label="Adicionar ao calendário"
                                                >
                                                    <CalendarIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* FAB */}
            <Button
                className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white p-0 z-40 transition-all hover:scale-110 active:scale-95"
                aria-label="Criar novo evento"
            >
                <Plus className="h-6 w-6" />
            </Button>
        </div>
    );
};
