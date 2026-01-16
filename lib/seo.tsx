// SEO utilities for Marrow

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

// Generate page metadata
export function generateMetadata(seo: PageSEO) {
  const baseUrl = 'https://marrow.ideatoads.com';
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical || baseUrl,
    },
    robots: {
      index: !seo.noindex,
      follow: !seo.noindex,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical || baseUrl,
      siteName: 'Marrow',
      images: seo.ogImage ? [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ] : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
}

// Structured data for organization
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Marrow',
    url: 'https://marrow.ideatoads.com',
    logo: 'https://marrow.ideatoads.com/logo.png',
    description: 'Turn your LinkedIn network into revenue. Get paid for your expertise.',
    sameAs: [
      'https://twitter.com/marrow',
      'https://linkedin.com/company/marrow',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@marrow.ideatoads.com',
      contactType: 'Customer Support',
    },
  };
}

// Structured data for product
export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Marrow',
    description: 'LinkedIn monetization platform for professionals',
    brand: {
      '@type': 'Brand',
      name: 'Marrow',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Marrow',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };
}

// Structured data for FAQ
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Structured data for breadcrumbs
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Structured data for how-to
export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Structured data for article
export function getArticleSchema(
  title: string,
  description: string,
  datePublished: string,
  dateModified: string,
  author: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || 'https://marrow.ideatoads.com/og-image.png',
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Marrow',
      logo: {
        '@type': 'ImageObject',
        url: 'https://marrow.ideatoads.com/logo.png',
      },
    },
  };
}

// Structured data for person (creator profile)
export function getPersonSchema(
  name: string,
  jobTitle: string,
  description: string,
  linkedInUrl?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    sameAs: linkedInUrl ? [linkedInUrl] : [],
  };
}

// Helper to inject structured data into page
export function StructuredData({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Generate sitemap data
export interface SitemapPage {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapPages(): SitemapPage[] {
  const baseUrl = 'https://marrow.ideatoads.com';
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}

// Meta tags for specific pages
export const pageSEO = {
  home: {
    title: 'Marrow - Turn Your LinkedIn Network Into Revenue',
    description: 'Get paid when people want to connect with you. Set your price, control access, and monetize your professional expertise on LinkedIn.',
    keywords: 'LinkedIn monetization, professional network, paid consultations, expertise monetization, LinkedIn earnings',
  },
  howItWorks: {
    title: 'How It Works - Marrow',
    description: 'Learn how to monetize your LinkedIn profile in 5 simple steps. Set up takes less than 10 minutes and start earning from your network.',
    keywords: 'how marrow works, LinkedIn monetization guide, professional consultation setup',
  },
  faq: {
    title: 'Frequently Asked Questions - Marrow',
    description: 'Common questions about monetizing your LinkedIn profile, pricing, payments, and getting started with Marrow.',
    keywords: 'marrow faq, LinkedIn monetization questions, professional consultation pricing',
  },
  about: {
    title: 'About Marrow - Your Network Is Your Net Worth',
    description: 'Marrow helps professionals monetize their expertise and LinkedIn networks. Turn your knowledge into revenue with paid consultations.',
    keywords: 'about marrow, LinkedIn monetization platform, professional expertise',
  },
  contact: {
    title: 'Contact Us - Marrow Support',
    description: 'Get in touch with Marrow support. We typically respond within 4 hours during business hours.',
    keywords: 'marrow support, contact marrow, customer service',
  },
  dashboard: {
    title: 'Dashboard - Marrow',
    description: 'Manage your Marrow profile, track earnings, and control your availability.',
    keywords: 'marrow dashboard, earnings tracking, profile management',
    noindex: true, // Don't index authenticated pages
  },
  login: {
    title: 'Login - Marrow',
    description: 'Sign in to your Marrow account to manage your profile and track earnings.',
    keywords: 'marrow login, sign in',
    noindex: true,
  },
  signup: {
    title: 'Sign Up - Start Earning Today | Marrow',
    description: 'Create your free Marrow account and start monetizing your LinkedIn network. No credit card required.',
    keywords: 'marrow signup, create account, start earning',
  },
};
