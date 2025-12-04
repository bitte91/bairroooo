import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Map as MapIcon, List } from 'lucide-react';
import { Event } from '../types';
import { MapComponent } from './MapComponent';

const INITIAL_EVENTS: Event[] = [
    { id: 1, title: 'Feira de Trocas', description: 'Traga o que não usa e troque com vizinhos.', date: 'Sábado, 14:00', location: 'Praça Central', category: 'community', latitude: -23.5505, longitude: -46.6335 },
    { id: 2, title: 'Culto Ecumênico', description: 'Momento de oração e união.', date: 'Domingo, 09:00', location: 'Centro Comunitário', category: 'religious', latitude: -23.5515, longitude: -46.6325 },
    { id: 3, title: 'Feira Orgânica', description: 'Produtores locais vendendo frutas e verduras.', date: 'Terça, 07:00', location: 'Rua das Flores', category: 'market', latitude: -23.5495, longitude: -46.6345 },
];

export const EventsSection = () => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    return (
        <section className="animate-fadeIn pb-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Calendar className="text-primary" /> Eventos da Comunidade
                </h2>

                <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-gray-400'}`}
                        title="Lista"
                    >
                        <List size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-gray-400'}`}
                        title="Mapa"
                    >
                        <MapIcon size={20} />
                    </button>
                </div>
            </div>

            {viewMode === 'map' ? (
                <MapComponent items={INITIAL_EVENTS} height="500px" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INITIAL_EVENTS.map(event => (
                    <div key={event.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all">
                        <div className="bg-primary/5 dark:bg-primary/10 p-6 flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-bold text-primary dark:text-primary-light mb-2">{event.title}</h3>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full">{event.category}</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{event.description}</p>

                            <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                    <Clock size={16} className="text-primary" />
                                    {event.date}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                    <MapPin size={16} className="text-primary" />
                                    {event.location}
                                </div>
                            </div>

                            <button className="w-full mt-2 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                                <Users size={18} /> Vou Participar
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </section>
    );
};
