import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../utils';

// Optimized Image Component with responsive images and lazy loading
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
  priority = false,
  loading = "lazy",
  aspectRatio,
  fallbackSrc,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  const imgRef = useRef();
  const observerRef = useRef();

  // Generate responsive image URLs (if using a CDN that supports it)
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    // This would work with image CDNs like Cloudinary, Imagekit, etc.
    const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536];
    return breakpoints
      .map(bp => `${baseSrc}?w=${bp}&q=${quality} ${bp}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || currentSrc) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, priority, currentSrc]);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  // Handle image error
  const handleError = (e) => {
    setIsError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsError(false);
    }
    onError?.(e);
  };

  // Generate responsive classes
  const imageClasses = cn(
    "transition-opacity duration-300",
    {
      "opacity-100": isLoaded,
      "opacity-0": !isLoaded,
      "aspect-square": aspectRatio === "square",
      "aspect-video": aspectRatio === "video", 
      "aspect-[4/3]": aspectRatio === "4/3",
      "aspect-[3/2]": aspectRatio === "3/2",
      "aspect-[16/10]": aspectRatio === "16/10",
    },
    className
  );

  // Placeholder while loading
  const PlaceholderComponent = () => (
    <div 
      className={cn(
        "bg-gray-200 animate-pulse flex items-center justify-center",
        imageClasses
      )}
      style={{ width, height }}
    >
      <svg 
        className="w-8 h-8 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
    </div>
  );

  // Error state
  if (isError && !fallbackSrc) {
    return (
      <div 
        className={cn(
          "bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500",
          imageClasses
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className="relative">
      {/* Placeholder */}
      {!isLoaded && <PlaceholderComponent />}
      
      {/* Actual Image */}
      {currentSrc && (
        <img
          src={currentSrc}
          srcSet={generateSrcSet(currentSrc)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
};

// Avatar component optimized for performance
export const OptimizedAvatar = ({ 
  src, 
  alt, 
  size = "md",
  fallback,
  className = "",
  ...props 
}) => {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8", 
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20"
  };

  const avatarClasses = cn(
    "rounded-full object-cover bg-gray-200",
    sizeClasses[size],
    className
  );

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={avatarClasses}
      aspectRatio="square"
      fallbackSrc={fallback}
      loading="eager" // Avatars are usually above the fold
      {...props}
    />
  );
};

// Icon component with lazy loading for large icon sets
export const OptimizedIcon = ({ 
  name, 
  size = 24, 
  className = "",
  fallback = null,
  ...props 
}) => {
  const [IconComponent, setIconComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadIcon = async () => {
      try {
        // Dynamic import for tree shaking - only load needed icons
        const iconModule = await import(`lucide-react`);
        const Icon = iconModule[name];
        
        if (isMounted && Icon) {
          setIconComponent(() => Icon);
        }
      } catch (error) {
        console.warn(`Icon "${name}" not found`);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadIcon();

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (isLoading) {
    return (
      <div 
        className={cn("animate-pulse bg-gray-200 rounded", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  if (!IconComponent) {
    return fallback || (
      <div 
        className={cn("bg-gray-300 rounded flex items-center justify-center", className)}
        style={{ width: size, height: size }}
      >
        ?
      </div>
    );
  }

  return (
    <IconComponent 
      size={size}
      className={className}
      {...props}
    />
  );
};

// Logo component with multiple format support
export const OptimizedLogo = ({ 
  className = "",
  size = "md",
  variant = "default",
  ...props 
}) => {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const logoSrc = `/assets/img/housemate-logo${variant !== 'default' ? `-${variant}` : ''}.png`;

  return (
    <OptimizedImage
      src={logoSrc}
      alt="HouseMate Logo"
      className={cn(sizeClasses[size], className)}
      priority={true} // Logo is usually critical
      loading="eager"
      {...props}
    />
  );
};

export default {
  Image: OptimizedImage,
  Avatar: OptimizedAvatar,
  Icon: OptimizedIcon,
  Logo: OptimizedLogo
};