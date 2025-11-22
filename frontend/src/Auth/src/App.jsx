import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { register } from "../../apiHelpers";
import { AuthCard } from "./components/AuthCard.jsx";
import { SignInForm } from "./components/SignInForm.jsx";
import { SignUpForm } from "./components/SignUpForm.jsx";
import { CreateHouseForm } from "./components/CreateHouseForm.jsx";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm.jsx";
import { addUser, addHouse, updateUser } from "../../apiHelpers";
import { useSEO, SEO_CONFIG } from '../../hooks/useSEO.js';
import { SEO, generateStructuredData } from '../../utils/seo.jsx';
import { Helmet } from 'react-helmet-async';
import { trackAuth, trackHousehold, trackPageView } from '../../utils/analytics.js';
import { isDashboardAllowed, getDeviceType, onDeviceChange } from '../../utils/deviceDetection.js';
import MobileWarning from '../../components/MobileWarning.jsx';
import { useAuth } from '../../UserContext.jsx';
import './index.css';

// Lazy load the Dashboard application
const DashboardApp = lazy(() => import('../../dashboard/src/App.jsx'));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, token, login } = useAuth();
  const [pendingUser, setPendingUser] = useState(null);
  const [showCreateHouseForm, setShowCreateHouseForm] = useState(false);
  const [isDeviceAllowed, setIsDeviceAllowed] = useState(isDashboardAllowed());
  const [deviceType, setDeviceType] = useState(getDeviceType());

  // Get current view from URL path
  const getCurrentView = () => {
    const path = location.pathname.split('/').pop();
    return path || 'signin';
  };

  const currentView = getCurrentView();

  // Monitor device changes (orientation, resize)
  useEffect(() => {
    const cleanup = onDeviceChange((deviceInfo) => {
      setIsDeviceAllowed(deviceInfo.isDashboardAllowed);
      setDeviceType(deviceInfo.deviceType);
    });

    return cleanup;
  }, []);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Track page views when view changes
  useEffect(() => {
    trackPageView(`/auth/${currentView}`, `HouseMate - ${currentView.replace('-', ' ')}`);
  }, [currentView]);

  // SEO: Update page title and meta description based on current view
  const getSEOConfig = () => {
    switch (currentView) {
      case "signin":
        return SEO_CONFIG.signin;
      case "signup":
        return SEO_CONFIG.signup;
      case "create-house":
        return SEO_CONFIG.createHouse;
      case "forgot-password":
        return SEO_CONFIG.forgotPassword;
      default:
        return SEO_CONFIG.signin;
    }
  };

  const seoConfig = getSEOConfig();
  useSEO(seoConfig.title, seoConfig.description, seoConfig.keywords, seoConfig.image, seoConfig.imageAlt);
  
  const handleTabSwitch = (view) => {
    navigate(`/auth/${view}`);
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  const handleCreateHouseMateAccount = (userData) => {
    // Debug: log userData before sending
    console.log('Register user payload:', userData);
    register(userData)
      .then(res => {
        const userId = res.data?.id || res.data?.user_id;
        if (userId) {
          setPendingUser({ ...userData, id: userId });
          setShowCreateHouseForm(true);
          navigate('/auth/create-house');
        } else {
          // Handle error: user not created
          alert("User registration failed. Please try again.");
        }
      })
      .catch(err => {
        console.error('Error registering user:', err);
        
        // Enhanced error handling for better user experience
        let errorMessage = "Registration failed. Please try again.";
        
        if (err.response) {
          const status = err.response.status;
          switch (status) {
            case 503:
              errorMessage = "Our server is temporarily unavailable. Please try again in a few minutes.";
              break;
            case 500:
              errorMessage = "Server error occurred. Please try again later.";
              break;
            case 409:
              errorMessage = "An account with this email already exists. Please try signing in instead.";
              break;
            case 400:
              errorMessage = "Please check your information and try again.";
              break;
            case 429:
              errorMessage = "Too many registration attempts. Please wait a few minutes before trying again.";
              break;
            default:
              errorMessage = "Registration failed. Please try again.";
          }
        } else if (err.request) {
          errorMessage = "Unable to connect to server. Please check your internet connection.";
        }
        
        alert(errorMessage);
      });
  };

  const handleCreateHouse = async (houseData) => {
    // Use /houses endpoint to create house and link to user
    if (!pendingUser || !pendingUser.id) {
      alert('User information missing. Please register again.');
      console.error('Missing pendingUser or pendingUser.id:', pendingUser);
      return;
    }
    try {
      const { name, avatar, ...houseDataRest } = houseData;
      const housePayload = {
        name: houseDataRest.house_name,
        address: houseDataRest.address,
        house_rules: houseDataRest.house_rules,
        created_by: pendingUser.id
      };
      if (avatar) {
        housePayload.avatar = avatar;
      }
      console.log('House payload:', housePayload);
      const res = await addHouse(housePayload);
      console.log('House creation response:', res.data);
      if (!res.data || !res.data.id) {
        alert('House creation failed. Please try again.');
        return;
      }
      // Track house creation
      trackHousehold.createHouse(housePayload.created_by || 1); // Default to 1 user if unknown
      trackAuth.signUp('email');
      // Automatically sign in the user
      const { email, password } = pendingUser;
      let autoLoginSuccess = false;
      if (email && password) {
        try {
          const loginRes = await import('../../apiHelpers').then(m => m.login({ email, password }));
          const token = loginRes.data?.token;
          const user = loginRes.data?.user || loginRes.data?.userData || loginRes.data;
          handleSignInSuccess(token, user);
          autoLoginSuccess = true;
        } catch (loginErr) {
          console.error('Auto-login failed:', loginErr);
          alert('Account created, but automatic sign-in failed. Please sign in manually.');
        }
      }
      setShowCreateHouseForm(false);
      setPendingUser(null);
      // Always navigate to dashboard, even if auto-login fails
      if (!autoLoginSuccess) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error creating house:', err);
      alert('House creation failed. Please try again.');
      // Still navigate to dashboard if house creation succeeded but something else failed
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    navigate('/auth/signin');
  };

  // Called by SignInForm on successful sign-in
  const handleSignInSuccess = (token, userData) => {
    // Use UserContext login method
    login(token, userData);
    
    // Track successful sign in
    trackAuth.signIn('email');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const getDescription = () => {
    switch (currentView) {
      case "signin":
      case "signup":
        return "Manage chores, bills, and responsibilities with your housemates in a fair and organized way";
      case "create-house":
        return "Set up your house profile to start managing your shared living space";
      case "forgot-password":
        return "Reset your password to regain access to your account";
      default:
        return "";
    }
  };

  // Check if device is allowed for dashboard access
  if (!isDeviceAllowed) {
    return <MobileWarning />;
  }

  // If authenticated, redirect will be handled by useEffect above

  return (
    <>
      {/* Dynamic SEO based on current route */}
      {currentView === 'signin' && <SEO page="AUTH_SIGNIN" />}
      {currentView === 'signup' && <SEO page="AUTH_SIGNUP" />}
      {currentView === 'create-house' && <SEO page="AUTH_CREATE_HOUSE" />}
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData('BreadcrumbList', {
            breadcrumbs: [
              { name: 'Home', url: 'https://www.housemate.website/' },
              { name: 'Authentication', url: `https://www.housemate.website/auth/${currentView}` }
            ]
          }))}
        </script>
      </Helmet>
      
      <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      <section className="w-full max-w-md">
        <AuthCard description={getDescription()}>
          <Routes>
            <Route 
              path="/signin" 
              element={
                <>
                  <nav className="flex mb-6 bg-gray-100 rounded-lg p-1" role="tablist" aria-label="Authentication options">
                    <button
                      onClick={() => handleTabSwitch("signin")}
                      className="flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 bg-white text-blue-600 font-semibold"
                      role="tab"
                      aria-selected={true}
                      aria-controls="signin-panel"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate('/auth/signup')}
                      className="flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 text-gray-500"
                      role="tab"
                      aria-selected={false}
                      aria-controls="signup-panel"
                    >
                      Create House
                    </button>
                  </nav>
                  <SignInForm
                    onForgotPassword={handleForgotPassword}
                    onCreateHouse={() => navigate('/auth/signup')}
                    onSignInSuccess={handleSignInSuccess}
                  />
                </>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <>
                  <nav className="flex mb-6 bg-gray-100 rounded-lg p-1" role="tablist" aria-label="Authentication options">
                    <button
                      onClick={() => navigate('/auth/signin')}
                      className="flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 text-gray-500"
                      role="tab"
                      aria-selected={false}
                      aria-controls="signin-panel"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate('/auth/signup')}
                      className="flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 bg-white text-blue-600 font-semibold"
                      role="tab"
                      aria-selected={true}
                      aria-controls="signup-panel"
                    >
                      Create House
                    </button>
                  </nav>
                  <SignUpForm onCreateHouseMateAccount={handleCreateHouseMateAccount} />
                </>
              } 
            />
            <Route 
              path="/create-house" 
              element={
                <CreateHouseForm onCreateHouse={handleCreateHouse} />
              } 
            />
            <Route 
              path="/forgot-password" 
              element={<ForgotPasswordForm onBack={handleBack} />} 
            />
            <Route path="/" element={<Navigate to="/auth/signin" replace />} />
            <Route path="*" element={<Navigate to="/auth/signin" replace />} />
          </Routes>
          
          <footer className="text-center mt-6 text-sm text-black">
            By continuing, you agree to our{' '}
            <button className="underline hover:text-black" type="button">Terms of Service</button>
            {' '}and{' '}
            <button className="underline hover:text-black" type="button">Privacy Policy</button>.
          </footer>
        </AuthCard>
      </section>
      </main>
    </>
  );
}
