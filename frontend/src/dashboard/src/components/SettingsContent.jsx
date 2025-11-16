import React from 'react';
import { 
  Users, 
  Bell, 
  Shield, 
  Monitor, 
  Lock, 
  HelpCircle, 
  Camera,
  Mail,
  Smartphone,
  Sun,
  Moon,
  Key,
  MessageCircle,
  Volume2,
  Home,
  MapPin,
  FileText,
  Pencil
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import OptimizedImage from '../../../components/OptimizedImage.jsx';

export function SettingsContent({
  settingsTab,
  setSettingsTab,
  profileSettings,
  setProfileSettings,
  notificationSettings,
  setNotificationSettings,
  privacySettings,
  setPrivacySettings,
  appSettings,
  setAppSettings,
  userRole,
  onSaveProfile,
  onSavePrivacy,
  householdSettings,
  setHouseholdSettings,
  onSaveHouseholdSettings
}) {
  const [avatarPreview, setAvatarPreview] = React.useState(profileSettings.avatar || null);
  const [avatarFile, setAvatarFile] = React.useState(null);
  const [avatarUploading, setAvatarUploading] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState(null); // { type: 'success'|'error', message: string }

  // Show preview if avatar changes
  React.useEffect(() => {
    setAvatarPreview(profileSettings.avatar || null);
  }, [profileSettings.avatar]);

  // Avatar upload handler
  async function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarUploading(true);
    try {
      // Assume user id is in profileSettings.id
      const userId = profileSettings.id || profileSettings.userId || profileSettings.user_id;
      if (!userId) throw new Error('User ID missing for avatar upload');
      
      // Import the API helper
      const { uploadUserAvatar } = await import('../../../apiHelpers');
      const data = await uploadUserAvatar(userId, file);
      
      if (data.avatar) {
        setProfileSettings(prev => ({ ...prev, avatar: data.avatar }));
      }
    } catch (err) {
      console.error('Avatar upload error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Unknown error occurred';
      alert('Avatar upload failed: ' + errorMessage);
    } finally {
      setAvatarUploading(false);
    }
  }
  return (
    <div className="flex-1 flex">
      {/* Settings Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-6">
        <div className="space-y-2">
          <button
            onClick={() => setSettingsTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              settingsTab === 'profile' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Profile</span>
          </button>
          
          <button
            onClick={() => setSettingsTab('notifications')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              settingsTab === 'notifications' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bell size={20} />
            <span className="font-medium">Notifications</span>
          </button>
          
          <button
            onClick={() => setSettingsTab('privacy')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              settingsTab === 'privacy' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Shield size={20} />
            <span className="font-medium">Privacy</span>
          </button>
          
          {/* House Information tab - Admin only */}
          {userRole === 'admin' && (
            <button
              onClick={() => setSettingsTab('house')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                settingsTab === 'house' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              <span className="font-medium">House Information</span>
            </button>
          )}
          
          <button
            onClick={() => setSettingsTab('appearance')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              settingsTab === 'appearance' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Monitor size={20} />
            <span className="font-medium">Appearance</span>
          </button>
          
          <button
            onClick={() => setSettingsTab('security')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              settingsTab === 'security' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Lock size={20} />
            <span className="font-medium">Security</span>
          </button>
          
          <button
            onClick={() => setSettingsTab('help')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              settingsTab === 'help' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HelpCircle size={20} />
            <span className="font-medium">Help & Support</span>
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Profile Settings */}
        {settingsTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Profile Settings</h2>
              <p className="text-gray-600">Manage your personal information and preferences</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Profile Picture</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview.startsWith('/uploads/') ? `http://localhost:5000${avatarPreview}` : avatarPreview} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-white text-2xl font-medium">YO</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="avatarInput"
                      style={{ display: 'none' }}
                      onChange={handleAvatarChange}
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('avatarInput').click()} disabled={avatarUploading}>
                      <Camera size={16} className="mr-2" />
                      {avatarUploading ? 'Uploading...' : 'Change Photo'}
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>

              <Separator />


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profileName">Full Name</Label>
                  <Input
                    id="profileName"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({...profileSettings, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="profileEmail">Email Address</Label>
                  <Input
                    id="profileEmail"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="profilePhone">Phone Number</Label>
                  <Input
                    id="profilePhone"
                    type="tel"
                    value={profileSettings.phone || ''}
                    onChange={(e) => {
                      let value = e.target.value;
                      // If field is empty and user starts typing, auto-add '+27'
                      if (!profileSettings.phone && value && !value.startsWith('+27')) {
                        value = '+27' + value.replace(/^?/, '');
                      }
                      // Prevent removing '+27' prefix
                      if (!value.startsWith('+27')) {
                        value = '+27';
                      }
                      setProfileSettings({ ...profileSettings, phone: value });
                    }}
                    placeholder="+27..."
                  />
                </div>
                <div className="col-span-2">
                  <Label className="font-medium text-gray-900">Role</Label>
                  <div className="mt-1">
                    <span className="inline-block px-3 py-1 rounded bg-purple-100 text-purple-700 text-sm font-semibold border border-purple-200">
                      {userRole === 'admin' ? 'Administrator' : userRole === 'standard' ? 'Standard' : userRole === 'read-only' ? 'Read-only' : userRole}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select
                  id="preferredContact"
                  value={profileSettings.preferredContact || 'email'}
                  onValueChange={(value) => setProfileSettings({ ...profileSettings, preferredContact: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="profileBio">Bio</Label>
                <Textarea
                  id="profileBio"
                  value={profileSettings.bio}
                  onChange={(e) => setProfileSettings({...profileSettings, bio: e.target.value})}
                  rows={3}
                  placeholder="Tell your housemates about yourself..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <div className="flex flex-col items-end space-y-2 w-full">
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={async () => {
                    setSaveStatus(null);
                    try {
                      if (typeof onSaveProfile === 'function') {
                        await onSaveProfile(profileSettings);
                      } else if (typeof setProfileSettings === 'function') {
                        setProfileSettings(profileSettings);
                      }
                      setSaveStatus({ type: 'success', message: 'Changes saved successfully!' });
                    } catch (err) {
                      setSaveStatus({ type: 'error', message: err?.message || 'Error saving changes.' });
                    }
                    setTimeout(() => setSaveStatus(null), 3000);
                  }}>
                    Save Changes
                  </Button>
                  {saveStatus && (
                    <div className={`mt-2 text-sm px-3 py-2 rounded transition-all ${saveStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                      {saveStatus.message}
                    </div>
                  )}
                </div>
                <Button variant="outline" className="text-red-600 border-red-300" onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('authUser');
                  window.location.reload();
                }}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {settingsTab === 'notifications' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Notification Settings</h2>
              <p className="text-gray-600">Choose how you want to be notified about household activities</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Notification Channels</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-gray-400" />
                      <div>
                        <Label className="font-medium text-gray-900">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell size={20} className="text-gray-400" />
                      <div>
                        <Label className="font-medium text-gray-900">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Browser and mobile push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone size={20} className="text-gray-400" />
                      <div>
                        <Label className="font-medium text-gray-900">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Text message alerts for urgent items</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {settingsTab === 'privacy' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Privacy Settings</h2>
              <p className="text-gray-600">Control what information you share with your housemates</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Profile Visibility</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium text-gray-900">Show Contact Information</Label>
                      <p className="text-sm text-gray-500">Email and phone visible to housemates</p>
                    </div>
                    <Switch
                      checked={privacySettings.showContactInfo}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showContactInfo: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium text-gray-900">Show Activity Status</Label>
                      <p className="text-sm text-gray-500">Online status and last seen information</p>
                    </div>
                    <Switch
                      checked={privacySettings.showActivity}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showActivity: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={async () => {
                    setSaveStatus(null);
                    try {
                      if (typeof onSavePrivacy === 'function') {
                        await onSavePrivacy(privacySettings);
                      }
                      setSaveStatus({ type: 'success', message: 'Privacy settings saved successfully!' });
                    } catch (err) {
                      setSaveStatus({ type: 'error', message: err?.message || 'Error saving privacy settings.' });
                    }
                    setTimeout(() => setSaveStatus(null), 3000);
                  }}
                >
                  Save Changes
                </Button>
                {saveStatus && (
                  <div className={`ml-4 text-sm px-3 py-2 rounded transition-all ${saveStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                    {saveStatus.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* House Information Settings - Admin Only */}
        {settingsTab === 'house' && userRole === 'admin' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">House Information</h2>
              <p className="text-gray-600">Manage your household details, address, and rules</p>
            </div>

            <div className="space-y-6">
              {/* House Avatar and Name */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">House Avatar & Name</h3>
                
                <div className="flex items-start space-x-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <OptimizedImage
                        src={householdSettings.avatar ? `data:image/png;base64,${householdSettings.avatar}` : "/housemate-logo.png"}
                        webpSrc={householdSettings.avatar ? null : "/housemate-logo.webp"}
                        alt="House Avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        onError={e => { e.target.onerror = null; e.target.src = "/housemate-logo.png"; }}
                      />
                    </div>
                    <div className="text-center">
                      <input
                        type="file"
                        id="house-avatar-upload"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setHouseholdSettings(prev => ({
                                ...prev,
                                avatar: e.target.result.split(',')[1] // Remove data:image/...;base64, prefix
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('house-avatar-upload').click()}
                      >
                        <Camera size={16} className="mr-2" />
                        Change Avatar
                      </Button>
                    </div>
                  </div>

                  {/* House Name */}
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="house-name">House Name</Label>
                    <Input
                      id="house-name"
                      value={householdSettings.houseName}
                      onChange={(e) => setHouseholdSettings(prev => ({
                        ...prev,
                        houseName: e.target.value
                      }))}
                      placeholder="Enter house name"
                    />
                    <p className="text-sm text-gray-500">This appears in the dashboard header and notifications</p>
                  </div>
                </div>
              </div>

              {/* House Address */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin size={20} className="text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">House Address</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="house-address">Address</Label>
                  <Textarea
                    id="house-address"
                    value={householdSettings.address}
                    onChange={(e) => setHouseholdSettings(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                    placeholder="Enter your house address"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">Full address including street, city, state, and postal code</p>
                </div>
              </div>

              {/* House Rules */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText size={20} className="text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">House Rules</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="house-rules">Rules & Guidelines</Label>
                  <Textarea
                    id="house-rules"
                    value={householdSettings.houseRules}
                    onChange={(e) => setHouseholdSettings(prev => ({
                      ...prev,
                      houseRules: e.target.value
                    }))}
                    placeholder="Enter house rules and guidelines for all housemates"
                    rows={6}
                  />
                  <p className="text-sm text-gray-500">These rules will be visible to all housemates on the dashboard</p>
                </div>
              </div>

              {/* Save Button */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-end">
                  <Button 
                    onClick={() => {
                      if (onSaveHouseholdSettings) {
                        onSaveHouseholdSettings(householdSettings);
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save House Information
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appearance Settings */}
        {settingsTab === 'appearance' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Appearance Settings</h2>
              <p className="text-gray-600">Customize how the app looks and feels</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setAppSettings({...appSettings, theme: 'light'})}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      appSettings.theme === 'light' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Sun size={24} className="mx-auto mb-2 text-yellow-500" />
                    <span className="font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setAppSettings({...appSettings, theme: 'dark'})}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      appSettings.theme === 'dark' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Moon size={24} className="mx-auto mb-2 text-blue-500" />
                    <span className="font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => setAppSettings({...appSettings, theme: 'auto'})}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      appSettings.theme === 'auto' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Monitor size={24} className="mx-auto mb-2 text-gray-500" />
                    <span className="font-medium">Auto</span>
                  </button>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Display Options</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium text-gray-900">Compact Mode</Label>
                      <p className="text-sm text-gray-500">Reduce spacing and use smaller elements</p>
                    </div>
                    <Switch
                      checked={appSettings.compactMode}
                      onCheckedChange={(checked) => setAppSettings({...appSettings, compactMode: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Volume2 size={20} className="text-gray-400" />
                      <div>
                        <Label className="font-medium text-gray-900">Sound Effects</Label>
                        <p className="text-sm text-gray-500">Play sounds for notifications and actions</p>
                      </div>
                    </div>
                    <Switch
                      checked={appSettings.soundEnabled}
                      onCheckedChange={(checked) => setAppSettings({...appSettings, soundEnabled: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {settingsTab === 'security' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Security Settings</h2>
              <p className="text-gray-600">Manage your account security and login preferences</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Password & Authentication</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Key size={16} className="mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield size={16} className="mr-2" />
                    Enable Two-Factor Authentication
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help & Support */}
        {settingsTab === 'help' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <img src="/housemate-logo.png" alt="HouseMate Logo" className="w-8 h-8" />
                <h2 className="text-2xl font-semibold text-gray-900">Help & Support</h2>
              </div>
              <p className="text-gray-600">Get help and learn more about HouseMate</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle size={16} className="mr-2" />
                    FAQ & Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle size={16} className="mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">About</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Version</span>
                    <span className="text-sm font-medium text-gray-900">1.0.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Last Updated</span>
                    <span className="text-sm font-medium text-gray-900">Dec 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
