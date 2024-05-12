import { ScrollView, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function MenuScreen() {
  

  const navigation = useNavigation();
  return (
    <ScrollView className='pt-10  flex-1 bg-color-negro mb-30'>
      <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1 mb-5 m-4 ">
          <Feather name="arrow-left" size={24} color="#faf6f9" />
      </TouchableOpacity>

      <View className='bg-neutral-900 p-4 rounded-2xl m-4 border border-neutral-500'>

        <TouchableOpacity  onPress={() => navigation.navigate('Favorite')} className='items-center'>
          <AntDesign name= "hearto"  size={24} color= "#faf6f9"/>
          <Text className='text-lg text-color-blanco font-semibold m-2'>Mis libros favoritos</Text>
        </TouchableOpacity>
        
      </View>

      <View className='bg-neutral-900 p-4 rounded-2xl m-4 border border-neutral-500'>
      <TouchableOpacity  onPress={() => navigation.navigate('History')} className='items-center'>
          <MaterialIcons name="history" size={30} color="#faf6f9" />
          <Text className='text-lg text-color-blanco font-semibold m-2'>Visto recientemente</Text>
        </TouchableOpacity>
      </View>






      
    </ScrollView>
  )
}
