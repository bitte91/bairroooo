import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Business, BusinessCategory } from '../../types';
import { MapPin, Phone, Instagram, Clock, CreditCard, CheckCircle, Shield } from 'lucide-react';

const CATEGORIES: { id: BusinessCategory; label: string; icon: string }[] = [
  { id: 'mercado', label: 'Mercados', icon: '🛒' },
  { id: 'padaria', label: 'Padarias', icon: '🥖' },
  { id: 'restaurante', label: 'Restaurantes', icon: '🍽️' },
  { id: 'farmacia', label: 'Farmácias', icon: '💊' },
  { id: 'pet', label: 'Pet Shop', icon: '🐾' },
  { id: 'servico', label: 'Serviços', icon: '🔧' },
  { id: 'outros', label: 'Outros', icon: '🏪' },
];

export const BusinessDirectoryView: React.FC = () => {
  const { businesses } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const filteredBusinesses = businesses.filter(b => {
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold font-serif text-slate-800 dark:text-white mb-2">Comércio Local</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">Encontre o que você precisa pertinho de casa.</p>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBusinesses.map(business => (
          <div
            key={business.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedBusiness(business)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{business.name}</h3>
                {business.isVerified && <CheckCircle size={16} className="text-blue-500 mt-1" />}
                {business.isSafetyPartner && (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900" title="Ponto de Apoio da Vizinhança">
                    <Shield size={12} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 uppercase">
                {business.category}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">{business.description}</p>

            <div className="flex flex-col gap-1 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{business.address}</span>
              </div>
              {business.openingHours && (
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{business.openingHours}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredBusinesses.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
            Nenhum comércio encontrado com esses filtros.
          </div>
        )}
      </div>

      {/* Detail Modal (Simple inline implementation for now) */}
      {selectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedBusiness(null)}>
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {selectedBusiness.name}
                    {selectedBusiness.isVerified && <CheckCircle size={20} className="text-blue-500" />}
                  </h2>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{selectedBusiness.bairro}</span>
               </div>
               <button onClick={() => setSelectedBusiness(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">✕</button>
            </div>

            {selectedBusiness.isSafetyPartner && (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-lg flex items-center gap-3">
                <Shield className="text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Ponto de Apoio da Vizinhança</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">Este local colabora com a segurança do bairro.</p>
                </div>
              </div>
            )}

            <p className="text-slate-700 dark:text-slate-300 mb-6">{selectedBusiness.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <MapPin size={18} className="text-teal-600" />
                <span>{selectedBusiness.address}</span>
              </div>
              {selectedBusiness.openingHours && (
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Clock size={18} className="text-teal-600" />
                  <span>{selectedBusiness.openingHours}</span>
                </div>
              )}
              {selectedBusiness.paymentMethods && (
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <CreditCard size={18} className="text-teal-600" />
                  <span>{selectedBusiness.paymentMethods.join(', ')}</span>
                </div>
              )}
            </div>

            {selectedBusiness.highlights && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-slate-800 dark:text-white">Destaques</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBusiness.highlights.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {selectedBusiness.whatsapp && (
                <a
                  href={`https://wa.me/${selectedBusiness.whatsapp}?text=Olá, vi seu comércio no Bairroooo!`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-colors"
                >
                  <Phone size={18} />
                  WhatsApp
                </a>
              )}
              {selectedBusiness.instagram && (
                <a
                  href={`https://instagram.com/${selectedBusiness.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
