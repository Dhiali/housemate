import React from 'react';
import { CheckCircle, Calendar, Users, BarChart3, ClipboardList, DollarSign } from 'lucide-react';

const Button = ({ children, className = '', variant, onClick, ...props }) => {
  const base = 'px-4 py-2 rounded-lg font-medium transition';
  const styles =
    variant === 'outline'
      ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
      : 'bg-purple-600 text-white hover:bg-purple-700';
  return (
    <button className={`${base} ${styles} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
