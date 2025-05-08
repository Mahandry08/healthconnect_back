import ChatService from '../services/ChatService';

const createChat = async (req: any, res: any) => {
  const { sender_id, content, receiver_id, conversation_id, sent_at } = req.body;

  try {
    const chat = await ChatService.createChat(content, receiver_id, conversation_id || null, sender_id, sent_at);
    res.status(201).json({ message: 'Chat created successfully!', chat });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Chat creation failed.' });
  }
};

const getChatsByConversation = async (req: any, res: any) => {
  const {user_id, conversation_id} = req.body;
  try {
    const chats = await ChatService.getChatsByConversation(conversation_id, user_id);
    if (chats.length > 0) {
      res.status(200).json(chats);
    } else {
      res.status(404).json({ message: 'No chats found' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error retrieving chats' });
  }
};

const markChatAsRead = async (req: any, res: any) => {
    const chat_id = parseInt(req.params.chatId);
    const user_id = req.user.id;
  
    try {
      const result = await ChatService.markChatAsRead(chat_id, user_id);
      res.status(200).json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Error marking chat as read' });
    }
  };

export default {
  createChat,
  getChatsByConversation,
  markChatAsRead,
};