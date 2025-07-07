# AI Therapist - Addiction Recovery Support App

A React Native mobile application designed to support individuals in their addiction recovery journey. Built with Expo and TypeScript, this app provides personalized motivation, community support, and accountability features to help users maintain their sobriety.

## 🌟 Features

### 📱 Dashboard (Home)
- **Streak Tracking**: Visual display of clean days with motivational messaging
- **Savings Calculator**: Shows money saved by staying clean ($120.00 tracked)
- **Daily Pledges**: Commitment mechanism to maintain accountability
- **Personalized Motivation**: AI-driven messages adapted to user preferences
- **Quick Actions**: Easy access to mood logging, challenges, progress tracking, and meditation
- **Support Network**: Visual representation of your support people with easy contact

### 🎯 Motivation Styles
Choose from three distinct motivation approaches:
- **Supportive Guide (🌟)**: Gentle encouragement and positive affirmations
- **Achievement Coach (🎯)**: Goal-focused messaging with progress tracking
- **High Accountability (💪)**: Intense, challenge-based motivation with strong accountability

### 👥 Community Features
- **Community Posts**: Share experiences and milestones with others
- **Social Interaction**: Like, support, and comment on posts
- **Inspiration Feed**: Real recovery stories from community members
- **Stats Display**: Community metrics (2.4k members, 856 posts, 142 online)

### 🤝 Accountability & Support
- **Financial Stakes**: Put money on the line ($10-$50) for stronger commitment
- **Accountability Partners**: Match with partners who share your recovery goals
- **Daily Pledge System**: Daily check-ins to maintain your streak
- **Partner Notifications**: Support system alerts when you need help

### 📊 Progress Tracking
- **Streak Counters**: Days clean, best streaks, current progress
- **Financial Metrics**: Money saved, potential losses from stakes
- **Achievement Milestones**: Celebrate progress markers
- **Calendar Integration**: Visual representation of your journey

## 🛠 Tech Stack

- **Framework**: React Native with Expo (~53.0.9)
- **Language**: TypeScript (~5.8.3)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (~5.0.6) with tab-based navigation
- **UI Components**: Custom component library with Expo Vector Icons
- **Fonts**: Custom HankenGrotesk font family
- **State Management**: React hooks for local state

### Key Dependencies
```json
{
  "expo": "~53.0.9",
  "react": "19.0.0",
  "react-native": "0.79.2",
  "expo-router": "~5.0.6",
  "nativewind": "^4.1.23",
  "@expo/vector-icons": "^14.1.0",
  "expo-linear-gradient": "^14.1.5",
  "react-native-reanimated": "^3.16.2"
}
```

## 📁 Project Structure

```
ai_therapist/
├── app/                        # App screens and navigation
│   ├── (tabs)/                # Tab-based navigation screens
│   │   ├── index.tsx          # Dashboard/Home screen
│   │   ├── community.tsx      # Community features
│   │   ├── support.tsx        # Accountability system
│   │   └── _layout.tsx        # Tab navigation layout
│   ├── post/[id].tsx          # Individual post view
│   ├── info.tsx               # Information screen
│   └── _layout.tsx            # Root app layout
├── components/                 # Reusable UI components
│   ├── CalenderWidget.tsx     # Calendar component
│   ├── CommunityInspiration.tsx # Community post preview
│   ├── CommunityPost.tsx      # Full community post
│   ├── DailyMessage.tsx       # Motivation message display
│   ├── HomeHeader.tsx         # Dashboard header
│   ├── MotivationStyleSelector.tsx # Style picker
│   ├── PledgeContainer.tsx    # Daily pledge interface
│   ├── QuickActions.tsx       # Action buttons grid
│   ├── SavingsCard.tsx        # Money saved display
│   ├── StreakCard.tsx         # Streak counter
│   ├── SupportNetwork.tsx     # Support people display
│   └── ui/                    # Base UI components
├── constants/                  # App constants and configuration
│   ├── Colors.ts              # Theme colors
│   └── MotivationMessages.ts  # Motivation content
├── hooks/                     # Custom React hooks
├── assets/                    # Images, fonts, and static assets
└── scripts/                   # Build and utility scripts
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

## 🎨 Design System

### Color Scheme
The app uses a dark theme with carefully selected colors for optimal user experience:
- **Primary Background**: `#18181b` (zinc-900)
- **Elevated Surfaces**: Zinc-800 with subtle borders
- **Brand Primary**: `#22c55e` (green-500)
- **Text Primary**: White with secondary gray variants
- **Accent Colors**: Purple, blue, amber for different features

### Typography
- **Primary Font**: HankenGrotesk (Regular & Bold)
- **Fallback**: System fonts for each platform
- **Size Scale**: Tailwind CSS typography scale (text-sm to text-4xl)

### Components
All components follow a consistent design pattern:
- Rounded corners (`rounded-xl`, `rounded-2xl`)
- Subtle shadows (`shadow-lg shadow-black/50`)
- Proper spacing using Tailwind classes
- Accessible color contrast ratios

## 🔧 Configuration

### App Configuration (`app.json`)
- **Name**: ai_therapist
- **Scheme**: aitherapist
- **Orientation**: Portrait only
- **Target Platforms**: iOS, Android, Web
- **New Architecture**: Enabled for React Native

### Environment Setup
The app is configured for:
- **Development**: Hot reloading with Expo
- **Production**: Static web export capability
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
