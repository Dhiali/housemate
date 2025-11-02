import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Auth/src/components/ui/button';

const Footer = () => {
  const navigate = useNavigate();

  const socialLinks = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/housemateapp',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: 'https://facebook.com/housemateapp',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/housemateapp',
      color: 'hover:text-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/company/housemateapp',
      color: 'hover:text-blue-700'
    }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { name: 'Pricing', onClick: () => console.log('Pricing coming soon') },
        { name: 'Updates', onClick: () => console.log('Updates coming soon') }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', onClick: () => console.log('Help Center coming soon') },
        { name: 'Contact Us', onClick: () => console.log('Contact coming soon') },
        { name: 'Bug Reports', onClick: () => console.log('Bug reports coming soon') }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', onClick: () => console.log('Privacy Policy coming soon') },
        { name: 'Terms of Service', onClick: () => console.log('Terms coming soon') },
        { name: 'Cookie Policy', onClick: () => console.log('Cookie Policy coming soon') }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏠</span>
              </div>
              <span className="text-xl font-bold text-white">Housemate</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Simplifying shared living with transparent bill splitting, expense tracking, and household management.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-200 text-xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={link.onClick}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h3>
            <p className="text-gray-400 mb-6">Join your housemates on Housemate today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/auth/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Sign Up Free
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth/signin')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">About Housemate</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <h4 className="text-white font-semibold mb-2">Our Mission</h4>
                <p>To make shared living harmonious and stress-free by providing transparent tools for managing household finances and responsibilities.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Our Values</h4>
                <p>Transparency, fairness, simplicity, and trust. We believe good roommate relationships start with clear communication.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Our Promise</h4>
                <p>Always free for basic features, secure with your data, and continuously improving based on user feedback.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Housemate. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => console.log('About Us coming soon')}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              About Us
            </button>
            <button
              onClick={() => console.log('Careers coming soon')}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Careers
            </button>
            <button
              onClick={() => console.log('Press coming soon')}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Press
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;