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
                <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg leading-tight">{business.name}</h3>
                        <span className="text-xs text-muted-foreground capitalize">{business.category}</span>
                    </div>
                    {business.isVerified && (
                        <Badge variant="active" className="text-[10px] px-1.5 py-0.5 h-auto">Verificado</Badge>
                    )}
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{business.description}</p>

                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        <span>{business.address}, {business.bairro}</span>
                    </div>
                    {business.openingHours && (
                        <div className="flex items-center gap-1.5">
                            <span className="font-medium text-foreground">Aberto:</span> {business.openingHours}
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    {business.whatsapp && (
                        <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9"
                            onClick={() => window.open(`https://wa.me/${business.whatsapp}`, '_blank')}
                        >
                            <Phone className="h-4 w-4 mr-2" />
                            WhatsApp
                        </Button>
                    )}
                    <Button variant="outline" className="flex-1 h-9">
                        Ver Detalhes
                    </Button>
                </div>
                </div>
                {business.delivery && (
                    <div className="bg-blue-50 px-4 py-1.5 border-t border-blue-100">
                        <p className="text-[10px] text-blue-700 font-medium flex items-center justify-center gap-1">
                            <ShoppingBag className="h-3 w-3" /> Faz entregas
                        </p>
                    </div>
                )}
            </Card>
            ))
        )}
      </div>
    </div>
  );
};
