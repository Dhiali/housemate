import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ForgotPasswordForm({ onBack }) {
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Forgot Password</h2>
       
      </div>
      <div>
        <Label htmlFor="email" className="text-sm text-gray-700 mb-2 block">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-gray-50 border-0 rounded-lg h-12"
        />
      </div>
      <Button className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 h-12 rounded-lg">
        Send Reset Link
      </Button>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <button
            type="button"
            onClick={onBack}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
