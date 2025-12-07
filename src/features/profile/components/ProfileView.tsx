import React from 'react';
import { useAuthStore } from '../../auth/store/authStore';
import { Button } from '../../../shared/components/ui/Button';
import { User, MapPin, Award, Settings, LogOut } from 'lucide-react';
import { User as UserType } from '../../../shared/types';

export const ProfileView: React.FC = () => {
    const { user, logout, login } = useAuthStore();

    // Temporary mock login for development
    const handleMockLogin = () => {
        const mockUser: UserType = {
            id: 'u1',
            name: 'Maria da Silva',
            email: 'maria@email.com',
            role: 'user',
            points: 1250,
            badges: [
                { id: 'b1', name: 'Vizinha Solidária', icon: '🤝', description: 'Ajudou 5 pessoas' },
                { id: 'b2', name: 'Exploradora Local', icon: '🗺️', description: 'Visitou 10 comércios' }
            ]
        };
        login(mockUser);
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                    <User size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">Entre na sua conta</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                    Faça login para salvar lugares, participar de eventos e interagir com a comunidade.
                </p>
                <Button onClick={handleMockLogin} className="w-full max-w-sm">
                    Entrar com Google
                </Button>
                <Button variant="ghost" className="mt-2 w-full max-w-sm">
                    Criar conta
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center relative">
                <div className="absolute top-4 right-4">
                     <Button variant="ghost" size="icon" onClick={() => {}}>
                        <Settings className="w-5 h-5 text-slate-400" />
                     </Button>
                </div>

                <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-3xl font-bold text-emerald-600 border-4 border-white dark:border-slate-700 mb-4 shadow-sm">
                    {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.name.charAt(0)}
                </div>

                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{user.name}</h1>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    Taubaté, SP
                </div>

                <div className="grid grid-cols-2 gap-8 mt-6 w-full max-w-xs">
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-emerald-600">{user.points || 0}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Pontos</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-emerald-600">{user.badges?.length || 0}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Conquistas</span>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    <button className="w-full px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between group">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Meus Lugares Salvos</span>
                        <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button className="w-full px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between group">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Histórico de Pedidos</span>
                        <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button className="w-full px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between group">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Configurações de Notificação</span>
                        <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>

             {/* Badges Section */}
             {user.badges && user.badges.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-amber-500" />
                        Minhas Conquistas
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {user.badges.map(badge => (
                            <div key={badge.id} className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                                <span className="text-2xl mr-3">{badge.icon}</span>
                                <div>
                                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{badge.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}

            <Button variant="danger" className="w-full" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair da conta
            </Button>

            <p className="text-center text-xs text-slate-400 mt-4">
                Versão 2.2.0 (Taubaté Edition)
            </p>
        </div>
    );
};
