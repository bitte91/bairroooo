import React from 'react';
import { useEvents } from '../hooks/useEvents';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';

export const EventList: React.FC = () => {
    const { data: events, isLoading } = useEvents();

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Eventos no Bairro</h1>
                <Button>Criar Evento</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {events?.map(event => (
                    <div key={event.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col">
                        <div className="h-32 bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                             {/* Placeholder for image */}
                             <Calendar size={48} opacity={0.5} />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{event.title}</h3>
                                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-gray-600 dark:text-gray-300 uppercase">
                                    {event.category}
                                </span>
                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">
                                {event.description}
                            </p>

                            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                                    <span>{new Date(event.date).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <Button className="mt-4 w-full" variant="outline">
                                Ver Detalhes
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
