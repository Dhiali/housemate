/**
 * Device Detection Utilities
 * Provides functions to detect device types and screen sizes
 */

/**
 * Detect if the current device is a mobile phone
 * @returns {boolean} true if mobile phone, false otherwise
 */
export const isMobilePhone = () => {
  // Check user agent for mobile indicators
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Mobile phone patterns
  const mobilePatterns = [
    /android/i,
    /webos/i,
    /iphone/i,
    /ipod/i,
    /blackberry/i,
    /iemobile/i,
    /opera mini/i
  ];
  
  // Check if any mobile pattern matches
  const isMobileUA = mobilePatterns.some(pattern => pattern.test(userAgent));
  
  // Check screen size (mobile phones typically have width <= 768px)
  const isMobileScreen = window.innerWidth <= 768;
  
  // Additional check for touch device with small screen
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768 && window.innerHeight <= 1024;
  
  // More specific mobile phone detection
  // Exclude tablets by checking aspect ratio and screen size
  const isTablet = (window.innerWidth >= 768 && window.innerWidth <= 1024) || 
                   (window.innerHeight >= 768 && window.innerHeight <= 1024);
  
  return (isMobileUA || (isMobileScreen && isTouchDevice)) && !isTablet;
};

/**
 * Detect if the current device is a tablet
 * @returns {boolean} true if tablet, false otherwise
 */
export const isTablet = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Tablet specific patterns
  const tabletPatterns = [
    /ipad/i,
    /android(?!.*mobile)/i,
    /tablet/i
  ];
  
  const isTabletUA = tabletPatterns.some(pattern => pattern.test(userAgent));
  
  // Screen size check for tablets (typically 768px - 1024px)
  const isTabletScreen = (window.innerWidth >= 768 && window.innerWidth <= 1024) ||
                         (window.innerHeight >= 768 && window.innerHeight <= 1024);
  
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isTabletUA || (isTabletScreen && isTouchDevice);
};

/**
 * Detect if the current device is a desktop/laptop
 * @returns {boolean} true if desktop, false otherwise
 */
export const isDesktop = () => {
  return !isMobilePhone() && !isTablet();
};

/**
 * Get device type as string
 * @returns {string} 'mobile', 'tablet', or 'desktop'
 */
export const getDeviceType = () => {
  if (isMobilePhone()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

/**
 * Check if device is allowed for dashboard access
 * Dashboard should only be accessible on tablets and desktops
 * @returns {boolean} true if device is allowed, false otherwise
 */
export const isDashboardAllowed = () => {
  return !isMobilePhone();
};

/**
 * Get screen size category
 * @returns {string} 'small', 'medium', 'large', or 'xlarge'
 */
export const getScreenSize = () => {
  const width = window.innerWidth;
  
  if (width < 640) return 'small';      // Mobile phones
  if (width < 768) return 'medium';     // Large phones
  if (width < 1024) return 'large';     // Tablets
  return 'xlarge';                      // Desktops
};

/**
 * Add event listener for device orientation/resize changes
 * @param {function} callback - Function to call when device changes
 * @returns {function} cleanup function to remove listeners
 */
export const onDeviceChange = (callback) => {
  const handleChange = () => {
    callback({
      deviceType: getDeviceType(),
      isDashboardAllowed: isDashboardAllowed(),
      screenSize: getScreenSize(),
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  window.addEventListener('resize', handleChange);
  window.addEventListener('orientationchange', handleChange);

  return () => {
    window.removeEventListener('resize', handleChange);
    window.removeEventListener('orientationchange', handleChange);
  };
};