'use client';

import { Linkedin, Twitter } from "lucide-react";

export default function TermsPage() {
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
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-600">
            Last updated: January 14, 2026
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-slate max-w-none">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using Marrow ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these Terms of Service, please do not 
                use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Marrow provides a platform that enables professionals to monetize their LinkedIn profiles by 
                offering paid consultations and connections. The Service includes:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>User account creation and management</li>
                <li>Chrome extension for LinkedIn integration</li>
                <li>Payment processing through Stripe Connect</li>
                <li>Scheduling integration via Calendly</li>
                <li>Analytics and earnings tracking</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To use the Service, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept all responsibility for activity that occurs under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payment Terms</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When using Marrow's payment services:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>You set your own pricing for consultations</li>
                <li>Marrow charges a 20% platform fee on all transactions</li>
                <li>You receive 80% of the total booking fee</li>
                <li>Payments are processed through Stripe Connect</li>
                <li>Payouts are subject to Stripe's terms and processing times (typically 2-7 business days)</li>
                <li>You are responsible for any applicable taxes on your earnings</li>
                <li>Refunds are handled on a case-by-case basis and subject to our refund policy</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. User Conduct</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Violate the intellectual property rights of others</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Attempt to gain unauthorized access to the Service or related systems</li>
                <li>Engage in any activity that interferes with or disrupts the Service</li>
                <li>Collect or harvest personal information about other users</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Use the Service to spam, harass, or abuse others</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Content Ownership</h2>
              <p className="text-slate-600 leading-relaxed">
                You retain all rights to the content you submit to Marrow (profile information, descriptions, etc.). 
                By submitting content, you grant Marrow a worldwide, non-exclusive, royalty-free license to use, 
                reproduce, and display your content solely for the purpose of operating and promoting the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Third-Party Services</h2>
              <p className="text-slate-600 leading-relaxed">
                Marrow integrates with third-party services including LinkedIn, Stripe, and Calendly. Your use of 
                these services is subject to their respective terms of service and privacy policies. Marrow is not 
                responsible for the content, accuracy, or availability of third-party services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-slate-600 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS 
                FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. MARROW DOES NOT WARRANT THAT THE SERVICE WILL BE 
                UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MARROW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
                DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Indemnification</h2>
              <p className="text-slate-600 leading-relaxed">
                You agree to indemnify and hold harmless Marrow and its affiliates from any claims, damages, losses, 
                liabilities, and expenses (including legal fees) arising from your use of the Service, your violation 
                of these Terms, or your violation of any rights of another party.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Termination</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to suspend or terminate your account and access to the Service at our sole 
                discretion, without notice, for conduct that we believe violates these Terms or is harmful to other 
                users, us, or third parties, or for any other reason. You may terminate your account at any time 
                through your account settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes 
                via email or through the Service. Your continued use of the Service after such modifications constitutes 
                your acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, 
                without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service 
                shall be resolved in the courts located in San Diego County, California.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Information</h2>
              <p className="text-slate-600 leading-relaxed">
                For questions about these Terms, please contact us at:
              </p>
              <p className="text-blue-600 font-medium mt-2">
                support@marrow.ideatoads.com
              </p>
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
