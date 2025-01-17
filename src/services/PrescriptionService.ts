import Prescription from "../models/Prescription";

class PrescriptionService {
    async savePrescription(consultation_id: number, prescription_date: Date, instructions: string) {
        if (instructions !== '') {
            try {
                const newPrescription = await Prescription.create({
                    consultation_id,
                    prescription_date,
                    instructions
                });
                return newPrescription;
            } catch (error: any) {
                return `Error saving prescription: ${error.message}`;
            }
        } else {
            return "There is an empty input! Please verify.";
        }
    }

    async searchByConsultId(consultation_id: string) {
        try {
            const prescription = await Prescription.findOne({
                where: { consultation_id },
            });
            return prescription;
        } catch (error: any) {
            return `Error searching by consultation ID: ${error.message}`;
        }
    }

    async updatePrescription(prescription_id: number, data: any) {
        try {
            const [updated] = await Prescription.update(data, {
                where: { prescription_id },
            });

            if (updated) {
                return await Prescription.findByPk(prescription_id);
            }
            return "Prescription not found!";
        } catch (error: any) {
            return `Error updating prescription: ${error.message}`;
        }
    }

    async deletePrescription(prescription_id: number) {
        try {
            const deleted = await Prescription.destroy({
                where: { prescription_id },
            });

            if (deleted) {
                return "Prescription deleted successfully!";
            }
            return "Prescription not found!";
        } catch (error: any) {
            return `Error deleting prescription: ${error.message}`;
        }
    }
}

export default new PrescriptionService();
