import { useEffect } from 'react';

/**
 * Custom hook to manage page title and meta description
 * @param {string} title - Page title
 * @param {string} description - Page meta description
 * @param {string} keywords - Additional keywords (optional)
 * @param {string} image - OpenGraph image URL (optional)
 * @param {string} imageAlt - Image alt text (optional)
 */
export const useSEO = (title, description, keywords = '', image = '', imageAlt = '') => {
  useEffect(() => {
    // Update page title
    const fullTitle = title ? `${title} | Housemate` : 'Housemate - Split Bills & Manage Shared Living Expenses';
    document.title = fullTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Update meta keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = fullTitle;

    // Update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = description;

    // Update Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = window.location.href;

    // Update Open Graph image if provided
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.content = image;

      // Update Open Graph image alt
      if (imageAlt) {
        let ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
        if (!ogImageAlt) {
          ogImageAlt = document.createElement('meta');
          ogImageAlt.setAttribute('property', 'og:image:alt');
          document.head.appendChild(ogImageAlt);
        }
        ogImageAlt.content = imageAlt;
      }

      // Update Twitter image
      let twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.name = 'twitter:image';
        document.head.appendChild(twitterImage);
      }
      twitterImage.content = image;

      // Update Twitter image alt
      if (imageAlt) {
        let twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');
        if (!twitterImageAlt) {
          twitterImageAlt = document.createElement('meta');
          twitterImageAlt.name = 'twitter:image:alt';
          document.head.appendChild(twitterImageAlt);
        }
        twitterImageAlt.content = imageAlt;
      }
    }

    // Update Twitter title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.name = 'twitter:title';
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.content = fullTitle;

    // Update Twitter description
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.name = 'twitter:description';
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.content = description;

  }, [title, description, keywords, image, imageAlt]);
};

/**
 * SEO configuration for different pages
 */
export const SEO_CONFIG = {
  home: {
    title: 'Home Dashboard',
    description: 'Your Housemate dashboard. View recent activities, upcoming bills, pending tasks, and household statistics all in one place.',
    keywords: 'dashboard, home, overview, household stats, recent activities',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Housemate Dashboard - View household activities and statistics'
  },
  signin: {
    title: 'Sign In',
    description: 'Sign in to your Housemate account to manage your shared living expenses, bills, and household tasks with your roommates.',
    keywords: 'sign in, login, account access, user login',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Sign in to Housemate - Manage shared living expenses'
  },
  signup: {
    title: 'Create Account',
    description: 'Join Housemate and start managing your shared living expenses. Create an account to split bills, track expenses, and organize with roommates.',
    keywords: 'sign up, create account, register, join housemate',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Create Housemate Account - Start managing shared expenses'
  },
  createHouse: {
    title: 'Create Your House',
    description: 'Set up your shared living space on Housemate. Create your house profile and invite roommates to start managing expenses together.',
    keywords: 'create house, setup home, add roommates, household setup',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Create Your House on Housemate - Setup shared living space'
  },
  bills: {
    title: 'Bills & Expenses',
    description: 'Manage and split bills with your housemates. Track shared expenses, utilities, groceries, and other household costs fairly and transparently.',
    keywords: 'bills, expenses, split costs, utilities, groceries, shared expenses',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Housemate Bills - Split expenses with roommates fairly'
  },
  tasks: {
    title: 'Household Tasks',
    description: 'Organize and track household chores and tasks. Assign responsibilities, set deadlines, and keep your shared living space organized.',
    keywords: 'tasks, chores, household duties, cleaning, organization',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Housemate Tasks - Organize household chores and responsibilities'
  },
  housemates: {
    title: 'Housemates',
    description: 'View and manage your housemates. See contact information, track contributions, and manage household member permissions.',
    keywords: 'housemates, roommates, members, household members, contacts',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Manage Housemates - View and organize household members'
  },
  calendar: {
    title: 'Calendar & Events',
    description: 'Stay organized with your household calendar. Track bill due dates, scheduled tasks, events, and important household dates.',
    keywords: 'calendar, events, due dates, schedule, household calendar',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Housemate Calendar - Track household events and due dates'
  },
  settings: {
    title: 'Account Settings',
    description: 'Manage your Housemate account settings, profile information, notification preferences, and household configuration.',
    keywords: 'settings, profile, account, preferences, configuration',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Housemate Settings - Manage account and preferences'
  },
  forgotPassword: {
    title: 'Reset Password',
    description: 'Reset your Housemate account password. Enter your email address to receive password reset instructions.',
    keywords: 'password reset, forgot password, account recovery',
    image: 'https://housemate.website/og-image.svg',
    imageAlt: 'Reset Housemate Password - Recover your account'
  }
};

export default useSEO;