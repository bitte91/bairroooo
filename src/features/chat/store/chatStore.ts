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
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: {},
  setActiveConversation: (id) => set({ activeConversationId: id }),
  addMessage: (conversationId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [conversationId]: [...(state.messages[conversationId] || []), message]
    }
  }))
}));
