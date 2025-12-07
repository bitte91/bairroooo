import React, { useState } from 'react';
import { Post, Alert } from '../types';
import { Card } from './ui/Card';
import { AlertTriangle, MapPin, Clock, MessageCircle, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface CombinedFeedProps {
  posts: Post[];
  alerts: Alert[];
}

export const CombinedFeed: React.FC<CombinedFeedProps> = ({ posts, alerts }) => {
  const [filter, setFilter] = useState<'all' | 'posts' | 'alerts'>('all');
  const { addMessage } = useApp(); // Just for prototyping actions if needed

  // Merge and sort by ID (simulating timestamp) or use a real timestamp if available
  // Alerts usually have 'timestamp' string, Posts don't in the current types (need to check types.ts)
  // For now, I'll just map them to a common structure

  const unifiedItems = [
    ...alerts.map(a => ({ ...a, itemType: 'alert' as const, sortKey: a.id })),
    ...posts.map(p => ({ ...p, itemType: 'post' as const, sortKey: p.id }))
  ].sort((a, b) => b.sortKey - a.sortKey);

  const filteredItems = unifiedItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'posts') return item.itemType === 'post';
    if (filter === 'alerts') return item.itemType === 'alert';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-slate-800 text-white dark:bg-slate-700'
              : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('posts')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'posts'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
          }`}
        >
          Mural
        </button>
        <button
          onClick={() => setFilter('alerts')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'alerts'
              ? 'bg-red-500 text-white'
              : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
          }`}
        >
          Alertas
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          if (item.itemType === 'alert') {
            const alert = item as Alert & { itemType: 'alert' };
            return (
              <Card
                key={`alert-${alert.id}`}
                variant="alert"
                className="animate-fadeIn"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                      <AlertTriangle size={20} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                         <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 mb-1">
                            {alert.type}
                         </span>
                         <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{alert.title}</h3>
                      </div>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={12} /> {alert.timestamp}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm leading-relaxed">
                      {alert.desc}
                    </p>

                    {alert.image && (
                      <div className="mt-3 rounded-lg overflow-hidden h-48 w-full bg-slate-100">
                        <img src={alert.image} alt={alert.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-red-100 dark:border-red-900/30 pt-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <User size={14} />
                            <span>{alert.author}</span>
                        </div>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
                            <MessageCircle size={16} /> Oferecer Ajuda
                        </button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          } else {
             const post = item as Post & { itemType: 'post' };
             return (
               <Card
                key={`post-${post.id}`}
                className="animate-fadeIn"
               >
                 <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                            <User size={20} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 mb-1">
                                    {post.type}
                                </span>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{post.title}</h3>
                            </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm leading-relaxed">
                            {post.desc}
                        </p>

                        {(post.latitude && post.longitude) && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-teal-600 dark:text-teal-400">
                                <MapPin size={12} />
                                <span>Ver no mapa</span>
                            </div>
                        )}

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{post.author}</span>
                            </div>
                            <button className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
                                <MessageCircle size={16} /> Responder
                            </button>
                        </div>
                    </div>
                 </div>
               </Card>
             );
          }
        })}
      </div>
    </div>
  );
};
