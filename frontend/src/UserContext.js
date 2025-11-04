import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the authentication context
const UserContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

// Authentication provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Role-based permission checks
  const permissions = {
    // Admin permissions
    canViewAllTasks: () => user?.role === 'admin',
    canViewAllBills: () => user?.role === 'admin',
    canViewAllSchedule: () => user?.role === 'admin',
    canAssignTasksToOthers: () => user?.role === 'admin',
    canPayBillsForOthers: () => user?.role === 'admin',
    canInviteHousemates: () => user?.role === 'admin',
    canManageRoles: () => user?.role === 'admin',
    canEditHouseInfo: () => user?.role === 'admin',
    canDeleteAnyTask: () => user?.role === 'admin',
    canDeleteAnyBill: () => user?.role === 'admin',
    canDeleteAnyEvent: () => user?.role === 'admin',
    
    // Standard user permissions
    canCreateTasks: () => user?.role === 'standard' || user?.role === 'admin',
    canCreateBills: () => user?.role === 'standard' || user?.role === 'admin',
    canCreateEvents: () => user?.role === 'standard' || user?.role === 'admin',
    canEditOwnTasks: () => user?.role === 'standard' || user?.role === 'admin',
    canEditOwnBills: () => user?.role === 'standard' || user?.role === 'admin',
    canEditOwnEvents: () => user?.role === 'standard' || user?.role === 'admin',
    canPayOwnBills: () => user?.role === 'standard' || user?.role === 'admin',
    canEditProfile: () => user?.role === 'standard' || user?.role === 'admin',
    
    // Read-only restrictions
    isReadOnly: () => user?.role === 'read_only',
    canEdit: () => user?.role !== 'read_only',
    
    // House creator permissions
    isHouseCreator: () => user?.is_house_creator === true || user?.is_house_creator === 1,
    
    // General permissions
    canSendMessages: () => user?.role === 'admin' || user?.role === 'standard',
    canViewHousemateDetails: () => user?.role === 'admin' || user?.role === 'standard' || user?.role === 'read_only',
  };

  // Initialize authentication on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          setIsAuthenticated(true);
          
          // Verify token is still valid by making a test request
          // You can add this later when you have a /verify endpoint
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          logout();
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('token', tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Update user data (for when role changes, etc.)
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Get authorization header for API requests
  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Role display helpers
  const getRoleDisplayName = () => {
    switch (user?.role) {
      case 'admin':
        return user?.is_house_creator ? 'House Creator' : 'Admin';
      case 'standard':
        return 'Member';
      case 'read_only':
        return 'Guest';
      default:
        return 'Unknown';
    }
  };

  // Check if user has specific permission
  const hasPermission = (permissionName) => {
    if (!user || !permissions[permissionName]) {
      return false;
    }
    return permissions[permissionName]();
  };

  // Context value
  const value = {
    // State
    user,
    token,
    loading,
    isAuthenticated,
    
    // Functions
    login,
    logout,
    updateUser,
    getAuthHeader,
    getRoleDisplayName,
    hasPermission,
    
    // Permissions object for easy access
    permissions,
    
    // Quick access to common checks
    isAdmin: user?.role === 'admin',
    isStandard: user?.role === 'standard',
    isReadOnly: user?.role === 'read_only',
    isHouseCreator: user?.is_house_creator === true || user?.is_house_creator === 1,
    houseId: user?.house_id,
    userId: user?.id,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;