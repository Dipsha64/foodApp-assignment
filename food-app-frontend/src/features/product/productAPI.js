import axios from 'axios';
import { getProductsRouter, removeItemRouter, favouriteProductRoute } from "../../utils/APIRoutes";

export function savedProductAPI (userData) {
    return new Promise(async(resolve)=>{
        const result = await axios.post(getProductsRouter,{userDetail : userData});
        resolve(result);
    })
}

export function removeWishlistAPI (proData){
    return new Promise(async(resolve)=>{
        const result = await axios.post(removeItemRouter,{productData : proData});
        resolve(result);
    })
}

export function addWishlistAPI (dataObj) {
    return new Promise(async(resolve)=>{
        const result = await axios.post(favouriteProductRoute,dataObj);
        resolve(result);
    })
}