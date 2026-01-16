'use client';

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/lib/toast-context";
import { getUserFriendlyError, logError } from "@/lib/error-handling";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast.error('Invalid input', 'Please check your email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        logError(error, 'Login');
        const friendlyError = getUserFriendlyError(error);
        toast.error('Login failed', friendlyError);
        setIsLoading(false);
        return;
      }

      // Success toast
      toast.success('Welcome back!', 'Redirecting to your dashboard...');

      // Check if user has completed onboarding
      const { data: userData } = await supabase
        .from('users')
        .select('linkedin_slug')
        .eq('id', data.user.id)
        .single();

      setTimeout(() => {
        if (userData && userData.linkedin_slug) {
          // User has completed onboarding - go to dashboard
          window.location.href = '/dashboard';
        } else {
          // User hasn't completed onboarding
          window.location.href = '/onboard';
        }
      }, 500);
      
    } catch (error) {
      console.error('Login error:', error);
      logError(error, 'Login');
      toast.error('Login failed', 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-3xl font-bold text-slate-900">Marrow</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Log in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.email;
                      return newErrors;
                    });
                  }
                }}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-blue-500"
                } outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.password;
                        return newErrors;
                      });
                    }
                  }}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors pr-12 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                  } outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            New user?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
              Create Account
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}