import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-zinc-900">
      <View className="p-4 pt-12">
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-4 overflow-hidden shadow-lg shadow-black/50">
            <Image
              source={{ uri: 'https://picsum.photos/400/400' }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-3xl font-bold mb-2 text-white">Alex Johnson</Text>
          <Text className="text-zinc-400 text-lg mb-2">@alex_recovery</Text>
          <View className="bg-green-500/20 px-4 py-2 rounded-full">
            <Text className="text-green-400 font-semibold">30 Days Clean 🎉</Text>
          </View>
        </View>

        {/* Testing Buttons */}
        <View className="flex-row justify-around mb-6">
          <TouchableOpacity 
            className="bg-blue-500 py-3 px-6 rounded-xl"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-white font-bold">Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-green-500 py-3 px-6 rounded-xl"
            onPress={() => router.push('/login')}
          >
            <Text className="text-white font-bold">Login</Text>
          </TouchableOpacity>
        </View>

        {/* Recovery Stats */}
        <View className="bg-zinc-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold mb-4 text-white">Recovery Progress</Text>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-500">30</Text>
              <Text className="text-zinc-400 text-center">Days Clean</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-purple-400">$450</Text>
              <Text className="text-zinc-400 text-center">Money Saved</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-blue-400">12</Text>
              <Text className="text-zinc-400 text-center">Goals Met</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View className="bg-zinc-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold mb-4 text-white">Recent Achievements</Text>
          <View className="space-y-4">
            <View className="flex-row items-center py-2">
              <View className="w-12 h-12 bg-amber-500/20 rounded-full items-center justify-center mr-4">
                <Text className="text-amber-400 text-xl">🏆</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base mb-1">30 Day Milestone</Text>
                <Text className="text-zinc-400 text-sm">Completed your first month!</Text>
              </View>
            </View>
            <View className="flex-row items-center py-2">
              <View className="w-12 h-12 bg-green-500/20 rounded-full items-center justify-center mr-4">
                <Text className="text-green-400 text-xl">💰</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base mb-1">$500 Saved</Text>
                <Text className="text-zinc-400 text-sm">Money saved from staying clean</Text>
              </View>
            </View>
            <View className="flex-row items-center py-2">
              <View className="w-12 h-12 bg-purple-500/20 rounded-full items-center justify-center mr-4">
                <Text className="text-purple-400 text-xl">🎯</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base mb-1">Goal Achiever</Text>
                <Text className="text-zinc-400 text-sm">Completed 12 recovery goals</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Motivation Style */}
        <View className="bg-zinc-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold mb-4 text-white">Motivation Style</Text>
          <View className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">🌟</Text>
                <View>
                  <Text className="text-white font-semibold">Supportive Guide</Text>
                  <Text className="text-zinc-400 text-sm">Gentle encouragement</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-green-400 font-semibold">Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View className="bg-zinc-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold mb-4 text-white">Account Settings</Text>
          <View className="space-y-1">
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="person-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="shield-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Privacy & Security</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recovery Settings */}
        <View className="bg-zinc-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold mb-4 text-white">Recovery Settings</Text>
          <View className="space-y-1">
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Pledge Reminders</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="people-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Accountability Partners</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="cash-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Financial Stakes</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="heart-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Support Network</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Settings */}
        <View className="bg-zinc-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold mb-4 text-white">App Settings</Text>
          <View className="space-y-1">
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="moon-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Theme</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-zinc-400 mr-2">Dark</Text>
                <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="language-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">Language</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-zinc-400 mr-2">English</Text>
                <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center">
                <Ionicons name="information-circle-outline" size={24} color="#a1a1aa" />
                <Text className="text-white ml-3">About & Help</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          className="bg-zinc-800/50 border border-zinc-700 rounded-2xl py-4 mb-6 flex-row items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text className="text-red-500 font-semibold ml-2">Logout</Text>
        </TouchableOpacity>

        {/* Emergency Support */}
        <View className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-8">
          <View className="flex-row items-center mb-3">
            <Ionicons name="medical-outline" size={24} color="#ef4444" />
            <Text className="text-red-400 font-bold text-lg ml-3">Emergency Support</Text>
          </View>
          <Text className="text-zinc-300 mb-4">Need immediate help? Access crisis resources and emergency contacts.</Text>
          <TouchableOpacity className="bg-red-500 rounded-xl py-3 px-6">
            <Text className="text-white font-bold text-center">Get Help Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
} 