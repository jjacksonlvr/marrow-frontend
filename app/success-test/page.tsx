'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Mail, ArrowRight, Loader2 } from 'lucide-react';

interface BookingDetails {
  creatorName: string;
  creatorEmail: string;
  amount: number;
  calendlyUrl: string;
  customerEmail: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found. Please check your email for booking details.');
      setLoading(false);
      return;
    }

    fetchBookingDetails();
  }, [sessionId]);

  async function fetchBookingDetails() {
    try {
      const response = await fetch('/api/get-booking-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }

      const data = await response.json();
      setBooking(data);
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError('Unable to load booking details. Please check your email for confirmation.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Marrow</span>
          </a>
        </div>
      </header>

      {/* Success Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 px-8 py-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-green-100 text-lg">Your booking has been confirmed</p>
          </div>

          {/* Booking Details */}
          <div className="px-8 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Check Your Email</h3>
                    <p className="text-slate-600 text-sm">
                      We've sent a confirmation to <strong>{booking?.customerEmail}</strong> with your booking details and receipt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Schedule Your Time</h3>
                    <p className="text-slate-600 text-sm">
                      Click the button below to choose your preferred time slot on {booking?.creatorName}'s calendar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Prepare for Your Call</h3>
                    <p className="text-slate-600 text-sm">
                      You'll receive a calendar invite with the meeting link. Come prepared with questions to make the most of your time!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600">Session with {booking?.creatorName}</span>
                <span className="font-semibold text-slate-900">${(booking?.amount || 0) / 100}</span>
              </div>
              <div className="text-sm text-slate-500">30-minute consultation</div>
            </div>

            {/* CTA Button */}
            {booking?.calendlyUrl && (
              <a
                href={booking.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-6 h-6" />
                Schedule Your Session Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {/* Email Reminder */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-900 font-medium mb-1">Didn't receive the email?</p>
                  <p className="text-blue-700">
                    Check your spam folder or contact us at{' '}
                    <a href="mailto:support@marrow.ideatoads.com" className="underline hover:text-blue-800">
                      support@marrow.ideatoads.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Return Home Link */}
        <div className="text-center mt-8">
          <a href="/" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            ← Return to Marrow Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
