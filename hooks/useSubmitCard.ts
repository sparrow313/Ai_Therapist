import { useState, useCallback } from 'react';
import { SubmitCardType } from '@/components/SubmitCard';

interface SubmitCardConfig {
  type: SubmitCardType;
  title: string;
  message: string;
  onAction?: () => void;
  actionText?: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
  emoji?: string;
}

interface UseSubmitCardReturn {
  isVisible: boolean;
  config: SubmitCardConfig | null;
  showSubmitCard: (config: SubmitCardConfig) => void;
  hideSubmitCard: () => void;
  showSuccess: (title: string, message: string, options?: Partial<SubmitCardConfig>) => void;
  showError: (title: string, message: string, options?: Partial<SubmitCardConfig>) => void;
  showWarning: (title: string, message: string, options?: Partial<SubmitCardConfig>) => void;
  showInfo: (title: string, message: string, options?: Partial<SubmitCardConfig>) => void;
}

export const useSubmitCard = (): UseSubmitCardReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState<SubmitCardConfig | null>(null);

  const showSubmitCard = useCallback((newConfig: SubmitCardConfig) => {
    setConfig(newConfig);
    setIsVisible(true);
  }, []);

  const hideSubmitCard = useCallback(() => {
    setIsVisible(false);
    // Clear config after animation completes
    setTimeout(() => setConfig(null), 500);
  }, []);

  const showSuccess = useCallback((
    title: string,
    message: string,
    options: Partial<SubmitCardConfig> = {}
  ) => {
    showSubmitCard({
      type: 'success',
      title,
      message,
      autoClose: true,
      autoCloseDelay: 3000,
      ...options,
    });
  }, [showSubmitCard]);

  const showError = useCallback((
    title: string,
    message: string,
    options: Partial<SubmitCardConfig> = {}
  ) => {
    showSubmitCard({
      type: 'error',
      title,
      message,
      autoClose: false,
      ...options,
    });
  }, [showSubmitCard]);

  const showWarning = useCallback((
    title: string,
    message: string,
    options: Partial<SubmitCardConfig> = {}
  ) => {
    showSubmitCard({
      type: 'warning',
      title,
      message,
      autoClose: false,
      ...options,
    });
  }, [showSubmitCard]);

  const showInfo = useCallback((
    title: string,
    message: string,
    options: Partial<SubmitCardConfig> = {}
  ) => {
    showSubmitCard({
      type: 'info',
      title,
      message,
      autoClose: false,
      ...options,
    });
  }, [showSubmitCard]);

  return {
    isVisible,
    config,
    showSubmitCard,
    hideSubmitCard,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

// Predefined common configurations for quick use
export const SUBMIT_CARD_PRESETS = {
  MOOD_LOGGED: {
    type: 'success' as SubmitCardType,
    title: 'Mood Logged!',
    message: '🎉 Your mood has been successfully recorded. Keep tracking your emotional journey!',
    emoji: '😊',
    autoClose: true,
    autoCloseDelay: 3000,
  },
  PLEDGE_TAKEN: {
    type: 'success' as SubmitCardType,
    title: 'Pledge Complete!',
    message: '🎉 Your daily pledge has been recorded! Keep up the great work!',
    emoji: '🤝',
    autoClose: true,
    autoCloseDelay: 3000,
  },
  ALREADY_LOGGED: {
    type: 'warning' as SubmitCardType,
    title: 'Already Logged',
    message: "You've already logged your mood today! Come back tomorrow to log again.",
    emoji: '📅',
    autoClose: false,
  },
  SAVE_ERROR: {
    type: 'error' as SubmitCardType,
    title: 'Save Failed',
    message: 'Failed to save your data. Please check your connection and try again.',
    emoji: '💾',
    autoClose: false,
  },
  LOGIN_REQUIRED: {
    type: 'warning' as SubmitCardType,
    title: 'Login Required',
    message: 'Please log in to continue using this feature.',
    emoji: '🔐',
    autoClose: false,
  },
  DATA_REFRESHED: {
    type: 'info' as SubmitCardType,
    title: 'Data Refreshed',
    message: 'Your data has been updated with the latest information.',
    emoji: '🔄',
    autoClose: true,
    autoCloseDelay: 2000,
  },
} as const;
