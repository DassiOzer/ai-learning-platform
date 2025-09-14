import express, { Request, Response } from 'express';
import cors from 'cors';
import {myDB} from './db/connection';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import promptRoutes from './routes/promptRoutes';
import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
myDB.getDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/prompts', promptRoutes);

app.get('/', (_req: Request, res: Response) => res.send('AI Learning Platform API'));

app.use(errorHandler);

export default app;