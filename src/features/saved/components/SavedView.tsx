import React from 'react';
import { Bookmark, MapPin } from 'lucide-react';

export const SavedView: React.FC = () => {
    // Mock saved items
    const savedItems = [
        { id: 1, title: 'Padaria do Zé', type: 'Comércio', address: 'Av. Principal, 456' },
        { id: 2, title: 'Carlos Ruiz Eletricista', type: 'Serviço', address: 'Vila Nova' }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <Bookmark className="w-6 h-6 mr-2 text-emerald-600" />
                Meus Lugares
            </h1>

            {savedItems.length > 0 ? (
                <div className="grid gap-4">
                    {savedItems.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.title}</h3>
                                <div className="flex items-center text-sm text-slate-500 mt-1">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {item.address}
                                </div>
                            </div>
                            <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                {item.type}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-400">
                    <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Você ainda não salvou nenhum lugar.</p>
                </div>
            )}
        </div>
    );
};
