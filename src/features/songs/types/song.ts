export type SongGenre = 'Pop' | 'Rock' | 'Hip-Hop' | 'Eletrônico' | 'Samba' | 'Forró' | 'MPB' | 'Funk' | 'Reggae' | 'Outros';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre: SongGenre;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  likes: number;
  listens: number;
  createdAt: Date;
  updatedAt: Date;
  isExplicit?: boolean;
}

export interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  onLike: (songId: string) => void;
  isFavorited?: boolean;
}

export interface SongFilters {
  search: string;
  genre: SongGenre | null;
  sortBy: 'popular' | 'recent' | 'likes';
}

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Música da Vila',
    artist: 'Artista Local',
    album: 'Canto do Bairro',
    genre: 'MPB',
    duration: 240,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    audioUrl: '#',
    likes: 234,
    listens: 1200,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
