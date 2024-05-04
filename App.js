import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/appNavigation'; 


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation /> 
    </GestureHandlerRootView>
  );
}
