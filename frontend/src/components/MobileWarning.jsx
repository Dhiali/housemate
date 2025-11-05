import React from 'react';
import { Monitor, Tablet, Smartphone, AlertTriangle } from 'lucide-react';

/**
 * MobileWarning Component
 * Displays a full-screen warning when users try to access the dashboard from a mobile phone
 */
const MobileWarning = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/20">
          {/* Warning Icon */}
          <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          </div>

          {/* Main Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Desktop Required
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            The HouseMate dashboard is optimized for larger screens and requires a 
            <strong> laptop, desktop, or tablet</strong> for the best experience.
            <br /><br />
            <span className="text-sm text-gray-500">
              Mobile support is coming soon!
            </span>
          </p>

          {/* Device Icons */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Desktop */}
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <Monitor className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-700">Desktop</span>
              <span className="text-xs text-green-600">✓ Supported</span>
            </div>

            {/* Tablet */}
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <Tablet className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-700">Tablet</span>
              <span className="text-xs text-green-600">✓ Supported</span>
            </div>

            {/* Mobile */}
            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <Smartphone className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-red-700">Mobile</span>
              <span className="text-xs text-red-600">✗ Coming Soon</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">How to Access:</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Open HouseMate on your laptop or desktop computer</li>
              <li>• Use a tablet in landscape mode for optimal viewing</li>
              <li>• Ensure your screen width is adequate for the interface</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-4">
              This ensures all features work properly and provides the best user experience.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span>Powered by</span>
              <span className="font-bold text-indigo-600">HouseMate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;