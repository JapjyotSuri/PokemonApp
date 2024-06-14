import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchType = createAsyncThunk('fetchType', async () => {
    const res = await fetch('https://pokeapi.co/api/v2/type/');
    const data = res.json();
    return data;
})
const typesPokemonSlice = createSlice({
    name: 'typesPokemon',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,

    },
    extraReducers: (builder) => {
        builder.addCase(fetchType.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchType.fulfilled, (state, action) => {
            // console.log('data fetched',action.payload)
            state.isLoading = false;
            state.data = action.payload;
            // state.allTypes=action.payload.results;
            // console.log("array",allTypes)
        })
        builder.addCase(fetchType.rejected, (state) => {
            console.log('error', error)
            state.isLoading = false;
            state.isError = true;
        })
    }
})
export default typesPokemonSlice.reducer;