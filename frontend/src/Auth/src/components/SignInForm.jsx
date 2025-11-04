import { useState } from "react";
import { login } from "../../../apiHelpers";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useAuth } from "../../../UserContext.jsx";
import { useNavigate } from 'react-router-dom';

export function SignInForm({ onForgotPassword, onCreateHouse, onSignInSuccess }) {
  // Get auth context
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  
  // Validation states
  const [emailStatus, setEmailStatus] = useState(null); // 'valid', 'error', 'warning'
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await login({ email, password });
      console.log("Login response:", res);
      setError("");
      setSuccess("Login successful!");
      
      // Extract token and user data
      const token = res.data?.token;
      const user = res.data?.user;
      
      if (token && user) {
        // Use auth context to log in
        authLogin(token, user);
        
        // Call the original callback if provided
        if (onSignInSuccess) {
          onSignInSuccess(token, user);
        }
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.log("Login error:", err);
      
      // Handle different types of errors with more user-friendly messages
      if (err.code === 'ERR_NETWORK') {
        setError("Unable to connect to the server. Please check your internet connection and try again.");
      } else if (err.response?.status === 503) {
        setError("Our server is temporarily unavailable. Please try again in a few minutes.");
      } else if (err.response?.status === 500) {
        setError("Server error occurred. Please try again later.");
      } else if (err.response?.status === 401) {
        setError("Invalid email or password. Please check your credentials and try again.");
      } else if (err.response?.status === 429) {
        setError("Too many login attempts. Please wait a moment before trying again.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again.");
      }
      
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6" noValidate>
      <fieldset className="space-y-6">
        <legend className="sr-only">Sign In Credentials</legend>
        
        <div className="form-group">
          <Label htmlFor="email" className="text-sm text-gray-700 mb-2 block">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              const emailVal = e.target.value;
              if (!emailVal.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
                setEmailStatus('error');
                setEmailMsg('Invalid email format');
              } else {
                setEmailStatus('valid');
                setEmailMsg('Email format valid');
              }
            }}
            className="bg-gray-50 border-0 rounded-lg h-12"
            required
            aria-describedby={emailStatus ? "email-feedback" : undefined}
            aria-invalid={emailStatus === 'error'}
          />
          {emailStatus && (
            <div 
              id="email-feedback" 
              className={`text-xs mt-1 ${emailStatus === 'valid' ? 'text-green-600' : 'text-red-500'}`}
              role={emailStatus === 'error' ? 'alert' : 'status'}
            >
              {emailMsg}
            </div>
          )}
        </div>

        <div className="form-group">
          <Label htmlFor="password" className="text-sm text-gray-700 mb-2 block">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                const val = e.target.value;
                if (val.length < 6) {
                  setPasswordStatus('error');
                  setPasswordMsg('Password too short');
                } else {
                  setPasswordStatus('valid');
                  setPasswordMsg('Password length ok');
                }
              }}
              className="bg-gray-50 border-0 rounded-lg h-12 pr-12"
              required
              aria-describedby={passwordStatus ? "password-feedback" : undefined}
              aria-invalid={passwordStatus === 'error'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {passwordStatus && (
            <div 
              id="password-feedback" 
              className={`text-xs mt-1 ${passwordStatus === 'valid' ? 'text-green-600' : 'text-red-500'}`}
              role={passwordStatus === 'error' ? 'alert' : 'status'}
            >
              {passwordMsg}
            </div>
          )}
        </div>
      </fieldset>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
          />
          <Label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </Label>
        </div>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Forgot password?
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-2" role="alert" aria-live="polite">
          {error}
        </div>
      )}
      {success && !error && (
        <div className="text-green-500 mb-2" role="status" aria-live="polite">
          {success}
        </div>
      )}

      <Button 
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 rounded-lg"
      >
        {loading ? "Signing in..." : "Sign in to HouseMate"}
      </Button>
    </form>
  );
}
