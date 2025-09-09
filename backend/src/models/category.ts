import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true }
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);