import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Users, BarChart3, ClipboardList, DollarSign } from 'lucide-react';

const Button = ({ children, className = '', variant, onClick, ...props }) => {
  const base = 'px-4 py-2 rounded-lg font-medium transition';
  const styles =
    variant === 'outline'
      ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
      : 'bg-purple-600 text-white hover:bg-purple-700';
  return (
    <button className={`${base} ${styles} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth/signup');
  };

  const handleSignIn = () => {
    navigate('/auth/signin');
  };

  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <span className="font-bold">🏠</span>
          </div>
          <h1 className="text-lg font-semibold">HouseMate</h1>
        </div>
        <nav className="flex items-center gap-4">
          <button 
            onClick={handleSignIn}
            className="text-gray-700 hover:text-purple-600 transition-colors"
          >
            Sign In
          </button>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 bg-gradient-to-r from-purple-50 to-white">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">Simplify Your Shared Living</h2>
          <p className="text-gray-600 mb-6">
            HouseMate is the all-in-one platform that helps roommates manage household tasks, split bills, and coordinate schedules effortlessly.
          </p>
          <div className="flex gap-3">
            <Button onClick={handleGetStarted}>Get Started Free →</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=600&q=80"
          alt="Roommates relaxing"
          className="rounded-2xl mt-10 lg:mt-0 shadow-md"
        />
      </section>

      {/* Features Section */}
      <section className="px-8 py-16 text-center">
        <h3 className="text-2xl font-semibold mb-10">Everything You Need to Manage Your Home</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[{
            icon: <ClipboardList className="text-purple-600" size={28} />, title: 'Task Management', desc: 'Create, assign, and track household tasks. Set priorities and get reminders.'
          }, {
            icon: <DollarSign className="text-green-500" size={28} />, title: 'Bill Splitting', desc: 'Easily split bills, track payments, and see who owes what.'
          }, {
            icon: <Calendar className="text-purple-500" size={28} />, title: 'Shared Calendar', desc: 'Coordinate schedules and see all activities in one place.'
          }, {
            icon: <Users className="text-orange-400" size={28} />, title: 'Housemate Profiles', desc: 'Keep contact info and activity history organized.'
          }, {
            icon: <CheckCircle className="text-pink-400" size={28} />, title: 'Activity Tracking', desc: 'Get real-time updates on completed tasks and payments.'
          }, {
            icon: <BarChart3 className="text-blue-500" size={28} />, title: 'Dashboard Overview', desc: 'See a comprehensive view of your household at a glance.'
          }].map((item, index) => (
            <Card key={index} className="p-6 text-left">
              <CardContent className="flex flex-col gap-3">
                {item.icon}
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-8 py-16 bg-purple-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Why Choose HouseMate?</h3>
            <ul className="space-y-4">
              {['Fair & Transparent', 'Easy to Use', 'Stay Organized', 'Reduce Conflicts'].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="text-purple-600" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6">
            <img src="https://images.unsplash.com/photo-1616628188502-7b8ce388e10b?auto=format&fit=crop&w=500&q=80" alt="Checklist" className="rounded-xl shadow-md" />
            <img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=500&q=80" alt="Money house" className="rounded-xl shadow-md" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Household?</h3>
        <p className="mb-8">Join thousands of happy roommates who have simplified their shared living with HouseMate.</p>
        <Button 
          onClick={handleGetStarted}
          className="bg-white text-purple-700 hover:bg-gray-100"
        >
          Get Started Now →
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-8 py-10">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div>
            <h4 className="text-white font-semibold mb-2">HouseMate</h4>
            <p className="text-sm">Simplifying shared living, one household at a time.</p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-2">Product</h5>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>How It Works</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-2">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-2">Account</h5>
            <ul className="space-y-2 text-sm">
              <li><button onClick={handleSignIn} className="hover:text-white transition-colors">Sign In</button></li>
              <li><button onClick={handleGetStarted} className="hover:text-white transition-colors">Sign Up</button></li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-10">© 2025 HouseMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
