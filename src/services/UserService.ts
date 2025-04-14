import { Op, QueryTypes } from 'sequelize';
import { sequelize } from '../database/Database';
import MedicalProfile from '../models/MedicalProfile';
import User from '../models/User';
import bcrypt from 'bcrypt';

class UserService {
    // Register user
    async register(name: string, firstname: string, birthday :Date, email: string, password: string, role: 0 | 1 | 2, address: string, phone_number: string, status: 0 | 1) {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
                firstname,
                birthday,
                address,
                phone_number,
                status
            });
            return newUser;
        } catch (error: any) {
            throw new Error('Error registering user: ' + error.message);
        }
    }

    // Login user
    async login(identifier: string, password: string) {
        try {
            // Find user by email or by phone number

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

            const user = await User.findOne({
                where: {
                    [Op.and]: [
                        isEmail ? { email: identifier } : { phone_number: identifier },
                        { status: 1 } 
                    ]
                }
                 
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Compare provided password with stored password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            // Return user details (but no session or token)
            return { message: 'Login successful', user };
        } catch (error: any) {
            throw new Error('Login failed: ' + error.message);
        }
    }

    // Get all users
    async getAllUsers() {
        try {
            return await User.findAll();
        } catch (error: any) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    async createMedicalProfile(userId: number, medicalHistory: string, allergies: string) {
        try {
            // Vérifier si le patient existe et est bien un patient (role = 0)
            const user = await User.findOne({
                where: { user_id: userId, role: 0 }
            });

            if (!user) {
                throw new Error('Patient not found or user is not a patient');
            }

            // Vérifier si un profil médical existe déjà (relation 1:1)
            const existingProfile = await MedicalProfile.findOne({
                where: { user_id: userId }
            });

            if (existingProfile) {
                throw new Error('Medical profile already exists for this patient');
            }

            
            const newProfile = await MedicalProfile.create({
                user_id: userId,
                medical_history: typeof medicalHistory === 'object' ? JSON.stringify(medicalHistory) : medicalHistory,
                allergies: typeof allergies === 'object' ? JSON.stringify(allergies) : allergies,
            });

            return newProfile;
        } catch (error: any) {
            throw new Error('Error creating medical profile: ' + error.message);
        }
    }

    async getPatientDetailsWithProfile(userId: number) {
        try {
            
            const user = await User.findOne({
                where: { user_id: userId, role: 0 }
            });

            if (!user) {
                throw new Error('Patient not found or user is not a patient');
            }

            
            const [results] = await sequelize.query(`
                SELECT * FROM patient_medical_view WHERE user_id = :userId
            `, {
                replacements: { userId },
                type: QueryTypes.SELECT
            });

            if (!results) {
                throw new Error('No details found for this patient');
            }

            return results; // Retourne le premier résultat (les données combinées)
        } catch (error: any) {
            throw new Error('Error fetching patient details: ' + error.message);
        }
    }
}

export default new UserService();
