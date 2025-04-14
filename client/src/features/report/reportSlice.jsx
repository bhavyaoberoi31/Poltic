import { createSlice } from "@reduxjs/toolkit";
import { reportReel } from "./reportThunk";

const reportSlice = createSlice({
    name: "reels",
    initialState: {
        data: null,
        error: null,
        loading: false, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(reportReel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(reportReel.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(reportReel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
    },
});

export default reportSlice.reducer;
