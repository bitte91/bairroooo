import React, { useState } from 'react';
import { Mail, Bell } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const EmailAlerts = () => {
    const { addToast } = useApp();
    const [email, setEmail] = useState('');
    const [neighborhood, setNeighborhood] = useState('');

    const neighborhoods = ['Centro', 'CECAP', 'Independência', 'Vila Olímpia', 'Bonfim', 'Jardim das Nações'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && neighborhood) {
            // Simulate backend call
            setTimeout(() => {
                addToast(`Alertas ativados para ${neighborhood}!`, 'success');
                setEmail('');
                setNeighborhood('');
            }, 500);
        }
    };

    return (
        <section className="py-12 px-5 max-w-[1200px] mx-auto mb-16">
            <div className="bg-bairro-teal rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="relative z-10 w-full md:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold mb-4 uppercase tracking-wide">
                        <Bell size={12} /> Novos Leads
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                        Não perca nenhum serviço no seu bairro
                    </h3>
                    <p className="text-teal-100">
                        Receba um e-mail sempre que um novo eletricista, encanador ou promoção surgir perto de você.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 w-full md:w-1/2 flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-white text-bairro-stone-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-bairro-amber"
                        required
                    />
                    <select
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-white text-bairro-stone-900 outline-none focus:ring-2 focus:ring-bairro-amber"
                        required
                    >
                        <option value="" disabled>Selecione seu bairro</option>
                        {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <button type="submit" className="w-full py-4 bg-bairro-amber text-white font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-lg">
                        Ativar Alertas Grátis
                    </button>
                </form>
            </div>
        </section>
    );
};
