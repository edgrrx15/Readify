import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrendingBooks from '../components/TrendingBooks';
import BookList from '../components/bookList'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import Categories from '../components/BookCategories'

export default function HomeScreen() {
    const [trending, setTrending] = useState([1, 2, 3]);
    const [topRated, setTopRated] = useState([1, 2, 3]);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1e', paddingTop:30 }}>
            <StatusBar style="light" />
            <View style={{ paddingHorizontal: 26, paddingVertical: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Ionicons name="menu" size={32} color="#faf9f6" />
                    </TouchableOpacity>
                    <Text style={{ color: '#faf9f6', fontSize: 24, fontWeight: 'bold' }}>Readify</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                        <Ionicons name="search" size={32} color="#faf9f6" />
                    </TouchableOpacity>
                </View>
            </View>

            {
                loading ? (
                    <Loading/>
                ):(
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                     >
                        <TrendingBooks data={trending} />
                        <BookList title="Top Rated" data={topRated} />


                    </ScrollView>
                )
            }


        </SafeAreaView>
    );
}
