'use client';

import { motion } from "framer-motion";
import { 
  UserPlus, 
  DollarSign, 
  Chrome, 
  Calendar, 
  CreditCard,
  CheckCircle,
  Linkedin,
  Twitter,
  ArrowRight
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up in 60 seconds. Set your price and describe what you offer.",
      details: [
        "Choose your custom LinkedIn slug",
        "Write your offer title and description",
        "Add up to 3 key benefits you provide",
        "Set your connection fee ($50-$500+)"
      ]
    },
    {
      icon: Calendar,
      title: "Connect Your Calendly",
      description: "Link your free Calendly account so clients can book time with you.",
      details: [
        "Create a free Calendly account (5 minutes)",
        "Connect your Google or Outlook calendar",
        "Create a 30-minute meeting event",
        "Paste your Calendly link into Marrow"
      ]
    },
    {
      icon: CreditCard,
      title: "Set Up Stripe Payouts",
      description: "Connect Stripe to receive payments directly to your bank account.",
      details: [
        "Click 'Connect Stripe' in your dashboard",
        "Verify your identity (one-time setup)",
        "Add your bank account details",
        "Start receiving 80% of every booking"
      ]
    },
    {
      icon: Chrome,
      title: "Install Chrome Extension",
      description: "Download our extension to add the booking button to your LinkedIn profile.",
      details: [
        "Click 'Download Extension' from your dashboard",
        "Install in one click from Chrome Web Store",
        "Extension automatically detects your profile",
        "Booking button appears instantly"
      ]
    },
    {
      icon: DollarSign,
      title: "Start Earning",
      description: "When someone clicks your button, they pay and book. You get paid automatically.",
      details: [
        "Visitor clicks your booking button on LinkedIn",
        "They see your offer and pay your fee via Stripe",
        "They receive your Calendly link via email",
        "You get 80% deposited to your bank in 2-7 days"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Marrow</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="/how-it-works" className="text-slate-900 font-semibold">
              How It Works
            </a>
            <a href="/#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="/faq" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              FAQ
            </a>
            <a href="/login" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Login
            </a>
            <a
              href="/signup"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
            >
              Start Earning
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            How Marrow Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 mb-8"
          >
            Start earning from your LinkedIn network in 5 simple steps. Setup takes less than 10 minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="/signup"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40"
            >
              Get Started Free
            </a>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-blue-200 to-transparent md:left-12" />
                  )}

                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left: Icon and Title */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center relative">
                          <Icon className="w-8 h-8 text-white" />
                          <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Flow */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
            The Complete Experience
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Visitor View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-xl"
            >
              <div className="text-blue-600 font-semibold mb-4">Step 1: Discovery</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Visitor Finds You on LinkedIn
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>• Sees your profile and expertise</p>
                <p>• Notices your booking button</p>
                <p>• Clicks to learn more</p>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-xl transform md:scale-105"
            >
              <div className="text-blue-600 font-semibold mb-4">Step 2: Booking</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                They Pay & Book
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>• Reviews your offer details</p>
                <p>• Pays your fee securely via Stripe</p>
                <p>• Receives Calendly link instantly</p>
              </div>
            </motion.div>

            {/* You Get Paid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-xl"
            >
              <div className="text-blue-600 font-semibold mb-4">Step 3: Payout</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                You Get Paid
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>• 80% sent to your bank automatically</p>
                <p>• Money arrives in 2-7 business days</p>
                <p>• Track earnings in your dashboard</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Set up takes less than 10 minutes. No credit card required.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="w-6 h-6" />
          </a>
          <p className="mt-6 text-blue-200 text-sm">
            Join 1,000+ professionals monetizing their expertise
          </p>
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
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2026 Marrow. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
