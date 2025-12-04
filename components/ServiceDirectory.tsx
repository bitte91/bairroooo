import React, { useState } from 'react';
import { Search, PenTool, ShoppingBag, Truck } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const ServiceDirectory = () => {
    const { posts } = useApp();
    const [searchTerm, setSearchTerm] = useState('');

    const services = posts.filter(p => p.type === 'autonomo' || p.type === 'comercio');
    const filtered = services.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="animate-fadeIn pb-20">
             <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <ShoppingBag className="text-primary" /> Guia de Serviços
            </h2>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar eletricista, padaria, entregas..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-900 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {filtered.map(service => (
                    <div key={service.id} className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            {service.type === 'autonomo' ? <PenTool size={20} /> : <Truck size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{service.title}</h3>
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${service.type === 'autonomo' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                    {service.type}
                                </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{service.desc}</p>
                            <p className="text-xs text-gray-400 mt-2 font-medium">Por: {service.author}</p>
                        </div>
                        <div className="flex items-center gap-2 md:self-center">
                            <button className="flex-1 md:flex-none px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors">
                                Contatar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
