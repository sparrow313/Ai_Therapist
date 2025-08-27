# DEW - Digital Emotional Wellness App

A comprehensive React Native mobile application designed to support mental health and emotional wellness. Built with Expo, TypeScript, and Supabase, this app provides mood tracking, daily pledges, progress visualization, and community support to help users maintain their emotional well-being.

## 🌟 Features

### 📱 Dashboard (Home)
- **Mood Tracking**: Daily mood logging with 6 emotional states and notes
- **Progress Visualization**: Interactive charts showing mood trends over time
- **Daily Pledges**: Commitment mechanism to maintain accountability and streaks
- **Personalized Motivation**: Dynamic messages adapted to user preferences
- **Quick Actions**: Easy access to mood logging, progress tracking, and wellness features
- **Support Network**: Visual representation of your support people with easy contact

### 🎭 Mood Tracking System
Comprehensive emotional wellness monitoring:
- **6 Mood States**: Happy (😊), Calm (😌), Meh (😕), Sad (😢), Angry (😠), Anxious (😰)
- **Numerical Scale**: 20-90 point scale for precise mood measurement
- **Daily Notes**: Optional text entries for context and reflection
- **Duplicate Prevention**: One mood entry per day with visual confirmation
- **Progress Charts**: Daily, monthly, and yearly mood trend visualization

### 🎯 Motivation Styles
Choose from three distinct motivation approaches:
- **Supportive Guide (🌟)**: Gentle encouragement and positive affirmations
- **Achievement Coach (🎯)**: Goal-focused messaging with progress tracking
- **Tough Love (💪)**: Direct, challenging motivation with strong accountability

### 👥 Community Features
- **Community Posts**: Share experiences and milestones with others
- **Social Interaction**: Like, support, and comment on posts
- **Inspiration Feed**: Real stories from community members
- **Stats Display**: Community metrics and engagement

### 🤝 Accountability & Support
- **Daily Pledge System**: Daily check-ins to maintain commitment streaks
- **Progress Tracking**: Visual streak counters and achievement milestones
- **Support Network**: Easy access to your support people
- **Motivational Messaging**: Contextual encouragement based on progress

### 📊 Advanced Analytics
- **Mood Trends**: Daily, monthly, and yearly mood pattern analysis
- **Statistical Insights**: Average mood, peak performance, total logs
- **Visual Charts**: Interactive bar charts with color-coded mood data
- **Progress Metrics**: Streak tracking and milestone celebrations

## 🛠 Tech Stack

- **Framework**: React Native with Expo (~53.0.0)
- **Language**: TypeScript (~5.8.3)
- **Backend**: Supabase (PostgreSQL database with real-time features)
- **Authentication**: Expo SecureStore with Google Sign-In integration
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (~5.1.4) with tab-based navigation
- **Charts**: React Native Gifted Charts for mood visualization
- **Animations**: React Native Reanimated (~3.17.4) for smooth UI transitions
- **UI Components**: Custom component library with modern design system
- **Fonts**: Custom HankenGrotesk font family
- **State Management**: React hooks with custom hook patterns

### Key Dependencies
```json
{
  "expo": "~53.0.0",
  "react": "19.0.0",
  "react-native": "0.79.5",
  "expo-router": "~5.1.4",
  "nativewind": "^4.1.23",
  "@supabase/supabase-js": "^2.52.0",
  "react-native-gifted-charts": "^1.4.63",
  "expo-linear-gradient": "~14.1.5",
  "react-native-reanimated": "~3.17.4",
  "expo-blur": "~14.1.5",
  "expo-secure-store": "~14.2.4"
}
```

## 📁 Project Structure

