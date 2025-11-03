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
              <h4>Fair & Transparent</h4>
              <p>Keep everyone accountable with clear task assignments and payment tracking. No more disputes about who did what.</p>
            </div>
            
            <div className="benefit">
              <h4>Easy to Use</h4>
              <p>Intuitive interface that anyone can use. Set up your household in minutes and start managing tasks right away.</p>
            </div>
            
            <div className="benefit">
              <h4>Stay Organized</h4>
              <p>All household information in one place. Never forget a bill due date or whose turn it is to clean the kitchen.</p>
            </div>
            
            <div className="benefit">
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
          <button className="btn primary large" onClick={handleGetStarted}>Get Started Now</button>
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
                <li><a href="#pricing">Pricing</a></li>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
