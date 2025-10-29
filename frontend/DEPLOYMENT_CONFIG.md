# Deployment Configuration for Static Hosting

# For Netlify (_redirects file)
/*    /index.html   200

# For Vercel (vercel.json)
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}

# For Apache (.htaccess)
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]

# MIME type fixes
<IfModule mod_mime.c>
  AddType text/javascript .js
  AddType text/css .css
  AddType application/json .json
</IfModule>

# For Nginx
location / {
  try_files $uri $uri/ /index.html;
  
  # MIME type configuration
  location ~* \.(js)$ {
    add_header Content-Type text/javascript;
  }
  
  location ~* \.(css)$ {
    add_header Content-Type text/css;
  }
}