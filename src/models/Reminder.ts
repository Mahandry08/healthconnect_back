import mongoose, { Document, Schema } from 'mongoose';

interface IReminder extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    reminderType: 'consultation' | 'medication' | 'exam';
    reminderDate: Date;
    message: string;
}

const reminderSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    reminderType: { type: String, enum: ['consultation', 'medication', 'exam'], required: true },
    reminderDate: Date,
    message: String,
});

export default mongoose.model<IReminder>('Reminder', reminderSchema);