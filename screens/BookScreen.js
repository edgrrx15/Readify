import { Dimensions, SafeAreaView, TouchableOpacity, View, ScrollView, Platform, Image, Text} from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import BookList  from '../components/bookList'


var {width, height} = Dimensions.get('window')

const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-3'

export default function BookScreen() {
    let bookName = 'tontos todos los odio'
    const {params: item} = useRoute()
    const [isFavourite, toggleFavourite] = useState(false)
    const [similarBooks, setSimilarBooks] = useState([1,2,3,4,5,6])
    const navigation = useNavigation()
    useEffect(()=> {

    },[item])

  return (
    <ScrollView 
        contentContainerStyle={{paddinBottom: 20}}
        className= 'flex-1 bg-neutral-900'
    >
        <View className='w-full'>
            <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4'+ topMargin}>
               
                <TouchableOpacity onPress={()=>navigation.goBack()} className='rounded-xl p-1 '>
                    <Ionicons name="arrow-back" size={32} color="#faf9f6" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <Ionicons name="heart"size={32} color={isFavourite ? '#ff2626' : "#faf9f6" }/>
                </TouchableOpacity>
            </SafeAreaView>

            <View className='oveflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                <Image
                    source={require('../assets/portada.jpg')}
                    className= 'rounded-2xl h-24 w-20'
                />
            </View>
        </View>

        <View style={{marginTop:  -(height*0.09)}} className='space-y-3'>
            <Text className='text-color-texto text-center text-3xl font-bold -tracking-wider'>
                {bookName}
            </Text>
            <View className='flex-row justify-center mx-4 space-x-2'>
                <Text className='text-neutral-400 font-semibold text-base text-center'>Filosofia</Text>
            </View>
            <Text className='text-neutral-400 font-semibold text-base text-center'>Autor</Text>
            <Text className='text-neutral-400 font-semibold text-base text-center'>Descripcion</Text>
        </View>

        <BookList title='Libros Similares' data={similarBooks} hideSeeAll={true}/>
      
    </ScrollView>
  )
}

