// Test CORS and payment functionality with current backend
const backendUrl = 'https://housemate-backend-234825552341.africa-south1.run.app';
const frontendOrigin = 'https://www.housemate.website';

console.log('Testing CORS and backend connectivity...');

// Test 1: Health endpoint (should work)
fetch(`${backendUrl}/health`, {
  method: 'GET',
  headers: {
    'Origin': frontendOrigin
  }
})
.then(response => {
  console.log('✅ Health endpoint works:', response.status);
  return response.json();
})
.then(data => {
  console.log('Health data:', data);
})
.catch(error => {
  console.log('❌ Health endpoint failed:', error.message);
});

// Test 2: OPTIONS preflight for bills endpoint
fetch(`${backendUrl}/bills`, {
  method: 'OPTIONS',
  headers: {
    'Origin': frontendOrigin,
    'Access-Control-Request-Method': 'GET',
    'Access-Control-Request-Headers': 'Authorization'
  }
})
.then(response => {
  console.log('✅ OPTIONS preflight works:', response.status);
  console.log('CORS headers:', {
    'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
    'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
    'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
  });
})
.catch(error => {
  console.log('❌ OPTIONS preflight failed:', error.message);
});

console.log('Tests initiated - check results above');