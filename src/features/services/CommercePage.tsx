import React from 'react';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { MapPin, Phone, Star, Search, Filter, ShoppingBag, Clock, Sparkles, Megaphone, Heart } from 'lucide-react';
import { Input } from '../../shared/components/ui/Input';
import { MOCK_BUSINESSES, MOCK_SERVICE_PROVIDERS } from '../../lib/mockData';
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
  const [showOnlyOpen, setShowOnlyOpen] = React.useState(false);

  // Simular carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = Array.from(new Set(MOCK_BUSINESSES.map(b => b.category)));

  const featuredBusinesses = MOCK_BUSINESSES.filter((b) => b.featured);
  const recommendedProviders = MOCK_SERVICE_PROVIDERS
    .filter((p) => p.isRecommendedByNeighbors || p.isSolidary)
    .slice(0, 3);

  const filteredBusinesses = MOCK_BUSINESSES.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? b.category === selectedCategory : true;
    const matchesOpen = showOnlyOpen ? isBusinessOpen(b.openingHours) : true;
    return matchesSearch && matchesCategory && matchesOpen;
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
            aria-label="Voltar"
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
            helperText="Dica: Tente buscar por 'Pizza', 'Farmácia' ou 'Mercado'"
            leftIcon={<Search className="h-4 w-4" />}
            className="bg-muted/50 border-none transition-shadow focus-within:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <Button
             variant="ghost"
             size="icon"
             className={cn(
              "shrink-0 transition-transform active:scale-95",
              showOnlyOpen ? 'text-primary' : 'text-muted-foreground'
             )}
             onClick={() => setShowOnlyOpen((prev) => !prev)}
             aria-label="Filtrar por abertos"
           >
               <Filter className="h-5 w-5" />
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

      {/* CTA para comerciantes e autônomos */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden border-none shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-start gap-3 md:col-span-2">
              <Sparkles className="h-10 w-10" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold">Visibilidade imediata</p>
                <h2 className="text-2xl font-bold mt-1">Divulgue seu negócio ou serviço no bairro</h2>
                <p className="text-sm text-emerald-50 mt-2">
                  Cadastre sua loja, coloque seu WhatsApp e apareça para os vizinhos que estão buscando soluções locais.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <Button
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold"
                onClick={() => window.open('https://wa.me/5511999999999?text=Quero%20cadastrar%20meu%20neg%C3%B3cio%20no%20app%20do%20bairro', '_blank')}
              >
                Quero cadastrar meu negócio
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => window.open('https://wa.me/5511999999999?text=Sou%20aut%C3%B4nomo%20e%20quero%20oferecer%20meus%20servi%C3%A7os', '_blank')}
              >
                Sou autônomo e quero oferecer serviços
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Destaques */}
      {featuredBusinesses.length > 0 && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="font-serif font-bold text-lg">Escolhas dos Vizinhos</h2>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
              Destaque
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {featuredBusinesses.map((business) => (
              <Card
                key={business.id}
                className="flex gap-3 items-center border border-amber-100 bg-amber-50/60"
              >
                <div className="h-20 w-24 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={business.imageUrl || 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600'}
                    alt={business.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="uppercase text-[10px] tracking-wide">
                      {business.category}
                    </Badge>
                    {business.isVerified && (
                      <span className="text-[11px] font-semibold text-emerald-700">✓ Verificado</span>
                    )}
                  </div>
                  <h3 className="font-semibold leading-tight">{business.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{business.promoMessage || business.description}</p>
                  {business.highlights && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {business.highlights.slice(0, 3).map((highlight) => (
                        <Badge key={highlight} variant="outline" className="text-[11px]">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

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

                  {business.promoMessage && (
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-2 rounded-lg mb-3">
                      <Megaphone className="h-4 w-4" />
                      <span>{business.promoMessage}</span>
                    </div>
                  )}

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

      {/* Autônomos em destaque */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            <h2 className="font-serif font-bold text-lg">Autônomos recomendados</h2>
          </div>
          <Badge variant="secondary">Indicação dos vizinhos</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendedProviders.map((provider) => (
            <Card key={provider.id} className="border border-rose-100 bg-rose-50/40">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2 capitalize">{provider.serviceType}</Badge>
                    <h3 className="font-semibold text-lg leading-tight">{provider.name}</h3>
                    {provider.headline && (
                      <p className="text-sm text-muted-foreground mt-1">{provider.headline}</p>
                    )}
                  </div>
                  {provider.rating && (
                    <div className="flex items-center gap-1 text-amber-600 font-semibold bg-white px-2 py-1 rounded-full shadow-sm">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span>{provider.rating}</span>
                      {provider.reviewsCount && (
                        <span className="text-xs text-muted-foreground">({provider.reviewsCount})</span>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{provider.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">Atende {provider.bairro}</Badge>
                  {provider.radiusKm && <Badge variant="outline">Até {provider.radiusKm} km</Badge>}
                  {provider.isSolidary && <Badge variant="outline">Serviço solidário</Badge>}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" variant="secondary" onClick={() => window.open(`https://wa.me/${provider.whatsapp}`, '_blank')}>
                    <Phone className="h-4 w-4 mr-2" />
                    Chamar no WhatsApp
                  </Button>
                  {provider.isRecommendedByNeighbors && (
                    <Badge className="bg-emerald-600 text-white">Top bairro</Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
