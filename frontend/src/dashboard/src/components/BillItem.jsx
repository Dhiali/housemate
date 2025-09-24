import { ReactNode } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';



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
  onRecordPayment
}) {
  const progress = (paid / amount) * 100;
  const progressText = `R${paid.toFixed(2)} of R${amount.toFixed(2)} paid`;
  const formattedDueDate = `Due ${new Date(dueDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })}`;
  const formattedAmount = `R${amount.toFixed(2)}`;
  const formattedPerPerson = `R${perPerson.toFixed(2)} per person`;
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Partially Paid':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500';
      case 'Partially Paid':
        return 'bg-yellow-500';
      case 'Pending':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-3">{description}</p>
            <div className="flex items-center space-x-4 mb-3">
              <span className={`px-2 py-1 rounded-md text-xs border ${getStatusColor(status)}`}>
                {status}
              </span>
              <span className="text-xs text-gray-500">{formattedDueDate}</span>
              {isOverdue && (
                <span className="text-xs text-red-500 font-medium">OVERDUE</span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{progressText}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(status)}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-gray-900 mb-1">{formattedAmount}</div>
          <div className="text-sm text-gray-500 mb-4">{formattedPerPerson}</div>
          {status !== 'Paid' && (
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onRecordPayment?.(id)}
            >
              Record Payment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
