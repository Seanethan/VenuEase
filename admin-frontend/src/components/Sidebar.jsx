import React from 'react';

const Sidebar = ({ activePage, onPageChange, onLogout, currentAdmin }) => {
  const handleNavClick = (page, e) => {
    e.preventDefault();
    onPageChange(page);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <div className="venue-ease-sidebar">
      <div className="venue-ease-logo">VenueEase</div>
      {currentAdmin && (
        <div className="admin-info">
          <p>Logged in as: <strong>{currentAdmin.email}</strong></p>
          <p>Role: <strong>{currentAdmin.role || 'Admin'}</strong></p>
        </div>
      )}
      <div className="venue-ease-nav">
        <a
          href="#"
          className={`venue-ease-nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('dashboard', e)}
        >
          Dashboard
        </a>
        <a
          href="#"
          className={`venue-ease-nav-link ${activePage === 'users' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('users', e)}
        >
          Users
        </a>
        <a
          href="#"
          className={`venue-ease-nav-link ${activePage === 'query' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('query', e)}
        >
          Query Editor
        </a>
        <a
          href="#"
          className={`venue-ease-nav-link ${activePage === 'venues' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('venues', e)}
        >
          Venues
        </a>
      </div>
      <a 
        href="#" 
        className="venue-ease-logout"
        onClick={handleLogout}
      >
        Log Out
      </a>
    </div>
  );
};

export default Sidebar;