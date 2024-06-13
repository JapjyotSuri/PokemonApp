import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchPokemons} from '../Features/pokemonSlice';
import PokemonCard from './PokemonCard';


const Pokemon = ({navigation}) => {
  const [isModalVisible,setModalVisible]=useState(false);
    const [offset,setOffset]=useState(0);
    const dispatch=useDispatch();
    const state=useSelector((state)=> state.fetchPoke)
    const  fetchMoreData=() => {
        if(!state.isListEnd && !state.moreLoading){
            const newOffset=offset+6;
           setOffset(newOffset);
          //  console.log(offset);
        }

    }
    useEffect(()=>{
       const apiurl= `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${offset}`;
        dispatch(fetchPokemons(apiurl));
       

    },[dispatch,offset])
    if (!state) {
        return <Text>State not loaded</Text>;
      }
    
      if (state.isLoading) {
        return <View className=" flex justify-center items-center h-[70vh]"><Text className="text-lg font-bold">Loading........</Text></View>;
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
        // keyExtractor={item => item.name} removed this line as it was giving warning that 2 or more childs have same key
        renderItem={({item})=> {
      
            return <PokemonCard {...item}  navigation={navigation} />
            
        }}//item to be shown here
        onEndReachedThreshold={0.2}//here point 0.2 means that onEndReached will be triggered when we reach within 20% bottom of the list
        onEndReached={fetchMoreData}
        />
      </View>
      {/* <Modal visible={isModalVisible} onRequestClose={() => setModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
      <FilterPage stateModal={stateModal} navigation={navigation}/>
      </Modal> */}
    </View>
    
  )
}

export default Pokemon

