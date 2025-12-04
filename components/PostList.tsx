import React, { useState } from 'react';
import { Post, Favorite } from '../types';
import { MapPin, Phone, Star, MessageCircle, Flag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getUserBadges } from '../utils/badgeSystem';
import { ReviewModal } from './ReviewModal';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { addFavorite, removeFavorite, isFavorite, currentUser, loginUser, addReview, addReport } = useApp();
  const [filter, setFilter] = useState<'todos' | 'comercio' | 'autonomo' | 'promocao'>('todos');
  const [reviewModalOpen, setReviewModalOpen] = useState<number | null>(null);

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

  const handleOpenWhatsApp = (phone?: string, title?: string) => {
      if (!phone) return;
      // Remove non-digits
      const cleanPhone = phone.replace(/\D/g, '');
      const message = encodeURIComponent(`Olá, vi seu anúncio "${title}" no Conecta Bairro.`);
      window.open(`https://wa.me/55${cleanPhone}?text=${message}`, '_blank');
  };

  const handleReport = (post: Post) => {
      if (!currentUser) return;
      // Simple prompt for now
      const reason = prompt("Qual o motivo da denúncia?");
      if (reason) {
          addReport({
              id: Date.now(),
              itemId: post.id,
              itemType: 'post',
              reason,
              reportedBy: currentUser,
              timestamp: 'Agora',
              status: 'pending'
          });
      }
  };

  return (
    <section className="mb-16">
      {reviewModalOpen && (
          <ReviewModal
            postId={reviewModalOpen}
            postTitle={posts.find(p => p.id === reviewModalOpen)?.title || ''}
            onClose={() => setReviewModalOpen(null)}
            onSubmit={(data) => {
                if (!currentUser) return;
                addReview({
                    id: Date.now(),
                    postId: reviewModalOpen,
                    author: currentUser,
                    rating: data.rating,
                    comment: data.comment,
                    timestamp: 'Agora'
                });
                setReviewModalOpen(null);
            }}
          />
      )}
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

             {/* Report Button (Hover only) */}
             <button
                onClick={(e) => { e.stopPropagation(); handleReport(post); }}
                className="absolute top-3 right-24 p-1.5 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="Denunciar Anúncio"
            >
                <Flag size={14} />
            </button>

            <h3 className="font-heading font-bold text-xl text-gray-800 dark:text-white mb-1 pr-8">{post.title}</h3>

            {/* Reviews Summary */}
            <div className="flex items-center gap-1 mb-3 text-xs">
                <Star size={12} className="text-amber-400" fill="#fbbf24" />
                <span className="font-bold text-gray-700 dark:text-gray-200">
                    {post.reviews && post.reviews.length > 0
                        ? (post.reviews.reduce((acc, r) => acc + r.rating, 0) / post.reviews.length).toFixed(1)
                        : 'Novo'}
                </span>
                <span className="text-gray-400">({post.reviews?.length || 0})</span>
                {currentUser && (
                    <button onClick={() => setReviewModalOpen(post.id)} className="ml-2 text-primary hover:underline">Avaliar</button>
                )}
            </div>

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
                {post.phone ? (
                    <button
                        onClick={() => handleOpenWhatsApp(post.phone, post.title)}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Conversar no WhatsApp"
                    >
                        <MessageCircle size={18} />
                    </button>
                ) : (
                    <button className="p-2 text-gray-400 cursor-not-allowed rounded-lg" title="Telefone não disponível">
                        <Phone size={18} />
                    </button>
                )}
              </div>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
};
