/**
 * Google Analytics Integration with Privacy Compliance
 * Implements GA4 tracking with performance optimization and GDPR compliance
 */

// Configuration - Replace with your actual measurement ID
const GA_MEASUREMENT_ID = 'G-DK58VEPXW6'; // Replace with your actual GA4 ID (G-XXXXXXXXXX)
const ANALYTICS_CONFIG = {
  // Privacy settings
  anonymize_ip: true,
  allow_google_signals: false, // Disable by default for privacy
  allow_ad_personalization_signals: false, // Disable by default for privacy
  
  // Performance settings
  send_page_view: true,
  page_title: document.title,
  page_location: window.location.href,
  
  // Custom parameters
  custom_map: {
    'user_type': 'dimension1',
    'house_size': 'dimension2',
    'subscription_status': 'dimension3'
  }
};

// Privacy state management
let analyticsEnabled = false;
let consentGiven = false;

/**
 * Initialize Google Analytics with lazy loading
 */
export const initializeAnalytics = async () => {
  // Check if user has given consent
  const savedConsent = localStorage.getItem('analytics_consent');
  if (savedConsent === 'granted') {
    consentGiven = true;
    await loadGoogleAnalytics();
  } else if (savedConsent === null) {
    // Show consent banner for new users
    showConsentBanner();
  }
  
  console.log('🔍 Analytics initialized (consent required)');
};

/**
 * Load Google Analytics scripts with performance optimization
 */
const loadGoogleAnalytics = async () => {
  if (analyticsEnabled || GA_MEASUREMENT_ID === 'GA_MEASUREMENT_ID') {
    console.warn('⚠️ Analytics: Measurement ID not configured or already loaded');
    return;
  }

  try {
    // Lazy load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => {
      console.log('✅ Google Analytics script loaded');
    };
    script.onerror = () => {
      console.error('❌ Failed to load Google Analytics');
    };
    
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      dataLayer.push(arguments);
    };

    // Configure gtag
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, ANALYTICS_CONFIG);
    
    // Set consent state
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied', // Deny ads by default for privacy
      functionality_storage: 'granted',
      personalization_storage: 'denied'
    });

    analyticsEnabled = true;
    console.log('🔍 Google Analytics initialized successfully');
    
    // Track initial page view
    trackPageView();
    
  } catch (error) {
    console.error('❌ Analytics initialization failed:', error);
  }
};

/**
 * Track page views
 */
export const trackPageView = (pagePath = null, pageTitle = null) => {
  if (!analyticsEnabled || !window.gtag) return;

  const page_location = pagePath ? `${window.location.origin}${pagePath}` : window.location.href;
  const page_title = pageTitle || document.title;
  
  gtag('config', GA_MEASUREMENT_ID, {
    page_location,
    page_title,
    send_page_view: true
  });
  
  console.log('📊 Page view tracked:', { page_location, page_title });
};

/**
 * Track custom events
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (!analyticsEnabled || !window.gtag) {
    console.log('📊 Event queued (analytics disabled):', eventName, parameters);
    return;
  }

  // Add default parameters
  const eventData = {
    event_category: 'app_interaction',
    event_label: parameters.label || '',
    value: parameters.value || 0,
    ...parameters
  };

  gtag('event', eventName, eventData);
  console.log('📊 Event tracked:', eventName, eventData);
};

/**
 * Track user authentication events
 */
export const trackAuth = {
  signUp: (method = 'email') => {
    trackEvent('sign_up', {
      method,
      event_category: 'authentication'
    });
  },
  
  signIn: (method = 'email') => {
    trackEvent('login', {
      method,
      event_category: 'authentication'
    });
  },
  
  signOut: () => {
    trackEvent('logout', {
      event_category: 'authentication'
    });
  },
  
  passwordReset: () => {
    trackEvent('password_reset', {
      event_category: 'authentication'
    });
  }
};

/**
 * Track household management events
 */
export const trackHousehold = {
  createHouse: (houseSize) => {
    trackEvent('create_house', {
      event_category: 'household',
      house_size: houseSize,
      value: 1
    });
  },
  
  inviteUser: (role) => {
    trackEvent('invite_user', {
      event_category: 'household',
      user_role: role
    });
  },
  
  joinHouse: () => {
    trackEvent('join_house', {
      event_category: 'household',
      value: 1
    });
  }
};

/**
 * Track bill management events
 */
export const trackBills = {
  createBill: (amount, category) => {
    trackEvent('create_bill', {
      event_category: 'bills',
      bill_category: category,
      currency: 'USD',
      value: parseFloat(amount) || 0
    });
  },
  
  payBill: (amount, method) => {
    trackEvent('pay_bill', {
      event_category: 'bills',
      payment_method: method,
      currency: 'USD',
      value: parseFloat(amount) || 0
    });
  },
  
  splitExpense: (amount, participants) => {
    trackEvent('split_expense', {
      event_category: 'bills',
      participant_count: participants,
      currency: 'USD',
      value: parseFloat(amount) || 0
    });
  }
};

/**
 * Track task management events
 */
export const trackTasks = {
  createTask: (category, assignee) => {
    trackEvent('create_task', {
      event_category: 'tasks',
      task_category: category,
      has_assignee: !!assignee
    });
  },
  
  completeTask: (category, timeSpent) => {
    trackEvent('complete_task', {
      event_category: 'tasks',
      task_category: category,
      completion_time: timeSpent
    });
  },
  
  assignTask: (category) => {
    trackEvent('assign_task', {
      event_category: 'tasks',
      task_category: category
    });
  }
};

