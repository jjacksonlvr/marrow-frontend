'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from '@/components/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log to error reporting service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can send to error tracking service here
    if (typeof window !== 'undefined') {
      // Example: Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Something went wrong
            </h1>
            
            <p className="text-slate-600 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-sm font-mono text-red-900 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Page
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error utility functions

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export function handleApiError(error: any): ApiError {
  // Supabase error
  if (error?.message) {
    return {
      message: error.message,
      code: error.code,
      status: error.status
    };
  }

  // Fetch error
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR'
    };
  }

  // Generic error
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
}

export function getUserFriendlyError(error: any): string {
  const apiError = handleApiError(error);

  // Map common errors to user-friendly messages
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Incorrect email or password. Please try again.',
    'User already registered': 'An account with this email already exists.',
    'Email not confirmed': 'Please verify your email address before logging in.',
    'Invalid email': 'Please enter a valid email address.',
    'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
    'Network request failed': 'Network error. Please check your internet connection.',
    'Failed to fetch': 'Unable to connect. Please check your internet connection.',
  };

  // Check if we have a mapped message
  for (const [key, value] of Object.entries(errorMap)) {
    if (apiError.message.includes(key)) {
      return value;
    }
  }

  // Stripe errors
  if (apiError.message.includes('stripe')) {
    return 'Payment processing error. Please try again or contact support.';
  }

  // Rate limit errors
  if (apiError.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  // Server errors
  if (apiError.status && apiError.status >= 500) {
    return 'Server error. Our team has been notified. Please try again later.';
  }

  // Default to the original message or a generic one
  return apiError.message || 'Something went wrong. Please try again.';
}

// Retry logic for failed requests
export async function retryRequest<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      const apiError = handleApiError(error);
      if (apiError.status && apiError.status >= 400 && apiError.status < 500) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

// Log errors (can be extended to send to error tracking service)
export function logError(error: any, context?: string) {
  const apiError = handleApiError(error);
  
  console.error(`[Error${context ? ` - ${context}` : ''}]:`, {
    message: apiError.message,
    code: apiError.code,
    status: apiError.status,
    timestamp: new Date().toISOString()
  });

  // Send to error tracking service (e.g., Sentry, LogRocket)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { tags: { context } });
  }
}
