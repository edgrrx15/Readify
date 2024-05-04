import { Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

var {width, height} = Dimensions.get('window')

export default function SearchScreen() {

    const navigation = useNavigation()
  return (
    <SafeAreaView className='bg-neutral-800 flex-1 pt-30'>
        <View
            className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full pt-32'
        >
            <TextInput
                placeholder='Buscar Libro'
                placeholderTextColor={'lightgray'}
                className='pb-1 pl-6 flex-1 text-base font-semibold text-color-texto tracking-wider'
            />
            <TouchableOpacity
                onPress={()=>navigation.navigate('Home')}
                className='rounded-full p-3 m-1 bg-neutral-500'
            >
            <Ionicons name="close-circle" size={32} color="#faf9f6" />                
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
