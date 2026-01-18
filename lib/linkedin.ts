// lib/linkedin.ts
// LinkedIn OAuth helper functions for Marrow

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const LINKEDIN_PROFILE_URL = 'https://api.linkedin.com/v2/userinfo';

export interface LinkedInProfile {
  sub: string; // LinkedIn user ID
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
  locale: {
    country: string;
    language: string;
  };
}

/**
 * Generate LinkedIn OAuth authorization URL
 * @param state - Random state string for CSRF protection
 * @returns LinkedIn authorization URL
 */
export function getLinkedInAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
    state: state,
    scope: 'openid profile email',
  });

  return `${LINKEDIN_AUTH_URL}?${params.toString()}`;
}

/**
 * Extract LinkedIn slug from various LinkedIn URL formats
 * Examples:
 * - https://www.linkedin.com/in/username → username
 * - https://linkedin.com/in/username/ → username
 * - linkedin.com/in/username → username
 * - username → username
 */
export function extractLinkedInSlug(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /linkedin\.com\/in\/([^\/\?]+)/i,
    /^([a-zA-Z0-9-]+)$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1].toLowerCase().trim();
    }
  }

  return null;
}

/**
 * Validate LinkedIn slug format
 * LinkedIn slugs are 3-100 characters, alphanumeric plus hyphens
 */
export function isValidLinkedInSlug(slug: string): boolean {
  if (!slug) return false;
  
  const slugPattern = /^[a-zA-Z0-9-]{3,100}$/;
  return slugPattern.test(slug);
}

/**
 * Format LinkedIn profile URL from slug
 */
export function formatLinkedInUrl(slug: string): string {
  return `https://www.linkedin.com/in/${slug}`;
}
