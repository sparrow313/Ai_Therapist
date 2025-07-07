import { View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function StreakCard() {
  return (
    <View className="p-6 bg-zinc-900 rounded-2xl shadow-lg shadow-black/50">
      <View className="flex-row items-center justify-between">
        <View>
          <ThemedText type="subtitle" className="text-green-500 mb-1">
            Weed-Free Streak
          </ThemedText>
          <ThemedText type="title" className="text-3xl text-white">
            10 Days
          </ThemedText>
          <ThemedText className="text-gray-400 mt-1">
            You&apos;ve saved $120 so far
          </ThemedText>
        </View>
        <View className="bg-green-900/30 p-4 rounded-full">
          <ThemedText className="text-green-500 text-2xl">
            🌱
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
