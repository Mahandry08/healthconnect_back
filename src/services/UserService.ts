import { User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
    async register (name : string, email : string, password : string, role : string){
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ name, email, password: hashedPassword, role });
        return await newUser.save();
    }

    async login(email : string, pass : string){

    }
}

export default new UserService();