import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    hmr: true,
    port: 3000
  },
  
  // Performance optimizations
  build: {
    // Enable sourcemaps for better debugging in production
    sourcemap: false,
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Advanced minification
    minify: 'esbuild',
    
    // Disable CSS code splitting to ensure CSS is included in HTML
    cssCodeSplit: false,
    
    // Target modern browsers for better optimization
    target: 'esnext',
    
    // Rollup specific optimizations
    rollupOptions: {
      // Optimize dependencies
      external: [],
      
      output: {
        // Advanced chunking strategy
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          
          // UI library chunks
          radix: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-dropdown-menu'
          ],
          
          // Utility libraries
          utils: ['axios', 'clsx', 'class-variance-authority', 'tailwind-merge'],
          
          // Chart and visualization
          charts: ['recharts'],
          
          // Form handling
          forms: ['react-hook-form'],
          
          // Icons
          icons: ['lucide-react']
        },
        
        // Optimized asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          // Organize assets by type
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
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
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/js/${facadeModuleId}-[hash].js`;
        },
        
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    
    // Enable tree shaking
    treeshake: true
  },
  
  // Optimize image assets
  assetsInclude: ['**/*.webp'],
  
  // Optimize dependencies
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: [
      'react',
      'react-dom',
      'axios',
      'clsx',
      'class-variance-authority',
      'tailwind-merge'
    ],
    
    // Exclude large dependencies from pre-bundling
    exclude: [
      'recharts'
    ]
  },
  
  // Enable experimental features for better performance
  esbuild: {
    // Enable advanced minification
    legalComments: 'none',
    
    // Optimize for smaller bundles
    treeShaking: true
  }
})
