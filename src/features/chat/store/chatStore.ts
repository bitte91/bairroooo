import { create } from 'zustand';
import { Message, User } from '../../../shared/types';

interface ChatState {
  conversations: any[]; // Define Conversation type properly later
  activeConversationId: string | null;
  messages: Record<string, Message[]>; // conversationId -> messages

  setActiveConversation: (id: string | null) => void;
  addMessage: (conversationId: string, message: Message) => void;
  // ... other actions
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
