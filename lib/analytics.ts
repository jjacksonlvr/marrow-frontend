// Analytics configuration and tracking utilities for Marrow

// Google Analytics 4 setup
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Initialize Google Analytics
export function initGA() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  // Load GA script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize GA
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  (window as any).gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

// Track custom events
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    console.log('[Analytics]', eventName, eventParams);
    return;
  }

  (window as any).gtag?.('event', eventName, eventParams);
}

// Predefined event tracking functions

export function trackSignup(method: string = 'email') {
  trackEvent('sign_up', {
    method,
    page: window.location.pathname
  });
}

export function trackLogin(method: string = 'email') {
  trackEvent('login', {
    method,
    page: window.location.pathname
  });
}

export function trackOnboardingStart() {
  trackEvent('begin_onboarding', {
    page: '/onboard'
  });
}

export function trackOnboardingStep(step: number, stepName: string) {
  trackEvent('onboarding_step', {
    step,
    step_name: stepName
  });
}

export function trackOnboardingComplete() {
  trackEvent('complete_onboarding', {
    page: '/dashboard'
  });
}

export function trackStripeConnect() {
  trackEvent('stripe_connect_initiated');
}

export function trackStripeConnected() {
  trackEvent('stripe_connected', {
    conversion: true
  });
}

export function trackExtensionDownload() {
  trackEvent('extension_download', {
    source: window.location.pathname
  });
}

export function trackBookingInitiated(creatorSlug: string, amount: number) {
  trackEvent('begin_checkout', {
    creator_slug: creatorSlug,
    value: amount / 100, // Convert cents to dollars
    currency: 'USD'
  });
}

export function trackBookingCompleted(
  creatorSlug: string,
  amount: number,
  transactionId: string
) {
  trackEvent('purchase', {
    transaction_id: transactionId,
    creator_slug: creatorSlug,
    value: amount / 100,
    currency: 'USD',
    items: [{
      item_name: 'Consultation',
      price: amount / 100,
      quantity: 1
    }]
  });
}

export function trackProfileView(creatorSlug: string) {
  trackEvent('view_item', {
    creator_slug: creatorSlug
  });
}

export function trackCalendlyClick(creatorSlug: string) {
  trackEvent('calendly_click', {
    creator_slug: creatorSlug
  });
}

export function trackPriceChange(oldPrice: number, newPrice: number) {
  trackEvent('price_changed', {
    old_price: oldPrice / 100,
    new_price: newPrice / 100
  });
}

export function trackActiveToggle(isActive: boolean) {
  trackEvent('availability_toggled', {
    is_active: isActive
  });
}

export function trackError(errorType: string, errorMessage: string, page: string) {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    page,
    fatal: false
  });
}

export function trackSearch(searchTerm: string) {
  trackEvent('search', {
    search_term: searchTerm
  });
}

// User properties
export function setUserProperty(propertyName: string, value: any) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  (window as any).gtag?.('set', 'user_properties', {
    [propertyName]: value
  });
}

export function identifyUser(userId: string, email?: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  (window as any).gtag?.('config', GA_MEASUREMENT_ID, {
    user_id: userId
  });

  if (email) {
    setUserProperty('user_email', email);
  }
}

// Conversion tracking
export function trackConversion(conversionName: string, value?: number) {
  trackEvent(conversionName, {
    value,
    currency: 'USD',
    conversion: true
  });
}

// Form interactions
export function trackFormStart(formName: string) {
  trackEvent('form_start', {
    form_name: formName
  });
}

export function trackFormSubmit(formName: string) {
  trackEvent('form_submit', {
    form_name: formName
  });
}

export function trackFormError(formName: string, errorField: string) {
  trackEvent('form_error', {
    form_name: formName,
    error_field: errorField
  });
}

// Outbound link tracking
export function trackOutboundLink(url: string, label?: string) {
  trackEvent('outbound_link', {
    link_url: url,
    link_label: label
  });
}

// File downloads
export function trackDownload(fileName: string, fileType: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  });
}

// Video engagement
export function trackVideoPlay(videoName: string) {
  trackEvent('video_start', {
    video_name: videoName
  });
}

export function trackVideoComplete(videoName: string) {
  trackEvent('video_complete', {
    video_name: videoName
  });
}

// Custom dimensions (for advanced tracking)
export function setCustomDimension(dimension: string, value: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  (window as any).gtag?.('event', 'custom_dimension', {
    [dimension]: value
  });
}

// E-commerce tracking helpers
export function trackAddToCart(item: any) {
  trackEvent('add_to_cart', {
    items: [item]
  });
}

export function trackRemoveFromCart(item: any) {
  trackEvent('remove_from_cart', {
    items: [item]
  });
}

export function trackViewCart(items: any[]) {
  trackEvent('view_cart', {
    items
  });
}

// Timing events
export function trackTiming(
  category: string,
  variable: string,
  value: number,
  label?: string
) {
  trackEvent('timing_complete', {
    name: variable,
    value,
    event_category: category,
    event_label: label
  });
}

// Exception tracking
export function trackException(description: string, fatal: boolean = false) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  (window as any).gtag?.('event', 'exception', {
    description,
    fatal
  });
}
