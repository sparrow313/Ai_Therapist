import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import Colors from "../constants/Colors";

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Happy", color: "bg-green-500" },
  { emoji: "😌", label: "Calm", color: "bg-blue-500" },
  { emoji: "😕", label: "Meh", color: "bg-yellow-500" },
  { emoji: "😢", label: "Sad", color: "bg-purple-500" },
  { emoji: "😠", label: "Angry", color: "bg-red-500" },
  { emoji: "😰", label: "Anxious", color: "bg-orange-500" },
];

interface MoodLogModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (mood: { emoji: string; label: string; note: string }) => void;
}

export default function MoodLogModal({
  visible,
  onClose,
  onSave,
}: MoodLogModalProps) {
  const [selectedMood, setSelectedMood] = useState<{
    emoji: string;
    label: string;
  } | null>(null);
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (selectedMood) {
      onSave({
        emoji: selectedMood.emoji,
        label: selectedMood.label,
        note,
      });
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View
          className="rounded-t-3xl p-6"
          style={{ backgroundColor: Colors.background.elevated }}
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text
              style={{ color: Colors.text.primary }}
              className="text-xl font-bold"
            >
              How are you feeling?
            </Text>
            <Pressable onPress={onClose}>
              <Text style={{ color: Colors.text.secondary }}>✕</Text>
            </Pressable>
          </View>

          <View className="flex-row flex-wrap justify-between mb-6">
            {MOOD_OPTIONS.map((mood) => (
              <Pressable
                key={mood.label}
                onPress={() => setSelectedMood(mood)}
                className={`w-[31%] rounded-xl p-4 mb-4 items-center ${
                  selectedMood?.label === mood.label
                    ? mood.color
                    : "bg-gray-800/30"
                }`}
              >
                <Text className="text-2xl mb-2">{mood.emoji}</Text>
                <Text
                  style={{ color: Colors.text.primary }}
                  className="text-sm"
                >
                  {mood.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="mb-6">
            <Text
              style={{ color: Colors.text.primary }}
              className="text-base font-medium mb-2"
            >
              Add a note (optional)
            </Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="How are you feeling today?"
              placeholderTextColor={Colors.text.secondary}
              multiline
              numberOfLines={4}
              className="rounded-xl p-4 mb-2"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                color: Colors.text.primary,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.1)",
              }}
            />
          </View>

          <Pressable
            onPress={handleSave}
            disabled={!selectedMood}
            className={`rounded-xl p-4 ${
              selectedMood ? "bg-purple-500" : "bg-gray-800"
            }`}
          >
            <Text
              style={{ color: Colors.text.primary }}
              className="text-center font-bold"
            >
              Save Mood
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
