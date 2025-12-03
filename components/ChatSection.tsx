import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageSquare, Send } from 'lucide-react';

interface ChatSectionProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  currentUser: string | null;
  onRequireLogin: () => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({ messages, onSendMessage, currentUser, onRequireLogin }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    if (!currentUser) {
      onRequireLogin();
      return;
    }
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <section className="mb-20 mt-12">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-2">
        <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg text-primary dark:text-primary-light">
             <MessageSquare size={24} />
        </span>
        Chat da Comunidade
      </h2>
      
      <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border overflow-hidden flex flex-col h-[600px] transition-colors duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-dark-surface px-8 py-5 border-b border-gray-100 dark:border-dark-border flex items-center gap-3 text-primary dark:text-primary-light font-bold shadow-sm z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span>Conversa Geral</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-8 bg-gray-50 dark:bg-slate-900/50 overflow-y-auto custom-scrollbar flex flex-col gap-6" 
             style={{ 
               backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
               backgroundSize: '24px 24px',
               opacity: 0.9
             }}>
          {messages.map((msg) => {
            const isMe = msg.author === currentUser;
            return (
              <div key={msg.id} className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isMe ? 'self-end items-end' : 'self-start items-start'} animate-fadeIn`}>
                <div className={`px-5 py-4 rounded-3xl shadow-md relative text-sm md:text-base leading-relaxed ${
                  isMe 
                    ? 'bg-primary dark:bg-primary-dark text-white rounded-br-sm' 
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-slate-700'
                }`}>
                   {!isMe && (
                     <div className="text-xs font-bold mb-1 text-primary dark:text-primary-light">
                        {msg.author}
                     </div>
                   )}
                   {msg.text}
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
            placeholder={currentUser ? "Digite sua mensagem..." : "Entre para conversar..."}
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
    </section>
  );
};