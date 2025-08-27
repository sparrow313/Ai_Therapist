import { useState, useEffect, useCallback } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import Colors from "../constants/Colors";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import SubmitCard from "./SubmitCard";
import { useSubmitCard, SUBMIT_CARD_PRESETS } from "../hooks/useSubmitCard";

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Happy", color: "bg-green-500", value: 90 },
  { emoji: "😌", label: "Calm", color: "bg-blue-500", value: 80 },
  { emoji: "😕", label: "Meh", color: "bg-yellow-500", value: 50 },
  { emoji: "😢", label: "Sad", color: "bg-purple-500", value: 30 },
  { emoji: "😠", label: "Angry", color: "bg-red-500", value: 20 },
  { emoji: "😰", label: "Anxious", color: "bg-orange-500", value: 25 },
];

interface MoodLogModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (mood: { emoji: string; label: string; note: string; value: number }) => void;
}

export default function MoodLogModal({
  visible,
  onClose,
  onSave,
}: MoodLogModalProps) {
  const { userId } = useAuth();
  const {
    isVisible: submitCardVisible,
    config: submitCardConfig,
    hideSubmitCard,
    showSuccess,
    showError,
    showWarning,
  } = useSubmitCard();

  const [selectedMood, setSelectedMood] = useState<{
    emoji: string;
    label: string;
    value: number;
  } | null>(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [todaysMood, setTodaysMood] = useState<{
    emoji: string;
    label: string;
    note: string;
  } | null>(null);
  const [checkingTodaysLog, setCheckingTodaysLog] = useState(false);

  // Function to check if mood has been logged today
  const checkTodaysMoodLog = useCallback(async () => {
    if (!userId) return;

    setCheckingTodaysLog(true);
    try {
      // Check current Supabase session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user?.id) {
        console.log("❌ NO VALID SESSION for mood check");
        setCheckingTodaysLog(false);
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      const { data: existingMood, error } = await supabase
        .from("mood_logs")
        .select("mood_emoji, mood_label, note")
        .eq("user_id", session.user.id)
        .eq("logged_date", today)
        .maybeSingle();

      if (error) {
        console.error("❌ ERROR CHECKING TODAY'S MOOD:", error);
        setCheckingTodaysLog(false);
        return;
      }

      if (existingMood) {
        console.log("✅ FOUND TODAY'S MOOD:", existingMood);
        setHasLoggedToday(true);
        setTodaysMood({
          emoji: existingMood.mood_emoji,
          label: existingMood.mood_label,
          note: existingMood.note || "",
        });
      } else {
        console.log("📭 NO MOOD LOGGED TODAY");
        setHasLoggedToday(false);
        setTodaysMood(null);
      }
    } catch (err) {
      console.error("❌ UNEXPECTED ERROR CHECKING TODAY'S MOOD:", err);
    } finally {
      setCheckingTodaysLog(false);
    }
  }, [userId]);

  // Check today's mood log when modal becomes visible
  useEffect(() => {
    if (visible && userId) {
      checkTodaysMoodLog();
    } else if (!visible) {
      // Reset states when modal closes
      setSelectedMood(null);
      setNote("");
      setHasLoggedToday(false);
      setTodaysMood(null);
      setCheckingTodaysLog(false);
    }
  }, [visible, userId, checkTodaysMoodLog]);

  const handleSave = async () => {
    if (!selectedMood || !userId) {
      console.log("❌ MOOD INSERT FAILED: Missing data", { selectedMood, userId });
      showError("Error", "Please select a mood and ensure you're logged in.");
      return;
    }

    if (hasLoggedToday) {
      showWarning(
        SUBMIT_CARD_PRESETS.ALREADY_LOGGED.title,
        SUBMIT_CARD_PRESETS.ALREADY_LOGGED.message,
        { emoji: SUBMIT_CARD_PRESETS.ALREADY_LOGGED.emoji }
      );
      return;
    }

    // Check current Supabase session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log("🔐 CURRENT SESSION:", session);
    console.log("🔐 SESSION ERROR:", sessionError);
    console.log("🔐 USER ID FROM SESSION:", session?.user?.id);
    console.log("🔐 USER ID FROM HOOK:", userId);

    if (!session?.user?.id) {
      console.log("❌ NO VALID SESSION");
      showWarning(
        SUBMIT_CARD_PRESETS.LOGIN_REQUIRED.title,
        SUBMIT_CARD_PRESETS.LOGIN_REQUIRED.message,
        { emoji: SUBMIT_CARD_PRESETS.LOGIN_REQUIRED.emoji }
      );
      return;
    }

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];

      // Use the session user ID to ensure RLS works
      const sessionUserId = session.user.id;

      const moodData = {
        user_id: sessionUserId,
        mood_emoji: selectedMood.emoji,
        mood_label: selectedMood.label,
        mood_value: selectedMood.value,
        note: note.trim() || null,
        logged_date: today,
        created_at: new Date().toISOString(),
      };

      console.log("🔐 USING SESSION USER ID:", sessionUserId);
      console.log("🔐 STORED USER ID:", userId);

      console.log("🚀 INSERTING MOOD LOG:", moodData);

      // Insert mood log into Supabase
      const { data, error } = await supabase
        .from("mood_logs")
        .insert(moodData)
        .select();

      if (error) {
        console.error("❌ MOOD INSERT ERROR:", error);
        showError(
          SUBMIT_CARD_PRESETS.SAVE_ERROR.title,
          "Failed to save your mood. Please try again.",
          { emoji: SUBMIT_CARD_PRESETS.SAVE_ERROR.emoji }
        );
      } else {
        console.log("✅ MOOD INSERT SUCCESS:", data);

        // Call the optional callback for any additional handling
        onSave?.({
          emoji: selectedMood.emoji,
          label: selectedMood.label,
          note,
          value: selectedMood.value,
        });

        showSuccess(
          SUBMIT_CARD_PRESETS.MOOD_LOGGED.title,
          SUBMIT_CARD_PRESETS.MOOD_LOGGED.message,
          {
            emoji: selectedMood.emoji,
            onAction: () => {
              setSelectedMood(null);
              setNote("");
              checkTodaysMoodLog();
              onClose();
              hideSubmitCard();
            }
          }
        );
      }
    } catch (err) {
      console.error("❌ MOOD INSERT UNEXPECTED ERROR:", err);
      showError("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-end">
        <View
          className="rounded-t-3xl p-6"
          style={{ backgroundColor: Colors.background.elevated }}
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text
              style={{ color: Colors.text.primary }}
              className="text-xl font-bold"
            >
              {checkingTodaysLog ? "Checking today's log..." : hasLoggedToday ? "Today's Mood" : "How are you feeling?"}
            </Text>
            <Pressable onPress={onClose}>
              <Text style={{ color: Colors.text.secondary }}>✕</Text>
            </Pressable>
          </View>

          {!hasLoggedToday && (
            <View className="flex-row flex-wrap justify-between mb-6">
              {MOOD_OPTIONS.map((mood) => (
                <Pressable
                  key={mood.label}
                  onPress={() => setSelectedMood({
                    emoji: mood.emoji,
                    label: mood.label,
                    value: mood.value,
                  })}
                  disabled={checkingTodaysLog}
                  className={`w-[31%] rounded-xl p-4 mb-4 items-center ${
                    selectedMood?.label === mood.label
                      ? mood.color
                      : checkingTodaysLog
                        ? "bg-gray-800/10"
                        : "bg-gray-800/30"
                  }`}
                >
                  <Text className="text-2xl mb-2">{mood.emoji}</Text>
                  <Text
                    style={{ color: Colors.text.primary }}
                    className="text-sm"
                  >
                    {mood.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {!hasLoggedToday && (
            <View className="mb-6">
              <Text
                style={{ color: Colors.text.primary }}
                className="text-base font-medium mb-2"
              >
                Add a note (optional)
              </Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="How are you feeling today?"
                placeholderTextColor={Colors.text.secondary}
                multiline
                numberOfLines={4}
                className="rounded-xl p-4 mb-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: Colors.text.primary,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.1)",
                }}
                editable={!checkingTodaysLog}
              />
            </View>
          )}

          {hasLoggedToday ? (
            <View className="space-y-4">
              <View className="rounded-xl p-4 bg-green-500/20 border border-green-500/30">
                <Text
                  style={{ color: Colors.text.primary }}
                  className="text-center font-bold mb-2"
                >
                  ✅ Today&apos;s Mood Logged
                </Text>
                <View className="flex-row items-center justify-center space-x-2">
                  <Text className="text-2xl">{todaysMood?.emoji}</Text>
                  <Text
                    style={{ color: Colors.text.primary }}
                    className="text-lg font-medium"
                  >
                    {todaysMood?.label}
                  </Text>
                </View>
                {todaysMood?.note && (
                  <Text
                    style={{ color: Colors.text.secondary }}
                    className="text-center mt-2 text-sm"
                  >
                    &ldquo;{todaysMood.note}&rdquo;
                  </Text>
                )}
              </View>
              <Text
                style={{ color: Colors.text.secondary }}
                className="text-center text-sm"
              >
                Come back tomorrow to log your mood again! 🌅
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={handleSave}
              disabled={!selectedMood || isLoading || checkingTodaysLog}
              className={`rounded-xl p-4 ${
                selectedMood && !isLoading && !checkingTodaysLog ? "bg-purple-500" : "bg-gray-800"
              }`}
            >
              <Text
                style={{ color: Colors.text.primary }}
                className="text-center font-bold"
              >
                {checkingTodaysLog ? "Checking..." : isLoading ? "Saving..." : "Save Mood"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>

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
