import {  Dimensions,  SafeAreaView,  TouchableOpacity,  View,  ScrollView,  Platform,  Image,  Text, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import noCoverImage from '../assets/no-cover.jpg';

/* SI ES POSIBLE SE AGREGARA UNA SECCION DE LIBROS SIMILARES DEL QUE SE BUSCO O ESTA VIENDO EL USUARIO  */

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function BookScreen() {
  const { params: { book } } = useRoute(); 
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(false); 
  }, [book]);


  //Abrir el libro en la web
  const previewLink = book.volumeInfo.previewLink;
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
        <SafeAreaView
          style={{ 
          position: 'absolute',
          marginBottom: 20,
          marginTop: 20,
          zIndex: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          width: '100%',}}
         
        >
          <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1">
          <Feather name="arrow-left" size={24} color="#faf6f9" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} >
            <AntDesign name={isFavourite ? "heart" : "hearto"} size={24} color={isFavourite ? '#ff2626' : "#faf6f9"} />
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

      <View style={{paddingTop: 8}} className="space-y-3" >

        <Text className="text-color-blanco text-center text-4xl font-bold tracking-wider " >
          {book.volumeInfo.title || 'Sin título'}
        </Text>

        <View className="flex-row justify-center"  >
          <Text className="text-color-blanco font-semibold text-base text-center ">
            {book.volumeInfo.categories|| 'Sin categoría'}
          </Text>
        </View>

        <Text className="text-color-blanco font-semibold text-base text-center">
          {book.volumeInfo.publishedDate ||'Fecha no disponible' }
        </Text>

        <Text className="text-color-blanco font-semibold text-base text-center">
          {book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
        </Text>


        <Text className="text-color-blanco font-semibold text-base text-center" >
              Numero de paginas: {book.volumeInfo.pageCount || 'Lo sentimos, no hay informacion'}
        </Text>
          
        {previewLink ? (
          <TouchableOpacity onPress={handlePreviewClick}>
            <Text className="text-blue-500 font-bold text-center text-2xl">
              Ver vista previa del libro  <FontAwesome name="external-link" size={15} color="#2176ff" />
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ marginTop: 20, color: '#faf9f6',  fontSize: 15 }} >
            No hay vista previa disponible.
          </Text>
        )}

        <Text className="text-neutral-400 font-semibold text-base  m-3 text-center" >
          {book.volumeInfo.description || 'Lo sentimos, no hay descripcion. '}
        </Text>

        

      </View>

    </ScrollView>
  );
}


