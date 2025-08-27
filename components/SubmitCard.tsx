import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export type SubmitCardType = 'success' | 'error' | 'warning' | 'info';

interface SubmitCardProps {
  visible: boolean;
  type: SubmitCardType;
  title: string;
  message: string;
  onClose: () => void;
  onAction?: () => void;
  actionText?: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
  emoji?: string;
}

const SubmitCard: React.FC<SubmitCardProps> = ({
  visible,
  type,
  title,
  message,
  onClose,
  onAction,
  actionText,
  autoClose = false,
  autoCloseDelay = 3000,
  emoji,
}) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Get theme colors based on type
  const getThemeColors = () => {
    switch (type) {
      case 'success':
        return {
          primary: Colors.status.success,
          secondary: Colors.status.success + '20',
          gradient: [Colors.status.success, Colors.brand.secondary] as const,
          emoji: emoji || '✅',
        };
      case 'error':
        return {
          primary: Colors.status.error,
          secondary: Colors.status.error + '20',
          gradient: [Colors.status.error, '#dc2626'] as const,
          emoji: emoji || '❌',
        };
      case 'warning':
        return {
          primary: Colors.status.warning,
          secondary: Colors.status.warning + '20',
          gradient: [Colors.status.warning, '#d97706'] as const,
          emoji: emoji || '⚠️',
        };
      case 'info':
        return {
          primary: Colors.status.info,
          secondary: Colors.status.info + '20',
          gradient: [Colors.status.info, '#2563eb'] as const,
          emoji: emoji || 'ℹ️',
        };
      default:
        return {
          primary: Colors.brand.primary,
          secondary: Colors.brand.primary + '20',
          gradient: [Colors.brand.primary, Colors.brand.secondary] as const,
          emoji: emoji || '🎉',
        };
    }
  };

  const themeColors = getThemeColors();

  // Auto close functionality
  useEffect(() => {
    if (visible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [visible, autoClose, autoCloseDelay, onClose]);

  // Animation effects
  useEffect(() => {
    if (visible) {
      // Entrance animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Pulse animation for emoji
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.2,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      // Exit animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim, scaleAnim, pulseAnim]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <BlurView intensity={20} style={StyleSheet.absoluteFill}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}
          />
        </BlurView>

        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <View style={[styles.card, { borderColor: themeColors.primary + '30' }]}>
            {/* Header with emoji */}
            <View style={[styles.header, { backgroundColor: themeColors.secondary }]}>
              <Animated.View
                style={[
                  styles.emojiContainer,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                <Text style={styles.emoji}>{themeColors.emoji}</Text>
              </Animated.View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={[styles.title, { color: Colors.text.primary }]}>
                {title}
              </Text>
              <Text style={[styles.message, { color: Colors.text.secondary }]}>
                {message}
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              {onAction && actionText && (
                <TouchableOpacity
                  onPress={onAction}
                  style={[styles.actionButton, styles.primaryButton]}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={themeColors.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                  >
                    <Text style={[styles.buttonText, styles.primaryButtonText]}>
                      {actionText}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                onPress={onClose}
                style={[
                  styles.actionButton,
                  styles.secondaryButton,
                  { backgroundColor: Colors.background.secondary },
                ]}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  {onAction && actionText ? 'Cancel' : 'OK'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backdrop: {
    flex: 1,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 340,
  },
  card: {
    borderRadius: 24,
    backgroundColor: Colors.background.elevated,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: {
    fontSize: 36,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  primaryButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  primaryButtonText: {
    color: Colors.text.primary,
  },
  secondaryButtonText: {
    color: Colors.text.secondary,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export default SubmitCard;
