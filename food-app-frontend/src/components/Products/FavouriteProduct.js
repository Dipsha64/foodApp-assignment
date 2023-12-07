import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { savedProductAsync, removeWishlistAsync } from "../../features/product/productSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function FavouriteProduct() {
    const dispatch = useDispatch();
    const [productItem,setProductItem] = useState([]);
    const userDetail = useSelector((state)=>state.auth.userInfo);

    const handleProducts = (e,product) =>{
        console.log("product..",product);
        dispatch(removeWishlistAsync(product))
    }

    useEffect(()=>{
        dispatch(savedProductAsync(userDetail)).then((result)=>{
            const favouriteItem = result.payload.data;
            setProductItem(favouriteItem);
        })
    },[])
    return ( 
        <>
        <FormContainer>
        <Navbar></Navbar>
        <div class="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
            <div class="flex flex-col jusitfy-start items-start">
                <div class="mt-3">
                <h1 class="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-black dark:text-black">Favourites</h1>
                </div>
                <div class="mt-4">
                <p class="text-2xl tracking-tight leading-6 text-gray-600 dark:text-black">{productItem.length > 0 ? productItem.length + " items" : ""}</p>
                </div>
                {productItem.length > 0 ? (
                <div class="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">

                { productItem && productItem.map((product,index) => (
                    <div class="flex flex-col" key={index}>
                        <Link to={`/product-detail/${product.productId}`}>
                        <div class="relative">
                        <img class="hidden lg:block" src={product.productDetail.image} alt="watch" />
                        <img class="hidden sm:block lg:hidden" src="https://i.ibb.co/9sqGrR6/Rectangle-24-1.png" alt="watch" />
                        <img class="sm:hidden" src="https://i.ibb.co/wCGrdFt/Rectangle-24.png" alt="watch" />
                        </div>
                        <div class="mt-6 flex justify-between items-center">
                        <div class="flex justify-center items-center">
                            <p class="heading-section tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-black">{product.productDetail.title}</p>
                        </div>
                        </div>
                        </Link>
                        <div>
                        <div class="flex justify-center items-center">
                            <button onClick={(e)=>handleProducts(e,product)} type="button" className="loadMoreData text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Remove</button>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
                ) : (
                    <div>
                        <h2>No Product available!</h2>
                    </div>
                )}
            </div>
        </div>
        </FormContainer>
        </>
     );
}

const FormContainer = styled.div`
    .heading-section {
        width: 288px;
        height: 99px;
    }
`

export default FavouriteProduct;