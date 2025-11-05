import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    hmr: true,
    port: 5173,
    host: true // Allow external connections for mobile testing
  },
  
  // Performance optimizations
  build: {
    // Disable sourcemaps for production builds
    sourcemap: false,
    
    // Optimize chunk size for better loading
    chunkSizeWarningLimit: 800,
    
    // Advanced minification with SWC
    minify: 'esbuild',
    
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    
    // Target modern browsers for better optimization
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    
    // Rollup specific optimizations
    rollupOptions: {
      // Optimize dependencies
      external: [],
      
      output: {
        // Advanced chunking strategy for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          
          // UI library chunks
          'radix-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-switch',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-avatar',
            '@radix-ui/react-label'
          ],
          
          // Utility libraries
          'utils': ['axios', 'clsx', 'class-variance-authority', 'tailwind-merge'],
          
          // Chart and visualization
          'charts': ['recharts'],
          
          // Form handling
          'forms': ['react-hook-form'],
          
          // Icons (separate chunk for lazy loading)
          'icons': ['lucide-react'],
          
          // Animation libraries
          'animations': ['framer-motion']
        },
        
        // Optimized asset file naming with content hashing
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          // Organize assets by type for better caching
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            extType = 'css';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        
        // Optimized chunk file naming
        chunkFileNames: (chunkInfo) => {
          return `assets/js/[name]-[hash].js`;
        },
        
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    
    // Enable tree shaking for smaller bundles
    treeshake: {
      moduleSideEffects: false
    },
    
    // Optimize for better compression
    assetsInlineLimit: 4096, // 4kb limit for inlining assets
    
    // Enable CSS minification
    cssMinify: true
  },
  
  // Optimize image assets
  assetsInclude: ['**/*.webp', '**/*.avif'],
  
  // Optimize dependencies for faster dev startup
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: [
      'react',
      'react-dom',
      'axios',
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
      'react-hook-form'
    ],
    
    // Exclude large dependencies from pre-bundling
    exclude: [
      'recharts',
      'framer-motion'
    ],
    
    // Force optimization for better performance
    force: true
  },
  
  // Enable experimental features for better performance
  esbuild: {
    // Remove console.log in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    
    // Optimize for smaller bundles
    treeShaking: true,
    
    // Remove legal comments for smaller size
    legalComments: 'none',
    
    // Enable advanced minification
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  
  // CSS preprocessing optimizations
  css: {
    // Enable CSS modules for better scoping
    modules: {
      localsConvention: 'camelCase'
    },
    
    // PostCSS optimizations
    postcss: {
      plugins: []
    },
    
    // Optimize CSS loading
    preprocessorOptions: {
      // Add any SCSS/SASS optimizations here if needed
    }
  },
  
  // Preview server optimization
  preview: {
    port: 4173,
    host: true,
    strictPort: true
  }
})
