import mongoose, { Document, Schema } from 'mongoose';

interface IMedicalProfile extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    dateOfBirth?: Date;
    gender?: string;
    weight?: number;
    height?: number;
    medicalHistory?: string;
    allergies?: string;
    currentMedications?: string;
}

const medicalProfileSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    dateOfBirth: Date,
    gender: String,
    weight: Number,
    height: Number,
    medicalHistory: String,
    allergies: String,
    currentMedications: String,
});

export default mongoose.model<IMedicalProfile>('MedicalProfile', medicalProfileSchema);