import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onLoginClick, onSignUpClick }) => {
    return (
        <div className="landing-page">
            {/* Navigation Header */}
            <header className="landing-header">
                <div className="container">
                    <div className="logo">
                        <h1>VenuEase</h1>
                    </div>
                    <nav className="navigation">
                        <a href="#schedules" className="nav-link">Schedules</a>
                        <a href="#places" className="nav-link">Places</a>
                        <a href="#offers" className="nav-link">Offers</a>
                        <button className="login-btn" onClick={onLoginClick}>Log In</button>
                        <button className="signup-btn" onClick={onSignUpClick}>Sign Up</button>
                    </nav>
                </div>
            </header>

            {/* Hero/Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="feature-grid">
                        <div className="feature-item">
                            <h2>Time Efficient</h2>
                            <p>Faster Scheduling</p>
                        </div>
                        <div className="feature-item">
                            <h2>All in one place</h2>
                            <p>Easily view venues, clients, and schedules anytime</p>
                        </div>
                        <div className="feature-item">
                            <h2>Quick Insights</h2>
                            <p>Get automatic booking and income reports</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About VenuEase Section */}
            <section className="about-section">
                <div className="container">
                    <h2 className="about-title">About VenuEase</h2>
                    
                    <div className="venue-scheduling">
                        <h3>VENUE SCHEDULING</h3>
                        <p>
                            LAYING PUSHES TOUCH SIT ASIDE CONNECTIVE AUTHENTIC ELTS. STEP DO EVIDENCE 
                            TEMPLES INCIDENDATE BY MANAGE ET DOLORE MAGNA ALISKA.
                        </p>
                    </div>

                    <div className="venue-scheduling">
                        <h3>VENUE SCHEDULING</h3>
                        <p>
                            LOWER PUSHES DOLOR SIT ASIDE CONNECTIVE AUTHENTIC ELTS. STEP DO EVIDENCE 
                            TEMPLES INCIDENDATE BY MANAGE ET DOLORE MAGNA ALISKA.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <p>&copy; 2024 VenuEase. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;