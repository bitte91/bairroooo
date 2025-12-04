import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { User, Shield, Star, Award, MapPin, Edit2, Lock } from 'lucide-react';
import { getUserBadges, BADGES } from '../utils/badgeSystem';
import { ModerationDashboard } from './ModerationDashboard';

export const UserProfile = () => {
    const { currentUser, posts, badges } = useApp();
    const [showAdmin, setShowAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("Morador do bairro há 5 anos. Adoro jardinagem e ajudar nos eventos da comunidade.");
    const [location, setLocation] = useState("Rua das Flores, 123");

    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <User size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Perfil de Usuário</h2>
                <p className="text-gray-500 mb-6">Faça login para ver seu perfil e estatísticas.</p>
            </div>
        );
    }

    // Mock Admin Check (In real app, check user role)
    const isAdmin = currentUser === 'Admin' || currentUser === 'Tester User';

    if (showAdmin && isAdmin) {
        return (
            <div>
                <button onClick={() => setShowAdmin(false)} className="mb-4 text-sm text-gray-500 hover:text-primary">
                    &larr; Voltar ao Perfil
                </button>
                <ModerationDashboard />
            </div>
        );
    }

    const myPosts = posts.filter(p => p.author === currentUser);
    const myBadges = getUserBadges(currentUser);

    return (
        <section className="animate-fadeIn pb-20 max-w-4xl mx-auto">
            {/* Header / Cover */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 rounded-t-3xl relative">
                <div className="absolute -bottom-16 left-8 p-1 bg-white dark:bg-slate-900 rounded-full">
                    <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-300 border-4 border-white dark:border-slate-900">
                        {currentUser.charAt(0)}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-b-3xl shadow-sm border-x border-b border-gray-100 dark:border-slate-700 px-8 pt-20 pb-8 mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            {currentUser}
                            <Shield className="text-blue-500" size={20} fill="currentColor" />
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-2">
                            <MapPin size={16} /> {location}
                        </p>

                        {isAdmin && (
                            <button
                                onClick={() => setShowAdmin(true)}
                                className="mt-4 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full flex items-center gap-1 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                            >
                                <Lock size={12} /> Painel Admin
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                        <Edit2 size={16} /> Editar Perfil
                    </button>
                </div>

                <div className="mt-6">
                    {isEditing ? (
                        <div className="space-y-4 max-w-lg">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full p-3 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Localização</label>
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full p-3 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700"
                                />
                            </div>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-primary text-white font-bold rounded-lg"
                            >
                                Salvar
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                            {bio}
                        </p>
                    )}
                </div>

                {/* Badges */}
                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-700">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                        <Award size={16} /> Conquistas & Reputação
                    </h3>
                    <div className="flex gap-4 flex-wrap">
                        {myBadges.map(badge => (
                            <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700 pr-6" title={badge.description}>
                                <span className="text-2xl">{badge.icon}</span>
                                <div>
                                    <p className="font-bold text-sm text-gray-800 dark:text-white">{badge.name}</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Desbloqueado</p>
                                </div>
                            </div>
                        ))}
                         {/* Locked Badge Mock */}
                         <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-700 pr-6 opacity-50 grayscale">
                            <span className="text-2xl">🏆</span>
                            <div>
                                <p className="font-bold text-sm text-gray-800 dark:text-white">Líder Comunitário</p>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Bloqueado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Posts */}
            <div>
                 <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Meus Anúncios ({myPosts.length})</h3>
                 {myPosts.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {myPosts.map(post => (
                             <div key={post.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-slate-700 flex justify-between">
                                 <div>
                                     <h4 className="font-bold text-gray-800 dark:text-white">{post.title}</h4>
                                     <p className="text-sm text-gray-500">{post.type}</p>
                                 </div>
                                 <div className="flex items-center gap-2">
                                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Ativo</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                 ) : (
                     <p className="text-gray-500">Você ainda não publicou nada.</p>
                 )}
            </div>
        </section>
    );
};
