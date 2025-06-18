import { Op, QueryTypes } from "sequelize";
import Consultation  from "../models/Consultation";
import { sequelize } from '../database/Database';

class ConsultationService {
    // Search for consultations by userId (either patient or doctor)
    /*async searchByUserID(userId: string) {
        return await Consultation.findAll({
            where: {
                [Op.or]: [{ patientId: String(userId) }, { doctorId: String(userId) }],
            },
        });
    }*/

    // Schedule a new consultation (save data into the DB)
    async scheduleConsultation(data: any) {
        return await Consultation.create(data);
    }

    // Search for a consultation by its ID
    async searchConsultationByID(id: number) {
        return await Consultation.findByPk(id);
    }

    async allConsultationsByPatientId(patient_id: number) {
        try {
            const consultations = await sequelize.query('SELECT * FROM patient_consultations_view WHERE patient_id = :id', {
              replacements: { id: patient_id }, 
              type: QueryTypes.SELECT,
            });
            return await consultations;
        } catch (error: any) {
            throw new Error('Error fetching patient consultations : ' + error.message );
        }
    }


    async allConsultationsByDoctorId(doctor_id: number) {
        try {
            const consultations = await sequelize.query('SELECT * FROM doctor_consultations_view WHERE doctor_id = :id', {
              replacements: { id: doctor_id }, 
              type: QueryTypes.SELECT,
            });
            return await consultations;
        } catch (error: any) {
            throw new Error('Error fetching doctor consultations : ' + error.message );
        }
    }

    async allRequestsById(doctor_id: number) {
        try {
            const consultations = await sequelize.query('SELECT * FROM doctor_consultations_view WHERE doctor_id = :id & status = 0', {
              replacements: { id: doctor_id }, 
              type: QueryTypes.SELECT,
            });
            return await consultations;
        } catch (error: any) {
            throw new Error('Error fetching doctor consultations : ' + error.message );
        }
    }


    async doctorValidateConsultation(consultation_id: number) {
        try {
            await sequelize.query('UPDATE consultations SET status = 1 WHERE consultation_id = :id', {
              replacements: { id: consultation_id }, 
              type: QueryTypes.UPDATE,
            });
        } catch (error: any) {
            throw new Error('Error updating consultations status : ' + error.message );
        }
    }

    async getAvailableDoctors(date: string, time: string, speciality_id: number) {
        try {
            // Combiner la date et l'heure pour créer un timestamp
            const dateTime = `${date} ${time}`;
            
            const doctors = await sequelize.query(`
                SELECT 
                    d.user_id AS doctor_id,
                    d.name AS doctor_name,
                    d.firstname AS doctor_firstname,
                    d.email AS doctor_email
                FROM 
                    users d
                WHERE 
                    d.role = 1 -- Rôle docteur
                    AND d.user_id NOT IN (
                        SELECT 
                            dc.doctor_id 
                        FROM 
                            doctor_consultations_view dc
                        WHERE 
                            dc.consultation_date = :dateTime
                            AND dc.consultation_status = 1
                            AND dc.speciality_id = :speciality_id
                    )
            `, {
                replacements: { dateTime , speciality_id},
                type: QueryTypes.SELECT
            });

            return doctors;
        } catch (error: any) {
            throw new Error('Error fetching available doctors: ' + error.message);
        }
    }
}

export default new ConsultationService();