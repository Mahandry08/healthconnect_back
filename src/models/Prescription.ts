import mongoose, { Document, Schema } from 'mongoose';

interface IPrescription extends Document {
    consultationId: mongoose.Schema.Types.ObjectId;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
}

const prescriptionSchema: Schema = new Schema({
    consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
});

export default mongoose.model<IPrescription>('Prescription', prescriptionSchema);