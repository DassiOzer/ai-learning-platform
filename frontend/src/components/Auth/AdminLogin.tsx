import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // בדיקת סיסמת מנהל
    setTimeout(() => {
      if (password === 'ADMIN') {
        navigate('/admin-dashboard'); // ← עבור לדשבורד מנהל
      } else {
        setError('Invalid admin password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="py-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">AI Learning Platform</h1>
      </header>

      <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
          <p className="text-gray-600 mt-2">Enter admin password to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Admin Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4 p-2 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white font-semibold rounded-lg transition-colors duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
            }`}
          >
            {loading ? 'Verifying...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/login')} // ← חזור להתחברות
            className="text-gray-500 hover:text-gray-700 font-semibold"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;