import {
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const TrendingBooks = () => {
  const [data, setData] = useState([]); // Estado para almacenar libros populares
  const [category, setcategory] = useState([]); // Estado para almacenar libros populares
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Book', { book: item }); // Asegúrate de pasar 'book'
  };

  useEffect(() => {
    // Solicitud para obtener libros populares
    const fetchPopularBooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=aristoteles'
        );
        setData(response.data.items || []); // Almacenar los libros populares en 'data'
      } catch (error) {
        console.error('Error al obtener libros populares:', error);
      }
    };

    fetchPopularBooks(); // Llama a la función para obtener libros populares
  }, []); // Solo ejecuta una vez al montar el componente

  const BookCard = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: item.volumeInfo.imageLinks?.thumbnail || '../assets/portada.jpg', // Imagen de portada o por defecto
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View className="mb-8">
      <Text className="text-color-texto text-xl mx-4 mb-5">Trending Books</Text>
      <Carousel
        data={data} // Usa el estado 'data'
        renderItem={({ item }) => <BookCard item={item} />}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
};

export default TrendingBooks;
