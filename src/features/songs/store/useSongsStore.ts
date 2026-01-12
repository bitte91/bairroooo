import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Song, SongFilters } from '../types/song';

export interface SongsState {
  songs: Song[];
  favorites: string[];
  currentSong: Song | null;
  isPlaying: boolean;
  filters: SongFilters;
  setSongs: (songs: Song[]) => void;
  addToFavorites: (songId: string) => void;
  removeFromFavorites: (songId: string) => void;
  isFavorited: (songId: string) => boolean;
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setFilters: (filters: Partial<SongFilters>) => void;
}

export const useSongsStore = create<SongsState>(
  persist(
    (set, get) => ({
      songs: [],
      favorites: [],
      currentSong: null,
      isPlaying: false,
      filters: {
        search: '',
        genre: null,
        sortBy: 'popular',
      },
      setSongs: (songs: Song[]) => set({ songs }),
      addToFavorites: (songId: string) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, songId])],
        })),
      removeFromFavorites: (songId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== songId),
        })),
      isFavorited: (songId: string) =>
        get().favorites.includes(songId),
      setCurrentSong: (song: Song | null) => set({ currentSong: song }),
      setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
      setFilters: (filters: Partial<SongFilters>) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
    }),
    {
      name: 'songs-store',
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);

export const useSongs = () => useSongsStore((state) => state.songs);
export const useFavorites = () => useSongsStore((state) => state.favorites);
export const useCurrentSong = () => useSongsStore((state) => state.currentSong);
export const useIsPlaying = () => useSongsStore((state) => state.isPlaying);
export const useSongFilters = () => useSongsStore((state) => state.filters);
