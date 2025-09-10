const API_BASE_URL = 'http://localhost:5000/api';

export const categoryService = {
  // טען כל הקטגוריות
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  // טען תת-קטגוריות לפי קטגוריה
  getSubCategories: async (categoryId: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
    if (!response.ok) {
      throw new Error('Failed to fetch subcategories');
    }
    return response.json();
  }
};