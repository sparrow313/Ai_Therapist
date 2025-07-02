import { Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-5 pt-10 pb-20">
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-gray-500 dark:text-gray-400 text-base">Hi there,</Text>
            <View className="flex-row items-end">
              <Text className="text-4xl font-bold text-gray-900 dark:text-white">10</Text>
              <Text className="text-2xl font-bold text-gray-700 dark:text-gray-300 ml-1 mb-1"> Days</Text>
            </View>
            <Text className="text-green-600 dark:text-green-400 font-medium">Weed-free journey</Text>
          </View>
          <View className="w-11 h-11 rounded-full bg-white dark:bg-gray-800 items-center justify-center shadow-sm">
            <Text className="text-lg">🔔</Text>
            <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></View>
          </View>
        </View>
        
        {/* Savings Card */}
        <View className="mb-8">
          <View className="bg-green-500 dark:bg-green-600 rounded-2xl p-5 mb-4 shadow-sm">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-base font-medium mb-1">Total Savings</Text>
                <Text className="text-white text-3xl font-bold">$120.00</Text>
                <Text className="text-white/80 text-sm mt-1">Since you quit smoking</Text>
              </View>
              <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
                <Text className="text-2xl">💰</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-medium text-gray-700 dark:text-gray-300">Quick actions</Text>
            <Text className="text-green-600 dark:text-green-400">See all</Text>
          </View>
          
          <View className="flex-row flex-wrap justify-between">
            <Pressable className="w-[48%] bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm">
              <View className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 items-center justify-center mb-3">
                <Text>📝</Text>
              </View>
              <Text className="font-bold text-gray-800 dark:text-gray-200 mb-1">Log mood</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">Track how you feel today</Text>
            </Pressable>
            
            <Pressable className="w-[48%] bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm">
              <View className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center mb-3">
                <Text>🌱</Text>
              </View>
              <Text className="font-bold text-gray-800 dark:text-gray-200 mb-1">Daily challenge</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">Complete today&apos;s task</Text>
            </Pressable>
            
            <Pressable className="w-[48%] bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm">
              <View className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 items-center justify-center mb-3">
                <Text>📊</Text>
              </View>
              <Text className="font-bold text-gray-800 dark:text-gray-200 mb-1">Progress</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">View your journey</Text>
            </Pressable>
            
            <Pressable className="w-[48%] bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm">
              <View className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mb-3">
                <Text>🧠</Text>
              </View>
              <Text className="font-bold text-gray-800 dark:text-gray-200 mb-1">Meditate</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">5-minute session</Text>
            </Pressable>
          </View>
        </View>
        
        {/* Today's Tip */}
        <View className="mb-8">
          <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Today&apos;s tip</Text>
          
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 mb-4">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-3">
                <Text>💡</Text>
              </View>
              <Text className="font-bold text-gray-800 dark:text-gray-200">Cravings pass in 5-10 minutes</Text>
            </View>
            <Text className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When a craving hits, set a timer for 10 minutes and distract yourself with a different activity. By the time the timer goes off, the intensity will have decreased significantly.
            </Text>
            <Pressable className="bg-green-50 dark:bg-green-900/20 py-3 rounded-xl mt-4 items-center">
              <Text className="text-green-600 dark:text-green-400 font-medium">Try this technique</Text>
            </Pressable>
          </View>
        </View>
        
        {/* Community Inspiration */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-medium text-gray-700 dark:text-gray-300">Community inspiration</Text>
            <Text className="text-green-600 dark:text-green-400">View all</Text>
          </View>
          
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 rounded-full bg-green-200 dark:bg-green-800 mr-3 items-center justify-center">
                <Text className="text-lg">👤</Text>
              </View>
              <View>
                <Text className="font-bold text-gray-800 dark:text-gray-200">Michael</Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">Day 32 • Posted today</Text>
              </View>
            </View>
            <Text className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I almost relapsed yesterday when my old smoking buddy called. Instead of giving in, I went for a long walk in the park and called my sister. The fresh air cleared my head, and talking it out helped me remember why I started this journey. Woke up today so proud of myself. One day at a time.
            </Text>
            <View className="flex-row mt-4">
              <Pressable className="flex-row items-center mr-6">
                <Text className="mr-1">❤️</Text>
                <Text className="text-gray-600 dark:text-gray-400">24</Text>
              </Pressable>
              <Pressable className="flex-row items-center">
                <Text className="mr-1">💬</Text>
                <Text className="text-gray-600 dark:text-gray-400">8 comments</Text>
              </Pressable>
            </View>
          </View>
        </View>
        
        {/* Support Network */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-medium text-gray-700 dark:text-gray-300">Your support network</Text>
            <Text className="text-green-600 dark:text-green-400">Edit</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
            <Pressable className="items-center mr-6">
              <View className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">+</Text>
              </View>
              <Text className="text-gray-800 dark:text-gray-200">Add</Text>
            </Pressable>
            
            <Pressable className="items-center mr-6">
              <View className="w-16 h-16 rounded-full bg-green-200 dark:bg-green-800 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">👤</Text>
              </View>
              <Text className="text-gray-800 dark:text-gray-200">Grace L.</Text>
            </Pressable>
            
            <Pressable className="items-center mr-6">
              <View className="w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-800 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">LA</Text>
              </View>
              <Text className="text-gray-800 dark:text-gray-200">Lawrence A.</Text>
            </Pressable>
            
            <Pressable className="items-center mr-6">
              <View className="w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-800 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">👩‍⚕️</Text>
              </View>
              <Text className="text-gray-800 dark:text-gray-200">Dr. Sarah</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
