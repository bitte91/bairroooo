import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ServiceProvider, ServiceProviderType } from '../../types';
import { Star, MapPin, MessageCircle, Heart, Award } from 'lucide-react';
import { Card } from '../ui/Card';

const SERVICE_TYPES: { id: ServiceProviderType; label: string }[] = [
  { id: 'diarista', label: 'Diaristas' },
  { id: 'eletricista', label: 'Eletricistas' },
  { id: 'encanador', label: 'Encanadores' },
  { id: 'aulaparticular', label: 'Aulas Particulares' },
  { id: 'cuidado_idosos', label: 'Cuidadores' },
  { id: 'passeador_pets', label: 'Pet Sitters' },
  { id: 'chaveiro', label: 'Chaveiros' },
  { id: 'outros', label: 'Outros' },
];

export const ServiceProvidersView: React.FC = () => {
  const { serviceProviders, favorites, addFavorite, removeFavorite, isFavorite } = useApp();
  const [selectedType, setSelectedType] = useState<ServiceProviderType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = serviceProviders.filter(p => {
    const matchesType = selectedType === 'all' || p.serviceType === selectedType;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.bairro.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleFavoriteToggle = (e: React.MouseEvent, provider: ServiceProvider) => {
    e.stopPropagation();
    if (isFavorite(provider.id)) {
      removeFavorite(provider.id);
    } else {
      addFavorite({
        id: Date.now().toString(),
        userId: 'current',
        itemId: provider.id,
        itemType: 'service',
        title: provider.name,
        createdAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold font-serif text-slate-800 dark:text-white mb-2">Profissionais do Bairro</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">Autônomos de confiança recomendados pela comunidade.</p>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar profissional ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            Todos
          </button>
          {SERVICE_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProviders.map(provider => (
          <Card key={provider.id}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-500 dark:text-slate-400">
                  {provider.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {provider.name}
                    {provider.isRecommendedByNeighbors && (
                        <Award size={16} className="text-orange-500" title="Recomendado pela Vizinhança" />
                    )}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                     <span className="uppercase font-semibold tracking-wide">{SERVICE_TYPES.find(t => t.id === provider.serviceType)?.label || provider.serviceType}</span>
                     <span>•</span>
                     <div className="flex items-center gap-1 text-amber-500">
                        <Star size={12} fill="currentColor" />
                        <span className="font-bold">{provider.rating}</span>
                        <span className="text-slate-400">({provider.reviewsCount})</span>
                     </div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => handleFavoriteToggle(e, provider)}
                className={`p-2 rounded-full ${isFavorite(provider.id) ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                <Heart size={20} fill={isFavorite(provider.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{provider.description}</p>

            {provider.isSolidary && (
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
                 <Heart size={12} className="text-blue-500" />
                 <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Participa de ações solidárias</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-700">
               <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin size={16} />
                  <span>{provider.bairro}</span>
                  {provider.radiusKm && <span className="text-xs">(atende +{provider.radiusKm}km)</span>}
               </div>

               {provider.whatsapp && (
                 <a
                   href={`https://wa.me/${provider.whatsapp}?text=Olá, vi seu perfil no Bairroooo!`}
                   target="_blank"
                   rel="noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-colors"
                 >
                   <MessageCircle size={16} />
                   Negociar Zap
                 </a>
               )}
            </div>
          </Card>
        ))}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Nenhum profissional encontrado.
          </div>
        )}
      </div>
    </div>
  );
};
