import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import BookScreen from '../screens/BookScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator(); 

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"> 
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Book"
          options={{ headerShown: false }}
          component={BookScreen}
        />

        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={SearchScreen}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  )
}
