import {  Dimensions,  SafeAreaView,  TouchableOpacity,  View,  ScrollView,  Platform,  Image,  Text,} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
            <Ionicons name="arrow-back" size={32} color="#faf9f6" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <Ionicons name="heart" size={32} color={isFavourite ? '#ff2626' : "#faf9f6"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
          <Image
            source={{
              uri: book.volumeInfo.imageLinks?.thumbnail
                ? book.volumeInfo.imageLinks.thumbnail
                : '../assets/portada.jpg', 
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
          {book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {book.volumeInfo.description || 'Disculpa, no hay descripcion.'}
        </Text>
      </View>

    </ScrollView>
  );
}
