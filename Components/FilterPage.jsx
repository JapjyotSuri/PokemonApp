import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchType } from '../Features/typesPokemonSlice';
import TypeCard from './TypeCard';
import FilteredPokemons from './FilteredPokemons';

const FilterPage = ({navigation,stateModal}) => {
  // const [isModalVisible,setModalVisible]=useState(false);
  // const [typeName,setTypeName]=useState('');
    // function stateModal(modalVisible,typeName){
    //   setModalVisible(modalVisible);
    //   setTypeName(typeName);
    //   console.log(modalVisible);
    // }
    // function filteredModal(modalVisible){
    //   console.log('close modal');
    //   setModalVisible(modalVisible);
    // }
    const dispatch=useDispatch();
    const state=useSelector((state)=> state.typesPokemon)
    useEffect(()=> {
        dispatch(fetchType());
        // console.log(state.data);
    },[dispatch])
    if(state.isLoading){
        return <View className="flex w-[100vh] h-[100vh] justify-center items-center"><Text>Loading......</Text></View>
    }
    if(state.data){
  return (
    <ScrollView>
    <View>
      
      <View style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center'}}>
        {
            state.data.results.map((type ,index) => (
                <TypeCard key={index} {...type} navigation ={navigation} />
            ))
        }
      </View>
      {/* <Modal visible={isModalVisible} onRequestClose={() => setModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
        <FilteredPokemons typeName={typeName} navigation={navigation} filteredModal={filteredModal}/>
      </Modal> */}
    </View>
    </ScrollView>
  )
}
return null;
}


export default FilterPage

const styles = StyleSheet.create({})