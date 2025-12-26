import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/Database';


interface IChat {
    chat_id: number;
    content: string;
    sent_at: Date;
    is_read: boolean;
    sender_id: number;
    receiver_id: number;
}

interface IChatCreationAttributes extends Optional<IChat, 'chat_id'> {}

class Chat extends Model<IChat, IChatCreationAttributes> implements IChat {
    public chat_id!: number;
    public content!: string;
    public sent_at!: Date;
    public is_read!: boolean;
    public sender_id!: number;
    public receiver_id!: number;
}

Chat.init(
    {
        chat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sent_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },        
    {
        sequelize,
        tableName: 'chat',
        modelName: 'Chat',
    }
);
export default Chat;
