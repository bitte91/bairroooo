import { FeedPost, CreatePostDTO, FeedUser } from '../types';

// Mock data
const MOCK_USER: FeedUser = {
  id: 'current-user',
  name: 'Você',
  avatarUrl: 'https://i.pravatar.cc/150?u=current-user',
};

const MOCK_POSTS: FeedPost[] = [
  {
    id: '1',
    content: 'Acabei de conhecer a nova padaria do bairro. O pão de queijo é sensacional! 😋 #recomendação #taubaté',
    author: {
      id: 'user-1',
      name: 'Maria Silva',
      avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
    },
    imageUrls: ['https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800'],
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    likesCount: 12,
    isLikedByViewer: false,
    commentsCount: 3,
    isAuthor: false,
  },
  {
    id: '2',
    content: 'Alguém sabe se a feira vai acontecer amanhã mesmo com a previsão de chuva?',
    author: {
      id: 'user-2',
      name: 'João Souza',
      avatarUrl: 'https://i.pravatar.cc/150?u=user-2',
    },
    imageUrls: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likesCount: 5,
    isLikedByViewer: true,
    commentsCount: 8,
    isAuthor: false,
  },
];

let posts = [...MOCK_POSTS];

export const feedService = {
  getPosts: async (page = 0, limit = 10): Promise<{ data: FeedPost[]; nextCursor: number | undefined }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const start = page * limit;
    const end = start + limit;
    const data = posts.slice(start, end);
    const nextCursor = end < posts.length ? page + 1 : undefined;

    return { data, nextCursor };
  },

  createPost: async (dto: CreatePostDTO): Promise<FeedPost> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPost: FeedPost = {
      id: Date.now().toString(),
      content: dto.content,
      author: { ...MOCK_USER }, // In a real app, this comes from auth context/backend
      imageUrls: dto.images ? dto.images.map(() => `https://picsum.photos/800/600?random=${Math.random()}`) : [], // Mock image upload
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLikedByViewer: false,
      commentsCount: 0,
      isAuthor: true,
    };

    posts = [newPost, ...posts];
    return newPost;
  },

  likePost: async (postId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.isLikedByViewer = !post.isLikedByViewer;
      post.likesCount += post.isLikedByViewer ? 1 : -1;
    }
  },

  deletePost: async (postId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    posts = posts.filter((p) => p.id !== postId);
  },
};
