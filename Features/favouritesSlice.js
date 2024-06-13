import { createSlice, nanoid } from "@reduxjs/toolkit";

const favoritesSlice= createSlice({
     name: 'favourite',
     initialState: {
        favouritePokemons: []
     },
     reducers: {
        addFavourite: (state,action) =>  {//action contains the data of the pokemon that will get added
             const favourite= {
                pokemon: action.payload
             }
             state.favouritePokemons.push(favourite);
             console.log(state.favouritePokemons);
        },
        removeFavourite: (state,action)=> {
            const newFavourites=state.favouritePokemons.filter((pokemon)=> {
                return pokemon.pokemon.name!==action.payload.name;
            })
            state.favouritePokemons=newFavourites;
        }
     }
})
export const {addFavourite,removeFavourite} =favoritesSlice.actions
export default favoritesSlice.reducer