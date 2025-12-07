import React from 'react';
import { Badge } from '../../shared/components/ui/Badge';
import { Card } from '../../shared/components/ui/Card';
import { Input } from '../../shared/components/ui/Input';
import { Search, Filter, Share2 } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import { MOCK_NEWS } from '../../lib/mockData';

const CATEGORIES = ["Todas", "Eventos", "Segurança", "Melhorias", "Local"];

export const NewsFeed: React.FC = () => {
    return (
        <div className="pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-background z-10 px-4 py-3 border-b border-border shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-xl font-bold font-serif text-foreground">Notícias do Bairro</h1>
                        <p className="text-xs text-muted-foreground">Conecta Vila | Vila São José, Taubaté - SP</p>
                    </div>
                    <div className="flex gap-2">
                         {/* Icons could go here if needed, but search/filter are below */}
                    </div>
                </div>

                <div className="flex gap-2 mb-3">
                    <Input
                        placeholder="Buscar notícias..."
                        leftIcon={<Search className="h-4 w-4" />}
                        className="bg-muted/50 border-none"
                    />
                    <Button variant="ghost" size="icon" className="shrink-0">
                        <Filter className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
                    {CATEGORIES.map((cat, i) => (
                        <Badge
                            key={cat}
                            variant={i === 0 ? 'active' : 'secondary'}
                            className="whitespace-nowrap cursor-pointer"
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Feed */}
            <div className="p-4 space-y-4">
                {MOCK_NEWS.map((item) => (
                    <Card key={item.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm bg-card">
                        <div className="h-40 w-full relative">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 leading-tight">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                Fonte: {item.source}
                            </p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>{item.time}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
