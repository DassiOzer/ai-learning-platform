import { Request, Response } from 'express';
import { getUserById, getUserHistory, updateUser } from '../services/userService';

// Fetch user details by ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        
        // בדיקה שה-userId קיים
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        
        const user = await getUserById(userId);
        
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        res.status(200).json({
            id: user._id,
            name: user.name,
            phone: user.phone
        });
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message || 'Unknown error'
        });
    }
};

// Fetch user's learning history
export const getUserHistoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        
        // בדיקה שה-userId קיים
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        
        const history = await getUserHistory(userId);
        res.status(200).json(history);
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message || 'Unknown error'
        });
    }
};

// Update user details
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const { name, phone } = req.body;
        
        // בדיקה שה-userId קיים
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        
        // בדיקת ולידציה בסיסית
        if (!name && !phone) {
            res.status(400).json({ message: 'At least one field (name or phone) is required' });
            return;
        }
        
        const updatedUser = await updateUser(userId, { name, phone });
        
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            phone: updatedUser.phone
        });
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message || 'Unknown error'
        });
    }
};