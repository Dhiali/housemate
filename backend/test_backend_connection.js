import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple test to check backend connection
const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint (if it exists)
    try {
      const healthResponse = await fetch('https://housemate-backend-234825552341.africa-south1.run.app/health', {
        method: 'GET',
        headers: {
          'Origin': 'https://www.housemate.website'
        }
      });
      
      if (healthResponse.ok) {
        console.log('✅ Backend health check passed');
      } else {
        console.log('⚠️ Backend health check failed:', healthResponse.status);
      }
    } catch (healthError) {
      console.log('⚠️ Health endpoint not available or failed');
    }

    // Test with a simple endpoint that might exist
    console.log('Testing if we can reach the backend...');
    
  } catch (error) {
    console.error('❌ Error testing backend connection:', error.message);
  }
};

testBackendConnection();