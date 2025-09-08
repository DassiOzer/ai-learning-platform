import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);