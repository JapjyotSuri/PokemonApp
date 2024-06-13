import { Button, Image, Pressable, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetails } from '../Features/pokemonDetailsSlice';
import LinearGradient from 'react-native-linear-gradient';
const PokemonDetails = ({ route, navigation }) => {
  const { name, url } = route.params;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pokemonDetail)
  const getGradientColors = (type) => {
    switch (type) {
      case 'fire':
        case 'fighting':
          case 'dragon':
            case 'electric':
        return ['#fe6300', '#fcdf66'];
        case 'water':
          case 'flying':
          case 'ice':
        return ['#0386fe', '#d6edfe'];
        case 'grass':
          case 'poison':
            case 'bug':
        return ['#58c74e', '#e4fae0'];
        
          case 'ground':
            case 'rock': 
          return ['#412d1e', '#d49364'];
      default:
        return ['#727272', '#f8f9f8']; // default gradient
    }
  };
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
            case 'electric':
        className = 'bg-orange-600';
        break;
      case 'grass':
        case 'poison':
          case 'bug':
        className = 'bg-green-500';
        break;
      
        case 'ghost':
          case 'psychic':
            case 'dark':
              case 'normal':
        className = ' bg-slate-600';
        break;
       
        case 'fairy':
        className = 'bg-pink-500';
        break;
        case 'ground':
          case 'rock':
            className = ' bg-[#412d1e]';
            break;        
      default:
        className = 'bg-black';
        break;
    }
    return className;
  };
  const getHeightStyle = (type) => {
    let className = '';
    switch (type) {
      case 'water':
      case 'flying':
      case 'ice':
        className = 'bg-blue-400';
        break;
      case 'fire':
        case 'fighting':
          case 'dragon':
            case 'electric':
        className = 'bg-orange-400';
        break;
      case 'grass':
        case 'poison':
          case 'bug':
        className = 'bg-green-400';
        break;

        case 'ghost':
          case 'psychic':
            case 'dark':
            case 'normal':
        className = ' bg-slate-400';
        break;
      
        case 'fairy':
        className = 'bg-pink-400';
        break;
        case 'ground':
                case 'rock':
                  className = 'bg-[#543a29]';
                  break;        
      default:
        className = 'bg-black';
        break;
    }
    return className;
  };

  useEffect(() => {

    if (url) {
      // console.log(url)
      dispatch(fetchPokemonDetails(url));
    }
  }, [dispatch, url])

  if (state.isLoading) {
    return <View className=" flex justify-center items-center h-[70vh]"><Text className="text-lg font-bold">Loading........</Text></View>;
  }

  if (state.isError) {
    return <Text>Error loading data</Text>;
  }


  if (state.data !== null) {
    const type = state.data.types && state.data.types[0].type.name;
    const gradientColors = getGradientColors(type);
    

    return (
      <ScrollView>
      <View className=' flex'>
        <LinearGradient
          colors={gradientColors}

        >
          
          <View className='flex items-center'>
            <View className="flex items-center w-[100vw] bg-slate-50 mt-3 ">
          <Text className=' font-bold text-[40px] items-center'>{name}</Text>
          </View>
          <View className="flex mt-3 justify-center items-center w-[252px] h-[252px] h-auto bg-white rounded-xl mb-2">

            <Image
              className="h-[250px] w-[250px]"
              source={{ uri: `https://img.pokemondb.net/artwork/${name}.jpg` }}
              resizeMode="contain"
            />
          </View>
          </View>
        <View className=" flex justify-center ">
         
          <View className="flex flex-row gap-10 justify-center mb-2">
            {
              state.data.types.map((type,index) => (
                <Pressable key={index} className={` h-11 w-[100px] p-2 flex justify-center items-center rounded-xl ${getStyle(type.type.name)}`}><Text className=" text-[18px] text-white">{type.type.name}</Text></Pressable>
              ))
            }
          </View>
          <View className=" flex items-center w-[100px] bg-slate-50 mb-2">
          <Text className=" text-lg font-bold ">Abilities: </Text>
          </View>
          <View className=" flex items-center">
            <ScrollView horizontal={true}>
          <View className="flex flex-row gap-10  mb-2">
            {
              state.data.abilities.map((ability, index) => (
                <Pressable className={` h-11 w-[150px] p-2 flex justify-center items-center rounded-xl ${getStyle(type)}`}>
                  <Text className=" text-white text-[15px]"key={index}>{ability.ability.name}</Text>
                  </Pressable>

              ))
            }
          </View>
          </ScrollView>
          </View>
       
          <View className="flex flex-row justify-center mb-2">

            <View className="">
             
              <Pressable className={`bg-slate-50 h-11 w-[50vw] p-2 flex justify-center items-center ${getStyle(type)}`}>

                <Text className="text-[15px] font-bold text-white ">{state.data.height} ft</Text>
              </Pressable>
            </View>
            <View className="">
             
              <Pressable className={`bg-slate-50 h-11 w-[50vw] p-2 flex justify-center items-center  ${getHeightStyle(type)}`}>
                <Text className=" text-[15px] font-bold text-white">{state.data.weight} kg</Text>
              </Pressable>
            </View>

          </View>
        </View>
        <View>
          <View className=" flex items-center w-[150px] bg-slate-50 mb-2">
          <Text className=" text-lg font-bold ">Base Stats:</Text>
          </View>
          <View className="flex flex-wrap flex-row gap-4 justify-center mb-2">
            {
              state.data.stats.map((stat) => (
                <View className={`${getStyle(type)} h-[90px] w-[90px]  flex gap-1 justify-center items-center rounded-xl`}>
                  <Text className=" text-white text-[16px] font-bold ">{stat.stat.name}:</Text>
                  <Pressable >
                <Text className=" text-white text-[15px] ">{stat.base_stat}</Text>
              </Pressable>
                </View>
              )

              )
            }
          </View>
        </View>
        </LinearGradient>
      </View>
      </ScrollView>
    )
  }
}


export default PokemonDetails
