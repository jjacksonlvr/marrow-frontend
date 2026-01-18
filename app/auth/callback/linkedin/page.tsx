'use client';

// app/auth/callback/linkedin/page.tsx
// Handles the OAuth callback from LinkedIn

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleLinkedInCallback } from '@/lib/auth-linkedin';

function LinkedInCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // Handle errors from LinkedIn
        if (errorParam) {
          const errorMsg = errorDescription || 'LinkedIn authentication was cancelled or failed';
          setError(errorMsg);
          setIsProcessing(false);
          return;
        }

        // Validate required parameters
        if (!code || !state) {
          setError('Missing required authentication parameters');
          setIsProcessing(false);
          return;
        }

        // Process the OAuth callback
        const result = await handleLinkedInCallback(code, state);

        // Redirect based on whether user is new or returning
        if (result.isNewUser) {
          // New user - go to onboarding
          router.push('/onboard');
        } else {
          // Returning user - go to dashboard
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        const errorMsg = err instanceof Error ? err.message : 'Authentication failed';
        setError(errorMsg);
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center">
            {/* Error Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Error Message */}
            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Authentication Failed
            </h2>
            <p className="mt-3 text-sm text-slate-600">{error}</p>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => router.push('/signup')}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold border-2 border-slate-200 transition-all cursor-pointer"
              >
                Go Home
              </button>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-xs text-slate-500">
              If this problem persists, please contact support at{' '}
              <a
                href="mailto:support@marrow.ideatoads.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                support@marrow.ideatoads.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-3xl font-bold text-slate-900">Marrow</span>
        </div>

        {/* Loading Spinner */}
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600"></div>
        
        {/* Loading Text */}
        <p className="mt-6 text-lg font-semibold text-slate-900">
          {isProcessing
            ? 'Completing LinkedIn authentication...'
            : 'Redirecting...'}
        </p>
        
        {/* Progress Steps */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>LinkedIn authorization received</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
              {isProcessing ? (
                <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span>Verifying your profile...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LinkedInCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-3xl font-bold text-slate-900">Marrow</span>
          </div>
          
          {/* Loading Spinner */}
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600"></div>
          <p className="mt-6 text-lg font-semibold text-slate-900">Processing LinkedIn authentication...</p>
        </div>
      </div>
    }>
      <LinkedInCallbackContent />
    </Suspense>
  );
}
