import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons } from '../Features/pokemonSlice';
import PokemonCard from './PokemonCard';



const Pokemon = ({ navigation }) => {
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.fetchPoke)
 
 const info=useSelector((state)=> state.pokemonDetail)

  const fetchMoreData = () => {
    if (!state.isListEnd && !state.moreLoading) {//here it checks if the moreLoading and isListEnd is false in state and then updates offset value otherwise it stops
      const newOffset = offset + 6;
      setOffset(newOffset);
     
    }

  }
  useEffect(() => {
    const apiurl = `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${offset}`;
    dispatch(fetchPokemons(apiurl));


  }, [dispatch, offset])
  if (!state) {
    return <Text>State not loaded</Text>;
  }

  if (state.isLoading) {
    return (
      <View className=" flex justify-center items-center h-[80vh]">
      <ActivityIndicator color="#000000" size="large"/>
      </View>
      )
  }

  if (state.isError) {
    return <Text>Error loading data</Text>;
  }
  
  return (
    <View>

      <View className="flex flex-row justify-center items-center " >
      </View>
      <View className="flex flex-row justify-center items-center ml-2">
        <FlatList
          numColumns={2}
          data={state.data}
          // keyExtractor={item => item.name} 
          // removed this line as it was giving warning that 2 or more childs have same key
          renderItem={({ item }) => {

            return <PokemonCard key={item.name} {...item} navigation={navigation} />

          }}
          onEndReachedThreshold={0.2}//here point 0.2 means that onEndReached will be triggered when we reach within 20% bottom of the list
          onEndReached={fetchMoreData}//function to be called when list reaches the end
        />
      </View>
    </View>

  )
}

export default Pokemon

