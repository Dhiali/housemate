import { useState, useEffect, lazy, Suspense } from "react";
import { register } from "../../apiHelpers";
import { AuthCard } from "./components/AuthCard.jsx";
import { SignInForm } from "./components/SignInForm.jsx";
import { SignUpForm } from "./components/SignUpForm.jsx";
import { CreateHouseForm } from "./components/CreateHouseForm.jsx";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm.jsx";
import { addUser, addHouse, updateUser } from "../../apiHelpers";
import { useSEO, SEO_CONFIG } from '../../hooks/useSEO.js';
import { trackAuth, trackHousehold, trackPageView } from '../../utils/analytics.js';

// Lazy load the Dashboard application
const DashboardApp = lazy(() => import('../../dashboard/src/App.jsx'));


export default function App() {
  const [currentView, setCurrentView] = useState("signin");
  const [pendingUser, setPendingUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCreateHouseForm, setShowCreateHouseForm] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  // On app load, check localStorage for token/user
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    if (token && user) {
      setAuthToken(token);
      setAuthUser(JSON.parse(user));
      setShowDashboard(true);
    }
  }, []);

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
    setCurrentView(view);
  };

  const handleForgotPassword = () => {
    setCurrentView("forgot-password");
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
          setCurrentView("create-house");
        } else {
          // Handle error: user not created
          alert("User registration failed. Please try again.");
        }
      })
      .catch(err => {
        console.error('Error registering user:', err);
        alert("User registration failed. Please try again.");
      });
  };

  const handleCreateHouse = async (houseData) => {
    // Use /houses endpoint to create house and link to user
    if (pendingUser) {
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
        
        // Track house creation
        trackHousehold.createHouse(housePayload.created_by || 1); // Default to 1 user if unknown
        trackAuth.signUp('email');
        
        // Automatically sign in the user
        const { email, password } = pendingUser;
        if (email && password) {
          try {
            const loginRes = await import('../../apiHelpers').then(m => m.login({ email, password }));
            const token = loginRes.data?.token;
            const user = loginRes.data?.user || loginRes.data?.userData || loginRes.data;
            handleSignInSuccess(token, user);
          } catch (loginErr) {
            console.error('Auto-login failed:', loginErr);
            alert('Account created, but automatic sign-in failed. Please sign in manually.');
          }
        }
        setShowCreateHouseForm(false);
        setPendingUser(null);
      } catch (err) {
        console.error('Error creating house:', err);
      }
    }
  };

  const handleBack = () => {
    setCurrentView("signin");
  };

  // Called by SignInForm on successful sign-in
  const handleSignInSuccess = (token, user) => {
    setAuthToken(token);
    setAuthUser(user);
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    setShowDashboard(true);
    
    // Track successful sign in
    trackAuth.signIn('email');
  };

  const renderContent = () => {
    switch (currentView) {
      case "signin":
        return (
          <SignInForm
            onForgotPassword={handleForgotPassword}
            onCreateHouse={() => setCurrentView("create-house")}
            onSignInSuccess={handleSignInSuccess}
          />
        );
      case "create-house":
        return (
          <>
            {!showCreateHouseForm ? (
              <SignUpForm onCreateHouseMateAccount={handleCreateHouseMateAccount} />
            ) : (
              <CreateHouseForm onCreateHouse={handleCreateHouse} />
            )}
          </>
        );
      case "signup":
        return <SignUpForm houseId={createdHouseId} onCreateHouseMateAccount={handleCreateHouseMateAccount} onSignUpSuccess={() => setShowDashboard(true)} />;
      case "forgot-password":
        return <ForgotPasswordForm onBack={handleBack} />;
      default:
        return null;
    }
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

  // If authenticated, show dashboard
  if (showDashboard && authToken && authUser) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Dashboard...</p>
          </div>
        </div>
      }>
        <DashboardApp user={authUser} token={authToken} />
      </Suspense>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      <section className="w-full max-w-md">
        <AuthCard description={getDescription()}>
          {(currentView !== "forgot-password" && (currentView === "signin" || currentView === "create-house")) && (
            <nav className="flex mb-6 bg-gray-100 rounded-lg p-1" role="tablist" aria-label="Authentication options">
              <button
                onClick={() => handleTabSwitch("signin")}
                className={`flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 ${currentView === "signin" ? "bg-white text-blue-600 font-semibold" : "text-gray-500"}`}
                role="tab"
                aria-selected={currentView === "signin"}
                aria-controls="signin-panel"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView("create-house")}
                className={`flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 ${currentView === "create-house" ? "bg-white text-blue-600 font-semibold" : "text-gray-500"}`}
                role="tab"
                aria-selected={currentView === "create-house"}
                aria-controls="create-house-panel"
              >
                Create House
              </button>
            </nav>
          )}
          
          <section 
            id={currentView === "signin" ? "signin-panel" : currentView === "create-house" ? "create-house-panel" : `${currentView}-panel`}
            role="tabpanel"
            aria-labelledby={`${currentView}-tab`}
          >
            {renderContent()}
          </section>
          
          <footer className="text-center mt-6 text-sm text-black">
            By continuing, you agree to our{' '}
            <button className="underline hover:text-black" type="button">Terms of Service</button>
            {' '}and{' '}
            <button className="underline hover:text-black" type="button">Privacy Policy</button>.
          </footer>
        </AuthCard>
      </section>
    </main>
  );
}
