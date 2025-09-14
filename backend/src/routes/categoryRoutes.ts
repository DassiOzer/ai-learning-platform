import express from 'express';
import {
  // Categories
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  
  // Subcategories
  getSubCategories,
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCategoriesWithSubs
} from '../controllers/categoryController';

const router = express.Router();

// ===== CATEGORY ROUTES =====
router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

// ===== SUBCATEGORY ROUTES =====
router.get('/subcategories', getAllSubCategories);
router.get('/:categoryId/subcategories', getSubCategories);
router.post('/subcategories', createSubCategory);
router.put('/subcategories/:id', updateSubCategory);
router.delete('/subcategories/:id', deleteSubCategory);

router.get('/with-subs', getCategoriesWithSubs);

export default router;