/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export default {
  // Base theme colors
  background: {
    primary: '#18181b',    // Main app background (zinc-900)
    secondary: '#27272a',  // Secondary surfaces (zinc-800)
    elevated: '#3f3f46',   // Elevated surfaces (zinc-700)
  },
  
  // Semantic colors
  text: {
    primary: '#ffffff',
    secondary: '#d4d4d8',  // Changed from zinc-400 to zinc-300 for better visibility
    tertiary: '#71717a',   // zinc-500
  },

  // Brand colors
  brand: {
    primary: '#22c55e',    // green-500
    secondary: '#16a34a',  // green-600
  },

  // Card backgrounds with opacity
  cards: {
    dark: '#27272a',       // zinc-800
    darker: '#18181b',     // zinc-900
  },

  // Status colors
  status: {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  }
} as const;
