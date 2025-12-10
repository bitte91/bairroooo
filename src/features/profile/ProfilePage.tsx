import React from 'react';
import { Button } from '../../shared/components/ui/Button';
import { Card } from '../../shared/components/ui/Card';
import { Settings, Newspaper, Calendar, Lightbulb, ChevronRight, LogOut, ArrowLeft, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../../shared/components/ui/ThemeToggle';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pb-24 bg-muted/20 min-h-screen">
             {/* Header */}
             <div className="bg-background px-4 py-3 flex justify-between items-center shadow-sm">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-bold">Perfil do Usuário</h1>
                <Button variant="ghost" size="icon" className="-mr-2">
                    <Settings className="h-6 w-6 text-muted-foreground" />
                </Button>
             </div>

             {/* User Info */}
             <div className="flex flex-col items-center py-8 bg-background mb-4">
                 <div className="h-24 w-24 rounded-full bg-emerald-100 mb-3 overflow-hidden border-4 border-white shadow-sm">
                     <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="h-full w-full object-cover" />
                 </div>
                 <h2 className="text-xl font-bold text-foreground">Ana Souza</h2>
                 <p className="text-sm text-muted-foreground">Moradora da Vila São José há 10 anos.</p>
             </div>

             {/* Stats Grid */}
             <div className="px-4 mb-6">
                 <h3 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Minhas Contribuições</h3>
                 <div className="grid grid-cols-3 gap-3">
                     <Card className="flex flex-col items-center justify-center p-3 py-4 bg-background border-none shadow-sm">
                         <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                             <Newspaper className="h-5 w-5" />
                         </div>
                         <span className="text-lg font-bold">12</span>
                         <span className="text-[10px] text-muted-foreground text-center leading-tight">Postagens Recentes</span>
                     </Card>
                     <Card className="flex flex-col items-center justify-center p-3 py-4 bg-background border-none shadow-sm">
                         <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                             <Calendar className="h-5 w-5" />
                         </div>
                         <span className="text-lg font-bold">3</span>
                         <span className="text-[10px] text-muted-foreground text-center leading-tight">Eventos Organizados</span>
                     </Card>
                     <Card className="flex flex-col items-center justify-center p-3 py-4 bg-background border-none shadow-sm">
                         <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-2">
                             <Lightbulb className="h-5 w-5" />
                         </div>
                         <span className="text-lg font-bold">5</span>
                         <span className="text-[10px] text-muted-foreground text-center leading-tight">Sugestões Enviadas</span>
                     </Card>
                 </div>
             </div>

             {/* Settings List */}
             <div className="px-4">
                <h3 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Configurações da Conta</h3>
                <div className="bg-background rounded-xl overflow-hidden shadow-sm">
                    {[
                        { label: "Editar Perfil", icon: null },
                        { label: "Privacidade e Segurança", icon: null },
                        { label: "Notificações", icon: null },
                    ].map((item, i) => (
                        <div key={item.label} className="flex items-center justify-between p-4 border-b border-muted active:bg-muted/50 cursor-pointer">
                            <span className="text-sm font-medium">{item.label}</span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                    ))}
                    <div className="flex items-center justify-between p-4 active:bg-muted/50 cursor-pointer">
                         <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Modo Escuro</span>
                         </div>
                         <ThemeToggle />
                    </div>
                </div>

                <Button variant="ghost" className="w-full mt-6 text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                </Button>
             </div>
        </div>
    );
};
