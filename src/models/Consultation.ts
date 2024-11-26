import mongoose, { Document, Schema } from 'mongoose';

interface IConsultation extends Document {
    patientId: mongoose.Schema.Types.ObjectId;
    doctorId: mongoose.Schema.Types.ObjectId;
    consultationDate: Date;
    consultationTime: string;
    consultationType: 'video' | 'chat';
    medicalNotes?: string;
    diagnosis?: string;
}

const consultationSchema: Schema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    consultationDate: Date,
    consultationTime: String,
    consultationType: { type: String, enum: ['video', 'chat'], required: true },
    medicalNotes: String,
    diagnosis: String,
});

export const Consultation = mongoose.model<IConsultation>('Consultation', consultationSchema);