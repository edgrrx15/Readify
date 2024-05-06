import React, { useState } from 'react';
import { Text, View, Dimensions, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView, ActivityIndicator} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const { width, height } = Dimensions.get('window')

/* ESTA SECCION FUNCIONA CORRECTAMENTE, SIN EMBARGO SE TIENE QUE AGREGAR DISEÑO YA QUE TAILWIND NO FUNCIONA*/

export default function SearchScreen() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  const searchBooks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setResults(response.data.items || [])
    } catch (error) {
      console.error('Error al buscar libros:', error)
    } finally {
      setLoading(false); 
    }
  }

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 pt-30" style={{paddingTop: 50, backgroundColor: '#ddd', flex: 1}}>
      <View
        className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
      >
        <TextInput
          placeholder="Buscar libro"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-color-texto"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <TouchableOpacity
          onPress={searchBooks}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <Ionicons name="search" size={32} color="#212121" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#faf9f6" /> 
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-color-texto font-semibold ml-1">
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
                    className="rounded-3xl"
                    source={{
                      uri: item.volumeInfo.imageLinks?.thumbnail || '../assets/portada.jpg',
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
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
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/searchBook.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
