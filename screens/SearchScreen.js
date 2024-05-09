import React, { useState } from 'react';
import { Text, View, Dimensions, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView, ActivityIndicator, Keyboard} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import noCoverImage from '../assets/no-cover.jpg';
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

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 text-color-blanco pt-14" >
      <View
        className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-3xl"
      >
         <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl ml-5">
          <Feather name="arrow-left" size={24} color="#faf9f6" />
        </TouchableOpacity>

        <TextInput
          placeholder="Buscar libro"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-color-texto"
          value={query}
          onChangeText={(text) => setQuery(text)}
          style={{color: '#faf6f9'}}
          onSubmitEditing={searchBooks}
        />
        <TouchableOpacity
          onPress={searchBooks}
          className="rounded-full p-3 m-1"
        >
          <AntDesign name="search1" size={32} color="#faf9f6" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ffe75e" className='object-center  w-96 h-96 text-9xl'/> 
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-color-blanco font-semibold ml-1">
            Resultados ({results.length})
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Book', { book: item })}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded"
                    source={
                      item.volumeInfo.imageLinks?.thumbnail ? { uri: item.volumeInfo.imageLinks.thumbnail } : noCoverImage
                    }                    
                    style={{ width: width * 0.44, height: height * 0.3, resizeMode: 'cover'}}
                  />
                  <Text className="text-neutral-400 ml-1">
                    {item.volumeInfo.title && item.volumeInfo.title.length > 22 ? item.volumeInfo.title.slice(0, 22) + '...' : item.volumeInfo.title}
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