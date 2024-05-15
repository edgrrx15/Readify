import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Category from '../components/Category';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Saludo from '../components/Greeting'



export default function HomeScreen() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
  
    const navigation = useNavigation()

    useEffect(() => {
        setCategories([
          'Filosofía',
          'Ciencia ficción',
          'Historia',
          'Biografías',
          'Fantasía',
          'Misterio',
          'Romance',
          'Aventura',
          'Literatura juvenil',
          'Infantil',
          'Matematicas',
        ]);
        setLoading(false); 
      }, []);

    return (
        <SafeAreaView className='flex-1 pt-10 bg-gray-900'>

            <View  className='flex-row justify-between m-4  p-3 items-center'>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <SimpleLineIcons name="menu" size={24} color="#faf9f6" />
                </TouchableOpacity>
                
                <Text  className='text-color-blanco text-5xl font-bold'>Readify</Text>
        
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <AntDesign name="search1" size={32} color="#faf9f6" />
                </TouchableOpacity>
            </View>
                
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                <Saludo/>
                <Category/>
            </ScrollView>
        </SafeAreaView>
    );
}
