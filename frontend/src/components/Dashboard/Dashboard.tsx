import React, { useState, useEffect } from 'react';
import { Category, SubCategory } from '../../types';
import { categoryService } from '../../services/categoryService';

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);

  // טען קטגוריות מהדאטאבייס
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // טען תת-קטגוריות כשקטגוריה נבחרת
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedCategory) {
        setSubCategories([]);
        setSelectedSubCategory('');
        return;
      }

      try {
        setSubCategoriesLoading(true);
        const subCategoriesData = await categoryService.getSubCategories(selectedCategory);
        setSubCategories(subCategoriesData);
        setSelectedSubCategory(''); // איפוס בחירה
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]);
        alert('Failed to load subcategories');
      } finally {
        setSubCategoriesLoading(false);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !prompt) return;

    setLoading(true);
    try {
      // כאן תוסיף קריאה לAI API בעתיד
      // const response = await aiService.askQuestion({
      //   category: selectedCategory,
      //   subCategory: selectedSubCategory,
      //   prompt: prompt
      // });
      
      // זמני - סימולציה של תשובה
      setTimeout(() => {
        setResponse(`This is a simulated AI response for: "${prompt}"`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      alert('Failed to get AI response');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">AI Learning Platform</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Ask AI a Question</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* בחירת קטגוריה */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading ? 'Loading categories...' : 'Select a category'}
              </option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* בחירת תת-קטגוריה */}
          {selectedCategory && (
            <div>
              <label className="block mb-2 font-bold text-gray-700">
                Sub-Category:
              </label>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
                disabled={subCategoriesLoading}
              >
                <option value="">
                  {subCategoriesLoading ? 'Loading subcategories...' : 'Select a sub-category'}
                </option>
                {subCategories.map(subCat => (
                  <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* שאלה */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Your Question:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Ask your question here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !selectedCategory || !selectedSubCategory || categoriesLoading}
            className={`w-full p-3 text-white font-semibold rounded-lg transition-colors ${
              loading || !selectedCategory || !selectedSubCategory || categoriesLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Getting Answer...' : 'Ask AI'}
          </button>
        </form>

        {/* תשובה */}
        {response && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">AI Response:</h3>
            <p className="text-blue-700">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;