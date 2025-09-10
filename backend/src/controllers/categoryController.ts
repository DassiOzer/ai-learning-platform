import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { Category } from '../models/category';
import { SubCategory } from '../models/subCategory';

// ===== CATEGORIES =====

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch categories' });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    
    if (!name) {
      res.status(400).json({ error: 'Category name is required' });
      return;
    }
    
    const category = await CategoryService.createCategory(name);
    res.status(201).json(category);
  } catch (error: any) {
    console.error('Error creating category:', error);
    const statusCode = error.message.includes('required') || error.message.includes('exists') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to create category' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({ error: 'Category ID is required' });
      return;
    }
    
    if (!name) {
      res.status(400).json({ error: 'Category name is required' });
      return;
    }
    
    const updatedCategory = await CategoryService.updateCategory(id, name);
    res.json(updatedCategory);
  } catch (error: any) {
    console.error('Error updating category:', error);
    const statusCode = error.message.includes('not found') ? 404 : 
                       error.message.includes('required') || error.message.includes('exists') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to update category' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({ error: 'Category ID is required' });
      return;
    }
    
    const result = await CategoryService.deleteCategory(id);
    res.json(result);
  } catch (error: any) {
    console.error('Error deleting category:', error);
    const statusCode = error.message.includes('not found') ? 404 : 
                       error.message.includes('Cannot delete') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to delete category' });
  }
};

export const getCategoryWithSubCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({ error: 'Category ID is required' });
      return;
    }
    
    const result = await CategoryService.getCategoryWithSubCategories(id);
    res.json(result);
  } catch (error: any) {
    console.error('Error fetching category with subcategories:', error);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to fetch category' });
  }
};

// ===== SUBCATEGORIES =====

export const getSubCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    
    // Validate categoryId parameter
    if (!categoryId) {
      res.status(400).json({ error: 'Category ID is required' });
      return;
    }
    
    const subCategories = await CategoryService.getSubCategoriesByCategory(categoryId);
    res.json(subCategories);
  } catch (error: any) {
    console.error('Error fetching subcategories:', error);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to fetch subcategories' });
  }
};

export const getAllSubCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const subCategories = await CategoryService.getAllSubCategories();
    res.json(subCategories);
  } catch (error: any) {
    console.error('Error fetching all subcategories:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch subcategories' });
  }
};

export const createSubCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category_id } = req.body;
    
    if (!name || !category_id) {
      res.status(400).json({ error: 'Subcategory name and category ID are required' });
      return;
    }
    
    const subCategory = await CategoryService.createSubCategory(name, category_id);
    res.status(201).json(subCategory);
  } catch (error: any) {
    console.error('Error creating subcategory:', error);
    const statusCode = error.message.includes('required') || error.message.includes('exists') || error.message.includes('not found') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to create subcategory' });
  }
};

export const updateSubCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, category_id } = req.body;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({ error: 'Subcategory ID is required' });
      return;
    }
    
    if (!name) {
      res.status(400).json({ error: 'Subcategory name is required' });
      return;
    }
    
    const updatedSubCategory = await CategoryService.updateSubCategory(id, name, category_id);
    res.json(updatedSubCategory);
  } catch (error: any) {
    console.error('Error updating subcategory:', error);
    const statusCode = error.message.includes('not found') ? 404 : 
                       error.message.includes('required') || error.message.includes('exists') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to update subcategory' });
  }
};

export const deleteSubCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({ error: 'Subcategory ID is required' });
      return;
    }
    
    const result = await CategoryService.deleteSubCategory(id);
    res.json(result);
  } catch (error: any) {
    console.error('Error deleting subcategory:', error);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to delete subcategory' });
  }
};

// ===== ADDITIONAL ENDPOINTS =====

export const getCategoriesWithStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryService.getCategoriesWithStats();
    res.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories with stats:', error);
    res.status(500).json({ error: 'Failed to fetch categories statistics' });
  }
};

export const searchCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      res.status(400).json({ error: 'Search term is required' });
      return;
    }
    
    const results = await CategoryService.searchCategories(q);
    res.json(results);
  } catch (error: any) {
    console.error('Error searching categories:', error);
    res.status(500).json({ error: 'Failed to search categories' });
  }
};

export const getCategoriesWithSubs = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoriesWithSubs = await CategoryService.getCategoriesWithSubs();
    res.json(categoriesWithSubs);
  } catch (error) {
    console.error('Error fetching categories with subcategories:', error);
    res.status(500).json({ error: 'Failed to fetch categories with subcategories' });
  }
};