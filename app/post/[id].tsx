import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import CommunityPost from '../../components/CommunityPost';
import PostComment from '../../components/PostComment';

interface PostData {
  userInitials: string;
  userName: string;
  timeAgo: string;
  soberDays: number;
  content: string;
  likes: number;
  supports: number;
  comments: number;
  userColor: string;
  type: 'experience' | 'skill';
}

const PostDetail = () => {
  const { id } = useLocalSearchParams();
  const [newComment, setNewComment] = useState('');

  // Mock data - in real app, fetch based on id
  const post: PostData = {
    userInitials: 'JD',
    userName: 'John Doe',
    timeAgo: '2 hours ago',
    soberDays: 7,
    content: "Just completed my first week without smoking! The urges are still there, but the support from this community has been incredible. Thank you all for the encouragement! 🎉",
    likes: 24,
    supports: 18,
    comments: 8,
    userColor: 'bg-blue-200 dark:bg-blue-800',
    type: 'experience'
  };

  const comments = [
    {
      userInitials: 'SM',
      userName: 'Sarah Miller',
      timeAgo: '1 hour ago',
      content: "Congratulations! The first week is the hardest, you've got this! 💪",
      likes: 12,
      replies: 2,
      userColor: 'bg-purple-200 dark:bg-purple-800',
      replies_list: [
        {
          userInitials: 'JD',
          userName: 'John Doe',
          timeAgo: '45 mins ago',
          content: "Thank you so much Sarah! Your support means a lot! 🙏",
          likes: 5,
          replies: 0,
          userColor: 'bg-blue-200 dark:bg-blue-800'
        }
      ]
    },
    {
      userInitials: 'MK',
      userName: 'Mike Kennedy',
      timeAgo: '30 mins ago',
      content: "Remember to take it one day at a time. We're all here for you!",
      likes: 8,
      replies: 0,
      userColor: 'bg-amber-200 dark:bg-amber-800'
    }
  ];

  return (
    <>
      <View className="flex-1 bg-black">
        <ScrollView className="flex-1">
          <View className="p-5">
            <CommunityPost {...post} isDetailView />
            
            {/* Comments Section */}
            <View className="mt-6">
              <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Comments ({comments.length})
              </Text>
              
              {comments.map((comment, index) => (
                <View key={index}>
                  <PostComment {...comment} />
                  {comment.replies_list?.map((reply, replyIndex) => (
                    <PostComment key={`${index}-${replyIndex}`} {...reply} isReply />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Comment Input */}
        <View className="p-4 border-t border-gray-200 dark:border-gray-800 bg-zinc-900">
          <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
            <TextInput
              className="flex-1 text-gray-700 dark:text-gray-300"
              placeholder="Write a comment..."
              placeholderTextColor="#9CA3AF"
              value={newComment}
              onChangeText={setNewComment}
            />
            <Pressable 
              className="ml-2 bg-green-500 rounded-full p-2"
              onPress={() => {
                // Handle comment submission
                setNewComment('');
              }}
            >
              <Text className="text-white">📤</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default PostDetail; 