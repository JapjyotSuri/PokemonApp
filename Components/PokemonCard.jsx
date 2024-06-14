import { Image, Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { addFavourite, removeFavourite } from '../Features/favouritesSlice';
const PokemonCard = ({ name, url, navigation }) => {
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite.favouritePokemons)
  const isLiked = favourite.some(pokemon => pokemon.pokemon.name === name);//this function checks if name is present in the favourites array present in the store
  const [liked, setLiked] = useState(isLiked);
  useEffect(() => {
    setLiked(favourite.some(pokemon => pokemon.pokemon.name === name))//whenever favourite array is updated meaning something is added or removed it runs this useEffect to update the ui accordingly
  }, [favourite])
  return (
    <View className="m-3 w-[165px] h-[165px] p-3 bg-white rounded-xl shadow-custom flex justify-center items-center">
      <Pressable onPress={() => {
        // console.log('clicked')
        navigation.navigate('Pokemon Details', { name, url })
      }}>
        <View className="flex justify-center items-center">
          <Image className="w-[110px] h-[110px]" source={{ uri: `https://img.pokemondb.net/artwork/${name}.jpg` }} resizeMode='contain' />
          <View className="flex flex-row justify-center items-center gap-4">
            <Text className=" text-lg font-bold ">{name}</Text>
            <View className="flex">
              <Text >{
                liked ? (<AntDesign name='heart' style={{ color: 'red', fontSize: 27 }} onPress={() => {

                  setLiked(!liked)
                  dispatch(removeFavourite({ name: name, url: url }))
                }} />)
                  : (<AntDesign name='hearto' style={{ color: 'red', fontSize: 27 }} onPress={() => {

                    setLiked(!liked)
                    dispatch(addFavourite({ name: name, url: url }))
                  }
                  } />)
              }


              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default PokemonCard
