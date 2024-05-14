import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ClearHistoryButton from './ClearHistoryButton'
import noCoverImage from '../assets/no-cover.jpg';

const RecentlyViewedBooks = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getRecentlyViewedBooks = async () => {
      const history = await AsyncStorage.getItem('recentlyViewedBooks');
      if (history) {
        setRecentlyViewed(JSON.parse(history));
      }
    };

    getRecentlyViewedBooks();
  }, [recentlyViewed]); 



  const handleClick = (book) => {
    navigation.navigate('Book', { book });
  };

  return (
    <ScrollView className="p-4 mt-5">
      <View className="flex flex-row flex-wrap justify-between">
        {recentlyViewed.map(book => (
          <TouchableWithoutFeedback key={book.id} onPress={() => handleClick(book)}>
            <View className="w-1/2 mb-4 px-2">
              <View className="rounded-lg overflow-hidden">
                <Image
                  source={book.volumeInfo.imageLinks?.thumbnail ? { uri: book.volumeInfo.imageLinks.thumbnail } : noCoverImage}
                  style={{ width: '100%', height: 230, resizeMode: 'cover' }}
                  className="rounded-lg"
                />
              </View>
              <View className="mt-2">
                <Text className="text-neutral-400 ml-1">
                  {
                    book.volumeInfo.title.length > 26 ? book.volumeInfo.title.slice(0,26) + '...' :  book.volumeInfo.title
                  }
                </Text>
    
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      {recentlyViewed.length === 0 && (
        <Text className="text-center mt-4 text-color-blanco">No hay libros vistos recientemente.</Text>
      )}
    </ScrollView>
  );
};

export default RecentlyViewedBooks;
