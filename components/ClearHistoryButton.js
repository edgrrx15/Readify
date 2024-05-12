import { Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ClearHistoryButton = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigation = useNavigation();

  const ClearHistory = async () => {
    try {
      await AsyncStorage.removeItem('recentlyViewedBooks');
      setRecentlyViewed([]);
      navigation.navigate('History');
    } catch (error) {
      console.error('Error al borrar el historial:', error);
    }
  };

  return (
    <TouchableOpacity onPress={ClearHistory} className='absolute right-0 pt-14 mr-4' >
      <Text className='text-color-blanco text-lg font-bold  text-center p-1 rounded-md '>Borrar historial</Text>
    </TouchableOpacity>
  )
}

export default ClearHistoryButton;