```
dew_fe/
├── app/                        # App screens and navigation
│   ├── (tabs)/                # Tab-based navigation screens
│   │   ├── index.tsx          # Dashboard/Home screen
│   │   ├── community.tsx      # Community features
│   │   ├── support.tsx        # Accountability system
│   │   └── _layout.tsx        # Tab navigation layout
│   ├── post/[id].tsx          # Individual post view
│   ├── login.tsx              # Authentication screen
│   ├── signup.tsx             # User registration
│   ├── info.tsx               # Information screen
│   └── _layout.tsx            # Root app layout
├── components/                 # Reusable UI components
│   ├── CalenderWidget.tsx     # Calendar component
│   ├── CommunityInspiration.tsx # Community post preview
│   ├── CommunityPost.tsx      # Full community post
│   ├── DailyMessage.tsx       # Motivation message display
│   ├── HomeHeader.tsx         # Dashboard header with streak tracking
│   ├── MoodLogModal.tsx       # Mood logging interface
│   ├── MotivationStyleSelector.tsx # Style picker
│   ├── PledgeContainer.tsx    # Daily pledge interface
│   ├── ProgressModal.tsx      # Mood progress visualization
│   ├── QuickActions.tsx       # Action buttons grid
│   ├── SavingsCard.tsx        # Financial tracking display
│   ├── StreakCard.tsx         # Streak counter
│   ├── SubmitCard.tsx         # Custom alert/notification component
│   ├── SubmitCardExample.tsx  # Usage examples
│   ├── SupportNetwork.tsx     # Support people display
│   ├── ThemedText.tsx         # Themed text component
│   ├── ThemedView.tsx         # Themed view component
│   └── ui/                    # Base UI components
├── constants/                  # App constants and configuration
│   ├── Colors.ts              # Theme colors and design system
│   └── MotivationMessages.ts  # Motivation content
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts             # Authentication hook
│   ├── useSubmitCard.ts       # Custom notification hook
│   ├── useColorScheme.ts      # Theme management
│   └── useThemeColor.ts       # Color utilities
├── lib/                       # External service integrations
│   ├── supabase.ts            # Supabase client configuration
│   └── database.ts            # Database utilities
├── utils/                     # Utility functions
│   └── supabaseAuth.tsx       # Authentication utilities
├── assets/                    # Images, fonts, and static assets
│   ├── fonts/                 # HankenGrotesk font files
│   └── images/                # App icons and images
├── config/                    # Configuration files
│   └── auth.ts                # Authentication configuration
└── scripts/                   # Build and utility scripts
    └── reset-project.js       # Project reset utility
```

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18.0.0)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai_therapist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Available Scripts

```bash
npm start         # Start Expo development server
npm run android   # Run on Android device/emulator
npm run ios       # Run on iOS device/simulator
npm run web       # Run on web browser
npm run lint      # Run ESLint
npm run reset-project  # Reset project to clean state
```

## 🧩 Component Library

### Core Components

#### 🎭 MoodLogModal
Interactive mood logging interface with 6 emotional states:
- **Features**: Daily mood selection, optional notes, duplicate prevention
- **Mood Scale**: 20-90 numerical values with emoji representations
- **States**: Happy (90), Calm (80), Meh (50), Sad (30), Angry (20), Anxious (25)
- **Integration**: Supabase backend with user authentication

#### 📊 ProgressModal
Comprehensive mood analytics and visualization:
- **Charts**: Interactive bar charts using React Native Gifted Charts
- **Time Periods**: Daily (7 days), Monthly (12 months), Yearly (6 years)
- **Statistics**: Total logs, average mood, peak performance
- **Animations**: Smooth entrance/exit with chart animations

#### 🤝 PledgeContainer
Daily commitment tracking system:
- **Features**: One pledge per day, streak tracking, visual feedback
- **States**: Pending, completed, with appropriate styling
- **Integration**: Supabase backend for persistence

#### 🎯 SubmitCard
Modern replacement for native Alert dialogs:
- **Types**: Success, Error, Warning, Info with color-coded themes
- **Features**: Auto-close, custom actions, smooth animations
- **Design**: Blur background, gradient buttons, emoji support
- **Usage**: Hook-based API with predefined presets

```tsx
// SubmitCard Usage Example
import { useSubmitCard, SUBMIT_CARD_PRESETS } from '@/hooks/useSubmitCard';

const { showSuccess, showError } = useSubmitCard();

// Success notification
showSuccess("Mood Logged!", "Your emotional state has been recorded.");

// Error with retry action
showError("Save Failed", "Please try again.", {
  actionText: "Retry",
  onAction: () => retryFunction()
});
```

#### 🏠 HomeHeader
Dashboard header with user information and controls:
- **Features**: Streak display, motivation style toggle, user greeting
- **Integration**: Real-time streak updates from pledge system

#### ⚡ QuickActions
Grid of primary app actions:
- **Actions**: Mood logging, progress viewing, meditation, challenges
- **Design**: Icon-based with consistent styling

### UI Foundation

#### 🎨 Design System
The app uses a cohesive dark theme design system:

