// Test script to validate payment notes functionality
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

// Simple test to check our payment notes implementation
console.log('Testing payment notes functionality...');

// Mock payment data to test the structure
const mockPayment = {
  id: 1,
  bill_id: 1,
  user_id: 2,
  user_name: 'John Doe',
  amount: 100.00,
  amount_paid: 100.00,
  paid_by_user_id: 1,
  paid_by_name: 'Jane Smith',
  paid_at: new Date(),
  payment_method: 'Bank Transfer',
  payment_notes: 'Payment for groceries - bought extra items for the house',
  status: 'paid'
};

console.log('Mock payment with notes:');
console.log(JSON.stringify(mockPayment, null, 2));

// Test the payment notes display logic
const formatPaymentForDisplay = (payment) => {
  const result = {
    basic_info: `${payment.paid_by_name} paid R${payment.amount_paid} for ${payment.user_name}`,
    method: payment.payment_method ? ` via ${payment.payment_method}` : '',
    notes: payment.payment_notes ? `\nNote: "${payment.payment_notes}" - ${payment.paid_by_name}` : '',
    paid_at: payment.paid_at.toLocaleDateString()
  };
  
  return result;
};

const displayResult = formatPaymentForDisplay(mockPayment);
console.log('\nFormatted for display:');
console.log(displayResult);

console.log('\nTest completed - payment notes functionality should work correctly!');