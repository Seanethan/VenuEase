import React from 'react';

const Dashboard = ({ user, onLogout }) => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="container">
                    <h1>Welcome to VenuEase, {user.full_Name}!</h1>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </header>
            
            <div className="dashboard-content">
                <div className="container">
                    <div className="user-info">
                        <h2>Your Profile</h2>
                        <p><strong>Name:</strong> {user.full_Name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                    
                    <div className="dashboard-features">
                        <h2>Available Features</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <h3>Venue Booking</h3>
                                <p>Book and manage venue reservations</p>
                            </div>
                            <div className="feature-card">
                                <h3>Event Management</h3>
                                <p>Create and organize events</p>
                            </div>
                            <div className="feature-card">
                                <h3>Payment Processing</h3>
                                <p>Handle payments and invoices</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;