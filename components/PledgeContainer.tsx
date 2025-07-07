import { Alert, Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";

interface PledgeContainerProps {
  hasTakenPledge?: boolean;
  onPledgeTaken?: () => void;
}

export default function PledgeContainer({ 
  hasTakenPledge = false, 
  onPledgeTaken 
}: PledgeContainerProps) {
  const handlePledge = () => {
    if (!hasTakenPledge) {
      Alert.alert(
        "Today's Pledge",
        "I pledge to stay committed to my journey today, taking it one day at a time. Every moment of resistance makes me stronger.",
        [
          { text: "Not Now", style: "cancel" },
          {
            text: "I Pledge",
            style: "default",
            onPress: () => onPledgeTaken?.(),
          },
        ]
      );
    }
  };

  return (
    <View
      className="rounded-2xl p-5 shadow-lg shadow-black/50"
      style={{
        backgroundColor: Colors.background.elevated,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.03)",
      }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-amber-900/30 items-center justify-center mr-3">
            <Text className="text-2xl">🤝</Text>
          </View>
          <View>
            <Pressable
              onPress={handlePledge}
              className={`my-4 px-8 py-4 rounded-xl items-center justify-center shadow-lg`}
              style={{
                backgroundColor: hasTakenPledge ? Colors.status.success : Colors.brand.primary,
                elevation: 8,
                shadowColor: hasTakenPledge ? Colors.status.success : Colors.brand.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 22,
                  letterSpacing: 0.5,
                }}
                className="font-bold font-hanken-grotesk"
              >
                {hasTakenPledge ? "✓ Pledged Today!" : "Take Daily Pledge"}
              </Text>
            </Pressable>
            <Text
              style={{ color: Colors.text.secondary }}
              className="text-sm"
            >
              {hasTakenPledge
                ? "You've committed to today's journey"
                : "Reinforce your commitment"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
} 