'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('linkedin_slug', slug)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        setLoading(false);
        return;
      }

      setUser(data);
      setLoading(false);

      // Auto-open modal if coming from extension
      if (searchParams.get('from') === 'extension') {
        setShowModal(true);
      }
    }

    loadUser();
  }, [slug, searchParams]);

  async function handleBookNow() {
    setCheckingOut(true);

    try {
      const response = await fetch(
        'https://mqvuqmysklmkjtarmods.supabase.co/functions/v1/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
          body: JSON.stringify({ linkedin_slug: slug }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      // Redirect to Stripe
      window.location.href = data.url;
    } catch (err: any) {
      alert(err.message || 'Failed to start checkout');
      setCheckingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h1>
          <p className="text-slate-600">This creator profile does not exist or is not active.</p>
        </div>
      </div>
    );
  }

  const price = ((user.price_cents || 0) / 100).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <a href="/" className="text-2xl font-bold text-blue-600">Marrow</a>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            {user.profile_picture_url && (
              <img
                src={user.profile_picture_url}
                alt={user.full_name}
                className="w-24 h-24 rounded-full"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.full_name}</h1>
              <h2 className="text-xl text-slate-700 mb-2">{user.title || 'Consultant'}</h2>
              <p className="text-slate-600">{user.description || 'Available for consultations'}</p>
            </div>
          </div>

          {/* Benefits */}
          {(user.bullet_title_1 || user.bullet_title_2 || user.bullet_title_3) && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">What You'll Get:</h3>
              <div className="space-y-4">
                {user.bullet_title_1 && (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.bullet_title_1}</div>
                      {user.bullet_desc_1 && (
                        <div className="text-slate-600 text-sm">{user.bullet_desc_1}</div>
                      )}
                    </div>
                  </div>
                )}
                {user.bullet_title_2 && (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.bullet_title_2}</div>
                      {user.bullet_desc_2 && (
                        <div className="text-slate-600 text-sm">{user.bullet_desc_2}</div>
                      )}
                    </div>
                  </div>
                )}
                {user.bullet_title_3 && (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.bullet_title_3}</div>
                      {user.bullet_desc_3 && (
                        <div className="text-slate-600 text-sm">{user.bullet_desc_3}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pricing */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-blue-900">${price}</div>
                <div className="text-blue-700">30-minute session</div>
              </div>
              <div className="text-5xl">💼</div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-lg transition-all shadow-lg"
          >
            Book Your Session Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all hover:scale-105"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                CONSULTATION SESSION
              </div>
              <h2 className="text-3xl font-bold mb-2">{user.title || 'Book Time'}</h2>
              <p className="text-lg opacity-95">{user.description || 'Professional consultation'}</p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Marketing */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-blue-900 font-bold text-lg mb-3 flex items-center gap-2">
                  <span>🚀</span>
                  <span>Why Book This Session?</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-blue-800">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Get insider knowledge that's not available anywhere else</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-800">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Fast-track your career with expert guidance</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-800">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Ask anything - personalized advice for your situation</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              {(user.bullet_title_1 || user.bullet_title_2 || user.bullet_title_3) && (
                <div className="space-y-3 mb-6">
                  {user.bullet_title_1 && (
                    <div className="flex gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md transition-all cursor-pointer">
                      <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.bullet_title_1}</div>
                        {user.bullet_desc_1 && (
                          <div className="text-slate-600 text-sm mt-1">{user.bullet_desc_1}</div>
                        )}
                      </div>
                    </div>
                  )}
                  {user.bullet_title_2 && (
                    <div className="flex gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md transition-all cursor-pointer">
                      <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.bullet_title_2}</div>
                        {user.bullet_desc_2 && (
                          <div className="text-slate-600 text-sm mt-1">{user.bullet_desc_2}</div>
                        )}
                      </div>
                    </div>
                  )}
                  {user.bullet_title_3 && (
                    <div className="flex gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md transition-all cursor-pointer">
                      <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.bullet_title_3}</div>
                        {user.bullet_desc_3 && (
                          <div className="text-slate-600 text-sm mt-1">{user.bullet_desc_3}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 mb-6 flex items-center justify-between text-white hover:scale-105 hover:shadow-lg transition-all cursor-pointer">
                <div>
                  <div className="text-5xl font-bold">${price}</div>
                  <div className="text-lg opacity-90">30-minute session</div>
                </div>
                <div className="text-6xl opacity-90">💼</div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={checkingOut}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 hover:scale-105 hover:shadow-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-3"
              >
                {checkingOut ? 'Opening checkout...' : 'Book Your Session Now'}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 text-slate-600 hover:text-slate-900 font-semibold transition-all hover:scale-105"
              >
                Maybe later
              </button>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                <div className="text-sm text-slate-600 mb-2">🔒 Secure payment powered by Stripe</div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
                    M
                  </div>
                  <span>Powered by Marrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}