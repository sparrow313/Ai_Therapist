import Colors from "@/constants/Colors";
import { BlurView } from 'expo-blur';
import React, { useCallback, useEffect, useState } from "react";
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
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface ProgressModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MoodData {
  date: string;
  average: number;
  count: number;
  moods: { label: string; value: number; emoji: string }[];
}

interface ChartDataPoint {
  value: number;
  label: string;
  frontColor: string;
}

const ProgressModal = ({ visible, onClose }: ProgressModalProps) => {
  const { userId } = useAuth();
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [chartAnim] = useState(new Animated.Value(0));
  
  // State for mood data
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [time, setTime] = useState<"daily" | "monthly" | "yearly">("daily");

  // Color palette for mood values (20-90 scale) - matching MoodLogModal colors exactly
  const getMoodColor = useCallback((value: number): string => {
    // Exact colors from MoodLogModal MOOD_OPTIONS (Tailwind to hex conversion)
    if (value <= 20) return '#ef4444'; // bg-red-500 - Angry (20)
    if (value <= 25) return '#f97316'; // bg-orange-500 - Anxious (25)
    if (value <= 30) return '#a855f7'; // bg-purple-500 - Sad (30)
    if (value <= 50) return '#eab308'; // bg-yellow-500 - Meh (50)
    if (value <= 80) return '#3b82f6'; // bg-blue-500 - Calm (80)
    if (value <= 90) return '#22c55e'; // bg-green-500 - Happy (90)
    return '#16a34a'; // Darker green for values above 90
  }, []);

  // Helper function to get mood description from value - matching exact mood labels
  const getMoodDescription = useCallback((value: number): string => {
    if (value <= 20) return 'Angry';
    if (value <= 25) return 'Anxious';
    if (value <= 30) return 'Sad';
    if (value <= 50) return 'Meh';
    if (value <= 80) return 'Calm';
    if (value <= 90) return 'Happy';
    return 'Excellent';
  }, []);

  // Function to fetch and process mood data
  const fetchMoodData = useCallback(async () => {
    if (!userId) {
      console.log("❌ MOOD FETCH: No user ID available");
      setError("No user ID available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check current Supabase session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("❌ SESSION ERROR:", sessionError);
        setError("Session error occurred");
        return;
      }

      if (!session?.user?.id) {
        console.log("❌ MOOD FETCH: No valid session");
        setError("No valid session");
        return;
      }

      console.log("🔍 FETCHING MOOD DATA for user:", session.user.id);

      // Fetch mood data based on the current time period
      let startDate: Date;

      switch (time) {
        case "daily":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7); // Last 7 days
          break;
        case "monthly":
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 12); // Last 12 months
          break;
        case "yearly":
          startDate = new Date();
          startDate.setFullYear(startDate.getFullYear() - 6); // Last 6 years
          break;
        default:
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
      }

      const startDateStr = startDate.toISOString().split("T")[0];

      const { data: moodLogs, error: fetchError } = await supabase
        .from("mood_logs")
        .select("*")
        .eq("user_id", session.user.id)
        .gte("logged_date", startDateStr)
        .order("logged_date", { ascending: true });

      if (fetchError) {
        console.error("❌ MOOD FETCH ERROR:", fetchError);
        setError(`Failed to fetch mood data: ${fetchError.message}`);
        return;
      }

      console.log("📊 FETCHED MOOD LOGS:", moodLogs);

      if (!moodLogs || moodLogs.length === 0) {
        console.log("📭 NO MOOD DATA FOUND");
        setMoodData([]);
        return;
      }

      // Process data based on time period
      let processedData: MoodData[] = [];

      if (time === "daily") {
        // Group by date for daily view
        const moodsByDate = moodLogs.reduce((acc: Record<string, any[]>, mood: any) => {
          const date = mood.logged_date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(mood);
          return acc;
        }, {} as Record<string, any[]>);

        processedData = Object.entries(moodsByDate).map(([date, moods]: [string, any[]]) => {
          const average = moods.reduce((sum: number, mood: any) => sum + mood.mood_value, 0) / moods.length;
          return {
            date,
            average: Math.round(average * 10) / 10, // Round to 1 decimal place
            count: moods.length,
            moods: moods.map((m: any) => ({ 
              label: m.mood_label, 
              value: m.mood_value, 
              emoji: m.mood_emoji 
            }))
          };
        });
      } else if (time === "monthly") {
        // Group by month for monthly view
        const moodsByMonth = moodLogs.reduce((acc: Record<string, any[]>, mood: any) => {
          const date = new Date(mood.logged_date);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!acc[monthKey]) {
            acc[monthKey] = [];
          }
          acc[monthKey].push(mood);
          return acc;
        }, {} as Record<string, any[]>);

        processedData = Object.entries(moodsByMonth).map(([monthKey, moods]: [string, any[]]) => {
          const average = moods.reduce((sum: number, mood: any) => sum + mood.mood_value, 0) / moods.length;
          return {
            date: monthKey,
            average: Math.round(average * 10) / 10,
            count: moods.length,
            moods: moods.map((m: any) => ({ 
              label: m.mood_label, 
              value: m.mood_value, 
              emoji: m.mood_emoji 
            }))
          };
        });
      } else if (time === "yearly") {
        // Group by year for yearly view
        const moodsByYear = moodLogs.reduce((acc: Record<string, any[]>, mood: any) => {
          const date = new Date(mood.logged_date);
          const yearKey = date.getFullYear().toString();
          if (!acc[yearKey]) {
            acc[yearKey] = [];
          }
          acc[yearKey].push(mood);
          return acc;
        }, {} as Record<string, any[]>);

        processedData = Object.entries(moodsByYear).map(([year, moods]: [string, any[]]) => {
          const average = moods.reduce((sum: number, mood: any) => sum + mood.mood_value, 0) / moods.length;
          return {
            date: year,
            average: Math.round(average * 10) / 10,
            count: moods.length,
            moods: moods.map((m: any) => ({ 
              label: m.mood_label, 
              value: m.mood_value, 
              emoji: m.mood_emoji 
            }))
          };
        });
      }

      // Sort the processed data
      processedData.sort((a, b) => a.date.localeCompare(b.date));

      console.log("📈 PROCESSED MOOD DATA:", processedData);
      setMoodData(processedData);

    } catch (error) {
      console.error("❌ MOOD FETCH UNEXPECTED ERROR:", error);
      setError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [userId, time]);



  // Transform mood data to chart format
  const transformToChartData = useCallback((): ChartDataPoint[] => {
    if (!moodData || moodData.length === 0) {
      // Return empty data with appropriate labels if no data
      if (time === "daily") {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days.map(day => ({ value: 0, label: day, frontColor: '#e5e7eb' }));
      } else if (time === "monthly") {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map(month => ({ value: 0, label: month, frontColor: '#e5e7eb' }));
      } else {
        // yearly - show last 6 years
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 6 }, (_, i) => (currentYear - 5 + i).toString());
        return years.map(year => ({ value: 0, label: year, frontColor: '#e5e7eb' }));
      }
    }

    if (time === "daily") {
      // For daily view, show data with day names
      return moodData.map(item => {
        const date = new Date(item.date);
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = dayNames[date.getDay()];
        return {
          value: item.average,
          label: dayName,
          frontColor: getMoodColor(item.average)
        };
      });
    } else if (time === "monthly") {
      // For monthly view, show data with month names
      return moodData.map(item => {
        const [, month] = item.date.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthNames[parseInt(month) - 1];
        return {
          value: item.average,
          label: monthName,
          frontColor: getMoodColor(item.average)
        };
      });
    } else {
      // For yearly view, show data with year labels
      return moodData.map(item => ({
        value: item.average,
        label: item.date,
        frontColor: getMoodColor(item.average)
      }));
    }
  }, [moodData, time, getMoodColor]);

  // Get current chart data
  const getCurrentData = (): ChartDataPoint[] => {
    return transformToChartData();
  };

  // Calculate optimal bar width and spacing based on data length and container width
  const getChartDimensions = () => {
    const data = getCurrentData();
    const containerWidth = screenWidth - 96; // Total available width
    const dataPoints = data.length;
    
    if (dataPoints === 0) {
      return { barWidth: 20, spacing: 20 };
    }

    // Calculate optimal dimensions
    const totalSpacingWidth = containerWidth * 0.3; // 30% for spacing
    const totalBarWidth = containerWidth * 0.7; // 70% for bars
    
    const barWidth = Math.min(Math.max(totalBarWidth / dataPoints, 12), 30); // Min 12, Max 30
    const spacing = Math.max(totalSpacingWidth / (dataPoints + 1), 8); // Min 8px spacing
    
    return { barWidth: Math.round(barWidth), spacing: Math.round(spacing) };
  };

  // Separate useEffect for fetching data when time period changes
  useEffect(() => {
    if (visible) {
      fetchMoodData();
    }
  }, [visible, time, fetchMoodData]);

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
  }, [visible, slideAnim, fadeAnim, scaleAnim, chartAnim]);

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

  const getStatsText = () => {
    if (!moodData || moodData.length === 0) {
      return { total: 0, average: 0, highest: 0 };
    }

    const total = moodData.reduce((sum, item) => sum + item.count, 0); // Total number of mood logs
    const totalMoodValue = moodData.reduce((sum, item) => sum + (item.average * item.count), 0);
    const average = Math.round((totalMoodValue / total) * 10) / 10; // Overall average mood
    const highest = Math.max(...moodData.map(item => item.average)); // Highest average in period
    
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={fetchMoodData}
                  style={[styles.closeButton, { marginRight: 8 }]}
                >
                  <View style={styles.closeButtonBackground}>
                    <Text style={styles.closeButtonText}>🔄</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                >
                  <View style={styles.closeButtonBackground}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
                <Text style={styles.statDescription}>{getMoodDescription(average)}</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#f59e0b20' }]}>
                <Text style={styles.statValue}>{highest}</Text>
                <Text style={styles.statLabel}>Peak</Text>
                <Text style={styles.statDescription}>{getMoodDescription(highest)}</Text>
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

            {/* Mood Scale Legend */}
            <View style={styles.legendContainer}>
              <Text style={styles.legendTitle}>Mood Scale</Text>
              <View style={styles.legendItems}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
                  <Text style={styles.legendText}>😠 Angry</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#f97316' }]} />
                  <Text style={styles.legendText}>😰 Anxious</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#a855f7' }]} />
                  <Text style={styles.legendText}>😢 Sad</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#eab308' }]} />
                  <Text style={styles.legendText}>😕 Meh</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#3b82f6' }]} />
                  <Text style={styles.legendText}>😌 Calm</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#22c55e' }]} />
                  <Text style={styles.legendText}>😊 Happy</Text>
                </View>
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
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>📊 Loading mood data...</Text>
                </View>
              ) : error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>❌ {error}</Text>
                  <TouchableOpacity onPress={fetchMoodData} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>🔄 Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.chartWrapper}>
                  <BarChart
                    data={getCurrentData()}
                    width={screenWidth - 96} // Screen width minus modal padding and chart container padding
                    height={160} // Fixed height for consistent appearance
                    barWidth={getChartDimensions().barWidth}
                    spacing={getChartDimensions().spacing}
                    hideRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    hideYAxisText
                    barBorderRadius={6}
                    xAxisLabelsAtBottom={true}
                    xAxisLabelsHeight={24}
                    xAxisLabelsVerticalShift={2}
                    xAxisLabelTextStyle={styles.chartLabelText}
                    animationDuration={800}
                    isAnimated
                    maxValue={100} // Mood scale is 20-90, with some padding
                    noOfSections={5} // Show 5 sections (0, 20, 40, 60, 80, 100)
                    initialSpacing={getChartDimensions().spacing}
                    endSpacing={getChartDimensions().spacing}
                  />
                </View>
              )}
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
  statDescription: {
    fontSize: 10,
    color: Colors.text.secondary,
    opacity: 0.6,
    fontStyle: 'italic',
    marginTop: 2,
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
    width: '100%',
    marginBottom: 24,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  chartWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.brand.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  legendContainer: {
    marginBottom: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginHorizontal: 4,
    width: '30%',
    justifyContent: 'flex-start',
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: Colors.text.secondary,
    flex: 1,
    textAlign: 'left',
  },
});

export default ProgressModal;
