import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { supabase } from "../lib/supabase";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState, useCallback } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import SubmitCard from "./SubmitCard";
import { useSubmitCard, SUBMIT_CARD_PRESETS } from "../hooks/useSubmitCard";

interface PledgeContainerProps {
  onPledgeSuccess?: () => void;
}

export default function PledgeContainer({ onPledgeSuccess }: PledgeContainerProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isPledgeTaken, setIsPledgeTaken] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isVisible: submitCardVisible,
    config: submitCardConfig,
    hideSubmitCard,
    showSuccess,
    showError,
  } = useSubmitCard();

  const takePledgeHandler = async () => {
    if (isLoading || isPledgeTaken) return;

    setIsLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0];

      const { error } = await supabase.from("pledges").insert({
        pledge_date: today,
        is_pledged: true,
        user_id: userId,
      });

      if (error) {
        console.error("Error saving pledge:", error);
        showError(
          SUBMIT_CARD_PRESETS.SAVE_ERROR.title,
          "Failed to save your pledge. Please try again.",
          { emoji: SUBMIT_CARD_PRESETS.SAVE_ERROR.emoji }
        );
      } else {
        setIsPledgeTaken(true);
        // Call the callback to refresh streak in HomeHeader immediately
        console.log("Calling onPledgeSuccess to refresh streak");
        onPledgeSuccess?.();

        showSuccess(
          SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.title,
          SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.message,
          {
            emoji: SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.emoji,
            autoClose: true,
            autoCloseDelay: 3000,
          }
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      showError("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPledge = useCallback(async (userId: string) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("pledges")
        .select("*")
        .eq("user_id", userId)
        .eq("pledge_date", today)
        .maybeSingle();

      console.log("data22", data);

      if (data) {
        setIsPledgeTaken(true);
      } else {
        setIsPledgeTaken(false);
      }

      if (error) {
        console.error("Error fetching pledge:", error);
        showError("Error", "Failed to fetch your pledge. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching pledge:", error);
      showError("Error", "Failed to fetch your pledge. Please try again.");
    }
  }, [showError]);

  useEffect(() => {
    if (userId) {
      getPledge(userId);
    }
  }, [userId, getPledge]);

  async function getSecureItem(key: string) {
    // get user_id from secure store
    const value = await SecureStore.getItemAsync(key);
    setUserId(value);
    return value;
  }

  useEffect(() => {
    getSecureItem("user_id"); // get user_id from secure store and set it to userId state
  }, []);

  return (
    <>
      <View
        className="rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundColor: Colors.background.elevated,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.08)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
      {/* Header Section */}
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row items-center mb-4">
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
            style={{
              backgroundColor: isPledgeTaken ? Colors.status.success + '20' : Colors.brand.primary + '20',
            }}
          >
            <Text className="text-3xl">
              {isPledgeTaken ? "✨" : "🤝"}
            </Text>
          </View>
          <View className="flex-1">
            <Text
              className="text-xl font-bold font-hanken-grotesk mb-1"
              style={{ color: Colors.text.primary }}
            >
              Daily Pledge
            </Text>
            <Text
              className="text-sm font-hanken-grotesk"
              style={{ color: Colors.text.secondary }}
            >
              {isPledgeTaken
                ? "Commitment fulfilled for today"
                : "Strengthen your resolve"}
            </Text>
          </View>
        </View>
      </View>

      {/* Main Action Section */}
      <View className="px-6 pb-6">
        <Pressable
          onPress={takePledgeHandler}
          disabled={isPledgeTaken === true || isLoading}
          className="rounded-2xl overflow-hidden"
          style={{
            shadowColor: isPledgeTaken ? Colors.status.success : Colors.brand.primary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <LinearGradient
            colors={
              isPledgeTaken
                ? [Colors.status.success, Colors.status.success + 'CC']
                : [Colors.brand.primary, Colors.brand.secondary]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-8 py-5 items-center justify-center"
          >
            <View className="flex-row items-center">
              {isLoading ? (
                <Text className="text-2xl mr-3">⏳</Text>
              ) : (
                <Text className="text-2xl mr-3">
                  {isPledgeTaken ? "✅" : "🎯"}
                </Text>
              )}
              <Text
                className="text-lg font-bold font-hanken-grotesk"
                style={{
                  color: Colors.text.primary,
                  letterSpacing: 0.5,
                }}
              >
                {isLoading
                  ? "Recording..."
                  : isPledgeTaken
                    ? "Pledge Complete!"
                    : "Take Today's Pledge"}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Status Message */}
        <View className="mt-4 px-4 py-3 rounded-xl" style={{
          backgroundColor: isPledgeTaken
            ? Colors.status.success + '15'
            : Colors.background.secondary,
        }}>
          <Text
            className="text-center text-sm font-hanken-grotesk"
            style={{
              color: isPledgeTaken ? Colors.status.success : Colors.text.secondary
            }}
          >
            {isPledgeTaken
              ? "🌟 You've made your commitment today. Stay strong!"
              : "💪 Ready to commit to your goals today?"}
          </Text>
        </View>
      </View>
    </View>

    {/* Submit Card */}
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
  </>
  );
}
