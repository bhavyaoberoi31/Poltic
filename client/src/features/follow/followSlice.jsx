import { createSlice } from "@reduxjs/toolkit";
import { follow } from "./followThunk";

const followSlice = createSlice({
    name: "reels",
    initialState: {
        data: null,
        error: null,
        loading: false, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(follow.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(follow.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(follow.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
    },
});

export default followSlice.reducer;