import ConversationService from '../services/ConversationService';

const createConversation = async (req: any, res: any) => {
  const { user2_id, user1_id } = req.body;

  try {
    const conversation = await ConversationService.createConversation(user1_id, user2_id);
    res.status(201).json({ message: 'Conversation created successfully!', conversation });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Conversation creation failed.' });
  }
};

const getUserConversations = async (req: any, res: any) => {
  const { user_id } = req.body;

  try {
    const conversations = await ConversationService.getUserConversations(user_id);
    if (conversations.length > 0) {
      res.status(200).json(conversations);
    } else {
      res.status(404).json({ message: 'No conversations found' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error retrieving conversations' });
  }
};

export default {
  createConversation,
  getUserConversations,
};