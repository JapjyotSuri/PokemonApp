import {  Text, View } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'


const StatCircle = ({filled,type}) => {
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
  return (
    <View className={`w-3 h-7 rounded-full mx-0.5 ${filled? getStyle(type) : 'bg-gray-300'}`}/>
      
   
  )
}

export default StatCircle

