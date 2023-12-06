import axios from 'axios';
import { loginRoute } from "../../utils/APIRoutes";

export function loginUserAPI (userData) {
    return new Promise(async(resolve)=>{
        const result = await axios.post(loginRoute,userData);
        resolve(result);
    })
}

export function signOut(){
    return new Promise(async(resolve,reject)=>{
        try{
            resolve({data : 'Successfully Logout'});
        }
        catch(error){
            reject(error);
        }
    })
}   