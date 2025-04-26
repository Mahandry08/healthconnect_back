import UserService from "../services/UserService";

const register = async (req: any, res: any) => {
    const { name, firstname, birthday, email, password, role, address, phone_number, status = 0 } = req.body;

    if (![0, 1, 2].includes(role)) {
        return res.status(400).json({ error: 'Invalid role. Role must be 0 (patient), 1 (médecin), or 2 (admin).' });
    }

    try {
        // Await the result of the registration method
        const newUser = await UserService.register(name, firstname, birthday, email, password, role, address, phone_number, status);
        res.status(201).json({ message: 'User registered successfully!', user: newUser });

    } catch (error: any) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: error.message || 'User registration failed.' });
    }
};

const login = async (req: any, res: any) => {
    const { identifier, password } = req.body; 

    try {
        
        const { message, user } = await UserService.login(identifier, password);
        
        if(user){
        
            return res.status(200).json({ 
                success: true,
                message,
                user
            });
        
            
        }else{
            res.status(401).json({
                success: false, 
                message
            });
        }
        
    } catch (error: any) {
        throw error;
    }
};


const users = async(req : any, res: any) =>{
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}

const addMedicalprofile = async (req: any, res: any) => {
    const { userId, medicalHistory, allergies} = req.body;

    try {
        // Await the result of the registration method
        const newProfile= await UserService.createMedicalProfile(userId, medicalHistory, allergies);
        res.status(201).json({ message: 'Medical profile updated successfully!', profile: newProfile });

    } catch (error: any) {
        console.error(error); 
        res.status(500).json({ error: error.message || 'Medical Profile update failed.' });
    }
};

const patientProfile = async(req : any, res: any) =>{
    
    const {userId} = req.body;
    try {
        const profile = await UserService.getPatientDetailsWithProfile(userId);
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}

export default{
    register,
    login,
    users,
    addMedicalprofile,
    patientProfile
}