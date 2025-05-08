import { Op, QueryTypes, where } from 'sequelize';
import { sequelize } from '../database/Database';
import MedicalProfile from '../models/MedicalProfile';
import User from '../models/User';
import bcrypt from 'bcrypt';
import EmailService from './EmailService';

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
                return {message: 'Email or phone invalid'};
            }

            // Compare provided password with stored password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return {message: 'Password invalid'};
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

    async getMedicalProfilById(user_id: number){
        try {
            const profile = await sequelize.query('SELECT * FROM patient_medical_view WHERE user_id = :id', {
              replacements: { id: user_id }, 
              type: QueryTypes.SELECT,
            });
            return await profile;
        } catch (error: any) {
            throw new Error('Error fetching user medical profile : ' + error.message );
        }
    }

    async sendEmailForgotPassword(email: string, to: string, subject: string, text: string, html: string) {
        try {
            const user = await User.findOne({where: {email: email}});
            if(user){
                await EmailService.sendEmail({
                    to, 
                    subject, 
                    text, 
                    html
                });
            }else{
                return {
                    message: 'Email not found'
                };
            }
        }catch (error: any) {
            throw new Error('Error fetching doctors : ' + error.message );
        }
    }

    async getAllDoctors() {
        try {
            const doctors = await sequelize.query('SELECT * FROM doctors_view', {
              type: QueryTypes.SELECT
            });
            return await doctors;
        } catch (error: any) {
            throw new Error('Error fetching doctors : ' + error.message );
        }
    }

    async getAllPatients() {
        try {
            return await User.findAll({
                where: { role: 0 , status : 1 },
                attributes: { exclude: ['password'] }
            });
        } catch (error: any) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    async getAllUsersNotActivated() {
        try {
            return await User.findAll({
                where: { status : 0 },
                attributes: { exclude: ['password'] }
            });
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

    async changePassword(userId: string, currentPassword: string, newPassword: string) {
        try {
            const user = await User.findOne({
                where: {user_id : userId}
            });
            if (!user) {
                return {message: 'User not found'};
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return {message: 'Password doesn\'t match to old password'};
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedNewPassword;
            await user.save();

            return { 
                message: 'Password changed successfully!' 
            };

        } catch (error: any) {
            throw new Error('Error changing password: ' + error.message);
        }
    }
}

export default new UserService();
