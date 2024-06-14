import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredPokemons } from '../Features/pokemonFilterSlice';
import PokemonCard from './PokemonCard';

const FilteredPokemons = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { typeName } = route.params;
  const state = useSelector((state) => state.filterPokemons);
  const url = `https://pokeapi.co/api/v2/type/${typeName}/`
  useEffect(() => {
    dispatch(fetchFilteredPokemons(url))//dispatching function to fetch info about all pokemons of a particular type
  }, [dispatch, url]);
  if (state.isLoading) {
    return (
      
      <View className=" flex justify-center items-center h-[80vh]">
        <ActivityIndicator color="#000000" size="large"/>
        </View>
    )
  }
  if (state.data.length !== 0) {
    return (
      <ScrollView>
        <View className="flex flex-row flex-wrap justify-center items-center">
          {
            state.data.map((pokemon, index) => {
              return <PokemonCard key={index} {...pokemon.pokemon} navigation={navigation} />
            })
          }
        </View>
      </ScrollView>
    )
  }
  return null;
}

export default FilteredPokemons

