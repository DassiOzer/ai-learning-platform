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
router.get('/', getCategories);                    // GET /api/categories
router.post('/', createCategory);                  // POST /api/categories
router.put('/:id', updateCategory);                // PUT /api/categories/:id
router.delete('/:id', deleteCategory);             // DELETE /api/categories/:id

// ===== SUBCATEGORY ROUTES =====
router.get('/subcategories', getAllSubCategories);           // GET /api/categories/subcategories
router.get('/:categoryId/subcategories', getSubCategories);  // GET /api/categories/:categoryId/subcategories
router.post('/subcategories', createSubCategory);            // POST /api/categories/subcategories
router.put('/subcategories/:id', updateSubCategory);         // PUT /api/categories/subcategories/:id
router.delete('/subcategories/:id', deleteSubCategory);      // DELETE /api/categories/subcategories/:id

router.get('/with-subs', getCategoriesWithSubs); // GET /api/categories/with-subs

export default router;