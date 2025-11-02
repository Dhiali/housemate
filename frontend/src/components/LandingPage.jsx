import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../dashboard/src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../dashboard/src/components/ui/card';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './useScrollAnimation';
import Footer from './Footer';


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
  const [statsRef, statsControls] = useScrollAnimation();
  const [ctaRef, ctaControls] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/HouseMate logo.png" alt="Housemate Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-bold text-xl text-gray-900">HouseMate</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-purple-600 transition-colors">Benefits</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/auth/signin')} className="text-gray-600 hover:text-purple-600">
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth/signup')} className="bg-purple-600 text-white hover:bg-purple-700 shadow-sm">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef} 
        initial="hidden" 
        animate={heroControls} 
        variants={sectionVariants} 
        className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-16 pb-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-6">
                🏠 The future of shared living
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Simplify Your{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shared Living
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Split bills fairly, track expenses transparently, and manage household tasks effortlessly. 
              Keep your housemates organized and your finances crystal clear.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth/signup')} 
                className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start For Free
                <span className="ml-2">→</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/auth/signin')} 
                className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                Sign In
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                No credit card required
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Free forever
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Setup in 2 minutes
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef} 
        initial="hidden" 
        animate={statsControls} 
        variants={sectionVariants} 
        className="py-16 bg-white border-y border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Happy Housemates' },
              { number: '2,500+', label: 'Houses Managed' },
              { number: '$2M+', label: 'Bills Split Fairly' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={sectionVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef} 
        initial="hidden" 
        animate={featuresControls} 
        variants={sectionVariants} 
        className="py-24 bg-gray-50" 
        id="features"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-6">
              ✨ Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              HouseMate provides all the tools you need to manage shared living spaces effectively and harmoniously.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={sectionVariants}
                className="group"
              >
                <Card className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full group-hover:border-purple-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        ref={benefitsRef} 
        initial="hidden" 
        animate={benefitsControls} 
        variants={sectionVariants} 
        className="py-24 bg-white" 
        id="benefits"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-6">
                🎯 Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform Your Shared Living Experience
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Living with housemates doesn't have to be complicated. HouseMate makes it easy to maintain 
                fairness, transparency, and harmony in your shared living space.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={sectionVariants}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Setup Demo</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-bold">1</span>
                        </div>
                        <span className="font-semibold text-gray-900">Create your house</span>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">Set up your shared living space in seconds</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-bold">2</span>
                        </div>
                        <span className="font-semibold text-gray-900">Invite housemates</span>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">Send invites via email or share a link</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-bold">3</span>
                        </div>
                        <span className="font-semibold text-gray-900">Start managing</span>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">Split bills, assign tasks, stay organized</p>
                    </div>
                  </div>
                </div>
              </div>
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
        className="py-24 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden"
        id="pricing"
      >
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Shared Living?
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of housemates who have already simplified their lives with HouseMate. 
            Start your journey to harmonious shared living today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth/signup')} 
              className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
              <span className="ml-2">→</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/auth/signin')} 
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-all"
            >
              Sign In
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-purple-100">
            <span className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              No credit card required
            </span>
            <span className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Free forever plan
            </span>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;