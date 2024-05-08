import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Category from '../components/Category';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';





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
            <BlurView intensity={100} tint="dark" style={{ paddingHorizontal: 26, paddingVertical: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <Ionicons name="menu" size={32} color="#faf9f6" />
                </TouchableOpacity>
                <Text style={{ color: '#faf9f6', fontSize: 34, fontWeight: 'bold' }}>Readify</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <AntDesign name="search1" size={32} color="#faf9f6" />
                </TouchableOpacity>
                </View>
            </BlurView>

            {
                loading ? (
                    <Loading/>
                ):(
                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                      <Category title='Categorias'/>
                    </ScrollView>
                )
            }
        </SafeAreaView>
    );
}
