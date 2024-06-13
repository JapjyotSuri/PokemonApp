import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import PokemonCard from './PokemonCard'

const Favourites = ({navigation}) => {
  const state=useSelector((state)=> state.favourite)
  if(state.favouritePokemons.length===0){
    return <View className=" flex justify-center items-center h-[70vh]"><Text className="text-lg font-bold">No favourites yet</Text></View>
  }
  if(state.favouritePokemons.length!==0) {
 
  return (
    <ScrollView>
    <View className=" flex flex-row flex-wrap ml-2" >
      {
        state.favouritePokemons.map((pokemon,index)=> (
          <PokemonCard key={index} {...pokemon.pokemon} navigation={navigation}/>
        ))
      }
      {/* <Text>{state.favouritePokemons.length}</Text> */}
    </View>
    </ScrollView>
  )
}
return null;
}
export default Favourites

const styles = StyleSheet.create({})