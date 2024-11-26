import UserService from "../services/UserService";

const register = async (req : any, res: any) => {
    const { name, email, password, role } = req.body;

    try {
        const newUser  = UserService.register(name, email, password, role);
        res.status(201).json({ message: 'User  registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'User  registration failed.' });
    }
};

/*const login = async (req : any, res : any) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User  not found.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
};*/

export default{
    register,
    //login
}