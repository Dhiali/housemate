import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../dashboard/src/components/ui/button';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './useScrollAnimation';
import { Home, CheckSquare, CreditCard, Calendar, Users, ArrowRight, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const LandingPage = () => {
  const navigate = useNavigate();

  // Animations for each section
  const [heroRef, heroControls] = useScrollAnimation();
  const [featuresRef, featuresControls] = useScrollAnimation();
  const [benefitsRef, benefitsControls] = useScrollAnimation();
  const [ctaRef, ctaControls] = useScrollAnimation();

  const handleAuthClick = () => {
    navigate('/auth/signup');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Home size={16} className="text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">HouseMate</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/auth/signin')}
            >
              Sign In
            </Button>
            <Button
              onClick={handleAuthClick}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef} 
        initial="hidden" 
        animate={heroControls} 
        variants={sectionVariants}
        className="flex-1 bg-gradient-to-b from-purple-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl text-gray-900 mb-6">
                Simplify Your Shared Living
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                HouseMate is the all-in-one platform that helps roommates manage household tasks, split bills, and coordinate schedules effortlessly. Say goodbye to awkward conversations and confusion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAuthClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1688549143237-e258a419d200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaGFyZWQlMjBob3VzZSUyMHJvb21tYXRlc3xlbnwxfHx8fDE3NjIxMDUxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern shared house"
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x300/e5e7eb/6b7280?text=Modern+Shared+House';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef} 
        initial="hidden" 
        animate={featuresControls} 
        variants={sectionVariants}
        id="features" 
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">
              Everything You Need to Manage Your Home
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HouseMate brings all your household management tools into one intuitive platform, making shared living harmonious and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={sectionVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Task Management</h3>
              <p className="text-gray-600">
                Create, assign, and track household tasks. Set priorities, due dates, and get reminders so nothing falls through the cracks.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={sectionVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Bill Splitting</h3>
              <p className="text-gray-600">
                Easily split bills, track payments, and see who owes what. Support for equal splits or custom allocations.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={sectionVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Shared Calendar</h3>
              <p className="text-gray-600">
                Coordinate schedules, plan events, and see all household activities in one place. Never miss important dates.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={sectionVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Housemate Profiles</h3>
              <p className="text-gray-600">
                Keep everyone's contact info, preferences, and activity history organized. Know who's responsible for what.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={sectionVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-pink-600" size={24} />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Activity Tracking</h3>
              <p className="text-gray-600">
                See real-time updates on completed tasks, payments made, and upcoming responsibilities for full transparency.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={sectionVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Dashboard Overview</h3>
              <p className="text-gray-600">
                Get a comprehensive view of your household at a glance with stats, upcoming tasks, and recent activity.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose HouseMate */}
      <motion.section 
        ref={benefitsRef} 
        initial="hidden" 
        animate={benefitsControls} 
        variants={sectionVariants}
        className="py-20 bg-purple-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-gray-900 mb-6">
                Why Choose HouseMate?
              </h2>
              <div className="space-y-6">
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={sectionVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-2">Fair & Transparent</h3>
                    <p className="text-gray-600">
                      Keep everyone accountable with clear task assignments and payment tracking. No more disputes about who did what.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={sectionVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-2">Easy to Use</h3>
                    <p className="text-gray-600">
                      Intuitive interface that anyone can use. Set up your household in minutes and start managing tasks right away.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={sectionVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-2">Stay Organized</h3>
                    <p className="text-gray-600">
                      All household information in one place. Never forget a bill due date or whose turn it is to clean the kitchen.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={sectionVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-2">Reduce Conflicts</h3>
                    <p className="text-gray-600">
                      Clear communication and expectations prevent misunderstandings and keep everyone on the same page.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={sectionVariants}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1759661937582-0ccd5dacf20f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMGNoZWNrbGlzdHxlbnwxfHx8fDE3NjIwOTIxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Task management"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x256/e5e7eb/6b7280?text=Task+Management';
                  }}
                />
              </motion.div>
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={sectionVariants}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1634757439914-23b8acb9d411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGJpbGxzJTIwcGF5bWVudHxlbnwxfHx8fDE3NjIxMDUxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Bill payments"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x256/e5e7eb/6b7280?text=Bill+Payments';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef} 
        initial="hidden" 
        animate={ctaControls} 
        variants={sectionVariants}
        className="py-20 bg-gradient-to-br from-purple-600 to-purple-800"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl text-white mb-6">
            Ready to Transform Your Household?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of happy roommates who have simplified their shared living with HouseMate. Get started today for free!
          </p>
          <Button
            onClick={handleAuthClick}
            className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-6 text-lg"
          >
            Get Started Now
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Home size={16} className="text-white" />
                </div>
                <span className="text-xl text-white">HouseMate</span>
              </div>
              <p className="text-sm text-gray-400">
                Simplifying shared living, one household at a time.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-white mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate('/auth/signin')}
                    className="hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleAuthClick}
                    className="hover:text-white transition-colors"
                  >
                    Sign Up
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 HouseMate. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;