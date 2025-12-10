import React from 'react';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { MapPin, Phone, Star, Search, Filter, ShoppingBag } from 'lucide-react';
import { Input } from '../../shared/components/ui/Input';
import { MOCK_BUSINESSES } from '../../lib/mockData';
import { Badge } from '../../shared/components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const CommercePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

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
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2">
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
            className="bg-muted/50 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <Button variant="ghost" size="icon" className="shrink-0">
               <Filter className="h-5 w-5 text-muted-foreground" />
           </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            <Badge
                variant={selectedCategory === null ? 'active' : 'secondary'}
                className="whitespace-nowrap cursor-pointer"
                onClick={() => setSelectedCategory(null)}
            >
                Todos
            </Badge>
            {categories.map((cat) => (
                <Badge
                    key={cat}
                    variant={selectedCategory === cat ? 'active' : 'secondary'}
                    className="whitespace-nowrap cursor-pointer capitalize"
                    onClick={() => setSelectedCategory(cat)}
                >
                    {cat}
                </Badge>
            ))}
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {filteredBusinesses.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Nenhum comércio encontrado.</p>
            </div>
        ) : (
            filteredBusinesses.map((business) => (
            <Card key={business.id} className="overflow-hidden border-none shadow-sm bg-card">
                <div className="flex">
                    {/* Left: Image */}
                    <div className="w-1/3 bg-muted relative">
                        <img
                           src={business.imageUrl || 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=200'}
                           alt={business.name}
                           className="h-full w-full object-cover absolute inset-0"
                        />
                    </div>
                    {/* Right: Content */}
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-base leading-tight line-clamp-1">{business.name}</h3>
                            </div>
                             <span className="text-xs text-primary font-bold uppercase mb-2 block">{business.category}</span>

                            <div className="flex flex-col gap-1 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center gap-1 line-clamp-1">
                                    <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                                    <span>{business.address}, {business.bairro}</span>
                                </div>
                                {business.delivery && (
                                     <div className="flex items-center gap-1 text-blue-600 font-medium">
                                        <ShoppingBag className="h-3 w-3 shrink-0" />
                                        <span>Faz entregas</span>
                                     </div>
                                )}
                            </div>
                         </div>

                        <div className="flex gap-2 mt-2">
                            {business.whatsapp && (
                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-8 text-xs px-0"
                                    onClick={() => window.open(`https://wa.me/${business.whatsapp}`, '_blank')}
                                >
                                    WhatsApp
                                </Button>
                            )}
                            <Button variant="outline" className="flex-1 h-8 text-xs px-0 text-blue-600 border-blue-200 hover:bg-blue-50">
                                Ver Detalhes
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
            ))
        )}
      </div>
    </div>
  );
};
