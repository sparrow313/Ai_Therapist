import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface PostCommentProps {
  userInitials: string;
  userName: string;
  timeAgo: string;
  content: string;
  likes: number;
  replies: number;
  userColor: string;
  isReply?: boolean;
}

const PostComment = ({
  userInitials,
  userName,
  timeAgo,
  content,
  likes,
  replies,
  userColor,
  isReply = false
}: PostCommentProps) => {
  return (
    <View className={`${isReply ? 'ml-12' : ''} mb-4`}>
      <View className="flex-row items-start">
        <View className={`w-8 h-8 rounded-full ${userColor} mr-3 items-center justify-center`}>
          <Text className="text-sm">{userInitials}</Text>
        </View>
        <View className="flex-1">
          <View className="bg-zinc-900 rounded-xl p-3 shadow-lg shadow-black/50">
            <View className="flex-row items-center mb-1">
              <Text className="font-bold text-gray-200 mr-2">{userName}</Text>
              <Text className="text-gray-400 text-xs">{timeAgo}</Text>
            </View>
            <Text className="text-gray-400">{content}</Text>
          </View>
          <View className="flex-row items-center mt-2 space-x-4">
            <Pressable className="flex-row items-center">
              <Text className="mr-1">👍</Text>
              <Text className="text-gray-400 text-sm">{likes}</Text>
            </Pressable>
            {!isReply && (
              <Pressable>
                <Text className="text-gray-400 text-sm">Reply</Text>
              </Pressable>
            )}
            {!isReply && replies > 0 && (
              <Pressable>
                <Text className="text-gray-400 text-sm">{replies} replies</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostComment; 