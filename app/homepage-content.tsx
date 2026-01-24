'use client';

import { 
  Briefcase, 
  DollarSign, 
  Target, 
  Rocket, 
  Award,
  Chrome,
  Calendar,
  Shield,
  Clock,
  ChevronDown,
  Linkedin,
  Twitter,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function HomepageContent() {
  const [calendlyExpanded, setCalendlyExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Revenue calculator state
  const [calcPrice, setCalcPrice] = useState(200);
  const [calcClients, setCalcClients] = useState(10);
  
  const grossRevenue = calcPrice * calcClients * 4; // 4 weeks per month
  const platformFee = grossRevenue * 0.2;
  const netRevenue = grossRevenue - platformFee;

  useEffect(() => {
    checkAuth();
    // Expand Calendly on desktop only
    if (window.innerWidth >= 768) {
      setCalendlyExpanded(true);
    }
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);
  }

  const handleGetStarted = () => {
    window.location.href = '/signup';
  };

  const handleDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Marrow</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="/how-it-works" className="text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer">
              How It Works
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer">
              Pricing
            </a>
            <a href="/faq" className="text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer">
              FAQ
            </a>
            {isLoggedIn ? (
              <button
                onClick={handleDashboard}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all cursor-pointer"
                >
                  Start Earning
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Monetize Your LinkedIn Network
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                You've spent years building connections and expertise. Now get paid when people want to reach you. 
                Set your price, control access, earn on your terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-105 cursor-pointer"
                >
                  Start Earning Today
                </button>
                <a
                  href="/how-it-works"
                  className="px-8 py-4 border-2 border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl font-semibold text-lg transition-all hover:bg-slate-50 cursor-pointer text-center"
                >
                  See How It Works
                </a>
              </div>
              
              {/* Trust Bar */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-4">Join 1,000+ creators earning</p>
                <div className="flex items-center gap-6 opacity-40">
                  <div className="text-slate-400 font-semibold">STRIPE</div>
                  <div className="text-slate-400 font-semibold">GOOGLE</div>
                  <div className="text-slate-400 font-semibold">META</div>
                  <div className="text-slate-400 font-semibold">NETFLIX</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full" />
                  <div>
                    <div className="font-semibold text-lg text-slate-900">Sarah Chen</div>
                    <div className="text-slate-500">VP of Product at Tech Unicorn</div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-5/6" />
                  <div className="h-3 bg-slate-100 rounded w-4/6" />
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                  <div className="text-3xl font-bold mb-2">$200 to Connect</div>
                  <p className="text-blue-100 mb-4">30-min product strategy consultation</p>
                  <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer">
                    Book Time With Sarah
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Calculate Your Potential Earnings
            </h2>
            <p className="text-xl text-slate-600">
              See how much you could earn by monetizing your LinkedIn network
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 border-2 border-blue-100 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Your Price Per Session
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-4 text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Clients Per Week
                </label>
                <input
                  type="number"
                  value={calcClients}
                  onChange={(e) => setCalcClients(Number(e.target.value))}
                  className="w-full px-4 py-4 text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
              <div className="text-sm uppercase tracking-wide mb-2 text-blue-100">
                Your Monthly Earnings
              </div>
              <div className="text-6xl font-bold mb-2">
                ${netRevenue.toLocaleString()}
              </div>
              <div className="text-blue-100 text-sm">
                After platform fee ({calcClients * 4} sessions/month)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Start earning from your network in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                step: "1",
                title: "Set Your Price",
                description: "Choose how much you want to charge for a 30-minute consultation based on your expertise."
              },
              {
                icon: Chrome,
                step: "2",
                title: "Install Extension",
                description: "Add our Chrome extension to display a booking button on your LinkedIn profile."
              },
              {
                icon: DollarSign,
                step: "3",
                title: "Get Paid",
                description: "When someone books time with you, you receive 80% of the fee directly to your bank."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 cursor-pointer"
            >
              View Full Guide
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Monetize Your Network
            </h2>
            <p className="text-xl text-slate-600">
              Professional tools designed to help you earn more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Set Your Own Price",
                description: "You're in control. Charge what you're worth based on your expertise and demand."
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description: "All payments processed through Stripe. Bank-level security for your transactions."
              },
              {
                icon: Calendar,
                title: "Calendly Integration",
                description: "Seamlessly connect your calendar. Let clients book time that works for both of you."
              },
              {
                icon: Clock,
                title: "Save Time",
                description: "No more back-and-forth emails. Automated booking and payment in one click."
              },
              {
                icon: Award,
                title: "Keep 80%",
                description: "You earn 80% of every booking. Automatic payouts to your bank account."
              },
              {
                icon: Rocket,
                title: "Easy Setup",
                description: "Get started in under 10 minutes. No technical knowledge required."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section id="faq" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about monetizing your LinkedIn profile
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                q: "How does Marrow work?",
                a: "Marrow adds a booking button to your LinkedIn profile. When someone wants to connect, they pay your fee and receive a Calendly link to schedule time with you."
              },
              {
                q: "How much can I charge?",
                a: "You set your own price! Most users charge between $50-$500 per 30-minute session depending on their expertise and demand."
              },
              {
                q: "When do I get paid?",
                a: "You receive 80% of each booking fee. Payments are processed through Stripe and deposited directly into your bank account within 2-7 business days."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-slate-200"
              >
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            >
              View All Questions
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Calendly FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Do I need Calendly?
                </h3>
                <p className="text-slate-600">
                  Yes, you'll need a free Calendly account to manage your bookings.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <p className="text-slate-700 font-medium">
                  Don't worry - it's free and takes 5 minutes to set up
                </p>
              </div>
              <button
                onClick={() => setCalendlyExpanded(!calendlyExpanded)}
                className="ml-4 p-2 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronDown 
                  className={`w-6 h-6 text-blue-600 transition-transform ${
                    calendlyExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            
            {calendlyExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 space-y-4"
              >
                <p className="text-slate-600 text-sm">
                  We'll walk you through setting up a free Calendly account in under 5 minutes.
                </p>
                <ol className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                      1
                    </span>
                    <span>Go to calendly.com and sign up (free)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                      2
                    </span>
                    <span>Connect your calendar (Google/Outlook)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                      3
                    </span>
                    <span>Create a 30-minute event type</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                      4
                    </span>
                    <span>Copy your Calendly link</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                      5
                    </span>
                    <span>Paste it in Marrow during setup</span>
                  </li>
                </ol>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            You Set Your Own Price
          </h2>
          
          <div className="mt-12 bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 border-2 border-slate-200 shadow-xl">
            <div className="text-5xl font-bold text-slate-900 mb-4">
              Your Expertise. Your Network. Your Price.
            </div>
            <p className="text-xl text-slate-600 mb-8">
              Set your connection fee based on your expertise, demand, and the strength of your network. 
              You're in complete control.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="text-sm text-slate-500 mb-2">Rising Professional</div>
                <div className="text-3xl font-bold text-slate-900">$50-$100</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-500">
                <div className="text-sm text-blue-600 mb-2">Experienced Executive</div>
                <div className="text-3xl font-bold text-slate-900">$200-$300</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="text-sm text-slate-500 mb-2">Industry Leader</div>
                <div className="text-3xl font-bold text-slate-900">$500+</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Shield className="w-5 h-5" />
              <span>Payments processed securely via Stripe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready To Monetize Your Network?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals turning their networks into income
          </p>
          <button
            onClick={handleGetStarted}
            className="px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 cursor-pointer"
          >
            Get Started - It's Free
          </button>
          <p className="mt-6 text-blue-200 text-sm">
            No credit card required. Set up in 5 minutes.
          </p>
        </div>
      </section>

      {/* How Buyers Find You Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              People Are Searching for Experts Like You
            </h2>
            <p className="text-2xl text-slate-600">
              Here's how they find you and why they'll pay
            </p>
          </div>
          
          {/* Discovery Flow */}
          <div className="flex items-center justify-between gap-6 mb-16 max-w-6xl mx-auto">
            <div className="flex-1 bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-slate-200 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🔍</div>
              <div className="text-xl font-bold text-slate-900 mb-2">
                Browse <span className="text-blue-600">LinkedIn</span>
              </div>
              <div className="text-slate-600">Looking for industry experts</div>
            </div>
            
            <div className="text-3xl text-blue-600">→</div>
            
            <div className="flex-1 bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-slate-200 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">💎</div>
              <div className="text-xl font-bold text-slate-900 mb-2">See Marrow Badge</div>
              <div className="text-slate-600">Your profile stands out</div>
            </div>
            
            <div className="text-3xl text-blue-600">→</div>
            
            <div className="flex-1 bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-slate-200 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">📅</div>
              <div className="text-xl font-bold text-slate-900 mb-2">Book Instantly</div>
              <div className="text-slate-600">Guaranteed response</div>
            </div>
            
            <div className="text-3xl text-blue-600">→</div>
            
            <div className="flex-1 bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-slate-200 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">💰</div>
              <div className="text-xl font-bold text-slate-900 mb-2">You Get Paid</div>
              <div className="text-slate-600">Automatic deposit</div>
            </div>
          </div>

          {/* Why They Pay */}
          <div className="bg-white rounded-2xl p-12 shadow-2xl border-2 border-blue-600 max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Why Buyers Choose Marrow Experts
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2">Stop Getting Ignored</div>
                  <div className="text-slate-600">No more sending dozens of cold messages that never get responses</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2">Guaranteed Response</div>
                  <div className="text-slate-600">You respond within 24 hours or they get their money back</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2">Direct Access</div>
                  <div className="text-slate-600">Skip networking games and go straight to the experts they need</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2">Massive ROI</div>
                  <div className="text-slate-600">One great connection or piece of advice can be worth 100x the booking fee</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2">Serious Conversations Only</div>
                  <div className="text-slate-600">Paying filters out tire-kickers - you both know it's valuable</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2">Time Is Money</div>
                  <div className="text-slate-600">They'd rather pay $200 than waste weeks hoping for free advice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              The Perfect Marketplace for Everyone
            </h2>
            <p className="text-2xl text-slate-600">
              Connecting those who know with those who need to know
            </p>
          </div>
          
          {/* Two Sides */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Experts Side */}
            <div className="bg-white rounded-3xl p-12 shadow-2xl border-3 border-slate-200 hover:border-blue-600 transition-all">
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Experts Get</h3>
                <p className="text-slate-600 text-lg">Monetize what you've built</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Monetize your expertise & network without extra marketing
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Control your time, pricing, and availability completely
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Get paid automatically - no chasing invoices
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Filter for serious inquiries only - no tire-kickers
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Turn ignored requests into revenue streams
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Build your reputation as a go-to expert
                  </div>
                </div>
              </div>
            </div>

            {/* Seekers Side */}
            <div className="bg-white rounded-3xl p-12 shadow-2xl border-3 border-slate-200 hover:border-blue-600 transition-all">
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Seekers Get</h3>
                <p className="text-slate-600 text-lg">Fast access to the right people</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Guaranteed responses within 24 hours - no ghosting
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Direct access to top professionals in any industry
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Skip the networking games and cold outreach
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Real ROI - advice that can change your career
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Save weeks of time trying to get a single response
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-lg text-slate-900 font-semibold pt-1">
                    Build relationships with industry leaders
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Footer */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-10">Trusted by Thousands of Professionals Worldwide</h3>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-6xl font-bold mb-2">5,000+</div>
                <div className="text-blue-100 text-lg font-semibold">Active Professionals</div>
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">24hrs</div>
                <div className="text-blue-100 text-lg font-semibold">Average Response Time</div>
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">98%</div>
                <div className="text-blue-100 text-lg font-semibold">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-2xl font-bold text-white">Marrow</span>
              </div>
              <p className="text-slate-400">
                Turn your LinkedIn network into revenue. Get paid for your expertise.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/how-it-works" className="hover:text-white transition-colors cursor-pointer">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors cursor-pointer">Pricing</a></li>
                <li><a href="/dashboard" className="hover:text-white transition-colors cursor-pointer">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/faq" className="hover:text-white transition-colors cursor-pointer">FAQ</a></li>
                <li><a href="/about" className="hover:text-white transition-colors cursor-pointer">About</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2026 Marrow. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}