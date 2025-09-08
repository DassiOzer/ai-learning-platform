import { Request, Response } from 'express';
import { User } from '../models/user';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;
        const user = new User({ name, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: 'Registration failed' });
    }
};