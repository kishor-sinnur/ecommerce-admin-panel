import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import ManageOrders from './pages/ManageOrders';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/manage-orders" element={<ManageOrders />} />
          </>
        ) : (
          // Redirect all other routes to /login if not authenticated
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
