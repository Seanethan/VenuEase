import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ switchToLogin, switchToLanding }) => {
    const [formData, setFormData] = useState({
        full_Name: '',
        email: '',
        password: '',
        role: 'staff'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            alert('Registration successful! Please login.');
            switchToLogin();
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <button className="back-btn" onClick={switchToLanding}>← Back</button>
                <div className="logo">VenuEase</div>
            </div>
            
            <div className="auth-form-container">
                <div className="auth-form">
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Join VenuEase today</p>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="full_Name"
                                value={formData.full_Name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Role</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="staff">Staff Member</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                        
                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    
                    <p className="auth-switch">
                        Already have an account? 
                        <span onClick={switchToLogin}> Sign in here</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;