/**
 * Service Worker Registration and Management
 * Handles SW lifecycle, updates, and communication
 */

let swRegistration = null;

/**
 * Register service worker
 */
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('⚠️ Service Workers not supported');
    return false;
  }

  try {
    swRegistration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('✅ Service Worker registered:', swRegistration);

    // Handle updates
    swRegistration.addEventListener('updatefound', handleUpdate);

    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 New Service Worker activated');
      window.location.reload();
    });

    // Listen for messages from SW
    navigator.serviceWorker.addEventListener('message', handleSWMessage);

    return true;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    return false;
  }
};

/**
 * Handle service worker updates
 */
const handleUpdate = () => {
  const newWorker = swRegistration.installing;
  
  if (newWorker) {
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New content available, show update notification
        showUpdateNotification();
      }
    });
  }
};

/**
 * Handle messages from service worker
 */
const handleSWMessage = (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'CACHE_STATS_RESPONSE':
      console.log('📊 Cache Statistics:', payload);
      break;
    default:
      console.log('SW Message:', event.data);
  }
};

/**
 * Show update notification to user
 */
const showUpdateNotification = () => {
  // You can implement a toast notification here
  if (confirm('🔄 New version available! Reload to update?')) {
    window.location.reload();
  }
};

/**
 * Send message to service worker
 */
export const sendSWMessage = (type, payload = null) => {
  if (swRegistration?.active) {
    swRegistration.active.postMessage({ type, payload });
  }
};

/**
 * Clear application cache
 */
export const clearAppCache = async () => {
  sendSWMessage('CLEAR_CACHE');
  
  // Also clear browser caches
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
  }
  
  console.log('🗑️ Application cache cleared');
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();
    
    messageChannel.port1.onmessage = (event) => {
      if (event.data.type === 'CACHE_STATS_RESPONSE') {
        resolve(event.data.payload);
      }
    };
    
    sendSWMessage('CACHE_STATS');
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(null), 5000);
  });
};

/**
 * Prefetch important routes
 */
export const prefetchRoutes = (routes) => {
  sendSWMessage('PREFETCH_ROUTES', { routes });
};

/**
 * Check if app is running standalone (PWA mode)
 */
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
};

/**
 * Check if device is online
 */
export const isOnline = () => {
  return navigator.onLine;
};

/**
 * Setup offline/online event listeners
 */
export const setupOfflineHandling = () => {
  const handleOnline = () => {
    console.log('🌐 Back online');
    document.body.classList.remove('offline');
    
    // Sync any pending data when back online
    syncPendingData();
  };
  
  const handleOffline = () => {
    console.log('📡 Gone offline');
    document.body.classList.add('offline');
    
    // Show offline indicator
    showOfflineNotification();
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Initial check
  if (!isOnline()) {
    handleOffline();
  }
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

/**
 * Show offline notification
 */
const showOfflineNotification = () => {
  // Create offline indicator if it doesn't exist
  let offlineIndicator = document.getElementById('offline-indicator');
  
  if (!offlineIndicator) {
    offlineIndicator = document.createElement('div');
    offlineIndicator.id = 'offline-indicator';
    offlineIndicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #f59e0b;
      color: white;
      padding: 8px;
      text-align: center;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    `;
    offlineIndicator.textContent = '📡 You are currently offline. Some features may be limited.';
    document.body.appendChild(offlineIndicator);
  }
  
  // Show the indicator
  requestAnimationFrame(() => {
    offlineIndicator.style.transform = 'translateY(0)';
  });
};

/**
 * Hide offline notification
 */
const hideOfflineNotification = () => {
  const offlineIndicator = document.getElementById('offline-indicator');
  if (offlineIndicator) {
    offlineIndicator.style.transform = 'translateY(-100%)';
    setTimeout(() => offlineIndicator.remove(), 300);
  }
};

/**
 * Sync pending data when back online
 */
const syncPendingData = async () => {
  try {
    // Implement your sync logic here
    // For example, sync form data, API calls that failed, etc.
    console.log('🔄 Syncing pending data...');
    
    // Hide offline notification
    hideOfflineNotification();
  } catch (error) {
    console.error('❌ Sync failed:', error);
  }
};

/**
 * Performance-focused preloading
 */
export const preloadCriticalResources = () => {
  const criticalRoutes = [
    '/dashboard',
    '/api/users/me',
    '/api/houses',
  ];
  
  prefetchRoutes(criticalRoutes);
};

/**
 * Install prompt handling for PWA
 */
export const setupPWAInstallPrompt = () => {
  let deferredPrompt = null;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button
    showInstallButton(deferredPrompt);
  });
  
  return deferredPrompt;
};

/**
 * Show PWA install button
 */
const showInstallButton = (prompt) => {
  // You can implement a custom install button here
  console.log('📱 PWA install available');
  
  // Example: Add install button to UI
  const installButton = document.createElement('button');
  installButton.textContent = '📱 Install App';
  installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #3b82f6;
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: inherit;
    cursor: pointer;
    z-index: 1000;
    display: none;
  `;
  
  installButton.addEventListener('click', async () => {
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ PWA installed');
      }
      
      installButton.remove();
      deferredPrompt = null;
    }
  });
  
  document.body.appendChild(installButton);
  installButton.style.display = 'block';
};

export default {
  register: registerServiceWorker,
  clearCache: clearAppCache,
  getCacheStats,
  prefetchRoutes,
  setupOfflineHandling,
  preloadCriticalResources,
  setupPWAInstallPrompt,
  isPWA,
  isOnline
};