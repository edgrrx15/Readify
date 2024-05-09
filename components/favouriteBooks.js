import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableWithoutFeedback, Image, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import noCoverImage from '../assets/no-cover.jpg';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window')

const BookCard = ({ item, handleClick }) => (
  <View>
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={
          item.volumeInfo.imageLinks?.thumbnail
            ? { uri: item.volumeInfo.imageLinks.thumbnail }
            : noCoverImage
        }
        style={
            {
            width: width * 0.6,
            height: height * 0.4,
            resizeMode: 'cover'
          }}
        className='rounded'
      />
    </TouchableWithoutFeedback>

    <Text className='font-extrabold text-white text-lg pt-1'>
      {item.volumeInfo.title.length > 22 ? item.volumeInfo.title.slice(0, 22) + '...' : item.volumeInfo.title}
    </Text>
  </View>
);

const FavouriteBooks = ({title}) => {
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();

  // Cargar favoritos de AsyncStorage al montar el componente
  useEffect(() => {
    const loadFavourites = async () => {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
    };

    loadFavourites();
  }, []);

  // Función para manejar clic en un libro
  const handleClick = (item) => {
    navigation.navigate('Book', { book: item });
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#181818' }}>
        <Text>{title}</Text>
      {favourites.length > 0 ? (
       <Carousel
       data={favourites}
       renderItem={({ item }) => <BookCard item={item} />}
       firstItem={4}
       inactiveSlideOpacity={0.60}
       sliderWidth={width}
       itemWidth={width * 0.62}
     />
      ) : (
        <View />
      )}
    </View>
  );
};

export default FavouriteBooks;
