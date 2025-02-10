import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

function dbconfig() {
    const dbURI = `mongodb+srv://crime:aklogic@cluster0.knqixdj.mongodb.net/${process.env.COLECTION}?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.connect(dbURI)
        .then(() => console.log('Connected to MongoDB Atlas!'))
        .catch((err) => {
            console.error('Error connecting to MongoDB Atlas:', err);
        });
}

export default dbconfig;
