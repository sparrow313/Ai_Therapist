import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { MotivationStyle } from "./MotivationStyleSelector";

interface HomeHeaderProps {
  motivationStyle: MotivationStyle;
  onToggleToughLove: () => void;
  onStyleSelectorPress: () => void;
}

export default function HomeHeader({
  motivationStyle,
  onToggleToughLove,
  onStyleSelectorPress,
}: HomeHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-8">
      <View>
        <Text
          style={{ color: Colors.text.secondary }}
          className="text-base"
        >
          Hi Rahul,
        </Text>
        <View className="flex-row items-end">
          <Text
            style={{ color: Colors.text.primary }}
            className="text-4xl font-bold"
          >
            10
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
} 