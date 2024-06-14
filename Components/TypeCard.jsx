import { Pressable, Text, View } from 'react-native'
import React from 'react'

const TypeCard = ({ name, navigation }) => {

  const getStyle = (type) => {
    let className = '';
    switch (type) {
      case 'water':
      case 'flying':
      case 'ice':
        className = 'bg-blue-500';
        break;
      case 'fire':
      case 'fighting':
      case 'dragon':
        className = 'bg-orange-600';
        break;
      case 'grass':
      case 'poison':
      case 'bug':
        className = 'bg-green-500';
        break;
      case 'ground':
      case 'rock':
        className = 'bg-[#543a29]';
        break;
      case 'ghost':
      case 'psychic':
      case 'dark':

        className = ' bg-slate-600';
        break;
      case 'electric':
        className = 'bg-yellow-300';
        break;
      case 'fairy':
        className = 'bg-pink-500';
        break;
      default:
        className = 'bg-black';
        break;
    }
    return className;
  };
  return (
    <View>
      <Pressable onPress={() => {
        const typeName = name;
        navigation.navigate('Filtered Pokemons', { typeName });
      }}>

        <View className={` m-4 h-[100px] w-[150px] bg-white p-6 rounded-xl shadow-custom flex justify-center items-center ${getStyle(name)}`}>
          <Text className='text-white text-lg'>{name}</Text>
        </View>
      </Pressable>

    </View>
  )
}

export default TypeCard

