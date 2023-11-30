import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { selectedProducts } from "../../utils/APIRoutes";

function ProductList() {
    const location = useLocation();
    const getParam = new URLSearchParams(location.search).get('title');
    console.log("getParam...",getParam);
    useEffect(()=>{
        // axios.post(selectedProducts,()=>{

        // }).then(()=>{

        // })

        // fetch('http://localhost/gaq/api/api.php?action=userid', {
        //     method: 'GET',
        // })
        // .then(function(response) {
        //     return response.json();
        // })

        const response = axios.post(selectedProducts,{title:getParam});
        console.log("API RES",response);
    },[])
    return ( 
        <div>
            Product List
        </div>
    );
}

export default ProductList;