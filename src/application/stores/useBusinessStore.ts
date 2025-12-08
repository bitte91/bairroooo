import { create } from 'zustand';
import { Business, BusinessStatus } from '../../domain/types';
import { businessRepository } from '../../infrastructure/repositories/BusinessRepository';

interface BusinessState {
  businesses: Business[];
  approvedBusinesses: Business[];
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchApproved: () => Promise<void>;
  addBusiness: (business: Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<void>;
  updateStatus: (id: string, status: BusinessStatus) => Promise<void>;
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  businesses: [],
  approvedBusinesses: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const businesses = await businessRepository.getAll();
      set({ businesses, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch businesses', loading: false });
    }
  },

  fetchApproved: async () => {
    set({ loading: true, error: null });
    try {
      const approvedBusinesses = await businessRepository.getApproved();
      set({ approvedBusinesses, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch approved businesses', loading: false });
    }
  },

  addBusiness: async (business) => {
    set({ loading: true, error: null });
    try {
      await businessRepository.add(business);
      // Refresh lists
      await get().fetchAll();
      // Note: we don't refresh approved list because new business is pending
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to add business', loading: false });
    }
  },

  updateStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      await businessRepository.updateStatus(id, status);
      // Refresh lists
      await get().fetchAll();
      await get().fetchApproved();
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to update business status', loading: false });
    }
  }
}));
