import React, { useEffect, useState, memo, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { MotivationStyle } from "./MotivationStyleSelector";
import * as SecureStore from 'expo-secure-store';
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";


interface HomeHeaderProps {
  motivationStyle: MotivationStyle;
  onToggleToughLove: () => void;
  onStyleSelectorPress: () => void;
  refreshTrigger?: number; // Simple trigger to refresh streak data
}

const HomeHeader = memo(function HomeHeader({
  motivationStyle,
  onToggleToughLove,
  onStyleSelectorPress,
  refreshTrigger,
}: HomeHeaderProps) {
  const { userId } = useAuth();
  const [streak, setStreak] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);

const getTotalStreak = useCallback(async () => {
  try {
    const { data, error } = await supabase
    .from('pledge_current_streaks')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  console.log("dataSTREAK", data);
  if (error) throw error;

  if (!data || !data.current_streak_started_on) {
    setStreak(0);
    return data ?? null;
  }

  // Get all pledges from the streak start date to today
  const startDate = data.current_streak_started_on;
  const today = new Date().toISOString().split('T')[0];

  const { data: pledges, error: pledgeError } = await supabase
    .from('pledges')
    .select('pledge_date')
    .eq('user_id', userId)
    .eq('is_pledged', true)
    .gte('pledge_date', startDate)
    .lte('pledge_date', today)
    .order('pledge_date');

  if (pledgeError) {
    console.error("Error fetching pledges:", pledgeError);
    setStreak(0);
    return data;
  }

  // Calculate the actual continuous streak
  let currentStreak = 0;
  const pledgeDates = new Set(pledges?.map(p => p.pledge_date) || []);

  // Start from the streak start date and check each day
  const start = new Date(startDate);
  const todayDate = new Date(today);

  for (let date = new Date(start); date <= todayDate; date.setDate(date.getDate() + 1)) {
    const dateStr = date.toISOString().split('T')[0];

    if (pledgeDates.has(dateStr)) {
      currentStreak++;
    } else {
      // If any day is missing, the streak is broken
      // Reset to count from the last continuous sequence
      currentStreak = 0;
    }
  }

  setStreak(currentStreak);
  return data;
  } catch (error) {
    console.error("Error fetching streak:", error);
    setStreak(0);
    return null;
  }
}, [userId]);

  // Fetch streak when userId changes or when refreshTrigger changes
  useEffect(() => {
    if (userId) {
      console.log("HomeHeader: Refreshing streak data, trigger:", refreshTrigger);
      getTotalStreak();
    }
  }, [userId, getTotalStreak, refreshTrigger]);

  // Fetch user name
  useEffect(() => {
    const getUserName = async () => {
      const name = await SecureStore.getItemAsync("user_name");
      setUserName(name);
    };
    getUserName();
  }, []);



  return (
    <View className="flex-row justify-between items-center mb-8">
      <View>
        <Text
          style={{ color: Colors.text.secondary }}
          className="text-base"
        >
          Hi {userName || "there"},
        </Text>
        <View className="flex-row items-end">
          <Text
            style={{ color: Colors.text.primary }}
            className="text-4xl font-bold"
          >
            {streak || 0}
          </Text>
          <Text
            style={{ color: Colors.text.secondary }}
            className="text-2xl font-bold ml-1 mb-1"
          >
            {" "}
            Days
          </Text>
        </View>
        <Text
          style={{ color: Colors.brand.primary }}
          className="font-medium"
        >
          Weed-free journey
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={onToggleToughLove}
          className={`h-11 px-4 rounded-full items-center justify-center shadow-lg shadow-black/50 flex-row space-x-2 ${
            motivationStyle === "tough-love"
              ? "bg-red-900/50"
              : "bg-zinc-800"
          }`}
          style={{
            borderWidth: 1,
            borderColor:
              motivationStyle === "tough-love"
                ? Colors.status.error
                : "rgba(255,255,255,0.03)",
          }}
        >
          <Text className="text-lg">
            {motivationStyle === "tough-love" ? "🔥" : "💪"}
          </Text>
          <Text
            style={{
              color:
                motivationStyle === "tough-love"
                  ? Colors.status.error
                  : Colors.text.secondary,
            }}
            className="font-medium pr-1"
          >
            {motivationStyle === "tough-love" ? "TOUGH" : " Enable Tough Love"}
          </Text>
        </Pressable>
        <Pressable
          onPress={onStyleSelectorPress}
          className="w-11 h-11 rounded-full items-center justify-center shadow-lg shadow-black/50"
          style={{
            backgroundColor: Colors.background.elevated,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.03)",
          }}
        >
          <Text className="text-lg">⚙️</Text>
        </Pressable>
      </View>
    </View>
  );
});

export default HomeHeader;