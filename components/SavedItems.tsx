import React, { useState } from 'react';
import { Favorite, SavedItems as SavedItemsType } from '../types'; // Check if SavedItemsType is needed, probably not.
import { useApp } from '../contexts/AppContext';
import { Star, Trash2 } from 'lucide-react';

export const SavedItems = () => {
    const { favorites, removeFavorite } = useApp();
    const [filter, setFilter] = useState<'all' | 'post' | 'alert' | 'event'>('all');

    const filtered = filter === 'all'
        ? favorites
        : favorites.filter(f => f.itemType === filter);

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Star size={48} className="mb-4 opacity-20" />
                <p className="text-lg">Você ainda não tem itens salvos.</p>
                <p className="text-sm">Clique na estrela nos anúncios para salvar aqui.</p>
            </div>
        );
    }

    return (
        <section className="animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Star className="text-amber-400" fill="currentColor" /> Itens Salvos
            </h2>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {['all', 'post', 'alert', 'event'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type as any)}
                        className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${
                            filter === type
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700'
                        }`}
                    >
                        {type === 'all' ? 'Todos' : type}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(fav => (
                    <div key={fav.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex justify-between items-start">
                        <div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 inline-block ${
                                fav.itemType === 'post' ? 'bg-blue-100 text-blue-600' :
                                fav.itemType === 'alert' ? 'bg-rose-100 text-rose-600' :
                                'bg-purple-100 text-purple-600'
                            }`}>
                                {fav.itemType}
                            </span>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{fav.title}</h3>
                            <p className="text-xs text-gray-400 mt-1">Salvo em {new Date(fav.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button
                            onClick={() => removeFavorite(fav.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};
