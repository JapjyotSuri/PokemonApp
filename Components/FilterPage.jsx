import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchType } from '../Features/typesPokemonSlice';
import TypeCard from './TypeCard';


const FilterPage = ({ navigation }) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.typesPokemon)
  useEffect(() => {
    dispatch(fetchType());
    // console.log(state.data);
  }, [dispatch])
  if (state.isLoading) {
    return (
    <View className=" flex justify-center items-center h-[80vh]">
    <ActivityIndicator color="#000000" size="large"/>
    </View>
    )
  }
  if (state.data) {
    return (
      <ScrollView>
        <View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {
              state.data.results.map((type, index) => (
                <TypeCard key={index} {...type} navigation={navigation} />
              ))
            }
          </View>
        </View>
      </ScrollView>
    )
  }
  return null;
}


export default FilterPage

