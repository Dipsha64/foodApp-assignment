import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAPI } from "../auth/authAPI";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const initialState = {
    userInfo: {},
    error: null,
    success: false,
}

export const loginUserAsync = createAsyncThunk(
    'user/loginUserAPI',
    async(userData)=>{
        // const navigate = useNavigate();
        // const toastOption = {
        //     position : "top-right",
        //     autoClose : 8000,
        //     pauseOnHover : true,
        //     theme : "dark",
        //     draggable : true
        // }
        const response = await loginUserAPI(userData);
        // console.log("SLICE const",response);
        // if(response.data && response.data.status === true){
        //     navigate("/");
        // }
        // if(response.data && response.data.status === false){
        //     toast(response.data.message,toastOption);
        // }
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
    }
})

export const isAuthenticated = (state) => state.auth.userInfo;
export default authSlice.reducer;
