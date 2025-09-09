import { Request, Response } from 'express';
import { Category } from '../models/category';
import { SubCategory } from '../models/subCategory';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getSubCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const subCategories = await SubCategory.find({ category_id: categoryId });
    res.json(subCategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};