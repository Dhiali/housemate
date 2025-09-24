import { ReactNode } from 'react';

export function StatsCard({ title, amount, subtitle, icon, variant }) {
  const variants = {
    default: 'bg-purple-100 text-purple-600',
    success: 'bg-green-100 text-green-600', 
    warning: 'bg-orange-100 text-orange-600',
    danger: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm text-gray-600">{title}</h3>
        <div className={`p-2 rounded-lg ${variants[variant]}`}>
          {icon}
        </div>
      </div>
      <div className="mb-1">
        <span className="text-2xl font-semibold text-gray-900">{amount}</span>
      </div>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
