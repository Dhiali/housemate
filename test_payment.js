// Test script for payment recording functionality
import { payBill } from './frontend/src/apiHelpers.js';

async function testPaymentRecording() {
  try {
    const testPaymentData = {
      user_id: 1, // Who this payment is for
      paid_by_user_id: 1, // Who is making the payment
      amount_paid: 50.00,
      payment_method: 'bank_transfer',
      payment_notes: 'Test payment'
    };

    console.log('Testing payment recording with data:', testPaymentData);
    
    // This would be the bill ID to test with
    const testBillId = 1;
    
    const result = await payBill(testBillId, testPaymentData);
    console.log('Payment recording test result:', result);
    
  } catch (error) {
    console.error('Payment recording test failed:', error);
  }
}

// Export for potential use
export { testPaymentRecording };