import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Auth/src/components/ui/button';
import Footer from './Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '💰',
      title: 'Split Bills Fairly',
      description: 'Automatically calculate and split shared expenses among housemates. No more awkward money conversations.'
    },
    {
      icon: '📊',
      title: 'Track Expenses',
      description: 'Keep detailed records of all household expenses. See who paid what and when with complete transparency.'
    },
    {
      icon: '✅',
      title: 'Manage Tasks',
      description: 'Assign and track household chores and responsibilities. Everyone knows what needs to be done.'
    },
    {
      icon: '🏠',
      title: 'Organize Your Home',
      description: 'Create a harmonious living environment with clear communication and shared accountability.'
    },
    {
      icon: '📱',
      title: 'Easy to Use',
      description: 'Simple, intuitive interface that makes managing shared living effortless for everyone.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and secure. Only your housemates can see shared information.'
    }
  ];

  const benefits = [
    'Eliminate awkward money conversations',
    'Ensure fair distribution of expenses',
    'Keep everyone accountable for chores',
    'Maintain transparent financial records',
    'Reduce household conflicts',
    'Save time on expense calculations'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏠</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Housemate</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth/signin')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simplify <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Shared Living</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Split bills, track expenses, and manage household tasks effortlessly. 
            Keep your housemates organized and your finances transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth/signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            >
              Start For Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/auth/signin')}
              className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-gray-400"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Housemate provides all the tools you need to manage shared living spaces effectively.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Housemate?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Living with housemates doesn't have to be complicated. Housemate makes it easy to maintain 
                fairness, transparency, and harmony in your shared living space.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Monthly Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Rent</span>
                    <span className="font-semibold">$400.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Utilities</span>
                    <span className="font-semibold">$75.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Groceries</span>
                    <span className="font-semibold">$120.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pt-4 border-t-2 border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-green-600">$595.00</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Simplify Your Shared Living?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of housemates who have already made their lives easier with Housemate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth/signup')}
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/auth/signin')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Sign In
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-4">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;