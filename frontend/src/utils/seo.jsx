import React from 'react';
import { Helmet } from 'react-helmet-async';

// SEO configuration for different pages
export const SEO_PAGES = {
  HOME: {
    title: 'HouseMate - Simplify Your Shared Living Experience',
    description: 'The all-in-one platform for roommates to manage household tasks, split bills, coordinate schedules, and streamline shared living. Free to start!',
    keywords: 'roommate app, shared living, household management, bill splitting, task management, roommate organizer, apartment sharing, house management, expense tracking, roommate coordination',
    canonicalUrl: 'https://www.housemate.website/',
    ogImage: 'https://www.housemate.website/og-home.jpg'
  },
  AUTH_SIGNIN: {
    title: 'Sign In to HouseMate - Access Your Household Dashboard',
    description: 'Sign in to your HouseMate account to manage tasks, track bills, coordinate with roommates, and streamline your shared living experience.',
    keywords: 'housemate login, sign in, roommate dashboard, household access, shared living login',
    canonicalUrl: 'https://www.housemate.website/auth/signin',
    ogImage: 'https://www.housemate.website/og-signin.jpg'
  },
  AUTH_SIGNUP: {
    title: 'Join HouseMate - Create Your Shared Living Account',
    description: 'Create your free HouseMate account and start organizing your shared living space. Manage tasks, split bills, and coordinate with roommates effortlessly.',
    keywords: 'housemate signup, create account, join roommates, shared living registration, free roommate app',
    canonicalUrl: 'https://www.housemate.website/auth/signup',
    ogImage: 'https://www.housemate.website/og-signup.jpg'
  },
  AUTH_CREATE_HOUSE: {
    title: 'Create Your Household - HouseMate Setup',
    description: 'Set up your shared living space on HouseMate. Create your household, invite roommates, and start managing your home together.',
    keywords: 'create household, setup house, invite roommates, shared living setup, household management',
    canonicalUrl: 'https://www.housemate.website/auth/create-house',
    ogImage: 'https://www.housemate.website/og-create-house.jpg'
  },
  DASHBOARD_HOME: {
    title: 'Dashboard - HouseMate Household Management',
    description: 'Your household command center. View tasks, track bills, see upcoming events, and manage your shared living space all in one place.',
    keywords: 'household dashboard, roommate management, task overview, bill tracking, shared living control panel',
    canonicalUrl: 'https://www.housemate.website/dashboard',
    ogImage: 'https://www.housemate.website/og-dashboard.jpg'
  },
  DASHBOARD_TASKS: {
    title: 'Tasks - Household Task Management | HouseMate',
    description: 'Organize and track household tasks with your roommates. Assign chores, set deadlines, and keep your shared space organized and clean.',
    keywords: 'household tasks, chore management, roommate chores, task assignment, household organization, cleaning schedule',
    canonicalUrl: 'https://www.housemate.website/dashboard/tasks',
    ogImage: 'https://www.housemate.website/og-tasks.jpg'
  },
  DASHBOARD_BILLS: {
    title: 'Bills - Split Expenses & Track Payments | HouseMate',
    description: 'Easily split bills and track payments with your roommates. Manage rent, utilities, groceries, and shared expenses transparently.',
    keywords: 'bill splitting, expense tracking, roommate bills, shared expenses, payment tracking, utility bills, rent management',
    canonicalUrl: 'https://www.housemate.website/dashboard/bills',
    ogImage: 'https://www.housemate.website/og-bills.jpg'
  },
  DASHBOARD_CALENDAR: {
    title: 'Calendar - Household Events & Schedule | HouseMate',
    description: 'Coordinate schedules and events with your roommates. Plan house meetings, social events, and track important household dates.',
    keywords: 'household calendar, roommate events, shared schedule, house meetings, social planning, event coordination',
    canonicalUrl: 'https://www.housemate.website/dashboard/calendar',
    ogImage: 'https://www.housemate.website/og-calendar.jpg'
  },
  DASHBOARD_HOUSEMATES: {
    title: 'Housemates - Manage Your Household Members | HouseMate',
    description: 'View and manage your household members. See roommate profiles, contact information, and manage roles and permissions.',
    keywords: 'household members, roommate profiles, housemate management, contact information, household roles',
    canonicalUrl: 'https://www.housemate.website/dashboard/housemates',
    ogImage: 'https://www.housemate.website/og-housemates.jpg'
  },
  DASHBOARD_SETTINGS: {
    title: 'Settings - Customize Your HouseMate Experience',
    description: 'Personalize your HouseMate account and household settings. Manage notifications, privacy settings, and household preferences.',
    keywords: 'account settings, household preferences, notification settings, privacy controls, user preferences',
    canonicalUrl: 'https://www.housemate.website/dashboard/settings',
    ogImage: 'https://www.housemate.website/og-settings.jpg'
  }
};

// SEO Component for dynamic meta tags
export const SEO = ({ page, customTitle, customDescription, customKeywords, customImage, noIndex = false }) => {
  const seoData = SEO_PAGES[page] || SEO_PAGES.HOME;
  
  const title = customTitle || seoData.title;
  const description = customDescription || seoData.description;
  const keywords = customKeywords || seoData.keywords;
  const image = customImage || seoData.ogImage;
  const canonicalUrl = seoData.canonicalUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="HouseMate" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="HouseMate" />
    </Helmet>
  );
};

// Structured Data for different page types
export const generateStructuredData = (type, data = {}) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HouseMate",
    "url": "https://www.housemate.website",
    "logo": "https://www.housemate.website/housemate-logo.png",
    "description": "The all-in-one platform for roommates to manage household tasks, split bills, coordinate schedules, and streamline shared living.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.housemate.website/contact"
    },
    "sameAs": [
      "https://twitter.com/housemate_app",
      "https://facebook.com/housemateapp",
      "https://linkedin.com/company/housemate"
    ]
  };

  switch (type) {
    case 'WebApplication':
      return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "HouseMate",
        "url": "https://www.housemate.website",
        "description": "Household management platform for roommates",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        },
        "featureList": [
          "Task Management",
          "Bill Splitting",
          "Calendar Coordination",
          "Household Communication"
        ]
      };
      
    case 'SoftwareApplication':
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "HouseMate",
        "url": "https://www.housemate.website",
        "description": "Comprehensive roommate and household management platform",
        "applicationCategory": "Productivity",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };
      
    case 'BreadcrumbList':
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.breadcrumbs?.map((breadcrumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": breadcrumb.name,
          "item": breadcrumb.url
        })) || []
      };
      
    default:
      return baseData;
  }
};

// SEO utility functions
export const createPageTitle = (pageTitle, includeAppName = true) => {
  return includeAppName ? `${pageTitle} | HouseMate` : pageTitle;
};

export const createMetaDescription = (description, maxLength = 160) => {
  return description.length > maxLength 
    ? description.substring(0, maxLength - 3) + '...'
    : description;
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /auth/create-house
Disallow: /admin/

Sitemap: https://www.housemate.website/sitemap.xml`;
};

export const generateSitemap = () => {
  const pages = [
    { url: 'https://www.housemate.website/', priority: 1.0, changefreq: 'weekly' },
    { url: 'https://www.housemate.website/auth/signin', priority: 0.8, changefreq: 'monthly' },
    { url: 'https://www.housemate.website/auth/signup', priority: 0.9, changefreq: 'monthly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};