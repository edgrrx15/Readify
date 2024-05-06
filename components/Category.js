import React, { useEffect, useState } from 'react';
import {Dimensions, Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');


/* NO FUNCIONA TAILWIND EN EL PROYECTO 

NOTA:  MEJORAR EL DISEÑO DE LA APP */


const categories = [
  'Filosofía',
  'Ciencia ficción',
  'Historia',
  'Biografías',
  'Fantasía',
  'Misterio',
  'Romance',
  'Aventura',
  'Literatura juvenil',
  'Desarrollo Personal',
];

const Category = ({title}) => {
  const [categoryData, setCategoryData] = useState([]);
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Book', { book: item });
  };
  

  const fetchBooksByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${category}`
      );
      return {
        category,
        books: response.data.items || [],
      };
    } catch (error) {
      console.error(`Error al obtener libros para la categoría ${category}:`, error);
      return { category, books: [] };
    }
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      const promises = categories.map(fetchBooksByCategory);
      const results = await Promise.all(promises);
      setCategoryData(results);
    };

    fetchAllCategories();
  }, []);



  const BookCard = ({ item }) => (
    <View>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{
            uri: item.volumeInfo.imageLinks?.thumbnail || 'No hay imagen',
          }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
          }}
        />
      </TouchableWithoutFeedback>
      <Text style={{fontWeight:'semibold'}}>
        {
          item.volumeInfo.title.length > 40 ? item.volumeInfo.title.slice(0, 40) + '...' : item.volumeInfo.title
        }
        </Text>
    </View>
  );

  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>{title}</Text>
      {categoryData.map((category) => (
        <View key={category.category} className="mb-8">
          <Text className="text-color-texto text-xl mx-4 mb-5" style={{fontWeight: 'bold', fontSize: 23}}>
          {category.category}
          </Text>
          <Carousel
            data={category.books}
            renderItem={({ item }) => <BookCard item={item} />}
            firstItem={1}
            inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width * 0.62}
          />
        </View>
      ))}
    </View>
  );
};

export default Category;