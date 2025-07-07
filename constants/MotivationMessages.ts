import { MotivationStyle } from '../components/MotivationStyleSelector';

type MessageCategory = 'daily' | 'milestone' | 'craving' | 'relapse' | 'progress';

interface MotivationMessage {
  title: string;
  message: string;
  action?: string;
}

const messages: Record<MotivationStyle, Record<MessageCategory, MotivationMessage[]>> = {
  'positive': {
    daily: [
      {
        title: "Every day counts",
        message: "You're doing great! Each day clean is a victory worth celebrating.",
        action: "Reflect on today's wins"
      },
      {
        title: "Building new habits",
        message: "Your commitment to a healthier life is inspiring. Keep nurturing these positive changes.",
        action: "Log your mood"
      }
    ],
    milestone: [
      {
        title: "Amazing progress!",
        message: "You've reached a wonderful milestone in your journey. Be proud of how far you've come!",
        action: "Share your achievement"
      }
    ],
    craving: [
      {
        title: "This too shall pass",
        message: "Cravings are temporary, but your strength is permanent. Take deep breaths and stay present.",
        action: "Try breathing exercise"
      }
    ],
    relapse: [
      {
        title: "Tomorrow is a new day",
        message: "Recovery is a journey with ups and downs. You're learning and growing stronger.",
        action: "Start fresh"
      }
    ],
    progress: [
      {
        title: "You're transforming",
        message: "Every step forward is reshaping your future. Your dedication is inspiring.",
        action: "View your journey"
      }
    ]
  },
  'goal-oriented': {
    daily: [
      {
        title: "Target: 24 Hours",
        message: "Focus on your next milestone: complete today with your goals intact.",
        action: "Check daily goals"
      },
      {
        title: "Progress tracking",
        message: "You're 83% through today. Keep your streak going strong.",
        action: "Update log"
      }
    ],
    milestone: [
      {
        title: "Milestone unlocked!",
        message: "You've saved $120 and gained 120 hours of clear-headed time. Next target: 2 weeks clean.",
        action: "Set next goal"
      }
    ],
    craving: [
      {
        title: "Challenge identified",
        message: "Craving detected. Objective: Maintain streak. Time required: 10 minutes.",
        action: "Start timer"
      }
    ],
    relapse: [
      {
        title: "Reset and rebuild",
        message: "Analyze triggers, update strategy, set new baseline. Ready to restart.",
        action: "Update action plan"
      }
    ],
    progress: [
      {
        title: "Stats update",
        message: "Money saved: $120. Time gained: 240 hours. Health improved: 15%.",
        action: "View full stats"
      }
    ]
  },
  'tough-love': {
    daily: [
      {
        title: "Time to deliver",
        message: "He’s never going to amount to anything. All he does is dream — he’s lazy and completely worthless. Are you going to prove them wrong?",
        action: "Accept challenge"
      },
      {
        title: "Actions > Words",
        message: "Talk is cheap. Show your commitment through your actions today.",
        action: "Log your wins"
      }
    ],
    milestone: [
      {
        title: "Keep pushing",
        message: "Good progress, but don't get comfortable. Your next challenge awaits.",
        action: "Set higher goal"
      }
    ],
    craving: [
      {
        title: "Decision time",
        message: "This is where you prove who you really are. 10 minutes. No backing down.",
        action: "Face the challenge"
      }
    ],
    relapse: [
      {
        title: "Own it. Fix it.",
        message: "You slipped up. Now what? Get back up and prove you're stronger than this.",
        action: "Restart now"
      }
    ],
    progress: [
      {
        title: "Reality check",
        message: "You've come far, but you've got further to go. Keep pushing your limits.",
        action: "Set new record"
      }
    ]
  } 
};

export const getMotivationMessage = (
  style: MotivationStyle,
  category: MessageCategory
): MotivationMessage => {
  const categoryMessages = messages[style][category];
  return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
};

export default messages; 