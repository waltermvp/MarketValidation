import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const CardComponent = ({ items }) => {
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get('window').width;
      setNumColumns(width < 960 ? 1 : width >= 1280 ? 4 : 2);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscription?.remove();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.card, numColumns === 1 ? styles.fullWidth : {}]}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent}>{item.content}</Text>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
    </View>
  );

  return (
    <FlatList
      // contentContainerClassName="justify-center"
      ListHeaderComponent={
        <Text className="px-3 text-2xl text-white">More reasons to join</Text>
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
    // width: '100%',
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderWidth: 2,
    // position: 'absolute',
    borderColor: 'red',
    borderRadius: 8,
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
