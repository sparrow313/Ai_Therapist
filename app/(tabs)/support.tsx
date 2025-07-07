import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AccountabilityScreen() {
  const [hasPartner, setHasPartner] = useState(false);
  const [currentStake, setCurrentStake] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [todaysPledgeTaken, setTodaysPledgeTaken] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleFindPartner = () => {
    Alert.alert(
      'Finding Partner',
      'Searching for accountability partners in your area...',
      [{ text: 'OK', onPress: () => setHasPartner(true) }]
    );
  };

  const handleStakeMoney = (amount: number, days: number) => {
    setCurrentStake(amount);
    setDaysRemaining(days);
    Alert.alert(
      'Stake Confirmed',
      `You've staked $${amount} for ${days} days. Remember to take your daily pledge!`,
      [{ text: 'Got it!' }]
    );
  };

  const handleDailyPledge = () => {
    if (todaysPledgeTaken) {
      Alert.alert('Already Done', 'You&apos;ve already taken today&apos;s pledge!');
      return;
    }
    
    Alert.alert(
      'Daily Pledge',
      'Do you confirm that you have stayed committed to your recovery today?',
      [
        { text: 'Yes, I stayed strong', onPress: () => {
          setTodaysPledgeTaken(true);
          setStreak(streak + 1);
          setDaysRemaining(Math.max(0, daysRemaining - 1));
          Alert.alert('Great job!', 'Your pledge has been recorded. Keep going!');
        }},
        { text: 'I need support', onPress: () => {
          Alert.alert('Support Available', 'Your accountability partner has been notified. Stay strong!');
        }}
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-5 pt-10 pb-20">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-white mb-2">Accountability</Text>
          <Text className="text-gray-400">Stay committed with financial stakes</Text>
        </View>

        {/* Current Status */}
        {currentStake > 0 && (
          <View className="bg-zinc-900 rounded-2xl p-5 mb-6 shadow-lg shadow-black/50">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-white">Active Stake</Text>
              <Text className="text-2xl font-bold text-green-400">${currentStake}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-gray-400">Days Remaining</Text>
                <Text className="text-white font-bold">{daysRemaining}</Text>
              </View>
              <View>
                <Text className="text-gray-400">Current Streak</Text>
                <Text className="text-white font-bold">{streak} days</Text>
              </View>
            </View>
            
            {/* Daily Pledge Button */}
            <TouchableOpacity
              onPress={handleDailyPledge}
              className={`rounded-xl p-4 ${todaysPledgeTaken ? 'bg-green-900/50' : 'bg-blue-600'}`}
              disabled={todaysPledgeTaken}
            >
              <Text className="text-white font-bold text-center">
                {todaysPledgeTaken ? "✓ Today's Pledge Completed" : "Take Today's Pledge"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Partner Status */}
        <View className="bg-zinc-900 rounded-2xl p-5 mb-6 shadow-lg shadow-black/50">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-purple-900/30 items-center justify-center mr-3">
              <Text className="text-2xl">🤝</Text>
            </View>
            <Text className="text-xl font-bold text-white">Accountability Partner</Text>
          </View>
          
          {hasPartner ? (
            <View>
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 rounded-full bg-green-500 items-center justify-center mr-3">
                  <Text className="text-white font-bold">A</Text>
                </View>
                <View>
                  <Text className="text-white font-bold">Alex Johnson</Text>
                  <Text className="text-gray-400">Online • 2 days streak</Text>
                </View>
              </View>
              <Text className="text-gray-400 mb-4">
                Your partner is also committed to recovery and will receive your stake if you miss daily pledges.
              </Text>
              <TouchableOpacity className="bg-gray-700 rounded-xl p-3">
                <Text className="text-white font-bold text-center">Send Message</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text className="text-gray-400 mb-4">
                Find someone who shares your commitment to recovery and will help keep you accountable.
              </Text>
              <TouchableOpacity 
                onPress={handleFindPartner}
                className="bg-purple-600 rounded-xl p-3"
              >
                <Text className="text-white font-bold text-center">Find Accountability Partner</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Staking Options */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-white mb-4">Commitment Stakes</Text>
          <Text className="text-gray-400 mb-4">
            Put money on the line to strengthen your commitment. If you miss daily pledges, your stake goes to your partner.
          </Text>
          
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity 
              onPress={() => handleStakeMoney(10, 7)}
              className="bg-zinc-900 rounded-xl p-4 flex-1 mr-2 shadow-lg shadow-black/50"
              disabled={!hasPartner}
            >
              <Text className="text-white font-bold text-center mb-2">$10</Text>
              <Text className="text-gray-400 text-center text-sm">7 days</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleStakeMoney(25, 14)}
              className="bg-zinc-900 rounded-xl p-4 flex-1 mx-1 shadow-lg shadow-black/50"
              disabled={!hasPartner}
            >
              <Text className="text-white font-bold text-center mb-2">$25</Text>
              <Text className="text-gray-400 text-center text-sm">14 days</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleStakeMoney(50, 30)}
              className="bg-zinc-900 rounded-xl p-4 flex-1 ml-2 shadow-lg shadow-black/50"
              disabled={!hasPartner}
            >
              <Text className="text-white font-bold text-center mb-2">$50</Text>
              <Text className="text-gray-400 text-center text-sm">30 days</Text>
            </TouchableOpacity>
          </View>
          
          {!hasPartner && (
            <Text className="text-gray-500 text-center text-sm">
              Find an accountability partner first to enable staking
            </Text>
          )}
        </View>

        {/* How it Works */}
        <View className="bg-zinc-900 rounded-2xl p-5 mb-6 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold text-white mb-4">How It Works</Text>
          
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <View className="w-6 h-6 rounded-full bg-blue-600 items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">1</Text>
              </View>
              <Text className="text-gray-200">Find an accountability partner</Text>
            </View>
            <Text className="text-gray-400 text-sm ml-9">Connect with someone committed to recovery</Text>
          </View>
          
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <View className="w-6 h-6 rounded-full bg-blue-600 items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">2</Text>
              </View>
              <Text className="text-gray-200">Choose your stake amount</Text>
            </View>
            <Text className="text-gray-400 text-sm ml-9">Put money on the line for your commitment</Text>
          </View>
          
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <View className="w-6 h-6 rounded-full bg-blue-600 items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
              <Text className="text-gray-200">Take daily pledges</Text>
            </View>
            <Text className="text-gray-400 text-sm ml-9">Confirm your commitment every day</Text>
          </View>
          
          <View>
            <View className="flex-row items-center mb-2">
              <View className="w-6 h-6 rounded-full bg-red-600 items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">!</Text>
              </View>
              <Text className="text-gray-200">Miss pledges = lose stake</Text>
            </View>
            <Text className="text-gray-400 text-sm ml-9">Your partner receives the money if you don&apos;t check in</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="bg-zinc-900 rounded-2xl p-5 shadow-lg shadow-black/50">
          <Text className="text-xl font-bold text-white mb-4">Your Stats</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-400">$0</Text>
              <Text className="text-gray-400 text-sm">Total Earned</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-red-400">$0</Text>
              <Text className="text-gray-400 text-sm">Total Lost</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">{streak}</Text>
              <Text className="text-gray-400 text-sm">Best Streak</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

