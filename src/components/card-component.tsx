import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { translate } from '@/lib';

import { Image, Text } from './ui';

type CardItem = {
  title: string;
  content: string;
  image: number;
};

const CardComponent = ({
  title,
  items,
}: {
  title: string;
  items: CardItem[];
}) => {
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get('window').width;
      setNumColumns(width < 575 ? 1 : width >= 1280 ? 4 : 2);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscription?.remove();
    };
  }, []);

  const renderItem = ({ item }: { item: CardItem }) => {
    return (
      <View
        className={`mx-2.5 flex-1 flex-col self-stretch rounded-lg bg-[#1c1c1c] p-3.5 text-white shadow-md`}
        style={styles.cardWrapper}
      >
        <Text className="text-3xl text-white">{item.title}</Text>

        <View className="flex-1 flex-row items-end">
          <Text className="self-start pt-4 text-lg text-white">
            {item.content}
          </Text>
          <Image
            source={item.image}
            className=" aspect-square size-16 lg:mb-8 lg:size-24"
            contentFit="contain"
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerClassName="items-start gap-4 mt-4 -mx-5  sm:mt-8"
      ListHeaderComponent={
        <View className="flex-row items-center justify-between">
          <Text className="px-2 font-netflix-medium text-2xl !text-neutral-100 sm:text-4xl">
            {title}
            <Text className="!bg-primary-550 px-1 font-netflix-medium text-2xl sm:text-4xl">
              {translate('home.signUp')}
            </Text>
          </Text>
        </View>
      }
      key={numColumns}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.cardContainer}
      numColumns={numColumns} // Adjust number of columns based on screen width
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#1c1c1c',
    color: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 15,
    flex: 1,
    maxWidth: '45%', // Adjust width as needed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardImage: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: 150,
    height: 'auto',
    // height: 50,
    aspectRatio: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    // borderRadius: 8,
    bottom: 8,
    right: 8,
  },
  cardTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: 'white',
  },
  cardContent: {
    paddingRight: 50,
    fontSize: 14,
    color: 'white',
  },
  fullWidth: {
    maxWidth: '100%', // Make the card take the full width when numColumns is 1
  },
  cardWrapper: {
    minHeight: 400, // Add a fixed minimum height
    height: '100%', // Make sure it fills the available space
  },
});

export default CardComponent;
