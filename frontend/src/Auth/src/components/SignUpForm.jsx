import { useState } from "react";
import { register } from "../../../apiHelpers";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";


// Accept onSignUpSuccess prop
export function SignUpForm({ onCreateHouseMateAccount, houseId, onSignUpSuccess }) {
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

  const handleRegister = async (e) => {
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
    if (!houseId) {
      setError("House must be created first.");
      return;
    }
    setLoading(true);
    try {
      const res = await register({
        name: firstName,
        surname: lastName,
        email,
        password,
        house_id: houseId,
        // Add other fields here as needed (bio, phone, preferred_contact, avatar)
      });
      setSuccess("Account created! Redirecting to dashboard...");
      setFirstName(""); setLastName(""); setEmail(""); setPassword(""); setConfirmPassword("");
      if (onSignUpSuccess) onSignUpSuccess();
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed.");
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
            onChange={e => setFirstName(e.target.value)}
            className="bg-gray-50 border-0 rounded-lg h-12"
          />
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
            onChange={e => setLastName(e.target.value)}
            className="bg-gray-50 border-0 rounded-lg h-12"
          />
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
          onChange={e => setEmail(e.target.value)}
          className="bg-gray-50 border-0 rounded-lg h-12"
        />
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
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border-0 rounded-lg h-12 pr-12"
          />
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-50 border-0 rounded-lg h-12 pr-12"
          />
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
