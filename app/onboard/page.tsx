'use client';

import { useState } from "react";
import { ChevronLeft, Chrome, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    linkedinUrl: "",
    offerTitle: "",
    offerDescription: "",
    price: "$200",
    benefit1Title: "",
    benefit1Description: "",
    benefit2Title: "",
    benefit2Description: "",
    benefit3Title: "",
    benefit3Description: "",
    calendlyUrl: "",
  });

  const totalSteps = 6;

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeSetup = () => {
    // TODO: Save data to Supabase
    alert("Onboarding complete! Redirecting to download extension...");
    // window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">Marrow</span>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12"
          >
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div>
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Welcome to Marrow!</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Let's set up your paid LinkedIn profile. This takes about 3 minutes.
                </p>
                
                <div className="space-y-2 mb-8">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                    What's your name?
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors text-lg"
                    placeholder="John Smith"
                  />
                </div>
              </div>
            )}

            {/* Step 2: LinkedIn Profile */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What's Your LinkedIn Profile?</h2>
                <p className="text-slate-600 mb-8">
                  We'll use this to display your paid CTA
                </p>
                
                <div className="space-y-2 mb-4">
                  <label htmlFor="linkedinUrl" className="block text-sm font-semibold text-slate-700">
                    LinkedIn Profile URL
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-lg text-slate-600">
                      linkedin.com/in/
                    </span>
                    <input
                      type="text"
                      id="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={(e) => updateFormData("linkedinUrl", e.target.value)}
                      className="flex-1 px-4 py-3 rounded-r-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                      placeholder="jjackson1146"
                    />
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Example:</span> linkedin.com/in/jjackson1146
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Your Offer */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Do You Offer?</h2>
                <p className="text-slate-600 mb-8">
                  Tell people what they'll get when they book with you
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="offerTitle" className="block text-sm font-semibold text-slate-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      id="offerTitle"
                      value={formData.offerTitle}
                      onChange={(e) => updateFormData("offerTitle", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                      placeholder="e.g., 30-Min Startup Consultation"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="offerDescription" className="block text-sm font-semibold text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="offerDescription"
                      value={formData.offerDescription}
                      onChange={(e) => updateFormData("offerDescription", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors resize-none"
                      placeholder="Describe what people get when they book with you"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                      Price
                    </label>
                    <select
                      id="price"
                      value={formData.price}
                      onChange={(e) => updateFormData("price", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors bg-white"
                    >
                      <option value="$50">$50</option>
                      <option value="$100">$100</option>
                      <option value="$150">$150</option>
                      <option value="$200">$200</option>
                      <option value="$300">$300</option>
                      <option value="$500">$500</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Value Propositions */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Makes You Valuable?</h2>
                <p className="text-slate-600 mb-8">
                  Add 3 key benefits people get when they book with you
                </p>
                
                <div className="space-y-8">
                  {/* Benefit 1 */}
                  <div className="pb-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 1</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.benefit1Title}
                        onChange={(e) => updateFormData("benefit1Title", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Benefit Title (e.g., Career Advice)"
                      />
                      <input
                        type="text"
                        value={formData.benefit1Description}
                        onChange={(e) => updateFormData("benefit1Description", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Description (e.g., Get personalized guidance from 15 years at Google)"
                      />
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="pb-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 2</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.benefit2Title}
                        onChange={(e) => updateFormData("benefit2Title", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Benefit Title"
                      />
                      <input
                        type="text"
                        value={formData.benefit2Description}
                        onChange={(e) => updateFormData("benefit2Description", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Description"
                      />
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 3</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.benefit3Title}
                        onChange={(e) => updateFormData("benefit3Title", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Benefit Title"
                      />
                      <input
                        type="text"
                        value={formData.benefit3Description}
                        onChange={(e) => updateFormData("benefit3Description", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Calendly Setup */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Where Should People Book Time?</h2>
                <p className="text-slate-600 mb-8">
                  Connect your Calendly so clients can schedule automatically
                </p>
                
                <div className="space-y-2 mb-6">
                  <label htmlFor="calendlyUrl" className="block text-sm font-semibold text-slate-700">
                    Your Calendly URL
                  </label>
                  <input
                    type="text"
                    id="calendlyUrl"
                    value={formData.calendlyUrl}
                    onChange={(e) => updateFormData("calendlyUrl", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                    placeholder="https://calendly.com/yourusername"
                  />
                </div>
                
                <details className="bg-slate-50 rounded-lg border border-slate-200">
                  <summary className="px-4 py-3 cursor-pointer font-semibold text-slate-700 hover:text-slate-900">
                    Don't have Calendly? Here's how to set it up
                  </summary>
                  <div className="px-4 pb-4 space-y-4">
                    <p className="text-sm text-slate-600">
                      Setting up Calendly is free and takes under 5 minutes:
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
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-block">
                      Watch our 5-minute setup video (coming soon) →
                    </a>
                  </div>
                </details>
              </div>
            )}

            {/* Step 6: Download Extension */}
            {currentStep === 6 && (
              <div className="text-center">
                <div className="text-5xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">You're All Set!</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Now download the Chrome extension to activate your paid CTA
                </p>
                
                <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 flex items-center justify-center gap-3 mb-6">
                  <Chrome className="w-6 h-6" />
                  <span>Download Chrome Extension</span>
                </button>
                
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-left mb-6">
                  <p className="font-semibold text-slate-900 mb-4">Next steps:</p>
                  <ol className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Click download above</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Install the extension in Chrome</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Visit your LinkedIn profile</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>See your paid CTA in action!</span>
                    </li>
                  </ol>
                </div>
                
                <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  I'll download it later
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  currentStep === 1
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/25"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={completeSetup}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-green-600/25"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}