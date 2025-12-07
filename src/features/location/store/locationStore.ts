import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  selectedNeighborhood: string | null;
  searchRadius: number; // in km
  currentLocation: { lat: number; lng: number } | null;
  setNeighborhood: (neighborhood: string | null) => void;
  setRadius: (radius: number) => void;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedNeighborhood: null,
      searchRadius: 5,
      currentLocation: null,
      setNeighborhood: (neighborhood) => set({ selectedNeighborhood: neighborhood }),
      setRadius: (radius) => set({ searchRadius: radius }),
      setCurrentLocation: (location) => set({ currentLocation: location }),
    }),
    {
      name: 'location-storage',
    }
  )
);
