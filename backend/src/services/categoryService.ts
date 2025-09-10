import { Category } from '../models/category';
import { SubCategory } from '../models/subCategory';

export class CategoryService {
  
  // ===== CATEGORIES =====
  
  // Get all categories
  static async getAllCategories() {
    try {
      const categories = await Category.find().sort({ name: 1 });
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }

  // Create new category
  static async createCategory(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Category name is required');
    }

    // Check if category already exists (case insensitive)
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } 
    });
    
    if (existingCategory) {
      throw new Error('Category already exists');
    }

    const category = new Category({ name: name.trim() });
    const savedCategory = await category.save();
    return savedCategory;
  }

  // Update category
  static async updateCategory(id: string, name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Category name is required');
    }

    // Check if another category with same name exists
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      _id: { $ne: id }
    });
    
    if (existingCategory) {
      throw new Error('Category name already exists');
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      throw new Error('Category not found');
    }

    return updatedCategory;
  }

static async deleteCategory(id: string) {
  console.log('Deleting category:', id);
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  const deletedSubs = await SubCategory.deleteMany({ category_id: id });
  console.log('Deleted subcategories:', deletedSubs);

  await Category.findByIdAndDelete(id);

  return { message: 'Category and its subcategories deleted successfully', deletedCategory: category };
}

  // Get category with subcategories
  static async getCategoryWithSubCategories(id: string) {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }

    const subCategories = await SubCategory.find({ category_id: id }).sort({ name: 1 });
    
    return {
      category,
      subCategories
    };
  }

  // ===== SUBCATEGORIES =====

  // Get subcategories by category
  static async getSubCategoriesByCategory(categoryId: string) {
    // Verify category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const subCategories = await SubCategory.find({ category_id: categoryId }).sort({ name: 1 });
    return subCategories;
  }

  // Get all subcategories with category info
  static async getAllSubCategories() {
    const subCategories = await SubCategory.find()
      .populate('category_id', 'name')
      .sort({ name: 1 });
    return subCategories;
  }

  // Create new subcategory
  static async createSubCategory(name: string, categoryId: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Subcategory name is required');
    }

    if (!categoryId) {
      throw new Error('Category ID is required');
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    // Check if subcategory already exists in this category (case insensitive)
    const existingSubCategory = await SubCategory.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      category_id: categoryId
    });
    
    if (existingSubCategory) {
      throw new Error('Subcategory already exists in this category');
    }

    const subCategory = new SubCategory({
      name: name.trim(),
      category_id: categoryId
    });
    
    const savedSubCategory = await subCategory.save();
    
    // Return with populated category
    return await SubCategory.findById(savedSubCategory._id).populate('category_id', 'name');
  }

  // Update subcategory
  static async updateSubCategory(id: string, name: string, categoryId?: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Subcategory name is required');
    }

    // Get current subcategory
    const currentSubCategory = await SubCategory.findById(id);
    if (!currentSubCategory) {
      throw new Error('Subcategory not found');
    }

    const targetCategoryId = categoryId || currentSubCategory.category_id;

    // If category is being changed, verify new category exists
    if (categoryId && categoryId !== currentSubCategory.category_id.toString()) {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
    }

    // Check if another subcategory with same name exists in the target category
    const existingSubCategory = await SubCategory.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      category_id: targetCategoryId,
      _id: { $ne: id }
    });
    
    if (existingSubCategory) {
      throw new Error('Subcategory name already exists in this category');
    }

    const updateData: any = { name: name.trim() };
    if (categoryId) {
      updateData.category_id = categoryId;
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category_id', 'name');

    return updatedSubCategory;
  }

  // Delete subcategory
  static async deleteSubCategory(id: string) {
    const subCategory = await SubCategory.findById(id).populate('category_id', 'name');
    if (!subCategory) {
      throw new Error('Subcategory not found');
    }

    await SubCategory.findByIdAndDelete(id);
    return { 
      message: 'Subcategory deleted successfully', 
      deletedSubCategory: subCategory 
    };
  }

  // ===== ANALYTICS & STATS =====

  // Get categories with subcategory counts
  static async getCategoriesWithStats() {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'category_id',
          as: 'subcategories'
        }
      },
      {
        $project: {
          name: 1,
          subcategoryCount: { $size: '$subcategories' },
          created_at: 1
        }
      },
      { $sort: { name: 1 } }
    ]);

    return categories;
  }

  // Search categories and subcategories
  static async searchCategories(searchTerm: string) {
    const regex = new RegExp(searchTerm, 'i');
    
    const [categories, subCategories] = await Promise.all([
      Category.find({ name: regex }),
      SubCategory.find({ name: regex }).populate('category_id', 'name')
    ]);

    return {
      categories,
      subCategories
    };
  }

    // Get all categories with their subcategories
  static async getCategoriesWithSubs() {
    const categories = await Category.find().sort({ name: 1 });
    const categoriesWithSubs = await Promise.all(
      categories.map(async (cat) => {
        const subCategories = await SubCategory.find({ category_id: cat._id }).sort({ name: 1 });
        return { ...cat.toObject(), subCategories };
      })
    );
    return categoriesWithSubs;
  }
}