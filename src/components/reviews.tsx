import { faker } from '@faker-js/faker';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { useAddReview, useReviews } from '@/api';

import { ReviewCard } from './review-card';
import { Button, Text, View } from './ui';

export const Reviews = () => {
  const { data, isLoading, refetch } = useReviews();
  const { mutateAsync: addReview, isPending } = useAddReview({
    onSettled() {
      refetch();
    },
    onError(error, variables, context) {
      console.log('error', error);
      console.log('variables', variables);
    },
  });

  return (
    <View className="">
      <Text className="text-2xl text-white" children="Reviews"></Text>
      <Button
        loading={isPending}
        className="bg-slate-500"
        label="Add Review"
        onPress={async () => {
          await addReview({
            name: faker.person.firstName(),
            rating: Math.floor(Math.random() * 5) + 1,
            comment: faker.lorem.paragraph(),
          });
        }}
      />

      {isLoading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <FlatList
          horizontal
          style={{ borderColor: 'red', borderWidth: 0, paddingLeft: 20 }}
          contentContainerStyle={{ gap: 20, justifyContent: 'center' }}
          // columnWrapperStyle={{ gap: 20 }}
          ListEmptyComponent={
            <View className="flex-1 ">
              <Text
                className="text-lg text-white"
                children="No reviews found"
              />
              <Button
                loading={isPending}
                className="bg-slate-500"
                label="Add Review"
                onPress={async () => {
                  await addReview({
                    name: faker.person.firstName(),
                    rating: Math.floor(Math.random() * 5) + 1,
                    comment: faker.lorem.paragraph(),
                  });
                }}
              />
            </View>
          }
          data={data}
          renderItem={({ item }) => <ReviewCard {...item} />}
        />
      )}
    </View>
  );
};
