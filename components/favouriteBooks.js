import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableWithoutFeedback, Image, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import noCoverImage from '../assets/no-cover.jpg';

const { width } = Dimensions.get('window');

const FavouriteBooks = ({ title }) => {
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavourites = async () => {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
    };

    loadFavourites();
  }, []);

  const handleClick = async (item) => {
    navigation.navigate('Book', { book: item });
    
    let history = await AsyncStorage.getItem('recentlyViewedBooks');
    history = history ? JSON.parse(history) : [];
    if (!history.find(book => book.id === item.id)) {
      history.push(item);
      await AsyncStorage.setItem('recentlyViewedBooks', JSON.stringify(history));
    }
  };
  

  return (
    <ScrollView className="p-4">
      <View className="flex flex-row flex-wrap justify-between">
        {favourites.map((book) => (
          <TouchableWithoutFeedback key={book.id} onPress={() => handleClick(book)}>
            <View className="w-1/2 mb-4 px-2">
              <View className=" rounded-lg overflow-hidden">
                <Image
                  source={book.volumeInfo.imageLinks?.thumbnail ? { uri: book.volumeInfo.imageLinks.thumbnail } : noCoverImage}
                  style={{ width: '100%', height: 230, resizeMode: 'cover' }}
                  className="rounded-lg"
                />
              </View>
              <View className="mt-2">
                <Text className="text-lg font-bold text-color-blanco">
                  {book.volumeInfo.title.length > 18 ? book.volumeInfo.title.slice(0, 18) + '...' : book.volumeInfo.title}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
        {favourites.length === 0 && (
        <Text className='text-color-blanco text-2xl m-4'>No tienes ningun libro favorito</Text>
      )}
      </View>
    </ScrollView>
  );
};

export default FavouriteBooks;
