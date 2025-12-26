import Chat from '../models/Chat';
import ChatConversation from '../models/ChatConversation';
import Conversation from '../models/Conversation';

class ChatService {
  
  async createChat(content: string, receiver_id: number, conversation_id: number | null, sender_id: number, sent_at: Date) {
    try {
      const chat = await Chat.create({
          chat_id: await this.generateChatId(),
          content,
          sender_id,
          receiver_id,
          is_read: false,
          sent_at
      });

      if (conversation_id) {
        await ChatConversation.create({
          chat_conversation_id: await this.generateChatConversationId(),
          chat_id: chat.chat_id,
          conversation_id,
        });
      }

      return chat;
    } catch (error: any) {
      throw new Error('Error creating chat: ' + error.message);
    }
  }

  // Get all chats for a conversation
  async getChatsByConversation(conversation_id: number, user_id: number) {
    try {
      const conversation = await Conversation.findOne({
        where: { conversation_id },
      });

      if (!conversation || (conversation.user1_id !== user_id && conversation.user2_id !== user_id)) {
        throw new Error('Conversation not found or access denied');
      }

      const chatConversations = await ChatConversation.findAll({
        where: { conversation_id },
        include: [{ model: Chat, as: 'chat' }],
      });

      return chatConversations.map((cc: { chat: any; }) => cc.chat);
    } catch (error: any) {
      throw new Error('Error fetching chats: ' + error.message);
    }
  }

  // Mark a chat as read
  async markChatAsRead(chat_id: number, user_id: number) {
    try {
      const chat = await Chat.findOne({ where: { chat_id } });
      if (!chat || chat.receiver_id !== user_id) {
        throw new Error('Chat not found or access denied');
      }
      await chat.update({ is_read: true });
      return { message: 'Chat marked as read' };
    } catch (error: any) {
      throw new Error('Error marking chat as read: ' + error.message);
    }
  }

  // Generate unique chat_id
  private async generateChatId(): Promise<number> {
    try {
      const lastChat = await Chat.findOne({
        order: [['chat_id', 'DESC']],
      });
      return (lastChat?.chat_id || 0) + 1;
    } catch (error: any) {
      throw new Error('Error generating chat ID: ' + error.message);
    }
  }

  // Generate unique chat_conversation_id
  private async generateChatConversationId(): Promise<number> {
    try {
      const lastChatConversation = await ChatConversation.findOne({
        order: [['chat_conversation_id', 'DESC']],
      });
      return (lastChatConversation?.chat_conversation_id || 0) + 1;
    } catch (error: any) {
      throw new Error('Error generating chat conversation ID: ' + error.message);
    }
  }
}

export default new ChatService();