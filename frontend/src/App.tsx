import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AdminLogin from './components/Auth/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import CategoryManager from './components/Admin/CategoryManager';
import History from './components/Dashboard/History';
import AdminUsers from './components/Admin/AdminUsers';
import UserHistory from './components/Admin/UserHistory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin-categories" element={<CategoryManager />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/:id/history" element={<UserHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;