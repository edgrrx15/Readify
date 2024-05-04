import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform} from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

var {width, height} = Dimensions.get('window')

const ios = Platform.OS = 'ios'
const topMargin = ios ? '' : 'mt-3'

export default function BookScreen() {
    const {params: item} = useRoute()
    const [isFavourite, toggleFavourite] = useState(false)
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
                    <Ionicons name={isFavourite ? "heart-empty" : "heart"} size={32} color={isFavourite ? '#ff2626' : "#faf9f6" }/>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
      
    </ScrollView>
  )
}

