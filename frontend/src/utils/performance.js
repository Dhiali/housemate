import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Performance monitoring utility for Core Web Vitals
 * Tracks key performance metrics and sends them to analytics
 */

// Performance data storage
const performanceData = {
  vitals: {},
  resources: {},
  navigation: {},
  observers: []
};

/**
 * Initialize Web Vitals monitoring
 */
export const initPerformanceMonitoring = () => {
  // Track Core Web Vitals
  onCLS(onVitalMetric);
  onINP(onVitalMetric); // Interaction to Next Paint (replaces FID)
  onFCP(onVitalMetric);
  onLCP(onVitalMetric);
  onTTFB(onVitalMetric);

  // Track additional performance metrics
  trackNavigationTiming();
  trackResourceTiming();
  trackMemoryUsage();
  
  // Setup performance observers
  setupPerformanceObservers();

  console.log('🚀 Performance monitoring initialized');
};

/**
 * Handle Core Web Vitals metrics
 */
const onVitalMetric = (metric) => {
  performanceData.vitals[metric.name] = {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    entries: metric.entries,
    id: metric.id,
    timestamp: Date.now()
  };

  // Log metrics in development
  if (import.meta.env.DEV) {
    console.log(`📊 ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      target: getMetricTarget(metric.name)
    });
  }

  // Send to analytics (implement your analytics endpoint)
  sendToAnalytics(metric);
};

/**
 * Get target values for metrics
 */
const getMetricTarget = (metricName) => {
  const targets = {
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 }, // Interaction to Next Paint
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 }
  };
  return targets[metricName] || {};
};

/**
 * Track Navigation Timing API metrics
 */
const trackNavigationTiming = () => {
  if (!('performance' in window) || !('getEntriesByType' in performance)) {
    return;
  }

  const navigationEntry = performance.getEntriesByType('navigation')[0];
  if (navigationEntry) {
    performanceData.navigation = {
      domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.navigationStart,
      loadComplete: navigationEntry.loadEventEnd - navigationEntry.navigationStart,
      dnsLookup: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
      tcpConnect: navigationEntry.connectEnd - navigationEntry.connectStart,
      request: navigationEntry.responseEnd - navigationEntry.requestStart,
      response: navigationEntry.responseEnd - navigationEntry.responseStart,
      domProcessing: navigationEntry.domComplete - navigationEntry.domLoading,
      timestamp: Date.now()
    };
  }
};

/**
 * Track Resource Timing for critical assets
 */
const trackResourceTiming = () => {
  if (!('performance' in window) || !('getEntriesByType' in performance)) {
    return;
  }

  const resourceEntries = performance.getEntriesByType('resource');
  const criticalResources = resourceEntries.filter(entry => {
    return entry.name.includes('.js') || 
           entry.name.includes('.css') || 
           entry.name.includes('.webp') || 
           entry.name.includes('.png') ||
           entry.name.includes('main.jsx');
  });

  performanceData.resources = criticalResources.map(entry => ({
    name: entry.name.split('/').pop(),
    duration: entry.duration,
    size: entry.transferSize || 0,
    type: entry.initiatorType,
    cached: entry.transferSize === 0 && entry.decodedBodySize > 0,
    timestamp: Date.now()
  }));
};

/**
 * Track memory usage (if available)
 */
const trackMemoryUsage = () => {
  if ('memory' in performance) {
    performanceData.memory = {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      timestamp: Date.now()
    };
  }
};

/**
 * Setup Performance Observers for ongoing monitoring
 */
const setupPerformanceObservers = () => {
  // Observer for Long Tasks (potential performance issues)
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const longTasks = list.getEntries();
        longTasks.forEach(task => {
          if (task.duration > 50) { // Tasks longer than 50ms
            console.warn('⚠️ Long Task detected:', {
              duration: task.duration,
              startTime: task.startTime,
              attribution: task.attribution
            });
          }
        });
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });
      performanceData.observers.push(longTaskObserver);
    } catch (e) {
      // Long task observer not supported
    }

    // Observer for Layout Shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        const shifts = list.getEntries();
        shifts.forEach(shift => {
          if (shift.value > 0.1) { // Significant layout shift
            console.warn('⚠️ Layout Shift detected:', {
              value: shift.value,
              sources: shift.sources
            });
          }
        });
      });

      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      performanceData.observers.push(layoutShiftObserver);
    } catch (e) {
      // Layout shift observer not supported
    }
  }
};

/**
 * Send metrics to analytics service
 */
const sendToAnalytics = (metric) => {
  // In production, you would send this to your analytics service
  // Example: Google Analytics, Mixpanel, custom endpoint
  
  if (import.meta.env.PROD) {
    // Example analytics call
    // fetch('/api/analytics/vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: metric.name,
    //     value: metric.value,
    //     rating: metric.rating,
    //     url: window.location.href,
    //     userAgent: navigator.userAgent,
    //     timestamp: Date.now()
    //   })
    // }).catch(console.error);
  }
};

/**
 * Get current performance summary
 */
export const getPerformanceSummary = () => {
  return {
    ...performanceData,
    summary: {
      totalMetrics: Object.keys(performanceData.vitals).length,
      goodMetrics: Object.values(performanceData.vitals).filter(m => m.rating === 'good').length,
      poorMetrics: Object.values(performanceData.vitals).filter(m => m.rating === 'needs-improvement' || m.rating === 'poor').length,
      criticalResources: performanceData.resources.length,
      memoryUsage: performanceData.memory?.usedJSHeapSize || 'N/A'
    }
  };
};

/**
 * Performance diagnostic utility
 */
export const runPerformanceDiagnostics = () => {
  const summary = getPerformanceSummary();
  
  console.group('🔍 Performance Diagnostics');
  console.log('Core Web Vitals:', summary.vitals);
  console.log('Navigation Timing:', summary.navigation);
  console.log('Resource Performance:', summary.resources);
  console.log('Memory Usage:', summary.memory);
  console.log('Summary:', summary.summary);
  console.groupEnd();

  return summary;
};

/**
 * Cleanup performance observers
 */
export const cleanupPerformanceMonitoring = () => {
  performanceData.observers.forEach(observer => {
    observer.disconnect();
  });
  performanceData.observers = [];
  console.log('🧹 Performance monitoring cleaned up');
};

// Utility to track custom performance marks
export const markPerformance = (markName) => {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(markName);
  }
};

// Utility to measure between performance marks
export const measurePerformance = (measureName, startMark, endMark) => {
  if ('performance' in window && 'measure' in performance) {
    try {
      performance.measure(measureName, startMark, endMark);
      const measure = performance.getEntriesByName(measureName, 'measure')[0];
      if (import.meta.env.DEV) {
        console.log(`⏱️ ${measureName}: ${measure.duration.toFixed(2)}ms`);
      }
      return measure.duration;
    } catch (e) {
      console.warn('Performance measurement failed:', e);
    }
  }
};

export default {
  init: initPerformanceMonitoring,
  getSummary: getPerformanceSummary,
  runDiagnostics: runPerformanceDiagnostics,
  cleanup: cleanupPerformanceMonitoring,
  mark: markPerformance,
  measure: measurePerformance
};