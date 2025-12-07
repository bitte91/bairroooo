import React, { useState } from 'react';
import { useServices } from '../hooks/useServices';
import { ServiceCard } from './ServiceCard';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { Search, Filter, Loader2 } from 'lucide-react';
import { BusinessCategory, ServiceProviderType } from '../../../shared/types';

// Union type for all categories
type Category = BusinessCategory | ServiceProviderType | 'todos';

export const ServiceList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('todos');

    // We can debounce search term here with a hook, but for now direct state is fine
    const { data: services, isLoading } = useServices(selectedCategory, searchTerm);

    const categories: {id: Category, label: string}[] = [
        { id: 'todos', label: 'Todos' },
        { id: 'mercado', label: 'Mercados' },
        { id: 'padaria', label: 'Padarias' },
        { id: 'farmacia', label: 'Farmácias' },
        { id: 'diarista', label: 'Diaristas' },
        { id: 'eletricista', label: 'Eletricistas' },
        { id: 'aulaparticular', label: 'Aulas' },
        { id: 'pet', label: 'Pet' },
    ];

    return (
        <div className="space-y-6 pb-20">
            <div className="sticky top-0 z-30 bg-white dark:bg-slate-950 pb-4 pt-2 -mt-2">
                 <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Buscar serviços, lojas..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`
                                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border
                                ${selectedCategory === cat.id
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}
                            `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services?.map((service) => (
                         // @ts-ignore - Union type complexity with service
                        <ServiceCard key={service.id} service={service} />
                    ))}
                    {services?.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            Nenhum serviço encontrado.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
