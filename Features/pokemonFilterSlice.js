import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilteredPokemons=createAsyncThunk('fetchFilteredPokemons', async(url) => {
    const response=await fetch(url);
    const data=await response.json();
    return data.pokemon;
})

const pokemonFilterSlice=createSlice(
    {
        name: 'filterPokemons',
        initialState: {
            isLoading: false,
            data: [],
            isError: false
        },
        extraReducers: (builder)=> {
            builder.addCase(fetchFilteredPokemons.pending,(state)=>{
                state.isLoading=true;
                
            })
            builder.addCase(fetchFilteredPokemons.fulfilled,(state,action)=>{
                // console.log('Fetch successful:', action.payload);
                state.isLoading=false;
                state.data=action.payload;
                console.log(action.payload);
            })
            builder.addCase(fetchFilteredPokemons.rejected,(state,action)=>{
                console.log('hi')
                console.log('error',action.error)
                state.isLoading=false;
                state.isError=true;
            })
        
        }
    }
)
export default pokemonFilterSlice.reducer;