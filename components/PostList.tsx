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
  const [neighborhoodFilter, setNeighborhoodFilter] = useState('Todos');
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState<number | null>(null);

  const neighborhoods = ['Todos', 'Centro', 'CECAP', 'Independência', 'Vila Olímpia', 'Bonfim', 'Jardim das Nações'];

  const filteredPosts = posts
    .filter(post => filter === 'todos' || post.type === filter)
    .filter(post => neighborhoodFilter === 'Todos' || post.neighborhood === neighborhoodFilter)
    .filter(post => !onlyDiscounts || (post.discount || post.type === 'promocao'))
    .sort((a, b) => (Number(b.isHighlighted || 0) - Number(a.isHighlighted || 0)) || (b.id - a.id));

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
      <div className="flex flex-col items-center mb-10 gap-4">
        {/* Type Filter */}
        <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 rounded-full border border-orange-100 dark:border-slate-700 shadow-sm overflow-x-auto max-w-full">
          {['todos', 'comercio', 'autonomo', 'promocao'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all capitalize whitespace-nowrap ${
                filter === f
                  ? 'bg-bairro-teal text-white shadow-md'
                  : 'text-bairro-stone-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-slate-700'
              }`}
            >
              {f === 'todos' ? 'Todos' : f}
            </button>
          ))}
        </div>

        {/* Neighborhood & Feature Filters */}
        <div className="flex flex-wrap justify-center gap-3">
            <select
                value={neighborhoodFilter}
                onChange={(e) => setNeighborhoodFilter(e.target.value)}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-orange-100 dark:border-slate-700 text-sm font-bold text-bairro-stone-600 dark:text-gray-300 outline-none focus:ring-2 focus:ring-bairro-teal"
            >
                {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <button
                onClick={() => setOnlyDiscounts(!onlyDiscounts)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all flex items-center gap-2 ${onlyDiscounts ? 'bg-green-100 border-green-200 text-green-700' : 'bg-white border-orange-100 text-gray-500 hover:bg-orange-50'}`}
            >
                <Star size={14} className={onlyDiscounts ? "fill-green-700" : ""} /> Descontos Hoje
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {filteredPosts.map((post) => {
            const isFav = isFavorite(post.id.toString());
            return (
          <div key={post.id} className={`group bg-white dark:bg-slate-800 rounded-3xl shadow-sm border p-0 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden flex flex-col ${post.isHighlighted ? 'border-amber-400 ring-2 ring-amber-100 dark:ring-amber-900/30' : 'border-orange-100 dark:border-slate-700'}`}>

            {/* Visual Header Mock */}
            <div className="h-48 bg-gray-200 w-full relative overflow-hidden">
                {/* Taubaté/Service Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                <img
                    src={`https://source.unsplash.com/random/400x300?${post.type},neighborhood&sig=${post.id}`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                />

                <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md bg-white/90 text-bairro-stone-900`}>
                    {post.type}
                </div>

                {post.discount && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white animate-pulse shadow-lg">
                        {post.discount}
                    </div>
                )}

                {post.isHighlighted && (
                    <div className="absolute top-12 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-lg flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> Destaque
                    </div>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif font-bold text-xl text-bairro-stone-900 dark:text-white mb-2 line-clamp-1">{post.title}</h3>

                <div className="flex justify-between items-center mb-4">
                    {/* Reviews Summary */}
                    <div className="flex items-center gap-1 text-xs">
                        <Star size={14} className="text-bairro-amber" fill="currentColor" />
                        <span className="font-bold text-bairro-stone-900 dark:text-gray-200 text-sm">
                            {post.reviews && post.reviews.length > 0
                                ? (post.reviews.reduce((acc, r) => acc + r.rating, 0) / post.reviews.length).toFixed(1)
                                : 'Novo'}
                        </span>
                        <span className="text-gray-400">({post.reviews?.length || 0})</span>
                    </div>
                    {post.neighborhood && (
                        <div className="flex items-center gap-1 text-xs text-bairro-teal font-bold bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-md">
                            <MapPin size={12} /> {post.neighborhood}
                        </div>
                    )}
                </div>

                <p className="text-bairro-stone-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{post.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-orange-50 dark:border-slate-700/50 mt-auto">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bairro-teal/10 flex items-center justify-center text-xs font-bold text-bairro-teal border border-bairro-teal/20">
                    {post.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-bairro-stone-900 dark:text-gray-300">{post.author}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => toggleFavorite(post)}
                        className={`p-2 rounded-full transition-colors ${isFav ? 'text-bairro-amber bg-orange-50' : 'text-gray-400 hover:text-bairro-amber hover:bg-orange-50'}`}
                        title="Salvar"
                    >
                        <Star size={18} fill={isFav ? "currentColor" : "none"} />
                    </button>
                    {post.phone ? (
                        <button
                            onClick={() => handleOpenWhatsApp(post.phone, post.title)}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1 shadow-md hover:shadow-lg"
                            title="Negociar no WhatsApp"
                        >
                            <MessageCircle size={16} /> Negociar Zap
                        </button>
                    ) : (
                        <button className="p-2 text-gray-400 cursor-not-allowed rounded-full" title="Telefone não disponível">
                            <Phone size={18} />
                        </button>
                    )}
                </div>
                </div>
            </div>

             {/* Report Button (Hover only) */}
             <button
                onClick={(e) => { e.stopPropagation(); handleReport(post); }}
                className="absolute top-3 right-24 z-20 p-1.5 text-white/80 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 bg-black/20 rounded-full backdrop-blur-sm"
                title="Denunciar Anúncio"
            >
                <Flag size={14} />
            </button>
          </div>
        )})}
      </div>
    </section>
  );
};
