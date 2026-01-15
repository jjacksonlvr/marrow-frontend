'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Copy, Check, LogOut, DollarSign, Users, TrendingUp, Edit2, Save, X, Chrome, Download, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [connectingStripe, setConnectingStripe] = useState(false);
  
  // Revenue calculator state
  const [calcClients, setCalcClients] = useState(10);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_cents: 0,
    bullet_title_1: '',
    bullet_desc_1: '',
    bullet_title_2: '',
    bullet_desc_2: '',
    bullet_title_3: '',
    bullet_desc_3: '',
    booking_url: '',
    is_active: true,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true' && user) {
      // Refresh profile to get updated Stripe status
      loadProfile(user.id);
      // Clean up URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [user]);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setUser(user);
    await loadProfile(user.id);
    await loadOrders(user.id);
  }

  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error loading profile:', error);
      setLoading(false);
      return;
    }

    setProfile(data);
    setFormData({
      title: data.title || '',
      description: data.description || '',
      price_cents: data.price_cents || 0,
      bullet_title_1: data.bullet_title_1 || '',
      bullet_desc_1: data.bullet_desc_1 || '',
      bullet_title_2: data.bullet_title_2 || '',
      bullet_desc_2: data.bullet_desc_2 || '',
      bullet_title_3: data.bullet_title_3 || '',
      bullet_desc_3: data.bullet_desc_3 || '',
      booking_url: data.booking_url || '',
      is_active: data.is_active ?? true,
    });
    setLoading(false);
  }

  async function loadOrders(userId: string) {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    setOrders(data || []);
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase
      .from('users')
      .update(formData)
      .eq('id', user.id);

    if (error) {
      alert('Error saving: ' + error.message);
      setSaving(false);
      return;
    }

    await loadProfile(user.id);
    setEditing(false);
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  async function connectStripeAccount() {
    setConnectingStripe(true);
    
    try {
      // Step 1: Create Connect account
      const createRes = await fetch(
        'https://mqvuqmysklmkjtarmods.supabase.co/functions/v1/create-connect-account',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xdnVxbXlza2xta2p0YXJtb2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNzU1MjksImV4cCI6MjA4Mzc1MTUyOX0.f1hm3vdXHLx3m5-Eya6N7v2XuPow3otgtO_Mwr1vMOs',
          },
          body: JSON.stringify({
            email: user.email,
            user_id: user.id,
          }),
        }
      );

      const createData = await createRes.json();
      
      if (!createRes.ok) {
        throw new Error(createData.error || 'Failed to create account');
      }

      // Step 2: Save account ID to database
      await supabase
        .from('users')
        .update({ stripe_account_id: createData.account_id })
        .eq('id', user.id);

      // Step 3: Create account link
      const linkRes = await fetch(
        'https://mqvuqmysklmkjtarmods.supabase.co/functions/v1/create-account-link',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xdnVxbXlza2xta2p0YXJtb2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNzU1MjksImV4cCI6MjA4Mzc1MTUyOX0.f1hm3vdXHLx3m5-Eya6N7v2XuPow3otgtO_Mwr1vMOs',
          },
          body: JSON.stringify({
            account_id: createData.account_id,
          }),
        }
      );

      const linkData = await linkRes.json();
      
      if (!linkRes.ok) {
        throw new Error(linkData.error || 'Failed to create onboarding link');
      }

      // Redirect to Stripe onboarding
      window.location.href = linkData.url;
    } catch (error: any) {
      alert(error.message || 'Failed to connect Stripe account');
      setConnectingStripe(false);
    }
  }

  function copyProfileLink() {
    if (!profile?.linkedin_slug) return;
    const link = `https://linkedin.com/in/${profile.linkedin_slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const totalEarnings = orders.reduce((sum, order) => sum + (order.creator_net_cents || 0), 0) / 100;
  const totalOrders = orders.length;
  const priceDisplay = (formData.price_cents / 100).toFixed(0);
  
  // Revenue calculator
  const userPrice = formData.price_cents / 100;
  const grossRevenue = userPrice * calcClients * 4; // 4 weeks per month
  const platformFee = grossRevenue * 0.2;
  const netRevenue = grossRevenue - platformFee;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Profile Not Found</h1>
          <p className="text-slate-600 mb-6">You haven't completed onboarding yet.</p>
          <a href="/onboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Complete Onboarding
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Marrow</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition">
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back! 👋</h1>
          <p className="text-lg text-slate-600">Manage your profile and track your earnings</p>
        </div>

        {/* Chrome Extension Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Chrome className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Install the Chrome Extension</h3>
              </div>
              <p className="text-purple-100 mb-6">Add your booking button to your LinkedIn profile so people can book with you. Takes 30 seconds!</p>
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>Download Extension</span>
              </button>
            </div>
            <div className="text-6xl opacity-20">💻</div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Total Earnings</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">${totalEarnings.toFixed(2)}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Total Bookings</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{totalOrders}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Your Price</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">${priceDisplay}</div>
          </motion.div>
        </div>

        {/* Revenue Calculator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-green-700" />
            <h3 className="text-2xl font-bold text-green-900">Your Earning Potential</h3>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-green-800 mb-3">
              Clients Per Week
            </label>
            <input
              type="number"
              value={calcClients}
              onChange={(e) => setCalcClients(Number(e.target.value))}
              className="w-full max-w-xs px-4 py-3 rounded-xl border-2 border-green-300 focus:border-green-500 outline-none transition text-xl font-semibold"
              min="0"
            />
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-center shadow-lg">
            <div className="text-green-100 text-sm font-semibold mb-3">ESTIMATED MONTHLY EARNINGS</div>
            <div className="text-6xl font-bold text-white mb-4">
              ${grossRevenue.toLocaleString()}
            </div>
            <p className="text-green-100 text-lg">
              Book {calcClients} clients per week at ${userPrice}/session
            </p>
          </div>
        </motion.div>

        {/* Stripe Connect Banner */}
        {!profile.stripe_onboarding_complete && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Connect Your Stripe Account</h3>
                <p className="text-blue-100 mb-6">To receive payouts, you need to connect your Stripe account. This takes about 2 minutes.</p>
                <button onClick={connectStripeAccount} disabled={connectingStripe} className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {connectingStripe ? (
                    <>
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span>Setting up...</span>
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-5 h-5" />
                      <span>Connect Stripe Now</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-6xl opacity-20">💳</div>
            </div>
          </motion.div>
        )}

        {profile.stripe_onboarding_complete && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-8 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-lg">Stripe Connected</div>
                <div className="text-green-100 text-sm">You're ready to receive payouts</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Your Profile</h2>
              <p className="text-slate-600 mt-1">This is what people see when they visit your LinkedIn</p>
            </div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition">
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50">
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <div className="font-semibold text-slate-900">Profile Status</div>
                <div className="text-sm text-slate-600">Turn your profile on or off</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} disabled={!editing} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your LinkedIn Profile</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                  linkedin.com/in/{profile.linkedin_slug}
                </div>
                <button onClick={copyProfileLink} className="px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Offer Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} disabled={!editing} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-slate-50" placeholder="e.g., 30-Min Career Consultation" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} disabled={!editing} rows={3} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-slate-50 resize-none" placeholder="Describe what people get" />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Price (in dollars)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input type="number" value={(formData.price_cents / 100).toFixed(0)} onChange={(e) => setFormData({ ...formData, price_cents: parseInt(e.target.value) * 100 })} disabled={!editing} className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-slate-50" />
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">What You Offer (3 Benefits)</h3>
              
              <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                <input type="text" value={formData.bullet_title_1} onChange={(e) => setFormData({ ...formData, bullet_title_1: e.target.value })} disabled={!editing} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-white" placeholder="Benefit 1 Title" />
                <input type="text" value={formData.bullet_desc_1} onChange={(e) => setFormData({ ...formData, bullet_desc_1: e.target.value })} disabled={!editing} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-white" placeholder="Benefit 1 Description" />
              </div>

              <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                <input type="text" value={formData.bullet_title_2} onChange={(e) => setFormData({ ...formData, bullet_title_2: e.target.value })} disabled={!editing} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-white" placeholder="Benefit 2 Title" />
                <input type="text" value={formData.bullet_desc_2} onChange={(e) => setFormData({ ...formData, bullet_desc_2: e.target.value })} disabled={!editing} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-white" placeholder="Benefit 2 Description" />
              </div>

              <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                <input type="text" value={formData.bullet_title_3} onChange={(e) => setFormData({ ...formData, bullet_title_3: e.target.value })} disabled={!editing} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-white" placeholder="Benefit 3 Title" />
                <input type="text" value={formData.bullet_desc_3} onChange={(e) => setFormData({ ...formData, bullet_desc_3: e.target.value })} disabled={!editing} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-white" placeholder="Benefit 3 Description" />
              </div>
            </div>

            {/* Calendly */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Calendly URL</label>
              <input type="text" value={formData.booking_url} onChange={(e) => setFormData({ ...formData, booking_url: e.target.value })} disabled={!editing} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition disabled:bg-slate-50" placeholder="https://calendly.com/yourusername" />
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        {orders.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Your Earnings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{order.stripe_customer_email}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">${(order.amount_total_cents / 100).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">${(order.creator_net_cents / 100).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}