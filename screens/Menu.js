import { ScrollView, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import FavouriteBooks from '../components/favouriteBooks';



export default function Menu() {
  

  const navigation = useNavigation();
  return (
    <View style={{paddingTop: 40}}>
      <Text>Menu</Text>

      <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1">
          <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
          <FavouriteBooks title='Tus libros favoritos: '/>
       </ScrollView>

      
    </View>
  )
}
