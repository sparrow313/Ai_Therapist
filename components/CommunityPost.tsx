import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Colors from '../constants/Colors';

interface CommunityPostProps {
  userInitials: string;
  userName: string;
  timeAgo: string;
  soberDays: number;
  content: string;
  likes: number;
  supports: number;
  comments: number;
  userColor: string;
  isDetailView?: boolean;
}

const CommunityPost = ({
  userInitials,
  userName,
  timeAgo,
  soberDays,
  content,
  likes,
  supports,
  comments,
  userColor,
  isDetailView = false
}: CommunityPostProps) => {
  const router = useRouter();

  const getSoberBadge = (days: number) => {
    if (days >= 90) return `${days} days sober 🏆`;
    if (days >= 30) return `${days} days sober ⭐`;
    return `${days} days sober 🎉`;
  };

  const handlePress = () => {
    if (!isDetailView) {
      router.push({
        pathname: '/post/[id]',
        params: { id: userName.toLowerCase().replace(' ', '-') }
      });
    }
  };

  return (
    <Pressable 
      className="rounded-2xl shadow-lg shadow-black/50 p-5 mb-4"
      style={{
        backgroundColor: Colors.background.elevated,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)'
      }}
      onPress={handlePress}
      disabled={isDetailView}
    >
      <View className="flex-row items-center mb-3">
        <View className={`w-12 h-12 rounded-full ${userColor} mr-3 items-center justify-center`}>
          <Text className="text-lg">{userInitials}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text style={{ color: Colors.text.primary }} className="font-bold">
              {userName}
            </Text>
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}>
              <Text style={{ color: Colors.brand.primary }} className="text-sm font-medium">
                {getSoberBadge(soberDays)}
              </Text>
            </View>
          </View>
          <Text style={{ color: Colors.text.secondary }} className="text-sm">
            {timeAgo}
          </Text>
        </View>
      </View>
      <Text style={{ color: Colors.text.secondary }} className="leading-relaxed mb-4">
        {content}
      </Text>
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <Pressable className="flex-row items-center mr-6" onPress={(e) => e.stopPropagation()}>
            <Text className="mr-1">👍</Text>
            <Text style={{ color: Colors.text.secondary }}>{likes}</Text>
          </Pressable>
          <Pressable className="flex-row items-center mr-6" onPress={(e) => e.stopPropagation()}>
            <Text className="mr-1">💪</Text>
            <Text style={{ color: Colors.text.secondary }}>{supports}</Text>
          </Pressable>
          <Pressable className="flex-row items-center" onPress={(e) => e.stopPropagation()}>
            <Text className="mr-1">💬</Text>
            <Text style={{ color: Colors.text.secondary }}>{comments} comments</Text>
          </Pressable>
        </View>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Text style={{ color: Colors.text.secondary }}>⋮</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default CommunityPost; 