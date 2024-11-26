import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'patient' | 'doctor';
    createdAt: Date;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor'], required: true },
    createdAt: { type: Date, default: Date.now },
});

export const User =  mongoose.model<IUser >('User ', userSchema);