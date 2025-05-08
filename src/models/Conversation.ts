import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/Database';


interface IConversation {
    conversation_id: number;
    user1_id: number;
    user2_id: number;
}

interface IConversationCreationAttributes extends Optional<IConversation, 'conversation_id'> {}

class Conversation extends Model<IConversation, IConversationCreationAttributes> implements IConversation {

    public conversation_id!: number;
    public user1_id!: number;
    public user2_id!: number;
}

Conversation.init(
    {
        conversation_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        user1_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user2_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },        
    {
        sequelize,
        tableName: 'conversation',
        modelName: 'Conversation',
    }
);
export default Conversation;
