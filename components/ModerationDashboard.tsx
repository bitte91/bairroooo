import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Shield, Trash2, CheckCircle, Flag, X } from 'lucide-react';

export const ModerationDashboard = () => {
    const { reports, dismissReport, posts, messages } = useApp();

    const getReportedItem = (report: any) => {
        if (report.itemType === 'post') {
            const post = posts.find(p => p.id === report.itemId);
            return post ? `Post: ${post.title}` : 'Post não encontrado';
        }
        if (report.itemType === 'message') {
            const msg = messages.find(m => m.id === report.itemId);
            return msg ? `Mensagem: ${msg.text.substring(0, 30)}...` : 'Mensagem não encontrada';
        }
        return `Item ID: ${report.itemId}`;
    };

    if (reports.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Shield size={64} className="mb-4 opacity-20" />
                <p className="text-lg">Nenhuma denúncia pendente.</p>
                <p className="text-sm">A comunidade está segura!</p>
            </div>
        );
    }

    return (
        <section className="animate-fadeIn pb-20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Shield className="text-red-500" /> Painel de Moderação
            </h2>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
                                <th className="p-4 text-xs font-bold uppercase text-gray-500">Tipo</th>
                                <th className="p-4 text-xs font-bold uppercase text-gray-500">Item Reportado</th>
                                <th className="p-4 text-xs font-bold uppercase text-gray-500">Motivo</th>
                                <th className="p-4 text-xs font-bold uppercase text-gray-500">Denunciado por</th>
                                <th className="p-4 text-xs font-bold uppercase text-gray-500 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report.id} className="border-b border-gray-50 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                    <td className="p-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                                            report.itemType === 'post' ? 'bg-blue-100 text-blue-600' :
                                            report.itemType === 'message' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {report.itemType}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-gray-800 dark:text-white">
                                        {getReportedItem(report)}
                                    </td>
                                    <td className="p-4 text-sm text-red-500 font-medium">
                                        {report.reason}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {report.reportedBy}
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <button
                                            onClick={() => dismissReport(report.id)}
                                            className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                            title="Ignorar Denúncia"
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Remover Item (Mock)"
                                            onClick={() => alert("Funcionalidade de remover item seria implementada aqui (requer backend real).")}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
