import React, { useEffect, useState } from 'react';
import {Dimensions, Text, View, TouchableWithoutFeedback, Image, ActivityIndicator} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import noCoverImage from '../assets/no-cover.jpg';
import Loading from './loading';


/* NO FUNCIONA TAILWIND EN EL PROYECTO 

NOTA:  MEJORAR EL DISEÑO DE LA APP */



const { width, height } = Dimensions.get('window');
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
  'Auto-ayuda',
  'Infantil',
  'Matematicas',
];

const Category = ({title}) => {
  const [categoryData, setCategoryData] = useState([]);

  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Book', { book: item });
  };
  

  const fetchBooksByCategory = async (category) => {

    setLoading(true)
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
    } finally {
      setLoading(false); 
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


  const [loading, setLoading] = useState(false)
  const BookCard = ({ item }) => (
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

          }}
          resizeMode='cover'
        />
      </TouchableWithoutFeedback>
      <Text style={{fontWeight:'semibold', color: '#faf6f8'}}>
        {
          item.volumeInfo.title.length > 40 ? item.volumeInfo.title.slice(0, 40) + '...' : item.volumeInfo.title
        }
        </Text>
    </View>
  );

  return (

    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ffe75e"  />
        </View>
      ) : (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#ffe75e', textAlign: 'center', paddingTop: 20 }}>
            {title}
          </Text>
          {categoryData.map((category) => (
            <View key={category.category} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 23, color: '#faf6f8', marginLeft: 4, marginBottom: 5 }}>
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
      )}
    </View>

  );
};

export default Category;