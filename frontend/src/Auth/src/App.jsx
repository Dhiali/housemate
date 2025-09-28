import { useState } from "react";
import { AuthCard } from "./components/AuthCard.jsx";
import { SignInForm } from "./components/SignInForm.jsx";
import { SignUpForm } from "./components/SignUpForm.jsx";
import { CreateHouseForm } from "./components/CreateHouseForm.jsx";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm.jsx";
import { addUser, addHouse, updateUser } from "../../apiHelpers";
import DashboardApp from '../../dashboard/src/App.jsx';
import '../../dashboard/src/index.css';



export default function App() {
  const [currentView, setCurrentView] = useState("signin");
  const [pendingUser, setPendingUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCreateHouseForm, setShowCreateHouseForm] = useState(false);

  const handleTabSwitch = (view) => {
    setCurrentView(view);
  };

  const handleForgotPassword = () => {
    setCurrentView("forgot-password");
  };

  const handleCreateHouseMateAccount = (userData) => {
    setPendingUser(userData);
    setShowCreateHouseForm(true);
    setCurrentView("create-house");
  };

  const handleCreateHouse = async (houseData) => {
    // Create user first, then house with user ID, then update user with house ID
    if (pendingUser) {
      try {
        const userRes = await addUser(pendingUser);
        const userId = userRes.data?.id || userRes.data?.user?.id;
        if (userId) {
          const houseRes = await addHouse({ ...houseData, created_by: userId });
          console.log('House creation response:', houseRes.data);
          let houseId = null;
          if (houseRes.data) {
            if (houseRes.data.id) houseId = houseRes.data.id;
            else if (houseRes.data.house && houseRes.data.house.id) houseId = houseRes.data.house.id;
            else if (houseRes.data.insertId) houseId = houseRes.data.insertId;
          }
          if (houseId) {
            const updateUrl = `/users/${userId}`;
            const updatePayload = { house_id: houseId };
            console.log('Updating user:', updateUrl, updatePayload);
            await updateUser(userId, updatePayload);
          } else {
            console.error('Could not extract houseId from response:', houseRes.data);
          }
        }
        setShowDashboard(true);
        setShowCreateHouseForm(false);
        setPendingUser(null);
      } catch (err) {
        // Handle error (optional: show error message)
        console.error('Error creating user/house:', err);
      }
    }
  };

  const handleBack = () => {
    setCurrentView("signin");
  };

  const handleSignInSuccess = () => {
  setShowDashboard(true);
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

  if (showDashboard) {
    return <DashboardApp />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthCard description={getDescription()}>
          {(currentView !== "forgot-password" && (currentView === "signin" || currentView === "create-house")) && (
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleTabSwitch("signin")}
                className={`flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 ${currentView === "signin" ? "bg-white text-blue-600 font-semibold" : "text-gray-500"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView("create-house")}
                className={`flex-1 py-2 px-4 rounded-md text-center transition-all duration-200 ${currentView === "create-house" ? "bg-white text-blue-600 font-semibold" : "text-gray-500"}`}
              >
                Create House
              </button>
            </div>
          )}
          {renderContent()}
          <div className="text-center mt-6 text-sm text-black">
            By continuing, you agree to our <button className="underline hover:text-black">Terms of Service</button> and <button className="underline hover:text-black">Privacy Policy</button>.
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
