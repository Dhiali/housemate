import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, Calendar, CreditCard, FileText, Clock, CheckCircle } from 'lucide-react';
import { getBillPayments } from '../../../apiHelpers';

export function PaymentHistoryModal({ isOpen, onClose, billId, billTitle }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && billId) {
      fetchPaymentHistory();
    }
  }, [isOpen, billId]);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBillPayments(billId);
      setPayments(response.data?.data || []);
    } catch (err) {
      console.error('Error fetching payment history:', err);
      setError('Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'cash':
        return '💵';
      case 'card':
      case 'credit card':
      case 'debit card':
        return '💳';
      case 'bank transfer':
      case 'eft':
        return '🏦';
      case 'digital wallet':
      case 'paypal':
      case 'venmo':
        return '📱';
      default:
        return '💰';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Payment History: {billTitle}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading payment history...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">{error}</div>
              <Button onClick={fetchPaymentHistory} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && payments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No payments recorded yet for this bill.</p>
            </div>
          )}

          {!loading && !error && payments.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {payments.length} Payment{payments.length !== 1 ? 's' : ''} Recorded
                </h3>
                <Badge variant="success" className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>All Paid</span>
                </Badge>
              </div>

              {payments.map((payment, index) => (
                <Card key={payment.id || index} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-900">
                              {payment.paid_by_name || 'Unknown User'}
                            </span>
                          </div>
                          {payment.paid_by_name !== payment.user_name && (
                            <div className="text-sm text-gray-600">
                              paid for <span className="font-medium">{payment.user_name}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(payment.paid_at)}</span>
                          </div>
                          
                          {payment.payment_method && (
                            <div className="flex items-center space-x-1">
                              <span>{getPaymentMethodIcon(payment.payment_method)}</span>
                              <span className="capitalize">{payment.payment_method}</span>
                            </div>
                          )}
                        </div>

                        {payment.payment_notes && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                            <FileText className="w-3 h-3 inline mr-1" />
                            <span className="font-medium">Note:</span> {payment.payment_notes}
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          R{payment.amount_paid?.toFixed(2) || payment.amount?.toFixed(2)}
                        </div>
                        {payment.amount_paid !== payment.amount && (
                          <div className="text-sm text-gray-500">
                            of R{payment.amount?.toFixed(2)} owed
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}