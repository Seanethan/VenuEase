import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = ({ admin, onLogout, onViewUsers, onViewVenues, onViewEvents, onViewBookings }) => {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalBookings: 0,
        totalVenues: 0,
        totalEvents: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const [customersRes, bookingsRes, venuesRes, eventsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/customers'),
                axios.get('http://localhost:5000/api/admin/bookings'),
                axios.get('http://localhost:5000/api/admin/venues'),
                axios.get('http://localhost:5000/api/admin/events')
            ]);

            setStats({
                totalCustomers: customersRes.data.length,
                totalBookings: bookingsRes.data.length,
                totalVenues: venuesRes.data.length,
                totalEvents: eventsRes.data.length
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-header-info">
                        <h1>Admin Dashboard</h1>
                        <p>Welcome back, <strong>{admin.full_Name}</strong> ({admin.role})</p>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                {/* Quick Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <h3>{loading ? '...' : stats.totalCustomers}</h3>
                            <p>Total Customers</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-info">
                            <h3>{loading ? '...' : stats.totalBookings}</h3>
                            <p>Total Bookings</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🏢</div>
                        <div className="stat-info">
                            <h3>{loading ? '...' : stats.totalVenues}</h3>
                            <p>Venues</p>
                        </div>
                    </div>
                </div>

                {/* Admin Actions */}
                <div className="admin-actions-grid">
                    <div className="action-card" onClick={onViewUsers}>
                        <div className="action-icon">👥</div>
                        <h3>User Management</h3>
                        <p>Manage customer accounts and staff members</p>
                        <button className="action-btn">Manage Users</button>
                    </div>

                    <div className="action-card" onClick={onViewVenues}>
                        <div className="action-icon">🏢</div>
                        <h3>Venue Management</h3>
                        <p>Add, edit, and manage venue listings</p>
                        <button className="action-btn">Manage Venues</button>
                    </div>

                    <div className="action-card" onClick={onViewBookings}>
                        <div className="action-icon">📅</div>
                        <h3>Booking Management</h3>
                        <p>View and manage all booking requests</p>
                        <button className="action-btn">Manage Bookings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;