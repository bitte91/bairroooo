import React from 'react';
import { Badge } from '../../shared/components/ui/Badge';
import { Card } from '../../shared/components/ui/Card';
import { Input } from '../../shared/components/ui/Input';
import { Search, Filter, Share2 } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import { MOCK_NEWS } from '../../lib/mockData';
import { NewsCardSkeleton } from '../../shared/components/ui/Skeleton';
import { EmptyState } from '../../shared/components/ui/EmptyState';
import { Newspaper } from 'lucide-react';

const CATEGORIES = ["Todas", "Eventos", "Segurança", "Melhorias", "Local"];

export const NewsFeed: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState(0);

    // Simular carregamento inicial
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredNews = MOCK_NEWS.filter(item => {
        const matchesSearch = searchTerm === '' ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-background z-10 px-4 py-3 border-b border-border shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-xl font-bold font-serif text-foreground">Notícias do Bairro</h1>
                        <p className="text-xs text-muted-foreground">Conecta Vila | Vila São José, Taubaté - SP</p>
                    </div>
                </div>

                <div className="flex gap-2 mb-3">
                    <Input
                        placeholder="Buscar notícias..."
                        aria-label="Buscar notícias"
                        leftIcon={<Search className="h-4 w-4" />}
                        className="bg-muted/50 border-none transition-shadow focus-within:shadow-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="shrink-0 transition-transform active:scale-95"
                        aria-label="Filtrar notícias"
                    >
                        <Filter className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
                    {CATEGORIES.map((cat, i) => (
                        <Badge
                            key={cat}
                            variant={i === selectedCategory ? 'active' : 'secondary'}
                            className="whitespace-nowrap cursor-pointer transition-all active:scale-95"
                            onClick={() => setSelectedCategory(i)}
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Feed */}
            <div className="p-4 space-y-4">
                {isLoading ? (
                    // Skeleton Loading State
                    <>
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                    </>
                ) : filteredNews.length === 0 ? (
                    // Empty State
                    <EmptyState
                        icon={Newspaper}
                        title="Nenhuma notícia encontrada"
                        description="Não encontramos notícias com esse termo. Tente buscar por algo diferente."
                        actionLabel="Limpar Busca"
                        onAction={() => setSearchTerm('')}
                    />
                ) : (
                    filteredNews.map((item) => (
                        <Card 
                            key={item.id} 
                            className="overflow-hidden flex flex-col border-none shadow-sm bg-card transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
                        >
                            <div className="h-40 w-full relative overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1 leading-tight">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    Fonte: {item.source}
                                </p>
                                <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <span>{item.time}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 -mr-2 transition-transform active:scale-95"
                                        aria-label="Compartilhar notícia"
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
