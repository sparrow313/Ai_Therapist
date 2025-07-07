import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { MotivationStyle } from "./MotivationStyleSelector";

interface DailyMessageProps {
  title: string;
  message: string;
  action?: string;
  motivationStyle: MotivationStyle;
  onActionPress?: () => void;
}

export default function DailyMessage({
  title,
  message,
  action,
  motivationStyle,
  onActionPress,
}: DailyMessageProps) {
  return (
    <View>
      <Text
        style={{ color: Colors.text.primary }}
        className="text-lg font-medium mb-4"
      >
        Today&apos;s message
      </Text>

      <View
        className="rounded-2xl shadow-lg shadow-black/50 p-5 mb-4"
        style={{
          backgroundColor: Colors.background.elevated,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.03)",
        }}
      >
        <View className="flex-row items-center mb-4">
          <View className="w-10 h-10 rounded-full bg-blue-900 items-center justify-center mr-3">
            <Text>
              {motivationStyle === "tough-love"
                ? "💪"
                : motivationStyle === "goal-oriented"
                ? "🎯"
                : "🌟"}
            </Text>
          </View>
          <Text
            style={{ color: Colors.text.primary }}
            className="font-bold"
          >
            {title}
          </Text>
        </View>
        <Text
          style={{ color: Colors.text.secondary }}
          className="leading-relaxed"
        >
          {message}
        </Text>
        {action && (
          <Pressable 
            onPress={onActionPress}
            className="bg-slate-900 py-3 rounded-xl mt-4 items-center"
          >
            <Text
              style={{ color: Colors.brand.primary }}
              className="font-medium font-hanken-grotesk"
            >
              {action}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
} 