export interface FeedUser {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface FeedPost {
  id: string;
  content: string;
  author: FeedUser;
  imageUrls: string[];
  createdAt: string; // ISO string
  likesCount: number;
  isLikedByViewer: boolean;
  commentsCount: number;
  isAuthor: boolean;
}

export interface CreatePostDTO {
  content: string;
  images?: File[];
}
