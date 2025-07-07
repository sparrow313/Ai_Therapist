import { Pressable, ScrollView, Text, View } from "react-native";
import Colors from "../constants/Colors";

interface SupportPerson {
  name: string;
  icon: string;
  color: string;
}

interface SupportNetworkProps {
  supporters: SupportPerson[];
  onEdit?: () => void;
  onAddSupport?: () => void;
  onSupportPress?: (index: number) => void;
}

export default function SupportNetwork({
  supporters,
  onEdit,
  onAddSupport,
  onSupportPress,
}: SupportNetworkProps) {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text
          style={{ color: Colors.text.primary }}
          className="text-lg font-medium"
        >
          Your support network
        </Text>
        <Pressable onPress={onEdit}>
          <Text style={{ color: Colors.brand.primary }}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-2"
      >
        <Pressable 
          onPress={onAddSupport}
          className="items-center mr-6"
        >
          <View
            className="w-16 h-16 rounded-full items-center justify-center mb-2 shadow-lg shadow-black/50"
            style={{
              backgroundColor: Colors.background.elevated,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.03)",
            }}
          >
            <Text
              className="text-xl"
              style={{ color: Colors.text.secondary }}
            >
              +
            </Text>
          </View>
          <Text style={{ color: Colors.text.primary }}>Add</Text>
        </Pressable>

        {supporters.map((person, index) => (
          <Pressable 
            key={index}
            onPress={() => onSupportPress?.(index)}
            className="items-center mr-6"
          >
            <View
              className={`w-16 h-16 rounded-full ${person.color} items-center justify-center mb-2 shadow-lg shadow-black/50`}
            >
              <Text className="text-xl">{person.icon}</Text>
            </View>
            <Text style={{ color: Colors.text.primary }}>
              {person.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
} 