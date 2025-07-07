import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";

interface QuickAction {
  icon: string;
  title: string;
  desc: string;
  color: string;
  onPress?: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onSeeAll?: () => void;
}

export default function QuickActions({ actions, onSeeAll }: QuickActionsProps) {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text
          style={{ color: Colors.text.primary }}
          className="text-lg font-medium"
        >
          Quick actions
        </Text>
        <Pressable onPress={onSeeAll}>
          <Text style={{ color: Colors.brand.primary }}>See all</Text>
        </Pressable>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {actions.map((action, index) => (
          <Pressable
            key={index}
            onPress={action.onPress}
            className="w-[48%] rounded-2xl p-4 mb-4 shadow-lg shadow-black/50"
            style={{
              backgroundColor: Colors.background.elevated,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.03)",
            }}
          >
            <View
              className={`w-10 h-10 rounded-full ${action.color} items-center justify-center mb-3`}
            >
              <Text>{action.icon}</Text>
            </View>
            <Text
              style={{ color: Colors.text.primary }}
              className="font-bold mb-1"
            >
              {action.title}
            </Text>
            <Text
              style={{ color: Colors.text.secondary }}
              className="text-sm"
            >
              {action.desc}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
} 