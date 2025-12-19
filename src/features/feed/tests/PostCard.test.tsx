import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostCard } from '../components/PostCard';
import { FeedPost } from '../types';
import { usePostActions } from '../hooks/usePosts';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock hook
vi.mock('../hooks/usePosts', () => ({
  usePostActions: vi.fn(),
}));

const mockPost: FeedPost = {
  id: '1',
  content: 'Teste de post',
  author: {
    id: 'user-1',
    name: 'Teste User',
    avatarUrl: 'https://example.com/avatar.jpg',
  },
  imageUrls: [],
  createdAt: new Date().toISOString(),
  likesCount: 10,
  isLikedByViewer: false,
  commentsCount: 5,
  isAuthor: false,
};

describe('PostCard', () => {
  it('renders post content correctly', () => {
    (usePostActions as any).mockReturnValue({
      likePost: { mutate: vi.fn() },
      deletePost: { mutate: vi.fn() },
    });

    render(<PostCard post={mockPost} />);

    expect(screen.getByText('Teste de post')).toBeInTheDocument();
    expect(screen.getByText('Teste User')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // Likes
    expect(screen.getByText('5')).toBeInTheDocument(); // Comments
  });

  it('calls likePost.mutate when like button is clicked', () => {
    const mutateMock = vi.fn();
    (usePostActions as any).mockReturnValue({
      likePost: { mutate: mutateMock },
      deletePost: { mutate: vi.fn() },
    });

    render(<PostCard post={mockPost} />);

    const likeButton = screen.getByText('10').closest('button');
    if (likeButton) {
      fireEvent.click(likeButton);
      expect(mutateMock).toHaveBeenCalledWith('1');
    } else {
        throw new Error("Like button not found");
    }
  });
});
