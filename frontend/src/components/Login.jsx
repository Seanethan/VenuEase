// C:\VenuEase\frontend\src\components\Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './css/LandingPage.css';

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
            console.log('🔄 Attempting login:', { email: formData.email });
            
            const response = await axios.post('http://localhost:5000/api/customer/login', formData);
            
            console.log('✅ Login successful:', response.data);
            onLogin(response.data.user);
        } catch (error) {
            console.error('❌ Login failed:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Login failed';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Welcome and Brand Name Section (Matching HTML structure) */}
            <div className='title'>
                <div className="welcome-text center-text">WELCOME TO</div>
                <div className="brand-name center-text">VENUEASE</div>
            </div>

            <div className="container">
                <div className="header">
                    {/* Back Button - matching HTML exactly */}
                    <button className="back-button" onClick={switchToLanding}>
                        ←
                    </button>
                </div>

                <div className="form-container">
                    <form id="loginForm" onSubmit={handleSubmit}>
                        {/* Error message - React addition */}
                        {error && <div className="auth-error center-text">{error}</div>}
                        
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email" 
                                required 
                                className="center-block"
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password" 
                                required 
                                className="center-block"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn center-block" 
                            disabled={loading}
                        >
                            {loading ? 'LOGGING IN...' : 'LOGIN'}
                        </button>

                        <div className="signup-link center-text">
                            Don't have an account? <br />
                            <button 
                                type="button" 
                                onClick={switchToRegister} 
                                className="signup-link-btn"
                            >
                                Sign-up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;