import housemateLogo from "../../../assets/housemate-logo.png";
import housemateLogoWebP from "../../../assets/housemate-logo.webp";
import OptimizedImage from "../../../components/OptimizedImage.jsx";

export function AuthCard({ children, title, description }) {
  return (
    <article className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <header className="flex flex-col items-center mb-6">
        <OptimizedImage 
          src={housemateLogo}
          webpSrc={housemateLogoWebP}
          alt="HouseMate Logo" 
          className="w-16 h-16 rounded-xl mb-3 object-contain bg-gradient-to-br from-blue-500 to-purple-600"
          width="64"
          height="64"
        />
        <h1 className="text-2xl font-semibold text-gray-900">HouseMate</h1>
        {description && (
          <p className="text-center text-gray-600 mt-2 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </header>
      
      <div className="auth-content">
        {children}
      </div>
    </article>
  );
}
