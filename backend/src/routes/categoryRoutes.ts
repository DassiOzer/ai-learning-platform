import express from 'express';
import { getCategories, getSubCategories } from '../controllers/categoryController';

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryId/subcategories', getSubCategories);

export default router;