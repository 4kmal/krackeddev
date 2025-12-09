# Supabase Setup Guide

## Environment Variables

To use Supabase in your application, you need to set up the following environment variables:

1. Create a `.env.local` file in the root of your project
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Getting Your Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project (or create a new one)
3. Go to **Settings** > **API**
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Setting Up OAuth Providers

### GitHub OAuth

1. Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Create a new OAuth App with:
   - **Homepage URL**: `https://krackeddevs.com` (or your domain)
   - **Authorization callback URL**: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`
3. Copy the Client ID and Client Secret
4. In Supabase Dashboard, go to **Authentication** → **Providers** → **GitHub**
5. Enable GitHub and paste your credentials

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials with:
   - **Authorized redirect URIs**: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`
3. In Supabase Dashboard, go to **Authentication** → **Providers** → **Google**
4. Enable Google and paste your credentials

### URL Configuration

In Supabase Dashboard → **Authentication** → **URL Configuration**:

- **Site URL**: `https://krackeddevs.com`
- **Redirect URLs** (add all):
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3001/auth/callback`
  - `https://krackeddevs.com/auth/callback`
  - `https://www.krackeddevs.com/auth/callback`

## Using Supabase Context

The Supabase context is available throughout your application:

```tsx
"use client";

import { useSupabase } from "@/app/context/SupabaseContext";

export default function YourComponent() {
  const {
    user,
    session,
    loading,
    isAuthenticated,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    signInWithOAuth,
    signOut,
  } = useSupabase();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.user_metadata?.user_name || user?.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signInWithOAuth("github")}>
            Login with GitHub
          </button>
          <button onClick={() => signInWithOAuth("google")}>
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}
```

## Available Context Values

- `supabase` - The Supabase client instance
- `user` - The currently authenticated user (or null)
- `session` - The current session (or null)
- `loading` - Boolean indicating if auth state is being loaded
- `isAuthenticated` - Boolean indicating if user is logged in
- `isLoginModalOpen` - Boolean for login modal state
- `openLoginModal()` - Function to open the login modal
- `closeLoginModal()` - Function to close the login modal
- `signInWithOAuth(provider)` - Function to sign in with OAuth ('github' | 'google')
- `signOut()` - Function to sign out the current user

## User Metadata

After OAuth login, user information is available via:

```tsx
const { user } = useSupabase();

// GitHub user metadata
user?.user_metadata?.user_name; // GitHub username
user?.user_metadata?.avatar_url; // Profile picture URL
user?.user_metadata?.full_name; // Full name

// Google user metadata
user?.user_metadata?.name; // Display name
user?.user_metadata?.avatar_url; // Profile picture URL
user?.user_metadata?.email; // Email address
```
