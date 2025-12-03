import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { NewsItem } from '../types';

// Mock data as fallback
const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Prefeitura de Taubaté inicia obras de recapeamento na Avenida Independência",
    source: "Portal Regional",
    time: "Recente",
    imageUrl: "https://images.unsplash.com/photo-1625723044792-4467c6999d91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Feira de adoção de animais acontece neste fim de semana no Via Vale",
    source: "Guia Taubaté",
    time: "Recente",
    imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Previsão do tempo indica chuvas isoladas para o Vale do Paraíba",
    source: "Clima Tempo",
    time: "Recente",
    imageUrl: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS);
  const [loading, setLoading] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);

  useEffect(() => {
    if (process.env.API_KEY) {
        setAiEnabled(true);
        fetchRealNews();
    }
  }, []);

  const fetchRealNews = async () => {
    if (!process.env.API_KEY) return;
    
    setLoading(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Liste as 3 notícias mais importantes e recentes de hoje em Taubaté-SP.
            Para cada notícia, use estritamente o seguinte formato de bloco para que eu possa analisar (não use markdown code blocks):
            
            TITULO: [Título da notícia aqui]
            FONTE: [Nome da fonte aqui]
            RESUMO: [Um resumo curto de uma frase aqui]
            ###`,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });

        const text = response.text;
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        const parsedNews: NewsItem[] = [];
        const blocks = text ? text.split('###') : [];

        blocks.forEach((block, index) => {
            if (!block.trim()) return;
            
            const titleMatch = block.match(/TITULO:\s*(.+)/);
            const sourceMatch = block.match(/FONTE:\s*(.+)/);

            if (titleMatch) {
                let link = "#";
                if (chunks.length > index && chunks[index].web?.uri) {
                    link = chunks[index].web.uri;
                } else if (chunks.length > 0 && chunks[0].web?.uri) {
                     link = chunks[0].web.uri;
                }

                parsedNews.push({
                    id: Date.now() + index,
                    title: titleMatch[1].trim(),
                    source: sourceMatch ? sourceMatch[1].trim() : "Web",
                    time: "Hoje",
                    imageUrl: FALLBACK_NEWS[index % FALLBACK_NEWS.length].imageUrl,
                    link: link
                });
            }
        });

        if (parsedNews.length > 0) {
            setNews(parsedNews.slice(0, 3));
        }
    } catch (error) {
        console.error("Failed to fetch news:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-secondary dark:text-blue-400">
                <Newspaper size={28} />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold leading-none text-gray-800 dark:text-white">Giro Taubaté</h2>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {loading ? "Buscando atualizações..." : "Notícias locais em tempo real"}
                    </p>
                    {aiEnabled && (
                        <span className="text-[10px] bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                            IA ✨
                        </span>
                    )}
                </div>
            </div>
        </div>
        
        {aiEnabled && (
            <button 
                onClick={fetchRealNews} 
                disabled={loading}
                className="p-3 text-gray-400 hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all disabled:animate-spin"
                title="Atualizar notícias"
            >
                {loading ? <Loader2 size={20} /> : <RefreshCw size={20} />}
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
           [1, 2, 3].map((i) => (
             <div key={i} className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden h-80 animate-pulse">
                <div className="h-44 bg-gray-200 dark:bg-slate-700" />
                <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-full" />
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
                </div>
             </div>
           ))
        ) : (
            news.map((item) => (
            <a 
                key={item.id} 
                href={item.link} 
                target={item.link !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
            >
                <div className="h-44 overflow-hidden relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                         <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                            {item.source}
                         </span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.time}</span>
                    </div>
                    
                    <h3 className="font-heading font-bold text-lg text-gray-800 dark:text-gray-100 leading-snug group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-3 mb-2">
                        {item.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center text-primary dark:text-primary-light text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        Ler notícia completa <ExternalLink size={14} className="ml-1" />
                    </div>
                </div>
            </a>
            ))
        )}
      </div>
    </section>
  );
};