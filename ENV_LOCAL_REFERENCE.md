# Environment Variables

## Required for Supabase

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Optional

```
NEXT_PUBLIC_SITE_URL=https://krackeddevs.com
```

## Setup Notes

### Supabase OAuth Configuration

OAuth providers (GitHub, Google) are configured in the Supabase Dashboard, not in environment variables:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **GitHub** and/or **Google** providers
4. Add your OAuth credentials from the respective provider dashboards
5. Set the callback URL in each OAuth provider to: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`

### Site URL Configuration

In your Supabase dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your production URL (e.g., `https://krackeddevs.com`)
3. Add redirect URLs for both local development and production:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3001/auth/callback`
   - `https://krackeddevs.com/auth/callback`
   - `https://www.krackeddevs.com/auth/callback`
