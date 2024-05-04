import { Text, View, Dimensions, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Buscar Libro'
          placeholderTextColor='lightgray'
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.closeButton}
        >
          <Ionicons name="close-circle" size={32} color="#faf9f6" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#212121', // bg-neutral-800
    flex: 1,
    paddingTop: 50, // pt-30
  },
  searchContainer: {
    marginHorizontal: 16, // mx-4
    marginBottom: 12, // mb-3
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1, // border
    borderColor: '#718096', // border-neutral-500
    borderRadius: 12, // rounded-full
  },
  textInput: {
    paddingBottom: 4, // pb-1
    paddingLeft: 24, // pl-6
    flex: 1,
    fontSize: 16, // text-base
    fontWeight: '600', // font-semibold
    color: '#ddd', // text-fuchsia
    letterSpacing: 1.4, // tracking-wider
  },
  closeButton: {
    padding: 12, // p-3
    margin: 4, // m-1
  },
});
