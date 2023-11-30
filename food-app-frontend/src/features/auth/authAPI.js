import axios from 'axios';
import { loginRoute } from "../../utils/APIRoutes";
import 'react-toastify/dist/ReactToastify.css';

export function loginUserAPI (userData) {
    return new Promise(async(resolve)=>{
        const result = await axios.post(loginRoute,userData);
        resolve(result);
    })
}