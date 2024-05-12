import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Category from '../components/Category';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';



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

/* color alterno : #faf9f6 */



    return (

        <SafeAreaView style={{ flex: 1, paddingTop: 30, backgroundColor: '#181818'}}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className='m-4'>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <SimpleLineIcons name="menu" size={24} color="#faf9f6" />
                </TouchableOpacity>
                <Text style={{ color: '#faf9f6', fontSize: 34, fontWeight: 'bold' }}>Readify</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <AntDesign name="search1" size={32} color="#faf9f6" />
                </TouchableOpacity>
                </View>
                
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                    <Category title='Categorias'/>
            </ScrollView>
            

   
        </SafeAreaView>
    );
}
