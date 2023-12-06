import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productDetailRoute } from "../../utils/APIRoutes";
import styled from "styled-components";
import commonImage from "../../images/commonImage.jpeg";
import { ThreeDots } from  'react-loader-spinner'
import Navbar from "../Navbar";

function ProductDetail() {
    const getParam = useParams();
    const [isBusy,setBusy] = useState();
    const [productData,setProductData] = useState({});

    useEffect(()=>{
        setBusy(true);
        axios.post(productDetailRoute,{id:getParam.id})
        .then((response)=> {
            console.log("DETAILS" , response);
            setProductData(response.data.data);
            setBusy(false);
        })
    },[])

    return ( 
        <>
        <FormContainer>
            <Navbar></Navbar>
            <div class="container-fluid page-header py-5">
                {/* <h1 class="text-center text-black display-6">Shop Detail</h1> */}
            </div>
            {isBusy ? ( <ThreeDots  height="80" width="80" radius="9" olor="#000000" ariaLabel="three-dots-loading"
                wrapperStyle={{}} wrapperClassName="" visible={true}/>) : ( 
                <div class="grid grid-cols-2 gap-3 main-about-section">
                    
                    {productData.image !== undefined ? <div className="image-box"><img src={productData.image} alt={productData.title}/></div> : 
                    <div className="image-box"><img src={commonImage} alt={productData.title}/></div>}
                
                    <div className="detail-box">
                        <h1 className="heading-section"> {productData.title} </h1>
                        {/* <span>{Object.keys(productData.dishTypes).length} {productData.dishTypes.length}</span> */}
                        {productData.dishTypes && productData.dishTypes.length > 0 ? 
                        <div className="chip-section">
                        {productData.dishTypes.map((season) => (
                            <div className="chip">
                                {season}
                            {/* <span key={season}>{season}</span> */}
                            </div>
                            ))}
                        </div>
                        : <div>No Data Awailable</div>}
                        <h4 className="price-section">$ {productData.pricePerServing}</h4>
                        <p dangerouslySetInnerHTML={{__html: productData.summary}} ></p>
                        <div class="btn-box">
                        <a href="" class="btn1">
                            Order Now
                        </a>
                        </div>
                    </div>
                </div>
            )}
            <div className="section-second">
                Ingredients List
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-8 gap-4">
                    { productData.extendedIngredients && productData.extendedIngredients.length > 0 && productData.extendedIngredients.map((item) => (
                        <div className="w-full relative group">
                            <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
                                <div className="box-image">
                                    <img className="w-full h-full" src={`https://spoonacular.com/cdn/ingredients_100x100/`+item.image} />
                                </div>
                            </div>
                            <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
                                <div className="flex items-center justify-between font-titleFont">
                                <h2 className="text-sm text-primeColor">
                                    {item.name}
                                </h2>
                                <h3 className="text-sm text-primeColor">
                                    {item.amount} {item.unit}
                                </h3>
                                {/* <p className="text-[#767676] text-[14px]">${item.name}</p> */}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        </FormContainer>
        </>
     );
}

const FormContainer = styled.div`
    .heading-section {
        font-size: 61px;
        font-weight: 700 !important;
    }
    .chip {
        display: inline-block;
        padding: 0 25px;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        border-radius: 25px;
        background-color: #f1f1f1;
        margin: 10px;
    }
    .name-section {
        font-size: 30px;
        font-weight: 500 !important;
        padding-top: 19px;
        margin: 14px;
    }
    .description-section {
        font-family: sans-serif;
        font-size: 18px;
    }
    .section-second {
        padding: 83px;
    }
`   

export default ProductDetail;