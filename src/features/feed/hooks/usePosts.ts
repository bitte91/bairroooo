import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedService } from '../services/feedService';
import { CreatePostDTO, FeedPost } from '../types';
import toast from 'react-hot-toast';

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => feedService.getPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export const usePostActions = () => {
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: (data: CreatePostDTO) => feedService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post publicado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao publicar post.');
    },
  });

  const likePost = useMutation({
    mutationFn: (postId: string) => feedService.likePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((post: FeedPost) => {
              if (post.id === postId) {
                const isLiked = !post.isLikedByViewer;
                return {
                  ...post,
                  isLikedByViewer: isLiked,
                  likesCount: post.likesCount + (isLiked ? 1 : -1),
                };
              }
              return post;
            }),
          })),
        };
      });

      return { previousPosts };
    },
    onError: (_err, _newPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
      toast.error('Erro ao curtir post.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deletePost = useMutation({
    mutationFn: (postId: string) => feedService.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post excluído.');
    },
    onError: () => {
      toast.error('Erro ao excluir post.');
    },
  });

  return { createPost, likePost, deletePost };
};
