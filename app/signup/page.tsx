'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { signUpWithLinkedIn } from "@/lib/auth-linkedin";
import { CheckCircle2, Shield, Zap, Users } from "lucide-react";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLinkedInSignup = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signUpWithLinkedIn();
      // User will be redirected to LinkedIn - no need to handle response
    } catch (error) {
      console.error('LinkedIn signup failed:', error);
      setError('LinkedIn authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-3xl font-bold text-slate-900">Marrow</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Join Marrow</h1>
          <p className="text-slate-600">Turn your LinkedIn network into revenue</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* LinkedIn OAuth Button */}
          <button
            onClick={handleLinkedInSignup}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting to LinkedIn...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>Continue with LinkedIn</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-500 font-medium">
                Why LinkedIn only?
              </span>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Zero Fraud</h3>
                <p className="text-sm text-slate-600">
                  Only verified LinkedIn profiles can join. No scammers, no impersonators, no fake accounts.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Build Trust</h3>
                <p className="text-sm text-slate-600">
                  People booking you see your verified LinkedIn profile, real credentials, and professional history.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Instant Setup</h3>
                <p className="text-sm text-slate-600">
                  We auto-fill your name, photo, and profile URL. No typing, no verification delays.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Verified Badge</h3>
                <p className="text-sm text-slate-600">
                  Show everyone you're legitimate with a verified checkmark next to your profile.
                </p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold">Your privacy is protected.</span> We only access your public LinkedIn profile (name, photo, URL). We never post on your behalf or access your connections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Log in
            </a>
          </p>
          
          <p className="text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
