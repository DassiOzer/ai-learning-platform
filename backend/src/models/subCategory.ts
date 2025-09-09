import mongoose, { Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  category_id: mongoose.Types.ObjectId;
}

const subCategorySchema = new Schema<ISubCategory>({
  name: { type: String, required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

export const SubCategory = mongoose.model<ISubCategory>('SubCategory', subCategorySchema);