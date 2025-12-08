import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';
import QueryBuilder from './components/QueryBuilder';
import BookingManagement from './components/BookingManagement';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleLogin = (adminData) => {
    setIsAuthenticated(true);
    setCurrentAdmin(adminData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentAdmin(null);
    setActivePage('dashboard');
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard currentAdmin={currentAdmin} />;
      case 'users':
        return <UserManagement />;
      case 'query':
        return <QueryBuilder />;
      case 'venues':
        return <BookingManagement />;
      default:
        return <AdminDashboard currentAdmin={currentAdmin} />;
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="venue-ease-container">
      <Sidebar 
        activePage={activePage} 
        onPageChange={handlePageChange}
        onLogout={handleLogout}
        currentAdmin={currentAdmin}
      />
      <div className="venue-ease-main">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;