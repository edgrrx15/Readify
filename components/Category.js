import React, { useEffect, useState } from 'react'
import {Dimensions, Text, View, TouchableWithoutFeedback, Image, ActivityIndicator} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import noCoverImage from '../assets/no-cover.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')
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
]

const Category = ({title}) => {
  const [categoryData, setCategoryData] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)

  const handleClick = async (item) => {
    navigation.navigate('Book', { book: item });
    
    let history = await AsyncStorage.getItem('recentlyViewedBooks');
    history = history ? JSON.parse(history) : [];
    if (!history.find(book => book.id === item.id)) {
      history.push(item);
      await AsyncStorage.setItem('recentlyViewedBooks', JSON.stringify(history));
    }
  };
  

  const fetchBooksByCategory = async (category) => {

    setLoading(true)
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${category}&maxResults=20`
      )
      return {
        category,
        books: response.data.items || [],
      }
    } catch (error) {
      console.error(`Error al obtener libros para la categoría ${category}:`, error);
      return { category, books: [] }
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    const fetchAllCategories = async () => {
      const promises = categories.map(fetchBooksByCategory);
      const results = await Promise.all(promises);
      setCategoryData(results);
    };

    fetchAllCategories();
  }, [])

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
            resizeMode: 'cover'
          }}
          className='rounded'
        />
      </TouchableWithoutFeedback>

        
      <Text className='font-extrabold text-color-blanco text-lg pt-1'>
        {
          item.volumeInfo.title.length > 32 ? item.volumeInfo.title.slice(0, 32) + '...' : item.volumeInfo.title
        }
        </Text>
    </View>
  )

  return (

    <View className='flex-1'>
      {loading ? (
        <View 
        className='flex-1 justify-center align-center'>
          <ActivityIndicator size="large" color="#ffe75e"  />
        </View>
      ) : (
        <View >
          {categoryData.map((category) => (
            <View key={category.category} style={{ marginBottom: 8 }}>
              <Text className="text-color-blanco font-semibold text-4xl m-7">
                {category.category}
              </Text>
              <Carousel
                data={category.books}
                renderItem={({ item }) => <BookCard item={item} />}
                firstItem={3}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
              />
            </View>
          ))}
        </View>
      )}
    </View>

  )
}

export default Category;