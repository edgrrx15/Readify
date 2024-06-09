import React from 'react';
import { Text } from 'react-native';

const Greeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
      greeting = '¡Hola, Buen día!';
    } else if (hour >= 12 && hour < 19) {
      greeting = '¡Hola, buenas tardes!';
    } else {
      greeting = '¡Hola, Buenas noches!';
    }

    return greeting;
  };

  return (
    <Text className='font-bold text-3xl text-orange-400  items-center text-center'>
    {getGreeting()}
  </Text>
  );
};

export default Greeting;
