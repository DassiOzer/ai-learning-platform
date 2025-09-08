// import dotenv from 'dotenv';
// import express, { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI as string)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// app.get('/', (_req: Request, res: Response) => res.send('API עובד!'));

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

import express, { Request, Response } from 'express';
import cors from 'cors';
import {myDB} from './db/connection';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());
myDB.getDB();

// נתיבי ה-API
app.use('/api/users', userRoutes);


app.get('/', (_req: Request, res: Response) => res.send('API עובד!'));

app.use((err: Error, req: Request , res: Response, next: any) => {
    res.status(500).send(err.message);
});

export default app;