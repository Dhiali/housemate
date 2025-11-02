import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../dashboard/src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../dashboard/src/components/ui/card';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './useScrollAnimation';
import Footer from './Footer';


const features = [
  {
    icon: '�',
    title: 'Split Bills Fairly',
    description: 'No more awkward money talks. Housemate makes splitting bills effortless and fair.'
  },
  {
    icon: '📊',
    title: 'Track Expenses',
    description: 'Transparent records for every expense. Everyone knows who paid what.'
  },
  {
    icon: '✅',
    title: 'Manage Tasks',
    description: 'Assign chores and responsibilities. Keep your home running smoothly.'
  },
  {
    icon: '🏠',
    title: 'Organize Your Home',
    description: 'A harmonious living environment with clear communication.'
  },
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
  const [ctaRef, ctaControls] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-gray-900">🏠 Housemate</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/auth/signin')} className="text-gray-600">Sign In</Button>
              <Button onClick={() => navigate('/auth/signup')} className="bg-gray-900 text-white">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section ref={heroRef} initial="hidden" animate={heroControls} variants={sectionVariants} className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight text-gray-900">
            Because <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">shared living</span> should be simple.
          </h1>
          <p className="text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Housemate helps you split bills, track expenses, and manage household tasks—no stress, no drama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/signup')} className="bg-gray-900 text-white px-8 py-4 text-lg font-semibold shadow">Start Your Journey</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth/signin')} className="px-8 py-4 text-lg border border-gray-300">Sign In</Button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section ref={featuresRef} initial="hidden" animate={featuresControls} variants={sectionVariants} className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="">
              <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 flex flex-col items-center text-center">
                <span className="text-5xl mb-4">{feature.icon}</span>
                <CardTitle className="text-2xl font-bold mb-2 text-gray-900">{feature.title}</CardTitle>
                <CardContent className="text-gray-600 text-lg">{feature.description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section ref={ctaRef} initial="hidden" animate={ctaControls} variants={sectionVariants} className="py-24 px-6 bg-gradient-to-r from-gray-900 to-gray-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Break the silence, start living better together.</h2>
          <p className="text-xl text-gray-200 mb-8">Join thousands of housemates who have already made their lives easier with Housemate.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/signup')} className="bg-white text-gray-900 px-8 py-4 text-lg font-semibold shadow">Get Started Free</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth/signin')} className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">Sign In</Button>
          </div>
          <p className="text-gray-300 text-sm mt-4">No credit card required • Free forever</p>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;