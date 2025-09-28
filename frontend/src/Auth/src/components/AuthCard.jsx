import housemateLogo from "../../../assets/HouseMate logo.png";

export function AuthCard({ children, title, description }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col items-center mb-6">
        <img src={housemateLogo} alt="HouseMate Logo" className="w-16 h-16 rounded-xl mb-3 object-contain bg-gradient-to-br from-blue-500 to-purple-600" />
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
