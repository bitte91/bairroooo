import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { Message } from '../../../shared/types';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Send, User } from 'lucide-react';

export const ChatView: React.FC = () => {
    const { activeConversationId, messages, addMessage } = useChatStore();
    const [inputValue, setInputValue] = useState('');

    // Mock initial view if no active conversation
    if (!activeConversationId) {
        return (
            <div className="flex flex-col h-[calc(100vh-200px)]">
                 <div className="w-full border-b border-gray-200 dark:border-slate-800 p-4">
                     <h1 className="text-2xl font-bold">Mensagens</h1>
                 </div>
                 <div className="flex-1 flex items-center justify-center text-gray-500">
                     <div className="text-center">
                         <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                             <User size={32} />
                         </div>
                         <p>Selecione uma conversa ou inicie um novo chat.</p>
                         <Button className="mt-4" onClick={() => useChatStore.getState().setActiveConversation('mock-1')}>
                            Iniciar Chat Demo
                         </Button>
                     </div>
                 </div>
            </div>
        );
    }

    const currentMessages = messages[activeConversationId] || [];

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            text: inputValue,
            author: 'Me', // Replace with real user ID
            timestamp: new Date().toISOString()
        };

        addMessage(activeConversationId, newMessage);
        setInputValue('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            {/* Chat Header */}
            <div className="bg-white dark:bg-slate-900 p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold">
                        JD
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">João da Padaria</h3>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Online
                        </p>
                    </div>
                </div>
                 <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => useChatStore.getState().setActiveConversation(null)}
                    aria-label="Voltar para lista de conversas"
                 >
                    Voltar
                 </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                {currentMessages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm mt-10">
                        Nenhuma mensagem ainda. Diga olá!
                    </div>
                )}
                {currentMessages.map((msg) => {
                    const isMe = msg.author === 'Me';
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                                isMe
                                    ? 'bg-emerald-600 text-white rounded-br-none'
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-none'
                            }`}>
                                <p className="text-sm">{msg.text}</p>
                                <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-emerald-100' : 'text-gray-400'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                <form
                    className="flex gap-2"
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                >
                    <Input
                        placeholder="Digite sua mensagem..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1"
                        aria-label="Digite sua mensagem"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!inputValue.trim()}
                        aria-label="Enviar mensagem"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
};
