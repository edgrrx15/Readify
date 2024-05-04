import { View, Text , Dimensions, Image} from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


var {width, height} = Dimensions.get('window')

const bookList = ({title, data, hideSeeAll}) => {

    let bookName = 'tontos todos los odio'

    const navigation = useNavigation()
  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4  flex-row justify-between items-center'>
        <Text className='text-color-texto text-2xl'>{title}</Text>
        
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text className= 'text-lg text-blue-300'>See All</Text>
            </TouchableOpacity>
          )
        }

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
                                source={require('../assets/portada.jpg')}
                                className= 'rounded-3xl'
                                style = {{
                                    width: width*0.33,
                                    height : height*0.22
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

export default bookList