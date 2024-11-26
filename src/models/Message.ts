import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
    senderId: mongoose.Schema.Types.ObjectId;
    recipientId: mongoose.Schema.Types.ObjectId;
    sentAt: Date;
    content: string;
    read: boolean;
}

const messageSchema: Schema = new Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    sentAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
});

export default mongoose.model<IMessage>('Message', messageSchema);