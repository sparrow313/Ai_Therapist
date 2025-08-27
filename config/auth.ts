// Authentication Configuration
// Copy this file to set up your credentials

export const authConfig = {
  // Supabase Configuration
  // Get these from your Supabase project dashboard at https://supabase.com/dashboard
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY',
  },
  
  // Google OAuth Configuration  
  // Get these from Google Cloud Console: https://console.cloud.google.com/
  google: {
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || 'YOUR_GOOGLE_WEB_CLIENT_ID',
    // iOS client ID removed for now - add back when needed for iOS builds
    // iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || 'YOUR_GOOGLE_IOS_CLIENT_ID',
  },
}

// Instructions for setup:
// 1. Create a .env file in the root directory with the following variables:
//    EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
//    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
//    EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
//    (iOS client ID removed for now - add when needed for iOS builds)
//
// 2. Alternatively, replace the placeholder values above with your actual credentials
//
// 3. For Google OAuth setup:
//    - Go to https://console.cloud.google.com/
//    - Create a new project or select existing
//    - Enable Google+ API
//    - Create OAuth 2.0 credentials
//    - Add your bundle ID for iOS and package name for Android
//
// 4. For Supabase setup:
//    - Go to https://supabase.com/dashboard
//    - Create a new project
//    - Go to Settings > API to get your URL and anon key
//    - Go to Authentication > Providers
//    - Enable Google provider and add your OAuth credentials 