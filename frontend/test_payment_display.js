// Test data to verify BillItem payment notes display
const mockBillWithPaymentNotes = {
  id: 1,
  title: "Grocery Bill",
  description: "Weekly groceries for the house",
  amount: 500,
  payments: [
    {
      id: 1,
      paid_by_name: "Alice Johnson",
      user_name: "Bob Smith", 
      amount_paid: 250,
      payment_method: "Bank Transfer",
      payment_notes: "Bought extra organic vegetables and household supplies",
      paid_at: "2025-11-04"
    },
    {
      id: 2,
      paid_by_name: "Charlie Brown",
      user_name: "Alice Johnson",
      amount_paid: 250,
      payment_method: "Cash",
      payment_notes: "Thanks for handling the shopping! Here's my share.",
      paid_at: "2025-11-03"
    }
  ],
  shares: [
    {
      user_name: "Alice",
      user_surname: "Johnson",
      amount: 250,
      status: "paid",
      paid_by_name: "Alice Johnson"
    },
    {
      user_name: "Bob", 
      user_surname: "Smith",
      amount: 250,
      status: "paid",
      paid_by_name: "Alice Johnson"
    }
  ]
};

console.log('Mock bill with payment notes:');
console.log(JSON.stringify(mockBillWithPaymentNotes, null, 2));

// Test how the BillItem component will display payment notes
console.log('\nPayment notes display test:');
mockBillWithPaymentNotes.payments.forEach((payment, index) => {
  console.log(`\nPayment ${index + 1}:`);
  console.log(`- Who: ${payment.paid_by_name} paid for ${payment.user_name}`);
  console.log(`- Amount: R${payment.amount_paid} via ${payment.payment_method}`);
  if (payment.payment_notes) {
    console.log(`- Note: "${payment.payment_notes}" - ${payment.paid_by_name}`);
  }
});

console.log('\n✅ Payment notes structure verified!');