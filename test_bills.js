// Test script to check bills endpoint
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/bills?house_id=29',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
    try {
      const parsed = JSON.parse(data);
      console.log('Parsed data:', parsed);
      console.log('Bills count:', parsed.data ? parsed.data.length : 'No data property');
    } catch (e) {
      console.log('Failed to parse JSON:', e.message);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();