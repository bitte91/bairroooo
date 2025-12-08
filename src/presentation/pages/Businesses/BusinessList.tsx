import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessStore } from '../../../application/stores/useBusinessStore';
import { BusinessCategory } from '../../../domain/types';
import { MapPin, Phone, Clock, Store } from 'lucide-react';

const BusinessList: React.FC = () => {
  const navigate = useNavigate();
  const { approvedBusinesses, fetchApproved, loading } = useBusinessStore();
  const [category, setCategory] = useState<BusinessCategory | 'all'>('all');

  useEffect(() => {
    fetchApproved();
  }, [fetchApproved]);

  const filtered = approvedBusinesses.filter(
    b => category === 'all' || b.category === category
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Comércios do Bairro</h1>
            <button
              onClick={() => navigate('/comercios/novo')}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Cadastrar
            </button>
          </div>

          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2">
              <button
                onClick={() => setCategory('all')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {[
                { val: 'mercado', label: 'Mercados' },
                { val: 'padaria', label: 'Padarias' },
                { val: 'salao', label: 'Salões' },
                { val: 'farmacia', label: 'Farmácias' },
                { val: 'restaurante', label: 'Restaurantes' },
                { val: 'pet', label: 'Pet Shops' },
                { val: 'servico', label: 'Serviços' },
                { val: 'outros', label: 'Outros' },
              ].map((cat) => (
                <button
                  key={cat.val}
                  onClick={() => setCategory(cat.val as BusinessCategory)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    category === cat.val
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Store className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum comércio encontrado nesta categoria.</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(b => (
              <li key={b.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold text-lg text-gray-900">{b.name}</h2>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                    {b.category}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                    <span>{b.address}</span>
                  </div>

                  {b.openingHours && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                      <span>{b.openingHours}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                    <a href={`tel:${b.phone}`} className="text-primary-600 hover:underline font-medium">
                      {b.phone}
                    </a>
                  </div>

                  {b.description && (
                    <p className="mt-3 text-gray-500 line-clamp-2 text-sm border-t border-gray-50 pt-2">
                      {b.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default BusinessList;
