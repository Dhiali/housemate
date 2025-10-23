import React, { useState, useEffect } from 'react';

/**
 * OptimizedImage component with WebP support and fallback
 * Automatically serves WebP images when supported, falls back to original format
 * 
 * @param {string} src - Original image source (PNG/JPG)
 * @param {string} webpSrc - WebP version of the image (optional - will be generated from src if not provided)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {function} onError - Error handler
 * @param {object} ...props - Other image props
 */
const OptimizedImage = ({ 
  src, 
  webpSrc, 
  alt = '', 
  className = '', 
  onError,
  loading = 'lazy',
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [webpSupported, setWebpSupported] = useState(null);

  // Generate WebP src if not provided
  const getWebpSrc = (originalSrc) => {
    if (webpSrc) return webpSrc;
    
    // Convert file extension to .webp
    return originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  };

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        setWebpSupported(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    checkWebPSupport();
  }, []);

  const handleImageError = (e) => {
    setImageError(true);
    if (onError) {
      onError(e);
    }
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  // If WebP is supported and no error occurred, try WebP first
  const shouldUseWebP = webpSupported && !imageError;
  const finalSrc = shouldUseWebP ? getWebpSrc(src) : src;

  return (
    <picture>
      {/* WebP source for supported browsers */}
      {webpSupported && !imageError && (
        <source srcSet={getWebpSrc(src)} type="image/webp" />
      )}
      
      {/* Fallback image */}
      <img
        src={finalSrc}
        alt={alt}
        className={className}
        loading={loading}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
    </picture>
  );
};

/**
 * Hook to check if WebP is supported
 * @returns {boolean} WebP support status
 */
export const useWebPSupport = () => {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        setSupported(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    checkWebPSupport();
  }, []);

  return supported;
};

/**
 * Utility function to get WebP version of an image URL
 * @param {string} src - Original image source
 * @returns {string} WebP version of the image
 */
export const getWebPSrc = (src) => {
  return src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
};

/**
 * Higher-order component to add WebP optimization to any image component
 * @param {React.Component} ImageComponent - The image component to enhance
 * @returns {React.Component} Enhanced component with WebP support
 */
export const withWebPOptimization = (ImageComponent) => {
  return ({ src, ...props }) => {
    const webpSupported = useWebPSupport();
    const optimizedSrc = webpSupported && src ? getWebPSrc(src) : src;
    
    return (
      <ImageComponent
        src={optimizedSrc}
        {...props}
        onError={(e) => {
          // Fallback to original if WebP fails
          if (webpSupported && optimizedSrc !== src) {
            e.target.src = src;
          }
          if (props.onError) {
            props.onError(e);
          }
        }}
      />
    );
  };
};

export default OptimizedImage;