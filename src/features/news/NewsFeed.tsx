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
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [selectedSource, setSelectedSource] = React.useState<string>('Todas');
    const [sortOrder, setSortOrder] = React.useState<'recente' | 'alfabetica'>('recente');

    // Simular carregamento inicial
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const NEWS_CATEGORY_MAP: Record<number, string> = {
        1: 'Local',
        2: 'Melhorias',
        3: 'Eventos',
    };

    const sources = React.useMemo(() => ['Todas', ...Array.from(new Set(MOCK_NEWS.map(item => item.source)))], []);

    const filteredNews = MOCK_NEWS.filter(item => {
        const matchesSearch = searchTerm === '' ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 0 || NEWS_CATEGORY_MAP[item.id] === CATEGORIES[selectedCategory];
        const matchesSource = selectedSource === 'Todas' || item.source === selectedSource;
        return matchesSearch && matchesCategory && matchesSource;
    });

    const sortedNews = [...filteredNews].sort((a, b) => {
        if (sortOrder === 'alfabetica') {
            return a.title.localeCompare(b.title);
        }
        return b.id - a.id;
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
                        leftIcon={<Search className="h-4 w-4" />}
                        className="bg-muted/50 border-none transition-shadow focus-within:shadow-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 transition-transform active:scale-95"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                    >
                        <Filter className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>

                {isFilterOpen && (
                    <div className="mb-3 p-3 rounded-xl border border-border bg-muted/40 space-y-3">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Ordenar por</p>
                            <div className="flex gap-2">
                                {[
                                    { value: 'recente', label: 'Mais recentes' },
                                    { value: 'alfabetica', label: 'A-Z' },
                                ].map(option => (
                                    <Button
                                        key={option.value}
                                        variant={sortOrder === option.value ? 'default' : 'outline'}
                                        size="sm"
                                        className="text-xs"
                                        onClick={() => setSortOrder(option.value as 'recente' | 'alfabetica')}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Fonte</p>
                            <div className="flex gap-2 flex-wrap">
                                {sources.map((source) => (
                                    <Badge
                                        key={source}
                                        variant={selectedSource === source ? 'active' : 'secondary'}
                                        className="cursor-pointer"
                                        onClick={() => setSelectedSource(source)}
                                    >
                                        {source}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                    setSelectedSource('Todas');
                                    setSortOrder('recente');
                                    setSelectedCategory(0);
                                }}
                            >
                                Limpar filtros
                            </Button>
                        </div>
                    </div>
                )}

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
                ) : sortedNews.length === 0 ? (
                    // Empty State
                    <EmptyState
                        icon={Newspaper}
                        title="Nenhuma notícia encontrada"
                        description="Não encontramos notícias com esse termo. Tente buscar por algo diferente."
                        actionLabel="Limpar Busca"
                        onAction={() => setSearchTerm('')}
                    />
                ) : (
                    sortedNews.map((item) => (
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
