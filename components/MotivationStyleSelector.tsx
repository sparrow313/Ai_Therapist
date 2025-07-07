import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import Colors from '../constants/Colors';

export type MotivationStyle = 'positive' | 'goal-oriented' | 'tough-love';

interface Props {
  currentStyle: MotivationStyle;
  onStyleChange: (style: MotivationStyle) => void;
}

export default function MotivationStyleSelector({ currentStyle, onStyleChange }: Props) {
  const [showToughLoveConsent, setShowToughLoveConsent] = useState(false);

  const handleStyleSelect = (style: MotivationStyle) => {
    if (style === 'tough-love') {
      setShowToughLoveConsent(true);
      Alert.alert(
        'Intense Motivation Style',
        'This style uses strong, challenge-based language. It focuses on accountability and commitment. While never insulting, it can be intense.\n\nAre you sure you want to enable this style?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Enable',
            style: 'destructive',
            onPress: () => {
              onStyleChange(style);
              setShowToughLoveConsent(false);
            }
          }
        ]
      );
    } else {
      onStyleChange(style);
    }
  };

  const styles = [
    {
      id: 'positive' as MotivationStyle,
      title: 'Supportive Guide',
      icon: '🌟',
      description: 'Gentle encouragement and positive affirmations'
    },
    {
      id: 'goal-oriented' as MotivationStyle,
      title: 'Achievement Coach',
      icon: '🎯',
      description: 'Focus on goals, progress, and milestones'
    },
    {
      id: 'tough-love' as MotivationStyle,
      title: 'High Accountability',
      icon: '💪',
      description: 'Strong, challenge-based motivation'
    }
  ];

  return (
    <View className="flex flex-col gap-4">
      {styles.map((style) => (
        <Pressable
          key={style.id}
          onPress={() => handleStyleSelect(style.id)}
          className={`p-4 rounded-2xl ${
            currentStyle === style.id ? 'border-2 border-green-500' : 'border border-zinc-700'
          }`}
          style={{ backgroundColor: Colors.background.elevated }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Text className="text-2xl mr-3">{style.icon}</Text>
              <View className="flex-1">
                <Text style={{ color: Colors.text.primary }} className="font-bold text-lg">
                  {style.title}
                </Text>
                <Text style={{ color: Colors.text.secondary }} className="text-sm">
                  {style.description}
                </Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full border-2 items-center justify-center"
              style={{ 
                borderColor: currentStyle === style.id ? Colors.brand.primary : Colors.text.tertiary,
                backgroundColor: currentStyle === style.id ? Colors.brand.primary : 'transparent'
              }}
            >
              {currentStyle === style.id && (
                <Text className="text-white text-sm">✓</Text>
              )}
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
} 