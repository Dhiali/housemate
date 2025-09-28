import { useState } from "react";
import { register } from "../../../apiHelpers";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";


// Accept onSignUpSuccess prop
export function SignUpForm({ onCreateHouseMateAccount, houseId, onSignUpSuccess }) {
  // Validation states
  const [firstNameStatus, setFirstNameStatus] = useState(null); // 'valid', 'error', 'warning'
  const [lastNameStatus, setLastNameStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [confirmStatus, setConfirmStatus] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleRegister = (e) => {
  // ...existing code...
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!agreeToTerms) {
      setError("You must agree to the terms.");
      return;
    }
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Pass user info up, do not send to backend yet
    if (onCreateHouseMateAccount) {
      onCreateHouseMateAccount({
        name: firstName,
        surname: lastName,
        email,
        password,
        // Add other fields here as needed (bio, phone, preferred_contact, avatar)
      });
    }
    setLoading(false);
  };

  return (
  <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm text-gray-700 mb-2 block">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
              if (e.target.value.length > 1) setFirstNameStatus('valid');
              else setFirstNameStatus('error');
            }}
            className="bg-gray-50 border-0 rounded-lg h-12"
          />
          {firstNameStatus === 'valid' && <div className="text-green-600 text-xs mt-1">Looks good!</div>}
          {firstNameStatus === 'error' && <div className="text-red-500 text-xs mt-1">First name required</div>}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-sm text-gray-700 mb-2 block">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={e => {
              setLastName(e.target.value);
              if (e.target.value.length > 1) setLastNameStatus('valid');
              else setLastNameStatus('error');
            }}
            className="bg-gray-50 border-0 rounded-lg h-12"
          />
          {lastNameStatus === 'valid' && <div className="text-green-600 text-xs mt-1">Looks good!</div>}
          {lastNameStatus === 'error' && <div className="text-red-500 text-xs mt-1">Last name required</div>}
        </div>
      </div>
      <div>
        <Label htmlFor="email" className="text-sm text-gray-700 mb-2 block">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={async e => {
            setEmail(e.target.value);
            // Simple email format check
            const emailVal = e.target.value;
            if (!emailVal.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
              setEmailStatus('error');
              setEmailMsg('Invalid email format');
            } else {
              // Check uniqueness (simulate API call)
              setEmailStatus('warning');
              setEmailMsg('Checking email...');
              try {
                const res = await fetch('http://localhost:3000/users');
                const users = await res.json();
                if (users.some(u => u.email === emailVal)) {
                  setEmailStatus('error');
                  setEmailMsg('Email already taken');
                } else {
                  setEmailStatus('valid');
                  setEmailMsg('Email is available');
                }
              } catch {
                setEmailStatus('warning');
                setEmailMsg('Could not verify email');
              }
            }
          }}
          className="bg-gray-50 border-0 rounded-lg h-12"
        />
        {emailStatus === 'valid' && <div className="text-green-600 text-xs mt-1">{emailMsg}</div>}
        {emailStatus === 'error' && <div className="text-red-500 text-xs mt-1">{emailMsg}</div>}
        {emailStatus === 'warning' && <div className="text-orange-500 text-xs mt-1">{emailMsg}</div>}
      </div>
    
    <div>
        <Label htmlFor="password" className="text-sm text-gray-700 mb-2 block">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              // Password strength check
              const val = e.target.value;
              if (val.length < 6) {
                setPasswordStatus('error');
                setPasswordMsg('Password too short');
              } else if (!val.match(/[A-Z]/) || !val.match(/[0-9]/)) {
                setPasswordStatus('warning');
                setPasswordMsg('Add a capital letter and a number');
              } else {
                setPasswordStatus('valid');
                setPasswordMsg('Strong password');
              }
            }}
            className="bg-gray-50 border-0 rounded-lg h-12 pr-12"
          />
          {passwordStatus === 'valid' && <div className="text-green-600 text-xs mt-1">{passwordMsg}</div>}
          {passwordStatus === 'error' && <div className="text-red-500 text-xs mt-1">{passwordMsg}</div>}
          {passwordStatus === 'warning' && <div className="text-orange-500 text-xs mt-1">{passwordMsg}</div>}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-sm text-gray-700 mb-2 block">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              if (e.target.value === password && e.target.value.length > 0) {
                setConfirmStatus('valid');
                setConfirmMsg('Passwords match');
              } else if (e.target.value.length === 0) {
                setConfirmStatus(null);
                setConfirmMsg('');
              } else {
                setConfirmStatus('error');
                setConfirmMsg('Passwords do not match');
              }
            }}
            className="bg-gray-50 border-0 rounded-lg h-12 pr-12"
          />
          {confirmStatus === 'valid' && <div className="text-green-600 text-xs mt-1">{confirmMsg}</div>}
          {confirmStatus === 'error' && <div className="text-red-500 text-xs mt-1">{confirmMsg}</div>}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
            className="mt-1"
          />
        <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
          I agree to the{" "}
          <button type="button" className="text-blue-500 hover:text-blue-600">
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="text-blue-500 hover:text-blue-600">
            Privacy Policy
          </button>
        </Label>
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <Button 
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 rounded-lg"
      >
        {loading ? "Registering..." : "Create HouseMate Account"}
      </Button>

    </div>
  );
}
