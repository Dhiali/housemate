
import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import SplashScreen from './SplashScreen.jsx';
import { useStructuredData } from './hooks/useStructuredData.js';
import { initPerformanceMonitoring, markPerformance } from './utils/performance.js';
import { 
  registerServiceWorker, 
  setupOfflineHandling, 
  preloadCriticalResources,
  setupPWAInstallPrompt 
} from './utils/serviceWorker.js';
import { createPerformanceDashboard } from './utils/lighthouseOptimization.js';
import analytics from './utils/analytics.js';
import { UserProvider } from './UserContext.jsx';

// Lazy load components
const LandingPage = lazy(() => import('./components/LandingPage.jsx'));
const AuthApp = lazy(() => import('./Auth/src/App-debug.jsx'));
const DashboardApp = lazy(() => import('./dashboard/src/App.jsx'));

function App() {
  // const [showSplash, setShowSplash] = useState(true);
  
  // Initialize performance monitoring and service worker
  useEffect(() => {
    markPerformance('app-start');
    
    // Initialize core services
    const initServices = async () => {
      // Start performance monitoring
      initPerformanceMonitoring();
      
      // Initialize Google Analytics with privacy compliance
      analytics.init();
      
      // Register service worker for caching and offline support
      const swRegistered = await registerServiceWorker();
      if (swRegistered) {
        console.log('🎯 Service Worker active');
        
        // Preload critical resources
        preloadCriticalResources();
      }
      
      // Setup offline/online handling
      const cleanupOfflineHandling = setupOfflineHandling();
      
      // Setup PWA install prompt
      setupPWAInstallPrompt();
      
      // Initialize performance dashboard (dev only)
      if (import.meta.env.DEV) {
        createPerformanceDashboard();
      }
      
      return cleanupOfflineHandling;
    };
    
    let cleanup = null;
    initServices().then(cleanupFn => {
      cleanup = cleanupFn;
    });
    
    // Mark when app is ready
    const handleLoad = () => {
      markPerformance('app-loaded');
      console.log('🚀 HouseMate fully loaded and optimized');
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
      if (cleanup) cleanup();
    };
  }, []);
  
  // Add structured data for SEO
  useStructuredData();

  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading HouseMate...</p>
      </div>
    </div>
  );

  return (
    <UserProvider>
      {/* SplashScreen removed, show app immediately */}
      <div>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Landing page - default route */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Auth routes */}
              <Route path="/auth/*" element={<AuthApp />} />
              
              {/* Dashboard routes - protected */}
              <Route path="/dashboard/*" element={<DashboardApp />} />
              
              {/* Redirect any unknown routes to landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

