import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Category from '../components/Category';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { AntDesign } from '@expo/vector-icons';

/*
 
NO FUNCIONA TAILWIND EN NINGUNA A

NOTA: QUITAR LOS ESTILOS EN LINEA O USAR TAILWIND*/


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

/* BOTON DE MENU AUN NO TIENE NINGUNA FUNCION */

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#181818', paddingTop:30 }}>
            <StatusBar style="light" />
            <View style={{ paddingHorizontal: 26, paddingVertical: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Menu')} >
                        <Ionicons name="menu" size={32} color="#faf9f6" />
                    </TouchableOpacity>
                    <Text style={{ color: '#faf9f6', fontSize: 49, fontWeight: 'bold' }}>Readify</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                        <AntDesign name="search1" size={32} color="#faf9f6" />
                    </TouchableOpacity>
                </View>
            </View>
            
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
