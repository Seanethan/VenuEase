import React from 'react';

const AdminDashboard = ({ currentAdmin }) => {
  return (
    <section className="venue-ease-page">
      <h2>ADMIN DASHBOARD</h2>
      {currentAdmin && (
        <div className="admin-welcome">
          <p>Welcome, <strong>{currentAdmin.name}</strong>! ({currentAdmin.role})</p>
        </div>
      )}

      <div className="venue-ease-card-container">
        <div className="venue-ease-card">
          <h3>Total Active Users</h3>
          <p>106</p>
        </div>
        <div className="venue-ease-card">
          <h3>Registered Venues</h3>
          <p>58</p>
        </div>
        <div className="venue-ease-card">
          <h3>Avg. Visit Time</h3>
          <p>123.45</p>
        </div>
      </div>

      <div className="venue-ease-separator"></div>

      <div className="venue-ease-chart-box">
        <h3>Monthly Active Users</h3>
        <div className="venue-ease-chart-placeholder">Chart visualization here</div>
      </div>
    </section>
  );
};

export default AdminDashboard;