import User from '../models/User';
import bcrypt from 'bcrypt';

class UserService {
    // Register user
    async register(name: string, firstname: string, birthday :Date, email: string, password: string, role: 0 | 1 | 2, address: string, phone_number: string) {
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
                phone_number
            });
            return newUser;
        } catch (error: any) {
            throw new Error('Error registering user: ' + error.message);
        }
    }

    // Login user
    async login(email: string, password: string) {
        try {
            // Find user by email
            const user = await User.findOne({ where: { email } });

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
}

export default new UserService();
