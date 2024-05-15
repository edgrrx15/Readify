import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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

  const ClearHistory = async () => {
    try {
      await AsyncStorage.removeItem('recentlyViewedBooks');
      setRecentlyViewed([]);
      navigation.navigate('History');
    } catch (error) {
      console.error('Error al borrar el historial:', error);
    }
  }

  const handleClick = (book) => {
    navigation.navigate('Book', { book });
  };

  return (
    <ScrollView className="p-4 bg-gray-900">
      

      {recentlyViewed.length > 0 ? (
          <TouchableOpacity onPress={ClearHistory}>
                <Text className='text-red-400 text-lg font-bold  p-3 rounded-md right-0'>Limpiar historial</Text>
          </TouchableOpacity>
        ) : null
      }

      <View className="flex flex-row flex-wrap justify-between mt-3 mb-6">
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
        <View className='flex-1 justify-center items-center -mt-8'>
           <Text className="text-color-blanco text-lg">No hay libros vistos recientemente</Text>
         </View>

      )}
    </ScrollView>
  );
};

export default RecentlyViewedBooks;
