import {  Dimensions,  SafeAreaView,  TouchableOpacity,  View,  ScrollView,  Platform,  Image,  Text, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {format} from 'date-fns'
import { FontAwesome } from '@expo/vector-icons';
import Loading  from '../components/loading';
import { Feather } from '@expo/vector-icons';

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
    >
      <View className="w-full" style>
        <SafeAreaView
          className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1">
          <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          
            <AntDesign name={isFavourite ? "heart" : "hearto"} size={24} color={isFavourite ? '#ff2626' : "#000"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
          <Image
            source={{
              uri: book.volumeInfo.imageLinks?.thumbnail || '../assets/no-cover.png', 
            }}
            className="rounded-2xl"
            style={{ width, height: height * 0.55 }}
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09), paddingTop: 85}} className="space-y-3">

        <Text className="text-color-texto text-center text-3xl font-bold -tracking-wider" style={{fontSize: 30, fontWeight: 'bold'}}>
          {book.volumeInfo.title || 'Sin título'}
        </Text>

        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center" >
            {book.volumeInfo.categories?.[0] || 'Sin categoría'}
          </Text>
        </View>

        <Text className="text-neutral-400 font-semibold text-base text-center">
          {book.volumeInfo.publishedDate ? format(new Date(book.volumeInfo.publishedDate), 'dd/MM/yyyy') : 'Fecha no disponible' }
        </Text>

        <Text className="text-neutral-400 font-semibold text-base text-center">
          {book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
        </Text>


        <Text className="text-neutral-400 font-semibold text-base text-center" >
              Numero de paginas: {book.volumeInfo.pageCodasdunt || 'Lo sentimos, no hay informacion'}
        </Text>
          
        {previewLink ? (
          <TouchableOpacity onPress={handlePreviewClick}>
            <Text style={{ color: '#2176ff', fontWeight: 'bold', fontSize: 15 }}>
              Ver vista previa del libro  <FontAwesome name="external-link" size={15} color="#2176ff" />
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ marginTop: 20, color: '#bbb',  fontSize: 15 }}>
            No hay vista previa disponible.
          </Text>
        )}

        <Text className="text-neutral-400 font-semibold text-base text-center">
          {book.volumeInfo.description || 'Lo sentimos, no hay descripcion. '}
        </Text>

        

      </View>

    </ScrollView>
  );
}


