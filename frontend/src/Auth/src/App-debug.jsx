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
import { trackAuth, trackHousehold, trackPageView } from '../../utils/analytics.js';
import './index.css';

// Lazy load the Dashboard application
const DashboardApp = lazy(() => import('../../dashboard/src/App.jsx'));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingUser, setPendingUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCreateHouseForm, setShowCreateHouseForm] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [debugInfo, setDebugInfo] = useState('App initialized');

  // Get current view from URL path
  const getCurrentView = () => {
    const path = location.pathname.split('/').pop();
    return path || 'signin';
  };

  const currentView = getCurrentView();

  // Debug logging
  useEffect(() => {
    setDebugInfo(`Current view: ${currentView}, Location: ${location.pathname}`);
    console.log('Auth App Debug:', {
      currentView,
      pathname: location.pathname,
      showDashboard,
      authToken: !!authToken,
      authUser: !!authUser
    });
  }, [currentView, location.pathname, showDashboard, authToken, authUser]);

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

  // SEO and analytics would go here...

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

  // Debug render for testing
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '20px' }}>
      {/* Debug info bar */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px', 
        fontSize: '12px',
        zIndex: 1000
      }}>
        🔍 DEBUG: {debugInfo} | Path: {location.pathname} | View: {currentView}
      </div>

      <main style={{ paddingTop: '50px' }} className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
        <section className="w-full max-w-md">
          <AuthCard description="Debug mode: Testing auth page rendering">
            
            {/* Visible test content */}
            <div style={{ padding: '20px', background: 'yellow', marginBottom: '20px', color: 'black' }}>
              <h2>🧪 AUTH PAGE TEST</h2>
              <p>Current Route: {location.pathname}</p>
              <p>Current View: {currentView}</p>
              <button onClick={() => navigate('/auth/signin')} style={{ marginRight: '10px' }}>Go to SignIn</button>
              <button onClick={() => navigate('/auth/signup')}>Go to SignUp</button>
            </div>

            <Routes>
              <Route 
                path="/signin" 
                element={
                  <div>
                    <div style={{ background: 'lightgreen', padding: '10px', marginBottom: '10px' }}>
                      ✅ SignIn Route Active
                    </div>
                    <SignInForm
                      onForgotPassword={() => navigate('/auth/forgot-password')}
                      onCreateHouse={() => navigate('/auth/signup')}
                      onSignInSuccess={(token, user) => {
                        setAuthToken(token);
                        setAuthUser(user);
                        localStorage.setItem("authToken", token);
                        localStorage.setItem("authUser", JSON.stringify(user));
                        setShowDashboard(true);
                      }}
                    />
                  </div>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <div>
                    <div style={{ background: 'lightblue', padding: '10px', marginBottom: '10px' }}>
                      ✅ SignUp Route Active  
                    </div>
                    <SignUpForm onCreateHouseMateAccount={() => {}} />
                  </div>
                } 
              />
              <Route 
                path="/create-house" 
                element={
                  <div>
                    <div style={{ background: 'lightcoral', padding: '10px', marginBottom: '10px' }}>
                      ✅ Create House Route Active
                    </div>
                    <CreateHouseForm onCreateHouse={() => {}} />
                  </div>
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  <div>
                    <div style={{ background: 'lightyellow', padding: '10px', marginBottom: '10px' }}>
                      ✅ Forgot Password Route Active
                    </div>
                    <ForgotPasswordForm onBack={() => navigate('/auth/signin')} />
                  </div>
                } 
              />
              <Route path="/" element={<Navigate to="/auth/signin" replace />} />
              <Route path="*" element={<Navigate to="/auth/signin" replace />} />
            </Routes>
            
          </AuthCard>
        </section>
      </main>
    </div>
  );
}