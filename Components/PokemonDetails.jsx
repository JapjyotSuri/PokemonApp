import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import StatBar from './StatBar';
const PokemonDetails = ({ route, navigation }) => {
  const { name, data } = route.params;
  const [optionChosen, setOptionChosen] = useState('About');
  function handlePress(option) {
    setOptionChosen(option);
  }
 
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
      case 'fairy':
        return ['#dd158a', '#fecce6']
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
      case 'steel':
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
  function getStyleText(option){
    return optionChosen===option ?  ' text-black' : 'text-gray-400';
  }
  
  if (data !== null) {//this condition is used so that the below only returns if state.data is not equal to null so that we dont get the issue that accessing data from undefined below
    const type = data.types && data.types[0].type.name;
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
            <View className=" flex-row items-center justify-evenly  w-[100%] mt-5 bg-slate-50 mb-4" >
              <Pressable
                onPress={() => handlePress('About')}>
                <Text className={`text-lg font-bold mb-2 mt-2 ${getStyleText('About')} text-gr`}>About</Text></Pressable>
              <Pressable
                onPress={() => handlePress('Stats')}>
                <Text className={`text-lg font-bold mb-2 mt-2 ${getStyleText('Stats')}`}>Stats</Text></Pressable>
              <Pressable
                onPress={() => handlePress('Moves')}>
                <Text className={`text-lg font-bold mb-2 mt-2 ${getStyleText('Moves')}`}>Moves</Text></Pressable>
            </View>
            <View>
              {
                optionChosen === 'About' && (
                  <View className=" flex justify-center ">
                    <View className=" flex items-center w-[100px] bg-slate-50 mb-4">
                      <Text className=" text-lg font-bold mb-2">Types: </Text>
                    </View>
                    <View className="flex flex-row gap-10 justify-center mb-4">
                      {
                        data.types.map((type, index) => (
                          <Pressable key={index} className={`shadow-custom h-11 w-[100px] p-2 flex justify-center items-center rounded-xl ${getStyle(type.type.name)}`}
                            onPress={() => {
                              const typeName = type.type.name;

                              navigation.navigate('Filtered Pokemons', { typeName });
                            }}><Text className=" text-[18px] text-white">{type.type.name}</Text></Pressable>
                        ))
                      }
                    </View>
                    <View className=" flex items-center w-[100px] bg-slate-50 mb-4">
                      <Text className=" text-lg font-bold mb-2">Abilities: </Text>
                    </View>
                    <View className=" flex items-center">
                      <ScrollView horizontal={true}>
                        <View className="flex flex-row gap-10 mb-2">
                          {
                            data.abilities.map((ability, index) => (
                              <Pressable key={index} className={` shadow-custom h-11 w-[150px] p-2 flex justify-center items-center rounded-xl ${getStyle(type)}`}>
                                <Text className=" text-white text-[15px]">{ability.ability.name}</Text>
                              </Pressable>

                            ))
                          }
                        </View>
                      </ScrollView>
                    </View>

                    <View className="flex flex-row justify-center mb-4 mt-2">

                      <View className="">

                        <Pressable className={`bg-slate-50 h-11 w-[50vw] p-2 flex justify-center items-center ${getStyle(type)}`}>

                          <Text className="text-[15px] font-bold text-white ">{data.height} ft</Text>
                        </Pressable>
                      </View>
                      <View className="">

                        <Pressable className={`bg-slate-50 h-11 w-[50vw] p-2 flex justify-center items-center  ${getHeightStyle(type)}`}>
                          <Text className=" text-[15px] font-bold text-white">{data.weight} kg</Text>
                        </Pressable>
                      </View>

                    </View>

                  </View>)
              }
            </View>
            <View>{
              optionChosen === 'Stats' && (
                <View>

                  <View className=" flex items-center w-[150px] bg-slate-50 mb-2">
                    <Text className=" text-lg font-bold ">Base Stats:</Text>
                  </View>
                  <View className="flex  justify-center mb-2 ml-3">
                    {
                      data.stats.map((stat, index) => (
                        <StatBar key={index} {...stat} type={type}/>
                      )

                      )
                    }
                  </View>

                </View>)
            }
            </View>
            <View>
              {
               optionChosen==='Moves' && (
                <View>
                <View className=" flex items-center w-[100px] bg-slate-50 mb-4">
                      <Text className=" text-xl font-bold mb-2">Moves: </Text>
                    </View>
                   
               <View className="flex-row flex-wrap justify-center items-center gap-2">
                  {
                    data.moves.map((move,index)=> (
                        <Pressable key={index} className={`${getStyle(type)} m-3 w-[90px] h-[90px]   rounded-xl shadow-custom flex  items-center justify-center`}><Text className="text-white font-bold">{move.move.name}</Text></Pressable>
                    ))
                  }
               </View>
               
               </View>
              )}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    )
  }
}


export default PokemonDetails
