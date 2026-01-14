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
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LandingPage() {
  const [calendlyExpanded, setCalendlyExpanded] = useState(false);

  const handleGetStarted = () => {
    // Navigate to signup page
    window.location.href = '/signup';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Marrow</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              FAQ
            </a>
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
            >
              Start Earning
            </button>
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
                Turn Your LinkedIn Network Into Revenue
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                You've spent years building connections and expertise. Now get paid when people want to reach you. 
                Set your price, control access, earn on your terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-105"
                >
                  Start Earning Today
                </button>
                <button className="px-8 py-4 border-2 border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl font-semibold text-lg transition-all hover:bg-slate-50">
                  See How It Works
                </button>
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
                  <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Book Time With Sarah
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <div className="bg-blue-600 py-4 overflow-hidden">
        <div className="flex items-center gap-12 whitespace-nowrap">
          <span className="text-blue-100 font-medium">💰 Sarah earned $4,200 last month</span>
          <span className="text-blue-100 font-medium">👥 1,000+ professionals monetizing</span>
          <span className="text-blue-100 font-medium">📈 Average booking: $150</span>
          <span className="text-blue-100 font-medium">💰 Sarah earned $4,200 last month</span>
          <span className="text-blue-100 font-medium">👥 1,000+ professionals monetizing</span>
        </div>
      </div>

      {/* Value Proposition Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Your Network Is Your Net Worth. Now Prove It.
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              You've worked your entire career to build relationships, expertise, and credibility at top companies. 
              Your network is valuable - people want introductions, advice, and access to your connections. 
              With Marrow, you finally get compensated for what you've built.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Control Your Time</h3>
              <p className="text-slate-600 leading-relaxed">
                Set your price, choose who you connect with, work on your schedule
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Earn From Expertise</h3>
              <p className="text-slate-600 leading-relaxed">
                Get paid for intros, consulting, career advice, and connections
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Over Quantity</h3>
              <p className="text-slate-600 leading-relaxed">
                Paid barriers mean serious requests only, no more spam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Start Earning in Minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-blue-500/30">
                  1
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Set Your Price</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Create your profile, set your connection fee, add your Calendly link
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="text-sm text-slate-500 mb-2">Connection Fee</div>
                  <div className="text-3xl font-bold text-slate-900">$300</div>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                <ArrowRight className="w-12 h-12 text-slate-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-blue-500/30">
                  2
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Install Extension</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Add our Chrome extension. It adds a booking button to your LinkedIn profile
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-center">
                  <Chrome className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                <ArrowRight className="w-12 h-12 text-slate-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-green-500/30">
                  3
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Get Paid</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  When someone pays to connect, they book time on your calendar
                </p>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="text-xs text-green-600 mb-3 font-semibold">YOUR CALENDAR</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">Mon 2PM - $300 session</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">Wed 10AM - $300 session</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">Thu 3PM - $300 session</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">Fri 11AM - $300 session</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Built For Professionals Who Get Results
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
              <Rocket className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Startup Founders</h3>
              <p className="text-slate-600 text-sm">
                Monetize fundraising intros and investor connections
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100">
              <Briefcase className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Executives</h3>
              <p className="text-slate-600 text-sm">
                Get paid for career advice and industry insights
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
              <Target className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Consultants</h3>
              <p className="text-slate-600 text-sm">
                Turn LinkedIn into a lead generation machine
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border border-orange-100">
              <Award className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Subject Matter Experts</h3>
              <p className="text-slate-600 text-sm">
                Charge for your specialized knowledge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Integration */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12">
                <Calendar className="w-12 h-12 text-blue-600 mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Seamless Scheduling With Calendly
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  After payment, clients book directly on your Calendly. No back-and-forth, 
                  no double booking, all meetings automatically confirmed.
                </p>
              </div>
              
              <div className="bg-slate-50 p-12 border-l border-slate-200">
                <button
                  onClick={() => setCalendlyExpanded(!calendlyExpanded)}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <span className="font-semibold text-slate-900">Don't have Calendly? No problem.</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      calendlyExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
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
                    <div className="pt-2">
                      <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Watch our 5-minute setup video →
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            You Set Your Own Price
          </h2>
          
          <div className="mt-12 bg-gradient-to-br from-slate-50 to-white rounded-3xl p-12 border-2 border-slate-200 shadow-xl">
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
            Ready To Monetize Your Expertise?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals turning their networks into income
          </p>
          <button
            onClick={handleGetStarted}
            className="px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105"
          >
            Get Started - It's Free
          </button>
          <p className="mt-6 text-blue-200 text-sm">
            No credit card required. Set up in 5 minutes.
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
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chrome Extension</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
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