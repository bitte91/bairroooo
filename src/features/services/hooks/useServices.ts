import { Business, ServiceProviderType } from '../../../shared/types';
import { useQuery } from '@tanstack/react-query';

// Mock Data
import { MOCK_BUSINESSES, MOCK_SERVICE_PROVIDERS } from '../../../lib/mockData';

const MOCK_SERVICES = [...MOCK_BUSINESSES, ...MOCK_SERVICE_PROVIDERS.map(sp => ({
    ...sp,
    category: 'servico' as const, // Align types
    address: sp.bairro, // Mock address
    isVerified: sp.isRecommendedByNeighbors
}))];

// Simulate API call
const fetchServices = async (category?: string, searchTerm?: string): Promise<any[]> => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let results = MOCK_SERVICES;

    if (category && category !== 'todos') {
        results = results.filter(s => 'serviceType' in s ? s.serviceType === category : s.category === category);
    }

    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        results = results.filter(s =>
            s.name.toLowerCase().includes(lowerTerm) ||
            s.description.toLowerCase().includes(lowerTerm)
        );
    }

    return results;
};

export function useServices(category?: string, searchTerm?: string) {
    return useQuery({
        queryKey: ['services', category, searchTerm],
        queryFn: () => fetchServices(category, searchTerm)
    });
}
