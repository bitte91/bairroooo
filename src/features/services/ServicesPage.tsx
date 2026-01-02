import React from 'react';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { MapPin, Phone, Star, Search, Filter, Briefcase } from 'lucide-react';
import { Input } from '../../shared/components/ui/Input';
import { MOCK_SERVICE_PROVIDERS } from '../../lib/mockData';
import { Badge } from '../../shared/components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const serviceTypes = Array.from(new Set(MOCK_SERVICE_PROVIDERS.map(s => s.serviceType)));

  const filteredServices = MOCK_SERVICE_PROVIDERS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? s.serviceType === selectedType : true;
    return matchesSearch && matchesType;
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
            <h1 className="text-xl font-bold font-serif text-foreground">Serviços</h1>
            <p className="text-xs text-muted-foreground">Profissionais de confiança perto de você</p>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Buscar eletricista, aulas..."
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
                variant={selectedType === null ? 'active' : 'secondary'}
                className="whitespace-nowrap cursor-pointer"
                onClick={() => setSelectedType(null)}
                aria-pressed={selectedType === null}
            >
                Todos
            </Badge>
            {serviceTypes.map((type) => (
                <Badge
                    key={type}
                    variant={selectedType === type ? 'active' : 'secondary'}
                    className="whitespace-nowrap cursor-pointer capitalize"
                    onClick={() => setSelectedType(type)}
                    aria-pressed={selectedType === type}
                >
                    {type}
                </Badge>
            ))}
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {filteredServices.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Nenhum serviço encontrado.</p>
            </div>
        ) : (
            filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden border-none shadow-sm bg-card">
                <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                         <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold overflow-hidden border-2 border-white shadow-sm">
                             {/* Placeholder for avatar if available, or initials */}
                             {service.name.substring(0,2).toUpperCase()}
                         </div>
                        <div>
                            <h3 className="font-bold text-base leading-tight">{service.name}</h3>
                            <span className="text-xs text-primary font-medium uppercase">{service.serviceType}</span>
                        </div>
                    </div>
                    {service.rating && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full text-yellow-700 text-xs font-bold">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {service.rating}
                        </div>
                    )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 bg-muted/30 p-2 rounded-lg italic">"{service.description}"</p>

                <div className="flex gap-2 mt-2">
                    {service.whatsapp && (
                        <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9"
                            onClick={() => window.open(`https://wa.me/${service.whatsapp}`, '_blank')}
                        >
                            <Phone className="h-4 w-4 mr-2" />
                            WhatsApp
                        </Button>
                    )}
                    <Button variant="outline" className="flex-1 h-9 text-blue-600 border-blue-200 hover:bg-blue-50">
                        Ver Perfil
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
