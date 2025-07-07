import { Text, View } from "react-native";
import Colors from "../constants/Colors";

interface SavingsCardProps {
  amount: string;
}

export default function SavingsCard({ amount }: SavingsCardProps) {
  return (
    <View
      className="rounded-2xl p-5 mb-4 shadow-lg shadow-green-900/20"
      style={{ backgroundColor: Colors.brand.secondary }}
    >
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-base font-medium mb-1">
            Total Savings
          </Text>
          <Text className="text-white text-3xl font-bold">{amount}</Text>
          <Text className="text-white/80 text-sm mt-1">
            Since you quit smoking
          </Text>
        </View>
        <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
          <Text className="text-2xl">💰</Text>
        </View>
      </View>
    </View>
  );
} 