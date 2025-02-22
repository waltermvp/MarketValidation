import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

import { Image } from './ui';

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
    console.log(item.image, 'item');
    return (
      <View
        className={`item-center otherSm:h-100 m-2.5 flex-1 flex-col self-center rounded-lg  bg-[#1c1c1c] p-3.5 text-white shadow-md `}
      >
        <View className="flex-1">
          <Text style={styles.cardTitle} className="text-3xl">
            {item.title}
          </Text>
          <Text style={styles.cardContent} className="text-lg">
            {item.content}
          </Text>
        </View>
        <View className="flex-1 items-center pt-16">
          <Image
            source={item.image}
            className="aspect-square size-32 lg:size-64 "
            contentFit="contain"
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerClassName="items-center"
      ListHeaderComponent={
        <Text className="px-3 text-3xl text-white">{title}</Text>
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
});

export default CardComponent;
