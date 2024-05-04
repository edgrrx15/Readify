import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import React from 'react';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

const bookList = ({ title, data, hideSeeAll }) => {
  let bookName = 'tontos todos los odio';

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bookScrollView}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Book', item)}
            >
              <View style={styles.bookItem}>
                <Image
                  source={require('../assets/portada.jpg')}
                  style={styles.bookImage}
                />
                <Text style={styles.bookName}>
                  {bookName.length > 14 ? bookName.slice(0, 14) + '...' : bookName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingTop: 30, // Añadido paddingTop de 30
  },
  header: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000', // Ajusta al color de texto deseado
    fontSize: 24, // 2xl
    marginBottom: 20,
  },
  seeAllText: {
    fontSize: 18, // lg
    color: '#63b3ed', // blue-300
    marginBottom: 20,
  },
  bookScrollView: {
    paddingHorizontal: 15,
  },
  bookItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  bookImage: {
    borderRadius: 5, // rounded-3xl
    width: width * 0.33,
    height: height * 0.22,
  },
  bookName: {
    color: '#000', // Ajusta al color de texto deseado
    fontSize: 20, // xl
    marginLeft: 4,
  },
});

export default bookList;
