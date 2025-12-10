import React from 'react';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { MapPin, Phone, Star, Search, Filter, ShoppingBag, Clock } from 'lucide-react';
import { Input } from '../../shared/components/ui/Input';
import { MOCK_BUSINESSES } from '../../lib/mockData';
import { Badge } from '../../shared/components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BusinessCardSkeleton } from '../../shared/components/ui/Skeleton';
import { EmptyState } from '../../shared/components/ui/EmptyState';
import { cn } from '../../lib/cn';

// Função auxiliar para verificar se está aberto
const isBusinessOpen = (openingHours?: string): boolean => {
  // Simplificação: considera aberto entre 8h e 22h
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 22;
};

export const CommercePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Simular carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = Array.from(new Set(MOCK_BUSINESSES.map(b => b.category)));

  const filteredBusinesses = MOCK_BUSINESSES.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? b.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 min-h-screen bg-muted/20">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-4 py-3 border-b border-border shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="-ml-2 transition-transform active:scale-95"
          >
             <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground">Comércio Local</h1>
            <p className="text-xs text-muted-foreground">Apoie os negócios do seu bairro</p>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Buscar lojas, produtos..."
            leftIcon={<Search className="h-4 w-4" />}
            className="bg-muted/50 border-none transition-shadow focus-within:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <Button 
             variant="ghost" 
             size="icon" 
             className="shrink-0 transition-transform active:scale-95"
           >
               <Filter className="h-5 w-5 text-muted-foreground" />
           </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            <Badge
                variant={selectedCategory === null ? 'active' : 'secondary'}
                className="whitespace-nowrap cursor-pointer transition-all active:scale-95"
                onClick={() => setSelectedCategory(null)}
            >
                Todos
            </Badge>
            {categories.map((cat) => (
                <Badge
                    key={cat}
                    variant={selectedCategory === cat ? 'active' : 'secondary'}
                    className="whitespace-nowrap cursor-pointer capitalize transition-all active:scale-95"
                    onClick={() => setSelectedCategory(cat)}
                >
                    {cat}
                </Badge>
            ))}
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {isLoading ? (
          // Skeleton Loading State
          <>
            <BusinessCardSkeleton />
            <BusinessCardSkeleton />
            <BusinessCardSkeleton />
          </>
        ) : filteredBusinesses.length === 0 ? (
          // Empty State
          <EmptyState
            icon={ShoppingBag}
            title="Nenhum comércio encontrado"
            description="Tente ajustar os filtros ou buscar por outro termo."
            actionLabel="Limpar Filtros"
            onAction={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
          />
        ) : (
          // Business Cards - Novo Layout Vertical
          filteredBusinesses.map((business) => {
            const isOpen = isBusinessOpen(business.openingHours);
            
            return (
              <Card 
                key={business.id} 
                className="overflow-hidden border-none shadow-sm bg-card transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  <img
                    src={business.imageUrl || 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600'}
                    alt={business.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm",
                      isOpen 
                        ? "bg-green-500/90 text-white" 
                        : "bg-gray-500/90 text-white"
                    )}>
                      {isOpen ? '● Aberto' : '● Fechado'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight">{business.name}</h3>
                    {business.isVerified && (
                      <div className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">
                        ✓ Verificado
                      </div>
                    )}
                  </div>
                  
                  <span className="text-xs text-primary font-bold uppercase mb-2 block">
                    {business.category}
                  </span>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {business.description}
                  </p>

                  <div className="flex flex-col gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="line-clamp-1">{business.address}, {business.bairro}</span>
                    </div>
                    
                    {business.openingHours && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className={cn(
                          "font-medium",
                          isOpen ? "text-green-600" : "text-gray-600"
                        )}>
                          {isOpen ? `Aberto até 22h` : 'Fechado'}
                        </span>
                      </div>
                    )}
                    
                    {business.delivery && (
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <ShoppingBag className="h-4 w-4 shrink-0" />
                        <span>Faz entregas</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 h-10 text-sm transition-all active:scale-95"
                    >
                      Ver Detalhes
                    </Button>
                    {business.whatsapp && (
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white h-10 text-sm transition-all active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://wa.me/${business.whatsapp}`, '_blank');
                        }}
                      >
                        WhatsApp
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
