import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Eye, User, Calendar, CreditCard, FileText } from 'lucide-react';



export function BillItem({
  id,
  icon,
  title,
  description,
  amount,
  perPerson,
  paid,
  status,
  dueDate,
  isOverdue,
  shares = [],
  payments = [],
  onRecordPayment,
  onViewPayments,
  // New calculated fields from backend
  total_amount,
  total_paid,
  total_remaining,
  payment_status,
  payment_progress
}) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Use calculated values from backend if available, otherwise fallback to props
  const actualAmount = total_amount !== undefined ? total_amount : amount;
  const actualPaid = total_paid !== undefined ? total_paid : paid;
  const actualStatus = payment_status !== undefined ? payment_status : status;
  const actualProgress = payment_progress !== undefined ? payment_progress : (actualPaid / actualAmount) * 100;
  
  const progressText = `R${Number(actualPaid || 0).toFixed(2)} of R${Number(actualAmount || 0).toFixed(2)} paid`;
  const formattedDueDate = `Due ${new Date(dueDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })}`;
  const formattedAmount = `R${Number(actualAmount || 0).toFixed(2)}`;
  const formattedPerPerson = `R${Number(perPerson || 0).toFixed(2)} per person`;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
      case 'pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Overdue':
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Partially Paid':
      case 'partial':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'Paid':
      case 'paid':
        return 'bg-green-500';
      case 'Partially Paid':
      case 'partial':
        return 'bg-yellow-500';
      case 'Pending':
      case 'pending':
        return 'bg-blue-500';
      case 'Overdue':
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusDisplayText = (status) => {
    switch (status) {
      case 'partial':
        return 'Partially Paid';
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  // Get recent payments for display
  const recentPayments = payments.slice(0, 3);
  const hasMorePayments = payments.length > 3;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-gray-900">{title}</h3>
              {payments.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  {showDetails ? 'Hide' : 'Show'} Details
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-3">{description}</p>
            <div className="flex items-center space-x-4 mb-3">
              <span className={`px-2 py-1 rounded-md text-xs border ${getStatusColor(actualStatus)}`}>
                {getStatusDisplayText(actualStatus)}
              </span>
              <span className="text-xs text-gray-500">{formattedDueDate}</span>
              {isOverdue && actualStatus !== 'paid' && (
                <span className="text-xs text-red-500 font-medium">OVERDUE</span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{progressText}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(actualStatus)}`}
                  style={{ width: `${Math.min(100, Math.max(0, actualProgress))}%` }}
                ></div>
              </div>
            </div>

            {/* Payment Details Section */}
            {showDetails && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Payment History</h4>
                
                {/* Bill Shares */}
                {shares.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Individual Shares:</h5>
                    <div className="space-y-2">
                      {shares.map((share, index) => {
                        const remainingAmount = share.remaining_amount !== undefined 
                          ? share.remaining_amount 
                          : Math.max(0, (share.amount || 0) - (share.amount_paid || 0));
                        const isPaid = remainingAmount === 0;
                        const shareAmount = share.amount || 0;
                        const amountPaid = share.amount_paid || 0;
                        
                        return (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">
                                {share.user_name} {share.user_surname}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {isPaid ? (
                                <div className="flex items-center space-x-2">
                                  <span className="text-green-600 font-medium">✓ Paid in full</span>
                                  <Badge variant="success" className="text-xs">
                                    Complete
                                  </Badge>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <span className="text-orange-600 font-medium">
                                    Owes R{Number(remainingAmount).toFixed(2)}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    (R{Number(amountPaid).toFixed(2)} / R{Number(shareAmount).toFixed(2)})
                                  </span>
                                </div>
                              )}
                              {isPaid && share.paid_by_name && (
                                <span className="text-xs text-green-600">
                                  by {share.paid_by_name}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Recent Payments */}
                {recentPayments.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Recent Payments:</h5>
                    <div className="space-y-2">
                      {recentPayments.map((payment, index) => (
                        <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-100">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-3 h-3 text-green-500" />
                              <span className="text-gray-600">
                                {payment.paid_by_name} paid for {payment.user_name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-green-600 font-medium">
                                R{Number(payment.amount_paid || 0).toFixed(2)}
                              </span>
                              {payment.payment_method && (
                                <span className="text-gray-500">({payment.payment_method})</span>
                              )}
                            </div>
                          </div>
                          {payment.payment_notes && (
                            <div className="mt-2 p-2 bg-white rounded border-l-4 border-blue-300">
                              <div className="flex items-start space-x-2">
                                <FileText className="w-3 h-3 text-blue-500 mt-0.5" />
                                <div>
                                  <p className="text-xs text-gray-700 italic">"{payment.payment_notes}"</p>
                                  <p className="text-xs text-gray-500 mt-1">— {payment.paid_by_name}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {hasMorePayments && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => onViewPayments?.(id)}
                        className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto mt-2"
                      >
                        View all {payments.length} payments
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-gray-900 mb-1">{formattedAmount}</div>
          <div className="text-sm text-gray-500 mb-4">{formattedPerPerson}</div>
          <div className="flex flex-col space-y-2">
            {status !== 'Paid' && status !== 'paid' && (
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => onRecordPayment?.(id)}
              >
                Record Payment
              </Button>
            )}
            {payments.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewPayments?.(id)}
                className="text-xs"
              >
                <FileText className="w-3 h-3 mr-1" />
                View History
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
