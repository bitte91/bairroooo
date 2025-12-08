import { Business, BusinessStatus } from '../../domain/types';
import { MOCK_BUSINESSES } from '../../lib/mockData';

class BusinessRepository {
  private businesses: Business[] = [];
  private readonly STORAGE_KEY = 'conecta-vila-businesses';

  constructor() {
    this.loadBusinesses();
  }

  private loadBusinesses() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.businesses = JSON.parse(stored);
      } else {
        this.businesses = [...MOCK_BUSINESSES];
        this.persist();
      }
    } catch (e) {
      console.error('Failed to load businesses from localStorage', e);
      this.businesses = [...MOCK_BUSINESSES];
    }
  }

  private persist() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.businesses));
    } catch (e) {
      console.error('Failed to persist businesses to localStorage', e);
    }
  }

  async getAll(): Promise<Business[]> {
    return Promise.resolve([...this.businesses]);
  }

  async getApproved(): Promise<Business[]> {
    return Promise.resolve(this.businesses.filter(b => b.status === 'approved'));
  }

  async add(business: Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Business> {
    const newBusiness: Business = {
      ...business,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.businesses.push(newBusiness);
    this.persist();
    return Promise.resolve(newBusiness);
  }

  async updateStatus(id: string, status: BusinessStatus): Promise<void> {
    const index = this.businesses.findIndex(b => b.id === id);
    if (index !== -1) {
      this.businesses[index] = {
        ...this.businesses[index],
        status,
        updatedAt: new Date().toISOString()
      };
      this.persist();
    }
    return Promise.resolve();
  }
}

export const businessRepository = new BusinessRepository();
