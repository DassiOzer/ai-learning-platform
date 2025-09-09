import React, { useState } from 'react';
import { authService } from '../../services/auth';
import { LoginData } from '../../types';

const Login: React.FC = () => {
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
      
      console.log('Login successful:', response);
      alert(`Login successful! Welcome ${response.user.name}`);
      
      // כאן תוסיף מעבר לדשבורד
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
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
    </div>
  );
};

export default Login;