// Test script to verify payment status calculations
const API_BASE_URL = 'https://housemate-backend-234825552341.africa-south1.run.app';

// Test function to verify payment status calculations
async function testPaymentStatusCalculations() {
  console.log('🔧 Testing Payment Status Calculations...\n');

  try {
    // 1. Test getting bills to check new calculated fields
    console.log('1. Testing GET /bills endpoint for calculated payment status...');
    
    const billsResponse = await fetch(`${API_BASE_URL}/bills?house_id=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TEST_TOKEN' // Replace with actual test token
      }
    });
    
    if (!billsResponse.ok) {
      console.log('❌ Bills endpoint failed:', billsResponse.status, billsResponse.statusText);
      const errorText = await billsResponse.text();
      console.log('Response:', errorText);
      return;
    }
    
    const billsData = await billsResponse.json();
    console.log('✅ Bills response received');
    
    if (billsData.data && billsData.data.length > 0) {
      const firstBill = billsData.data[0];
      
      console.log('📊 First Bill Analysis:');
      console.log('  - Bill ID:', firstBill.id);
      console.log('  - Title:', firstBill.title);
      console.log('  - Total Amount:', firstBill.total_amount || firstBill.amount);
      console.log('  - Total Paid:', firstBill.total_paid || 0);
      console.log('  - Total Remaining:', firstBill.total_remaining || 'Not calculated');
      console.log('  - Payment Status:', firstBill.payment_status || firstBill.status);
      console.log('  - Payment Progress:', firstBill.payment_progress || 'Not calculated');
      
      if (firstBill.shares && firstBill.shares.length > 0) {
        console.log('  - Individual Shares:');
        firstBill.shares.forEach((share, index) => {
          console.log(`    ${index + 1}. ${share.user_name} ${share.user_surname}:`);
          console.log(`       Share Amount: R${(share.amount || 0).toFixed(2)}`);
          console.log(`       Amount Paid: R${(share.amount_paid || 0).toFixed(2)}`);
          console.log(`       Remaining: R${(share.remaining_amount || 0).toFixed(2)}`);
          console.log(`       Status: ${share.status}`);
        });
      }
      
      // Test payment status logic
      const totalAmount = firstBill.total_amount || firstBill.amount || 0;
      const totalPaid = firstBill.total_paid || 0;
      const expectedStatus = totalPaid >= totalAmount ? 'paid' : (totalPaid > 0 ? 'partial' : 'pending');
      const expectedProgress = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0;
      
      console.log('\n🧮 Payment Calculation Verification:');
      console.log('  - Expected Status:', expectedStatus);
      console.log('  - Actual Status:', firstBill.payment_status);
      console.log('  - Expected Progress:', expectedProgress.toFixed(2) + '%');
      console.log('  - Actual Progress:', (firstBill.payment_progress || 0).toFixed(2) + '%');
      
      const statusMatch = firstBill.payment_status === expectedStatus;
      const progressMatch = Math.abs((firstBill.payment_progress || 0) - expectedProgress) < 0.01;
      
      console.log('  - Status Match:', statusMatch ? '✅' : '❌');
      console.log('  - Progress Match:', progressMatch ? '✅' : '❌');
      
    } else {
      console.log('ℹ️ No bills found in response');
    }
    
    console.log('\n✅ Payment Status Calculation Test Completed!');
    
  } catch (error) {
    console.error('❌ Error during payment status calculation test:', error.message);
  }
}

// Example test scenarios
console.log('📋 Expected Payment Status Scenarios:');
console.log('1. R0.00 of R1399.95 paid → Status: "pending", Progress: 0%');
console.log('2. R500.00 of R1399.95 paid → Status: "partial", Progress: ~35.7%');
console.log('3. R1399.95 of R1399.95 paid → Status: "paid", Progress: 100%');
console.log('4. Individual shares should show remaining amounts for each user\n');

// Run the test
testPaymentStatusCalculations();