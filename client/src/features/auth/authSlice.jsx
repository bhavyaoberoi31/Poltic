import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser, login, logout,  signup, updateProfile } from "./authThunk";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.error= null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading=false;
            state.data = action.payload;
            state.error = null ; 
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(signup.pending, (state) => {
            state.error= null;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading=false;
            state.data = action.payload.data;
            state.error = null ; 
        }) 
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        }) 
        .addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null ; 
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(logout.pending , (state , action) => {
              state.loading = true ; 
              state.data = action.payload ; 
        })
        .addCase(logout.fulfilled , (state , action )=> {
              state.loading = false ; 
              state.data = action.payload ; 
              state.error = null ; 
        }) 
        .addCase(logout.rejected , (state , action ) => {
             state.loading = false ; 
             state.error = action.payload ; 
        })
        .addCase(updateProfile.fulfilled, (state , action)=> {
             state.loading = false ; 
             state.data = action.payload ; 
             state.error = null ; 
        })
        .addCase(updateProfile.rejected, (state,action)=> {
             state.loading = false ; 
             state.error = action.payload ; 
        })
    },
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;