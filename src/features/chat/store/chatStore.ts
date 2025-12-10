import { create } from 'zustand';
import { Message } from '../../../shared/types';

export interface Conversation {
    id: string;
    participantName: string;
    lastMessage?: string;
    unreadCount?: number;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>; // conversationId -> messages

  setActiveConversation: (id: string | null) => void;
  addMessage: (conversationId: string, message: Message) => void;
  createConversation: (conversation: Conversation) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: {},
  setActiveConversation: (id) => set({ activeConversationId: id }),
  createConversation: (conversation) => set((state) => {
    if (state.conversations.some(c => c.id === conversation.id)) {
        return state;
    }
    return { conversations: [...state.conversations, conversation] };
  }),
  addMessage: (conversationId, message) => set((state) => {
    // Update messages map
    const newMessages = {
      ...state.messages,
      [conversationId]: [...(state.messages[conversationId] || []), message]
    };

    // Update conversation lastMessage
    const updatedConversations = state.conversations.map(c => {
        if (c.id === conversationId) {
            return {
                ...c,
                lastMessage: message.text,
                unreadCount: (c.unreadCount || 0) + 1 // Simple increment logic
            };
        }
        return c;
    });

    return {
      messages: newMessages,
      conversations: updatedConversations
    };
  })
}));
