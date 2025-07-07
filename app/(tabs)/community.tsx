import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import CommunityPost from '../../components/CommunityPost';
import Colors from '../../constants/Colors';

const Community = () => {
  const posts = [
    {
      userInitials: 'JD',
      userName: 'John Doe',
      timeAgo: '2 hours ago',
      soberDays: 7,
      content: "Just completed my first week without smoking! The urges are still there, but the support from this community has been incredible. Thank you all for the encouragement! 🎉",
      likes: 24,
      supports: 18,
      comments: 8,
      userColor: 'bg-blue-900/30'
    },
    {
      userInitials: '👤',
      userName: 'Sarah Miller',
      timeAgo: '5 hours ago',
      soberDays: 30,
      content: "Found a great meditation app that&apos;s helping me manage cravings. Would anyone be interested in starting a meditation challenge together? We could do 10 minutes daily for a week! 🧘‍♀️",
      likes: 42,
      supports: 15,
      comments: 12,
      userColor: 'bg-purple-900/30'
    },
    {
      userInitials: 'MK',
      userName: 'Mike Kennedy',
      timeAgo: '8 hours ago',
      soberDays: 90,
      content: "Hit the 90-day mark today! Never thought I&apos;d make it this far. My advice to everyone starting out: take it one day at a time, and don&apos;t be afraid to lean on this amazing community. You&apos;ve all been my rock! 💪",
      likes: 87,
      supports: 56,
      comments: 23,
      userColor: 'bg-amber-900/30'
    }
  ];

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: Colors.background.primary }}>
      <View className="px-5 pt-10 pb-20">
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text style={{ color: Colors.text.primary }} className="text-4xl font-bold mb-2">Community</Text>
            <Text style={{ color: Colors.text.secondary }}>Connect, share, and grow together</Text>
          </View>
          <Pressable 
            className="w-11 h-11 rounded-full items-center justify-center shadow-lg shadow-black/50" 
            style={{ 
              backgroundColor: Colors.background.elevated,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.03)'
            }}
          >
            <Text className="text-lg">✏️</Text>
          </Pressable>
        </View>

        {/* Community Stats */}
        <View className="flex-row justify-between mb-8">
          {['Members', 'Posts', 'Online'].map((label, index) => (
            <View 
              key={index}
              className="w-[31%] rounded-2xl p-4 shadow-lg shadow-black/50"
              style={{ 
                backgroundColor: Colors.background.elevated,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.03)'
              }}
            >
              <Text className="text-3xl text-center mb-2">
                {index === 0 ? '👥' : index === 1 ? '💬' : '🎯'}
              </Text>
              <Text style={{ color: Colors.text.primary }} className="text-center text-2xl font-bold">
                {index === 0 ? '2.4k' : index === 1 ? '856' : '142'}
              </Text>
              <Text style={{ color: Colors.text.secondary }} className="text-center">
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* Community Posts */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text style={{ color: Colors.text.primary }} className="text-lg font-medium">Recent Posts</Text>
            <Pressable 
              className="py-2 px-4 rounded-xl shadow-lg shadow-green-900/20" 
              style={{ backgroundColor: Colors.brand.primary }}
            >
              <Text className="text-white font-medium">New Post</Text>
            </Pressable>
          </View>

          {posts.map((post, index) => (
            <CommunityPost key={index} {...post} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Community;

