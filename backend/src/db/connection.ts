import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export class myDB{
    static DB: myDB = new myDB();

    async connectToDb(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGODB_URI as string)
            console.log('Connected to MongoDB (Mongoose)');
        } catch (err) {
            console.error('MongoDB connection error:', err);
        process.exit(1);
        }
    }

    static async getDB(): Promise<myDB>
    {
        if( mongoose.connection.readyState === 0)
            await this.DB.connectToDb();
        return this.DB;
    }
}