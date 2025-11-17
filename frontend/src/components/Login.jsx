import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ switchToRegister, switchToLanding, onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const response = await axios.post('http://localhost:5000/api/login', formData);
            onLogin(response.data.user);
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
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
                    <h2>Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your account</p>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
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
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        
                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    
                    <p className="auth-switch">
                        Don't have an account? 
                        <span onClick={switchToRegister}> Create one here</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;