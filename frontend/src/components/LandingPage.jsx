import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth/signup');
  };

  const handleSignIn = () => {
    navigate('/auth/signin');
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">HouseMate</div>
          <nav className="nav">
            <button className="nav-button" onClick={handleSignIn}>Sign In</button>
            <button className="nav-button primary" onClick={handleGetStarted}>Get Started</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Simplify Your Shared Living</h1>
          <p className="hero-subtitle">
            HouseMate is the all-in-one platform that helps roommates manage household tasks, 
            split bills, and coordinate schedules effortlessly. Say goodbye to awkward conversations and confusion.
          </p>
          <div className="hero-buttons">
            <button className="btn primary" onClick={handleGetStarted}>Get Started Free</button>
            <button className="btn secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Everything You Need to Manage Your Home</h2>
          <p className="features-subtitle">
            HouseMate brings all your household management tools into one intuitive platform, 
            making shared living harmonious and stress-free.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>Task Management</h3>
              <p>Create, assign, and track household tasks. Set priorities, due dates, and get reminders so nothing falls through the cracks.</p>
            </div>
            
            <div className="feature-card">
              <h3>Bill Splitting</h3>
              <p>Easily split bills, track payments, and see who owes what. Support for equal splits or custom allocations.</p>
            </div>
            
            <div className="feature-card">
              <h3>Shared Calendar</h3>
              <p>Coordinate schedules, plan events, and see all household activities in one place. Never miss important dates.</p>
            </div>
            
            <div className="feature-card">
              <h3>Housemate Profiles</h3>
              <p>Keep everyone's contact info, preferences, and address history organized. Know who's responsible for what.</p>
            </div>
            
            <div className="feature-card">
              <h3>Activity Tracking</h3>
              <p>See real-time updates on completed tasks, payments made, and upcoming responsibilities for full transparency.</p>
            </div>
            
            <div className="feature-card">
              <h3>Dashboard Overview</h3>
              <p>Get a comprehensive view of your household at a glance, upcoming tasks, and recent activity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose">
        <div className="container">
          <h2>Why Choose HouseMate?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4>Fair & Transparent</h4>
              <p>Keep everyone accountable with clear task assignments and payment tracking. No more disputes about who did what or when.</p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4>Easy to Use</h4>
              <p>Intuitive interface that anyone can use. Set up your household in minutes and start managing tasks.</p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h4>Stay Organized</h4>
              <p>All household information in one place. Never forget a bill due date or whose turn it is to clean the kitchen.</p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h4>Reduce Conflicts</h4>
              <p>Clear communication and expectations prevent misunderstandings and keep everyone on the same page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Transform Your Household?</h2>
          <p>
            Join thousands of happy roommates who have simplified their shared living with HouseMate. 
            Get started today for free!
          </p>
          <button className="btn primary large" onClick={handleGetStarted}>
            Get Started Now 
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginLeft: '0.5rem'}}>
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>HouseMate</h4>
              <p>Simplify household management, one household at a time</p>
            </div>
            
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Account</h4>
              <ul>
                <li><a href="#sign-up" onClick={handleGetStarted}>Sign Up</a></li>
                <li><a href="#sign-in" onClick={handleSignIn}>Sign In</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 HouseMate. All rights reserved.</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://indeed.com" target="_blank" rel="noopener noreferrer" aria-label="Indeed">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.566 21.563v-8.762c0-.897.221-1.683.663-2.358.442-.675 1.021-1.013 1.737-1.013.716 0 1.295.338 1.737 1.013.442.675.663 1.461.663 2.358v8.762c0 .897-.221 1.683-.663 2.358-.442.675-1.021 1.013-1.737 1.013-.716 0-1.295-.338-1.737-1.013-.442-.675-.663-1.461-.663-2.358zm1.4-19.125c1.274 0 2.306.456 3.096 1.369.79.912 1.185 2.031 1.185 3.356 0 1.325-.395 2.444-1.185 3.356-.79.913-1.822 1.369-3.096 1.369-1.274 0-2.306-.456-3.096-1.369-.79-.912-1.185-2.031-1.185-3.356 0-1.325.395-2.444 1.185-3.356.79-.913 1.822-1.369 3.096-1.369z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
