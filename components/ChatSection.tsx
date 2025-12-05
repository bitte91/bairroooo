import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageSquare, Send, Users, ShieldAlert, PawPrint, HeartHandshake, Flag } from 'lucide-react';
import { getUserBadges } from '../utils/badgeSystem';
import { useApp } from '../contexts/AppContext';

interface ChatSectionProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  currentUser: string | null;
  onRequireLogin: () => void;
}

const ROOMS = [
    { id: 'geral', name: 'Geral', icon: <MessageSquare size={18} />, color: 'bg-indigo-500' },
    { id: 'pets', name: 'Pets', icon: <PawPrint size={18} />, color: 'bg-rose-500' },
    { id: 'ajuda', name: 'Ajuda', icon: <HeartHandshake size={18} />, color: 'bg-amber-500' },
    { id: 'seguranca', name: 'Segurança', icon: <ShieldAlert size={18} />, color: 'bg-red-500' },
];

export const ChatSection: React.FC<ChatSectionProps> = ({ messages, onSendMessage, currentUser, onRequireLogin }) => {
  const { addReport } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [currentRoom, setCurrentRoom] = useState('geral');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentRoom]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    if (!currentUser) {
      onRequireLogin();
      return;
    }
    // In a real app, we would send the room ID with the message
    onSendMessage(`[${ROOMS.find(r => r.id === currentRoom)?.name}] ${inputValue.trim()}`);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleReportMessage = (msg: Message) => {
      if (!currentUser) return;
      const reason = prompt("Reportar mensagem por qual motivo?");
      if (reason) {
          addReport({
              id: Date.now(),
              itemId: msg.id,
              itemType: 'message',
              reason,
              reportedBy: currentUser,
              timestamp: 'Agora',
              status: 'pending'
          });
      }
  };

  // Filter messages by room (Mock logic: check if text starts with [RoomName])
  // For 'geral', show messages without prefix or with [Geral]
  const roomMessages = messages.filter(msg => {
      if (currentRoom === 'geral') {
          return !msg.text.startsWith('[') || msg.text.startsWith('[Geral]');
      }
      return msg.text.startsWith(`[${ROOMS.find(r => r.id === currentRoom)?.name}]`);
  });

  return (
    <section className="mb-20 mt-12">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-2">
        <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg text-primary dark:text-primary-light">
             <Users size={24} />
        </span>
        Chat da Comunidade
      </h2>
      
      <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border overflow-hidden flex flex-col md:flex-row h-[600px] transition-colors duration-300">

        {/* Sidebar Rooms */}
        <div className="w-full md:w-64 bg-gray-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800 p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Salas de Bate-papo</h3>
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {ROOMS.map(room => (
                    <button
                        key={room.id}
                        onClick={() => setCurrentRoom(room.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full min-w-[140px] md:min-w-0 text-left ${
                            currentRoom === room.id
                            ? 'bg-white dark:bg-slate-800 shadow-md text-gray-800 dark:text-white font-bold'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm ${room.color}`}>
                            {room.icon}
                        </div>
                        <span className="whitespace-nowrap">{room.name}</span>
                    </button>
                ))}
            </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="bg-white dark:bg-dark-surface px-6 py-4 border-b border-gray-100 dark:border-dark-border flex items-center gap-3 text-gray-800 dark:text-white font-bold shadow-sm z-10">
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${currentRoom === 'seguranca' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span>Sala: {ROOMS.find(r => r.id === currentRoom)?.name}</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 bg-gray-50 dark:bg-slate-900/50 overflow-y-auto custom-scrollbar flex flex-col gap-6"
                style={{
                backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.9
                }}>
            {roomMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <MessageSquare size={40} className="mb-2 opacity-20" />
                    <p>Nenhuma mensagem nesta sala ainda.</p>
                    <p className="text-xs">Seja o primeiro a falar!</p>
                </div>
            )}
            {roomMessages.map((msg) => {
                const isMe = msg.author === currentUser;
                // Remove prefix for display
                const displayText = msg.text.replace(/^\[.*?\]\s*/, '');

                return (
                <div key={msg.id} className={`group flex flex-col max-w-[85%] md:max-w-[70%] ${isMe ? 'self-end items-end' : 'self-start items-start'} animate-fadeIn`}>
                    <div className={`px-5 py-4 rounded-3xl shadow-md relative text-sm md:text-base leading-relaxed ${
                    isMe
                        ? 'bg-primary dark:bg-primary-dark text-white rounded-br-sm'
                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-slate-700'
                    }`}>
                    {!isMe && (
                        <div className="flex justify-between items-start">
                             <div className="text-xs font-bold mb-1 text-primary dark:text-primary-light flex items-center gap-1">
                                {msg.author}
                                <div className="flex">
                                    {getUserBadges(msg.author).map(b => (
                                        <span key={b.id} title={b.name} className="text-[10px] cursor-help">{b.icon}</span>
                                    ))}
                                </div>
                             </div>
                             <button
                                onClick={() => handleReportMessage(msg)}
                                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-opacity ml-2"
                                title="Reportar mensagem"
                             >
                                 <Flag size={10} />
                             </button>
                        </div>
                    )}
                    {displayText}
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-1.5 px-2">
                        {isMe ? 'Você • ' : ''} {msg.timestamp}
                    </span>
                </div>
                );
            })}
            <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border flex gap-4">
            <input
                type="text"
                className="flex-1 px-6 py-4 bg-gray-100 dark:bg-slate-800 border-2 border-transparent rounded-full focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary/50 dark:focus:border-primary/40 focus:shadow-lg transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-gray-100"
                placeholder={currentUser ? `Mensagem em #${ROOMS.find(r => r.id === currentRoom)?.name}...` : "Entre para conversar..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={200}
            />
            <button
                onClick={handleSubmit}
                className="w-14 h-14 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center hover:bg-primary-light dark:hover:bg-indigo-600 transition-all shadow-lg active:scale-95 group"
                aria-label="Enviar"
            >
                <Send size={20} className={`group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${inputValue.trim() ? '' : 'opacity-70'}`} />
            </button>
            </div>
        </div>
      </div>
    </section>
  );
};
