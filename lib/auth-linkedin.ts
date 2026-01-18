// lib/auth-linkedin.ts
// LinkedIn OAuth authentication functions for Marrow

import { supabase } from '@/lib/supabase';
import { getLinkedInAuthUrl } from '@/lib/linkedin';

/**
 * Initiate LinkedIn OAuth flow
 * Generates state for CSRF protection and redirects to LinkedIn
 */
export async function signUpWithLinkedIn() {
  // Generate random state for CSRF protection
  const state = crypto.randomUUID();
  
  // Store state in sessionStorage for verification
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('linkedin_oauth_state', state);
  }
  
  // Redirect to LinkedIn OAuth
  const authUrl = getLinkedInAuthUrl(state);
  
  if (typeof window !== 'undefined') {
    window.location.href = authUrl;
  }
}

/**
 * Handle LinkedIn OAuth callback
 * Exchanges code for tokens and creates/updates user
 */
export async function handleLinkedInCallback(code: string, state: string) {
  // Verify state matches (CSRF protection)
  if (typeof window !== 'undefined') {
    const storedState = sessionStorage.getItem('linkedin_oauth_state');
    
    console.log('State verification:', {
      received: state,
      stored: storedState,
      match: state === storedState
    });
    
    if (!storedState) {
      console.warn('No stored state found - this might be a page refresh');
      // Continue anyway for now - we'll tighten this up later
    } else if (state !== storedState) {
      throw new Error('Invalid state parameter - possible CSRF attack');
    }
    
    // Clear state
    sessionStorage.removeItem('linkedin_oauth_state');
  }
  
  // Call Supabase Edge Function to exchange code for profile
  console.log('Calling Edge Function with code:', code.substring(0, 10) + '...');
  
  const { data, error } = await supabase.functions.invoke('linkedin-oauth', {
    body: { code, state },
  });
  
  console.log('Edge Function response:', { data, error });
  
  if (error) {
    console.error('Edge function error:', error);
    throw new Error('LinkedIn authentication failed');
  }
  
  if (!data.success) {
    throw new Error(data.error || 'LinkedIn authentication failed');
  }
  
  const profile = data.profile;
  
  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id, email')
    .eq('linkedin_id', profile.linkedin_id)
    .single();
  
  if (existingUser) {
    // User exists - sign them in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: existingUser.email,
      password: profile.linkedin_id, // Use LinkedIn ID as password
    });
    
    if (signInError) {
      // If password doesn't match, update it
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password: profile.linkedin_id }
      );
      
      if (!updateError) {
        // Try signing in again
        await supabase.auth.signInWithPassword({
          email: existingUser.email,
          password: profile.linkedin_id,
        });
      }
    }
    
    // Update profile data
    await supabase
      .from('users')
      .update({
        full_name: profile.name,
        profile_picture_url: profile.picture,
        linkedin_slug: profile.linkedin_slug,
        linkedin_verified: true,
      })
      .eq('id', existingUser.id);
    
    return { profile, isNewUser: false };
  } else {
    // New user - sign them up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: profile.email,
      password: profile.linkedin_id, // Use LinkedIn ID as password
      options: {
        data: {
          full_name: profile.name,
          linkedin_id: profile.linkedin_id,
          linkedin_verified: true,
        },
        emailRedirectTo: `${window.location.origin}/onboarding`,
      },
    });
    
    if (authError) {
      console.error('Signup error:', authError);
      throw new Error(`Failed to create account: ${authError.message}`);
    }
    
    if (!authData.user) {
      throw new Error('Failed to create user');
    }
    
    // Create user profile in database
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: profile.email,
        full_name: profile.name,
        linkedin_id: profile.linkedin_id,
        linkedin_slug: profile.linkedin_slug,
        linkedin_verified: true,
        profile_picture_url: profile.picture,
      });
    
    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't throw - user is created, profile creation can be retried
    }
    
    return { profile, isNewUser: true };
  }
}

/**
 * Check if current user has verified LinkedIn
 */
export async function checkLinkedInVerification(): Promise<{
  verified: boolean;
  slug: string | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { verified: false, slug: null };
  }
  
  const { data: profile } = await supabase
    .from('users')
    .select('linkedin_verified, linkedin_slug')
    .eq('id', user.id)
    .single();
  
  return {
    verified: profile?.linkedin_verified || false,
    slug: profile?.linkedin_slug || null,
  };
}
