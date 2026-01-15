'use client';

import { motion } from "framer-motion";
import { ChevronDown, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Marrow work?",
      answer: "Marrow adds a booking button to your LinkedIn profile. When someone wants to connect with you, they click the button, pay your fee, and receive a Calendly link to schedule time with you. You get paid 80% of the fee (we keep 20% as a platform fee), and payouts go directly to your bank account via Stripe."
    },
    {
      question: "How much can I charge?",
      answer: "You set your own price! Most users charge between $50-$500 per 30-minute session depending on their expertise and demand. Rising professionals typically start at $50-$100, experienced executives charge $200-$300, and industry leaders often charge $500 or more."
    },
    {
      question: "When do I get paid?",
      answer: "You receive 80% of each booking fee. Payments are processed through Stripe Connect and deposited directly into your bank account. Stripe typically transfers funds within 2-7 business days of the booking."
    },
    {
      question: "Do I need a Calendly account?",
      answer: "Yes, you'll need a free Calendly account to manage your bookings. During onboarding, we'll guide you through setting up Calendly (takes about 5 minutes). Once set up, people who book with you will automatically receive your Calendly link to schedule their session."
    },
    {
      question: "What's the platform fee?",
      answer: "Marrow takes a 20% platform fee on each booking. This covers payment processing, hosting, customer support, and ongoing platform development. You keep 80% of every booking."
    },
    {
      question: "Can I turn off bookings temporarily?",
      answer: "Absolutely! In your dashboard, you can toggle your availability on/off anytime. When you're unavailable, the booking button won't appear on your LinkedIn profile."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes. We use Stripe, the same payment processor used by Amazon, Google, and millions of businesses worldwide. Marrow never stores your banking or credit card information—everything is handled securely through Stripe."
    },
    {
      question: "What happens after someone books with me?",
      answer: "After payment, the person receives an email with your Calendly link. They can then choose a time slot that works for both of you. You'll get a calendar invite and can meet via Zoom, Google Meet, or whatever platform you prefer."
    },
    {
      question: "Can I customize what my booking button says?",
      answer: "Yes! During onboarding, you can customize your offer title, description, and benefits. This appears in the modal when someone clicks your booking button on LinkedIn."
    },
    {
      question: "Do I need to download anything?",
      answer: "You'll need to install the Marrow Chrome extension, which adds the booking button to your LinkedIn profile. It's a simple one-click install and only runs on LinkedIn—it won't affect any other websites."
    },
    {
      question: "What if someone books but doesn't show up?",
      answer: "You've already been paid when they booked, so no-shows don't affect your earnings. You can choose to offer a reschedule as a courtesy, but there's no obligation. We recommend setting clear cancellation policies in your Calendly settings."
    },
    {
      question: "Can I offer different types of sessions?",
      answer: "Currently, Marrow supports one standard offering per profile. Most users offer a 30-minute consultation. If you want to offer multiple session types, you can mention this in your description and discuss options during the call."
    },
    {
      question: "Is there a monthly subscription fee?",
      answer: "No! Marrow is completely free to join. We only make money when you do—through our 20% platform fee on bookings. There are no hidden fees, monthly charges, or setup costs."
    },
    {
      question: "Can I see my earnings history?",
      answer: "Yes. Your dashboard shows all bookings, earnings, and payout history. You can see total revenue, platform fees, and your net earnings at a glance."
    },
    {
      question: "What if I want to cancel my account?",
      answer: "You can deactivate your account anytime from your dashboard. Simply toggle off your availability and uninstall the Chrome extension. Any pending payouts will still be processed normally."
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
            <a href="/#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              How It Works
            </a>
            <a href="/#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="/faq" className="text-slate-900 font-semibold">
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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            Everything you need to know about monetizing your LinkedIn profile with Marrow
          </motion.p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-lg pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            We're here to help. Reach out to our support team anytime.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40"
          >
            Contact Support
          </a>
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
