import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image, Linking, Dimensions} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import noCoverImage from '../assets/no-cover.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const BookScreen = () => {
  const { params: { book } } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavourites = async () => {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      if (storedFavourites) {
        const favourites = JSON.parse(storedFavourites);
        const isFav = favourites.some((fav) => fav.id === book.id);
        setIsFavourite(isFav);
      }
    };

    loadFavourites();
  }, [book.id]);

  const toggleFavourite = async () => {
    const storedFavourites = await AsyncStorage.getItem('favourites');
    const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];

    if (isFavourite) {
      const newFavourites = favourites.filter((fav) => fav.id !== book.id);
      await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites));
    } else {
      favourites.push(book);
      await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
    }
    setIsFavourite(!isFavourite);
  };

  const handlePreviewClick = () => {
    if (book.volumeInfo.previewLink) {
      Linking.openURL(book.volumeInfo.previewLink);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={{ paddingBottom: 50, paddingTop: 40 }}
      className="flex-1 bg-F9F7F7"
    >
      <LinearGradient
        colors={['rgba(172, 188, 255, 0.3)', 'rgba(172, 188, 255, 1)']}
        style={{ position: 'absolute', width: 0, height: 0 }}
      />
      <View className="px-4">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-4">
            <Feather name="arrow-left" size={24} color="#2F4858" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavourite} className="p-4">
            <AntDesign name={isFavourite ? "heart" : "hearto"} size={24} color={isFavourite ? '#ff2626' : "#2F4858"} />
          </TouchableOpacity>
        </View>
        <View className="items-center mb-4">
          <Image
            source={book.volumeInfo.imageLinks?.thumbnail ? { uri: book.volumeInfo.imageLinks.thumbnail } : noCoverImage}
            style={{ width: width * 0.8, height: height * 0.5, borderRadius: 20 , borderColor: '#000'}}
            className="rounded-lg"
          />
        </View>


        <Text className="text-4xl font-bold text-gray-700 text-center mb-2">
            {book.volumeInfo.title || 'Sin título'}
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-6">
          {book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
        </Text>

        <View className="bg-white rounded-lg shadow-lg p-4 mb-4 flex flex-row flex-wrap justify-between">
        <View className="w-full md:w-1/2 lg:w-1/3 mb-4">
          <Text className="text-lg text-gray-600 text-center mb-2">
            Número de páginas: {book.volumeInfo.pageCount || 'Desconocido'}
          </Text>

          <Text className="text-lg text-gray-600 text-center mb-2">
           Categoría: <Text className='uppercase'>{book.volumeInfo.language || 'Desconocido'}</Text>
          </Text>

          <Text className="text-lg text-gray-600 text-center mb-2">
            Fecha de publicación: {book.volumeInfo.publishedDate || 'Desconocida'}
          </Text>
          <Text className="text-lg text-gray-600 text-center mb-2">
            Categoría: {book.volumeInfo.categories?.join(', ') || 'Desconocida'}
          </Text>
          <TouchableOpacity onPress={handlePreviewClick} className="bg-orange-500 py-3 px-6 rounded-full mb-4 mt-2">
            <Text className="text-lg font-bold text-white text-center">
              Ver vista previa del libro
            </Text>
          </TouchableOpacity>
          <Text className='text-center mt-6 mb-4 text-3xl font-bold'>Descripción</Text>
          <Text className="text-lg text-gray-600 mb-4 text-center">
            {book.volumeInfo.description || 'Lo sentimos, no hay descripción.'}
          </Text>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookScreen;
