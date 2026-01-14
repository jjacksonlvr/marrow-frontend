'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Bell, Clock, Mail, Quote, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string>('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [bookingUrl, setBookingUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Get session_id from URL query params
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    
    if (id) {
      setSessionId(id);
    }
  }, []);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setStatus('error');
        setErrorMessage('No session ID found. Please check your payment confirmation email.');
        return;
      }

      try {
        // Call your Supabase Edge Function to verify the session
        const response = await fetch(
          'https://mqvuqmysklmkjtarmods.supabase.co/functions/v1/verify-session',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id: sessionId }),
          }
        );

        const data = await response.json();
        console.log('Verify response:', data);

        if (!response.ok) {
          console.error('Response not OK:', response.status, data);
          throw new Error(`Verification failed: ${data.error || 'Unknown error'}`);
        }

        if (data.paid && data.booking_url) {
          setStatus('success');
          setBookingUrl(data.booking_url);
          
          // Load Calendly widget script and CSS
          const link = document.createElement('link');
          link.href = 'https://assets.calendly.com/assets/external/widget.css';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
          
          const script = document.createElement('script');
          script.src = 'https://assets.calendly.com/assets/external/widget.js';
          script.async = true;
          script.onload = () => {
            // Initialize Calendly after script loads
            if ((window as any).Calendly) {
              (window as any).Calendly.initInlineWidget({
                url: data.booking_url,
                parentElement: document.querySelector('.calendly-inline-widget'),
              });
            }
          };
          document.body.appendChild(script);
        } else {
          console.log('Payment not confirmed. Data:', data);
          throw new Error(`Payment not confirmed. Status: ${data.status}, Payment Status: ${data.payment_status}`);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setErrorMessage('Unable to verify your payment. Please contact support.');
      }
    }

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  // Loading State
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Verifying your payment...</h2>
          <p className="text-slate-600">Please wait a moment</p>
        </div>
      </div>
    );
  }

  // Error State
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-600 mb-6">{errorMessage}</p>
          <a
            href="mailto:support@marrow.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  // Success State with Embedded Calendly
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl" />
              <CheckCircle2 className="w-24 h-24 text-green-600 relative" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8"
          >
            You're all set! Now schedule your call below.
          </motion.p>
        </div>

        {/* Calendly Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div 
              className="calendly-inline-widget" 
              data-url={bookingUrl}
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </motion.div>

        {/* Next Steps Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            What happens next
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                  <Bell className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent hidden md:block" 
                     style={{ transform: 'translateX(50%)' }} />
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mb-3">
                  1
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Pick Your Time
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Choose a time that works best for you from the calendar above
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                  <Clock className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent hidden md:block" 
                     style={{ transform: 'translateX(50%)' }} />
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mb-3">
                  2
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Get Confirmation
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  You'll receive an email confirmation with all the details
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                  <Mail className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mb-3">
                  3
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Join the Call
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Show up at your scheduled time and make a great connection
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
            Join thousands of successful professionals
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            See how Marrow has transformed careers and created meaningful connections
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
              <Quote className="w-10 h-10 text-blue-600/20 mb-4" />
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Marrow helped me connect with my dream mentor. Best investment I've made in my career."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  SK
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Sarah K.</div>
                  <div className="text-sm text-slate-500">Product Manager</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
              <Quote className="w-10 h-10 text-blue-600/20 mb-4" />
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Landed my dream job through a connection I made here. Worth every penny."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Michael R.</div>
                  <div className="text-sm text-slate-500">Software Engineer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
              <Quote className="w-10 h-10 text-blue-600/20 mb-4" />
              <p className="text-slate-700 mb-6 leading-relaxed">
                "The quality of connections is unmatched. Changed my entire LinkedIn strategy."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  JL
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Jessica L.</div>
                  <div className="text-sm text-slate-500">Founder</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-slate-500">
            Questions? Email us at{" "}
            <a href="mailto:support@marrow.com" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              support@marrow.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}