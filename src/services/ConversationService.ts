import { Op } from 'sequelize';
import Conversation from '../models/Conversation';
import User from '../models/User';

class ConversationService {
  // Create a new conversation
  async createConversation(user1_id: number, user2_id: number) {
    try {
      // Check if conversation already exists
      const existingConversation = await Conversation.findOne({
        where: {
          [Op.or]: [
            { user1_id, user2_id },
            { user1_id: user2_id, user2_id: user1_id },
          ],
        },
      });

      if (existingConversation) {
        return existingConversation;
      }

      const conversation = await Conversation.create({
          conversation_id: await this.generateConversationId(),
          user1_id,
          user2_id,
      });

      return conversation;
    } catch (error: any) {
      throw new Error('Error creating conversation: ' + error.message);
    }
  }

  // Get all conversations for a user
  async getUserConversations(user_id: number) {
    try {
      return await Conversation.findAll({
        where: {
          [Op.or]: [{ user1_id: user_id }, { user2_id: user_id }],
        },
        include: [
          { model: User, as: 'user1', attributes: ['user_id', 'name', 'firstname', 'email'] },
          { model: User, as: 'user2', attributes: ['user_id', 'name', 'firstname', 'email'] },
        ],
      });
    } catch (error: any) {
      throw new Error('Error fetching conversations: ' + error.message);
    }
  }

  // Generate unique conversation_id
  private async generateConversationId(): Promise<number> {
    try {
      const lastConversation = await Conversation.findOne({
        order: [['conversation_id', 'DESC']],
      });
      return (lastConversation?.conversation_id || 0) + 1;
    } catch (error: any) {
      throw new Error('Error generating conversation ID: ' + error.message);
    }
  }
}

export default new ConversationService();