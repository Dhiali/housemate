import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from './analytics.js';

// SEO Analytics Hook for tracking page views and user engagement
export const useSEOAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    const pageTitle = document.title;
    const pagePath = location.pathname;
    
    // Send page view to Google Analytics
    analytics.trackPageView(pagePath, pageTitle);
    
    // Track SEO specific events
    analytics.trackEvent('seo', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath,
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Update browser history for better SEO
    if (typeof window !== 'undefined') {
      // Update page title for better browser experience
      const appName = 'HouseMate';
      if (!pageTitle.includes(appName) && pageTitle !== 'frontend') {
        document.title = `${pageTitle} | ${appName}`;
      }
    }
  }, [location]);

  // Track user engagement events
  const trackEngagement = (eventName, eventData = {}) => {
    analytics.trackEvent('engagement', eventName, {
      page_path: location.pathname,
      timestamp: new Date().toISOString(),
      ...eventData
    });
  };

  // Track conversion events (signups, house creation, etc.)
  const trackConversion = (conversionType, conversionData = {}) => {
    analytics.trackEvent('conversion', conversionType, {
      page_path: location.pathname,
      timestamp: new Date().toISOString(),
      ...conversionData
    });
  };

  return { trackEngagement, trackConversion };
};

// SEO Performance Monitoring
export const trackSEOPerformance = () => {
  if (typeof window !== 'undefined') {
    // Core Web Vitals tracking for SEO
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          analytics.trackEvent('performance', 'lcp', {
            value: entry.startTime,
            page_path: window.location.pathname
          });
        }
        
        if (entry.entryType === 'first-input') {
          analytics.trackEvent('performance', 'fid', {
            value: entry.processingStart - entry.startTime,
            page_path: window.location.pathname
          });
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

    // Track Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      analytics.trackEvent('performance', 'cls', {
        value: clsValue,
        page_path: window.location.pathname
      });
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
};

// Social Media Sharing Optimization
export const optimizeForSocialSharing = (pageData) => {
  if (typeof window !== 'undefined' && navigator.share) {
    return {
      title: pageData.title,
      text: pageData.description,
      url: window.location.href,
    };
  }
  
  // Fallback for browsers without native sharing
  return {
    shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageData.title)}&url=${encodeURIComponent(window.location.href)}`,
    facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  };
};

// Schema.org Rich Snippets for different page types
export const generateRichSnippets = (pageType, data = {}) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HouseMate",
    "url": "https://www.housemate.website",
    "description": "The all-in-one platform for roommates to manage household tasks, split bills, coordinate schedules, and streamline shared living.",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "HouseMate Team"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  switch (pageType) {
    case 'homepage':
      return {
        ...baseSchema,
        "featureList": [
          "Household Task Management",
          "Bill Splitting & Expense Tracking", 
          "Roommate Communication",
          "Calendar & Event Coordination",
          "Payment Processing",
          "Role-based Access Control"
        ],
        "screenshot": "https://www.housemate.website/app-screenshot.jpg"
      };

    case 'auth':
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${data.pageTitle} - HouseMate`,
        "description": data.description,
        "url": data.canonicalUrl,
        "isPartOf": {
          "@type": "WebSite",
          "name": "HouseMate",
          "url": "https://www.housemate.website"
        }
      };

    default:
      return baseSchema;
  }
};

// Local SEO optimization for shared living apps
export const generateLocalSEO = (location = {}) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "HouseMate",
    "description": "Digital platform for roommate and household management",
    "url": "https://www.housemate.website",
    "telephone": "+1-555-HOUSEMATE",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Digital Platform",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.lat || 40.7128,
      "longitude": location.lng || -74.0060
    },
    "sameAs": [
      "https://twitter.com/housemate_app",
      "https://facebook.com/housemateapp",
      "https://linkedin.com/company/housemate"
    ]
  };
};