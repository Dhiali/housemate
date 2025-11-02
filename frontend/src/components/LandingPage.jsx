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
  const [ctaRef, ctaControls] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-card/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <img src="/HouseMate logo.png" alt="Housemate Logo" className="w-8 h-8 rounded-lg object-contain mr-2" />
              <span className="text-xl font-bold text-primary">Housemate</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/auth/signin')} className="text-muted-foreground">Sign In</Button>
              <Button onClick={() => navigate('/auth/signup')} className="bg-primary text-primary-foreground">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section ref={heroRef} initial="hidden" animate={heroControls} variants={sectionVariants} className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Simplify <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Shared Living</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Split bills, track expenses, and manage household tasks effortlessly. Keep your housemates organized and your finances transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/signup')} className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold shadow-md">Start For Free</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth/signin')} className="px-8 py-4 text-lg border border-border">Sign In</Button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section ref={featuresRef} initial="hidden" animate={featuresControls} variants={sectionVariants} className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Housemate provides all the tools you need to manage shared living spaces effectively.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="">
                <Card className="shadow-lg border border-border">
                  <CardHeader className="flex flex-col items-center gap-2">
                    <span className="text-4xl mb-2">{feature.icon}</span>
                    <CardTitle className="text-lg font-semibold text-primary text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-center text-base">{feature.description}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section ref={benefitsRef} initial="hidden" animate={benefitsControls} variants={sectionVariants} className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Why Choose Housemate?</h2>
              <p className="text-lg text-muted-foreground mb-8">Living with housemates doesn't have to be complicated. Housemate makes it easy to maintain fairness, transparency, and harmony in your shared living space.</p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><span className="text-white text-xs">✓</span></div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section ref={ctaRef} initial="hidden" animate={ctaControls} variants={sectionVariants} className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-card mb-6">Ready to Simplify Your Shared Living?</h2>
          <p className="text-xl text-card/80 mb-8">Join thousands of housemates who have already made their lives easier with Housemate.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/signup')} className="bg-card text-primary px-8 py-4 text-lg font-semibold shadow-md">Get Started Free</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth/signin')} className="border border-card text-card hover:bg-card/80 hover:text-primary px-8 py-4 text-lg">Sign In</Button>
          </div>
          <p className="text-card/60 text-sm mt-4">No credit card required • Free forever</p>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;