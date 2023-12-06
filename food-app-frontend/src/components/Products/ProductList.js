import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { selectedProducts, searchProduct, favouriteProductRoute } from "../../utils/APIRoutes";
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import styled from "styled-components";
import { Link } from "react-router-dom"
import { Disclosure } from '@headlessui/react'
import { ThreeDots } from  'react-loader-spinner'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import {menuItems} from "../../app/APIMenuList";
import { useSelector , useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { savedProductAsync, addToWishListAsync, removeWishlistAsync } from "../../features/product/productSlice";
import 'react-toastify/dist/ReactToastify.css';


function ProductList() {
    const userDetail = useSelector((state)=>state.auth.userInfo);
    const dispatch = useDispatch();
    const getParam = useParams();
    const [menuCategory,setMenuCategory] = useState([]);
    
    const filters = [
        {
          id: 'brand',
          name: 'Brands', 
          options: [],
        },
        {
          id: 'category',
          name: 'Category',
          options: menuCategory,
        },
      ]
    
      const toastOption = {
        position : "top-right",
        autoClose : 8000,
        pauseOnHover : true,
        theme : "dark",
        draggable : true
    }

    const [allMenuItems,setAllMenuItems] = useState([]);
    const [page,setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isBusy, setBusy] = useState();
    const [filterValue,setFilterValue] = useState({});
    // const [favouriteItem,setFavouriteItem] = useState();
    // const [savedProductList,setSavedProductList] = useState([]);

    const handleFilter = (e, section, option) =>{
        const newFilter = { ...filterValue };
        console.log("newFilter..",newFilter ,section);
        if(e.target.checked){
            setBusy(true);
            setFilterValue(option);
            const pageNum = 12;
            setPage(pageNum);
            getAPIData(option.value,pageNum);
        }
        else if(!e.target.checked){
            setBusy(true);
            const pageNum = 12;
            setPage(pageNum);
            getAPIData(getParam.id,pageNum);
            setFilterValue({});
        }
    }
    const addToWishlist = (e,product,value) =>{
        const statusVal = value;
        if(value){
            dispatch(addToWishListAsync({proData : product,userData : userDetail,value:statusVal})).then((result)=>{
                if(result.payload.status){
                    let index = allMenuItems.findIndex((item)=>{
                        return item.id === result.payload.data.productDetail.id
                    })
                    if(index != -1){
                        allMenuItems[index].isFavourite = true;
                    }
                    setAllMenuItems(allMenuItems);
                    toast(result.payload.data.message,toastOption);
                }
            })
        }
        if(!value){
            const proData = { "productId" : product.id, "userId": userDetail._id}
            dispatch(removeWishlistAsync(proData)).then((res)=>{
                console.log("DELETE , res",res);
            })
        }
    }

    const handleSearch = (e) =>{
        if(e.target.value !== ""){
            setBusy(true);
            const pageNum = 12;
            setPage(pageNum);
            axios.post(searchProduct,{value:e.target.value,page:pageNum})
            .then((response)=> {
                dispatch(savedProductAsync(userDetail)).then((result)=>{
                    addWishListData(result,response);
                })
                setBusy(false);
            })
        }
    }

    const getAPIData = (param,pageNum) =>{
        axios.post(selectedProducts,{title:param,page:pageNum})
        .then((response)=> {
            dispatch(savedProductAsync(userDetail)).then((result)=>{
                addWishListData(result,response);
            })
            setBusy(false);
        })
    }

    const addWishListData = (result,response) =>{
        const savedProductList = result.payload.data;
        if(savedProductList && savedProductList.length > 0){
            for(let j=0;j<savedProductList.length;j++){
                let index = response.data.data.results.findIndex((item)=>{
                    return item.id === savedProductList[j].productDetail.id
                })
                if(index !== -1){
                    response.data.data.results[index].isFavourite = true;
                }
            }
            setAllMenuItems(response.data.data.results);
        }
        else{
            setAllMenuItems(response.data.data.results);
        }
    }

    const getMoreProduct = (e) =>{
        if(filterValue && Object.keys(filterValue).length > 0){
            setPage(page + 12);
            const pageNum = page +12;
            getAPIData(filterValue.value,pageNum);
        }
        else{
            setPage(page + 12);
            const pageNum = page +12;
            getAPIData(getParam.id,pageNum);
        }
    }
    // const handleFavourite = (e,product) =>{
    //     console.log("handleFavourite" , e,product);
    // }

    useEffect(()=>{
        setBusy(true);
        const pageNum = 12;
        setPage(pageNum);
        getAPIData(getParam.id,pageNum);
        if(menuItems && menuItems.length > 0){
            const menuCategory = [];
            for(let i=0;i<menuItems.length;i++){
                menuCategory.push({"value" : menuItems[i].title,"label":menuItems[i].title.charAt(0).toUpperCase() + menuItems[i].title.slice(1),"checked" : false});
            }
            setMenuCategory(menuCategory);
        }

    },[])

    // useEffect(()=>{
    //     dispatch(savedProductAsync(userDetail)).then((result)=>{
    //         const savedProductList = result.payload.data;
    //         console.log("savedProductList..",savedProductList , allMenuItems);
    //         // setSavedProductList(savedProductList);
    //     })
    // },[])

    return (
        <>
        <FormContainer>
        <Navbar></Navbar>
        <div className="bg-white">
            <div>
                {/* <MobileFilter /> */}
                <main className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                    <div className="flex items-center">
                    <div class='max-w-md mx-auto'>
                        <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                            <div class="grid place-items-center h-full w-12 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <input onKeyUp={(e)=>handleSearch(e)} class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"  id="search" placeholder="Search something.." /> 
                        </div>
                    </div>
                    <button
                        type="button"
                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <DesktopFilter handleFilter={handleFilter} addToWishlist={addToWishlist} filters={filters}/>
                    {/* Product grid */}
                    <div className="lg:col-span-3">
                    {isBusy ? ( <ThreeDots  height="80" width="80" radius="9" olor="#000000" ariaLabel="three-dots-loading"
                        wrapperStyle={{}} wrapperClassName="" visible={true}/>) : ( 
                        <ProductGrid allMenuItems={allMenuItems}  addToWishlist={addToWishlist}/>
                        )}
                    </div>     
                    </div>
                    <button onClick={(e)=>getMoreProduct(e)} type="button" className="loadMoreData text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View More</button>
                </section>
                </main>
            </div>
        </div>
        </FormContainer>
        <ToastContainer /></>
    );
}
  
  function DesktopFilter({handleFilter , filters}) {
    return ( 
    <form className="hidden lg:block">
      {filters.map((section) => (
      <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
          <>
              <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                  {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                  </span>
              </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                  {section.options && section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                      <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onClick={e=>handleFilter(e,section,option)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                      >
                      {option.label}
                      </label>
                  </div>
                  ))}
              </div>
              </Disclosure.Panel>
          </>
          )}
      </Disclosure>
    ))}
  </form> );
  }
  
  function ProductGrid({allMenuItems,addToWishlist}) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            { allMenuItems.map((product,index) => (
                <div>
                <div key={index} className="group relative border-solid border-2 p-2">
                    <Link to={`/product-detail/${product.id}`}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                        <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                        <h3 className="text-sm text-gray-700">
                            <div href={product.image}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.title}
                            </div>
                        </h3>
                        </div>
                    </div>
                    </Link>
                </div>
                <div>
                    {product.isFavourite}
                    {/* {savedProductList.find((item)=>item.productId === product.id) ? "yes" : "Noo"} */}
                { product.isFavourite ? (
                    <button type="button" class="root" onClick={(e)=>addToWishlist(e,product,false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3118 5.9212C9.40424 4.01366 6.31821 4.00439 4.41892 5.90368C2.51963 7.80297 2.5289 10.889 4.43644 12.7965L11.4977 19.8578C11.7906 20.1507 12.2654 20.1507 12.5583 19.8578L19.5829 12.8374C21.4778 10.9319 21.4718 7.85453 19.5639 5.94665C17.6529 4.0357 14.5655 4.02642 12.6628 5.92911L11.9919 6.6013L11.3118 5.9212Z" fill="#212121"/>
                        </svg>
                    </button>
                ) : (
                    <button type="button" class="root" onClick={(e)=>addToWishlist(e,product,true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3118 5.9212C9.40424 4.01366 6.31821 4.00439 4.41892 5.90368C2.51963 7.80297 2.5289 10.889 4.43644 12.7965L11.4977 19.8578C11.7906 20.1507 12.2654 20.1507 12.5583 19.8578L19.5829 12.8374C21.4778 10.9319 21.4718 7.85453 19.5639 5.94665C17.6529 4.0357 14.5655 4.02642 12.6628 5.92911L11.9919 6.6013L11.3118 5.9212ZM18.5193 11.7797L12.028 18.2668L5.4971 11.7359C4.17392 10.4127 4.1675 8.27641 5.47958 6.96434C6.79165 5.65227 8.92795 5.65869 10.2511 6.98186L11.4652 8.19589C11.7631 8.49379 12.2478 8.48795 12.5384 8.18297L13.7234 6.98977C15.0389 5.6743 17.1766 5.68072 18.5032 7.00731C19.8267 8.33082 19.8309 10.4607 18.5193 11.7797Z" fill="#212121"/>
                        </svg>
                    </button>
                )
                }
                </div>
                </div>

            ))}
            </div>
        </div>
      </div>
    );
  }

const FormContainer = styled.div`
    .box-image img {
        height: 260px;
        width: 350px;
    }
    .loadMoreData {
        margin-top: 100px;
        margin-left: 944px;
    }
`


export default ProductList;