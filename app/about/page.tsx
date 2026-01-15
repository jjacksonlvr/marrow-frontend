'use client';

import { motion } from "framer-motion";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Heart,
  Linkedin,
  Twitter,
  Zap,
  Shield,
  DollarSign
} from "lucide-react";

export default function AboutPage() {
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
            <a href="/how-it-works" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              How It Works
            </a>
            <a href="/#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="/faq" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              FAQ
            </a>
            <a href="/about" className="text-slate-900 font-semibold">
              About
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
            Your Network Is Your Net Worth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            We believe you deserve to earn from the network and expertise you've spent years building
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              Too many talented professionals give away their time and expertise for free. You answer endless 
              LinkedIn messages, take "pick your brain" coffee chats, and provide free consultations—all while 
              juggling a full-time career.
            </p>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              Meanwhile, the connections and knowledge you've cultivated over years go unmonetized. You're not 
              taking full advantage of everything you have to offer.
            </p>
            <p className="text-xl text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900">Marrow changes that.</span> We built a platform 
              that lets you turn inbound LinkedIn interest into real revenue—without the awkwardness of asking 
              for payment or the overhead of managing invoices.
            </p>
          </motion.div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Respect Your Time</h3>
              <p className="text-slate-600">
                Your expertise is valuable. Every conversation should be worth your while—financially and professionally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Make It Effortless</h3>
              <p className="text-slate-600">
                No invoices, no payment chasing, no awkward money conversations. Just a button that converts interest into income.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Stay Authentic</h3>
              <p className="text-slate-600">
                Monetization shouldn't change who you are. Keep helping people—just get compensated fairly for it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Why We Built This</h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">You've Earned Your Network</h3>
                <p className="text-slate-600 leading-relaxed">
                  You didn't build 5,000 LinkedIn connections overnight. You spent years attending conferences, 
                  delivering results, building credibility, and nurturing relationships. That network represents 
                  real capital—but most platforms treat it as worthless.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Your Expertise Has Value</h3>
                <p className="text-slate-600 leading-relaxed">
                  Whether you're a VP at a tech company, a seasoned consultant, or an industry expert, people 
                  want access to your knowledge. They're willing to pay for it—but there's never been an easy 
                  way to facilitate that exchange on LinkedIn.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Free Isn't Sustainable</h3>
                <p className="text-slate-600 leading-relaxed">
                  Giving away unlimited free advice leads to burnout. When you charge appropriately, you filter 
                  for serious inquiries, protect your time, and ensure conversations are mutually valuable. Both 
                  sides win.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">How Marrow Solves This</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
                <DollarSign className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Set Your Price</h3>
                <p className="text-blue-100">
                  You decide what your time is worth. Whether it's $50 or $500, you're in control of your earning potential.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
                <Users className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">One-Click Access</h3>
                <p className="text-blue-100">
                  A simple button on your LinkedIn profile lets people book time with you instantly. No back-and-forth emails.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
                <Target className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Filter for Quality</h3>
                <p className="text-blue-100">
                  When people pay for your time, they show up prepared and engaged. No more low-effort "pick your brain" requests.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
                <TrendingUp className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Automatic Payouts</h3>
                <p className="text-blue-100">
                  Get paid directly to your bank account. No invoicing, no payment processing headaches. Just earnings.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">1,000+</div>
              <div className="text-slate-600 font-medium">Active Creators</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">$2.5M+</div>
              <div className="text-slate-600 font-medium">Paid to Creators</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">10min</div>
              <div className="text-slate-600 font-medium">Average Setup Time</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Start Getting Paid for Your Expertise
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            You've built the network. You've earned the expertise. Now monetize it.
          </p>
          <a
            href="/signup"
            className="inline-block px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105"
          >
            Join Marrow Today
          </a>
          <p className="mt-6 text-blue-200 text-sm">
            Free to join. No credit card required.
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
