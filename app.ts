/* FOR MONGO CODE */
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv'; 
// import consultationRoutes from './src/routes/consultationRoutes';
// import prescriptionRoutes from './src/routes/prescriptionRoutes';
// import userRoutes from './src/routes/userRoutes';


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// const mongoURI = process.env.MONGODB_URI; // Use the environment variable

// if (!mongoURI) {
//     console.error('MongoDB URI is not defined in the .env file.');
//     process.exit(1); 
// }

// mongoose.connect(mongoURI)
//     .then(() => console.log('Database connected !'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use('/api/consultations', consultationRoutes);
// app.use('/api/prescriptions', prescriptionRoutes);
// app.use('/api/users', userRoutes);

// app.get('/', (req, res) => {
//     res.send('Welcome to the HealthConnect API!');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectToDatabase, start } from './src/database/Database';
import consultationRoutes from './src/routes/consultationRoutes';
import prescriptionRoutes from './src/routes/prescriptionRoutes';
import userRoutes from './src/routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase();
start();
// Middleware for routes
app.use('/api/consultations', consultationRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the HealthConnect API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
