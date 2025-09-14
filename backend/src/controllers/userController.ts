import { Request, Response } from 'express';
import { getUserById, getUserHistory, updateUser, deleteUser, getAllUsers } from '../services/userService';

// Fetch user details by ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;

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

        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

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

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;

        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        const deletedUser = await deleteUser(userId);

        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({
            message: 'User deleted successfully',
            id: deletedUser._id,
            name: deletedUser.name,
            phone: deletedUser.phone
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Server error',
            error: error.message || 'Unknown error'
        });
    }
};

export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};