import {  Dimensions,  SafeAreaView,  TouchableOpacity,  View,  ScrollView,  Platform,  Image,  Text, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import noCoverImage from '../assets/no-cover.jpg';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function BookScreen() {
  const { params: { book } } = useRoute(); 
  const [isFavourite, setIsFavourite] = useState(false);
  const [isSaved, toggleSaved] = useState(false)
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(false); 
  }, [book]);

  //GUARDAR EL LIBRO EN FAVORITOS
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
      // Remover de favoritos
      const newFavourites = favourites.filter((fav) => fav.id !== book.id);
      await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites));
    } else {
      // Agregar a favoritos
      favourites.push(book);
      await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
    }
    setIsFavourite(!isFavourite);
  };


  //Abrir el libro en la web
  const previewLink = book.volumeInfo.previewLink
  const handlePreviewClick = () => {
    if (previewLink) {
      Linking.openURL(previewLink); 
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={{ paddingBottom: 50, paddingTop: 40 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full" > 
        <SafeAreaView className='absolute mb-20 mt-4 z-20 flex flex-row justify-between items-center  w-full'>

          <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1 m-4">
            <Feather name="arrow-left" size={27} color="#faf6f9" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFavourite}  className="rounded-xl p-1 m-4" >
            <AntDesign name={isFavourite ? "heart" : "hearto"} size={27} color={isFavourite ? '#ff2626' : "#faf6f9"} />
          </TouchableOpacity>



        </SafeAreaView>

        <View>
          <Image
            source={
              book.volumeInfo.imageLinks?.thumbnail ? {uri: book.volumeInfo.imageLinks?.thumbnail } : noCoverImage
            }

            className="rounded-t-3xl"
            style={{ width, height: height * 0.64 }}
          />

        <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.3)', 'rgba(23,23,23, 1)']}
            style={{width, height: height*0.3, position: 'absolute', top: 0, opacity: 0.62}}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
     
          />

          <LinearGradient
                 colors={['transparent', 'rgba(23,23,23,0.4)', 'rgba(23,23,23, 1)']}
            style={{width, height: height*0.44, position: 'absolute', bottom: 0}}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
     
          />
        </View>
      </View>

      <View  className="space-y-3 pt-4 m-3" >

        <Text className="text-color-blanco text-center text-4xl font-bold tracking-widest m-3">
          {book.volumeInfo.title || 'Sin título'}
        </Text>

        <Text className="text-color-blanco font-semibold text-base text-center">
          {book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
        </Text>


        <View className="flex-row justify-center"  >
          <Text className="text-color-blanco font-semibold text-base text-center ">
            {book.volumeInfo.categories|| 'Sin categoría'}
          </Text>
        </View>

        <Text className="text-color-blanco font-semibold text-base text-center">
          {book.volumeInfo.publishedDate ||'Fecha no disponible' }
        </Text>

  

        <Text className="text-color-blanco font-semibold text-base text-center" >
              Número de paginas: {book.volumeInfo.pageCount || 'Lo sentimos, no hay información'}
        </Text>
          
        {previewLink ? (
          <View className='flex-row justify-between items-center self-center '>
            <TouchableOpacity onPress={handlePreviewClick} className='bg-color-blanco p-3 w-2/3 self-center rounded-md'>
              <Text className="text-neutral-800 font-bold text-center text-xl">
                Ver vista previa del libro 
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className='mt-20 text-color-blanco font-semibold text-center text-2xl' >
            No hay vista previa disponible.
          </Text>
        )}

        <Text className="text-neutral-400 font-semibold text-base pt-4 m-3 text-center" >
          {book.volumeInfo.description || 'Lo sentimos, no hay descripción. '}
        </Text>

        

      </View>

    </ScrollView>
  );
}

