import React, { useState } from 'react';
import { Post, Favorite } from '../types';
import { MapPin, Phone, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getUserBadges } from '../utils/badgeSystem';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { addFavorite, removeFavorite, isFavorite, currentUser, loginUser } = useApp();
  const [filter, setFilter] = useState<'todos' | 'comercio' | 'autonomo' | 'promocao'>('todos');

  const filteredPosts = filter === 'todos'
    ? posts 
    : posts.filter(post => post.type === filter);

  const toggleFavorite = (post: Post) => {
      if (!currentUser) {
          // Trigger login if needed, or handle in UI
          return;
      }
      const id = post.id.toString();
      if (isFavorite(id)) {
          removeFavorite(id);
      } else {
          const newFav: Favorite = {
              id: Date.now().toString(),
              userId: currentUser,
              itemId: id,
              itemType: 'post',
              title: post.title,
              createdAt: new Date().toISOString()
          };
          addFavorite(newFav);
      }
  };

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white mb-2">
            Comércio & Serviços
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Apoie quem faz a diferença no nosso bairro.</p>
        </div>

        <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm overflow-x-auto max-w-full">
          {['todos', 'comercio', 'autonomo', 'promocao'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all capitalize whitespace-nowrap ${
                filter === f
                  ? 'bg-primary dark:bg-primary-dark text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {f === 'todos' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
            const isFav = isFavorite(post.id.toString());
            return (
          <div key={post.id} className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-all hover:shadow-md hover:-translate-y-1 relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider ${
              post.type === 'promocao' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
              post.type === 'autonomo' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
              'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            }`}>
              {post.type}
            </div>

            <h3 className="font-heading font-bold text-xl text-gray-800 dark:text-white mb-2 pr-8">{post.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{post.desc}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-300">
                  {post.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Por {post.author}</span>
                        <div className="flex">
                            {getUserBadges(post.author).map(b => (
                                <span key={b.id} title={b.name} className="text-[10px] cursor-help">{b.icon}</span>
                            ))}
                        </div>
                    </div>
                </div>
              </div>

              <div className="flex gap-2">
                 <button
                    onClick={() => toggleFavorite(post)}
                    className={`p-2 rounded-lg transition-colors ${isFav ? 'text-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'text-gray-400 hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700'}`}
                    title="Salvar"
                 >
                     <Star size={18} fill={isFav ? "currentColor" : "none"} />
                 </button>
                 <button className="p-2 text-primary dark:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors" title="Ver Localização">
                    <MapPin size={18} />
                </button>
                <button className="p-2 text-primary dark:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors" title="Contatar">
                    <Phone size={18} />
                </button>
              </div>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
};
