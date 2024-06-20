import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredPokemons } from '../Features/pokemonFilterSlice';
import PokemonCard from './PokemonCard';


const FilteredPokemons = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { typeName } = route.params;
  const state = useSelector((state) => state.filterPokemons);
  const [dataShown,setDataShown]=useState([]);
  const [offset,setOffset]=useState(0);
  const pokemonsPerPage=6;
  const url = `https://pokeapi.co/api/v2/type/${typeName}/`
  useEffect(() => {
    setDataShown([]);
    setOffset(0);
   
    dispatch(fetchFilteredPokemons(url))//dispatching function to fetch info about all pokemons of a particular type
    // console.log(state.data);
  }, [dispatch, url,typeName]);
 
function loadMoreData(){
  if(offset<state.data.length){
  const newOffset=offset+pokemonsPerPage;
  const newData=state.data.slice(offset,newOffset);
  setDataShown((prevData) => [...prevData, ...newData]);
  setOffset(newOffset);
  
}
}

  if (state.isLoading) {
    return (
      
      <View className=" flex justify-center items-center ">
        <ActivityIndicator color="#000000" size="large"/>
        </View>
    )
  }
  if (state.data.length !== 0) {
    return (
       <View className="w-[100vw]">
        <View className="m-2 flex flex-row flex-wrap justify-center items-center ">
        <FlatList 
         numColumns={2}
        data={dataShown}
        renderItem={({item}) => <PokemonCard {...item.pokemon} navigation={navigation}></PokemonCard>}
       
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() =>//when data is being loaded this loader appears at the bottom
          offset < state.data.length && (
            <ActivityIndicator color="#000000" size="large" />
          )
        }
        >
        </FlatList>
        </View>
        </View>
    )
  }
  return null;
}

export default FilteredPokemons

