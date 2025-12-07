import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { SafetyAlert, NeighborGroup, AlertCategory } from '../../types';
import { Shield, AlertTriangle, Users, MapPin, Eye, Clock, PlusCircle } from 'lucide-react';

const ALERT_CATEGORIES: { id: AlertCategory; label: string; color: string }[] = [
  { id: 'seguranca', label: 'Segurança', color: 'bg-red-100 text-red-700' },
  { id: 'pet', label: 'Pet Perdido', color: 'bg-orange-100 text-orange-700' },
  { id: 'ajuda', label: 'Pedido de Ajuda', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'objeto_perdido', label: 'Objeto Perdido', color: 'bg-blue-100 text-blue-700' },
  { id: 'informativo', label: 'Informativo', color: 'bg-slate-100 text-slate-700' },
];

export const SafetyAndSolidarityView: React.FC = () => {
  const { safetyAlerts, neighborGroups, addSafetyAlert, currentUser, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'alerts' | 'group'>('alerts');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create Form State
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertDesc, setNewAlertDesc] = useState('');
  const [newAlertCategory, setNewAlertCategory] = useState<AlertCategory>('seguranca');
  const [newAlertUrgency, setNewAlertUrgency] = useState<'baixa' | 'media' | 'alta'>('media');

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
       addToast("Faça login para postar um alerta.", "error");
       return;
    }
    const alert: SafetyAlert = {
        id: Date.now().toString(),
        title: newAlertTitle,
        description: newAlertDesc,
        category: newAlertCategory,
        urgency: newAlertUrgency,
        createdAt: new Date().toISOString(),
        createdBy: currentUser
    };
    addSafetyAlert(alert);
    addToast("Alerta criado com sucesso!", "success");
    setShowCreateModal(false);
    setNewAlertTitle('');
    setNewAlertDesc('');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
           <div>
              <h2 className="text-2xl font-bold font-serif mb-2">Vizinhança Solidária</h2>
              <p className="text-indigo-100 text-sm max-w-sm">Juntos somos mais fortes. Mantenha o bairro seguro e ajude seus vizinhos.</p>
           </div>
           <Shield size={48} className="text-indigo-300 opacity-50" />
        </div>

        <div className="flex gap-4 mt-6">
           <button
             onClick={() => setActiveTab('alerts')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'alerts' ? 'bg-white text-indigo-600 shadow-md' : 'bg-indigo-700/50 hover:bg-indigo-700 text-white'}`}
           >
             Alertas Recentes
           </button>
           <button
             onClick={() => setActiveTab('group')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'group' ? 'bg-white text-indigo-600 shadow-md' : 'bg-indigo-700/50 hover:bg-indigo-700 text-white'}`}
           >
             Meu Grupo
           </button>
        </div>
      </div>

      {activeTab === 'group' && (
        <div className="space-y-6 animate-fadeIn">
           {neighborGroups.map(group => (
              <div key={group.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                          <Users size={24} className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{group.name}</h3>
                          <p className="text-sm text-slate-500">{group.membersCount} vizinhos ativos</p>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                             <Shield size={18} className="text-teal-500" />
                             Dicas de Segurança
                          </h4>
                          <ul className="space-y-2">
                              {group.safetyTips.map((tip, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                                      <span className="text-teal-500">•</span>
                                      {tip}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                             <AlertTriangle size={18} className="text-orange-500" />
                             Regras de Convivência
                          </h4>
                          <ul className="space-y-2">
                              {group.rules.map((rule, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                                      <span className="text-orange-500">•</span>
                                      {rule}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
           ))}
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-4 animate-fadeIn">
          <button
             onClick={() => setShowCreateModal(true)}
             className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
          >
             <PlusCircle size={20} />
             Emitir Alerta
          </button>

          {safetyAlerts.map(alert => {
            const cat = ALERT_CATEGORIES.find(c => c.id === alert.category);
            return (
              <div key={alert.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                {alert.urgency === 'alta' && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-bl-xl">
                        URGENTE
                    </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                   <div className={`p-2 rounded-lg ${cat?.color || 'bg-slate-100'}`}>
                      <AlertTriangle size={20} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">{alert.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <Clock size={12} />
                          <span>{new Date(alert.createdAt).toLocaleString()}</span>
                          <span>•</span>
                          <span className="font-medium">{alert.createdBy}</span>
                      </div>
                   </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{alert.description}</p>

                {alert.street && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                        <MapPin size={16} />
                        <span>{alert.street}</span>
                    </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}>
           <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
               <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Novo Alerta de Segurança</h3>

               <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6 text-sm text-blue-800 dark:text-blue-200">
                  <strong>Atenção:</strong> Descreva o ocorrido de forma objetiva. Evite compartilhar nomes completos ou acusar sem provas. O foco é a prevenção.
               </div>

               <form onSubmit={handleCreateAlert} className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Título</label>
                     <input
                       required
                       type="text"
                       className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                       placeholder="Ex: Movimentação estranha na Rua X"
                       value={newAlertTitle}
                       onChange={e => setNewAlertTitle(e.target.value)}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                     <select
                       className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                       value={newAlertCategory}
                       onChange={e => setNewAlertCategory(e.target.value as AlertCategory)}
                     >
                        {ALERT_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
                     <textarea
                       required
                       rows={3}
                       className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                       placeholder="Detalhes sobre o ocorrido, local exato, características..."
                       value={newAlertDesc}
                       onChange={e => setNewAlertDesc(e.target.value)}
                     />
                  </div>

                  <div className="flex gap-3 pt-2">
                     <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl">Cancelar</button>
                     <button type="submit" className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg">Publicar Alerta</button>
                  </div>
               </form>
           </div>
        </div>
      )}
    </div>
  );
};
