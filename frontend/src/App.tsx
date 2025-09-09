import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">AI Learning Platform</h1>
      </header>
      
      {/* Navigation buttons */}
      <div className="text-center mb-6">
        <button
          onClick={() => setCurrentPage('login')}
          className={`mx-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
            currentPage === 'login'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage('register')}
          className={`mx-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
            currentPage === 'register'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500 border border-green-500 hover:bg-green-50'
          }`}
        >
          Register
        </button>
      </div>

      <main>
        {currentPage === 'login' ? <Login /> : <Register />}
      </main>
    </div>
  );
}

export default App;