/**
 * Track app performance and errors
 */
export const trackPerformance = {
  pageLoadTime: (loadTime, pageName) => {
    trackEvent('page_load_time', {
      event_category: 'performance',
      page_name: pageName,
      load_time: Math.round(loadTime),
      value: Math.round(loadTime)
    });
  },
  
  error: (errorType, errorMessage) => {
    trackEvent('app_error', {
      event_category: 'error',
      error_type: errorType,
      error_message: errorMessage.substring(0, 100) // Limit length
    });
  },
  
  apiResponse: (endpoint, responseTime, status) => {
    trackEvent('api_performance', {
      event_category: 'performance',
      api_endpoint: endpoint,
      response_time: Math.round(responseTime),
      status_code: status
    });
  }
};

/**
 * Enhanced ecommerce tracking for subscription features
 */
export const trackEcommerce = {
  viewPlan: (planName, planPrice) => {
    trackEvent('view_item', {
      event_category: 'ecommerce',
      currency: 'USD',
      value: planPrice,
      items: [{
        item_id: `plan_${planName.toLowerCase()}`,
        item_name: planName,
        category: 'subscription',
        price: planPrice,
        quantity: 1
      }]
    });
  },
  
  beginCheckout: (planName, planPrice) => {
    trackEvent('begin_checkout', {
      event_category: 'ecommerce',
      currency: 'USD',
      value: planPrice,
      items: [{
        item_id: `plan_${planName.toLowerCase()}`,
        item_name: planName,
        category: 'subscription',
        price: planPrice,
        quantity: 1
      }]
    });
  },
  
  purchase: (planName, planPrice, transactionId) => {
    trackEvent('purchase', {
      event_category: 'ecommerce',
      transaction_id: transactionId,
      currency: 'USD',
      value: planPrice,
      items: [{
        item_id: `plan_${planName.toLowerCase()}`,
        item_name: planName,
        category: 'subscription',
        price: planPrice,
        quantity: 1
      }]
    });
  }
};

/**
 * Set user properties for better segmentation
 */
export const setUserProperties = (properties) => {
  if (!analyticsEnabled || !window.gtag) return;
  
  gtag('config', GA_MEASUREMENT_ID, {
    user_properties: properties
  });
  
  console.log('👤 User properties set:', properties);
};

/**
 * Privacy and consent management
 */
export const manageConsent = {
  grant: () => {
    localStorage.setItem('analytics_consent', 'granted');
    consentGiven = true;
    
    if (!analyticsEnabled) {
      loadGoogleAnalytics();
    } else {
      // Update consent for already loaded analytics
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        functionality_storage: 'granted'
      });
    }
    
    hideConsentBanner();
    console.log('✅ Analytics consent granted');
  },
  
  deny: () => {
    localStorage.setItem('analytics_consent', 'denied');
    consentGiven = false;
    
    if (analyticsEnabled && window.gtag) {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied'
      });
    }
    
    hideConsentBanner();
    console.log('🚫 Analytics consent denied');
  },
  
  revoke: () => {
    localStorage.removeItem('analytics_consent');
    consentGiven = false;
    
    if (analyticsEnabled && window.gtag) {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied'
      });
    }
    
    console.log('🔄 Analytics consent revoked');
  }
};

/**
 * Show cookie consent banner
 */
const showConsentBanner = () => {
  // Create consent banner
  const banner = document.createElement('div');
  banner.id = 'analytics-consent-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1f2937;
    color: white;
    padding: 16px;
    z-index: 10000;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  banner.innerHTML = `
    <div style="flex: 1; min-width: 300px;">
      <p style="margin: 0; font-size: 14px; line-height: 1.5;">
        We use cookies and analytics to improve your experience and understand how you use our app. 
        <a href="/privacy" style="color: #60a5fa; text-decoration: underline;">Learn more</a>
      </p>
    </div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <button id="analytics-accept" style="
        background: #3b82f6;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      ">Accept</button>
      <button id="analytics-decline" style="
        background: transparent;
        color: #d1d5db;
        border: 1px solid #4b5563;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      ">Decline</button>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  // Add event listeners
  document.getElementById('analytics-accept').addEventListener('click', manageConsent.grant);
  document.getElementById('analytics-decline').addEventListener('click', manageConsent.deny);
};

/**
 * Hide consent banner
 */
const hideConsentBanner = () => {
  const banner = document.getElementById('analytics-consent-banner');
  if (banner) {
    banner.remove();
  }
};

/**
 * Debug utilities
 */
export const analyticsDebug = {
  getStatus: () => ({
    enabled: analyticsEnabled,
    consentGiven,
    measurementId: GA_MEASUREMENT_ID,
    gtagLoaded: !!window.gtag
  }),
  
  testEvent: () => {
    trackEvent('test_event', {
      event_category: 'debug',
      test_parameter: 'debug_value'
    });
  },
  
  clearConsent: () => {
    localStorage.removeItem('analytics_consent');
    window.location.reload();
  }
};

// Auto-initialize on import
if (typeof window !== 'undefined') {
  initializeAnalytics();
}

export default {
  init: initializeAnalytics,
  trackPageView,
  trackEvent,
  trackAuth,
  trackHousehold,
  trackBills,
  trackTasks,
  trackPerformance,
  trackEcommerce,
  setUserProperties,
  consent: manageConsent,
  debug: analyticsDebug
};