import ProgressModal from "@/components/ProgressModal";
import { useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import CommunityInspiration from "../../components/CommunityInspiration";
import DailyMessage from "../../components/DailyMessage";
import HomeHeader from "../../components/HomeHeader";
import MoodLogModal from "../../components/MoodLogModal";
import MotivationStyleSelector, {
  MotivationStyle,
} from "../../components/MotivationStyleSelector";
import PledgeContainer from "../../components/PledgeContainer";
import QuickActions from "../../components/QuickActions";
import SavingsCard from "../../components/SavingsCard";
import SupportNetwork from "../../components/SupportNetwork";
import Colors from "../../constants/Colors";
import { getMotivationMessage } from "../../constants/MotivationMessages";

export default function Index() {
  const [motivationStyle, setMotivationStyle] =
    useState<MotivationStyle>("positive");
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const todaysTip = getMotivationMessage(motivationStyle, "daily");

  const handleMoodSave = (mood: { emoji: string; label: string; note: string }) => {
    // Here you would typically save the mood to your backend/storage
    console.log("Mood logged:", mood);
    setShowMoodModal(false);
  };

  const quickActions = [
    {
      icon: "📝",
      title: "Log mood",
      desc: "Track how you feel today",
      color: "bg-purple-900",
      onPress: () => setShowMoodModal(true),
    },
    {
      icon: "🌱",
      title: "Daily challenge",
      desc: "Complete today's task",
      color: "bg-green-900",
    },
    {
      icon: "📊",
      title: "Logged Moods",
      desc: "View your journey",
      color: "bg-amber-900",
      onPress: () => setShowProgressModal(true),
    },
    {
      icon: "🧠",
      title: "Meditate",
      desc: "5-minute session",
      color: "bg-blue-900",
    },
  ];

  const communityPost = {
    username: "Michael",
    days: 32,
    timePosted: "Posted today",
    content: "I almost relapsed yesterday when my old smoking buddy called. Instead of giving in, I went for a long walk in the park and called my sister. The fresh air cleared my head, and talking it out helped me remember why I started this journey. Woke up today so proud of myself. One day at a time.",
    likes: 24,
    comments: 8,
  };

  const supporters = [
    { name: "Grace L.", icon: "👤", color: "bg-green-900/30" },
    { name: "Lawrence A.", icon: "LA", color: "bg-blue-900/30" },
    { name: "Dr. Sarah", icon: "👩‍⚕️", color: "bg-purple-900/30" },
  ];



  // Memoize handlers to prevent unnecessary re-renders
  const handleToggleToughLove = useCallback(() => {
    if (motivationStyle === "tough-love") {
      setMotivationStyle("positive");
    } else {
      setMotivationStyle("tough-love");
    }
  }, [motivationStyle]);

  const handleStyleSelectorPress = useCallback(() => {
    setShowStyleSelector(!showStyleSelector);
  }, [showStyleSelector]);

  // Simple counter to trigger HomeHeader refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to refresh streak data after pledge is taken
  const handlePledgeSuccess = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: Colors.background.primary }}
      >
        <View className="px-5 pt-10 pb-20">
          {/* Header Section */}
          <HomeHeader
            motivationStyle={motivationStyle}
            onToggleToughLove={handleToggleToughLove}
            onStyleSelectorPress={handleStyleSelectorPress}
            refreshTrigger={refreshTrigger}
          />

          {/* Motivation Style Selector */}
          {showStyleSelector && (
            <View className="mb-8">
              <MotivationStyleSelector
                currentStyle={motivationStyle}
                onStyleChange={(style) => {
                  setMotivationStyle(style);
                  setShowStyleSelector(false);
                }}
              />
            </View>
          )}

          {/* Savings Card */}
          <View className="mb-8">
            <SavingsCard amount="$120.00" />
          </View>

          {/* Daily Pledge Card */}
          <View className="mb-8">
            <PledgeContainer onPledgeSuccess={handlePledgeSuccess} />
          </View>

          {/* Today's Message */}
          <View className="mb-8">
            <DailyMessage
              title={todaysTip.title}
              message={todaysTip.message}
              action={todaysTip.action}
              motivationStyle={motivationStyle}
              onActionPress={() => {
                // You can add more functionality here like navigation or showing a confirmation
              }}
            />
          </View>

          {/* Quick Actions */}
          <View className="mb-8">
            <QuickActions actions={quickActions} />
          </View>

          {/* Community Inspiration */}
          <View className="mb-8">
            <CommunityInspiration post={communityPost} />
          </View>

          {/* Support Network */}
          <SupportNetwork supporters={supporters} />
        </View>
      </ScrollView>

      <MoodLogModal
        visible={showMoodModal}
        onClose={() => setShowMoodModal(false)}
        onSave={handleMoodSave}
      />

      <ProgressModal
        visible={showProgressModal}
        onClose={() => setShowProgressModal(false)}
      />
    </>
  );
}
