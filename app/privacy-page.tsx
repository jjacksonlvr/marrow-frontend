'use client';

import { Linkedin, Twitter } from "lucide-react";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-slate-600">
            Last updated: January 14, 2026
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-slate max-w-none">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Marrow ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you use our Service. Please read 
                this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do 
                not access the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Personal Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We collect personal information that you voluntarily provide when using our Service:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Name and email address</li>
                <li>LinkedIn profile URL and slug</li>
                <li>Profile information (title, description, pricing)</li>
                <li>Calendly booking URL</li>
                <li>Stripe account information (processed and stored by Stripe)</li>
                <li>Payment transaction details</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you access the Service, we automatically collect certain information:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Access times and dates</li>
                <li>Pages viewed and features used</li>
                <li>Referral URLs</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Chrome Extension Data</h3>
              <p className="text-slate-600 leading-relaxed">
                Our Chrome extension only accesses LinkedIn profile pages (linkedin.com/in/*) and does not collect 
                or transmit any data beyond what is necessary to display your booking button. The extension does not 
                access your browsing history, passwords, or any other personal data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Create and manage your account</li>
                <li>Process payments and payouts</li>
                <li>Display your booking button on LinkedIn</li>
                <li>Facilitate bookings and consultations</li>
                <li>Send transactional emails (booking confirmations, payment receipts)</li>
                <li>Provide customer support</li>
                <li>Improve and optimize the Service</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. How We Share Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may share your information with:
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Service Providers</h3>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li><strong>Stripe:</strong> Payment processing and payout services</li>
                <li><strong>Supabase:</strong> Database hosting and backend services</li>
                <li><strong>Vercel:</strong> Application hosting</li>
                <li><strong>Calendly:</strong> Scheduling integration</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Legal Requirements</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may disclose your information if required by law or in response to valid requests by public 
                authorities (e.g., a court or government agency).
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Business Transfers</h3>
              <p className="text-slate-600 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to 
                the acquiring entity.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Encryption of data in transit using SSL/TLS</li>
                <li>Secure database hosting with Supabase</li>
                <li>Payment data handled exclusively by PCI-compliant Stripe</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication requirements</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot 
                guarantee absolute security of your information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
              <p className="text-slate-600 leading-relaxed">
                We retain your personal information for as long as necessary to provide the Service and fulfill the 
                purposes outlined in this Privacy Policy. When you delete your account, we will delete or anonymize 
                your personal information, except where we are required to retain it for legal, regulatory, or 
                legitimate business purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Privacy Rights</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to our processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing of your information</li>
                <li><strong>Withdrawal of Consent:</strong> Withdraw consent for marketing communications</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                To exercise these rights, please contact us at support@marrow.ideatoads.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze usage patterns and improve the Service</li>
                <li>Provide personalized content</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                You can control cookies through your browser settings. However, disabling cookies may limit your 
                ability to use certain features of the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Third-Party Links</h2>
              <p className="text-slate-600 leading-relaxed">
                The Service may contain links to third-party websites (LinkedIn, Calendly, etc.). We are not 
                responsible for the privacy practices of these websites. We encourage you to read the privacy 
                policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                The Service is not intended for individuals under the age of 18. We do not knowingly collect 
                personal information from children. If you believe we have collected information from a child, 
                please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. California Privacy Rights</h2>
              <p className="text-slate-600 leading-relaxed">
                California residents have specific rights under the California Consumer Privacy Act (CCPA), including 
                the right to know what personal information is collected, the right to delete personal information, 
                and the right to opt-out of the sale of personal information. We do not sell your personal information. 
                To exercise your CCPA rights, contact us at support@marrow.ideatoads.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. GDPR Compliance</h2>
              <p className="text-slate-600 leading-relaxed">
                If you are located in the European Economic Area (EEA), you have certain data protection rights under 
                the General Data Protection Regulation (GDPR). We process your personal information based on:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                <li>Your consent</li>
                <li>Performance of a contract with you</li>
                <li>Compliance with legal obligations</li>
                <li>Our legitimate business interests</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to 
                review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
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
