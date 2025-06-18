import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/Database';


interface IChatConversation {
    chat_conversation_id: number;
    chat_id: number;
    conversation_id: number;
}

interface IChatConversationCreationAttributes extends Optional<IChatConversation, 'chat_conversation_id'> {}

class ChatConversation extends Model<IChatConversation, IChatConversationCreationAttributes> implements IChatConversation {
    public chat_conversation_id!: number;
    public chat_id!: number;
    public conversation_id!: number;
    chat: any;
}

ChatConversation.init(
    {
        chat_conversation_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },        
    {
        sequelize,
        tableName: 'chat_conversation',
        modelName: 'ChatConversation',
    }
);
export default ChatConversation;
