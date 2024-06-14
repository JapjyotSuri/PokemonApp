import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";

export const fetchPokemonDetails = createAsyncThunk('fetchPokemonDetails', async (url) => {
    // console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    return data;


})
const pokemonDetailsSlice = createSlice({
    name: 'pokemonDetail',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonDetails.pending, (state) => {//case when fetching is going on
            state.isLoading = true;
        })
        builder.addCase(fetchPokemonDetails.fulfilled, (state, action) => {//case when fetching gets completed successfully
            // console.log('Fetch successful:', action.payload);
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchPokemonDetails.rejected, (state, action) => {//case when fetching gives an error
            console.log('error', action.error)
            state.isLoading = false;
            state.isError = true;
        })
    }
})
export default pokemonDetailsSlice.reducer;