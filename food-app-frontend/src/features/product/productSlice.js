import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { savedProductAPI, removeWishlistAPI, addWishlistAPI } from "../product/productAPI";

const initialState = {
    savedProduct: {},
    error: null,
    success: false,
}

export const savedProductAsync = createAsyncThunk(
    'product/savedProductAPI',
    async(userData)=>{
        const response = await savedProductAPI(userData);
        return response.data;
    }
)

export const removeWishlistAsync = createAsyncThunk(
    'product/removeWishlistAPI',
    async(product)=>{
        const response = await removeWishlistAPI(product);
        return response.data;
    }
)

export const addToWishListAsync = createAsyncThunk(
    'product/addWishlistAPI',
    async(dataObj)=>{
        const response = await addWishlistAPI(dataObj);
        return response.data;
    }
)

export const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder
            .addCase(savedProductAsync.pending,(state)=>{
                state.error = null
            })
            .addCase(savedProductAsync.fulfilled,(state,action)=>{
                state.savedProduct = action.payload.data;
                state.success = true;
            })
            .addCase(removeWishlistAsync.pending,(state)=>{
                state.error = null;
            })
            .addCase(removeWishlistAsync.fulfilled,(state,action)=>{
                let index = state.savedProduct.findIndex(row=>row.productDetail.id === action.payload.data.objData.productDetail.id);
                state.savedProduct.splice(index,1);
                state.success = true
            })
            .addCase(addToWishListAsync.pending,(state)=>{
                state.error = null
            })
            .addCase(addToWishListAsync.fulfilled,(state,action)=>{
                console.log("FAV SLICE",action.payload);
                state.success = true;
                state.savedProduct = action.payload.data;
            })
    }
})

export const wishlistItem = (state) => state.product.savedProduct;

export default productSlice.reducer;