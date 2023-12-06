import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { loginUserAPI, signOut } from "../auth/authAPI";

const initialState = {
    userInfo: {},
    error: null,
    success: false,
}

export const loginUserAsync = createAsyncThunk(
    'user/loginUserAPI',
    async(userData)=>{
        const response = await loginUserAPI(userData);
        return response.data;
    }
)

export const signOutAsync = createAction(
    'user/signOut',
    async(userId)=>{
        const response = await signOut(userId);
        return response.data;
    }
)

export const authSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(loginUserAsync.fulfilled,(state,action)=>{
                console.log("SLICE.....",action);
                state.userInfo = action.payload.data;
                state.loading = false
                state.success = true
            })
            .addCase(signOutAsync,(state)=>{
                Object.assign(state, initialState);
            })
            // .addCase(signOutAsync.fulfilled,(state,action)=>{
            //     state.success = false;
            //     state.userInfo = null;
            // })
    }
})

export const isAuthenticated = (state) => state.auth.userInfo;
export default authSlice.reducer;
