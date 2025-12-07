// C:\VenuEase\frontend\src\components\Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './css/LandingPage.css'; // We'll create this CSS file

const Register = ({ switchToLogin, switchToLanding }) => {
    const [formData, setFormData] = useState({
        full_Name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const userData = {
                full_Name: formData.full_Name,
                email: formData.email,
                password: formData.password
            };

            console.log('🔄 Sending registration:', userData);

            const response = await axios.post('http://localhost:5000/api/customer/register', userData);
            
            console.log('✅ Registration successful:', response.data);
            
            alert('Registration successful! Please login.');
            switchToLogin();
        } catch (error) {
            console.error('❌ Registration failed:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            {/* Title Section */}
            <div className="title">
                <div className="welcome-text center-text">WELCOME TO</div>
                <div className="brand-name center-text">VENUEASE</div>
            </div>

            {/* Main Container */}
            <div className="container">
                <div className="header">
                    {/* Back Button */}
                    <button className="back-button" onClick={switchToLanding}>
                        ←
                    </button>
                </div>

                <div className="form-container">
                    {error && <div className="auth-error center-text">{error}</div>}
                    
                    <form id="signupForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="full_Name"
                                value={formData.full_Name}
                                onChange={handleChange}
                                placeholder="Full Name" 
                                required 
                                className="center-block"
                            />
                        </div>

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

                        <div className="input-group">
                            <input 
                                type="password" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password" 
                                required 
                                className="center-block"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn center-block" 
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'SIGN-UP'}
                        </button>

                        <div className="login-link center-text">
                            Already have an account? <br/>
                            <button 
                                type="button" 
                                onClick={switchToLogin} 
                                className="switch-link"
                            >
                                Log-in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;