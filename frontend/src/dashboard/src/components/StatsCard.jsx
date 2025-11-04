import { ReactNode } from 'react';

export function StatsCard({ title, amount, subtitle, icon, variant }) {
  const variants = {
    default: 'bg-purple-100 text-purple-600',
    success: 'bg-green-100 text-green-600', 
    warning: 'bg-orange-100 text-orange-600',
    danger: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className={`p-3 rounded-lg ${variants[variant]}`}>
          {icon}
        </div>
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold text-gray-900">{amount}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{subtitle}</p>
    </div>
  );
}
