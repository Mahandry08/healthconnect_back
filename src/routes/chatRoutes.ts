import express from 'express';
import ChatController from '../controllers/ChatController';
import ConversationController from '../controllers/ConversationController';

const router = express.Router();

router.post('/createChat', ChatController.createChat); //to create a chat
router.post('/conversation', ChatController.getChatsByConversation);//to get all chats in a conversation
router.put('/chats/:chatId/read', ChatController.markChatAsRead);//to mark a chat as read

router.post('/createConversation',  ConversationController.createConversation); //to create a conversation
router.get('/userConversations',  ConversationController.getUserConversations);//to get all conversations of a user

export default router;