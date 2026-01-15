'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, Chrome } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
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

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        window.location.href = '/signup';
      }
    };
    getCurrentUser();
  }, []);

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

  const saveToDatabase = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Not authenticated. Please sign up first.');
        window.location.href = '/signup';
        return;
      }

      const priceString = formData.price.replace('$', '').replace(',', '');
      const priceCents = parseFloat(priceString) * 100;

      const { error } = await supabase
        .from('users')
        .insert([{
          id: user.id,
          email: user.email,
          linkedin_slug: formData.linkedinUrl,
          title: formData.offerTitle,
          description: formData.offerDescription,
          price_cents: priceCents,
          bullet_title_1: formData.benefit1Title,
          bullet_desc_1: formData.benefit1Description,
          bullet_title_2: formData.benefit2Title,
          bullet_desc_2: formData.benefit2Description,
          bullet_title_3: formData.benefit3Title,
          bullet_desc_3: formData.benefit3Description,
          booking_url: formData.calendlyUrl,
          is_active: true,
        }]);

      if (error) {
        alert(`Error: ${error.message}`);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      nextStep();
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-slate-500">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-600 to-blue-500" initial={{ width: 0 }} animate={{ width: `${(currentStep / totalSteps) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">Marrow</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
            
            {currentStep === 1 && (
              <div>
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Welcome to Marrow!</h2>
                <p className="text-lg text-slate-600 mb-8">Let's set up your paid LinkedIn profile. This takes about 3 minutes.</p>
                <div className="space-y-2 mb-8">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">What's your name?</label>
                  <input type="text" id="name" value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors text-lg" placeholder="Taylor Swift" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What's Your LinkedIn Profile?</h2>
                <p className="text-slate-600 mb-8">We'll use this to display your paid CTA</p>
                <div className="space-y-2 mb-4">
                  <label htmlFor="linkedinUrl" className="block text-sm font-semibold text-slate-700">LinkedIn Profile URL</label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-lg text-slate-600">linkedin.com/in/</span>
                    <input type="text" id="linkedinUrl" value={formData.linkedinUrl} onChange={(e) => updateFormData("linkedinUrl", e.target.value)} className="flex-1 px-4 py-3 rounded-r-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="elonmusk" />
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600"><span className="font-semibold">Example:</span> linkedin.com/in/Elon-Musk</p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Do You Offer?</h2>
                <p className="text-slate-600 mb-8">Tell people what they'll get when they book with you</p>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="offerTitle" className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                    <input type="text" id="offerTitle" value={formData.offerTitle} onChange={(e) => updateFormData("offerTitle", e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="e.g., 30-Min Startup Consultation" />
                  </div>
                  <div>
                    <label htmlFor="offerDescription" className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea id="offerDescription" value={formData.offerDescription} onChange={(e) => updateFormData("offerDescription", e.target.value)} rows={4} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors resize-none" placeholder="Describe what people get when they book with you" />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">Price</label>
                    <select id="price" value={formData.price} onChange={(e) => updateFormData("price", e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors bg-white">
                      <option value="$50">$50</option>
                      <option value="$100">$100</option>
                      <option value="$150">$150</option>
                      <option value="$200">$200</option>
                      <option value="$300">$300</option>
                      <option value="$500">$500</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Makes You Valuable?</h2>
                <p className="text-slate-600 mb-8">Add 3 key benefits people get when they book with you</p>
                <div className="space-y-8">
                  <div className="pb-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 1</h3>
                    <div className="space-y-3">
                      <input type="text" value={formData.benefit1Title} onChange={(e) => updateFormData("benefit1Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="Benefit Title (e.g., Career Advice)" />
                      <input type="text" value={formData.benefit1Description} onChange={(e) => updateFormData("benefit1Description", e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="Description" />
                    </div>
                  </div>
                  <div className="pb-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 2</h3>
                    <div className="space-y-3">
                      <input type="text" value={formData.benefit2Title} onChange={(e) => updateFormData("benefit2Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="Benefit Title" />
                      <input type="text" value={formData.benefit2Description} onChange={(e) => updateFormData("benefit2Description", e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="Description" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 3</h3>
                    <div className="space-y-3">
                      <input type="text" value={formData.benefit3Title} onChange={(e) => updateFormData("benefit3Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="Benefit Title" />
                      <input type="text" value={formData.benefit3Description} onChange={(e) => updateFormData("benefit3Description", e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="Description" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Where Should People Book Time?</h2>
                <p className="text-slate-600 mb-8">Connect your Calendly so clients can schedule automatically</p>
                <div className="space-y-2 mb-6">
                  <label htmlFor="calendlyUrl" className="block text-sm font-semibold text-slate-700">Your Calendly URL</label>
                  <input type="text" id="calendlyUrl" value={formData.calendlyUrl} onChange={(e) => updateFormData("calendlyUrl", e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors" placeholder="https://calendly.com/yourusername" />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold text-slate-900 mb-3">Congratulations!</h2>
                <p className="text-xl text-slate-600 mb-4">Your profile is live and ready to earn</p>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border-2 border-green-200">
                  <div className="text-sm text-green-700 font-semibold mb-2">YOUR EARNING POTENTIAL</div>
                  <div className="text-5xl font-bold text-green-700 mb-2">{formData.price}<span className="text-2xl text-green-600">/connection</span></div>
                  <p className="text-green-700 mb-4">Just 5 connections per month = <span className="font-bold">${parseInt(formData.price.replace('$', '')) * 5}/mo</span></p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-700">10</div>
                      <div className="text-xs text-green-600">connections/mo</div>
                      <div className="text-lg font-bold text-green-800 mt-1">${parseInt(formData.price.replace('$', '')) * 10}</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-700">20</div>
                      <div className="text-xs text-green-600">connections/mo</div>
                      <div className="text-lg font-bold text-green-800 mt-1">${parseInt(formData.price.replace('$', '')) * 20}</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-700">50</div>
                      <div className="text-xs text-green-600">connections/mo</div>
                      <div className="text-lg font-bold text-green-800 mt-1">${parseInt(formData.price.replace('$', '')) * 50}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Next Step: Add the Extension</h3>
                  <button className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-xl transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 flex items-center justify-center gap-3 mb-4">
                    <Chrome className="w-7 h-7" />
                    <span>Download Chrome Extension</span>
                  </button>
                  <p className="text-sm text-slate-500">This adds your booking button to your LinkedIn profile</p>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-left mb-8">
                  <p className="font-semibold text-slate-900 mb-4">What happens next:</p>
                  <ol className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">1</div>
                      <span>Install the Chrome extension (takes 30 seconds)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">2</div>
                      <span>Visit your LinkedIn profile at linkedin.com/in/{formData.linkedinUrl}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">3</div>
                      <span>Your "{formData.price} to Connect" button will appear automatically</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">✓</div>
                      <span className="font-semibold text-green-700">Start earning when people book with you!</span>
                    </li>
                  </ol>
                </div>

                <button
                  onClick={goToDashboard}
                  className="w-full px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
                >
                  Go to Dashboard
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-200">
              <button onClick={prevStep} disabled={currentStep === 1 || isLoading || currentStep === 6} className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${currentStep === 1 || isLoading || currentStep === 6 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              {currentStep < totalSteps && (
                <button onClick={currentStep === 5 ? saveToDatabase : nextStep} disabled={isLoading} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {isLoading && currentStep === 5 ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}