import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Bell, X, Check, Info, AlertTriangle, MessageSquare } from 'lucide-react';
import { Notification } from '../types';

export const NotificationCenter = () => {
    const { notifications, markAsRead, clearNotifications } = useApp();
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'alert': return <AlertTriangle size={16} className="text-red-500" />;
            case 'message': return <MessageSquare size={16} className="text-blue-500" />;
            case 'system': return <Info size={16} className="text-gray-500" />;
            default: return <Bell size={16} className="text-gray-500" />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                aria-label="Notificações"
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 top-12 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden animate-fadeIn origin-top-right">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">Notificações</h3>
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearNotifications}
                                    className="text-xs text-primary dark:text-primary-light font-bold hover:underline"
                                >
                                    Limpar tudo
                                </button>
                            )}
                        </div>

                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">
                                    <Bell size={32} className="mx-auto mb-2 opacity-20" />
                                    <p className="text-sm">Nenhuma notificação.</p>
                                </div>
                            ) : (
                                <ul>
                                    {notifications.map(notif => (
                                        <li
                                            key={notif.id}
                                            className={`p-4 border-b border-gray-50 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${notif.read ? 'opacity-60' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}
                                            onClick={() => markAsRead(notif.id)}
                                        >
                                            <div className="flex gap-3">
                                                <div className={`mt-1 min-w-[32px] h-8 rounded-full bg-white dark:bg-slate-700 border border-gray-100 dark:border-slate-600 flex items-center justify-center shadow-sm`}>
                                                    {getIcon(notif.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className={`text-sm ${notif.read ? 'font-medium' : 'font-bold'} text-gray-800 dark:text-white`}>{notif.title}</h4>
                                                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.timestamp}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                                                </div>
                                                {!notif.read && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
