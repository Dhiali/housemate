#!/usr/bin/env node

/**
 * Sitemap Generator for Housemate App
 * Run this script to automatically update sitemap with current date
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://housemate.website';
const currentDate = new Date().toISOString();

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/signin', priority: '0.8', changefreq: 'monthly' },
  { url: '/signup', priority: '0.8', changefreq: 'monthly' },
  { url: '/forgot-password', priority: '0.6', changefreq: 'monthly' },
  { url: '/dashboard', priority: '0.9', changefreq: 'daily' },
  { url: '/bills', priority: '0.9', changefreq: 'daily' },
  { url: '/tasks', priority: '0.8', changefreq: 'daily' },
  { url: '/calendar', priority: '0.8', changefreq: 'daily' },
  { url: '/housemates', priority: '0.7', changefreq: 'weekly' },
  { url: '/settings', priority: '0.6', changefreq: 'monthly' },
  { url: '/features', priority: '0.7', changefreq: 'monthly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { url: '/terms', priority: '0.4', changefreq: 'yearly' },
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n';

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    
    // Add image for homepage
    if (page.url === '/') {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${baseUrl}/og-image.svg</image:loc>\n`;
      xml += '      <image:title>Housemate - Split Bills &amp; Manage Shared Living Expenses</image:title>\n';
      xml += '      <image:caption>Free bill splitting app for roommates and housemates</image:caption>\n';
      xml += '    </image:image>\n';
    }
    
    xml += '  </url>\n\n';
  });

  xml += '</urlset>';
  
  return xml;
}

function updateSitemap() {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  const sitemapContent = generateSitemap();
  
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log(`✅ Sitemap updated: ${sitemapPath}`);
  console.log(`📅 Last modified: ${currentDate}`);
  console.log(`🔗 Pages included: ${pages.length}`);
}

// Run if called directly
if (require.main === module) {
  updateSitemap();
}

module.exports = { generateSitemap, updateSitemap };