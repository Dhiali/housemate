
import { useState, lazy, Suspense, useEffect } from 'react';
import './App.css';
import SplashScreen from './SplashScreen.jsx';
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

// Lazy load the main Auth application
const AuthApp = lazy(() => import('./Auth/src/App.jsx'));

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
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

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div style={{ display: showSplash ? 'none' : 'block' }}>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading HouseMate...</p>
            </div>
          </div>
        }>
          <AuthApp />
        </Suspense>
      </div>
    </>
  );
}

export default App;

