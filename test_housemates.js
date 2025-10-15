// Test script to verify the housemates API endpoint
const testEndpoint = async () => {
  try {
    // Test with house ID 1 (you may need to adjust this based on your data)
    const response = await fetch('http://localhost:3000/houses/1/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Housemates API Response:', JSON.stringify(data, null, 2));
    
    // Check if we have the expected fields
    data.forEach(housemate => {
      console.log(`Housemate: ${housemate.name} ${housemate.surname}`);
      console.log(`  Role: ${housemate.role}`);
      console.log(`  Is House Creator: ${Boolean(housemate.is_house_creator)}`);
      console.log(`  Email: ${housemate.email}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error testing housemates endpoint:', error);
  }
};

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
  // Running in Node.js
  import('node-fetch').then(({ default: fetch }) => {
    global.fetch = fetch;
    testEndpoint();
  });
} else {
  // Running in browser
  testEndpoint();
}