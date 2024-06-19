import { Image, Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { addFavourite, removeFavourite } from '../Features/favouritesSlice';
import { fetchPokemonDetails } from '../Features/pokemonDetailsSlice';
const PokemonCard = ({ name, url, navigation, pokemonDet }) => {
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite.favouritePokemons)
  const isLiked = favourite.some(pokemon => pokemon.pokemon.name === name);//this function checks if name is present in the favourites array present in the store
  const [liked, setLiked] = useState(isLiked);
  const [data, setData] = useState(null)
  useEffect(() => {
    setLiked(favourite.some(pokemon => pokemon.pokemon.name === name))//whenever favourite array is updated meaning something is added or removed it runs this useEffect to update the ui accordingly
  }, [favourite])
  useEffect(() => {
    dispatch(fetchPokemonDetails(url)).then((results) => {
      if (results.payload) {
        setData(results.payload);
      }
    })
  }, [name])
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
  const getbtnStyle = (type) => {
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
  if(data!==null) {
  return (
    <View className="m-3 w-[165px] h-[150px]  bg-white rounded-xl shadow-custom flex  items-center">
      <Pressable onPress={() => {
        // console.log('clicked')
        navigation.navigate('Pokemon Details', { name, data })
      }} className={`rounded-xl w-[165px] h-[150px] ${getStyle(data.types[0].type.name)}`}>
        <View className="flex  justify-center items-center mt-5">
          <View className="flex flex-row   mt-50 gap-4">
          <Text className=" text-[20px] font-bold text-white">{name}</Text>
          <View className="flex">
            <Text >{
              liked ? (<AntDesign name='heart' style={{ color: 'red', fontSize: 27 }} onPress={() => {

                setLiked(!liked)
                dispatch(removeFavourite({ name: name, url: url }))
              }} />)
                : (<AntDesign name='hearto' style={{ color: 'white', fontSize: 27 }} onPress={() => {

                  setLiked(!liked)
                  dispatch(addFavourite({ name: name, url: url }))
                }
                } />)
            }


            </Text>
          </View>
          </View>
          <View className="flex flex-row justify-center items-center">
            <View className="ml-2">
              {
                data === null ? (<Text>Loading</Text>) : (data.types.map((type) => {
                  return <Pressable className={`${getbtnStyle(type.type.name)} mb-4 rounded-xl w-[60px] h-[30px] flex justify-center items-center`}><Text className="text-[16px] text-white">{type.type.name}</Text></Pressable>
                }))
              }
            </View>
            {/* {
                pokemonDet.map((pokemon)=>{
                  if(pokemon.name=== name){
                      return <View>
                        {
                          pokemon.data.types.map((type)=>{
                             return <Pressable className="bg-slate-400 mb-4"><Text className="text-[16px]">{type.type.name}</Text></Pressable>
                          })
                        }
                      </View>
                  }
                }
                   
                )
                
                
              } */}
          
          <Image className="w-[100px] h-[100px]" source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split('/')[6]}.png` }} resizeMode='contain' />

          
        </View>
        </View>
      </Pressable>
    </View >

  )
}
return null;
}


export default PokemonCard
