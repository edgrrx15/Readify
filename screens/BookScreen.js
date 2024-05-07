import {  Dimensions,  SafeAreaView,  TouchableOpacity,  View,  ScrollView,  Platform,  Image,  Text, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Loading  from '../components/loading';
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
      contentContainerStyle={{ paddingBottom: 20, paddingTop: 40 }}
      className="flex-1 bg-neutral-900"
      style={{backgroundColor: "#181818", color: '#faf9f6'}}
    >
      <View className="w-full" > 
        <SafeAreaView
          style={{ 
          marginBottom: 20,
          marginTop: 20,
          zIndex: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          width: '100%',}}
          className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1">
          <Feather name="arrow-left" size={24} color="#faf9f6" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} >
            <AntDesign name={isFavourite ? "heart" : "hearto"} size={24} color={isFavourite ? '#ff2626' : "#faf6f9"} />
          </TouchableOpacity>

        </SafeAreaView>

        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
          <Image
            source={
              book.volumeInfo.imageLinks?.thumbnail ? {uri: book.volumeInfo.imageLinks?.thumbnail } : noCoverImage
            }

            className="rounded-2xl"
            style={{ width, height: height * 0.55 }}
          />

          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23, 1)']}
            style={{width, height: height*0.40, position: 'absolute', bottom: 0}}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
     
          />
        </View>
      </View>

      <View style={{paddingTop: 8}} className="space-y-3" >

        <Text className="text-color-texto text-center text-3xl font-bold -tracking-wider" style={{fontSize: 30, fontWeight: 'bold',  color: '#faf9f6'}}>
          {book.volumeInfo.title || 'Sin título'}
        </Text>

        <View className="flex-row justify-center mx-4 space-x-2"  >
          <Text className="text-neutral-400 font-semibold text-base text-center" style={{ color: '#faf9f6'}}>
            {book.volumeInfo.categories|| 'Sin categoría'}
          </Text>
        </View>

        <Text className="text-neutral-400 font-semibold text-base text-center" style={{ color: '#faf9f6'}}>
          {book.volumeInfo.publishedDate ||'Fecha no disponible' }
        </Text>

        <Text className="text-neutral-400 font-semibold text-base text-center" style={{ color: '#faf9f6'}}>
          {book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
        </Text>


        <Text className="text-neutral-400 font-semibold text-base text-center" style={{ color: '#faf9f6'}}>
              Numero de paginas: {book.volumeInfo.pageCount || 'Lo sentimos, no hay informacion'}
        </Text>
          
        {previewLink ? (
          <TouchableOpacity onPress={handlePreviewClick}>
            <Text style={{ color: '#2176ff', fontWeight: 'bold', fontSize: 15 }}>
              Ver vista previa del libro  <FontAwesome name="external-link" size={15} color="#2176ff" />
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ marginTop: 20, color: '#faf9f6',  fontSize: 15 }} >
            No hay vista previa disponible.
          </Text>
        )}

        <Text className="text-neutral-400 font-semibold text-base text-center" style={{ color: '#faf9f6'}}>
          {book.volumeInfo.description || 'Lo sentimos, no hay descripcion. '}
        </Text>

        

      </View>

    </ScrollView>
  );
}


