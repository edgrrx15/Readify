import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'

const ios = Platform.OS == 'ios'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1e' }}>
      <HomeScreen />
    </SafeAreaView>
  );
}