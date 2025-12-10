import { create } from 'zustand';
import { bairroRepository } from '../../infrastructure/repositories/BairroRepository';

interface BairroState {
  bairros: string[];
  selectedBairro: string | null;
  loading: boolean;
  error: string | null;
  setBairros: (bairros: string[]) => void;
  selectBairro: (bairro: string) => void;
  fetchBairros: () => Promise<void>;
}

export const useBairroStore = create<BairroState>((set) => ({
  bairros: [],
  selectedBairro: null,
  loading: false,
  error: null,
  setBairros: (bairros) => set({ bairros }),
  selectBairro: (bairro) => set({ selectedBairro: bairro }),
  fetchBairros: async () => {
    set({ loading: true, error: null });
    try {
      const bairros = await bairroRepository.getBairros();
      set({ bairros, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch bairros', loading: false });
    }
  },
}));
