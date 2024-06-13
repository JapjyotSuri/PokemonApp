import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Pokemon from './Components/Pokemon'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokemonDetails from './Components/PokemonDetails'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Favourites from './Components/Favourites'
import FilteredPokemons from './Components/FilteredPokemons'
import FilterPage from './Components/FilterPage'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const App = () => {
  const Stack=createNativeStackNavigator();
  const Tab=createBottomTabNavigator();
  const HomeStack= ({navigation}) => (
    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name='Pokemons' component={Pokemon}
    options={{
      headerLeft: () => (
        <MaterialCommunityIcons
          name="pokeball"
          size={30}
          backgroundColor="transparent"
          color="black"
          onPress={() => navigation.navigate('Pokemons')}
        />
      ),
      headerRight: () => (
        <AntDesign
          name="filter"
          size={30}
          backgroundColor="transparent"
          color="black"
          onPress={() => navigation.navigate('Types of Pokemon')}
        />
      )
    }}/>
    <Stack.Screen name='Pokemon Details' component={PokemonDetails} 
    options={{
      headerLeft: () => (
        <MaterialCommunityIcons
          name="pokeball"
          size={30}
          backgroundColor="transparent"
          color="black"
          onPress={() => navigation.navigate('Pokemons')}
        />
      ),
      headerRight: () => (
        <AntDesign
          name="filter"
          size={30}
          backgroundColor="transparent"
          color="black"
          onPress={() => navigation.navigate('Types of Pokemon')}
        />
      )
    }}/>
    <Stack.Screen name="Filtered Pokemons" component={FilteredPokemons}
    options={{
      headerLeft: () => (
        <MaterialCommunityIcons
          name="pokeball"
          size={30}
          backgroundColor="transparent"
          color="black"
          onPress={() => navigation.navigate('Pokemons')}
        />
      ),
      headerRight: () => (
        <AntDesign
          name="filter"
          size={30}
          backgroundColor="transparent"
          color="black"
          onPress={() => navigation.navigate('Types of Pokemon')}
        />
      )
    }}/>
  </Stack.Navigator>
  )
  const Tabnav=({navigation}) => (
    <Tab.Navigator initialRouteName='HomeScreen'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home'
        }
        else if (route.name === 'Types of Pokemon') {
          iconName = 'team'
        }
        else if (route.name === 'Favourites') {
          iconName = 'heart'
        }
        return <AntDesign name={iconName} size={size} color={color} />;
      },
      tabBarInactiveTintColor: 'black',
      
    }
    )} >
      <Tab.Screen name="Home" component={HomeStack} options={{
      headerShown: false,

    }}/>
    <Tab.Screen name="Types of Pokemon" component={FilterPage} options={
      {
        headerLeft: () => (
          <MaterialCommunityIcons
            name="pokeball"
            size={35}
            backgroundColor="transparent"
            color="black"
            
          />
        )
        
      }
    }/>
      <Tab.Screen name="Favourites" component={Favourites} 
      options={
        {
          headerLeft: () => (
            <MaterialCommunityIcons
              name="pokeball"
              size={35}
              
              backgroundColor="transparent"
              color="black"
             
            />
          ),
          
        }
      }
      />
    </Tab.Navigator>
  )
  return (
    <Provider store={store}>
    <NavigationContainer>
     <Tabnav/>
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})