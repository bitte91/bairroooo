import React, { useState, useEffect, useRef } from 'react';
import { Post, PostType } from '../types';
import { Store, User, Tag, Search } from 'lucide-react';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [filter, setFilter] = useState<PostType | 'all'>('all');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.type === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getBadgeStyle = (type: PostType) => {
    switch(type) {
      case 'comercio': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      case 'autonomo': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      case 'promocao': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getBadgeLabel = (type: PostType) => {
    switch(type) {
      case 'comercio': return 'Comércio';
      case 'autonomo': return 'Autônomo';
      case 'promocao': return 'Oferta';
      default: return type;
    }
  };

  const getIcon = (type: PostType) => {
     switch(type) {
      case 'comercio': return <Store size={14} />;
      case 'autonomo': return <User size={14} />;
      case 'promocao': return <Tag size={14} />;
      default: return <Store size={14} />;
    }
  };

  const filters: { id: PostType | 'all', label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'comercio', label: 'Comércio' },
    { id: 'autonomo', label: 'Autônomos' },
    { id: 'promocao', label: 'Promoções' },
  ];

  return (
    <section className="mb-16" ref={containerRef}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white">Anúncios Recentes</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                filter === f.id 
                  ? 'bg-primary text-white border-primary dark:bg-primary-dark dark:border-primary-dark shadow-md' 
                  : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 border-gray-200 dark:border-dark-border hover:border-primary hover:text-primary dark:hover:text-primary-light'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border">
            <Search size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Nenhum anúncio encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`group bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-700 ease-out overflow-hidden flex flex-col ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-50 dark:border-dark-border bg-gray-50/50 dark:bg-slate-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light text-xs font-bold border border-primary/10">
                    {post.author.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{post.author}</span>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5 ${getBadgeStyle(post.type)}`}>
                  {getIcon(post.type)}
                  {getBadgeLabel(post.type)}
                </span>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-heading font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{post.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{post.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};