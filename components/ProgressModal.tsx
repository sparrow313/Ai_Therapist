import Colors from "@/constants/Colors";
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface ProgressModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProgressModal = ({ visible, onClose }: ProgressModalProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [chartAnim] = useState(new Animated.Value(0));
  
  const datadaily = [
    { value: 50, label: "Mon", frontColor: '#22c55e' },
    { value: 80, label: "Tue", frontColor: '#16a34a' },
    { value: 34, label: "Wed", frontColor: '#15803d' },
    { value: 20, label: "Thu", frontColor: '#166534' },
    { value: 10, label: "Fri", frontColor: '#14532d' },
    { value: 5, label: "Sat", frontColor: '#052e16' },
    { value: 1, label: "Sun", frontColor: '#365314' },
  ];
  
  const dataMonthly = [
    { value: 20, label: "Jan", frontColor: '#22c55e' },
    { value: 40, label: "Feb", frontColor: '#16a34a' },
    { value: 60, label: "Mar", frontColor: '#15803d' },
    { value: 75, label: "Apr", frontColor: '#166534' },
    { value: 55, label: "May", frontColor: '#14532d' },
    { value: 35, label: "Jun", frontColor: '#052e16' },
    { value: 15, label: "Jul", frontColor: '#365314' },
    { value: 5, label: "Aug", frontColor: '#22c55e' },
    { value: 1, label: "Sep", frontColor: '#16a34a' },
    { value: 9, label: "Oct", frontColor: '#15803d' },
    { value: 90, label: "Nov", frontColor: '#166534' },
    { value: 60, label: "Dec", frontColor: '#14532d' },
  ];
  
  const dataYearly = [
    { value: 50, label: "2020", frontColor: '#22c55e' },
    { value: 60, label: "2021", frontColor: '#16a34a' },
    { value: 70, label: "2022", frontColor: '#15803d' },
    { value: 80, label: "2023", frontColor: '#166534' },
    { value: 90, label: "2024", frontColor: '#14532d' },
    { value: 100, label: "2025", frontColor: '#052e16' },
  ];
  
  const [time, setTime] = useState<"daily" | "monthly" | "yearly">("daily");

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
        // Chart animation after modal appears
        Animated.timing(chartAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
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
          toValue: 0.9,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(chartAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleTimeChange = (newTime: "daily" | "monthly" | "yearly") => {
    // Animate chart out and in
    Animated.sequence([
      Animated.timing(chartAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(chartAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
    
    setTime(newTime);
  };

  const getCurrentData = () => {
    switch (time) {
      case "daily":
        return datadaily;
      case "monthly":
        return dataMonthly;
      case "yearly":
        return dataYearly;
      default:
        return datadaily;
    }
  };

  const getStatsText = () => {
    const data = getCurrentData();
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const average = Math.round(total / data.length);
    const highest = Math.max(...data.map(item => item.value));
    
    return { total, average, highest };
  };

  const { total, average, highest } = getStatsText();

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
          }
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
            styles.modalContainer,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.title}>📊 Mood Progress</Text>
                <Text style={styles.subtitle}>Track your emotional journey</Text>
              </View>
              <TouchableOpacity 
                onPress={onClose}
                style={styles.closeButton}
              >
                <View style={styles.closeButtonBackground}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={[styles.statCard, { backgroundColor: '#22c55e20' }]}>
                <Text style={styles.statValue}>{total}</Text>
                <Text style={styles.statLabel}>Total Logs</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#3b82f620' }]}>
                <Text style={styles.statValue}>{average}</Text>
                <Text style={styles.statLabel}>Average</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#f59e0b20' }]}>
                <Text style={styles.statValue}>{highest}</Text>
                <Text style={styles.statLabel}>Peak</Text>
              </View>
            </View>

            {/* Time Period Selector */}
            <View style={styles.selectorContainer}>
              <Text style={styles.selectorLabel}>Time Period</Text>
              <View style={styles.selectorButtons}>
                {(['daily', 'monthly', 'yearly'] as const).map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.selectorButton,
                      time === period && styles.selectorButtonActive
                    ]}
                    onPress={() => handleTimeChange(period)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.selectorButtonText,
                      time === period && styles.selectorButtonTextActive
                    ]}>
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Chart */}
            <Animated.View 
              style={[
                styles.chartContainer,
                {
                  opacity: chartAnim,
                  transform: [
                    {
                      translateY: chartAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                }
              ]}
            >
              <BarChart
                data={getCurrentData()}
                barWidth={time === "monthly" ? 18 : 20}
                spacing={time === "daily" ? 24 : time === "monthly" ? 10 : 34}
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                hideYAxisText
                barBorderRadius={8}
                xAxisLabelsAtBottom={true}
                xAxisLabelsHeight={20}
                xAxisLabelsVerticalShift={0}
                xAxisLabelTextStyle={styles.chartLabelText}
                animationDuration={800}
                isAnimated
              />
            </Animated.View>

            {/* Motivational Quote */}
            <View style={styles.quoteContainer}>
              <View style={styles.quoteBackground}>
                <Text style={styles.quoteText}>
                  &ldquo;Progress, not perfection. Every mood logged is a step forward. 🌟&rdquo;
                </Text>
              </View>
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
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    maxHeight: screenHeight * 0.85,
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    opacity: 0.8,
  },
  closeButton: {
    marginLeft: 16,
  },
  closeButtonBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.elevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3f3f4620',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    opacity: 0.7,
  },
  selectorContainer: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  selectorButtons: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 4,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorButtonActive: {
    backgroundColor: Colors.brand.primary,
  },
  selectorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  selectorButtonTextActive: {
    color: Colors.text.primary,
    fontWeight: '600',
  },
  chartContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
  },
  chartLabelText: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
  quoteContainer: {
    marginTop: 8,
  },
  quoteBackground: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: '#3f3f4620',
  },
  quoteText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default ProgressModal;
