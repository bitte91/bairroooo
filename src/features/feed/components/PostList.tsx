import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2, AlertCircle } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from './PostCard';
import { FeedPost } from '../types';

const PostSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 mb-4 animate-pulse">
    <div className="flex gap-3 mb-4">
      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
    </div>
    <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4" />
    <div className="flex justify-between pt-2">
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16" />
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16" />
    </div>
  </div>
);

export const PostList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="w-full">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Ops! Algo deu errado.
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Não foi possível carregar o feed. Tente novamente mais tarde.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!data?.pages[0].data.length) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">
          Nenhum post encontrado. Seja o primeiro a publicar!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.data.map((post: FeedPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </React.Fragment>
      ))}

      <div ref={ref} className="py-4 text-center">
        {isFetchingNextPage ? (
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <Loader2 size={20} className="animate-spin" /> Carregando mais...
          </div>
        ) : hasNextPage ? (
          <span className="text-transparent">Carregar mais</span>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-600">
            Você chegou ao fim do feed 🎉
          </p>
        )}
      </div>
    </div>
  );
};
