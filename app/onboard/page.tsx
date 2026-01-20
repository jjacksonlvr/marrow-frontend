'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, Chrome, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/lib/toast-context";

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [linkedinSlug, setLinkedinSlug] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customPrice, setCustomPrice] = useState("");
  const [showCustomPrice, setShowCustomPrice] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
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

  const totalSteps = 5;

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/signup';
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email || '');
      setFormData(prev => ({ ...prev, email: user.email || '' }));

      const { data: profile, error } = await supabase
        .from('users')
        .select('full_name, linkedin_slug, linkedin_verified')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        alert('Profile not found. Please sign up again.');
        window.location.href = '/signup';
        return;
      }

      if (!profile?.linkedin_verified) {
        alert('LinkedIn verification required. Please sign up with LinkedIn.');
        window.location.href = '/signup';
        return;
      }

      setUserName(profile.full_name || 'there');
      setLinkedinSlug(profile.linkedin_slug || '');
      
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    if (type === 'error') {
      toast.error('Validation Error', message);
    } else {
      toast.success('Success', message);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      if (!linkedinSlug || !linkedinSlug.trim()) {
        newErrors.linkedinSlug = "LinkedIn username is required";
      } else if (!/^[a-zA-Z0-9-]+$/.test(linkedinSlug)) {
        newErrors.linkedinSlug = "Username can only contain letters, numbers, and hyphens";
      }
    }

    if (step === 3) {
      if (!formData.offerTitle.trim()) {
        newErrors.offerTitle = "Offer title is required";
      }
      if (!formData.offerDescription.trim()) {
        newErrors.offerDescription = "Description is required";
      }
      
      if (showCustomPrice) {
        const priceNum = parseFloat(customPrice);
        if (!customPrice || isNaN(priceNum) || priceNum <= 0) {
          newErrors.customPrice = "Please enter a valid price";
        } else if (priceNum < 10) {
          newErrors.customPrice = "Minimum price is $10";
        } else if (priceNum > 10000) {
          newErrors.customPrice = "Maximum price is $10,000";
        }
      }
    }

    if (step === 4) {
      if (!formData.benefit1Title.trim()) {
        newErrors.benefit1Title = "Benefit 1 title is required";
      }
      if (!formData.benefit1Description.trim()) {
        newErrors.benefit1Description = "Benefit 1 description is required";
      }
      if (!formData.benefit2Title.trim()) {
        newErrors.benefit2Title = "Benefit 2 title is required";
      }
      if (!formData.benefit2Description.trim()) {
        newErrors.benefit2Description = "Benefit 2 description is required";
      }
      if (!formData.benefit3Title.trim()) {
        newErrors.benefit3Title = "Benefit 3 title is required";
      }
      if (!formData.benefit3Description.trim()) {
        newErrors.benefit3Description = "Benefit 3 description is required";
      }
    }

    if (step === 5) {
      if (!formData.calendlyUrl.trim()) {
        newErrors.calendlyUrl = "Calendly URL is required";
      } else if (!formData.calendlyUrl.includes('calendly.com')) {
        newErrors.calendlyUrl = "Please enter a valid Calendly URL";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      showToast(firstError, 'error');
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (currentStep <= totalSteps && validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const saveToDatabase = async () => {
    if (!validateStep(5)) return;

    setIsLoading(true);

    try {
      let finalPrice = formData.price;
      if (showCustomPrice && customPrice) {
        finalPrice = `$${customPrice}`;
      }

      const priceInCents = Math.round(parseFloat(finalPrice.replace('$', '')) * 100);

      const { error } = await supabase
        .from('users')
        .update({
          email: formData.email,
          linkedin_slug: linkedinSlug,
          title: formData.offerTitle,
          description: formData.offerDescription,
          price_cents: priceInCents,
          bullet_title_1: formData.benefit1Title,
          bullet_desc_1: formData.benefit1Description,
          bullet_title_2: formData.benefit2Title,
          bullet_desc_2: formData.benefit2Description,
          bullet_title_3: formData.benefit3Title,
          bullet_desc_3: formData.benefit3Description,
          booking_url: formData.calendlyUrl,
          is_active: true,
        })
        .eq('id', userId);

      if (error) {
        console.error('Database update error:', error);
        showToast('Failed to save profile. Please try again.', 'error');
        setIsLoading(false);
        return;
      }

      // Send welcome email
      if (formData.email) {
        try {
          await fetch('https://mqvuqmysklmkjtarmods.supabase.co/functions/v1/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
            },
            body: JSON.stringify({
              to: formData.email,
              subject: 'Welcome to Marrow! 🎉',
              html: getWelcomeEmailHtml(userName, linkedinSlug),
              text: getWelcomeEmailText(userName, linkedinSlug),
            }),
          });
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
        }
      }

      setCurrentStep(6);
      showToast('Profile saved successfully!', 'success');
    } catch (err) {
      console.error('Unexpected error:', err);
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    window.location.href = '/dashboard';
  };

  if (isLoading && currentStep < 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {userName}! 👋</h1>
          <p className="text-slate-600">Let's set up your offer in just a few steps</p>
        </div>

        {currentStep <= totalSteps && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-slate-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {currentStep === 1 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What's Your Email?</h2>
                <p className="text-slate-600 mb-8">We'll send booking notifications here</p>
                <div className="space-y-2 mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={(e) => updateFormData("email", e.target.value)} 
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.email ? 'border-red-500' : 'border-slate-200'
                    } focus:border-blue-500 outline-none transition-colors`}
                    placeholder="your.email@example.com" 
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">💡 Never Miss a Booking:</span> We'll notify you instantly when someone books time with you
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Your LinkedIn Username</h2>
                <p className="text-slate-600 mb-8">This appears after linkedin.com/in/</p>
                <div className="space-y-2 mb-6">
                  <label htmlFor="linkedinSlug" className="block text-sm font-semibold text-slate-700">
                    LinkedIn Username <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm">linkedin.com/in/</span>
                    <input 
                      type="text" 
                      id="linkedinSlug" 
                      value={linkedinSlug} 
                      onChange={(e) => setLinkedinSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} 
                      className={`flex-1 px-4 py-3 rounded-lg border-2 ${
                        errors.linkedinSlug ? 'border-red-500' : 'border-slate-200'
                      } focus:border-blue-500 outline-none transition-colors`}
                      placeholder="your-name" 
                    />
                  </div>
                  {errors.linkedinSlug && (
                    <p className="text-red-500 text-sm mt-2">{errors.linkedinSlug}</p>
                  )}
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">✓ Example:</span> If your profile is linkedin.com/in/john-smith, enter "john-smith"
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Are You Offering?</h2>
                <p className="text-slate-600 mb-8">Describe your consultation service</p>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="offerTitle" className="block text-sm font-semibold text-slate-700 mb-2">
                      Offer Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="offerTitle" 
                      value={formData.offerTitle} 
                      onChange={(e) => updateFormData("offerTitle", e.target.value)} 
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.offerTitle ? 'border-red-500' : 'border-slate-200'
                      } focus:border-blue-500 outline-none transition-colors`}
                      placeholder="e.g., Career Strategy Session" 
                    />
                    {errors.offerTitle && (
                      <p className="text-red-500 text-sm mt-1">{errors.offerTitle}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="offerDescription" className="block text-sm font-semibold text-slate-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="offerDescription" 
                      value={formData.offerDescription} 
                      onChange={(e) => updateFormData("offerDescription", e.target.value)} 
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.offerDescription ? 'border-red-500' : 'border-slate-200'
                      } focus:border-blue-500 outline-none transition-colors resize-none`}
                      placeholder="Brief description of what you'll help with..." 
                    />
                    {errors.offerDescription && (
                      <p className="text-red-500 text-sm mt-1">{errors.offerDescription}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Price (30 minutes) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {["$50", "$100", "$200", "$500"].map((price) => (
                        <button
                          key={price}
                          type="button"
                          onClick={() => {
                            updateFormData("price", price);
                            setShowCustomPrice(false);
                          }}
                          className={`py-2 px-4 rounded-lg border-2 font-semibold transition-all ${
                            formData.price === price && !showCustomPrice
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCustomPrice(!showCustomPrice)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      {showCustomPrice ? "- Use preset price" : "+ Custom price"}
                    </button>
                    {showCustomPrice && (
                      <div className="mt-3">
                        <input
                          type="number"
                          value={customPrice}
                          onChange={(e) => setCustomPrice(e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border-2 ${
                            errors.customPrice ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Enter amount ($10 - $10,000)"
                          min="10"
                          max="10000"
                        />
                        {errors.customPrice && (
                          <p className="text-red-500 text-sm mt-1">{errors.customPrice}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Will They Get?</h2>
                <p className="text-slate-600 mb-8">Highlight 3 key benefits of working with you</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Benefit 1</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="benefit1Title" className="block text-sm font-semibold text-slate-700 mb-2">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="benefit1Title" 
                          value={formData.benefit1Title} 
                          onChange={(e) => updateFormData("benefit1Title", e.target.value)} 
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit1Title ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="e.g., Expert Career Guidance" 
                        />
                        {errors.benefit1Title && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit1Title}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="benefit1Description" className="block text-sm font-semibold text-slate-700 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                          id="benefit1Description" 
                          value={formData.benefit1Description} 
                          onChange={(e) => updateFormData("benefit1Description", e.target.value)} 
                          rows={2}
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit1Description ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Description" 
                        />
                        {errors.benefit1Description && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit1Description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Benefit 2</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="benefit2Title" className="block text-sm font-semibold text-slate-700 mb-2">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="benefit2Title" 
                          value={formData.benefit2Title} 
                          onChange={(e) => updateFormData("benefit2Title", e.target.value)} 
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit2Title ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Title" 
                        />
                        {errors.benefit2Title && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit2Title}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="benefit2Description" className="block text-sm font-semibold text-slate-700 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                          id="benefit2Description" 
                          value={formData.benefit2Description} 
                          onChange={(e) => updateFormData("benefit2Description", e.target.value)} 
                          rows={2}
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit2Description ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Description" 
                        />
                        {errors.benefit2Description && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit2Description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Benefit 3</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="benefit3Title" className="block text-sm font-semibold text-slate-700 mb-2">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="benefit3Title" 
                          value={formData.benefit3Title} 
                          onChange={(e) => updateFormData("benefit3Title", e.target.value)} 
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit3Title ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Title" 
                        />
                        {errors.benefit3Title && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit3Title}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="benefit3Description" className="block text-sm font-semibold text-slate-700 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                          id="benefit3Description" 
                          value={formData.benefit3Description} 
                          onChange={(e) => updateFormData("benefit3Description", e.target.value)} 
                          rows={2}
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit3Description ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Description" 
                        />
                        {errors.benefit3Description && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit3Description}</p>
                        )}
                      </div>
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
                  <label htmlFor="calendlyUrl" className="block text-sm font-semibold text-slate-700">
                    Your Calendly URL <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="calendlyUrl" 
                    value={formData.calendlyUrl} 
                    onChange={(e) => updateFormData("calendlyUrl", e.target.value)} 
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.calendlyUrl ? 'border-red-500' : 'border-slate-200'
                    } focus:border-blue-500 outline-none transition-colors`}
                    placeholder="https://calendly.com/yourusername" 
                  />
                  {errors.calendlyUrl && (
                    <p className="text-red-500 text-sm mt-2">{errors.calendlyUrl}</p>
                  )}
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Don't have Calendly?</span> Sign up for free at{" "}
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">
                      calendly.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="text-center">
                <div className="mb-8">
                  <div className="text-7xl mb-4 animate-bounce">🎉</div>
                  <h2 className="text-5xl font-bold text-slate-900 mb-3">You're All Set!</h2>
                  <p className="text-2xl text-slate-600 mb-2">Your profile is live and ready to earn</p>
                  <p className="text-lg text-green-600 font-semibold">🚀 Time to start making money from your expertise!</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border-2 border-green-200">
                  <div className="text-sm text-green-700 font-semibold mb-2">YOUR EARNING POTENTIAL</div>
                  <div className="text-5xl font-bold text-green-700 mb-2">
                    ${showCustomPrice ? customPrice : formData.price.replace('$', '')}
                    <span className="text-2xl text-green-600">/connection</span>
                  </div>
                  <p className="text-green-700 mb-4">
                    Just 5 connections per month = <span className="font-bold">${parseInt(showCustomPrice ? customPrice : formData.price.replace('$', '')) * 5}/mo</span>
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-700">10</div>
                      <div className="text-xs text-green-600">connections/mo</div>
                      <div className="text-lg font-bold text-green-800 mt-1">${parseInt(showCustomPrice ? customPrice : formData.price.replace('$', '')) * 10}</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-700">20</div>
                      <div className="text-xs text-green-600">connections/mo</div>
                      <div className="text-lg font-bold text-green-800 mt-1">${parseInt(showCustomPrice ? customPrice : formData.price.replace('$', '')) * 20}</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-700">50</div>
                      <div className="text-xs text-green-600">connections/mo</div>
                      <div className="text-lg font-bold text-green-800 mt-1">${parseInt(showCustomPrice ? customPrice : formData.price.replace('$', '')) * 50}</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <button 
                    className="px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-600/40 hover:scale-105 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <Chrome className="w-10 h-10" />
                    <span>Download Extension</span>
                    <span className="text-sm font-normal text-purple-100">Add button to LinkedIn profile</span>
                  </button>

                  <button
                    onClick={goToDashboard}
                    className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl">📊</span>
                    <span>Go to Dashboard</span>
                    <span className="text-sm font-normal text-slate-300">Manage your profile & earnings</span>
                  </button>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-left">
                  <p className="font-semibold text-blue-900 mb-3 text-center">🎯 How to Start Earning:</p>
                  <ol className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">1</div>
                      <span>Install the Chrome extension (takes 30 seconds)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">2</div>
                      <span>Your booking button appears on <span className="font-semibold">linkedin.com/in/{linkedinSlug}</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">✓</div>
                      <span className="font-semibold text-green-700">Anyone viewing your profile can instantly book & pay you!</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-200">
              <button 
                onClick={prevStep} 
                disabled={currentStep === 1 || isLoading || currentStep === 6} 
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  currentStep === 1 || isLoading || currentStep === 6 
                    ? "text-slate-300 cursor-not-allowed" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              {currentStep < 6 && (
                <button 
                  onClick={currentStep === 5 ? saveToDatabase : nextStep} 
                  disabled={isLoading} 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {isLoading && currentStep === 5 ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    currentStep === 5 ? "Finish" : "Continue"
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

function getWelcomeEmailHtml(name: string, slug: string) {
  const profileUrl = `https://marrow.ideatoads.com/${slug}`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f8fafc;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
<tr><td style="background:linear-gradient(135deg,#0a66c2 0%,#004182 100%);padding:40px;text-align:center;">
<h1 style="color:#ffffff;font-size:32px;font-weight:700;margin:0 0 8px 0;">Welcome to Marrow! 🎉</h1>
<p style="color:rgba(255,255,255,0.9);font-size:16px;margin:0;">Your profile is live and ready to earn</p>
</td></tr>
<tr><td style="padding:40px;">
<p style="color:#1e293b;font-size:16px;margin:0 0 24px 0;">Hi ${name},</p>
<p style="color:#1e293b;font-size:16px;margin:0 0 32px 0;">Congratulations! Your Marrow profile is now live. You're ready to start monetizing your expertise.</p>
<h2 style="color:#1e293b;font-size:20px;font-weight:700;margin:0 0 20px 0;">🚀 Get Your First Booking</h2>
<div style="padding:16px;background-color:#f8fafc;border-left:4px solid #0a66c2;margin-bottom:12px;border-radius:4px;">
<p style="color:#1e293b;font-size:15px;font-weight:600;margin:0 0 6px 0;">1. Install the Chrome Extension</p>
<p style="color:#64748b;font-size:14px;margin:0;">Add a booking button to your LinkedIn profile (takes 30 seconds)</p>
</div>
<div style="padding:16px;background-color:#f8fafc;border-left:4px solid #0a66c2;margin-bottom:12px;border-radius:4px;">
<p style="color:#1e293b;font-size:15px;font-weight:600;margin:0 0 6px 0;">2. Share Your Marrow Profile</p>
<p style="color:#64748b;font-size:14px;margin:0;">Post on LinkedIn, Twitter, or share with your network</p>
</div>
<div style="padding:16px;background-color:#f0fdf4;border-left:4px solid #22c55e;border-radius:4px;margin-bottom:32px;">
<p style="color:#1e293b;font-size:15px;font-weight:600;margin:0 0 6px 0;">3. Start Earning!</p>
<p style="color:#64748b;font-size:14px;margin:0;">Get notified when someone books, deliver great sessions, get paid</p>
</div>
<div style="background-color:#eff6ff;border-radius:8px;padding:20px;margin-bottom:32px;">
<p style="color:#1e40af;font-size:14px;margin:0 0 10px 0;font-weight:600;">📱 Your Marrow Profile:</p>
<a href="${profileUrl}" style="color:#2563eb;font-size:15px;font-weight:600;word-break:break-all;text-decoration:underline;">${profileUrl}</a>
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
<tr><td align="center" style="padding-bottom:12px;">
<a href="https://marrow.ideatoads.com/dashboard" style="display:inline-block;background:linear-gradient(135deg,#0a66c2,#004182);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:700;font-size:16px;">Go to Dashboard</a>
</td></tr>
</table>
</td></tr>
<tr><td style="background-color:#f8fafc;padding:32px;text-align:center;border-top:1px solid #e2e8f0;">
<p style="color:#94a3b8;font-size:13px;margin:0 0 8px 0;">Questions? Reply to this email</p>
<p style="color:#cbd5e1;font-size:11px;margin:0;">Powered by Marrow</p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

function getWelcomeEmailText(name: string, slug: string) {
  return `Welcome to Marrow!\n\nHi ${name},\n\nYour profile is live at https://marrow.ideatoads.com/${slug}\n\nStart earning by:\n1. Installing the Chrome extension\n2. Sharing your profile\n3. Getting your first booking!\n\nGo to Dashboard: https://marrow.ideatoads.com/dashboard\n\nPowered by Marrow`;
}