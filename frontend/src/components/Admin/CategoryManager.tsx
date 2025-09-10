import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category, SubCategory } from '../../types';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<(Category & { subCategories: SubCategory[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [subInputs, setSubInputs] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState('');
  const [editCatId, setEditCatId] = useState<string | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [editSubId, setEditSubId] = useState<string | null>(null);
  const [editSubName, setEditSubName] = useState('');

  const fetchCategories = () => {
    setLoading(true);
    axios.get('/api/categories/with-subs')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await axios.post('/api/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add category');
    }
  };

  const handleAddSubCategory = async (categoryId: string) => {
    const name = subInputs[categoryId];
    if (!name || !name.trim()) return;
    try {
      await axios.post('/api/categories/subcategories', { name, category_id: categoryId });
      setSubInputs((prev) => ({ ...prev, [categoryId]: '' }));
      fetchCategories();
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add subcategory');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete category');
    }
  };

  const handleDeleteSubCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;
    try {
      await axios.delete(`/api/categories/subcategories/${id}`);
      fetchCategories();
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete subcategory');
    }
  };

  const handleEditCategory = async (id: string) => {
    if (!editCatName.trim()) return;
    try {
      await axios.put(`/api/categories/${id}`, { name: editCatName });
      setEditCatId(null);
      setEditCatName('');
      fetchCategories();
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to edit category');
    }
  };

  const handleEditSubCategory = async (id: string, categoryId: string) => {
    if (!editSubName.trim()) return;
    try {
      await axios.put(`/api/categories/subcategories/${id}`, { name: editSubName, category_id: categoryId });
      setEditSubId(null);
      setEditSubName('');
      fetchCategories();
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to edit subcategory');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* טופס הוספת קטגוריה */}
      <form onSubmit={handleAddCategory} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="border px-2 py-1 rounded flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Add Category</button>
      </form>

      {categories.length === 0 && (
        <div className="text-gray-500 mb-4">No categories yet. Add your first category!</div>
      )}

      {categories.map(cat => (
        <div key={cat._id} className="mb-6 border-b pb-4">
          <div className="flex items-center justify-between">
            {editCatId === cat._id ? (
              <>
                <input
                  type="text"
                  value={editCatName}
                  onChange={e => setEditCatName(e.target.value)}
                  className="border px-2 py-1 rounded flex-1 mr-2"
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditCategory(cat._id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 px-2 py-1 rounded"
                  onClick={() => { setEditCatId(null); setEditCatName(''); }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="font-semibold">{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 underline"
                    onClick={() => { setEditCatId(cat._id); setEditCatName(cat.name); }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 underline"
                    onClick={() => handleDeleteCategory(cat._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
          <ul className="ml-4 mt-2">
            {cat.subCategories.map(sub => (
              <li key={sub._id} className="flex items-center justify-between">
                {editSubId === sub._id ? (
                  <>
                    <input
                      type="text"
                      value={editSubName}
                      onChange={e => setEditSubName(e.target.value)}
                      className="border px-2 py-1 rounded flex-1 mr-2"
                    />
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEditSubCategory(sub._id, cat._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => { setEditSubId(null); setEditSubName(''); }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>- {sub.name}</span>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-500 underline"
                        onClick={() => { setEditSubId(sub._id); setEditSubName(sub.name); }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 underline"
                        onClick={() => handleDeleteSubCategory(sub._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* טופס הוספת תת־קטגוריה */}
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={subInputs[cat._id] || ''}
              onChange={e => setSubInputs({ ...subInputs, [cat._id]: e.target.value })}
              placeholder="New subcategory name"
              className="border px-2 py-1 rounded flex-1"
            />
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleAddSubCategory(cat._id)}
            >
              Add Subcategory
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryManager;