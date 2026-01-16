import { Metadata } from 'next';
import HomepageContent from './homepage-content';

export const metadata: Metadata = {
  title: 'Marrow - Turn Your LinkedIn Network Into Revenue',
  description: 'Get paid when people want to connect with you. Set your price, control access, and monetize your professional expertise on LinkedIn.',
  keywords: 'LinkedIn monetization, professional network, paid consultations, expertise monetization, LinkedIn earnings',
  alternates: {
    canonical: 'https://marrow.ideatoads.com',
  },
  openGraph: {
    title: 'Marrow - Turn Your LinkedIn Network Into Revenue',
    description: 'Get paid when people want to connect with you. Set your price, control access, and monetize your professional expertise on LinkedIn.',
    url: 'https://marrow.ideatoads.com',
    siteName: 'Marrow',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Marrow - LinkedIn Monetization Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marrow - Turn Your LinkedIn Network Into Revenue',
    description: 'Get paid when people want to connect with you. Set your price, control access, and monetize your professional expertise on LinkedIn.',
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <HomepageContent />
    </>
  );
}