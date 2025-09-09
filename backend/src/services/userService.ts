import { User, IUser } from '../models/user';
import { Prompt, IPrompt } from '../models/prompt';
import mongoose from 'mongoose';

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return await user.save();
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
    return await User.findById(userId);
};

export const getUserHistory = async (userId: string): Promise<IPrompt[]> => {
    return await Prompt.find({ user_id: userId })
        .populate('category_id')
        .populate('sub_category_id')
        .sort({ created_at: -1 });
};

export const updateUser = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export const deleteUser = async (userId: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(userId);
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find().sort({ _id: -1 });
};

export const getUserWithPrompts = async (userId: string): Promise<IUser | null> => {
    return await User.findById(userId).populate({
        path: 'prompts',
        populate: {
            path: 'category_id sub_category_id',
            model: 'Category SubCategory'
        }
    });
};