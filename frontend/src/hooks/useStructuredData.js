import { useEffect } from 'react';

/**
 * Hook to add JSON-LD structured data for better SEO
 */
export const useStructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Housemate",
      "description": "Split bills and manage shared living expenses with your roommates. Track expenses, organize household tasks, and keep your shared living space organized.",
      "url": "https://housemate.website",
      "logo": "https://housemate.website/favicon.svg",
      "screenshot": "https://housemate.website/og-image.svg",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Housemate App"
      },
      "featureList": [
        "Bill splitting",
        "Expense tracking", 
        "Household task management",
        "Roommate coordination",
        "Shared calendar",
        "Payment tracking"
      ],
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "softwareVersion": "1.0.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "150"
      }
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);
};

export default useStructuredData;