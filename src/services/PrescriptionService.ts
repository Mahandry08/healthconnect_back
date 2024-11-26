import mongoose from "mongoose";
import Prescription from "../models/Prescription";

class PrescriptionService {
    async savePrescription(consultationId: mongoose.Schema.Types.ObjectId, medication: string, dosage: string, frequency: string, duration: string){
        if(medication != '' && dosage != '' && frequency != '' && duration != ''){
            const newPrescription = new Prescription({consultationId, medication, dosage, frequency, duration});
            return await newPrescription.save();
        }else{
            return "There is an empty input ! Please verify";
        }   
    }

    async searchByConsultId(ConsultationId: string) {
        return await Prescription.findById(ConsultationId);
    }

    async updatePrescription(id : any, data : any){
        return await Prescription.findByIdAndUpdate(id, data, {new : true});
    }

    async deletePrescription(id: any){
        return await Prescription.findByIdAndDelete(id);
    }
}

export default new PrescriptionService();