import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Dimensions, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView, ActivityIndicator, Keyboard} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import noCoverImage from '../assets/no-cover.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')
export default function SearchScreen() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  const searchBooks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`
      );
      setResults(response.data.items || [])
    } catch (error) {
      console.error('Error al buscar libros:', error)
    } finally {
      setLoading(false); 
    }
    Keyboard.dismiss();
  }

    const handleClick = async (item) => {
    navigation.navigate('Book', { book: item });
    let history = await AsyncStorage.getItem('recentlyViewedBooks');
    history = history ? JSON.parse(history) : [];
    if (!history.find(book => book.id === item.id)) {
      history.push(item);
      await AsyncStorage.setItem('recentlyViewedBooks', JSON.stringify(history));
    }
  }

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <SafeAreaView className="bg-blanco flex-1 text-color-negro pt-14" >
      <View
        className="mx-4 mb-3 flex-row justify-between items-center border border-gray-200 rounded-full bg-input"
      >
         <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl ml-5">
          <Feather name="arrow-left" size={24} color="#0B1215" />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          placeholder="Buscar libro"
          className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none pl-4"
          value={query}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={searchBooks}
        />
        <TouchableOpacity
          onPress={searchBooks}
          className="rounded-full p-3 m-1"
        >
          <AntDesign name="search1" size={32} color="#0B1215" />
        </TouchableOpacity>
      </View>
      

      {loading ? (
        <View classNam='ml-4'>
          <Text className='text-color-negro ml-5'>Buscando <Text className='font-bold'>"{query}"</Text>...</Text>
          <ActivityIndicator size="large" color="#E6FFFD" className='object-center  w-96 h-96 text-9xl'/> 
        </View>
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-color-negro font-extrabold ml-1">
            Resultados ({results.length})
          </Text>


          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleClick(item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-lg"
                    source={
                      item.volumeInfo.imageLinks?.thumbnail ? { uri: item.volumeInfo.imageLinks.thumbnail } : noCoverImage
                    }                    
                    style={{ width: width * 0.44, height: height * 0.3, resizeMode: 'cover'}}
                  />
                  <Text className="text-neutral-500 ml-1 mt-2 font-bold">
                    {item.volumeInfo.title && item.volumeInfo.title.length > 26 ? item.volumeInfo.title.slice(0, 26) + '...' : item.volumeInfo.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>

        </ScrollView>
      ) : (
        <View>
          <Image
            source={require('../assets/searchBook.png')}
            className="h-96 w-96 top-24 "
          />
        </View>
      )}
      
    </SafeAreaView>
  );
}