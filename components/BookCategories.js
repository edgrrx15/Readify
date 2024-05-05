import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const BooksByCategory = () => {
  const { params: { category } } = useRoute(); // Obtener la categoría desde la ruta
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${category}`
        );
        setBooks(response.data.items || []);
      } catch (error) {
        console.error('Error al obtener libros por categoría:', error);
      }
    };

    fetchBooksByCategory();
  }, [category]); // Solo recargar cuando cambia la categoría

  const renderBook = ({ item }) => (
    <TouchableOpacity>
      <Text>{item.volumeInfo.title}</Text> {/* Muestra el título del libro */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Libros de la categoría: {category}</Text>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5', // Color de fondo
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BooksByCategory;
