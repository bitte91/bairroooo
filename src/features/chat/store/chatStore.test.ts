import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from './chatStore';

describe('useChatStore', () => {
  beforeEach(() => {
    useChatStore.setState({
      conversations: [],
      activeConversationId: null,
      messages: {}
    });
  });

  it('should add a message to the messages map', () => {
    const { addMessage } = useChatStore.getState();
    const message = {
      id: 1,
      text: 'Hello',
      author: 'User1',
      timestamp: new Date().toISOString()
    };

    addMessage('chat1', message);

    const { messages } = useChatStore.getState();
    expect(messages['chat1']).toHaveLength(1);
    expect(messages['chat1'][0]).toEqual(message);
  });

  it('should update the conversation lastMessage when a message is added', () => {
    // Setup initial state with a conversation
    useChatStore.setState({
      conversations: [{
        id: 'chat1',
        participantName: 'Alice',
        lastMessage: 'Hi',
        unreadCount: 0
      }],
      messages: {}
    });

    const { addMessage } = useChatStore.getState();
    const message = {
      id: 2,
      text: 'How are you?',
      author: 'Bob',
      timestamp: new Date().toISOString()
    };

    addMessage('chat1', message);

    const { conversations } = useChatStore.getState();
    const chat = conversations.find(c => c.id === 'chat1');

    expect(chat?.lastMessage).toBe('How are you?');
    expect(chat?.unreadCount).toBe(1);
  });

  it('should allow creating a new conversation', () => {
      const { createConversation } = useChatStore.getState();
      const newChat = {
          id: 'chat_new',
          participantName: 'New Person'
      };

      createConversation(newChat);

      const { conversations } = useChatStore.getState();
      expect(conversations).toHaveLength(1);
      expect(conversations[0].id).toBe('chat_new');
  });
});
