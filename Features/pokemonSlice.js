import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Pokemon from "../Components/Pokemon";

export const fetchPokemons= createAsyncThunk("fetchPokemons",async (apiurl,{getState})=>{
    
    const res=await fetch(apiurl);
    const data=await res.json();
    return data.results;
})

const pokemonsSlice=createSlice({
    name: "fetchPoke",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        moreLoading: false,
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchPokemons.pending, (state,action)=>{
            if(action.meta.arg.includes('offset=0')){
                state.isLoading=true;
            }
            else{
                state.moreLoading=true
            }
           

        })
        builder.addCase(fetchPokemons.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.moreLoading = false;
            if (action.meta.arg.includes('offset=0')) {
                state.data = action.payload;
            } else {
                state.data = [...state.data, ...action.payload];
                if (action.payload.length === 0) {
                    state.isListEnd = true;
                }
            }

        })
        builder.addCase(fetchPokemons.rejected,(state)=>{
        //   console.log("error",action.payload);
          state.isError=true;
          state.isLoading=false;
          state.moreLoading = false;
    })
    }

})

export default pokemonsSlice.reducer;