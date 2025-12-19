import React, { memo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Heart, MessageCircle, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { FeedPost } from '../types';
import { usePostActions } from '../hooks/usePosts';
import clsx from 'clsx';

interface PostCardProps {
  post: FeedPost;
}

export const PostCard = memo(({ post }: PostCardProps) => {
  const { likePost, deletePost } = usePostActions();

  const handleLike = () => {
    likePost.mutate(post.id);
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      deletePost.mutate(post.id);
    }
  };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden mb-4 transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600"
            loading="lazy"
          />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              {post.author.name}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
        </div>

        {post.isAuthor && (
          <div className="relative group">
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <MoreVertical size={20} />
            </button>
            <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 hidden group-hover:block z-10">
              <button className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                <Edit2 size={14} /> Editar
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <Trash2 size={14} /> Excluir
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Images */}
      {post.imageUrls.length > 0 && (
        <div className={clsx(
          "mt-2 grid gap-0.5",
          post.imageUrls.length === 1 ? "grid-cols-1" :
          post.imageUrls.length === 2 ? "grid-cols-2" :
          post.imageUrls.length === 3 ? "grid-cols-2" : "grid-cols-2"
        )}>
          {post.imageUrls.map((url, index) => (
            <div
              key={index}
              className={clsx(
                "relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden",
                post.imageUrls.length === 3 && index === 0 ? "col-span-2" : ""
              )}
            >
              <img
                src={url}
                alt={`Imagem do post ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center gap-6 border-t border-slate-50 dark:border-slate-700/50 mt-2">
        <button
          onClick={handleLike}
          className={clsx(
            "flex items-center gap-2 text-sm transition-colors group",
            post.isLikedByViewer
              ? "text-red-500"
              : "text-slate-500 hover:text-red-500"
          )}
        >
          <Heart
            size={20}
            className={clsx(
              "transition-all duration-300",
              post.isLikedByViewer ? "fill-current scale-110" : "group-hover:scale-110"
            )}
          />
          <span className="font-medium">{post.likesCount}</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500 transition-colors group">
          <MessageCircle size={20} className="group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">{post.commentsCount}</span>
        </button>
      </div>
    </article>
  );
});

PostCard.displayName = 'PostCard';
