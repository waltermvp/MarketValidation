import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Text, UIManager } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { TouchableOpacity, View } from '@/components/ui';

export type FAQItem = {
  question: string;
  answer: string;
};

// eslint-disable-next-line max-lines-per-function
export const FAQ = ({
  faqItems,
  title,
}: {
  faqItems: FAQItem[];
  title: string;
}) => {
  const [collapsedIndex, setCollapsedIndex] = useState<null | number>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animatedHeights = faqItems.map(() => useSharedValue(0));

  const answerRefs = useRef<(Text | null)[]>([]);

  const toggleCollapse = (index: number) => {
    if (collapsedIndex === index) {
      setCollapsedIndex(null);
      animatedHeights[index].value = 0;
    } else {
      if (collapsedIndex !== null) {
        animatedHeights[collapsedIndex].value = 0;
      }
      setCollapsedIndex(index);
      UIManager.measure(
        answerRefs.current[index] as any,
        // eslint-disable-next-line max-params
        (x, y, width, height) => {
          animatedHeights[index].value = height;
        }
      );
    }
    setIsCollapsed(collapsedIndex === index ? !isCollapsed : true);
  };

  const animatedStyles = (index: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedStyle(() => {
      return {
        height: withTiming(animatedHeights[index].value),
      };
    });

  return (
    <View>
      <Text className="p-3 pl-0 font-netflix-medium text-2xl !text-neutral-100 sm:text-4xl">
        {title}
      </Text>
      {faqItems.map((item, index) => (
        <View
          className="overflow-hidden border-b-2 bg-charcoal-850"
          key={index}
        >
          <TouchableOpacity
            className={`flex-row justify-between p-2 ${hoveredIndex === index ? 'bg-gray-700' : 'bg-gray-800'}`}
            onPress={() => toggleCollapse(index)}
            //@ts-ignore
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Text className="text-2xl text-white">{item.question}</Text>
            <Ionicons
              color="white"
              size={32}
              name={collapsedIndex !== index ? 'add' : 'close'}
            />
          </TouchableOpacity>
          <Animated.View style={[animatedStyles(index)]}>
            <Text
              className="p-2 text-lg text-white"
              ref={(ref) => (answerRefs.current[index] = ref)}
            >
              {item.answer}
            </Text>
          </Animated.View>
        </View>
      ))}
    </View>
  );
};
