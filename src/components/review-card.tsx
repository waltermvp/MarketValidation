import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import { type Review } from '@/api';
import { Text, View } from '@/components/ui';
type Props = Review;

export const ReviewCard = ({ id, rating = 2, comment, name }: Props) => {
  return (
    <View
      key={id}
      className="h-[220px] w-[175px]  overflow-hidden  rounded-xl border border-neutral-300  bg-white dark:bg-neutral-900"
    >
      <View className="px-2 pt-2">
        <View className="mb-2">
          <Text className="font-bold leading-snug text-gray-600">{name}</Text>
          <View className="flex-row items-center ">
            {/* Iterate over the rating and draw an Ionicon for each value */}
            {Array.from({ length: rating }, (_, index) => (
              <Ionicons
                className="mr-1"
                key={index}
                name="star"
                size={22}
                color="gold"
              />
            ))}
          </View>
        </View>

        <Text numberOfLines={5} className=" leading-snug text-gray-600">
          {comment}
        </Text>
      </View>
    </View>
  );
};
