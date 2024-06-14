import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import fetchPokeReducer from "../Features/pokemonSlice";
import pokemonDetailReducer from "../Features/pokemonDetailsSlice";
import typesPokemonReducer from '../Features/typesPokemonSlice';
import filterPokemonsReducer from '../Features/pokemonFilterSlice';
import favouriteReducer from '../Features/favouritesSlice'
export const store = configureStore({
    reducer: {
        fetchPoke: fetchPokeReducer,
        pokemonDetail: pokemonDetailReducer,
        typesPokemon: typesPokemonReducer,
        filterPokemons: filterPokemonsReducer,
        favourite: favouriteReducer
    },
    middleware: (getDefaultMiddleware) => //had to write this code as it was giving a warning as data to be fetched is too much and it was taking over 32ms so it was giving a warning using this code we have disable the serializable check
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});