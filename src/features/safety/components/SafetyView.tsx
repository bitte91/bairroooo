import React from 'react';
import { Button } from '../../../shared/components/ui/Button';
import { AlertTriangle, PhoneCall, Shield, Users } from 'lucide-react';
import { SafetyAlert } from '../../../shared/types';
import { MOCK_SAFETY_ALERTS } from '../../../lib/mockData';

export const SafetyView: React.FC = () => {
    // We would use a useQuery hook here normally
    const alerts = MOCK_SAFETY_ALERTS;

    return (
        <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-6 h-6 text-red-600 dark:text-red-500" />
                    <h2 className="text-lg font-bold text-red-800 dark:text-red-400">Botão de Pânico</h2>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Use apenas em caso de emergência real. Isso enviará sua localização para contatos de confiança e autoridades.
                </p>
                <Button variant="danger" className="w-full font-bold">
                    ACIONAR EMERGÊNCIA
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                    <PhoneCall className="w-6 h-6 text-slate-600" />
                    <span>Polícia (190)</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                    <PhoneCall className="w-6 h-6 text-slate-600" />
                    <span>Bombeiros (193)</span>
                </Button>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                    Alertas Recentes
                </h3>
                <div className="space-y-3">
                    {alerts.map(alert => (
                        <div key={alert.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border-l-4 border-amber-500">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-slate-800 dark:text-slate-100">{alert.title}</h4>
                                <span className="text-xs text-slate-400">{new Date(alert.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                             </div>
                             <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{alert.description}</p>
                             <div className="flex items-center justify-between text-xs text-slate-500">
                                 <span>{alert.street}</span>
                                 <span className={`px-2 py-0.5 rounded ${
                                     alert.urgency === 'alta' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                 }`}>
                                     {alert.urgency.toUpperCase()}
                                 </span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-300">Vizinhança Solidária</h3>
                </div>
                <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-3">
                    Faça parte do grupo de proteção do seu bairro. Juntos somos mais fortes!
                </p>
                <Button variant="secondary" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Entrar no Grupo
                </Button>
            </div>
        </div>
    );
};
