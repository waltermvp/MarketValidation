import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text, TouchableOpacity, View } from '@/components/ui';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'What is Netflix?',
    answer: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!`,
  },
  { question: 'How much does Netflix cost?', answer: '...' },
  { question: 'Where can I watch?', answer: '...' },
  { question: 'How do I cancel?', answer: '...' },
  { question: 'What can I watch on Netflix?', answer: '...' },
  { question: 'Is Netflix good for kids?', answer: '...' },
];

export const FAQ = () => {
  const [collapsedIndex, setCollapsedIndex] = useState<null | number>(null);
  const isCollapsed = useSharedValue(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isCollapsed.value ? 0 : 100),
      marginBottom: 40,
      // overflow: 'hidden',
    };
  });

  const toggleCollapse = () => {
    setCollapsedIndex(collapsedIndex === null ? 0 : null);
    isCollapsed.value = !isCollapsed.value;
  };

  return (
    <View>
      <Text className="p-3 text-3xl !text-white">
        Frequently Asked Questions
      </Text>
      {faqData.map((item, index) => (
        <View className="border-b-2 bg-charcoal-850" key={index}>
          <TouchableOpacity
            className="flex-row justify-between p-2"
            onPress={toggleCollapse}
          >
            <Text className="text-2xl text-white">{item.question}</Text>
            <Ionicons
              color="white"
              size={32}
              name={collapsedIndex !== index ? 'add' : 'close'}
            />
          </TouchableOpacity>
          {collapsedIndex === index && (
            <Animated.View style={[animatedStyle]}>
              <Text className=" p-2 text-lg text-white">{item.answer}</Text>
            </Animated.View>
          )}
        </View>
      ))}
    </View>
  );
};
