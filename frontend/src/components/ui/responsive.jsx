import React from 'react';
import { cn } from '../utils';

// Responsive Grid Component with mobile-first approach
export const ResponsiveGrid = ({ 
  children, 
  className = "",
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = "4",
  ...props 
}) => {
  const gridClasses = cn(
    "grid",
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    `gap-${gap}`,
    className
  );

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

// Responsive Container with consistent padding
export const ResponsiveContainer = ({ 
  children, 
  className = "",
  size = "default",
  ...props 
}) => {
  const containerClasses = cn(
    "w-full mx-auto px-4 sm:px-6",
    {
      "max-w-3xl": size === "sm",
      "max-w-7xl lg:px-8": size === "default",
      "max-w-none px-2 sm:px-4": size === "full",
    },
    className
  );

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

// Responsive Card Component
export const ResponsiveCard = ({ 
  children, 
  className = "",
  padding = "default",
  ...props 
}) => {
  const cardClasses = cn(
    "bg-white rounded-lg shadow-sm border border-gray-200",
    "transition-shadow duration-200 hover:shadow-md",
    {
      "p-3 sm:p-4": padding === "sm",
      "p-4 sm:p-6": padding === "default",
      "p-6 sm:p-8": padding === "lg",
    },
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Responsive Typography Component
export const ResponsiveText = ({ 
  children, 
  as: Component = "p",
  size = "base",
  className = "",
  ...props 
}) => {
  const textClasses = cn(
    {
      "text-xs sm:text-sm": size === "xs",
      "text-sm sm:text-base": size === "sm", 
      "text-base sm:text-lg": size === "base",
      "text-lg sm:text-xl": size === "lg",
      "text-xl sm:text-2xl": size === "xl",
      "text-2xl sm:text-3xl md:text-4xl": size === "2xl",
      "text-3xl sm:text-4xl md:text-5xl": size === "3xl",
    },
    className
  );

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

// Mobile-optimized Button Component
export const ResponsiveButton = ({ 
  children, 
  className = "",
  size = "default",
  fullWidth = false,
  ...props 
}) => {
  const buttonClasses = cn(
    "inline-flex items-center justify-center rounded-md font-medium",
    "transition-colors duration-200 focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "touch-manipulation", // Improves touch responsiveness
    {
      "h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm": size === "sm",
      "h-10 px-4 py-2 text-sm sm:h-11 sm:px-6 sm:text-base": size === "default",
      "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg": size === "lg",
      "w-full": fullWidth,
    },
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

// Responsive Navigation Component
export const ResponsiveNav = ({ 
  children, 
  className = "",
  orientation = "horizontal",
  ...props 
}) => {
  const navClasses = cn(
    "flex",
    {
      "flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4": orientation === "horizontal",
      "flex-col space-y-1": orientation === "vertical",
    },
    className
  );

  return (
    <nav className={navClasses} {...props}>
      {children}
    </nav>
  );
};

// Responsive Sidebar Component
export const ResponsiveSidebar = ({ 
  children, 
  className = "",
  isOpen = false,
  onClose,
  ...props 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0 lg:z-auto",
          "bg-white border-r border-gray-200",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

// Responsive Image Component with lazy loading
export const ResponsiveImage = ({ 
  src,
  alt,
  className = "",
  aspectRatio = "auto",
  loading = "lazy",
  ...props 
}) => {
  const imageClasses = cn(
    "w-full h-auto object-cover",
    {
      "aspect-square": aspectRatio === "square",
      "aspect-video": aspectRatio === "video",
      "aspect-[4/3]": aspectRatio === "4/3",
      "aspect-[3/2]": aspectRatio === "3/2",
    },
    className
  );

  return (
    <img 
      src={src}
      alt={alt}
      loading={loading}
      className={imageClasses}
      {...props}
    />
  );
};

// Responsive Spacing Component
export const ResponsiveSpace = ({ 
  size = "4",
  className = "",
  ...props 
}) => {
  const spaceClasses = cn(
    `h-${size} sm:h-${parseInt(size) + 2} lg:h-${parseInt(size) + 4}`,
    className
  );

  return <div className={spaceClasses} {...props} />;
};

export default {
  Grid: ResponsiveGrid,
  Container: ResponsiveContainer,
  Card: ResponsiveCard,
  Text: ResponsiveText,
  Button: ResponsiveButton,
  Nav: ResponsiveNav,
  Sidebar: ResponsiveSidebar,
  Image: ResponsiveImage,
  Space: ResponsiveSpace
};