import { Crown } from "lucide-react";

export function AuthCard({ children, title, description }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">HouseMate</h1>
        {description && (
          <p className="text-center text-gray-600 mt-2 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
