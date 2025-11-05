/**
 * Enhanced Service Worker for HouseMate Application
 * Implements intelligent caching strategies, PWA features, and performance optimization
 */

const CACHE_NAME = 'housemate-v2.0.0';
const STATIC_CACHE_NAME = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE_NAME = `${CACHE_NAME}-dynamic`;
const API_CACHE_NAME = `${CACHE_NAME}-api`;

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/HouseMate logo.webp',
  '/HouseMate logo.png',
  '/favicon.svg',
  '/manifest.json',
  '/offline.html'
];

// API endpoints that can be cached
const CACHEABLE_API_PATTERNS = [
  /\/api\/houses/,
  /\/api\/users/,
  /\/api\/tasks/,
  /\/api\/bills/,
  /\/api\/schedule/,
  /\/uploads\/avatars/
];

// Maximum cache sizes (increased for better performance)
const MAX_STATIC_CACHE_SIZE = 100;
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_API_CACHE_SIZE = 30;

// Cache duration (in milliseconds)
const CACHE_DURATION = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  DYNAMIC: 24 * 60 * 60 * 1000, // 1 day
  API: 30 * 60 * 1000, // 30 minutes
  IMAGES: 3 * 24 * 60 * 60 * 1000 // 3 days
};

// Cache strategies
const STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

/**
 * Enhanced Service Worker Installation
 */
self.addEventListener('install', (event) => {
  console.log('🔧 Enhanced Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Preload critical resources
      preloadCriticalResources()
    ]).then(() => {
      console.log('✅ Service Worker installed successfully');
      return self.skipWaiting(); // Take control immediately
    }).catch((error) => {
      console.error('❌ Service Worker installation failed:', error);
    })
  );
});

/**
 * Preload critical resources for better performance
 */
async function preloadCriticalResources() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    
    // Preload critical CSS and JS that are likely to be needed
    const criticalResources = [
      '/assets/css/style.css',
      '/assets/js/index.js'
    ];
    
    // Only cache if resources exist
    for (const resource of criticalResources) {
      try {
        const response = await fetch(resource);
        if (response.ok) {
          await cache.put(resource, response);
        }
      } catch (error) {
        console.warn(`Failed to preload ${resource}:`, error);
      }
    }
  } catch (error) {
    console.warn('Failed to preload critical resources:', error);
  }
}

/**
 * Enhanced Service Worker Activation
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME && 
              cacheName !== API_CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated');
      return self.clients.claim();
    })
  );
});

/**
 * Fetch Event Handler - Main caching logic
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleRequest(request));
});

/**
 * Handle different types of requests with appropriate caching strategies
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Static assets (Cache First strategy)
    if (isStaticAsset(url)) {
      return await cacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // API requests (Network First with cache fallback)
    if (isAPIRequest(url)) {
      return await networkFirst(request, API_CACHE_NAME);
    }
    
    // Images and media (Cache First with network fallback)
    if (isMediaAsset(url)) {
      return await cacheFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // HTML pages (Network First for freshness)
    if (isHTMLRequest(request)) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // Everything else (Network First)
    return await networkFirst(request, DYNAMIC_CACHE_NAME);
    
  } catch (error) {
    console.error('❌ Request handling failed:', error);
    return new Response('Network Error', { status: 503 });
  }
}

/**
 * Cache First Strategy - Try cache, fall back to network
 */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone response before caching
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
      
      // Maintain cache size limits
      await limitCacheSize(cacheName, getMaxCacheSize(cacheName));
    }
    
    return networkResponse;
  } catch (error) {
    // Return cached version if network fails
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

/**
 * Network First Strategy - Try network, fall back to cache
 */
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      
      // Add timestamp for expiration
      const responseWithTimestamp = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: {
          ...Object.fromEntries(responseClone.headers.entries()),
          'sw-cache-timestamp': Date.now().toString()
        }
      });
      
      await cache.put(request, responseWithTimestamp);
      await limitCacheSize(cacheName, getMaxCacheSize(cacheName));
    }
    
    return networkResponse;
  } catch (error) {
    // Fall back to cache if network fails
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Check if response is expired based on cache duration
 */
function isExpired(response) {
  const timestamp = response.headers.get('sw-cache-timestamp');
  if (!timestamp) return false;
  
  const cacheTime = parseInt(timestamp);
  const now = Date.now();
  const maxAge = CACHE_DURATION.STATIC; // Default to static cache duration
  
  return (now - cacheTime) > maxAge;
}

/**
 * Limit cache size to prevent storage bloat
 */
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    // Remove oldest entries
    const entriesToDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(entriesToDelete.map(key => cache.delete(key)));
  }
}

/**
 * Get maximum cache size for a given cache
 */
function getMaxCacheSize(cacheName) {
  if (cacheName.includes('static')) return MAX_STATIC_CACHE_SIZE;
  if (cacheName.includes('api')) return MAX_API_CACHE_SIZE;
  return MAX_DYNAMIC_CACHE_SIZE;
}

/**
 * Utility functions to identify request types
 */
function isStaticAsset(url) {
  return url.pathname.match(/\.(js|css|woff|woff2|ttf|eot)$/);
}

function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') || 
         CACHEABLE_API_PATTERNS.some(pattern => pattern.test(url.pathname));
}

function isMediaAsset(url) {
  return url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|pdf)$/);
}

function isHTMLRequest(request) {
  return request.headers.get('Accept')?.includes('text/html');
}

/**
 * Message handling for cache management
 */
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'CLEAR_CACHE':
      clearCache(payload?.cacheName);
      break;
      
    case 'CACHE_STATS':
      getCacheStats().then(stats => {
        event.ports[0]?.postMessage({ type: 'CACHE_STATS_RESPONSE', payload: stats });
      });
      break;
      
    case 'PREFETCH_ROUTES':
      prefetchRoutes(payload?.routes || []);
      break;
      
    default:
      console.log('Unknown message type:', type);
  }
});

/**
 * Clear specific cache or all caches
 */
async function clearCache(cacheName) {
  if (cacheName) {
    await caches.delete(cacheName);
    console.log(`🗑️ Cleared cache: ${cacheName}`);
  } else {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('🗑️ Cleared all caches');
  }
}

/**
 * Get cache statistics
 */
async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    stats[cacheName] = keys.length;
  }
  
  return stats;
}

/**
 * Prefetch important routes
 */
async function prefetchRoutes(routes) {
  console.log('📡 Prefetching routes:', routes);
  
  for (const route of routes) {
    try {
      await fetch(route);
      console.log(`✅ Prefetched: ${route}`);
    } catch (error) {
      console.warn(`❌ Failed to prefetch: ${route}`, error);
    }
  }
}

console.log('🎯 HouseMate Service Worker ready');