import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import SubmitCard from './SubmitCard';
import { useSubmitCard, SUBMIT_CARD_PRESETS } from '../hooks/useSubmitCard';

/**
 * Example component demonstrating how to use the SubmitCard component
 * This shows all the different types and usage patterns
 */
const SubmitCardExample: React.FC = () => {
  const {
    isVisible: submitCardVisible,
    config: submitCardConfig,
    hideSubmitCard,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  } = useSubmitCard();

  const handleShowSuccess = () => {
    showSuccess(
      "Success!",
      "Your action was completed successfully.",
      {
        emoji: "🎉",
        autoClose: true,
        autoCloseDelay: 3000,
      }
    );
  };

  const handleShowError = () => {
    showError(
      "Error Occurred",
      "Something went wrong. Please try again.",
      {
        emoji: "❌",
        actionText: "Retry",
        onAction: () => {
          console.log("Retry action triggered");
          hideSubmitCard();
        },
      }
    );
  };

  const handleShowWarning = () => {
    showWarning(
      "Warning",
      "This action cannot be undone. Are you sure?",
      {
        emoji: "⚠️",
        actionText: "Continue",
        onAction: () => {
          console.log("Continue action triggered");
          hideSubmitCard();
        },
      }
    );
  };

  const handleShowInfo = () => {
    showInfo(
      "Information",
      "Here's some important information you should know.",
      {
        emoji: "ℹ️",
        autoClose: false,
      }
    );
  };

  const handleShowPresetMoodLogged = () => {
    showSuccess(
      SUBMIT_CARD_PRESETS.MOOD_LOGGED.title,
      SUBMIT_CARD_PRESETS.MOOD_LOGGED.message,
      {
        emoji: "😊", // Custom emoji for this instance
        autoClose: SUBMIT_CARD_PRESETS.MOOD_LOGGED.autoClose,
        autoCloseDelay: SUBMIT_CARD_PRESETS.MOOD_LOGGED.autoCloseDelay,
      }
    );
  };

  const handleShowPresetPledgeTaken = () => {
    showSuccess(
      SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.title,
      SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.message,
      {
        emoji: SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.emoji,
        autoClose: SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.autoClose,
        autoCloseDelay: SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.autoCloseDelay,
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SubmitCard Examples</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.successButton]} onPress={handleShowSuccess}>
          <Text style={styles.buttonText}>Show Success</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.errorButton]} onPress={handleShowError}>
          <Text style={styles.buttonText}>Show Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.warningButton]} onPress={handleShowWarning}>
          <Text style={styles.buttonText}>Show Warning</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={handleShowInfo}>
          <Text style={styles.buttonText}>Show Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.presetButton]} onPress={handleShowPresetMoodLogged}>
          <Text style={styles.buttonText}>Mood Logged Preset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.presetButton]} onPress={handleShowPresetPledgeTaken}>
          <Text style={styles.buttonText}>Pledge Taken Preset</Text>
        </TouchableOpacity>
      </View>

      {/* SubmitCard Component */}
      {submitCardConfig && (
        <SubmitCard
          visible={submitCardVisible}
          type={submitCardConfig.type}
          title={submitCardConfig.title}
          message={submitCardConfig.message}
          onClose={hideSubmitCard}
          onAction={submitCardConfig.onAction}
          actionText={submitCardConfig.actionText}
          autoClose={submitCardConfig.autoClose}
          autoCloseDelay={submitCardConfig.autoCloseDelay}
          emoji={submitCardConfig.emoji}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successButton: {
    backgroundColor: Colors.status.success,
  },
  errorButton: {
    backgroundColor: Colors.status.error,
  },
  warningButton: {
    backgroundColor: Colors.status.warning,
  },
  infoButton: {
    backgroundColor: Colors.status.info,
  },
  presetButton: {
    backgroundColor: Colors.brand.primary,
  },
  buttonText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SubmitCardExample;
