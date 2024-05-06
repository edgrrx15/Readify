
/*
 Se cambiara como una lista de seccion de libros favoritos del usuario solamente si es posible,
 de lo contrario solamente sera una seccion en bookScreen de libros similares al que el usuario
 esta viendo.
*/

/*import React, { useState, useEffect } from 'react';
import { View, Text , Dimensions, Image} from 'react-native'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'



var {width, height} = Dimensions.get('window')

const bookList = ({title, data, hideSeeAll}) => {

    let bookName = 'tontos todos los odio'
    
    const [category, setCategory] = useState([])

    const navigation = useNavigation()

    const handleClick = (item) => {
      navigation.navigate('Book', { book: item });
    };

    useEffect(() => {
      const fetchBooksByCategory = async () => {
        try {
          const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${category}`
        );
          setData(response.data.items || []);
        } catch (error) {
          console.error('Error al obtener libros por categoría:', error);
        } 
      };
  
      fetchBooksByCategory();
    }, [category]);
    
  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4  flex-row justify-between items-center'>
        <Text className='text-color-texto text-2xl'>{title}</Text>
        

      </View>

      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            data.map((item, index) =>{
                return(
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={()=> navigation.push('Book', item)}
                    >
                        <View className='space-y-1 mr-4'>
                            <Image
                                source={require('../assets/icon.png')}
                                className= 'rounded-3xl'
                                style = {{
                                    width: width*0.33,
                                    height : height*0.22,
                                  }}
                            />
                             <Text className= 'text-color-texto text-xl ml-1 '>
                                {
                                    bookName.length>14 ? bookName.slice(0, 14) + '...' : bookName
                                }
                            </Text>
                        </View>
   
                    </TouchableWithoutFeedback>
                )
            })
        }
      </ScrollView>

    </View>
  )
}

export default bookList*/ 