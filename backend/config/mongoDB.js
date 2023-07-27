import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Successful connection with MongoDB.');
    } catch (error) {
        console.log(error);
    }
};

export default db;