**Color Palette:**
```typescript
Colors = {
  background: {
    primary: '#18181b',    // Main app background (zinc-900)
    secondary: '#27272a',  // Secondary surfaces (zinc-800)
    elevated: '#3f3f46',   // Elevated surfaces (zinc-700)
  },
  text: {
    primary: '#ffffff',    // Primary text
    secondary: '#d4d4d8',  // Secondary text (zinc-300)
    tertiary: '#71717a',   // Tertiary text (zinc-500)
  },
  brand: {
    primary: '#22c55e',    // Brand green (green-500)
    secondary: '#16a34a',  // Darker green (green-600)
  },
  status: {
    success: '#22c55e',    // Success green
    error: '#ef4444',      // Error red
    warning: '#f59e0b',    // Warning amber
    info: '#3b82f6',       // Info blue
  }
}
```

**Typography:**
- **Primary Font**: HankenGrotesk (Regular & Bold)
- **Fallback**: System fonts for each platform
- **Scale**: Tailwind CSS typography scale (text-sm to text-4xl)

**Component Patterns:**
- Rounded corners (`rounded-xl`, `rounded-2xl`)
- Subtle shadows (`shadow-lg shadow-black/50`)
- Consistent spacing using Tailwind classes
- Accessible color contrast ratios
- Smooth animations with React Native Reanimated

## �️ Database & Backend

### Supabase Integration
The app uses Supabase as its backend-as-a-service platform:

**Key Tables:**
- `mood_logs`: Daily mood entries with user_id, mood_value, emoji, notes
- `pledges`: Daily pledge tracking with user_id, pledge_date, completion status
- `users`: User profiles and authentication data

**Authentication:**
- Expo SecureStore for local token management
- Google Sign-In integration for OAuth
- Row Level Security (RLS) for data protection

**Real-time Features:**
- Live updates for mood data
- Real-time streak calculations
- Community features with live interactions

### Environment Variables
```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

## �🔧 Configuration

### App Configuration (`app.json`)
- **Name**: ai_therapist
- **Scheme**: aitherapist
- **Orientation**: Portrait only
- **Target Platforms**: iOS, Android, Web
- **New Architecture**: Enabled for React Native
- **Package**: com.javedakeeb.ai_therapist

### Development Setup
The app is configured for:
- **Development**: Hot reloading with Expo Dev Client
- **Production**: EAS Build for app store deployment
- **Web**: Static export capability with Metro bundler
- **Cross-platform**: iOS, Android, and web support

## 📱 Core Features Deep Dive

### Motivation System
The app's core strength lies in its adaptive motivation system:

```typescript
// Three distinct motivation styles
type MotivationStyle = 'positive' | 'goal-oriented' | 'tough-love';

// Dynamic message categories
type MessageCategory = 'daily' | 'milestone' | 'craving' | 'relapse' | 'progress';
```

Each style provides different approaches to the same recovery goals:
- **Positive**: Supportive, encouraging language
- **Goal-oriented**: Metrics-focused, achievement-based
- **Tough-love**: Direct, challenging, accountability-focused

### Accountability Features
- **Financial Stakes**: Users can stake money ($10-$50) for commitment periods (7-30 days)
- **Partner System**: Matched accountability partners receive stakes if pledges are missed
- **Daily Check-ins**: Required daily pledges to maintain streaks
- **Social Pressure**: Community visibility of progress

### Community Integration
- **Anonymous Sharing**: Safe space for recovery stories
- **Peer Support**: Like, comment, and support features
- **Milestone Celebration**: Community recognition of achievements
- **Inspiration Feed**: Regular motivational content from real users

## 🚀 Future Enhancements

### Planned Features
- [ ] Push notifications for daily pledges
- [ ] Integration with health apps for wellness tracking
- [ ] Expanded meditation and mindfulness features
- [ ] Professional counselor matching
- [ ] AI-powered craving prediction
- [ ] Offline mode support
- [ ] Data export and analytics

### Technical Improvements
- [ ] Backend API integration
- [ ] User authentication system
- [ ] Data persistence and sync
- [ ] Performance optimizations
- [ ] Automated testing suite
- [ ] CI/CD pipeline setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS classes for styling (NativeWind)
- Maintain component reusability
- Write descriptive commit messages
- Test on multiple platforms before submitting

## 📄 License

This project is private and confidential. All rights reserved.

## 🆘 Support

For support, questions, or feature requests:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for the recovery community**

*Remember: Recovery is a journey, not a destination. Every day matters.*
