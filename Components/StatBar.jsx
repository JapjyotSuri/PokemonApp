import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatCircle from './StatCircle';

const StatBar = ({stat,base_stat,type}) => {
    const circles=[];
    const max_value=150;
    for(let i=0;i<max_value/10;i++){
        circles.push(<StatCircle key={i} filled={i< base_stat/10} type={type}/>)
    }
  return (
    <View className=" ml-5 flex-row gap-3 mb-2">
      <View className="w-[70px] font-bold"><Text className="text-lg font-bold">{stat.name}</Text></View>
      <View className="w-[40px]"><Text className="text-lg font-bold">{base_stat}</Text></View>
      <View className="flex-row">{circles}</View>
    </View>
  )
}

export default StatBar

