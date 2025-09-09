import mongoose, { Schema, Document } from 'mongoose';

export interface IPrompt extends Document {
  user_id: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;
  sub_category_id: mongoose.Types.ObjectId;
  prompt: string;
  response: string;
  created_at: Date;
}

const promptSchema = new Schema<IPrompt>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_category_id: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const Prompt = mongoose.model<IPrompt>('Prompt', promptSchema);