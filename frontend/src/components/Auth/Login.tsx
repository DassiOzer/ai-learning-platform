import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { LoginData } from '../../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginData: LoginData = { name, phone };
      const response = await authService.login(loginData);

      localStorage.setItem('user_id', response.user.id);
      localStorage.setItem('user_name', response.user.name);
      
      console.log('Login successful:', response);
      navigate('/dashboard');
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">AI Learning Platform</h1>
      </header>

      <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Phone Number:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your phone number"
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
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* כפתור כניסה למנהל */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/admin-login')} // ← עבור לעמוד מנהל
            className="w-full p-3 bg-red-50 border border-red-200 text-red-700 font-semibold rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Admin Access
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            For administrators only
          </p>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <button 
            onClick={() => navigate('/register')} // ← עבור לרישום
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;