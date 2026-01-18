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

  const totalSteps = 5; // Email, LinkedIn, Offer, Benefits, Calendly

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/signup';
        return;
      }

      setUserId(user.id);

      // Set email from auth user
      setUserEmail(user.email || '');
      setFormData(prev => ({ ...prev, email: user.email || '' }));

      // Get user profile data from database (LinkedIn data is already there from OAuth)
      const { data: profile, error } = await supabase
        .from('users')
        .select('full_name, linkedin_slug, linkedin_verified')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        // If user doesn't exist yet, something went wrong with OAuth
        alert('Profile not found. Please sign up again.');
        window.location.href = '/signup';
        return;
      }

      // Verify LinkedIn authentication
      if (!profile?.linkedin_verified) {
        alert('LinkedIn verification required. Please sign up with LinkedIn.');
        window.location.href = '/signup';
        return;
      }

      // Set LinkedIn data from database
      setUserName(profile.full_name || 'there');
      setLinkedinSlug(profile.linkedin_slug || '');
      
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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
      // Validate email
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      // Validate LinkedIn slug
      if (!linkedinSlug || !linkedinSlug.trim()) {
        newErrors.linkedinSlug = "LinkedIn username is required";
      } else if (!/^[a-zA-Z0-9-]+$/.test(linkedinSlug)) {
        newErrors.linkedinSlug = "Username can only contain letters, numbers, and hyphens";
      }
    }

    if (step === 3) {
      // Validate offer details
      if (!formData.offerTitle.trim()) {
        newErrors.offerTitle = "Offer title is required";
      }
      if (!formData.offerDescription.trim()) {
        newErrors.offerDescription = "Description is required";
      }
      
      // Validate price
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
      // Validate benefits
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
      // Validate Calendly URL
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
    if (!validateStep(currentStep)) {
      console.log('Validation failed for step:', currentStep);
      return; // Don't proceed if validation fails
    }
    
    console.log('Advancing from step', currentStep, 'to step', currentStep + 1);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveToDatabase = async () => {
    // Validate before saving
    if (!validateStep(currentStep)) {
      console.log('Validation failed for step:', currentStep);
      return;
    }

    setIsLoading(true);
    console.log('Starting database save with data:', {
      email: formData.email,
      linkedin_slug: linkedinSlug,
      title: formData.offerTitle,
      price: showCustomPrice ? customPrice : formData.price,
      calendlyUrl: formData.calendlyUrl
    });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        showToast('Not authenticated. Please sign up first.', 'error');
        window.location.href = '/signup';
        return;
      }

      // Use custom price if set, otherwise use dropdown value
      const priceString = showCustomPrice 
        ? customPrice 
        : formData.price.replace('$', '').replace(',', '');
      const priceCents = Math.round(parseFloat(priceString) * 100);

      console.log('Updating user profile for user ID:', user.id);

      // UPDATE the existing user record (created by OAuth) instead of INSERT
      const { error } = await supabase
        .from('users')
        .update({
          email: formData.email,
          linkedin_slug: linkedinSlug, // Save the slug
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
        })
        .eq('id', user.id);

      if (error) {
        console.error('Database update error:', error);
        showToast(`Error: ${error.message}`, 'error');
        setIsLoading(false);
        return;
      }

      console.log('Database update successful!');
      setIsLoading(false);
      nextStep(); // Go to success screen (Step 6)
    } catch (error) {
      console.error('Save error:', error);
      showToast('An unexpected error occurred. Please try again.', 'error');
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    window.location.href = '/dashboard';
  };

  // Show loading state while fetching user data
  if (isLoading && currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600 mb-4"></div>
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-slate-500">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
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

        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">Marrow</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            transition={{ duration: 0.3 }} 
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12"
          >
            
            {/* Step 1: Email Only */}
            {currentStep === 1 && (
              <div>
                <div className="text-4xl mb-4">📧</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Never Miss a Booking</h2>
                <p className="text-lg text-slate-600 mb-8">Enter your email so we can notify you the moment someone books time with you</p>
                
                {/* Email Input */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={(e) => updateFormData("email", e.target.value)} 
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.email ? 'border-red-500' : 'border-slate-200'
                    } focus:border-blue-500 outline-none transition-colors text-lg`}
                    placeholder="you@email.com" 
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>
                
                {/* Email Explainer Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xl">💰</span>
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 mb-1">This is How You Get Paid</p>
                      <p className="text-sm text-green-700 leading-relaxed">
                        Every booking notification goes straight to this email. We'll alert you instantly so you never miss an opportunity to earn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: LinkedIn Username */}
            {currentStep === 2 && (
              <div>
                <div className="text-4xl mb-4">🔗</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Connect Your LinkedIn</h2>
                <p className="text-lg text-slate-600 mb-8">This adds your booking button directly to your LinkedIn profile</p>
                
                {/* LinkedIn Username Input */}
                <div className="mb-6">
                  <label htmlFor="linkedinSlug" className="block text-sm font-semibold text-slate-700 mb-2">
                    Your LinkedIn Username <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium text-lg">linkedin.com/in/</span>
                    <input 
                      type="text" 
                      id="linkedinSlug"
                      value={linkedinSlug}
                      onChange={(e) => setLinkedinSlug(e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 ${
                        errors.linkedinSlug ? 'border-red-500' : 'border-slate-200'
                      } focus:border-blue-500 outline-none transition-colors text-lg`}
                      placeholder="your-username"
                    />
                  </div>
                  {errors.linkedinSlug && (
                    <p className="text-red-500 text-sm mt-2">{errors.linkedinSlug}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-2">
                    Find your custom URL at{" "}
                    <a href="https://www.linkedin.com/public-profile/settings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn Settings → Public Profile
                    </a>
                  </p>
                </div>

                {/* LinkedIn Explainer Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Your Money-Making Badge</p>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        Once you install our Chrome extension, a "Book Time" button appears on your LinkedIn profile. Anyone viewing your profile can instantly book and pay you—no back-and-forth needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Offer Details */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Are You Offering?</h2>
                <p className="text-slate-600 mb-8">Describe what people get when they pay to connect with you</p>
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
                      } focus:border-blue-500 outline-none transition-colors text-lg`}
                      placeholder="30-Minute Career Strategy Call" 
                    />
                    {errors.offerTitle && (
                      <p className="text-red-500 text-sm mt-2">{errors.offerTitle}</p>
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
                      placeholder="Get personalized advice on breaking into tech, navigating career transitions, and growing your professional network."
                    />
                    {errors.offerDescription && (
                      <p className="text-red-500 text-sm mt-2">{errors.offerDescription}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Price <span className="text-red-500">*</span>
                    </label>
                    {!showCustomPrice ? (
                      <div>
                        <select 
                          id="price" 
                          value={formData.price} 
                          onChange={(e) => {
                            if (e.target.value === "custom") {
                              setShowCustomPrice(true);
                              setCustomPrice("");
                            } else {
                              updateFormData("price", e.target.value);
                            }
                          }} 
                          className={`w-full px-4 py-3 rounded-lg border-2 ${
                            errors.price ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors text-lg`}
                        >
                          <option value="$50">$50</option>
                          <option value="$100">$100</option>
                          <option value="$150">$150</option>
                          <option value="$200">$200</option>
                          <option value="$300">$300</option>
                          <option value="$500">$500</option>
                          <option value="custom">Custom amount...</option>
                        </select>
                        {errors.price && (
                          <p className="text-red-500 text-sm mt-2">{errors.price}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">$</span>
                            <input
                              type="number"
                              value={customPrice}
                              onChange={(e) => {
                                setCustomPrice(e.target.value);
                                if (errors.customPrice) {
                                  setErrors((prev) => ({ ...prev, customPrice: "" }));
                                }
                              }}
                              className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 ${
                                errors.customPrice ? 'border-red-500' : 'border-slate-200'
                              } focus:border-blue-500 outline-none transition-colors text-lg`}
                              placeholder="Enter custom price"
                              min="10"
                              max="10000"
                              step="1"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCustomPrice(false);
                              setCustomPrice("");
                              setErrors((prev) => ({ ...prev, customPrice: "" }));
                            }}
                            className="px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                        {errors.customPrice && (
                          <p className="text-red-500 text-sm mt-2">{errors.customPrice}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-2">Minimum $10, Maximum $10,000</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Benefits */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">What Makes You Valuable?</h2>
                <p className="text-slate-600 mb-8">Add 3 key benefits people get when they book with you</p>
                <div className="space-y-8">
                  <div className="pb-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 1 <span className="text-red-500">*</span></h3>
                    <div className="space-y-3">
                      <div>
                        <input 
                          type="text" 
                          value={formData.benefit1Title} 
                          onChange={(e) => updateFormData("benefit1Title", e.target.value)} 
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit1Title ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Benefit Title (e.g., Career Advice)" 
                        />
                        {errors.benefit1Title && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit1Title}</p>
                        )}
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={formData.benefit1Description} 
                          onChange={(e) => updateFormData("benefit1Description", e.target.value)} 
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
                  <div className="pb-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 2 <span className="text-red-500">*</span></h3>
                    <div className="space-y-3">
                      <div>
                        <input 
                          type="text" 
                          value={formData.benefit2Title} 
                          onChange={(e) => updateFormData("benefit2Title", e.target.value)} 
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit2Title ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Benefit Title" 
                        />
                        {errors.benefit2Title && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit2Title}</p>
                        )}
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={formData.benefit2Description} 
                          onChange={(e) => updateFormData("benefit2Description", e.target.value)} 
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
                    <h3 className="font-semibold text-slate-700 mb-4">Bullet Point 3 <span className="text-red-500">*</span></h3>
                    <div className="space-y-3">
                      <div>
                        <input 
                          type="text" 
                          value={formData.benefit3Title} 
                          onChange={(e) => updateFormData("benefit3Title", e.target.value)} 
                          className={`w-full px-4 py-2 rounded-lg border-2 ${
                            errors.benefit3Title ? 'border-red-500' : 'border-slate-200'
                          } focus:border-blue-500 outline-none transition-colors`}
                          placeholder="Benefit Title" 
                        />
                        {errors.benefit3Title && (
                          <p className="text-red-500 text-sm mt-1">{errors.benefit3Title}</p>
                        )}
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={formData.benefit3Description} 
                          onChange={(e) => updateFormData("benefit3Description", e.target.value)} 
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

            {/* Step 5: Calendly - Saves to database */}
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

            {/* Success Screen - Step 6 (not counted in totalSteps) */}
            {currentStep === 6 && (
              <div className="text-center">
                {/* Celebration Header */}
                <div className="mb-8">
                  <div className="text-7xl mb-4 animate-bounce">🎉</div>
                  <h2 className="text-5xl font-bold text-slate-900 mb-3">You're All Set!</h2>
                  <p className="text-2xl text-slate-600 mb-2">Your profile is live and ready to earn</p>
                  <p className="text-lg text-green-600 font-semibold">🚀 Time to start making money from your expertise!</p>
                </div>
                
                {/* Earning Potential Card */}
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

                {/* Two Primary CTAs */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {/* Download Extension - Primary */}
                  <button 
                    className="px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-600/40 hover:scale-105 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <Chrome className="w-10 h-10" />
                    <span>Download Extension</span>
                    <span className="text-sm font-normal text-purple-100">Add button to LinkedIn profile</span>
                  </button>

                  {/* Go to Dashboard - Secondary */}
                  <button
                    onClick={goToDashboard}
                    className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl">📊</span>
                    <span>Go to Dashboard</span>
                    <span className="text-sm font-normal text-slate-300">Manage your profile & earnings</span>
                  </button>
                </div>
                
                {/* Quick Guide */}
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

            {/* Navigation Buttons */}
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
