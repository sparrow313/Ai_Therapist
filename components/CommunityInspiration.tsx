import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";

interface CommunityPost {
  username: string;
  days: number;
  timePosted: string;
  content: string;
  likes: number;
  comments: number;
}

interface CommunityInspirationProps {
  post: CommunityPost;
  onViewAll?: () => void;
  onLike?: () => void;
  onComment?: () => void;
}

export default function CommunityInspiration({
  post,
  onViewAll,
  onLike,
  onComment,
}: CommunityInspirationProps) {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text
          style={{ color: Colors.text.primary }}
          className="text-lg font-medium"
        >
          Community inspiration
        </Text>
        <Pressable onPress={onViewAll}>
          <Text style={{ color: Colors.brand.primary }}>View all</Text>
        </Pressable>
      </View>

      <View
        className="rounded-2xl shadow-lg shadow-black/50 p-5 mb-4"
        style={{
          backgroundColor: Colors.background.elevated,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.03)",
        }}
      >
        <View className="flex-row items-center mb-3">
          <View className="w-12 h-12 rounded-full bg-green-900/30 mr-3 items-center justify-center">
            <Text className="text-lg">👤</Text>
          </View>
          <View>
            <Text
              style={{ color: Colors.text.primary }}
              className="font-bold"
            >
              {post.username}
            </Text>
            <Text
              style={{ color: Colors.text.secondary }}
              className="text-sm"
            >
              Day {post.days} • {post.timePosted}
            </Text>
          </View>
        </View>
        <Text
          style={{ color: Colors.text.secondary }}
          className="leading-relaxed"
        >
          {post.content}
        </Text>
        <View className="flex-row mt-4">
          <Pressable 
            onPress={onLike}
            className="flex-row items-center mr-6"
          >
            <Text className="mr-1">❤️</Text>
            <Text style={{ color: Colors.text.secondary }}>{post.likes}</Text>
          </Pressable>
          <Pressable 
            onPress={onComment}
            className="flex-row items-center"
          >
            <Text className="mr-1">💬</Text>
            <Text style={{ color: Colors.text.secondary }}>
              {post.comments} comments
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
} 