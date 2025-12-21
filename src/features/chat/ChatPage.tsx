import React from 'react';
import { useChatStore } from './store/chatStore';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { MessageSquare, User } from 'lucide-react';
import { ChatView } from './components/ChatView';

export const ChatPage: React.FC = () => {
    // Basic implementation for now, connecting to the store structure
    const { conversations, activeConversationId, setActiveConversation } = useChatStore();

    if (activeConversationId) {
        return <ChatView />;
    }

    return (
        <div className="pb-24 min-h-screen bg-muted/20 flex flex-col items-center p-4">
             {conversations.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                     <div className="bg-card p-6 rounded-full inline-flex mb-4 shadow-sm">
                        <MessageSquare className="h-12 w-12 text-primary/50" />
                     </div>
                     <h2 className="text-lg font-bold text-foreground">Sem conversas ainda</h2>
                     <p className="max-w-xs mx-auto mt-2 mb-6">Converse com vizinhos e comerciantes locais. Suas mensagens aparecerão aqui.</p>

                     {/* Demo button to trigger ChatView */}
                     <Button
                        onClick={() => setActiveConversation('demo-chat')}
                        variant="primary"
                     >
                        Iniciar Chat de Teste
                     </Button>
                 </div>
             ) : (
                 <div className="w-full space-y-2 mt-4">
                     {conversations.map((chat: any) => (
                         <Card
                            key={chat.id}
                            className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => setActiveConversation(chat.id)}
                        >
                             <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                                 <User className="h-5 w-5 text-muted-foreground" />
                             </div>
                             <div>
                                 <h3 className="font-bold">{chat.participantName}</h3>
                                 <p className="text-sm text-muted-foreground">Última mensagem...</p>
                             </div>
                         </Card>
                     ))}
                 </div>
             )}
        </div>
    );
};
