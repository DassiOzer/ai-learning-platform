import { Request, Response } from 'express';
import { createUser, getUserById } from '../services/userService';
import { User } from '../models/user';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone } = req.body;
        
        if (!name || !phone) {
            res.status(400).json({ message: 'Name and phone are required' });
            return;
        }

        const user = await createUser({ name, phone });
        res.status(201).json({ 
            message: 'User registered successfully', 
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone
            }
        });
    } catch (error: any) {
        console.error('Registration error:', error);
        res.status(400).json({ 
            message: 'Error registering user', 
            error: error.message || 'Unknown error'
        });
    }
};

// Login a user
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phone } = req.body;
        
        if (!phone) {
            res.status(400).json({ message: 'Phone is required' });
            return;
        }

        const user = await User.findOne({ phone }); // ← השתמש ב-User הישיר
        
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(401).json({ 
            message: 'Invalid credentials', 
            error: error.message || 'Unknown error'
        });
    }
};
