import { ReactNode } from 'react';



export function QuickAction({ icon, title, description, iconBg }) {
  return (
    <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <div className={`p-2 rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
