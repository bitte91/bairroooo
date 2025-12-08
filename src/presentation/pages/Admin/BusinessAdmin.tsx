import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessStore } from '../../../application/stores/useBusinessStore';
import { BusinessStatus } from '../../../domain/types';
import { Check, X, Filter, ArrowLeft } from 'lucide-react';

const BusinessAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { businesses, fetchAll, updateStatus, loading } = useBusinessStore();
  const [statusFilter, setStatusFilter] = useState<BusinessStatus | 'all'>('pending');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filtered = businesses.filter(b =>
    statusFilter === 'all' ? true : b.status === statusFilter
  );

  const handleStatusChange = async (id: string, status: BusinessStatus) => {
    setProcessingId(id);
    try {
      await updateStatus(id, status);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/comercios')} className="p-1 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Admin · Comércios</h1>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <Filter className="w-4 h-4 text-gray-500 ml-2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 w-full"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendentes</option>
            <option value="approved">Aprovados</option>
            <option value="rejected">Rejeitados</option>
          </select>
        </div>
      </header>

      <main className="p-4">
        {loading && !processingId ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhum comércio encontrado com este status.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                  <tr>
                    <th className="p-4">Comércio</th>
                    <th className="p-4 hidden sm:table-cell">Categoria</th>
                    <th className="p-4 hidden md:table-cell">Contato</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{b.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{b.address}</div>
                        <div className="sm:hidden text-xs text-gray-400 mt-1">{b.category}</div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium capitalize">
                            {b.category}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell text-gray-600">{b.phone}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize inline-flex items-center gap-1
                          ${b.status === 'approved' ? 'bg-green-100 text-green-700' :
                            b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'}`}
                        >
                          {b.status === 'approved' && <Check className="w-3 h-3" />}
                          {b.status === 'rejected' && <X className="w-3 h-3" />}
                          {b.status === 'pending' && <span className="w-2 h-2 bg-yellow-400 rounded-full" />}
                          {b.status === 'pending' ? 'Pendente' :
                           b.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          {b.status !== 'approved' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'approved')}
                              disabled={processingId === b.id}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Aprovar"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          {b.status !== 'rejected' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'rejected')}
                              disabled={processingId === b.id}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Rejeitar"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BusinessAdmin;
